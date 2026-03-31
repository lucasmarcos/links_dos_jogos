import { html } from "./tags";

type TemplateProps = {
  styles: string;
  linksHtml: string;
  year: number;
  author: string;
};

type GameCardProps = {
  url: string;
  faviconUrl: string;
  nome: string;
  original: string;
};

export const getTemplate = ({
  styles,
  linksHtml,
  year,
  author,
}: TemplateProps): string => html`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Casa da Paz - Lista de Jogos</title>
  <style>
    ${styles}
  </style>
</head>
<body>
  <header>
    <div class="emoji-header">🎮</div>
    <h1>Casa da Paz</h1>
    <p>Links para Jogos Online</p>
  </header>
  <main class="container">
    ${linksHtml}
  </main>
  <footer>
    &copy; ${year} ${author}
  </footer>
</body>
</html>
`;

export const getGameCard = ({
  url,
  faviconUrl,
  nome,
  original,
}: GameCardProps): string => html`
<a href="${url}" class="game-card" target="_blank">
  <img src="${faviconUrl}" class="favicon" alt="">
  <div class="info">
    <h2>${nome}</h2>
    <span>${original}</span>
  </div>
</a>
`;
