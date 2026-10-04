import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import AzioniContatto from './AzioniContatto';
import CambioTema from './CambioTema';

const vociMenu = [
  { ancora: '#servizi', nome: 'Servizi' },
  { ancora: '#lavori', nome: 'Lavori' },
  { ancora: '#prezzi', nome: 'Prezzi' },
  { ancora: '#chi-sono', nome: 'Chi sono' },
  { ancora: '#contatti', nome: 'Contatti' },
];

const Testata: React.FC = () => {
  const inizioPaginaRef = useRef<HTMLDivElement>(null);
  const testataRef = useRef<HTMLElement>(null);
  const pulsanteMenuRef = useRef<HTMLButtonElement>(null);
  const [staccata, setStaccata] = useState(false);
  const [menuAperto, setMenuAperto] = useState(false);

  useEffect(() => {
    const inizioPagina = inizioPaginaRef.current;
    if (!inizioPagina || !('IntersectionObserver' in window)) return undefined;
    const osservatoreInizio = new IntersectionObserver(([osservazione]) => setStaccata(!osservazione.isIntersecting));
    osservatoreInizio.observe(inizioPagina);
    return () => osservatoreInizio.disconnect();
  }, []);

  useEffect(() => {
    const testata = testataRef.current;
    if (!menuAperto || !testata) return undefined;
    const schermoLargo = window.matchMedia('(min-width: 900px)');
    const chiudiConEsc = (evento: KeyboardEvent) => {
      if (evento.key !== 'Escape') return;
      setMenuAperto(false);
      pulsanteMenuRef.current?.focus();
    };
    const chiudiToccandoFuori = (evento: PointerEvent) => {
      if (!testata.contains(evento.target as Node)) setMenuAperto(false);
    };
    const chiudiSuSchermoLargo = (evento: MediaQueryListEvent) => {
      if (evento.matches) setMenuAperto(false);
    };
    document.addEventListener('keydown', chiudiConEsc);
    document.addEventListener('pointerdown', chiudiToccandoFuori);
    schermoLargo.addEventListener('change', chiudiSuSchermoLargo);
    return () => {
      document.removeEventListener('keydown', chiudiConEsc);
      document.removeEventListener('pointerdown', chiudiToccandoFuori);
      schermoLargo.removeEventListener('change', chiudiSuSchermoLargo);
    };
  }, [menuAperto]);

  // HomePage avvia lo scorrimento verso l'ancora nello stesso clic: il pannello va tolto prima, non nel render successivo
  const chiudiPrimaDelloScorrimento = () => {
    if (menuAperto) flushSync(() => setMenuAperto(false));
  };

  // Il pannello copre la cima della pagina: se il Tab porta il fuoco nel contenuto, si chiude per non nasconderlo
  const chiudiSeIlFuocoEsce = (evento: React.FocusEvent<HTMLElement>) => {
    if (evento.relatedTarget instanceof Node && !evento.currentTarget.contains(evento.relatedTarget)) setMenuAperto(false);
  };

  const classiTestata = ['testata', staccata && 'testata--staccata', menuAperto && 'testata--menu-aperto'].filter(Boolean).join(' ');

  return (
    <>
      <div ref={inizioPaginaRef} aria-hidden="true" />
      <header className={classiTestata} ref={testataRef} onBlur={menuAperto ? chiudiSeIlFuocoEsce : undefined}>
        <div className="testata-riga">
          {/* Il punto colorato divide il testo in più nodi: role="img" lo fa leggere come un nome solo */}
          <p className="marchio" role="img" aria-label="MAURO.EXE di Mauro Ceccarelli">
            <img
              className="marchio-logo"
              src="/marchio-96.webp"
              srcSet="/marchio-96.webp 96w, /marchio-128.webp 128w, /marchio-192.webp 192w"
              sizes="44px"
              width={44}
              height={44}
              alt=""
              decoding="async"
            />
            <span className="marchio-testo">
              <span className="marchio-nome">MAURO<span className="marchio-punto">.</span>EXE</span>{' '}
              <span className="marchio-titolare">di Mauro Ceccarelli</span>
            </span>
          </p>
          <button
            className="menu-apri"
            type="button"
            ref={pulsanteMenuRef}
            aria-label="Menu"
            aria-expanded={menuAperto}
            aria-controls="menu-pannello"
            onClick={() => setMenuAperto((apertoPrima) => !apertoPrima)}
          >
            <span className="menu-segno" aria-hidden="true"></span><span className="menu-apri-testo">Menu</span>
          </button>
          <div className="menu-pannello" id="menu-pannello">
            <nav aria-label="Menu principale">
              <ul className="menu-voci">
                {vociMenu.map((voceMenu) => (
                  <li key={voceMenu.ancora}><a href={voceMenu.ancora} onClick={chiudiPrimaDelloScorrimento}>{voceMenu.nome}</a></li>
                ))}
              </ul>
            </nav>
            <AzioniContatto />
          </div>
          <CambioTema />
        </div>
      </header>
    </>
  );
};

export default Testata;
