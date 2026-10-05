import { domandeFrequenti, listino, recapiti, servizi, sintesiAttivita, sottotitoloEroe, vetrinaEroe, type ImmagineSito } from './home';
import { paginaAgricola, paginaGestionale, paginaHotel, type ContenutoPaginaServizio } from './pagineServizio';

export const SITO = 'https://www.mauroceccarelli.it';

export const immagineAnteprima = {
  indirizzo: `${SITO}/anteprima-sito.jpg`,
  larghezza: 1200,
  altezza: 630,
  alt: 'MAURO.EXE di Mauro Ceccarelli, sviluppatore web ad Ascoli Piceno: siti web e gestionali su misura, con il sito di Redicar su computer e quello di Graphic Arts su telefono',
} as const;

export interface ContenutoSenzaJs {
  titolo: string;
  paragrafi: readonly string[];
  sezioni?: readonly { titolo: string; voci: readonly string[] }[];
}

export interface PaginaDelSito {
  percorso: string;
  etichetta: string;
  titolo: string;
  descrizione: string;
  indicizzabile: boolean;
  ultimaModifica?: string;
  immagineDaPrecaricare?: { immagine: ImmagineSito; misure: string };
  datiStrutturati?: readonly Record<string, unknown>[];
  senzaJs: ContenutoSenzaJs;
}

const ID_AZIENDA = `${SITO}/#azienda`;
const ID_PERSONA = `${SITO}/#persona`;
const ID_SITO = `${SITO}/#sito`;
const NOME_ATTIVITA = 'MAURO.EXE di Mauro Ceccarelli';
const TELEFONO = recapiti.telefono.replace('tel:', '');

const prezzoMinimo = (prezzo: string) => Number(prezzo.replace(/\D/g, ''));

const fornitore = { '@type': 'ProfessionalService', '@id': ID_AZIENDA, name: NOME_ATTIVITA, url: `${SITO}/`, telephone: TELEFONO };

const servizioDellaPagina = (percorso: string, nome: string, descrizione: string) => ({
  '@type': 'Service',
  name: nome,
  description: descrizione,
  url: `${SITO}${percorso}`,
  provider: fornitore,
  areaServed: { '@type': 'Country', name: 'Italia' },
});

const grafoHome = [
  {
    '@type': 'ProfessionalService',
    '@id': ID_AZIENDA,
    name: NOME_ATTIVITA,
    description: 'Sviluppatore web freelance ad Ascoli Piceno: siti web, e-commerce, assistenti AI e gestionali per attività locali, con il prezzo scritto prima di iniziare.',
    url: `${SITO}/`,
    image: immagineAnteprima.indirizzo,
    logo: `${SITO}/logo.webp`,
    telephone: TELEFONO,
    email: recapiti.email,
    vatID: 'IT02606790448',
    founder: { '@id': ID_PERSONA },
    address: { '@type': 'PostalAddress', addressLocality: 'Ascoli Piceno', postalCode: '63100', addressRegion: 'AP', addressCountry: 'IT' },
    geo: { '@type': 'GeoCoordinates', latitude: 42.8535, longitude: 13.5745 },
    areaServed: ['Ascoli Piceno', 'Marche', 'Italia'],
    priceRange: '€€',
    hasMap: recapiti.schedaGoogle,
    sameAs: [recapiti.linkedin, recapiti.github, recapiti.instagram, recapiti.facebook],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Listino',
      itemListElement: listino.map((voce) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: voce.nome },
        priceSpecification: { '@type': 'PriceSpecification', minPrice: prezzoMinimo(voce.prezzo), priceCurrency: 'EUR' },
      })),
    },
  },
  {
    '@type': 'Person',
    '@id': ID_PERSONA,
    name: 'Mauro Ceccarelli',
    jobTitle: 'Sviluppatore web',
    url: `${SITO}/`,
    image: `${SITO}/mauro.webp`,
    worksFor: { '@id': ID_AZIENDA },
    sameAs: [recapiti.linkedin, recapiti.github, recapiti.instagram],
  },
  { '@type': 'WebSite', '@id': ID_SITO, url: `${SITO}/`, name: 'Mauro.exe', inLanguage: 'it-IT', publisher: { '@id': ID_AZIENDA } },
  {
    '@type': 'FAQPage',
    mainEntity: domandeFrequenti.map(({ domanda, risposta }) => ({
      '@type': 'Question',
      name: domanda,
      acceptedAnswer: { '@type': 'Answer', text: risposta },
    })),
  },
];

const conTempi = (prezzo: string, tempi?: string) => (tempi ? `${prezzo}, ${tempi}` : prezzo);

const senzaJsDelServizio = ({ titolo, sottotitolo, prezzo, titoloPunti, punti, argomento, chiusura }: ContenutoPaginaServizio): ContenutoSenzaJs => ({
  titolo,
  paragrafi: [sottotitolo, prezzo, argomento.testo, chiusura.testo],
  sezioni: [{ titolo: titoloPunti, voci: punti.map((punto) => `${punto.titolo}: ${punto.testo}`) }],
});

export const pagine: readonly PaginaDelSito[] = [
  {
    percorso: '/',
    etichetta: 'Home',
    titolo: 'Sviluppatore web Ascoli Piceno: siti da 1.500 € | Mauro.exe',
    descrizione: 'Siti web per hotel, negozi e artigiani del Piceno: prezzo scritto prima di iniziare, sito vetrina in 7-14 giorni. Chiama il 348 002 9661.',
    indicizzabile: true,
    ultimaModifica: '2026-10-04',
    immagineDaPrecaricare: vetrinaEroe.principale,
    datiStrutturati: grafoHome,
    senzaJs: {
      titolo: 'Sviluppatore web ad Ascoli Piceno',
      paragrafi: [sottotitoloEroe, 'Se non rispondo subito, ti richiamo entro 24 ore.', sintesiAttivita],
      sezioni: [
        { titolo: 'Servizi', voci: servizi.map((servizio) => `${servizio.titolo} ${servizio.prezzo}. ${servizio.descrizione}`) },
        { titolo: 'Listino', voci: listino.map((voce) => `${voce.nome}: ${conTempi(voce.prezzo, voce.tempi)}`) },
        { titolo: 'Domande frequenti', voci: domandeFrequenti.map(({ domanda, risposta }) => `${domanda} ${risposta}`) },
      ],
    },
  },
  {
    percorso: '/hotel',
    etichetta: 'Hotel',
    titolo: 'Sito per hotel e B&B con prenotazioni dirette | Mauro.exe',
    descrizione: 'Sito per hotel e B&B con assistente AI che risponde agli ospiti 24 ore su 24, in più lingue, e prenota senza commissioni di Booking.',
    indicizzabile: true,
    ultimaModifica: '2026-10-04',
    datiStrutturati: [
      servizioDellaPagina('/hotel', 'Sito per hotel e B&B con assistente AI', 'Sito per hotel, B&B e case vacanza con un assistente AI che risponde agli ospiti 24 ore su 24 in più lingue e raccoglie prenotazioni dirette.'),
    ],
    senzaJs: senzaJsDelServizio(paginaHotel),
  },
  {
    percorso: '/saas',
    etichetta: 'Gestionali per negozi',
    titolo: 'Gestionale ordini e clienti per negozi online | Mauro.exe',
    descrizione: 'Dashboard su misura per gestire ordini e clienti del tuo negozio online, senza canoni mensili di piattaforme standard. Sviluppata ad Ascoli Piceno.',
    indicizzabile: true,
    ultimaModifica: '2026-10-04',
    datiStrutturati: [
      servizioDellaPagina('/saas', 'Gestionale ordini e clienti per negozi online', 'Dashboard su misura per gestire vendite, clienti e ordini di un negozio online, senza canoni mensili di piattaforme standard.'),
    ],
    senzaJs: senzaJsDelServizio(paginaGestionale),
  },
  {
    percorso: '/agri-ecommerce',
    etichetta: 'Aziende agricole',
    titolo: 'E-commerce per aziende agricole e cantine | Mauro.exe',
    descrizione: 'Negozio online per aziende agricole: vino, miele e formaggi venduti anche di notte, con un assistente AI che risponde ai clienti. Sviluppato nelle Marche.',
    indicizzabile: true,
    ultimaModifica: '2026-10-04',
    datiStrutturati: [
      servizioDellaPagina('/agri-ecommerce', 'E-commerce per aziende agricole con assistente AI', 'Negozio online per aziende agricole e produttori di vino, miele e formaggi, con un assistente AI che risponde ai clienti anche di notte.'),
    ],
    senzaJs: senzaJsDelServizio(paginaAgricola),
  },
  {
    percorso: '/simulatore',
    etichetta: 'Calcola il preventivo',
    titolo: 'Quanto costa un sito web? Calcola il preventivo | Mauro.exe',
    descrizione: 'Scegli il tipo di sito e le funzioni che ti servono: il simulatore calcola subito una stima del prezzo e prepara il riepilogo da inviare su WhatsApp.',
    indicizzabile: true,
    ultimaModifica: '2026-10-04',
    senzaJs: {
      titolo: 'Quanto costa il tuo sito? Calcola il preventivo.',
      paragrafi: ['Scegli cosa ti serve e vedi subito una stima. Il prezzo finale te lo scrivo nel preventivo, prima di iniziare.'],
    },
  },
  {
    percorso: '/privacy-policy',
    etichetta: 'Privacy policy',
    titolo: 'Privacy policy | Mauro.exe',
    descrizione: 'Come mauroceccarelli.it tratta i tuoi dati: richieste di contatto, assistente AI, statistiche con consenso, conservazione e diritti previsti dal GDPR.',
    indicizzabile: true,
    ultimaModifica: '2026-10-04',
    senzaJs: {
      titolo: 'Privacy Policy',
      paragrafi: ['Informativa sul trattamento dei dati personali di mauroceccarelli.it ai sensi del Regolamento UE 2016/679 (GDPR).'],
    },
  },
  {
    percorso: '/cookie-policy',
    etichetta: 'Cookie policy',
    titolo: 'Cookie policy | Mauro.exe',
    descrizione: "Cookie e strumenti di tracciamento di mauroceccarelli.it, secondo l'art. 122 del Codice Privacy e le Linee guida cookie del Garante del 10 giugno 2021.",
    indicizzabile: true,
    ultimaModifica: '2026-10-04',
    senzaJs: {
      titolo: 'Cookie Policy',
      paragrafi: ['Senza il tuo consenso il sito non usa cookie: salva nel browser solo la scelta fatta nel banner e il tema della home.'],
    },
  },
  {
    percorso: '/card',
    etichetta: 'Biglietto da visita',
    titolo: 'Biglietto da visita digitale | Mauro Ceccarelli',
    descrizione: 'Salva i contatti di Mauro Ceccarelli, sviluppatore web ad Ascoli Piceno: telefono, WhatsApp ed email.',
    indicizzabile: false,
    senzaJs: {
      titolo: 'Mauro Ceccarelli',
      paragrafi: ['Sviluppatore Web & AI'],
    },
  },
];

export const ROBOTS_INDICE = 'index, follow, max-image-preview:large, max-snippet:-1';
export const ROBOTS_ESCLUSA = 'noindex, follow';

export const testoRobots = (pagina: PaginaDelSito) => (pagina.indicizzabile ? ROBOTS_INDICE : ROBOTS_ESCLUSA);

export const urlDellaPagina = (pagina: PaginaDelSito) => `${SITO}${pagina.percorso}`;

export const jsonLdDellaPagina = (pagina: PaginaDelSito) =>
  pagina.datiStrutturati
    ? JSON.stringify({ '@context': 'https://schema.org', '@graph': pagina.datiStrutturati }).replace(/</g, '\\u003c')
    : null;

export const trovaPagina = (percorso: string) => {
  const percorsoSenzaBarra = percorso.length > 1 ? percorso.replace(/\/+$/, '') : percorso;
  return pagine.find((pagina) => pagina.percorso === percorsoSenzaBarra) ?? pagine[0];
};

