import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { recapiti } from './src/data/home';
import { immagineAnteprima, jsonLdDellaPagina, pagine, testoRobots, urlDellaPagina, type PaginaDelSito } from './src/data/seo';

const INIZIO_TESTA = '<!--testa-pagina-->';
const FINE_TESTA = '<!--/testa-pagina-->';
const INIZIO_SENZA_JS = '<!--senza-js-->';
const FINE_SENZA_JS = '<!--/senza-js-->';
const RADICE = '<div id="root"></div>';
const APERTURA_HTML = '<html lang="it">';

const testoSicuro = (testo: string) => testo.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attributoSicuro = (testo: string) => testoSicuro(testo).replace(/"/g, '&quot;');

const bloccoTesta = (pagina: PaginaDelSito) => {
  const indirizzo = urlDellaPagina(pagina);
  const jsonLd = jsonLdDellaPagina(pagina);
  return [
    `<title>${testoSicuro(pagina.titolo)}</title>`,
    `<meta name="description" content="${attributoSicuro(pagina.descrizione)}" />`,
    `<meta name="robots" content="${testoRobots(pagina)}" />`,
    pagina.indicizzabile ? `<link rel="canonical" href="${indirizzo}" />` : '',
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="it_IT" />',
    '<meta property="og:site_name" content="Mauro.exe" />',
    `<meta property="og:url" content="${indirizzo}" />`,
    `<meta property="og:title" content="${attributoSicuro(pagina.titolo)}" />`,
    `<meta property="og:description" content="${attributoSicuro(pagina.descrizione)}" />`,
    `<meta property="og:image" content="${immagineAnteprima.indirizzo}" />`,
    `<meta property="og:image:width" content="${immagineAnteprima.larghezza}" />`,
    `<meta property="og:image:height" content="${immagineAnteprima.altezza}" />`,
    `<meta property="og:image:alt" content="${attributoSicuro(immagineAnteprima.alt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    ...(pagina.immaginiDaPrecaricare ?? []).map((immagine) => `<link rel="preload" as="image" href="${immagine}" fetchpriority="high" />`),
    jsonLd ? `<script type="application/ld+json" id="dati-strutturati">${jsonLd}</script>` : '',
  ].filter(Boolean).join('\n    ');
};

// Deve rispecchiare la pagina che vede chi ha JavaScript: è il contenuto per crawler AI e anteprime, non testo nascosto
const bloccoSenzaJs = (pagina: PaginaDelSito) => {
  const { titolo, paragrafi, sezioni = [] } = pagina.senzaJs;
  const altrePagine = pagine
    .filter((altra) => altra.indicizzabile && altra.percorso !== pagina.percorso)
    .map((altra) => `<a href="${altra.percorso}">${testoSicuro(altra.etichetta)}</a>`)
    .join(' · ');
  return [
    '<noscript>',
    '<div style="min-height:100vh;padding:48px 20px;background:#F6F6F3;color:#141414;font-family:system-ui,sans-serif;line-height:1.6">',
    '<div style="max-width:760px;margin:0 auto">',
    `<h1>${testoSicuro(titolo)}</h1>`,
    ...paragrafi.map((paragrafo) => `<p>${testoSicuro(paragrafo)}</p>`),
    ...sezioni.flatMap((sezione) => [
      `<h2>${testoSicuro(sezione.titolo)}</h2>`,
      '<ul>',
      ...sezione.voci.map((voce) => `<li>${testoSicuro(voce)}</li>`),
      '</ul>',
    ]),
    `<p>Telefono e WhatsApp: <a href="${recapiti.telefono}">${recapiti.telefonoLeggibile}</a> · Email: <a href="mailto:${recapiti.email}">${recapiti.email}</a> · MAURO.EXE di Mauro Ceccarelli, Ascoli Piceno · P.IVA 02606790448</p>`,
    `<p>${altrePagine}</p>`,
    '</div>',
    '</div>',
    '</noscript>',
  ].join('\n');
};

const sitemap = () => [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pagine
    .filter((pagina) => pagina.indicizzabile)
    .map((pagina) => `  <url><loc>${urlDellaPagina(pagina)}</loc>${pagina.ultimaModifica ? `<lastmod>${pagina.ultimaModifica}</lastmod>` : ''}</url>`),
  '</urlset>',
  '',
].join('\n');

const sostituisciTra = (html: string, inizio: string, fine: string, contenuto: string) => {
  const posizioneInizio = html.indexOf(inizio);
  const posizioneFine = html.indexOf(fine);
  if (posizioneInizio === -1 || posizioneFine < posizioneInizio) return null;
  return html.slice(0, posizioneInizio) + contenuto + html.slice(posizioneFine + fine.length);
};

export const pagineStatiche = (): Plugin => {
  let cartellaUscita = '';
  const home = pagine[0];
  return {
    name: 'pagine-statiche',
    configResolved(configurazione) {
      cartellaUscita = path.resolve(configurazione.root, configurazione.build.outDir);
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes('</head>') || !html.includes(RADICE)) throw new Error(`index.html deve contenere </head> e ${RADICE}`);
        return html
          .replace('</head>', () => `  ${INIZIO_TESTA}\n    ${bloccoTesta(home)}\n  ${FINE_TESTA}\n</head>`)
          .replace(RADICE, () => `${RADICE}\n  ${INIZIO_SENZA_JS}\n${bloccoSenzaJs(home)}\n  ${FINE_SENZA_JS}`);
      },
    },
    writeBundle() {
      const modello = fs.readFileSync(path.join(cartellaUscita, 'index.html'), 'utf8');
      for (const pagina of pagine) {
        const conTesta = sostituisciTra(modello, INIZIO_TESTA, FINE_TESTA, bloccoTesta(pagina));
        const html = conTesta && sostituisciTra(conTesta, INIZIO_SENZA_JS, FINE_SENZA_JS, bloccoSenzaJs(pagina));
        if (!html) this.error(`In dist/index.html mancano i segnaposto della testa o del contenuto senza JavaScript (pagina ${pagina.percorso})`);
        if (!html.includes(APERTURA_HTML)) this.error(`In dist/index.html manca ${APERTURA_HTML}`);
        // Con la classe, index.css dà già lo sfondo della home (chiaro o scuro) prima che React disegni la pagina
        const htmlFinale = pagina.stileVetrina ? html.replace(APERTURA_HTML, '<html lang="it" class="avvio-home">') : html;
        const nomeFile = pagina.percorso === '/' ? 'index.html' : `${pagina.percorso.slice(1)}.html`;
        fs.writeFileSync(path.join(cartellaUscita, nomeFile), htmlFinale);
      }
      fs.writeFileSync(path.join(cartellaUscita, 'sitemap.xml'), sitemap());
    },
  };
};
