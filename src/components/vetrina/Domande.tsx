import React from 'react';
import { domandeFrequenti, type DomandaFrequente } from '../../data/home';

interface DomandeProps {
  domande?: readonly DomandaFrequente[];
  id?: string;
}

const Domande: React.FC<DomandeProps> = ({ domande = domandeFrequenti, id = 'faq' }) => (
  <section className="sezione sezione--filo domande" id={id} aria-labelledby={`titolo-${id}`}>
    <div className="larghezza">
      <div className="domande-colonna">
        <h2 className="titolo-sezione titolo-sezione--medio" id={`titolo-${id}`}>Domande frequenti</h2>
        <div className="domande-elenco">
          {domande.map((domandaFrequente, indice) => (
            <details className="domanda" key={domandaFrequente.domanda} open={indice === 0}>
              <summary><h3 className="domanda-titolo">{domandaFrequente.domanda}</h3><span className="domanda-segno" aria-hidden="true"></span></summary>
              <p>{domandaFrequente.risposta}</p>
            </details>
          ))}
        </div>
        <p className="aggiornato">Aggiornato: ottobre 2026 · Mauro Ceccarelli, sviluppatore web ad Ascoli Piceno</p>
      </div>
    </div>
  </section>
);

export default Domande;
