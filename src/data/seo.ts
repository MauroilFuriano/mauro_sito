import { abbonamenti, domandeFrequenti, listino, prezzoDellaVoce, recapiti, servizi, sintesiAttivita, sottotitoloEroe, vetrinaEroe, type DomandaFrequente, type ImmagineSito } from './home';
import { paginaAbbonamenti, paginaAgricola, paginaAssistente, paginaAuditGeo, paginaConcessionarie, paginaGestionale, paginaHotel, paginaPrezzi, paginaSchedaGoogle, type ContenutoPaginaServizio } from './pagineServizio';

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

const servizioDellaPagina = (percorso: string, nome: string, descrizione: string, prezzo?: number) => ({
  '@type': 'Service',
  name: nome,
  description: descrizione,
  url: `${SITO}${percorso}`,
  provider: fornitore,
  areaServed: { '@type': 'Country', name: 'Italia' },
  ...(prezzo ? { offers: { '@type': 'Offer', price: prezzo, priceCurrency: 'EUR', url: `${SITO}${percorso}` } } : {}),
});

const domandeDellaPagina = (domande: readonly DomandaFrequente[]) => ({
  '@type': 'FAQPage',
  mainEntity: domande.map(({ domanda, risposta }) => ({
    '@type': 'Question',
    name: domanda,
    acceptedAnswer: { '@type': 'Answer', text: risposta },
  })),
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
    areaServed: ['Ascoli Piceno', 'Marche', 'Abruzzo', 'Italia'],
    priceRange: '€€',
    hasMap: recapiti.schedaGoogle,
    sameAs: [recapiti.linkedin, recapiti.github, recapiti.instagram, recapiti.facebook],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Listino',
      itemListElement: listino.map((voce) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: voce.nome },
        ...(voce.canone ? { description: voce.canone.startsWith('+') ? `Più ${voce.canone.replace(/^\+\s*/, '')}` : 'Prezzo mensile, durata minima 6 mesi' } : {}),
        priceSpecification: {
          '@type': 'PriceSpecification',
          ...(voce.prezzo.startsWith('da') ? { minPrice: prezzoMinimo(voce.prezzo) } : { price: prezzoMinimo(voce.prezzo) }),
          priceCurrency: 'EUR',
        },
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
  domandeDellaPagina(domandeFrequenti),
];

const conTempi = (prezzo: string, tempi?: string) => (tempi ? `${prezzo}, ${tempi}` : prezzo);

const vociDelleDomande = (domande: readonly DomandaFrequente[]) => domande.map(({ domanda, risposta }) => `${domanda} ${risposta}`);

const senzaJsDelServizio = ({ titolo, sottotitolo, prezzo, titoloPunti, punti, conListino, conAbbonamenti, argomento, chiusura, domande }: ContenutoPaginaServizio): ContenutoSenzaJs => ({
  titolo,
  paragrafi: [sottotitolo, prezzo, argomento.testo, chiusura.testo],
  sezioni: [
    ...(conAbbonamenti ? [{ titolo: 'I tre abbonamenti', voci: abbonamenti.map((piano) => `${piano.nome}, da ${piano.prezzoMensile} € al mese. ${piano.incluso.join('; ')}`) }] : []),
    { titolo: titoloPunti, voci: punti.map((punto) => `${punto.titolo}: ${punto.testo}`) },
    ...(conListino ? [{ titolo: 'Il listino', voci: listino.map((voce) => `${voce.nome}: ${conTempi(prezzoDellaVoce(voce), voce.tempi)}`) }] : []),
    ...(domande ? [{ titolo: 'Domande frequenti', voci: vociDelleDomande(domande) }] : []),
  ],
});

export const pagine: readonly PaginaDelSito[] = [
  {
    percorso: '/',
    etichetta: 'Home',
    titolo: 'Sviluppatore web Ascoli Piceno: siti da 1.500 € | Mauro.exe',
    descrizione: 'Siti web per hotel, negozi e artigiani del Piceno: prezzo scritto prima di iniziare, sito vetrina in 7-14 giorni. Chiama il 348 002 9661.',
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
    immagineDaPrecaricare: vetrinaEroe.principale,
    datiStrutturati: grafoHome,
    senzaJs: {
      titolo: 'Sviluppatore web ad Ascoli Piceno',
      paragrafi: [sottotitoloEroe, 'Se non rispondo subito, ti richiamo entro 24 ore.', sintesiAttivita],
      sezioni: [
        { titolo: 'Servizi', voci: servizi.map((servizio) => `${servizio.titolo} ${servizio.prezzo}. ${servizio.descrizione}`) },
        { titolo: 'Listino', voci: listino.map((voce) => `${voce.nome}: ${conTempi(prezzoDellaVoce(voce), voce.tempi)}`) },
        { titolo: 'Domande frequenti', voci: vociDelleDomande(domandeFrequenti) },
      ],
    },
  },
  {
    percorso: '/hotel',
    etichetta: 'Hotel',
    titolo: "Sito per hotel e B&B nelle Marche | Mauro.exe",
    descrizione: "Sito per hotel e B&B nelle Marche: assistente AI che risponde agli ospiti 24 ore su 24, in più lingue, e prenotazioni dirette senza commissioni Booking.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
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
    ultimaModifica: '2026-10-19',
    datiStrutturati: [
      servizioDellaPagina('/agri-ecommerce', 'E-commerce per aziende agricole con assistente AI', 'Negozio online per aziende agricole e produttori di vino, miele e formaggi, con un assistente AI che risponde ai clienti anche di notte.'),
    ],
    senzaJs: senzaJsDelServizio(paginaAgricola),
  },
  {
    percorso: '/quanto-costa-un-assistente-ai',
    etichetta: 'Quanto costa un assistente AI',
    titolo: "Quanto costa un assistente AI per prenotazioni | Mauro.exe",
    descrizione: "Un assistente AI che risponde ai clienti e prende appuntamenti e prenotazioni costa da 490 € più 149 € al mese. Cosa fa, cosa comprende e quando conviene.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
    datiStrutturati: [
      servizioDellaPagina('/quanto-costa-un-assistente-ai', 'Assistente AI per appuntamenti e prenotazioni', "Assistente AI per il sito di un'attività: risponde ai clienti a qualsiasi ora, prende appuntamenti e prenotazioni e passa i contatti interessati. Da 490 € più un canone mensile di 149 €.", 490),
      domandeDellaPagina(paginaAssistente.domande ?? []),
    ],
    senzaJs: senzaJsDelServizio(paginaAssistente),
  },
  {
    percorso: '/sito-per-concessionarie',
    etichetta: 'Sito per concessionarie',
    titolo: "Sito per concessionarie con valutatore usato | Mauro.exe",
    descrizione: "Siti per concessionarie con parco auto, valutatore dell'usato e assistente AI che risponde fuori orario. Sito vetrina da 1.500 €. Ascoli Piceno e Marche.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
    datiStrutturati: [
      servizioDellaPagina('/sito-per-concessionarie', 'Sito per concessionarie', "Sito per concessionarie con parco auto, valutatore dell'usato e assistente AI che risponde ai clienti anche fuori orario."),
      domandeDellaPagina(paginaConcessionarie.domande ?? []),
    ],
    senzaJs: senzaJsDelServizio(paginaConcessionarie),
  },
  {
    percorso: '/scheda-google',
    etichetta: 'Scheda Google',
    titolo: "Scheda Google attività Ascoli Piceno: 199 € | Mauro.exe",
    descrizione: "Sistemo la scheda Google della tua attività: dati, orari, categorie, foto e un kit per chiedere le recensioni. 199 € per una sede. Ascoli Piceno e Marche.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
    datiStrutturati: [
      servizioDellaPagina('/scheda-google', 'Sistemazione della scheda Google', "Sistemazione della scheda Google di un'attività locale: dati, orari, categorie, descrizione, foto e un kit per chiedere le recensioni ai clienti.", 199),
      domandeDellaPagina(paginaSchedaGoogle.domande ?? []),
    ],
    senzaJs: senzaJsDelServizio(paginaSchedaGoogle),
  },
  {
    percorso: '/audit-geo',
    etichetta: 'Audit GEO',
    titolo: "Audit GEO: comparire su ChatGPT e Gemini | Mauro.exe",
    descrizione: "Provo le domande dei tuoi clienti su ChatGPT, Gemini e Perplexity e ti consegno un report su cosa sistemare per essere citato. Audit GEO a 490 €.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
    datiStrutturati: [
      servizioDellaPagina('/audit-geo', 'Audit GEO', "Controllo se ChatGPT, Gemini e Perplexity citano un'attività, con un report delle correzioni da fare in ordine di importanza.", 490),
      domandeDellaPagina(paginaAuditGeo.domande ?? []),
    ],
    senzaJs: senzaJsDelServizio(paginaAuditGeo),
  },
  {
    percorso: '/quanto-costa-un-sito-web',
    etichetta: 'Quanto costa un sito web',
    titolo: "Quanto costa un sito web? Prezzi da 700 € | Mauro.exe",
    descrizione: "Landing page da 700 €, sito vetrina da 1.500 €, e-commerce da 3.500 €. Cosa fa cambiare il prezzo di un sito web e come funziona il preventivo scritto.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
    datiStrutturati: [domandeDellaPagina(paginaPrezzi.domande ?? [])],
    senzaJs: senzaJsDelServizio(paginaPrezzi),
  },
  {
    percorso: '/abbonamenti',
    etichetta: 'Abbonamenti mensili',
    titolo: "Abbonamenti mensili: scheda Google e GEO | Mauro.exe",
    descrizione: "Presenza locale da 79 € al mese, GEO base da 490 €, GEO completo da 890 €. Cosa è compreso, durata minima 6 mesi e disdetta con 30 giorni di preavviso.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
    datiStrutturati: [domandeDellaPagina(paginaAbbonamenti.domande ?? [])],
    senzaJs: senzaJsDelServizio(paginaAbbonamenti),
  },
  {
    percorso: '/simulatore',
    etichetta: 'Calcola il preventivo',
    titolo: "Simulatore preventivo sito web: stima subito | Mauro.exe",
    descrizione: "Scegli il tipo di sito e le funzioni che ti servono: il simulatore calcola subito una stima del prezzo. Poi ti mando il preventivo scritto via email.",
    indicizzabile: true,
    ultimaModifica: '2026-10-19',
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

