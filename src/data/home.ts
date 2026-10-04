export const recapiti = {
  telefono: 'tel:+393480029661',
  telefonoLeggibile: '348 002 9661',
  whatsapp: 'https://wa.me/393480029661',
  email: 'mauroexe@mauroceccarelli.it',
  linkedin: 'https://www.linkedin.com/in/mauro-ceccarelli-282255296',
  github: 'https://github.com/MauroilFuriano',
  instagram: 'https://www.instagram.com/mauroceccarelli.exe',
  facebook: 'https://www.facebook.com/profile.php?id=61585910800513',
  schedaGoogle: 'https://g.page/r/CRcmqGd6uqZlEBM',
  nuovaRecensioneGoogle: 'https://g.page/r/CRcmqGd6uqZlEBM/review',
  demoHotel: 'https://hotel-automatico.vercel.app/',
} as const;

export const sottotitoloEroe = 'Faccio siti web per hotel, B&B, concessionarie, artigiani e negozi del Piceno. Il prezzo te lo scrivo prima di iniziare, e al telefono rispondo io.';

export interface ImmagineSito {
  src: string;
  larghezza: number;
  altezza: number;
  alt: string;
}

export interface ClienteRecente {
  nome: string;
  luogo: string;
}

export const clientiRecenti: readonly ClienteRecente[] = [
  { nome: 'Redicar', luogo: 'Colonnella (TE)' },
  { nome: 'Ink Service', luogo: 'Ascoli Piceno' },
  { nome: 'Graphic Arts', luogo: 'San Benedetto del Tronto' },
  { nome: 'FC Resinwood', luogo: 'Ascoli Piceno' },
];

export interface Settore {
  nome: string;
  senzaACapo?: string;
  descrizione: string;
  destinazione: string;
  percorso: string;
}

export const settori: readonly Settore[] = [
  {
    nome: 'Hotel e B&B',
    descrizione: 'Prenotazioni dirette, senza regalare commissioni a Booking',
    destinazione: 'mauroceccarelli.it/hotel',
    percorso: '/hotel',
  },
  {
    nome: 'Aziende agricole e prodotti tipici',
    descrizione: 'Un negozio online che vende anche di notte',
    destinazione: 'mauroceccarelli.it/agri-ecommerce',
    percorso: '/agri-ecommerce',
  },
  {
    nome: 'Negozi ed e-commerce',
    senzaACapo: 'e-commerce',
    descrizione: 'Un gestionale su misura per vendite, clienti e ordini',
    destinazione: 'mauroceccarelli.it/saas',
    percorso: '/saas',
  },
  {
    nome: 'Palestre e personal trainer',
    descrizione: 'Schede e atleti in un unico software',
    destinazione: 'Sarcolab, tra i lavori in questa pagina',
    percorso: '#lavori',
  },
  {
    nome: 'Concessionarie, artigiani e studi',
    descrizione: 'Più richieste dalla tua zona',
    destinazione: 'Lavori recenti, in questa pagina',
    percorso: '#lavori',
  },
];

type ScenaServizio =
  | { cornice: 'telefono'; immagine: ImmagineSito; pellicolaChat?: boolean }
  | { cornice: 'browser'; indirizzo: string; immagine: ImmagineSito };

export interface Servizio {
  titolo: string;
  descrizione: string;
  prezzo: string;
  tempi?: string;
  scena: ScenaServizio;
  cartellino: { nome: string; nota: string };
  conAssistente?: boolean;
}

export const servizi: readonly Servizio[] = [
  {
    titolo: 'Siti web per la tua attività.',
    descrizione: 'Il sito che un cliente apre dal telefono, magari in macchina: si carica subito, si capisce cosa fai e ti chiama con un tocco. Lo preparo anche per Google e per gli assistenti come ChatGPT, così ti trovano quando cercano il tuo servizio in zona.',
    prezzo: 'Da 1.500 €',
    tempi: 'pronto in 7-14 giorni',
    scena: {
      cornice: 'telefono',
      immagine: {
        src: '/lavori/fc-resinwood-mobile.webp',
        larghezza: 780,
        altezza: 5064,
        alt: 'Il sito di FC Resinwood aperto su un telefono: un tavolo in legno con un fiume di resina blu e il pulsante Scegli il tuo tavolo',
      },
    },
    cartellino: { nome: 'FC Resinwood', nota: 'un sito costruito intorno alle foto' },
  },
  {
    titolo: 'Un assistente AI che risponde ai clienti.',
    descrizione: "La tua attività perde clienti ogni sera alle 18, quando chiudi. L'assistente, un chatbot AI sul tuo sito, risponde alle domande, prende appuntamenti e ti passa i contatti interessati, anche la domenica alle 23.",
    prezzo: 'Da 4.200 €',
    scena: {
      cornice: 'telefono',
      pellicolaChat: true,
      immagine: {
        src: '/lavori/redicar-mobile.webp',
        larghezza: 780,
        altezza: 5064,
        alt: "Il sito di Redicar aperto su un telefono, con il pulsante rosso della chat dell'assistente in basso a destra",
      },
    },
    cartellino: { nome: 'Redicar', nota: "l'assistente risponde anche fuori orario" },
    conAssistente: true,
  },
  {
    titolo: 'Automazioni e gestionali.',
    descrizione: "Quante ore a settimana i tuoi dipendenti passano a copiare dati da un programma all'altro? Collego i software che usi già e creo piccoli gestionali che fanno quel lavoro al posto loro.",
    prezzo: 'Da 8.000 €',
    scena: {
      cornice: 'browser',
      indirizzo: 'protrainer-phi.vercel.app',
      immagine: {
        src: '/lavori/sarcolab-desktop.webp',
        larghezza: 1440,
        altezza: 2700,
        alt: 'Sarcolab aperto su un computer: la dashboard con le schede da consegnare agli atleti e i numeri del giorno',
      },
    },
    cartellino: { nome: 'Sarcolab', nota: 'il mio gestionale per palestre e personal trainer' },
  },
];

export interface MessaggioAssistente {
  autore: 'ospite' | 'assistente';
  testo: string;
}

export const conversazioneHotel: readonly MessaggioAssistente[] = [
  { autore: 'ospite', testo: 'Buonasera, avete una camera doppia per due notti, da venerdì a domenica?' },
  { autore: 'assistente', testo: 'Buonasera! Sì, da venerdì a domenica è libera una camera doppia. Vuole che la prenoti? Mi dica a che nome.' },
  { autore: 'ospite', testo: 'Sì, grazie. A nome di Giulia Rossi.' },
  { autore: 'assistente', testo: "Prenotazione confermata, signora Rossi. Il suo codice di accesso è 4821: le servirà per entrare in camera all'arrivo." },
];

export interface Lavoro {
  id: string;
  nome: string;
  tipo: string;
  descrizione: string;
  indirizzo: string;
  computer: ImmagineSito;
  telefono: ImmagineSito;
  telefonoFermo?: boolean;
  etichettaInterruttore: string;
  sito?: string;
}

export const lavori: readonly Lavoro[] = [
  {
    id: 'redicar',
    nome: 'Redicar',
    tipo: 'Concessionaria a Colonnella (TE)',
    descrizione: "Sito nuovo con valutatore dell'usato: il cliente inserisce i dati dell'auto, riceve una stima per la permuta e la richiesta arriva su WhatsApp e per email. Un assistente risponde alle domande sulle auto anche fuori orario.",
    indirizzo: 'redicar.it',
    computer: {
      src: '/lavori/redicar-desktop.webp',
      larghezza: 1440,
      altezza: 2700,
      alt: 'Il sito di Redicar su computer: il piazzale delle auto a Colonnella e il titolo Veicoli usati certificati e garantiti',
    },
    telefono: {
      src: '/lavori/redicar-mobile.webp',
      larghezza: 780,
      altezza: 5064,
      alt: 'Il sito di Redicar su telefono, con i pulsanti Vedi parco auto e Valuta il tuo usato',
    },
    etichettaInterruttore: 'Mostra il sito di Redicar su',
    sito: 'https://www.redicar.it/',
  },
  {
    id: 'ink-service',
    nome: 'Ink Service',
    tipo: 'Centro stampa ad Ascoli Piceno',
    descrizione: 'Sito per un centro stampa storico di Ascoli, con preventivo immediato per stampe, tesi e grande formato.',
    indirizzo: 'ink-service.com',
    computer: {
      src: '/lavori/ink-service-desktop.webp',
      larghezza: 1440,
      altezza: 2700,
      alt: 'Il sito di Ink Service su computer: fondo blu notte e il titolo Diamo forma alle tue idee',
    },
    telefono: {
      src: '/lavori/ink-service-mobile.webp',
      larghezza: 780,
      altezza: 5064,
      alt: 'Il sito di Ink Service su telefono, con il pulsante Crea la tua grafica',
    },
    etichettaInterruttore: 'Mostra il sito di Ink Service su',
    sito: 'https://ink-service.com/',
  },
  {
    id: 'graphic-arts',
    nome: 'Graphic Arts',
    tipo: 'Tipolitografia a San Benedetto del Tronto',
    descrizione: 'Un configuratore per creare t-shirt e felpe con scritte, colori e grafiche proprie, e una galleria con più di 240 lavori.',
    indirizzo: 'graphic-arts.net',
    computer: {
      src: '/lavori/graphic-arts-desktop.webp',
      larghezza: 1440,
      altezza: 2700,
      alt: 'Il sito di Graphic Arts su computer: il titolo Tipografia e creatività in sintonia con la stampa e i pulsanti per creare una t-shirt',
    },
    telefono: {
      src: '/lavori/graphic-arts-mobile.webp',
      larghezza: 780,
      altezza: 5064,
      alt: "Il sito di Graphic Arts su telefono, con i pulsanti Genera con l'AI e Crea t-shirt",
    },
    etichettaInterruttore: 'Mostra il sito di Graphic Arts su',
    sito: 'https://graphic-arts.net/',
  },
  {
    id: 'fc-resinwood',
    nome: 'FC Resinwood',
    tipo: 'Laboratorio artigiano ad Ascoli Piceno',
    descrizione: "Tavoli in legno d'ulivo e resina fatti a mano, tutti pezzi unici: per questo il sito è costruito intorno alle foto.",
    indirizzo: 'fcresinwoodcreations.com',
    computer: {
      src: '/lavori/fc-resinwood-desktop.webp',
      larghezza: 1440,
      altezza: 2700,
      alt: 'Il sito di FC Resinwood su computer: un tavolo in legno con un fiume di resina blu e il titolo Legno e resina su misura',
    },
    telefono: {
      src: '/lavori/fc-resinwood-mobile.webp',
      larghezza: 780,
      altezza: 5064,
      alt: 'Il sito di FC Resinwood su telefono, con il pulsante Scegli il tuo tavolo',
    },
    etichettaInterruttore: 'Mostra il sito di FC Resinwood su',
    sito: 'https://fcresinwoodcreations.com/',
  },
  {
    id: 'sarcolab',
    nome: 'Sarcolab',
    tipo: 'Il mio software per palestre e personal trainer',
    descrizione: "Il gestionale con cui il personal trainer segue i suoi atleti: prepara le schede di allenamento, controlla quante serie fa ogni gruppo muscolare e consegna la scheda all'atleta, anche in PDF. Meno tempo sulle schede, più attenzione agli iscritti.",
    indirizzo: 'protrainer-phi.vercel.app',
    computer: {
      src: '/lavori/sarcolab-desktop.webp',
      larghezza: 1440,
      altezza: 2700,
      alt: "Sarcolab su computer: la dashboard con le schede da consegnare, una scheda di ipertrofia su quattro giorni e l'analisi del volume settimanale per gruppo muscolare",
    },
    telefono: {
      src: '/lavori/sarcolab-mobile.webp',
      larghezza: 780,
      altezza: 1688,
      alt: 'Sarcolab su telefono: la pagina di accesso con il motto Metodo, non improvvisazione',
    },
    telefonoFermo: true,
    etichettaInterruttore: 'Mostra Sarcolab su',
  },
];

export interface Recensione {
  variante: 'redicar' | 'graphic' | 'resinwood' | 'maicol';
  lunga: boolean;
  testo: string;
  senzaACapo?: string;
  autore: string;
  data: string;
}

export const recensioni: readonly Recensione[] = [
  {
    variante: 'redicar',
    lunga: false,
    testo: "Mauro ci ha rifatto completamente il sito di Redicar e devo dire che il risultato mi ha sorpreso davvero. Il sito è veloce, moderno e si usa bene anche dal telefono. […] Se avete un'attività e volete un sito fatto bene, lo consiglio senza esitazione.",
    autore: 'Redicar srl',
    data: 'settembre 2026',
  },
  {
    variante: 'graphic',
    lunga: true,
    testo: 'Ottimo risultato, lavoro chiaro e corretto! Programma x t shirt top',
    senzaACapo: 't shirt',
    autore: 'Tipolitografia Graphic Arts',
    data: 'luglio 2026',
  },
  {
    variante: 'resinwood',
    lunga: true,
    testo: "Cercavo qualcuno che mi costruisse un sito web professionale per la mia attività di tavoli in legno e resina epossidica ad Ascoli Piceno. Grazie a Mauro il sito è veloce, con animazioni professionali, un chatbot integrato e soprattutto è ottimizzato per la SEO e la GEO. Lo consiglio a chiunque abbia un'attività e voglia farsi trovare online da clienti veri.",
    autore: 'Fabio Campanelli, FC Resinwood',
    data: 'aprile 2026',
  },
  {
    variante: 'maicol',
    lunga: true,
    testo: 'Ragazzo serio e professionale, oltre ogni mia aspettativa. Il sito che ha fatto a me è stupendo! Veramente bravo Mauro.',
    autore: 'Maicol Ceccarelli',
    data: 'aprile 2026',
  },
];

export interface PassoMetodo {
  evidenza: string;
  seguito: string;
}

export const passiMetodo: readonly PassoMetodo[] = [
  { evidenza: 'Ci sentiamo al telefono:', seguito: "mi racconti la tua attività e cosa ti serve. Mezz'ora, gratis." },
  { evidenza: 'Ti mando un preventivo scritto,', seguito: 'con prezzo e tempi. Se ti va bene, partiamo.' },
  { evidenza: 'Preparo il sito e te lo faccio vedere man mano.', seguito: 'Dopo la consegna hai due giri di modifiche compresi.' },
  { evidenza: 'Lo metto online', seguito: 'con dominio, hosting e certificato SSL già sistemati, e resto il tuo riferimento.' },
];

export interface VoceListino {
  nome: string;
  tempi?: string;
  prezzo: string;
}

export const listino: readonly VoceListino[] = [
  { nome: 'Landing page', tempi: 'in 5 giorni', prezzo: 'da 700 €' },
  { nome: 'Sito vetrina (4-10 pagine)', tempi: 'in 7-14 giorni', prezzo: 'da 1.500 €' },
  { nome: 'E-commerce', tempi: 'in 20-60 giorni', prezzo: 'da 3.500 €' },
  { nome: 'Assistente AI', prezzo: 'da 4.200 €' },
  { nome: 'Sito con assistente AI', prezzo: 'da 5.700 €' },
  { nome: 'E-commerce con assistente AI', prezzo: 'da 8.000 €' },
  { nome: 'Gestionali e web app', tempi: 'in 8-12 settimane', prezzo: 'da 8.000 €' },
];

export interface DomandaFrequente {
  domanda: string;
  risposta: string;
}

export const domandeFrequenti: readonly DomandaFrequente[] = [
  {
    domanda: 'Quanto costa un sito?',
    risposta: 'Un sito vetrina parte da 1.500 €, una landing page da 700 €. Il prezzo finale è scritto nel preventivo, prima di iniziare.',
  },
  {
    domanda: 'In quanto tempo è pronto?',
    risposta: 'Una landing page in 5 giorni, un sito vetrina in 7-14 giorni, un e-commerce tra 20 e 60 giorni, un gestionale tra 8 e 12 settimane.',
  },
  {
    domanda: 'Cosa è compreso?',
    risposta: "Il sito online e funzionante, con dominio, hosting e certificato SSL che gestisco io: il rinnovo annuale ha una quota che concordiamo all'inizio. Sono compresi anche due giri di modifiche dopo la consegna.",
  },
  {
    domanda: 'E se dopo voglio cambiare qualcosa?',
    risposta: 'Dopo i due giri compresi, le modifiche si pagano a ore. Mi scrivi su WhatsApp e ne parliamo.',
  },
  {
    domanda: 'Ho già Facebook e Instagram: mi serve anche un sito?',
    risposta: 'Sì, se vuoi farti trovare da chi ti cerca su Google. I social cambiano le regole quando vogliono e la tua visibilità cambia con loro; il sito invece è tuo.',
  },
  {
    domanda: 'Perché non usi WordPress o Shopify?',
    risposta: 'Scrivo il codice da zero: il sito è più veloce e non dipende da plugin da aggiornare o da abbonamenti a piattaforme esterne.',
  },
  {
    domanda: "Cos'è la GEO e perché mi riguarda?",
    risposta: 'È il lavoro che serve perché ChatGPT, Google e gli altri assistenti ti citino quando qualcuno chiede, per esempio, “chi fa siti ad Ascoli Piceno?”. La curo insieme alla SEO.',
  },
  {
    domanda: 'Lavori anche con le agenzie?',
    risposta: "Sì, anche in white label: sviluppo il progetto e consegno il codice all'agenzia.",
  },
];
