# Piano di Restyling Sezione "Chi Sono" (About)

L'obiettivo è trasformare la sezione About in un punto focale di credibilità, utilizzando un'immagine di grandi dimensioni (1200x630px) e un layout più ordinato e "premium" come suggerito dal ruolo **Web Designer**.

## User Review Required

> [!IMPORTANT]
> L'immagine da 1200x630px cambierà drasticamente l'aspetto della sezione. Assicurati di avere a disposizione un'immagine di alta qualità con queste proporzioni. Se non l'hai ancora creata, caricherò un placeholder professionale in attesa della tua definitiva.

## Proposed Changes

### Restyling Componente About

#### [MODIFY] [About.tsx](file:///c:/Users/Mauro/Desktop/mauro_sito/src/components/About.tsx)
- **Nuovo Layout:**
    - **Header centralizzato:** Titolo "Chi Sono" e main heading centrati per dare ordine.
    - **Immagine "Hero":** Inserimento della grande immagine (1200x630) con angoli arrotondati e bordo neon sottile, posizionata tra l'header e la bio.
    - **Griglia Informativa (Bio + Stats):** Sotto l'immagine, una griglia a due colonne:
        - **Colonna 1 (Bio & Valori):** Il testo della biografia seguito dalle 3 card "Design", "AI", "Risultati".
        - **Colonna 2 (Metrics Dashboard):** La card delle statistiche (Lighthouse score, etc.) ridimensionata per bilanciare il testo a sinistra.
- **Miglioramenti Estetici:**
    - Aggiunta di un effetto "Glassmorphism" più marcato sulle card.
    - Miglioramento della leggibilità del testo bio (spaziatura e contrasto).

---

## Esempio Visivo del Nuovo Layout (Sketch)
```text
[      TITOLO SEZIONE (Chi Sono)      ]
[      SOTTOTITOLO (Il tuo partner)   ]

[      GRANDE IMMAGINE 1200x630       ]
[      (con bordo neon e ombra)       ]

[ COLONNA BIO         | COLONNA STATS ]
[ Bio testo...        | Card metriche ]
[ 3 icone valori      |               ]
```

---

## Verification Plan

### Automated Tests
- Verificare la responsività della nuova griglia e dell'immagine grande su dispositivi mobile (l'immagine dovrà adattarsi o scalare correttamente).
- Controllare i tempi di caricamento (l'immagine grande deve essere WebP!).

### Manual Verification
- Confronto visivo con lo screenshot precedente per assicurarsi che l'ordine sia migliorato.
- Testare l'effetto "Reveal" (animazione all'entrata) sulla nuova struttura.
