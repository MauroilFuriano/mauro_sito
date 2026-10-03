import React from 'react';
import { domandeFrequenti } from '../../data/home';

const Domande: React.FC = () => (
  <section className="sezione sezione--filo domande" id="faq" aria-labelledby="titolo-domande">
    <div className="larghezza">
      <div className="domande-colonna">
        <h2 className="titolo-sezione titolo-sezione--medio" id="titolo-domande">Domande frequenti</h2>
        <div className="domande-elenco">
          {domandeFrequenti.map((domandaFrequente, indice) => (
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
