import { recapiti } from './home';

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
  argomento: { titolo: string; testo: string };
  chiusura: { titolo: string; testo: string };
}

export const paginaHotel: ContenutoPaginaServizio = {
  etichetta: 'Per hotel, B&B e case vacanza',
  titolo: 'Sito per hotel e B&B con prenotazioni dirette',
  sottotitolo: 'Faccio il sito della tua struttura con un assistente AI che risponde agli ospiti a qualsiasi ora, anche in altre lingue, e li aiuta a prenotare. Chi prenota dal tuo sito non passa da Booking, quindi niente commissione.',
  prezzo: 'Sito con assistente AI da 3.500 €. Il prezzo te lo scrivo prima di iniziare.',
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
  prezzo: 'E-commerce da 3.500 €, con assistente AI da 5.500 €. Il prezzo te lo scrivo prima di iniziare.',
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
