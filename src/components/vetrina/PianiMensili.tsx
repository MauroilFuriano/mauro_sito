import React from 'react';
import { abbonamenti } from '../../data/home';

const PianiMensili: React.FC = () => (
  <ul className="piani">
    {abbonamenti.map((piano) => (
      <li className={piano.consigliato ? 'piano piano--consigliato' : 'piano'} key={piano.id}>
        {piano.consigliato && <p className="piano-etichetta">Consigliato</p>}
        <h3>{piano.nome}</h3>
        <p className="piano-prezzo"><span>da</span> {piano.prezzoMensile} € <small>al mese</small></p>
        <p className="piano-per-chi">{piano.perChi}</p>
        <ul className="piano-incluso">
          {piano.incluso.map((voce) => <li key={voce}>{voce}</li>)}
        </ul>
      </li>
    ))}
  </ul>
);

export default PianiMensili;
