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
  conAbbonamenti?: boolean;
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
  altriPassi: [{ testo: 'Quanto costa un assistente AI', percorso: '/quanto-costa-un-assistente-ai' }],
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
  altriPassi: [{ testo: 'Quanto costa un assistente AI', percorso: '/quanto-costa-un-assistente-ai' }],
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
    { domanda: 'Posso farla tenere aggiornata ogni mese?', risposta: "Sì, con l'abbonamento Presenza locale, da 79 € al mese. Durata minima 6 mesi, poi si rinnova; puoi disdire con 30 giorni di preavviso." },
  ],
  altriPassi: [
    { testo: 'Controllo se ChatGPT e Gemini ti citano', percorso: '/audit-geo' },
    { testo: 'Abbonamenti mensili', percorso: '/abbonamenti' },
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
    { domanda: 'Fai anche un lavoro continuativo?', risposta: "Sì: con l'abbonamento GEO base, da 490 € al mese, o con il GEO completo, da 890 €, che comprende contenuti nuovi. Dopo l'audit ti dico quale ha senso per te." },
  ],
  altriPassi: [
    { testo: 'Sistemo la tua scheda Google a 199 €', percorso: '/scheda-google' },
    { testo: 'Abbonamenti mensili', percorso: '/abbonamenti' },
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
    { domanda: 'Ci sono abbonamenti mensili?', risposta: 'Sì: Presenza locale da 79 € al mese, GEO base da 490 € e GEO completo da 890 €. Durata minima 6 mesi, poi si rinnova; puoi disdire con 30 giorni di preavviso.' },
  ],
  altriPassi: [
    { testo: 'Sistemo la tua scheda Google a 199 €', percorso: '/scheda-google' },
    { testo: 'Controllo se ChatGPT e Gemini ti citano', percorso: '/audit-geo' },
    { testo: 'Abbonamenti mensili', percorso: '/abbonamenti' },
    { testo: 'Quanto costa un assistente AI', percorso: '/quanto-costa-un-assistente-ai' },
  ],
};

export const paginaAbbonamenti: ContenutoPaginaServizio = {
  etichetta: 'Abbonamenti mensili',
  titolo: 'Abbonamenti mensili: scheda Google e GEO',
  sottotitolo: "Se vuoi che ti segua io ogni mese, ci sono tre abbonamenti: Presenza locale da 79 € al mese, GEO base da 490 € e GEO completo, con contenuti nuovi, da 890 €. Ti scrivo cosa è compreso e cosa no. Durata minima 6 mesi, poi si rinnova; puoi disdire con 30 giorni di preavviso. Se paghi l'anno in anticipo, paghi 10 mesi invece di 12.",
  prezzo: 'Prezzi IVA esclusa, da pagare ogni mese o per l\'anno in anticipo.',
  titoloPunti: 'Le regole, scritte chiare',
  punti: [
    { titolo: 'Durata minima 6 mesi', testo: 'Su Google e sugli assistenti AI i risultati non arrivano dopo poche settimane. Sei mesi ti danno il tempo di vedere cosa cambia.' },
    { titolo: 'Poi si rinnova, e puoi chiudere', testo: "Dopo i primi 6 mesi l'abbonamento si rinnova da solo. Puoi disdire con 30 giorni di preavviso." },
    { titolo: 'Annuale: paghi 10 mesi', testo: "Se paghi l'anno in anticipo, paghi 10 mesi invece di 12." },
    { titolo: 'Cosa è compreso lo scrivo prima', testo: "Prima di iniziare ricevi per iscritto cosa faccio ogni mese. Quello che non c'è scritto non è compreso." },
  ],
  conAbbonamenti: true,
  argomento: {
    titolo: 'Cosa non è compreso',
    testo: 'Modifiche in più, contenuti oltre a quelli indicati nel piano e campagne a pagamento, come gli annunci su Google, si concordano a parte. Nessuno può garantire posizioni su Google o citazioni da ChatGPT: ti consegno il lavoro scritto nel piano e ogni mese ti dico cosa è cambiato.',
  },
  passi: [
    { evidenza: 'Ci sentiamo al telefono:', seguito: "mi racconti la tua attività e scegliamo il piano. Mezz'ora, gratis." },
    { evidenza: 'Ti mando il contratto scritto,', seguito: 'con cosa è compreso, la durata e il prezzo.' },
    { evidenza: 'Ogni mese ti scrivo', seguito: 'cosa ho fatto e cosa è cambiato.' },
  ],
  chiusura: {
    titolo: 'Quale abbonamento fa per te?',
    testo: 'Chiamami o scrivimi cosa fai e dove: ti dico quale piano ha senso, anche nessuno se non ti serve.',
  },
  domande: [
    { domanda: 'Quanto costano gli abbonamenti mensili?', risposta: 'Presenza locale da 79 € al mese, GEO base da 490 €, GEO completo da 890 €. Prezzi IVA esclusa.' },
    { domanda: 'Perché una durata minima di 6 mesi?', risposta: 'Il lavoro su Google e sugli assistenti AI si vede dopo mesi, non dopo qualche settimana. Con 6 mesi hai il tempo di vedere cosa cambia.' },
    { domanda: 'Posso disdire?', risposta: 'Dopo i primi 6 mesi il contratto si rinnova da solo; puoi chiuderlo con 30 giorni di preavviso.' },
    { domanda: 'Mi garantisci posizioni su Google o citazioni da ChatGPT?', risposta: 'No: nessuno può garantirle. Ti consegno il lavoro scritto nel piano e ogni mese ti dico cosa è cambiato.' },
    { domanda: 'Serve fare prima l\'audit GEO?', risposta: "Non è obbligatorio, ma conviene: l'audit, a 490 €, ti dice se serve il GEO base o quello completo." },
    { domanda: "E l'assistente AI?", risposta: 'Si paga a parte: da 490 € per prepararlo, più 149 € al mese per tenerlo attivo e aggiornato.' },
  ],
  altriPassi: [
    { testo: 'Sistemo la tua scheda Google a 199 €', percorso: '/scheda-google' },
    { testo: 'Controllo se ChatGPT e Gemini ti citano', percorso: '/audit-geo' },
    { testo: 'Quanto costa un sito web', percorso: '/quanto-costa-un-sito-web' },
  ],
};

export const paginaAssistente: ContenutoPaginaServizio = {
  etichetta: 'Assistente AI',
  titolo: 'Quanto costa un assistente AI che prende appuntamenti e prenotazioni',
  sottotitolo: 'Un assistente AI per il sito della tua attività costa da 490 € per prepararlo, più 149 € al mese per tenerlo attivo e aggiornato. Risponde ai clienti a qualsiasi ora, prende appuntamenti o prenotazioni e ti passa i contatti interessati. Se lo prendi insieme a un sito vetrina nuovo, si parte da 1.990 € più 149 € al mese. Il prezzo esatto te lo scrivo nel preventivo, prima di iniziare.',
  prezzo: 'Da 490 € più 149 € al mese, IVA esclusa.',
  demo: { testo: "Prova l'assistente sul sito demo", indirizzo: recapiti.demoHotel },
  titoloPunti: "Cosa fa l'assistente",
  punti: [
    { titolo: 'Risponde a qualsiasi ora', testo: 'Domande su orari, prezzi e servizi anche la sera o la domenica, quando tu non puoi rispondere.' },
    { titolo: 'Prende appuntamenti e prenotazioni', testo: 'Raccoglie le richieste dei clienti e ti passa i contatti interessati.' },
    { titolo: 'Capisce come scrive il cliente', testo: 'Il cliente scrive come parlerebbe a voce: niente menu o comandi da imparare. Risponde anche in altre lingue.' },
    { titolo: 'Parte da quello che gli insegni tu', testo: 'Risponde con le informazioni della tua attività. Se una cosa non gli risulta, non la inventa: lo dice e invita a chiamarti.' },
  ],
  argomento: {
    titolo: 'Quando conviene e quando no',
    testo: 'Conviene se ricevi molte domande ripetute o richieste fuori orario, come succede a hotel e concessionarie. Se ricevi poche richieste, o ti bastano risposte generiche, un servizio già pronto da poche decine di euro al mese può essere sufficiente: te lo dico in telefonata, prima di venderti qualcosa.',
  },
  passi: [
    { evidenza: 'Ci sentiamo al telefono:', seguito: "mi racconti cosa ti chiedono i clienti e a che ora. Mezz'ora, gratis." },
    { evidenza: 'Ti mando un preventivo scritto,', seguito: 'con il prezzo di preparazione e il canone mensile.' },
    { evidenza: "Preparo l'assistente", seguito: 'con le informazioni della tua attività e lo metto sul tuo sito.' },
  ],
  chiusura: {
    titolo: 'Vuoi capire se ti serve?',
    testo: 'Chiamami o scrivimi cosa ti chiedono i clienti: ti dico se un assistente ti conviene, o se basta altro.',
  },
  domande: [
    { domanda: 'Quanto costa un assistente AI per una piccola attività?', risposta: 'Da 490 € per prepararlo, più 149 € al mese per tenerlo attivo e aggiornato. Prezzi IVA esclusa.' },
    { domanda: 'Cosa comprende il canone mensile?', risposta: "Il funzionamento dell'assistente e l'aggiornamento delle informazioni che gli ho dato." },
    { domanda: 'Esistono alternative più economiche?', risposta: 'Sì: servizi già pronti da poche decine di euro al mese. Vanno bene se ti bastano risposte generiche; io lo preparo con le informazioni della tua attività, e al telefono rispondo io.' },
    { domanda: "L'assistente prende davvero appuntamenti e prenotazioni?", risposta: 'Raccoglie le richieste dei clienti e ti passa i contatti interessati. Per gli hotel puoi vedere come funziona sulla demo.' },
    { domanda: 'I clienti capiscono che parlano con un\'AI?', risposta: "Sì: se glielo chiedono, l'assistente dice chiaramente di essere un'intelligenza artificiale e non una persona." },
    { domanda: 'Mi garantisci più prenotazioni?', risposta: "No: nessuno può garantirlo. L'assistente risponde ai clienti quando tu non puoi; quante richieste ne nascono dipende dalla tua attività." },
  ],
  altriPassi: [
    { testo: 'Sito per hotel e B&B con assistente AI', percorso: '/hotel' },
    { testo: 'Sito per concessionarie', percorso: '/sito-per-concessionarie' },
    { testo: 'Quanto costa un sito web', percorso: '/quanto-costa-un-sito-web' },
  ],
};

export const paginaConcessionarie: ContenutoPaginaServizio = {
  etichetta: 'Per concessionarie e autosaloni',
  titolo: "Sito per concessionarie con valutatore dell'usato",
  sottotitolo: "Faccio siti per concessionarie che fanno vedere il parco auto, rispondono ai clienti anche fuori orario e raccolgono le richieste di permuta. Per Redicar, a Colonnella, ho fatto un valutatore dell'usato: il cliente inserisce i dati dell'auto, riceve una stima per la permuta e la richiesta ti arriva su WhatsApp e per email.",
  prezzo: "Sito vetrina da 1.500 €, con assistente AI da 1.990 € più 149 € al mese. Il valutatore dell'usato è un lavoro su misura: il prezzo te lo scrivo prima di iniziare.",
  demo: { testo: 'Guarda il sito di Redicar', indirizzo: 'https://www.redicar.it/' },
  titoloPunti: 'Cosa trovi nel sito',
  punti: [
    { titolo: 'Il parco auto in primo piano', testo: "Chi cerca un'auto trova subito cosa hai in vendita e può chiamarti con un tocco." },
    { titolo: "Il valutatore dell'usato", testo: "Il cliente inserisce i dati dell'auto e riceve una stima per la permuta: la richiesta ti arriva su WhatsApp e per email. L'ho fatto per Redicar." },
    { titolo: 'Un assistente che risponde fuori orario', testo: 'Risponde alle domande sulle auto anche la sera e la domenica, e ti passa i contatti interessati.' },
    { titolo: 'Pensato per il telefono', testo: "Chi cerca un'auto lo fa spesso dal telefono, magari in macchina: il sito si carica subito e ha i pulsanti per chiamare e scrivere su WhatsApp." },
  ],
  argomento: {
    titolo: 'Perché un sito tuo accanto ai portali',
    testo: 'Sui portali di annunci il cliente vede la tua auto accanto a quelle di tutti gli altri. Sul tuo sito vede solo te: il parco auto, il valutatore dell\'usato e il tuo numero di telefono.',
  },
  chiusura: {
    titolo: 'Parliamo della tua concessionaria',
    testo: "Chiamami o scrivimi: in mezz'ora capiamo cosa ti serve e quanto costa.",
  },
  domande: [
    { domanda: 'Quanto costa il sito per una concessionaria?', risposta: 'Un sito vetrina parte da 1.500 €, pronto in 7-14 giorni. Con un assistente AI parte da 1.990 €, più 149 € al mese.' },
    { domanda: "Quanto costa il valutatore dell'usato?", risposta: 'È un lavoro su misura: dipende da come deve stimare l\'auto e da dove deve arrivare la richiesta. Ti scrivo il prezzo prima di iniziare.' },
    { domanda: "Cosa fa il valutatore dell'usato?", risposta: "Il cliente inserisce i dati dell'auto e riceve una stima per la permuta; la richiesta arriva a te su WhatsApp e per email." },
    { domanda: 'Lavori anche fuori da Ascoli Piceno?', risposta: 'Sì. Ho sede ad Ascoli Piceno, lavoro di persona nelle Marche e in Abruzzo e a distanza in tutta Italia.' },
  ],
  altriPassi: [
    { testo: 'Quanto costa un assistente AI', percorso: '/quanto-costa-un-assistente-ai' },
    { testo: 'Quanto costa un sito web', percorso: '/quanto-costa-un-sito-web' },
  ],
};

export const paginaCommercialisti: ContenutoPaginaServizio = {
  etichetta: 'Per commercialisti e consulenti',
  titolo: 'Sito per commercialisti e consulenti del lavoro ad Ascoli Piceno',
  sottotitolo: "Chi cerca un commercialista guarda spesso il sito prima di chiamare: vuole capire cosa fai, per chi lavori e come si prende un appuntamento. Faccio il sito del tuo studio ad Ascoli Piceno con i servizi spiegati in modo chiaro, i contatti sempre a un tocco e la richiesta di appuntamento online. Si parte da 1.500 € per il sito vetrina; con un assistente AI per le domande frequenti, da 1.990 € più 149 € al mese.",
  prezzo: 'Il prezzo te lo scrivo nel preventivo, prima di iniziare: sito vetrina da 1.500 €, con assistente AI da 1.990 € più 149 € al mese.',
  titoloPunti: 'Cosa trovi nel sito',
  punti: [
    { titolo: 'I servizi spiegati in chiaro', testo: 'Per esempio contabilità, dichiarazioni, buste paga e consulenza: una sezione chiara per ogni servizio, con le parole che usano i tuoi clienti.' },
    { titolo: 'Richiesta di appuntamento online', testo: 'Il cliente lascia nome, recapito e un giorno preferito, e la richiesta ti arriva per email. Può anche scriverti su WhatsApp o chiamarti con un tocco.' },
    { titolo: 'Un assistente per le domande che ripeti ogni giorno', testo: 'Orari, come prendere un appuntamento, a chi rivolgersi: risponde anche fuori orario, con le informazioni che gli dai tu, e ti passa i contatti interessati.' },
    { titolo: 'Riservatezza prima di tutto', testo: "I dati di uno studio sono delicati. Se ti serve un'area riservata per scambiare documenti, la valuto con te e la prezzo a parte: richiede più lavoro e più attenzione alla privacy." },
  ],
  argomento: {
    titolo: 'Perché un sito tuo',
    testo: 'Se un cliente riceve il tuo nome dal passaparola, spesso ti cerca su Google. Un sito chiaro dice subito chi sei, cosa fai e come contattarti, anche quando lo studio è chiuso. Ho sede ad Ascoli Piceno e lavoro di persona nelle Marche e in Abruzzo: se vuoi, ci vediamo nel tuo studio.',
  },
  chiusura: {
    titolo: 'Parliamo del tuo studio',
    testo: 'Chiamami o scrivimi: mi racconti come lavori e ti dico cosa serve al tuo studio e quanto costa.',
  },
  domande: [
    { domanda: 'Quanto costa il sito per uno studio di commercialista?', risposta: "Per uno studio di commercialista il sito vetrina parte da 1.500 € ed è pronto in 7-14 giorni. Con l'assistente AI si parte da 1.990 € più 149 € al mese. Il prezzo finale è nel preventivo." },
    { domanda: "Posso avere un'area per caricare i documenti?", risposta: 'Lo valuto con te: richiede più lavoro e più attenzione alla privacy dei dati dei tuoi clienti, quindi ha un prezzo a parte. Te lo scrivo prima di iniziare.' },
    { domanda: "L'assistente AI può dare consigli fiscali?", risposta: 'No: lo preparo perché risponda solo su orari, servizi e appuntamenti, e per tutto il resto inviti a contattare lo studio.' },
    { domanda: 'Cosa serve per partire?', risposta: "Una telefonata per capire come lavora il tuo studio, e i tuoi riferimenti: logo, indirizzo e orari. Se ci sono funzioni in più, come un'area riservata, i tempi li scrivo nel preventivo." },
  ],
  altriPassi: [
    { testo: 'Quanto costa un assistente AI', percorso: '/quanto-costa-un-assistente-ai' },
    { testo: 'Quanto costa un sito web', percorso: '/quanto-costa-un-sito-web' },
  ],
};

export const paginaDentisti: ContenutoPaginaServizio = {
  etichetta: 'Per dentisti e studi medici',
  titolo: 'Sito per dentisti e studi medici ad Ascoli Piceno',
  sottotitolo: "Chi cerca un dentista o uno studio medico vuole capire subito dove sei, quando sei aperto e come prenotare, spesso dal telefono e a volte per un'urgenza. Faccio il sito del tuo studio ad Ascoli Piceno con orari, contatti e richiesta di visita sempre a portata di dito. Il sito vetrina parte da 1.500 €; aggiungendo l'assistente AI per le domande frequenti, si parte da 1.990 € più 149 € al mese.",
  prezzo: "Prima di iniziare ricevi il prezzo scritto. Sito vetrina da 1.500 €; con l'assistente AI da 1.990 € più 149 € al mese.",
  titoloPunti: 'Cosa trovi nel sito',
  punti: [
    { titolo: 'Orari, indirizzo e telefono subito', testo: 'Chi ha un dubbio o un dolore trova in pochi secondi dove sei, quando sei aperto e il numero da chiamare con un tocco.' },
    { titolo: 'Richiesta di visita online', testo: 'Il paziente lascia nome, telefono e un orario preferito: la richiesta ti arriva per email e lo richiami tu. Nel modulo non ci sono dettagli sanitari.' },
    { titolo: 'Un assistente per le domande ripetute', testo: "Orari, come prenotare, a chi telefonare per un'urgenza: risponde anche fuori orario, con le informazioni che gli dai tu. Non dà consigli medici." },
    { titolo: 'Lo studio presentato con chiarezza', testo: 'Chi sei, quali servizi offri e chi lavora con te, con i testi informativi che servono a un paziente per sapere cosa aspettarsi.' },
  ],
  argomento: {
    titolo: 'Un sito informativo, nelle regole',
    testo: 'La pubblicità sanitaria ha regole precise. Preparo il sito con contenuti informativi, senza promesse sulle cure, e ti consiglio di far controllare i testi al tuo ordine professionale prima di pubblicarli. Ho sede ad Ascoli Piceno e lavoro di persona nelle Marche e in Abruzzo.',
  },
  chiusura: {
    titolo: 'Parliamo del tuo studio',
    testo: 'Chiamami o scrivimi: parliamo di come lavora il tuo studio e di cosa ti serve, poi ti scrivo il prezzo.',
  },
  domande: [
    { domanda: 'Quanto costa il sito per uno studio dentistico o medico?', risposta: "Per uno studio dentistico o medico il sito vetrina parte da 1.500 € e si prepara in 7-14 giorni. Aggiungendo l'assistente AI si parte da 1.990 € più 149 € al mese: il prezzo esatto è scritto nel preventivo." },
    { domanda: 'Il modulo di richiesta raccoglie dati sanitari?', risposta: 'No: raccoglie nome, telefono e un orario preferito. I dettagli clinici si parlano al telefono o in studio.' },
    { domanda: "L'assistente AI dà consigli medici?", risposta: 'No: lo preparo perché risponda solo su orari, servizi e come prenotare, e per urgenze o dubbi clinici rimandi al telefono dello studio.' },
    { domanda: 'Posso scrivere prezzi e promozioni delle cure?', risposta: 'Le regole sulla pubblicità sanitaria sono precise: verifica con il tuo ordine professionale cosa puoi pubblicare. Io inserisco quello che mi confermi.' },
  ],
  altriPassi: [
    { testo: 'Quanto costa un assistente AI', percorso: '/quanto-costa-un-assistente-ai' },
    { testo: 'Quanto costa un sito web', percorso: '/quanto-costa-un-sito-web' },
  ],
};
