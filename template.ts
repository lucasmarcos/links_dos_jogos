import { config } from "./config.js";
import { html } from "./tags.js";

type TemplateProps = {
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
  linksHtml,
  year,
  author,
}: TemplateProps): string => html`<!DOCTYPE html>
<html lang="${config.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.siteName} - Lista de Jogos</title>
  <link href="output.css" rel="stylesheet">
</head>
<body class="bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans m-0 px-4 py-8 flex flex-col items-center min-h-screen transition-colors duration-300">
  <header class="text-center mb-12">
    <div class="text-6xl mb-2 inline-block animate-bounce">🎮</div>
    <h1 class="text-[2.5rem] text-blue-900 dark:text-blue-400 m-0 font-extrabold tracking-tight">${config.siteName}</h1>
    <p class="mt-2 text-[1.1rem] text-slate-600 dark:text-slate-400">${config.subtitle}</p>
  </header>
  <main class="flex flex-col gap-3 w-full max-w-[500px]">
    ${linksHtml}
  </main>
  <footer class="mt-16 text-sm text-slate-500 dark:text-slate-400 text-center">
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
<a href="${url}" class="bg-white dark:bg-slate-800 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-lg no-underline text-inherit transition-all duration-200 flex items-center gap-4 hover:-translate-y-1 hover:scale-[1.02] hover:border-blue-900 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-xl" target="_blank">
  <img src="${faviconUrl}" class="w-8 h-8 rounded-md bg-white dark:bg-slate-900 flex-shrink-0" alt="">
  <div class="flex flex-col min-w-0">
    <h2 class="m-0 text-base font-semibold truncate">${nome}</h2>
    <span class="text-sm text-slate-500 dark:text-slate-400 truncate">${original}</span>
  </div>
</a>
`;
