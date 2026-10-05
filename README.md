<div align="center">
  <img src="public/marchio-192.webp" width="72" height="72" alt="">
  <h1>MAURO.EXE</h1>
  <p>
    <strong>Il sito di Mauro Ceccarelli, sviluppatore web ad Ascoli Piceno.</strong><br>
    Siti web e gestionali su misura per hotel, B&amp;B, concessionarie, artigiani e negozi del Piceno.
  </p>
  <p>
    <a href="https://www.mauroceccarelli.it"><strong>www.mauroceccarelli.it</strong></a>
    &nbsp;·&nbsp;
    <a href="https://wa.me/393480029661">WhatsApp 348 002 9661</a>
  </p>
  <p>
    <img alt="React 19" src="https://img.shields.io/badge/React-19-2347E6?style=flat-square&labelColor=141414">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-2347E6?style=flat-square&labelColor=141414">
    <img alt="Vite 6" src="https://img.shields.io/badge/Vite-6-2347E6?style=flat-square&labelColor=141414">
    <img alt="Vercel" src="https://img.shields.io/badge/hosting-Vercel-2347E6?style=flat-square&labelColor=141414">
  </p>
</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/immagini/home-scuro.webp">
  <img src=".github/immagini/home-chiaro.webp" alt="La prima schermata del sito: il titolo Sviluppatore web ad Ascoli Piceno, i pulsanti Chiamami e Scrivimi su WhatsApp e i siti di Redicar e Graphic Arts aperti su un computer e su un telefono">
</picture>

## Cosa c'è nel sito

- **Home**: servizi, lavori, prezzi, recensioni, domande frequenti e i pulsanti per chiamare o scrivere su WhatsApp.
- **Pagine per settore**: [hotel e B&B](https://www.mauroceccarelli.it/hotel), [aziende agricole](https://www.mauroceccarelli.it/agri-ecommerce) e [gestionali per negozi](https://www.mauroceccarelli.it/saas).
- **[Simulatore preventivo](https://www.mauroceccarelli.it/simulatore)**: calcola una stima del prezzo e manda il riepilogo per email.
- **Assistente AI**: risponde alle domande sui servizi, tramite una funzione serverless che usa Gemini API.
- **[Biglietto da visita digitale](https://www.mauroceccarelli.it/card)**: chiamata, WhatsApp e «Salva in rubrica» in un tocco.
- Tema chiaro e scuro, e un file HTML vero per ogni indirizzo, con titolo, descrizione e dati strutturati propri, così Google e i motori AI leggono il sito anche senza JavaScript.

Su telefono la home fa 95 su 100 in Lighthouse, e lo screenshot principale compare in 2,4 secondi (mediana di 3 misure, ottobre 2026).

## Avvio in locale

Serve [Node.js](https://nodejs.org/) 24.

```bash
git clone https://github.com/MauroilFuriano/mauro_sito.git
cd mauro_sito
npm install
npm run dev
```

Il modulo «Preferisci essere richiamato?» e il simulatore inviano le richieste con EmailJS. Per provarli in locale crea un file `.env.local` con le chiavi del tuo account:

```env
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

L'assistente AI è la funzione `api/assistente.ts`. Legge `GEMINI_API_KEY` (e, se c'è, `GEMINI_MODEL`) dalle variabili d'ambiente di Vercel; in locale gira solo con `npx vercel dev`.

| Comando | A cosa serve |
| --- | --- |
| `npm run dev` | Avvia il sito in locale, con ricarica automatica |
| `npm run build` | Crea in `dist/` la versione da pubblicare: un file HTML per ogni pagina e la sitemap |
| `npm run preview` | Apre in locale la versione appena creata |
| `npm run immagini` | Rigenera le copie ridotte e i ritagli degli screenshot in `public/lavori` |

## Dove sono le cose

| Cartella o file | Contenuto |
| --- | --- |
| `src/pages` | Le pagine del sito |
| `src/components/vetrina` | Testata, piede, pulsanti e sezioni nello stile della home |
| `src/data` | Testi, prezzi e dati SEO (`home.ts`, `pagineServizio.ts`, `seo.ts`) |
| `src/styles` | Gli stili, con i colori e i caratteri condivisi in `vetrina.css` |
| `api` | Le funzioni serverless di Vercel |
| `pagine-statiche.ts` | Il plugin di Vite che scrive l'HTML di ogni pagina e la sitemap |
| `card_mauro.html`, `firma_email_mauro.html` | Biglietto da visita e firma email nei colori del sito (non vengono pubblicati) |

## Pubblicazione

Ogni push su `main` va online da solo su Vercel. GitHub Actions controlla tipi, build e dipendenze a ogni push (`ci.yml`), e ogni 6 ore verifica che il sito e l'assistente rispondano (`controllo-sito.yml`).

## Contatti

**Mauro Ceccarelli** · MAURO.EXE · P.IVA 02606790448

- Sito: [www.mauroceccarelli.it](https://www.mauroceccarelli.it)
- WhatsApp: [348 002 9661](https://wa.me/393480029661)
- Email: [mauroexe@mauroceccarelli.it](mailto:mauroexe@mauroceccarelli.it)
- LinkedIn: [Mauro Ceccarelli](https://www.linkedin.com/in/mauro-ceccarelli-282255296)
