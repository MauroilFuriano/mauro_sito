import React, { useEffect, useRef, useState } from 'react';
import { clientiRecenti } from '../../data/home';
import AzioniContatto from './AzioniContatto';
import CorniceBrowser from './CorniceBrowser';
import CorniceTelefono from './CorniceTelefono';
import { Stelle } from './Icone';
import { conMovimento, gsap } from './animazioni';

const ATTESA_MASSIMA_VETRINA = 1200;

const ElencoClienti: React.FC<{ copia?: boolean }> = ({ copia = false }) => (
  <ul className={copia ? 'fiducia-nomi fiducia-nomi--copia' : 'fiducia-nomi'} aria-hidden={copia || undefined}>
    {clientiRecenti.map((cliente) => (
      <li key={cliente.nome}><span className="fiducia-nome">{cliente.nome}</span><span className="fiducia-luogo">{cliente.luogo}</span></li>
    ))}
  </ul>
);

const PrimaSchermata: React.FC = () => {
  const eroeRef = useRef<HTMLElement>(null);
  const vetrinaRef = useRef<HTMLDivElement>(null);
  const fiduciaRef = useRef<HTMLDivElement>(null);
  const [vetrinaPronta, setVetrinaPronta] = useState(false);

  useEffect(() => {
    const vetrina = vetrinaRef.current;
    if (!vetrina) return undefined;
    let montata = true;
    let attesaMassima = 0;
    const immaginiVisibili = [...vetrina.querySelectorAll('img')].filter((immagine) => immagine.getClientRects().length > 0);
    const vetrinaCaricata = Promise.all(immaginiVisibili.map((immagine) => immagine.decode().catch(() => undefined)));
    const tempoScaduto = new Promise<void>((risolvi) => { attesaMassima = window.setTimeout(risolvi, ATTESA_MASSIMA_VETRINA); });
    Promise.race([vetrinaCaricata, tempoScaduto]).then(() => {
      if (montata) setVetrinaPronta(true);
    });
    return () => {
      montata = false;
      window.clearTimeout(attesaMassima);
    };
  }, []);

  useEffect(() => {
    const eroe = eroeRef.current;
    const fiducia = fiduciaRef.current;
    if (!eroe || !fiducia) return undefined;
    const finePrimaSchermata = { trigger: eroe, start: 0, end: 'bottom top', scrub: 0.6 };
    const sceltaMedia = gsap.matchMedia();

    sceltaMedia.add(conMovimento('(min-width: 600px)'), () => {
      fiducia.classList.add('fiducia--nastro');
      gsap.to('.fiducia-binario', { xPercent: -25, ease: 'none', scrollTrigger: { trigger: eroe, start: 0, end: 'bottom top', scrub: 1 } });
      return () => fiducia.classList.remove('fiducia--nastro');
    }, eroe);

    sceltaMedia.add({ largo: conMovimento('(min-width: 900px)'), stretto: conMovimento('(max-width: 899px)') }, (contesto) => {
      const spostamenti: [string, number][] = contesto.conditions?.largo
        ? [['.vetrina-dietro', -7], ['.vetrina-principale', -16], ['.vetrina-telefono', -46]]
        : [['.vetrina-principale', -6], ['.vetrina-telefono', -14]];
      spostamenti.forEach(([strato, spostamento]) => {
        gsap.to(strato, { yPercent: spostamento, ease: 'none', scrollTrigger: { ...finePrimaSchermata } });
      });
      gsap.to('.vetrina-principale .schermo-pellicola', { yPercent: -21, ease: 'none', scrollTrigger: { ...finePrimaSchermata, scrub: 0.9 } });
    }, eroe);

    return () => sceltaMedia.revert();
  }, []);

  return (
    <section className="eroe" ref={eroeRef} aria-labelledby="titolo-eroe">
      <div className="eroe-griglia">
        <div className="eroe-testo">
          <h1 id="titolo-eroe">Sviluppatore web ad <span className="senza-a-capo">Ascoli Piceno</span></h1>
          <p className="eroe-sottotitolo">Faccio siti web per hotel, B&amp;B, concessionarie, artigiani e negozi del Piceno. Il prezzo te lo scrivo prima di iniziare, e al telefono rispondo io.</p>
          <AzioniContatto id="azioni-eroe" conNota />
        </div>

        <div className={vetrinaPronta ? 'vetrina vetrina--pronta' : 'vetrina'} ref={vetrinaRef}>
          <div className="vetrina-livello vetrina-dietro">
            <div className="vetrina-ingresso">
              <CorniceBrowser
                indirizzo="fcresinwoodcreations.com"
                immagine={{
                  src: '/lavori/fc-resinwood-desktop.webp',
                  larghezza: 1440,
                  altezza: 2700,
                  alt: 'Il sito di FC Resinwood, laboratorio artigiano ad Ascoli Piceno, aperto su un computer: un tavolo in legno con un fiume di resina blu',
                }}
              />
            </div>
          </div>
          <div className="vetrina-livello vetrina-principale">
            <figure className="vetrina-ingresso">
              <CorniceBrowser
                indirizzo="redicar.it"
                caricamentoPigro={false}
                prioritaAlta
                immagine={{
                  src: '/lavori/redicar-desktop.webp',
                  larghezza: 1440,
                  altezza: 2700,
                  alt: 'Il sito di Redicar, concessionaria a Colonnella, aperto su un computer: il piazzale delle auto e il titolo Veicoli usati certificati e garantiti',
                }}
              />
              <figcaption className="cartellino"><strong>Redicar</strong><span>Colonnella (TE)</span></figcaption>
            </figure>
          </div>
          <div className="vetrina-livello vetrina-telefono">
            <figure className="vetrina-ingresso">
              <CorniceTelefono
                caricamentoPigro={false}
                immagine={{
                  src: '/lavori/graphic-arts-mobile.webp',
                  larghezza: 780,
                  altezza: 5064,
                  alt: "Il sito di Graphic Arts, tipolitografia a San Benedetto del Tronto, aperto su un telefono, con i pulsanti Genera con l'AI e Crea t-shirt",
                }}
              />
              <figcaption className="cartellino"><strong>Graphic Arts</strong><span>San Benedetto del Tronto</span></figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="fiducia" ref={fiduciaRef}>
        <div className="fiducia-testa">
          <p className="fiducia-voto"><Stelle />5,0 su Google</p>
          <p className="fiducia-intro">Ultimi lavori per</p>
        </div>
        <div className="fiducia-nastro">
          <div className="fiducia-binario">
            <ElencoClienti />
            <ElencoClienti copia />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimaSchermata;
