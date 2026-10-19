import { recapiti, type DomandaFrequente, type PassoMetodo } from './home';

export interface PuntoServizio {
  titolo: string;
  testo: string;
}

export interface ContenutoPaginaServizio {
  etichetta: string;
  titolo: string;
  sottotitolo: string;
  prezzo: string;
  demo?: { testo: string; indirizzo: string };
  titoloPunti: string;
  punti: readonly PuntoServizio[];
  conListino?: boolean;
  argomento: { titolo: string; testo: string };
  passi?: readonly PassoMetodo[];
  chiusura: { titolo: string; testo: string };
  domande?: readonly DomandaFrequente[];
  altriPassi?: readonly { testo: string; percorso: string }[];
}

export const paginaHotel: ContenutoPaginaServizio = {
  etichetta: 'Per hotel, B&B e case vacanza',
  titolo: 'Sito per hotel e B&B con prenotazioni dirette',
  sottotitolo: 'Faccio il sito della tua struttura con un assistente AI che risponde agli ospiti a qualsiasi ora, anche in altre lingue, e li aiuta a prenotare. Chi prenota dal tuo sito non passa da Booking, quindi niente commissione.',
  prezzo: "Sito con assistente AI da 1.990 €, più 149 € al mese per tenere attivo l'assistente. Il prezzo te lo scrivo prima di iniziare.",
  demo: { testo: "Prova l'assistente sul sito demo", indirizzo: recapiti.demoHotel },
  titoloPunti: "Cosa fa l'assistente",
  punti: [
    { titolo: "Capisce come scrive l'ospite", testo: "L'ospite scrive come parlerebbe alla reception: niente menu o comandi da imparare." },
    { titolo: 'Si accorge degli errori sulle date', testo: "Se l'ospite mette il check-out prima del check-in, glielo fa notare e lo aiuta a correggere. Puoi provarlo sulla demo." },
    { titolo: "Risponde nella lingua dell'ospite", testo: 'Agli ospiti stranieri risponde nella loro lingua, anche quando la reception è chiusa.' },
  ],
  argomento: {
    titolo: 'Perché un sito tuo',
    testo: 'Se chi cerca il nome della tua struttura su Google trova solo Booking, paghi la commissione anche su chi ti conosceva già. Con un sito tuo, chi prenota direttamente arriva a te senza intermediari.',
  },
  chiusura: {
    titolo: 'Vuoi vedere come funzionerebbe da te?',
    testo: "Chiamami o scrivimi: se mi mandi foto e logo, ti preparo un'anteprima gratuita con la tua struttura.",
  },
};

export const paginaGestionale: ContenutoPaginaServizio = {
  etichetta: 'Per negozi online e attività che vendono',
  titolo: 'Gestionale ordini e clienti per il tuo negozio online',
  sottotitolo: "Costruisco l'area dove gestisci vendite, clienti e ordini, fatta su misura per come lavori. È tua: non paghi un canone mensile a una piattaforma standard.",
  prezzo: 'Gestionali e web app da 8.000 €, pronti in 8-12 settimane. Il prezzo te lo scrivo prima di iniziare.',
  titoloPunti: 'Cosa ci trovi dentro',
  punti: [
    { titolo: 'Area clienti', testo: 'I tuoi clienti entrano con le loro credenziali e seguono i propri ordini da soli.' },
    { titolo: 'Pagamenti', testo: 'Carte, Apple Pay e Google Pay direttamente nel tuo negozio, alle tue condizioni.' },
    { titolo: 'Ordini, magazzino e spedizioni', testo: 'Un solo pannello per controllare il magazzino, evadere le spedizioni e vedere le vendite.' },
    { titolo: 'Avvisi automatici', testo: 'Ti avvisa a ogni vendita e aggiorna i clienti sullo stato della spedizione.' },
  ],
  argomento: {
    titolo: 'Perché su misura',
    testo: 'Le piattaforme standard si pagano ogni mese e ti fanno lavorare come hanno deciso loro. Un gestionale fatto per te segue il modo in cui lavori già, e resta tuo.',
  },
  chiusura: {
    titolo: 'Raccontami come lavori oggi',
    testo: 'In una telefonata capisco cosa ti serve e ti dico se conviene un gestionale su misura o se basta qualcosa di più semplice.',
  },
};

export const paginaAgricola: ContenutoPaginaServizio = {
  etichetta: 'Per aziende agricole, cantine e frantoi',
  titolo: 'E-commerce per aziende agricole e cantine',
  sottotitolo: 'Faccio il negozio online per chi produce vino, olio, miele o formaggi: raccoglie ordini e pagamenti anche di notte, e un assistente AI risponde ai clienti sui tuoi prodotti.',
  prezzo: 'E-commerce da 3.500 €, con assistente AI da 3.990 € più 149 € al mese. Il prezzo te lo scrivo prima di iniziare.',
  titoloPunti: 'Cosa ottieni',
  punti: [
    { titolo: 'Un negozio sempre aperto', testo: 'Ordini e pagamenti arrivano anche alle tre di notte, mentre riposi.' },
    { titolo: 'Un assistente che conosce i tuoi prodotti', testo: 'Risponde ai dubbi dei clienti e consiglia gli abbinamenti, partendo da quello che gli insegni tu.' },
    { titolo: 'Ordini e spedizioni in un posto solo', testo: 'Vedi cosa è stato venduto, cosa spedire e a chi, senza fogli sparsi.' },
    { titolo: 'Clienti che tornano', testo: 'Puoi mandare ricette, consigli di conservazione o promozioni via email e WhatsApp a chi ha dato il consenso.' },
    { titolo: 'I prodotti li carico io', testo: 'Il primo caricamento del catalogo lo faccio io: tu mi mandi foto e descrizioni.' },
  ],
  argomento: {
    titolo: 'Perché un negozio tuo',
    testo: 'Vendere solo sui marketplace o a voce significa dipendere da altri per farti trovare. Con un negozio tuo, i clienti ti ritrovano e ordinano di nuovo direttamente da te.',
  },
  chiusura: {
    titolo: 'Parliamo dei tuoi prodotti',
    testo: "Chiamami o scrivimi: in mezz'ora capiamo cosa vendere online e quanto costa.",
  },
};

export const paginaSchedaGoogle: ContenutoPaginaServizio = {
  etichetta: 'Per attività locali',
  titolo: 'Scheda Google della tua attività, sistemata a 199 €',
  sottotitolo: "Quando qualcuno cerca un servizio con il nome di una città, Google mostra per prime le schede delle attività sulla mappa. Se la tua è incompleta o vecchia, il cliente ne sceglie un'altra. Per 199 € sistemo la tua scheda: dati e orari giusti, categorie, descrizione, foto e un kit per chiedere le recensioni ai clienti. Il lavoro lo faccio io: tu mi dai l'accesso e mi mandi le foto.",
  prezzo: '199 € per una sede, IVA esclusa.',
  titoloPunti: 'Cosa sistemo',
  punti: [
    { titolo: 'Dati giusti e uguali ovunque', testo: 'Nome, indirizzo, telefono, orari e sito scritti come sul tuo sito, così Google non trova versioni diverse della tua attività.' },
    { titolo: 'Categorie e descrizione', testo: 'Scelgo la categoria principale e quelle secondarie, e scrivo una descrizione chiara di cosa fai e dove.' },
    { titolo: 'Servizi e prodotti', testo: "Inserisco l'elenco di quello che offri, con una breve descrizione." },
    { titolo: 'Foto', testo: 'Carico le foto che mi mandi, dalla vetrina ai tuoi lavori, e ti dico quali mancano.' },
    { titolo: 'Kit per le recensioni', testo: 'Link diretto per lasciare una recensione, QR code da stampare e messaggio WhatsApp già scritto da mandare ai clienti.' },
  ],
  argomento: {
    titolo: 'Cosa dipende da te e da Google',
    testo: 'La scheda deve essere verificata da Google e la verifica spetta al titolare: ti spiego io come farla. Le recensioni non posso garantirle né comprarle: le scrivono i tuoi clienti, se glielo chiedi. Offrire sconti in cambio di una recensione, o chiederla solo ai clienti contenti, va contro le regole di Google.',
  },
  passi: [
    { evidenza: 'Ci sentiamo al telefono:', seguito: "mi dici cosa fai e guardiamo insieme la scheda che hai oggi. Mezz'ora, gratis." },
    { evidenza: "Mi dai l'accesso e le foto:", seguito: 'se la scheda non esiste, la creo con te e ti dico come fare la verifica con Google.' },
    { evidenza: 'Sistemo la scheda', seguito: 'e ti mando il riepilogo di cosa ho cambiato.' },
    { evidenza: 'Ti consegno il kit per le recensioni', seguito: 'e ti spiego come usarlo con i tuoi clienti.' },
  ],
  chiusura: {
    titolo: 'Partiamo dalla tua scheda',
    testo: "Chiamami o scrivimi il nome della tua attività: guardo la scheda che hai oggi e ti dico cosa c'è da sistemare, senza impegno.",
  },
  domande: [
    { domanda: 'Quanto costa sistemare la scheda Google?', risposta: '199 €, IVA esclusa, per una sede. Se le sedi sono più di una, ti scrivo il prezzo prima di iniziare.' },
    { domanda: 'Mi garantisci più recensioni?', risposta: 'No, nessuno può garantirle: le scrivono i tuoi clienti. Ti do il modo più semplice per chiederle: link diretto, QR code e un messaggio già scritto.' },
    { domanda: 'Quanto tempo ci vuole?', risposta: 'Dipende da quando mi mandi foto e informazioni e dalla verifica di Google, che ha tempi suoi. Il lavoro sulla scheda lo faccio appena ho tutto.' },
    { domanda: 'Mi serve anche il sito?', risposta: 'No: la scheda funziona anche da sola. Se un giorno vuoi un sito, lo colleghiamo alla scheda.' },
    { domanda: 'Posso sistemarla da solo?', risposta: 'Sì, la scheda è gratuita e puoi sistemarla anche da solo. Se non hai tempo o non sai da dove cominciare, lo faccio io.' },
  ],
  altriPassi: [
    { testo: 'Controllo se ChatGPT e Gemini ti citano', percorso: '/audit-geo' },
    { testo: 'Quanto costa un sito web', percorso: '/quanto-costa-un-sito-web' },
  ],
};

export const paginaAuditGeo: ContenutoPaginaServizio = {
  etichetta: 'Per attività che vogliono essere citate dagli assistenti AI',
  titolo: 'Audit GEO: controllo se ChatGPT e Gemini ti citano',
  sottotitolo: "Chi cerca un servizio può chiedere a ChatGPT, Gemini o Perplexity: “chi fa siti ad Ascoli Piceno?”. L'audit GEO controlla se il tuo nome compare nelle risposte e cosa impedisce agli assistenti di citarti. Provo le domande dei tuoi clienti, controllo il tuo sito e la tua scheda Google, e ti consegno un report con le cose da sistemare, in ordine di importanza.",
  prezzo: 'Audit GEO a 490 €, IVA esclusa, una tantum.',
  titoloPunti: 'Cosa controllo',
  punti: [
    { titolo: 'Le domande dei tuoi clienti', testo: 'Provo su ChatGPT, Gemini e Perplexity le domande con cui un cliente ti cercherebbe, e ti mostro cosa rispondono.' },
    { titolo: 'Il tuo sito', testo: 'Controllo che gli assistenti possano leggerlo: testi chiari, domande frequenti, dati strutturati e nessun blocco tecnico.' },
    { titolo: 'I tuoi dati in giro', testo: 'Verifico che nome, indirizzo e telefono siano uguali su sito, scheda Google e altri elenchi.' },
    { titolo: 'Il report', testo: 'Un documento in italiano semplice, con quello che manca e da dove conviene cominciare.' },
  ],
  argomento: {
    titolo: 'Cosa non posso promettere',
    testo: "Nessuno può garantire che un assistente AI ti citi: le risposte cambiano da una prova all'altra e da un assistente all'altro. L'audit ti dice com'è la situazione oggi e cosa puoi migliorare. Non ti prometto posizioni né risultati.",
  },
  passi: [
    { evidenza: 'Ci sentiamo al telefono:', seguito: "mi dici cosa fai, dove lavori e che domande ti fanno i clienti. Mezz'ora, gratis." },
    { evidenza: 'Faccio le prove e controllo il sito,', seguito: 'poi ti mando il report.' },
    { evidenza: 'Te lo spiego a voce', seguito: 'e decidi tu cosa far sistemare. Le correzioni posso farle io: ti scrivo il prezzo prima di iniziare.' },
  ],
  chiusura: {
    titolo: 'Vuoi sapere se ti citano?',
    testo: "Chiamami o scrivimi cosa fai e dove: ti dico se l'audit ha senso per la tua attività, prima di venderti qualsiasi cosa.",
  },
  domande: [
    { domanda: "Cos'è la GEO?", risposta: 'GEO significa lavorare perché ChatGPT, Gemini e gli altri assistenti AI citino la tua attività quando rispondono. Si fa con testi chiari sul sito, dati strutturati e informazioni uguali ovunque.' },
    { domanda: "Quanto costa l'audit GEO?", risposta: '490 €, IVA esclusa, una tantum.' },
    { domanda: 'Mi garantisci che ChatGPT mi citerà?', risposta: "No: nessuno può garantirlo. Ti dico com'è la situazione oggi e cosa puoi migliorare." },
    { domanda: 'Serve a una piccola attività locale?', risposta: "Dipende da come ti cercano i clienti. Se ti trovano soprattutto su Google Maps o con il passaparola, conviene partire dalla scheda Google, a 199 €. Te lo dico in telefonata, prima di venderti l'audit." },
    { domanda: 'Fai anche un lavoro continuativo?', risposta: "Sì, su richiesta: dopo l'audit ti dico cosa serve e quanto costa." },
  ],
  altriPassi: [
    { testo: 'Sistemo la tua scheda Google a 199 €', percorso: '/scheda-google' },
    { testo: 'Quanto costa un sito web', percorso: '/quanto-costa-un-sito-web' },
  ],
};

export const paginaPrezzi: ContenutoPaginaServizio = {
  etichetta: 'Prezzi',
  titolo: 'Quanto costa un sito web: i miei prezzi',
  sottotitolo: 'Un sito vetrina parte da 1.500 € e una landing page da 700 €. Un e-commerce parte da 3.500 €, un gestionale su misura da 8.000 €. Il prezzo cambia con il numero di pagine e con le funzioni che servono: prenotazioni, pagamenti, assistente AI. Il prezzo esatto te lo scrivo nel preventivo, prima di iniziare.',
  prezzo: 'Prezzi IVA esclusa, pagamento anche a rate.',
  titoloPunti: 'Cosa fa cambiare il prezzo',
  punti: [
    { titolo: 'Il numero di pagine', testo: 'Una landing page è una pagina sola; un sito vetrina ne ha da 4 a 10. Più pagine vuol dire più testi, più immagini e più lavoro.' },
    { titolo: 'Le funzioni', testo: "Un negozio online, le prenotazioni, un'area clienti o un assistente AI aggiungono lavoro, e quindi costo." },
    { titolo: 'Dominio e hosting', testo: "Li gestisco io, con il certificato SSL. Il rinnovo annuale ha una quota che concordiamo all'inizio." },
    { titolo: 'I tempi', testo: 'Landing page in 5 giorni, sito vetrina in 7-14 giorni, e-commerce in 20-60 giorni, gestionale in 8-12 settimane.' },
  ],
  conListino: true,
  argomento: {
    titolo: 'Perché ti scrivo il prezzo prima',
    testo: 'Nel preventivo scritto trovi prezzo e tempi, così sai cosa spendi e cosa ricevi. Dopo la consegna hai due giri di modifiche compresi: le modifiche successive si pagano a ore.',
  },
  chiusura: {
    titolo: 'Vuoi un numero preciso?',
    testo: 'Prova il simulatore: in due minuti ottieni una stima. Oppure chiamami e ti dico il prezzo del tuo caso.',
  },
  domande: [
    { domanda: 'Quanto costa un sito web per una piccola attività?', risposta: 'Un sito vetrina parte da 1.500 €, una landing page da 700 €. Il prezzo finale è scritto nel preventivo, prima di iniziare.' },
    { domanda: 'Quanto costa un e-commerce?', risposta: 'Da 3.500 €, pronto in 20-60 giorni. Con un assistente AI da 3.990 €, più 149 € al mese.' },
    { domanda: 'Cosa è compreso nel prezzo?', risposta: "Il sito online e funzionante, con dominio, hosting e certificato SSL che gestisco io: il rinnovo annuale ha una quota che concordiamo all'inizio. Sono compresi anche due giri di modifiche dopo la consegna." },
    { domanda: 'Posso pagare a rate?', risposta: 'Sì, il pagamento può essere a rate. Ne parliamo nel preventivo.' },
    { domanda: "C'è qualcosa che costa meno di 700 €?", risposta: 'Sì: la scheda Google della tua attività, a 199 €. La sistemo io, con un kit per chiedere le recensioni ai clienti.' },
  ],
  altriPassi: [
    { testo: 'Sistemo la tua scheda Google a 199 €', percorso: '/scheda-google' },
    { testo: 'Controllo se ChatGPT e Gemini ti citano', percorso: '/audit-geo' },
  ],
};
