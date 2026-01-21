# Guida all'Ottimizzazione SEO e Google Search Console

Ho aggiornato il progetto con il tuo dominio ufficiale: **https://www.mauroceccarelli.it/**.

I file `sitemap.xml`, `robots.txt` e `index.html` sono ora configurati correttamente.

## Rimane solo 1 passaggio da fare:

### Verifica su Google Search Console (GSC)

Questo passaggio **deve essere fatto manualmente** perché richiede che tu acceda al tuo account Google.

1. Vai su [Google Search Console](https://search.google.com/search-console).
2. Fai login e clicca su "Aggiungi proprietà".
3. Inserisci il dominio: `https://www.mauroceccarelli.it/`
4. GSC ti chiederà di verificare la proprietà. Scegli il metodo **"Tag HTML"**.
5. Copia il codice che ti danno (una stringa lunga di numeri e lettere).
6. Apri il file **`index.html`** nel progetto.
7. Cerca la riga:
   ```html
   <meta name="google-site-verification" content="Sostituisci_con_codice_GSC" />
   ```
8. Sostituisci `Sostituisci_con_codice_GSC` con il codice che hai appena copiato.
9. Salva il file.

---

## checklist "Optimization Max"

- [x] **Dominio Configurato**: Impostato su https://www.mauroceccarelli.it/
- [x] **Meta Title & Description**: Ottimizzati.
- [x] **Open Graph & Twitter**: Configurati con il dominio corretto.
- [x] **Robots.txt**: Aggiornato.
- [x] **Sitemap.xml**: Aggiornato.
- [x] **Canonical Tag**: Aggiornato.
- [ ] **Google Verification**: Da inserire (vedi sopra).
- [ ] **Build & Deploy**: Da eseguire dopo aver inserito il codice di verifica.
