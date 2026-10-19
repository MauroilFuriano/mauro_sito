import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { passiMetodo } from '../../data/home';
import AzioniContatto from './AzioniContatto';
import { Icona } from './Icone';
import ListinoVoci from './ListinoVoci';
import { conMovimento, gsap } from './animazioni';

const Prezzi: React.FC = () => {
  const metodoRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const metodo = metodoRef.current;
    if (!metodo) return undefined;
    const sceltaMedia = gsap.matchMedia();
    // Va creato dopo il palco dei Lavori: il pin allunga la pagina sopra il metodo e sposta i suoi punti di partenza.
    sceltaMedia.add(conMovimento('(min-width: 1100px)'), () => {
      gsap.fromTo(metodo, { '--riempimento-metodo': 0 }, { '--riempimento-metodo': 1, ease: 'none', scrollTrigger: { trigger: metodo, start: 'top 80%', end: 'bottom 55%', scrub: 0.6, refreshPriority: -1 } });
    });
    return () => sceltaMedia.revert();
  }, []);

  return (
    <section className="sezione sezione--filo prezzi" id="prezzi" aria-labelledby="titolo-prezzi">
      <div className="larghezza">
        <h2 className="titolo-sezione" id="titolo-prezzi">Quanto costa e come lavoro</h2>
        <ol className="metodo" ref={metodoRef}>
          {passiMetodo.map((passo, indice) => (
            <li className="passo" key={passo.evidenza}>
              <span className="passo-numero" aria-hidden="true">{indice + 1}</span>
              <p><strong>{passo.evidenza}</strong> {passo.seguito}</p>
            </li>
          ))}
        </ol>

        <div className="listino">
          <div className="listino-testa">
            <h3>Listino</h3>
            <p>Prezzi IVA esclusa, pagamento anche a rate.</p>
            <Link className="link-freccia" to="/simulatore">Calcola il tuo preventivo in 2 minuti<Icona nome="freccia" /></Link>
            <Link className="link-freccia" to="/quanto-costa-un-sito-web">Come si formano i prezzi<Icona nome="freccia" /></Link>
          </div>
          <ListinoVoci />
        </div>

        <div className="prezzi-chiusura">
          <AzioniContatto conNota />
        </div>
      </div>
    </section>
  );
};

export default Prezzi;
