import React, { useEffect, useRef, useState } from 'react';
import { conversazioneHotel, recapiti, servizi, type Servizio } from '../../data/home';
import AzioniContatto from './AzioniContatto';
import CorniceBrowser from './CorniceBrowser';
import CorniceTelefono from './CorniceTelefono';
import { Icona } from './Icone';
import { conMovimento, gsap, ScrollTrigger } from './animazioni';

const ScenaServizio: React.FC<{ servizio: Servizio; attiva?: boolean }> = ({ servizio, attiva = false }) => {
  const { scena, cartellino } = servizio;
  return (
    <figure className={attiva ? 'servizio-scena servizio-scena--attiva' : 'servizio-scena'}>
      <div className="servizio-finestra">
        {scena.cornice === 'telefono' ? (
          <div className="servizio-telefono">
            <CorniceTelefono immagine={scena.immagine} pellicola={scena.pellicolaChat ? 'chat' : undefined} />
          </div>
        ) : (
          <CorniceBrowser indirizzo={scena.indirizzo} immagine={scena.immagine} />
        )}
      </div>
      <figcaption className="cartellino"><strong>{cartellino.nome}</strong><span>{cartellino.nota}</span></figcaption>
    </figure>
  );
};

const EsempioAssistente: React.FC = () => {
  const [aperto, setAperto] = useState(false);

  return (
    <>
      <button
        className="assistente-apri"
        type="button"
        aria-expanded={aperto}
        aria-controls="assistente-esempio"
        onClick={() => setAperto((statoPrecedente) => !statoPrecedente)}
      >
        <Icona nome="messaggio" />Prova l'assistente<Icona nome="giu" className="icona--freccia-giu" />
      </button>
      <div className="assistente" id="assistente-esempio" hidden={!aperto}>
        <p className="assistente-etichetta">
          <strong>Esempio di conversazione</strong> <span className="assistente-punto" aria-hidden="true">·</span> <span>dalla demo per hotel</span>
        </p>
        <ol className="assistente-messaggi">
          {conversazioneHotel.map((messaggio) => (
            <li key={messaggio.testo} className={`messaggio messaggio--${messaggio.autore === 'ospite' ? 'cliente' : 'assistente'}`}>
              <span className="messaggio-autore">{messaggio.autore === 'ospite' ? 'Ospite' : 'Assistente'}</span>{messaggio.testo}
            </li>
          ))}
        </ol>
        <a className="link-freccia link-freccia--esterno assistente-demo" href={recapiti.demoHotel} target="_blank" rel="noopener">
          Prova la demo dal vivo<Icona nome="esterno" />
        </a>
      </div>
    </>
  );
};

const Servizi: React.FC = () => {
  const elencoRef = useRef<HTMLDivElement>(null);
  const [sincronizzati, setSincronizzati] = useState(false);
  const [scenaAttiva, setScenaAttiva] = useState(0);

  useEffect(() => {
    const sceltaMedia = gsap.matchMedia();
    sceltaMedia.add(conMovimento('(min-width: 900px)'), () => {
      setSincronizzati(true);
      return () => setSincronizzati(false);
    });
    return () => sceltaMedia.revert();
  }, []);

  useEffect(() => {
    const elenco = elencoRef.current;
    if (!sincronizzati || !elenco) return undefined;
    const contesto = gsap.context(() => {
      elenco.querySelectorAll('.servizio').forEach((voce, indice) => {
        ScrollTrigger.create({
          trigger: voce,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (stato) => { if (stato.isActive) setScenaAttiva(indice); },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => {
      contesto.revert();
      setScenaAttiva(0);
    };
  }, [sincronizzati]);

  return (
    <section className={sincronizzati ? 'sezione sezione--filo servizi servizi--sincronizzati' : 'sezione sezione--filo servizi'} id="servizi" aria-labelledby="titolo-servizi">
      <div className="larghezza">
        <div className="servizi-testa">
          <h2 className="titolo-sezione" id="titolo-servizi">Web design ad Ascoli Piceno su misura</h2>
          <p className="testo-grande">Siti veloci, chatbot AI e automazioni per le PMI delle Marche e di tutta Italia. Scrivo il codice da zero, quindi il sito è tuo e non dipende da piattaforme in abbonamento.</p>
        </div>
        <div className="servizi-corpo">
          <div className="servizi-schermi">
            {sincronizzati && servizi.map((servizio, indice) => (
              <ScenaServizio key={servizio.titolo} servizio={servizio} attiva={indice === scenaAttiva} />
            ))}
          </div>
          <div className="servizi-elenco" ref={elencoRef}>
            {servizi.map((servizio) => (
              <article className="servizio" key={servizio.titolo}>
                {!sincronizzati && <ScenaServizio servizio={servizio} />}
                <div className="servizio-testo">
                  <h3>{servizio.titolo}</h3>
                  <p>{servizio.descrizione}</p>
                  <p className="servizio-prezzo">
                    <strong>{servizio.prezzo}</strong>
                    {servizio.tempi && <span>{servizio.tempi}</span>}
                  </p>
                  {servizio.conAssistente && <EsempioAssistente />}
                </div>
              </article>
            ))}
          </div>
          <div className="servizi-chiusura">
            <AzioniContatto conNota />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servizi;
