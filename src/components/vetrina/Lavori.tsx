import React, { useEffect, useRef, useState } from 'react';
import { lavori, type Lavoro } from '../../data/home';
import AzioniContatto from './AzioniContatto';
import CorniceBrowser from './CorniceBrowser';
import CorniceTelefono from './CorniceTelefono';
import { Icona } from './Icone';
import { conMovimento, gsap, ScrollTrigger } from './animazioni';

type VistaLavoro = 'computer' | 'telefono';

const MISURE_COMPUTER = '(max-width: 899px) min(77vw, 480px), min(53vw, 780px)';
// Scegliendo la vista telefono il telefono si ingrandisce di circa il 20%: le misure ne tengono conto
const MISURE_TELEFONO = '(max-width: 899px) min(30vw, 186px), min(17.4vw, 252px)';

const vistePossibili: readonly { vista: VistaLavoro; nome: string }[] = [
  { vista: 'computer', nome: 'Computer' },
  { vista: 'telefono', nome: 'Telefono' },
];

interface PannelloLavoroProps {
  lavoro: Lavoro;
  onApriVideo: () => void;
}

const PannelloLavoro: React.FC<PannelloLavoroProps> = ({ lavoro, onApriVideo }) => {
  const [vistaScelta, setVistaScelta] = useState<VistaLavoro>('computer');

  return (
    <article className="lavoro" id={`lavoro-${lavoro.id}`} aria-labelledby={`nome-${lavoro.id}`}>
      <div className="lavoro-schermi" data-vista={vistaScelta}>
        <div className="lavoro-browser">
          <CorniceBrowser comeFigura indirizzo={lavoro.indirizzo} immagine={lavoro.computer} misure={MISURE_COMPUTER} />
        </div>
        <div className="lavoro-telefono">
          <CorniceTelefono comeFigura immagine={lavoro.telefono} misure={MISURE_TELEFONO} pellicola={lavoro.telefonoFermo ? 'ferma' : undefined} />
        </div>
      </div>
      <div className="lavoro-cartellino">
        <p className="lavoro-tipo">{lavoro.tipo}</p>
        <h3 className="lavoro-nome" id={`nome-${lavoro.id}`}>{lavoro.nome}</h3>
        <p className="lavoro-descrizione">{lavoro.descrizione}</p>
        <div className="lavoro-comandi">
          <div className="interruttore" role="group" aria-label={lavoro.etichettaInterruttore}>
            {vistePossibili.map(({ vista, nome }) => (
              <button key={vista} type="button" aria-pressed={vistaScelta === vista} onClick={() => setVistaScelta(vista)}>
                {nome}
              </button>
            ))}
          </div>
          {lavoro.sito ? (
            <a className="link-freccia link-freccia--esterno" href={lavoro.sito} target="_blank" rel="noopener">
              Guarda il sito<span className="solo-lettori"> di {lavoro.nome}</span><Icona nome="esterno" />
            </a>
          ) : (
            <button
              className="link-freccia link-video"
              type="button"
              aria-haspopup="dialog"
              aria-controls="video-sarcolab"
              onClick={onApriVideo}
            >
              Guarda la presentazione<Icona nome="play" piena />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

interface LavoriProps {
  onApriVideo: () => void;
}

const Lavori: React.FC<LavoriProps> = ({ onApriVideo }) => {
  const sezioneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sezione = sezioneRef.current;
    if (!sezione) return undefined;
    const sceltaMedia = gsap.matchMedia();

    sceltaMedia.add(conMovimento('(min-width: 1024px) and (min-height: 600px)'), () => {
      const palco = sezione.querySelector<HTMLElement>('.lavori-palco');
      const scorrimento = sezione.querySelector<HTMLElement>('.lavori-scorrimento');
      const avanzamento = sezione.querySelector<HTMLElement>('.lavori-avanzamento span');
      if (!CSS.supports('container-type: size') || !palco || !scorrimento || !avanzamento) return undefined;
      const pannelli = [...sezione.querySelectorAll<HTMLElement>('.lavoro')];
      const vociIndice = [...sezione.querySelectorAll<HTMLAnchorElement>('.lavori-indice a')];
      const testata = document.querySelector<HTMLElement>('.home-vetrina .testata');
      sezione.classList.add('lavori--orizzontale');

      const corsa = () => Math.max(1, scorrimento.scrollWidth - palco.clientWidth);
      const misuraTappe = () => [0, ...pannelli.map((pannello) => Math.min(1, pannello.offsetLeft / corsa()))];
      let tappe = misuraTappe();
      // Snap nel verso dello scorrimento: con la tappa più vicina una rotellata breve riportava indietro. L'1 finale lascia uscire dal palco.
      const tappaNelVerso = (avanzamentoNaturale: number) => (
        ScrollTrigger.snapDirectional([...tappe, 1])(avanzamentoNaturale, binario.scrollTrigger?.direction ?? 1)
      );
      const segnaAvanzamento = (progresso: number) => {
        avanzamento.style.transform = `scaleX(${progresso})`;
        const attivo = tappe.reduce((ultimo, tappa, indice) => (indice > 0 && progresso >= tappa - 0.1 ? indice : ultimo), 0);
        vociIndice.forEach((voce, indice) => {
          if (indice === attivo - 1) voce.setAttribute('aria-current', 'true');
          else voce.removeAttribute('aria-current');
        });
      };

      const binario = gsap.to(scorrimento, {
        x: () => -corsa(),
        ease: 'none',
        scrollTrigger: {
          trigger: palco,
          start: () => `top ${testata ? testata.offsetHeight : 0}px`,
          end: () => `+=${Math.round(corsa() * 0.72)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: tappaNelVerso, inertia: false, duration: { min: 0.25, max: 0.6 }, delay: 0.05, ease: 'power2.inOut' },
          onRefresh: (palcoScorrimento) => { tappe = misuraTappe(); segnaAvanzamento(palcoScorrimento.progress); },
          onUpdate: (palcoScorrimento) => segnaAvanzamento(palcoScorrimento.progress),
        },
      });
      ScrollTrigger.create({
        start: () => (binario.scrollTrigger?.end ?? 0) + 40,
        end: 'max',
        onToggle: (stato) => sezione.classList.toggle('lavori--uscita', stato.isActive),
      });

      pannelli.forEach((pannello) => {
        const pellicolaBrowser = pannello.querySelector('.lavoro-browser .schermo-pellicola');
        gsap.timeline({ scrollTrigger: { trigger: pannello, containerAnimation: binario, start: 'left right', end: 'right left', scrub: true } })
          .fromTo(pellicolaBrowser, { yPercent: -12 }, { yPercent: 0, ease: 'none' })
          .to(pellicolaBrowser, { yPercent: -30, ease: 'none' });
        gsap.fromTo(pannello.querySelector('.lavoro-telefono'), { xPercent: 42 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: pannello, containerAnimation: binario, start: 'left right', end: 'left left', scrub: true } });
      });

      const vaiAllaTappa = (indice: number, comportamento: ScrollBehavior) => {
        const palcoScorrimento = binario.scrollTrigger;
        if (!palcoScorrimento) return;
        const { start, end } = palcoScorrimento;
        window.scrollTo({ top: Math.round(start + tappe[indice] * (end - start)), behavior: comportamento });
      };
      const scegliDallIndice = (evento: MouseEvent) => {
        evento.preventDefault();
        // Ferma lo snap già partito dalla rotella, che altrimenti riporta al pannello di prima.
        gsap.killTweensOf(window);
        vaiAllaTappa(vociIndice.indexOf(evento.currentTarget as HTMLAnchorElement) + 1, 'smooth');
      };
      // Il palco ha overflow: clip, quindi il browser non può far scorrere da solo verso un link fuori vista: lo portiamo noi alla tappa del pannello.
      const portaInVista = (evento: FocusEvent) => vaiAllaTappa(pannelli.indexOf(evento.currentTarget as HTMLElement) + 1, 'auto');
      vociIndice.forEach((voce) => voce.addEventListener('click', scegliDallIndice));
      pannelli.forEach((pannello) => pannello.addEventListener('focusin', portaInVista));

      return () => {
        sezione.classList.remove('lavori--orizzontale', 'lavori--uscita');
        avanzamento.style.transform = '';
        vociIndice.forEach((voce) => { voce.removeEventListener('click', scegliDallIndice); voce.removeAttribute('aria-current'); });
        pannelli.forEach((pannello) => pannello.removeEventListener('focusin', portaInVista));
      };
    });

    return () => sceltaMedia.revert();
  }, []);

  return (
    <section className="lavori" id="lavori" ref={sezioneRef} aria-labelledby="titolo-lavori">
      <div className="lavori-palco">
        <div className="lavori-scorrimento">
          <div className="lavori-intro">
            <h2 className="titolo-sezione" id="titolo-lavori">Lavori recenti</h2>
            <figure className="citazione-redicar">
              <blockquote><p>“Un piccolo algoritmo proprietario, fatto su misura per noi, che già i primi giorni ha iniziato a portarci richieste nuove.”</p></blockquote>
              <figcaption>Redicar srl, settembre 2026</figcaption>
            </figure>
            <p className="lavori-suggerimento">Scorri per vedere tutti i lavori<Icona nome="freccia" /></p>
          </div>

          <div className="lavori-pista">
            {lavori.map((lavoro) => <PannelloLavoro key={lavoro.id} lavoro={lavoro} onApriVideo={onApriVideo} />)}
          </div>
        </div>

        <nav className="lavori-indice" aria-label="Scegli un lavoro">
          <div className="lavori-avanzamento" aria-hidden="true"><span></span></div>
          <ol>
            {lavori.map((lavoro) => <li key={lavoro.id}><a href={`#lavoro-${lavoro.id}`}>{lavoro.nome}</a></li>)}
          </ol>
        </nav>

        <div className="lavori-chiusura">
          <AzioniContatto conNota />
        </div>
      </div>
    </section>
  );
};

export default Lavori;
