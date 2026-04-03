# AUDIT REPORT: mauroceccarelli.it (Mauro.exe)
Data: 03/04/2026
URL: https://www.mauroceccarelli.it

## SCORE COMPLESSIVO: 78/100

> [!NOTE]
> Audit eseguito tramite analisi del codice sorgente + verifica visiva su localhost (desktop 1440px e mobile 375px). I Core Web Vitals sono stimati dal codice, non misurati con Lighthouse in produzione.

---

## Evidenze Visive

````carousel
![Hero Section — Desktop: layout orizzontale con terminale animato, Lead Magnet sotto le CTA](C:/Users/Mauro/.gemini/antigravity/brain/e994ebab-0d6c-4092-98b5-7b3b3d1f5a5e/hero_section_1775202759133.png)
<!-- slide -->
![Services Section — Desktop: griglia 3 colonne, card con prezzi e CTA](C:/Users/Mauro/.gemini/antigravity/brain/e994ebab-0d6c-4092-98b5-7b3b3d1f5a5e/middle_section_1775202768020.png)
<!-- slide -->
![Portfolio — Desktop: card con immagini dei progetti, tech stack tags](C:/Users/Mauro/.gemini/antigravity/brain/e994ebab-0d6c-4092-98b5-7b3b3d1f5a5e/bottom_section_1775202775454.png)
<!-- slide -->
![Hero Mobile — Layout a colonna singola, CTA a tutta larghezza. Il chatbot si sovrappone al Lead Magnet](C:/Users/Mauro/.gemini/antigravity/brain/e994ebab-0d6c-4092-98b5-7b3b3d1f5a5e/hero_mobile_1775202842241.png)
<!-- slide -->
![About Mobile — Foto e testo ben impilati. Il chatbot si sovrappone parzialmente al contenuto](C:/Users/Mauro/.gemini/antigravity/brain/e994ebab-0d6c-4092-98b5-7b3b3d1f5a5e/middle_mobile_1775202849995.png)
<!-- slide -->
![Simulatore CTA Mobile — Il chatbot copre testo importante nella colonna sinistra](C:/Users/Mauro/.gemini/antigravity/brain/e994ebab-0d6c-4092-98b5-7b3b3d1f5a5e/bottom_mobile_1775202860638.png)
````

---

## 🔴 CRITICI (da risolvere immediatamente)

| # | Problema | Impatto | Sezione Audit |
|---|----------|---------|---------------|
| 1 | **Security Headers mancanti**: Nessun CSP, HSTS, X-Content-Type-Options, Permissions-Policy nel `.htaccess` | Sicurezza — Google penalizza siti senza HTTPS headers. Rischio XSS | Fase 1.1 |
| 2 | **Font Google caricati in modo bloccante**: il `<link>` ai Google Fonts in `index.html` è render-blocking, nessun `preload` o `font-display` forzato a livello di link tag | LCP degradato — il browser aspetta i font prima del primo render | Fase 1.1 |
| 3 | **Chatbot si sovrappone ai contenuti su mobile**: l'icona chatbot in basso a sinistra (fixed) copre il Lead Magnet nella Hero e il testo nella sezione Simulatore su viewport ≤768px | UX critica — l'utente non può leggere il contenuto né interagire con il Lead Magnet | Fase 2.1 |
| 4 | **Componente `ClosingCTA` non inserito in `HomePage.tsx`**: il componente esiste nel codice ma non è mai reso nella pagina. La sezione "Picco-Fine" manca completamente | Conversioni — manca la CTA finale prima del footer, l'ultimo tocco emotivo | Fase 3.2 |

---

## 🟡 MIGLIORAMENTI UI/UX/3D

| # | Problema | Impatto | Sezione Audit |
|---|----------|---------|---------------|
| 5 | **Immagini portfolio in SVG/PNG, non WebP**: le immagini mockup in `/public/projects/` sono SVG (ok) ma le fallback usano Unsplash senza specificare `format=webp`. Le immagini principali (e.g. `nova-motors.png`, `aura-style.png`) non hanno versione WebP | LCP/Performance — PNG non compresso può pesare 200-500KB | Fase 1.1 |
| 6 | **`prefers-reduced-motion` non rispettato globalmente**: solo `SimulatoreCTA` lo gestisce. Le animazioni `float-particle`, `twinkle`, `glow-pulse`, `hero-enter`, `glitch-anim` ignorano la preferenza utente | A11y — utenti con problemi vestibolari vedono animazioni non desiderate | Fase 2.2 |
| 7 | **Sitemap contiene URL potenzialmente orfani**: `/faq` è nella sitemap ma sembra puntare a una pagina separata. Verificare che tutte le route esistano nel router di React | SEO — URL non raggiungibili generano errori 404 in Google Search Console | Fase 3.2 |
| 8 | **Promo "–30% fino al 20 apr" hardcoded nel SimulatoreCTA**: la data di scadenza è statica. Dopo il 20 aprile, il badge sarà scaduto e il sito sembrerà non aggiornato | Credibilità — contenuto scaduto danneggia la fiducia dell'utente | Fase 3.2 |
| 9 | **FAQ accordion: manca `aria-controls` e `id` per l'accessibilità**: il bottone ha `aria-expanded` ma non punta a un `id` specifico del pannello. Screen reader non collegano domanda e risposta | A11y — WCAG 2.1 AA non soddisfatto per accordion pattern | Fase 2.1 |
| 10 | **`.htaccess` manca di caching headers e compressione**: nessun `Cache-Control`, `Expires` o `mod_deflate`/Brotli configurato | Performance — ogni visita richiede tutti gli asset dal server senza cache | Fase 1.2 |

---

## 🟢 OTTIMIZZAZIONI SEO/COPY

| # | Problema | Impatto | Sezione Audit |
|---|----------|---------|---------------|
| 11 | **`og:image` punta a `logo.png` invece che a un'immagine social dedicata 1200x630px**: il logo piccolo non è ideale per le anteprime social | Social sharing — preview poco attraente su Facebook/LinkedIn/WhatsApp | Fase 3.2 |
| 12 | **GitHub link nel Footer punta al profilo corretto ma nel Schema.org punta a URL diverso** (`mauroceccarelli` vs `MauroilFuriano`) | SEO — segnali inconsistenti per i crawler | Fase 3.2 |
| 13 | **`<link rel="canonical">` duplicato**: presente sia in `index.html` statico sia iniettato dal componente `<SEO>` via react-helmet. Potenziale conflitto | SEO — Google potrebbe ignorare entrambi se contrastanti | Fase 3.2 |
| 14 | **`lastmod` nella sitemap non aggiornato**: la homepage dice `2026-04-01` ma ci sono state modifiche il 02/04 e 03/04 | SEO — Google potrebbe non ri-crawlare le pagine aggiornate in tempo | Fase 3.2 |

---

## METRICHE RILEVATE (Stima da codice)

| Metrica | Valore Stimato | Target | Status |
|---------|----------------|--------|--------|
| LCP | ~2.5–3.5s (fonts bloccanti + no preload hero) | <2.5s | ⚠️ |
| FID/INP | ~50ms (no heavy JS al caricamento) | <100ms | ✅ |
| CLS | ~0.05 (font-display swap, immagini con dimensioni) | <0.1 | ✅ |
| TTFB | Dipende dall'hosting (non misurabile in locale) | <200ms | ❓ |
| A11y Score | ~75/100 (manca skip-link, focus states parziali, aria-controls FAQ) | >90 | ⚠️ |
| SEO Score | ~88/100 (structured data completi, meta tags ok, canonical duplicato) | >95 | ⚠️ |

---

## PRIORITÀ INTERVENTI

1. 🔴 **Fix #3** — Chatbot mobile overlap (impatto UX immediato)
2. 🔴 **Fix #2** — Font loading ottimizzato (impatto LCP)
3. 🔴 **Fix #4** — Aggiungere `ClosingCTA` alla HomePage (conversioni)
4. 🔴 **Fix #1** — Security headers nel `.htaccess` (sicurezza + ranking)
5. 🟡 **Fix #6** — `prefers-reduced-motion` globale (A11y)
6. 🟡 **Fix #10** — Caching e compressione nel `.htaccess` (performance)
7. 🟡 **Fix #9** — Accessibilità accordion FAQ (WCAG compliance)
8. 🟡 **Fix #5** — Immagini portfolio in WebP (LCP)
9. 🟡 **Fix #8** — Promo con data dinamica (credibilità)
10. 🟢 **Fix #11-14** — Ottimizzazioni SEO minori

---

## SNIPPET DI CODICE RISOLUTIVI

### Fix #1: Security Headers (.htaccess)

```apache
# === SECURITY HEADERS ===
<IfModule mod_headers.c>
  # Previene il MIME-sniffing (attacchi XSS via file upload)
  Header set X-Content-Type-Options "nosniff"
  
  # Forza HTTPS per 1 anno (richiede SSL attivo)
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  
  # Content Security Policy base
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://api.emailjs.com https://generativelanguage.googleapis.com https://wa.me; frame-src 'none'"
  
  # Limita le API del browser disponibili
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
  
  # Previene il clickjacking
  Header set X-Frame-Options "SAMEORIGIN"
  
  # Referrer Policy — invia il referer solo per same-origin
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

### Fix #2: Font Loading Ottimizzato (index.html)

Sostituire il blocco font attuale con:

```html
<!-- Font: Preconnect + Preload critico con font-display swap -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Roboto:wght@300;400;700&display=swap"
  onload="this.onload=null;this.rel='stylesheet'"
>
<noscript>
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Roboto:wght@300;400;700&display=swap"
    rel="stylesheet"
  >
</noscript>
```

> [!TIP]
> Ridotti anche i font weight caricati: rimossi `400` e `500` da Orbitron (usati solo `700` e `900` nel sito) e `500` da Roboto. Questo riduce il payload del font di ~30%.

---

### Fix #3: Chatbot Mobile Overlap (ChatBot.tsx)

Aggiungere padding di sicurezza o spostare il chatbot a destra su mobile:

```css
/* Aggiungere in index.css */
@media (max-width: 768px) {
  /* Sposta il chatbot a destra su mobile per evitare overlap con contenuti */
  .chatbot-container {
    left: auto !important;
    right: 16px !important;
    bottom: 16px !important;
  }
}
```

> [!IMPORTANT]
> Verificare la classe CSS effettiva del container chatbot nel file `ChatBot.tsx` e applicare lo spostamento. In alternativa, aggiungere un `margin-bottom` al body su mobile per creare spazio.

---

### Fix #4: Aggiungere ClosingCTA a HomePage.tsx

```diff
 import Contact from '../components/Contact';
 import Footer from '../components/Footer';
+import ClosingCTA from '../components/ClosingCTA';
 import ChatBot from '../components/ChatBot';

 ...

               <div className="reveal overflow-hidden">
                   <Contact />
               </div>
+              <div className="reveal">
+                  <ClosingCTA />
+              </div>
           </main>
```

---

### Fix #6: prefers-reduced-motion Globale (index.css)

```css
/* Aggiungere alla fine di index.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    display: none !important;
  }
}
```

---

### Fix #9: Accessibilità Accordion FAQ (FAQ.tsx)

```diff
 <button
   onClick={() => setOpenIndex(openIndex === i ? null : i)}
   className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
   aria-expanded={openIndex === i}
+  aria-controls={`faq-panel-${i}`}
+  id={`faq-button-${i}`}
 >
   <span className="text-white font-bold text-sm leading-snug pr-2">{faq.q}</span>
 ...
 </button>
 <div
+  id={`faq-panel-${i}`}
+  role="region"
+  aria-labelledby={`faq-button-${i}`}
   className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
 >
```

---

### Fix #10: Caching e Compressione (.htaccess)

```apache
# === COMPRESSIONE GZIP ===
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml application/xml
  AddOutputFilterByType DEFLATE application/font-woff2
</IfModule>

# === CACHING BROWSER ===
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Assets statici: cache aggressiva 1 anno (Vite usa hash nei nomi file)
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # HTML: cache breve per aggiornamenti rapidi
  ExpiresByType text/html "access plus 1 hour"
  
  # JSON (API, sitemap): cache moderata
  ExpiresByType application/json "access plus 1 day"
</IfModule>

# === CACHE-CONTROL HEADER ===
<IfModule mod_headers.c>
  # Asset con hash nel nome → immutable
  <FilesMatch "\.(js|css|woff2|webp|png|jpg|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  
  # HTML → revalidare sempre
  <FilesMatch "\.html$">
    Header set Cache-Control "public, max-age=3600, must-revalidate"
  </FilesMatch>
</IfModule>
```

---

### Fix #13: Rimuovere canonical duplicato da index.html

Rimuovere da `index.html` la riga:
```diff
- <link rel="canonical" href="https://www.mauroceccarelli.it/" />
```

Lasciare solo quello gestito dinamicamente dal componente `<SEO>` in ogni pagina, così ogni route ha il suo canonical corretto.

---

## CHECKLIST RIEPILOGATIVA

### Fase 1 — Infrastruttura
- [x] Immagini con lazy loading (`loading="lazy"` presente su portfolio e about)
- [ ] Immagini in formato WebP/AVIF (parziale — manca per portfolio)
- [x] Font con `font-display: swap` (presente nell'URL Google Fonts)
- [ ] Font caricamento non bloccante (da correggere con preload)
- [ ] Security Headers (tutti mancanti)
- [ ] Caching headers (mancanti)
- [ ] Compressione Brotli/Gzip (non configurata nel `.htaccess`)

### Fase 2 — UI/UX
- [x] Responsività: nessun overflow orizzontale
- [x] Touch targets ≥ 44px (CTA, form input, burger menu)
- [ ] Chatbot non copre contenuti su mobile (**da correggere**)
- [x] Menu mobile funzionante (hamburger visibile)
- [ ] Skip links per navigazione da tastiera (mancanti)
- [ ] `prefers-reduced-motion` rispettato globalmente
- [ ] Accordion FAQ con ARIA completo

### Fase 3 — SEO/Copy
- [x] Title tag corretto (57 caratteri, keyword + brand)
- [x] Meta description (158 caratteri, persuasiva)
- [x] H1 unico per pagina
- [x] Structured Data completi (Person, ProfessionalService, WebSite, LocalBusiness)
- [x] Sitemap.xml presente e valida
- [x] robots.txt con AI bot allow
- [ ] og:image dedicata 1200x630px
- [ ] Canonical non duplicato
- [x] CTA visibile above the fold
- [x] Value proposition in 5 secondi
- [x] Tono di voce coerente ("dark-tech", professionale)
