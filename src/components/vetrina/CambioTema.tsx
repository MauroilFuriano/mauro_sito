import React, { useEffect, useRef, useState } from 'react';
import { Icona } from './Icone';

type Tema = 'chiaro' | 'scuro';

const CHIAVE_TEMA = 'tema';

const temaValido = (valore: string | null | undefined): valore is Tema => valore === 'chiaro' || valore === 'scuro';

const leggiTemaSalvato = (): Tema | null => {
  try {
    const temaSalvato = window.localStorage.getItem(CHIAVE_TEMA);
    return temaValido(temaSalvato) ? temaSalvato : null;
  } catch {
    return null;
  }
};

const CambioTema: React.FC = () => {
  const [temaScuro, setTemaScuro] = useState(() => document.documentElement.dataset.tema === 'scuro');
  const temaScelto = useRef(false);

  useEffect(() => {
    const radice = document.documentElement;
    const temaNuovo: Tema = temaScuro ? 'scuro' : 'chiaro';
    if (radice.dataset.tema === temaNuovo) return undefined;
    // Per un frame niente transizioni: i comandi con transition cambierebbero colore in ritardo sul resto della pagina
    radice.classList.add('tema-in-cambio');
    radice.dataset.tema = temaNuovo;
    let attesaFrame = window.requestAnimationFrame(() => {
      attesaFrame = window.requestAnimationFrame(() => radice.classList.remove('tema-in-cambio'));
    });
    return () => {
      window.cancelAnimationFrame(attesaFrame);
      radice.classList.remove('tema-in-cambio');
    };
  }, [temaScuro]);

  useEffect(() => {
    const temaSalvato = leggiTemaSalvato();
    temaScelto.current = temaSalvato !== null;
    const preferenzaScura = window.matchMedia('(prefers-color-scheme: dark)');
    // index.html fissa il tema al caricamento: se nel frattempo è cambiato su un'altra pagina o in un'altra scheda, la home lo riprende qui
    setTemaScuro(temaSalvato ? temaSalvato === 'scuro' : preferenzaScura.matches);
    const seguiSistema = (evento: MediaQueryListEvent) => {
      if (!temaScelto.current) setTemaScuro(evento.matches);
    };
    const seguiAltraScheda = (evento: StorageEvent) => {
      if (evento.key !== CHIAVE_TEMA || !temaValido(evento.newValue)) return;
      temaScelto.current = true;
      setTemaScuro(evento.newValue === 'scuro');
    };
    preferenzaScura.addEventListener('change', seguiSistema);
    window.addEventListener('storage', seguiAltraScheda);
    return () => {
      preferenzaScura.removeEventListener('change', seguiSistema);
      window.removeEventListener('storage', seguiAltraScheda);
    };
  }, []);

  const invertiTema = () => {
    const temaNuovo: Tema = temaScuro ? 'chiaro' : 'scuro';
    temaScelto.current = true;
    try {
      window.localStorage.setItem(CHIAVE_TEMA, temaNuovo);
    } catch {
      /* senza storage la scelta vale solo per questa visita */
    }
    setTemaScuro(temaNuovo === 'scuro');
  };

  return (
    <button className="cambio-tema" type="button" aria-pressed={temaScuro} aria-label="Tema scuro" onClick={invertiTema}>
      <Icona nome={temaScuro ? 'sole' : 'luna'} />
    </button>
  );
};

export default CambioTema;
