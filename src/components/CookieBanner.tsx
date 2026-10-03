import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  EVENTO_PREFERENZE,
  leggiValoreCookie,
  rimuoviCookieSenzaConsenso,
  salvaSceltaCookie,
  type SceltaCookie,
} from '../misurazione';
import '../styles/consenso-cookie.css';

const CookieBanner: React.FC = () => {
  const [bannerVisibile, setBannerVisibile] = useState(() => leggiValoreCookie('cookie_consent') === null);
  const [preferenzeAperte, setPreferenzeAperte] = useState(false);
  const [statisticiScelti, setStatisticiScelti] = useState(false);
  const [marketingScelto, setMarketingScelto] = useState(false);
  const [richiesteRiapertura, setRichiesteRiapertura] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const statisticiRef = useRef<HTMLInputElement>(null);
  const comandoDiRitorno = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Il vecchio sito attivava Analytics anche senza consenso: i suoi cookie restano solo se la voce è accettata
    rimuoviCookieSenzaConsenso();
    const riapriPreferenze = () => {
      comandoDiRitorno.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setStatisticiScelti(leggiValoreCookie('cookie_analytics') === 'true');
      setMarketingScelto(leggiValoreCookie('cookie_marketing') === 'true');
      setPreferenzeAperte(true);
      setBannerVisibile(true);
      setRichiesteRiapertura((richieste) => richieste + 1);
    };
    window.addEventListener(EVENTO_PREFERENZE, riapriPreferenze);
    return () => window.removeEventListener(EVENTO_PREFERENZE, riapriPreferenze);
  }, []);

  useEffect(() => {
    if (richiesteRiapertura > 0) statisticiRef.current?.focus();
  }, [richiesteRiapertura]);

  useLayoutEffect(() => {
    const banner = bannerRef.current;
    if (!bannerVisibile || !banner) return undefined;
    const radice = document.documentElement;
    const segnaAltezza = () => radice.style.setProperty('--altezza-consenso', `${banner.offsetHeight}px`);
    radice.classList.add('consenso-aperto');
    segnaAltezza();
    const osservatoreAltezza = new ResizeObserver(segnaAltezza);
    osservatoreAltezza.observe(banner);
    return () => {
      osservatoreAltezza.disconnect();
      radice.classList.remove('consenso-aperto');
      radice.style.removeProperty('--altezza-consenso');
    };
  }, [bannerVisibile]);

  const confermaScelta = (scelta: SceltaCookie, statistici: boolean, marketing: boolean) => {
    salvaSceltaCookie(scelta, statistici, marketing);
    setBannerVisibile(false);
    comandoDiRitorno.current?.focus({ preventScroll: true });
    comandoDiRitorno.current = null;
  };

  if (!bannerVisibile) return null;

  return (
    <div className="consenso-cookie" ref={bannerRef} role="region" aria-label="Scelta sui cookie">
      <p>
        Uso cookie tecnici e, solo se accetti, cookie statistici e di marketing.{' '}
        <Link className="link-in-linea" to="/cookie-policy" target="_blank" rel="noopener">Cookie policy</Link>
      </p>
      <div className="consenso-scelte">
        <button type="button" onClick={() => confermaScelta('all', true, true)}>Accetta</button>
        <button type="button" onClick={() => confermaScelta('rejected', false, false)}>Rifiuta</button>
        <button
          type="button"
          aria-expanded={preferenzeAperte}
          aria-controls="consenso-preferenze"
          onClick={() => setPreferenzeAperte((aperte) => !aperte)}
        >
          Preferenze
        </button>
      </div>
      <div className="consenso-preferenze" id="consenso-preferenze" hidden={!preferenzeAperte}>
        <div className="consenso-opzioni">
          <div className="consenso-opzione">
            <input className="casella" id="cookie-tecnici" type="checkbox" checked disabled />
            <label htmlFor="cookie-tecnici">Tecnici <span>(sempre attivi)</span></label>
          </div>
          <div className="consenso-opzione">
            <input
              className="casella"
              id="cookie-statistici"
              type="checkbox"
              ref={statisticiRef}
              checked={statisticiScelti}
              onChange={(evento) => setStatisticiScelti(evento.target.checked)}
            />
            <label htmlFor="cookie-statistici">Statistici <span>(Google Analytics)</span></label>
          </div>
          <div className="consenso-opzione">
            <input
              className="casella"
              id="cookie-marketing"
              type="checkbox"
              checked={marketingScelto}
              onChange={(evento) => setMarketingScelto(evento.target.checked)}
            />
            <label htmlFor="cookie-marketing">Marketing <span>(Google Ads)</span></label>
          </div>
        </div>
        <button
          className="consenso-salva"
          type="button"
          onClick={() => confermaScelta('custom', statisticiScelti, marketingScelto)}
        >
          Salva
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
