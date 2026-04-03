import { config } from "./config.js";
import { getGameCard, getTemplate } from "./template.js";

type LinkData = {
  url: string;
  displayUrl: string;
  nome: string;
  original: string;
  favicon: string | null;
};

async function getPageTitle(url: string): Promise<string | null> {
  const fetchUrl = url.startsWith("http") ? url : `https://${url}`;
  try {
    const response = await fetch(fetchUrl, {
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
  let url = link;
  let favicon: string | null = null;
  let title: string | null = null;

  if (link.includes("||")) {
    const parts = link.split("||");
    url = parts[0];
    title = parts[1].trim();
  }

  if (url.includes("|") && !url.includes("||")) {
    const urlParts = url.split("|");
    url = urlParts[0];
    favicon = urlParts[1];
  }

  return { url, favicon, title };
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
        const url = parsedUrl.startsWith("http")
          ? parsedUrl
          : `https://${parsedUrl}`;
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
          ? item.favicon.startsWith("http")
            ? item.favicon
            : `https://${item.favicon}`
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
