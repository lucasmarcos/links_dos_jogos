import { config } from "./config.js";
import { html } from "./tags.js";

type TemplateProps = {
  linksHtml: string;
  year: number;
  author: string;
};

type GameCardProps = {
  url: string;
  displayUrl: string;
  faviconUrl: string;
  nome: string;
};

const bodyCls =
  "bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans m-0 px-4 py-8 flex flex-col items-center min-h-screen transition-colors duration-300";
const headerCls = "text-center mb-12";
const emojiCls = "text-6xl mb-2 inline-block animate-bounce";
const titleCls =
  "text-[2.5rem] text-blue-900 dark:text-blue-400 m-0 font-extrabold tracking-tight";
const subtitleCls = "mt-2 text-[1.1rem] text-slate-600 dark:text-slate-400";
const mainCls = "flex flex-col gap-3 w-full max-w-[500px]";
const footerCls =
  "mt-16 text-sm text-slate-500 dark:text-slate-400 text-center";
const cardCls =
  "bg-white dark:bg-slate-800 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-lg no-underline text-inherit transition-all duration-200 flex items-center gap-4 hover:-translate-y-1 hover:scale-[1.02] hover:border-blue-900 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-xl";
const faviconCls =
  "w-8 h-8 rounded-md bg-white dark:bg-slate-900 flex-shrink-0";
const cardInfoCls = "flex flex-col min-w-0";
const cardNameCls = "m-0 text-base font-semibold truncate";
const cardUrlCls = "text-sm text-slate-500 dark:text-slate-400 truncate";

export const getTemplate = ({
  linksHtml,
  year,
  author,
}: TemplateProps): string => html`<!doctype html>
<html lang="${config.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${config.siteName} - ${config.siteDesc}</title>
  <link href="${config.cssOutput}" rel="stylesheet">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body class="${bodyCls}">
  <header class="${headerCls}">
    <div class="${emojiCls}">🎮</div>
    <h1 class="${titleCls}">${config.siteName}</h1>
    <p class="${subtitleCls}">${config.subtitle}</p>
  </header>
  <main class="${mainCls}">
    ${linksHtml}
  </main>
  <footer class="${footerCls}">
    &copy; ${year} ${author}
  </footer>
</body>
</html>
`;

export const getGameCard = ({
  url,
  displayUrl,
  faviconUrl,
  nome,
}: GameCardProps): string => html`
<a href="${url}" class="${cardCls}" target="_blank">
  <img src="${faviconUrl}" class="${faviconCls}" alt="">
  <div class="${cardInfoCls}">
    <h2 class="${cardNameCls}">${nome}</h2>
    <span class="${cardUrlCls}">${displayUrl}</span>
  </div>
</a>
`;
