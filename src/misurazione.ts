type Gtag = (...argomenti: unknown[]) => void;
type BloccoAnalytics = `ga-disable-${string}`;
type FinestraConGoogle = typeof window & { gtag?: Gtag } & { [blocco: BloccoAnalytics]: boolean };

export type SceltaCookie = 'all' | 'rejected' | 'custom';
type ChiaveConsenso = 'cookie_analytics' | 'cookie_marketing';
type ChiaveCookie = 'cookie_consent' | 'cookie_versione' | ChiaveConsenso;

export const EVENTO_CONSENSO = 'cookieConsentUpdated';
export const EVENTO_PREFERENZE = 'apriPreferenzeCookie';

// Linee guida Garante 2021: una scelta fatta su una cookie policy precedente non copre i trattamenti descritti dopo. La data è ripetuta in index.html
const VERSIONE_INFORMATIVA = '2026-10-04';

interface TagGoogle {
  id: string;
  consenso: ChiaveConsenso;
  impostazioni: Record<string, unknown>;
  cookieDelTag: RegExp;
  eventiInviati?: readonly string[];
}

const tagGoogle: readonly TagGoogle[] = [
  { id: 'G-29CR0733KS', consenso: 'cookie_analytics', impostazioni: { send_page_view: false }, cookieDelTag: /^_ga(_|$)/ },
  // A Google Ads arrivano solo le richieste di contatto, niente visite interne né clic generici; il page_view della pagina d'ingresso lo manda comunque il suo tag
  {
    id: 'AW-18055930933',
    consenso: 'cookie_marketing',
    impostazioni: { allow_ad_personalization_signals: false, send_page_view: false },
    cookieDelTag: /^_gcl_|^_gac_/,
    eventiInviati: ['generate_lead', 'click_chiamata', 'click_whatsapp'],
  },
];

const tagAttivati = new Set<string>();
const sceltaDellaVisita = new Map<ChiaveCookie, string>();

const trovaGtag = (): Gtag | undefined => {
  const { gtag } = window as FinestraConGoogle;
  return typeof gtag === 'function' ? gtag : undefined;
};

export const leggiValoreCookie = (chiave: ChiaveCookie): string | null => {
  const valoreDellaVisita = sceltaDellaVisita.get(chiave);
  if (valoreDellaVisita !== undefined) return valoreDellaVisita;
  try {
    return window.localStorage.getItem(chiave);
  } catch {
    return null;
  }
};

const consensoDato = (chiave: ChiaveConsenso) => leggiValoreCookie(chiave) === 'true';

// Linee guida Garante 2021: senza consenso nessuna richiesta a Google, nemmeno per scaricare gtag.js
const caricaGtag = (gtag: Gtag, idTag: string) => {
  const scriptGoogle = document.createElement('script');
  scriptGoogle.async = true;
  scriptGoogle.src = `https://www.googletagmanager.com/gtag/js?id=${idTag}`;
  document.head.appendChild(scriptGoogle);
  gtag('js', new Date());
};

// gtag.js arriva solo a pagina caricata, per non rubare banda alla prima schermata
export const attivaTagConsentiti = () => {
  if (document.readyState !== 'complete') {
    window.addEventListener('load', attivaTagConsentiti, { once: true });
    return;
  }
  const gtag = trovaGtag();
  const tagDaAttivare = tagGoogle.filter(({ id, consenso }) => !tagAttivati.has(id) && consensoDato(consenso));
  if (!gtag || tagDaAttivare.length === 0) return;
  if (tagAttivati.size === 0) caricaGtag(gtag, tagDaAttivare[0].id);
  tagDaAttivare.forEach(({ id, impostazioni }) => {
    gtag('config', id, impostazioni);
    tagAttivati.add(id);
  });
};

export const segnaEvento = (nomeEvento: string, parametri: Record<string, string> = {}) => {
  const destinazioni = tagGoogle
    .filter(({ consenso, eventiInviati }) => consensoDato(consenso) && (!eventiInviati || eventiInviati.includes(nomeEvento)))
    .map(({ id }) => id);
  if (destinazioni.length === 0) return;
  trovaGtag()?.('event', nomeEvento, { ...parametri, send_to: destinazioni });
};

// I cookie di Google stanno sul dominio principale: si cancellano su ogni livello del nome del sito
const cancellaCookie = (nomeCookie: RegExp) => {
  const partiDominio = window.location.hostname.split('.');
  const attributiDominio = ['', ...Array.from({ length: partiDominio.length - 1 }, (_, livello) => `; domain=${partiDominio.slice(livello).join('.')}`)];
  document.cookie
    .split(';')
    .map((voce) => voce.split('=')[0].trim())
    .filter((nome) => nomeCookie.test(nome))
    .forEach((nome) => {
      attributiDominio.forEach((attributo) => { document.cookie = `${nome}=; Max-Age=0; path=/${attributo}`; });
    });
};

// Google Ads tiene i clic sugli annunci anche nel localStorage, sotto _gcl_ls
const cancellaArchivio = (nomeChiave: RegExp) => {
  try {
    Object.keys(window.localStorage)
      .filter((chiave) => nomeChiave.test(chiave))
      .forEach((chiave) => window.localStorage.removeItem(chiave));
  } catch {
    /* senza storage non c'è niente da cancellare */
  }
};

export const rimuoviCookieSenzaConsenso = () => {
  tagGoogle.forEach(({ consenso, cookieDelTag }) => {
    if (consensoDato(consenso)) return;
    cancellaCookie(cookieDelTag);
    cancellaArchivio(cookieDelTag);
  });
};

// Art. 7 §3 GDPR: un tag avviato non si scarica, ma GA4 legge ga-disable a ogni invio e si ferma subito, eventi automatici compresi. Su Ads non funziona e spegnerebbe GA4
const bloccaAnalyticsSenzaConsenso = () => {
  tagGoogle
    .filter(({ id }) => id.startsWith('G-'))
    .forEach(({ id, consenso }) => {
      const blocco: BloccoAnalytics = `ga-disable-${id}`;
      (window as FinestraConGoogle)[blocco] = !consensoDato(consenso);
    });
};

const applicaConsenso = () => {
  bloccaAnalyticsSenzaConsenso();
  const statoMarketing = consensoDato('cookie_marketing') ? 'granted' : 'denied';
  trovaGtag()?.('consent', 'update', {
    analytics_storage: consensoDato('cookie_analytics') ? 'granted' : 'denied',
    ad_storage: statoMarketing,
    ad_user_data: statoMarketing,
    // Con il consenso Marketing niente remarketing né annunci personalizzati, come promettono le policy
    ad_personalization: 'denied',
  });
  rimuoviCookieSenzaConsenso();
  attivaTagConsentiti();
  window.dispatchEvent(new Event(EVENTO_CONSENSO));
};

export const apriPreferenzeCookie = () => {
  window.dispatchEvent(new Event(EVENTO_PREFERENZE));
};

const ricordaValoreCookie = (chiave: ChiaveCookie, valore: string) => {
  sceltaDellaVisita.set(chiave, valore);
  try {
    window.localStorage.setItem(chiave, valore);
  } catch {
    /* senza storage la scelta vale solo per questa visita */
  }
};

export const salvaSceltaCookie = (scelta: SceltaCookie, statistici: boolean, marketing: boolean) => {
  ricordaValoreCookie('cookie_versione', VERSIONE_INFORMATIVA);
  ricordaValoreCookie('cookie_consent', scelta);
  ricordaValoreCookie('cookie_analytics', String(statistici));
  ricordaValoreCookie('cookie_marketing', String(marketing));
  applicaConsenso();
};

const scartaSceltaSuperata = () => {
  try {
    if (window.localStorage.getItem('cookie_versione') === VERSIONE_INFORMATIVA) return;
    ['cookie_consent', 'cookie_versione', 'cookie_analytics', 'cookie_marketing'].forEach((chiave) => window.localStorage.removeItem(chiave));
  } catch {
    /* senza storage non c'è una scelta salvata da scartare */
  }
};

scartaSceltaSuperata();
bloccaAnalyticsSenzaConsenso();

// L'evento storage arriva solo alle altre schede del sito: una revoca fatta lì deve fermare subito anche questa
window.addEventListener('storage', ({ key }) => {
  if (key !== null && !key.startsWith('cookie_')) return;
  sceltaDellaVisita.clear();
  applicaConsenso();
});
