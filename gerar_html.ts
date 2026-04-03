import { config } from "./config.js";
import { getStyles } from "./styles.js";
import { getGameCard, getTemplate } from "./template.js";

type LinkData = {
  url: string;
  nome: string;
  original: string;
};

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
        const url = link.startsWith("http") ? link : `https://${link}`;
        const title = await getPageTitle(url);
        return {
          url,
          nome: title || link.split(".")[0],
          original: link,
        };
      }),
    );

    const styles = getStyles(config.brandBlue);

    const linksHtml = linksData
      .map((item) => {
        const domain = item.original.replace(/^https?:\/\//, "").split("/")[0];
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        return getGameCard({ ...item, faviconUrl });
      })
      .join("");

    const finalHtml = getTemplate({
      styles,
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
