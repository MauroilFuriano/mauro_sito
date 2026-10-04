import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Assistente from '../components/vetrina/Assistente';
import BarraContatti from '../components/vetrina/BarraContatti';
import ChiSono from '../components/vetrina/ChiSono';
import Contatti from '../components/vetrina/Contatti';
import DialogoVideo, { apriDialogoVideo } from '../components/vetrina/DialogoVideo';
import Domande from '../components/vetrina/Domande';
import Icone from '../components/vetrina/Icone';
import Lavori from '../components/vetrina/Lavori';
import Piede from '../components/vetrina/Piede';
import Prezzi from '../components/vetrina/Prezzi';
import PrimaSchermata from '../components/vetrina/PrimaSchermata';
import Recensioni from '../components/vetrina/Recensioni';
import Servizi from '../components/vetrina/Servizi';
import Settori from '../components/vetrina/Settori';
import Testata from '../components/vetrina/Testata';
import { ScrollTrigger } from '../components/vetrina/animazioni';
import { segnaClicContatto } from '../components/vetrina/clicContatto';
import '../styles/vetrina.css';

const ancoreVecchie = new Map([
  ['home', 'contenuto'],
  ['about', 'chi-sono'],
  ['services', 'servizi'],
  ['portfolio', 'lavori'],
  ['faq', 'faq'],
  ['contact', 'contatti'],
]);

const ATTESA_MASSIMA_CARATTERI = 1500;
const PAUSA_RICALCOLO = 150;
const PAUSA_LETTURA = 120;
const ATTESA_FINE_RIDIMENSIONAMENTO = 400;

type PuntoDiLettura = { sezione: Element; scarto: number } | { sezione: Element; avanzamento: number };

// Con il palco agganciato la sezione dei lavori vive dentro il pin-spacer di GSAP, alto quanto tutta la corsa orizzontale
const ingombroSezione = (sezione: Element) => {
  const contenitore = sezione.parentElement;
  return (contenitore?.classList.contains('pin-spacer') ? contenitore : sezione).getBoundingClientRect();
};

const HomePage: React.FC = () => {
  const radiceRef = useRef<HTMLDivElement>(null);
  const contenutoRef = useRef<HTMLElement>(null);
  const dialogoVideoRef = useRef<HTMLDialogElement>(null);
  const { hash, key } = useLocation();
  const [movimentoRidotto] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const portaAllaSezione = useCallback((destinazione: HTMLElement, comportamento: ScrollBehavior) => {
    const testata = radiceRef.current?.querySelector<HTMLElement>('.testata');
    const scarto = testata && window.matchMedia('(min-width: 900px)').matches ? testata.offsetHeight : 0;
    window.scrollTo({ top: destinazione.getBoundingClientRect().top + window.scrollY - scarto, behavior: comportamento });
    destinazione.setAttribute('tabindex', '-1');
    destinazione.focus({ preventScroll: true });
  }, []);

  const apriVideo = useCallback(() => apriDialogoVideo(dialogoVideoRef.current), []);

  const seguiCollegamento = (evento: React.MouseEvent<HTMLDivElement>) => {
    segnaClicContatto(evento);
    const collegamento = (evento.target as Element).closest('a[href]');
    const indirizzo = collegamento?.getAttribute('href') ?? '';
    if (!indirizzo.startsWith('#') || evento.defaultPrevented) return;
    const destinazione = document.getElementById(indirizzo.slice(1));
    if (!destinazione) return;
    evento.preventDefault();
    portaAllaSezione(destinazione, movimentoRidotto ? 'auto' : 'smooth');
  };

  useEffect(() => {
    const contenuto = contenutoRef.current;
    if (!contenuto) return undefined;
    let primaMisura = true;
    let attesaRicalcolo = 0;
    // Pannelli che si aprono, banner dei cookie e caratteri che arrivano cambiano l'altezza: i punti di GSAP vanno ricalcolati
    const osservatoreAltezza = new ResizeObserver(() => {
      if (primaMisura) {
        primaMisura = false;
        return;
      }
      window.clearTimeout(attesaRicalcolo);
      attesaRicalcolo = window.setTimeout(() => ScrollTrigger.refresh(), PAUSA_RICALCOLO);
    });
    osservatoreAltezza.observe(contenuto);
    return () => {
      osservatoreAltezza.disconnect();
      window.clearTimeout(attesaRicalcolo);
    };
  }, []);

  useEffect(() => {
    const contenuto = contenutoRef.current;
    if (!contenuto) return undefined;
    let larghezzaPrecedente = window.innerWidth;
    let puntoDiLettura: PuntoDiLettura | null = null;
    let ripristinoInCorso = false;
    let attesaMisura = 0;
    let attesaFine = 0;
    const misuraPuntoDiLettura = () => {
      const sezione = [...contenuto.querySelectorAll('section')].find((candidata) => ingombroSezione(candidata).bottom > 0);
      if (!sezione) {
        puntoDiLettura = null;
        return;
      }
      const ingombro = ingombroSezione(sezione);
      puntoDiLettura = ingombro.top > 0 ? { sezione, scarto: ingombro.top } : { sezione, avanzamento: -ingombro.top / ingombro.height };
    };
    const seguiLettura = () => {
      if (ripristinoInCorso) return;
      window.clearTimeout(attesaMisura);
      attesaMisura = window.setTimeout(misuraPuntoDiLettura, PAUSA_LETTURA);
    };
    const prolungaRipristino = () => {
      window.clearTimeout(attesaFine);
      attesaFine = window.setTimeout(() => {
        ripristinoInCorso = false;
        misuraPuntoDiLettura();
      }, ATTESA_FINE_RIDIMENSIONAMENTO);
    };
    // Girando il tablet o allargando la finestra il palco dei lavori si aggancia o si sgancia e sposta di migliaia di pixel
    // quello che sta sotto; ScrollTrigger rimette solo i pixel di prima, quindi si torna al punto letto prima del cambio di larghezza
    const avviaRipristino = () => {
      if (window.innerWidth === larghezzaPrecedente) return;
      larghezzaPrecedente = window.innerWidth;
      if (!puntoDiLettura) return;
      ripristinoInCorso = true;
      window.clearTimeout(attesaMisura);
      prolungaRipristino();
    };
    const tornaAlPuntoDiLettura = () => {
      if (!ripristinoInCorso || !puntoDiLettura) return;
      const ingombro = ingombroSezione(puntoDiLettura.sezione);
      const inizioSezione = ingombro.top + window.scrollY;
      window.scrollTo(0, 'scarto' in puntoDiLettura ? inizioSezione - puntoDiLettura.scarto : inizioSezione + puntoDiLettura.avanzamento * ingombro.height);
      prolungaRipristino();
    };
    window.addEventListener('scroll', seguiLettura, { passive: true });
    window.addEventListener('resize', avviaRipristino);
    ScrollTrigger.addEventListener('refresh', tornaAlPuntoDiLettura);
    return () => {
      window.removeEventListener('scroll', seguiLettura);
      window.removeEventListener('resize', avviaRipristino);
      ScrollTrigger.removeEventListener('refresh', tornaAlPuntoDiLettura);
      window.clearTimeout(attesaMisura);
      window.clearTimeout(attesaFine);
    };
  }, []);

  useEffect(() => {
    if (!hash) return undefined;
    const ancora = hash.slice(1);
    const idSezione = ancoreVecchie.get(ancora) ?? ancora;
    let attiva = true;
    let attesaMassima = 0;
    const caratteriPronti = document.fonts ? document.fonts.ready : Promise.resolve();
    const tempoScaduto = new Promise<void>((risolvi) => { attesaMassima = window.setTimeout(risolvi, ATTESA_MASSIMA_CARATTERI); });
    Promise.race([caratteriPronti, tempoScaduto]).then(() => {
      window.requestAnimationFrame(() => {
        const destinazione = document.getElementById(idSezione);
        if (!attiva || !destinazione) return;
        ScrollTrigger.refresh();
        // Nel vecchio menu "Home" era l'inizio pagina: su telefono la testata non è fissa e #contenuto la lascerebbe fuori vista
        if (ancora === 'home') window.scrollTo(0, 0);
        else portaAllaSezione(destinazione, 'auto');
      });
    });
    return () => {
      attiva = false;
      window.clearTimeout(attesaMassima);
    };
  }, [hash, key, portaAllaSezione]);

  return (
    <div className="home-vetrina" ref={radiceRef} onClick={seguiCollegamento}>
      <a className="salta" href="#contenuto">Vai al contenuto</a>
      <Testata />

      <main id="contenuto" ref={contenutoRef}>
        <PrimaSchermata />
        <Settori />
        <Servizi />
        <Lavori onApriVideo={apriVideo} />
        <Recensioni />
        <Prezzi />
        <ChiSono />
        <Domande />
        <Contatti />
      </main>

      <Piede />
      <BarraContatti />
      <Assistente />
      <DialogoVideo dialogoRef={dialogoVideoRef} />
      <Icone />
    </div>
  );
};

export default HomePage;
