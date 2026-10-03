type Gtag = (...argomenti: unknown[]) => void;

export type SceltaCookie = 'all' | 'rejected' | 'custom';
type ChiaveCookie = 'cookie_consent' | 'cookie_analytics' | 'cookie_marketing';
type ChiaveConsenso = Exclude<ChiaveCookie, 'cookie_consent'>;

export const EVENTO_CONSENSO = 'cookieConsentUpdated';
export const EVENTO_PREFERENZE = 'apriPreferenzeCookie';

interface TagGoogle {
  id: string;
  consenso: ChiaveConsenso;
  impostazioni: Record<string, unknown>;
  cookieDelTag: RegExp;
}

const tagGoogle: readonly TagGoogle[] = [
  { id: 'G-29CR0733KS', consenso: 'cookie_analytics', impostazioni: { send_page_view: false }, cookieDelTag: /^_ga(_|$)/ },
  { id: 'AW-18055930933', consenso: 'cookie_marketing', impostazioni: {}, cookieDelTag: /^_gcl_/ },
];

const tagAttivati = new Set<string>();

const trovaGtag = (): Gtag | undefined => {
  const { gtag } = window as Window & { gtag?: Gtag };
  return typeof gtag === 'function' ? gtag : undefined;
};

export const leggiValoreCookie = (chiave: ChiaveCookie): string | null => {
  try {
    return window.localStorage.getItem(chiave);
  } catch {
    return null;
  }
};

const consensoDato = (chiave: ChiaveConsenso) => leggiValoreCookie(chiave) === 'true';

// In index.html gtag('js') parte al load: i config arrivano dopo, e solo per le voci accettate
export const attivaTagConsentiti = () => {
  const gtag = trovaGtag();
  if (!gtag || document.readyState !== 'complete') return;
  tagGoogle.forEach(({ id, consenso, impostazioni }) => {
    if (tagAttivati.has(id) || !consensoDato(consenso)) return;
    gtag('config', id, impostazioni);
    tagAttivati.add(id);
  });
};

export const segnaEvento = (nomeEvento: string, parametri: Record<string, string> = {}) => {
  const destinazioni = tagGoogle.filter(({ consenso }) => consensoDato(consenso)).map(({ id }) => id);
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

export const rimuoviCookieSenzaConsenso = () => {
  tagGoogle.forEach(({ consenso, cookieDelTag }) => {
    if (!consensoDato(consenso)) cancellaCookie(cookieDelTag);
  });
};

export const apriPreferenzeCookie = () => {
  window.dispatchEvent(new Event(EVENTO_PREFERENZE));
};

export const salvaSceltaCookie = (scelta: SceltaCookie, statistici: boolean, marketing: boolean) => {
  try {
    window.localStorage.setItem('cookie_consent', scelta);
    window.localStorage.setItem('cookie_analytics', String(statistici));
    window.localStorage.setItem('cookie_marketing', String(marketing));
  } catch {
    /* senza storage la scelta vale solo per questa visita */
  }
  const statoMarketing = marketing ? 'granted' : 'denied';
  trovaGtag()?.('consent', 'update', {
    analytics_storage: statistici ? 'granted' : 'denied',
    ad_storage: statoMarketing,
    ad_user_data: statoMarketing,
    ad_personalization: statoMarketing,
  });
  rimuoviCookieSenzaConsenso();
  attivaTagConsentiti();
  window.dispatchEvent(new Event(EVENTO_CONSENSO));
};
