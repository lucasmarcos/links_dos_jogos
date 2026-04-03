import { config } from "./config.js";
import { getGameCard, getTemplate } from "./template.js";

type LinkData = {
  url: string;
  displayUrl: string;
  nome: string;
  original: string;
  favicon: string | null;
};

function withHttps(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

async function getPageTitle(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": config.userAgent },
      signal: AbortSignal.timeout(config.fetchTimeout),
    });
    const text = await response.text();
    const match = text.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].trim() : null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`Erro: ${message}`);
    return null;
  }
}

function parseLink(link: string): {
  url: string;
  favicon: string | null;
  title: string | null;
} {
  const parts = link.split("|");
  return {
    url: parts[0],
    favicon: parts[1] ?? null,
    title: parts.slice(2).join("|") || null,
  };
}

async function gerarHtml(): Promise<void> {
  try {
    const file = Bun.file(config.inputFile);
    const text = await file.text();
    const rawLinks = text
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0);

    console.log(`Buscando titulos para ${rawLinks.length} links...`);

    const linksData: LinkData[] = await Promise.all(
      rawLinks.map(async (link: string) => {
        const { url: parsedUrl, favicon, title: manualTitle } = parseLink(link);
        const url = withHttps(parsedUrl);
        const fetchedTitle = manualTitle || (await getPageTitle(url));

        return {
          url,
          displayUrl: parsedUrl,
          nome: fetchedTitle || parsedUrl.split(".")[0],
          original: link,
          favicon,
        };
      }),
    );

    const linksHtml = linksData
      .map((item) => {
        const domain = item.url.replace(/^https?:\/\//, "").split("/")[0];
        const faviconUrl = item.favicon
          ? withHttps(item.favicon)
          : `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        return getGameCard({ ...item, faviconUrl });
      })
      .join("");

    const finalHtml = getTemplate({
      linksHtml,
      year: new Date().getFullYear(),
      author: config.author,
    });

    await Bun.write(config.outputFile, finalHtml);
    console.log(`Sucesso! O arquivo '${config.outputFile}' foi gerado.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Erro: ", message);
  }
}

gerarHtml();
