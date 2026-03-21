import { getStyles } from './styles.js';
import { getTemplate, getGameCard } from './template.js';

async function getPageTitle(url) {
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(5000)
    });
    const text = await response.text();
    const match = text.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].trim() : null;
  } catch (e) {
    return null;
  }
}

async function gerarHtml() {
  const inputFile = 'jogos.txt';
  const outputFile = 'index.html';
  const author = 'Lucas da Silva Marcos';

  try {
    const file = Bun.file(inputFile);
    const text = await file.text();
    const rawLinks = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    console.log(`🔍 Buscando títulos para ${rawLinks.length} links...`);

    const linksData = await Promise.all(rawLinks.map(async (link) => {
      const url = link.startsWith('http') ? link : `https://${link}`;
      const title = await getPageTitle(url);
      return { 
        url, 
        nome: title || link.split('.')[0], 
        original: link 
      };
    }));

    const brandBlue = "#1e3a8a";
    const styles = getStyles(brandBlue);

    const linksHtml = linksData.map(item => {
      const domain = item.original.replace(/^https?:\/\//, '').split('/')[0];
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      return getGameCard({ ...item, faviconUrl });
    }).join('\n');

    const finalHtml = getTemplate({
      styles,
      linksHtml,
      year: new Date().getFullYear(),
      author
    });

    await Bun.write(outputFile, finalHtml);
    console.log(`✅ Sucesso! O arquivo '${outputFile}' foi gerado.`);

  } catch (error) {
    console.error("❌ Erro:", error.message);
  }
}

gerarHtml();
