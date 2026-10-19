import React from 'react';
import { Link } from 'react-router-dom';
import { listino } from '../../data/home';

const ListinoVoci: React.FC = () => (
  <ul className="listino-voci">
    {listino.map((voceListino) => (
      <li className="listino-voce" key={voceListino.nome}>
        <span className="voce-nome">
          {voceListino.percorso ? <Link to={voceListino.percorso}>{voceListino.nome}</Link> : voceListino.nome}
        </span>
        {voceListino.tempi && <span className="voce-tempi">{voceListino.tempi}</span>}
        <span className="voce-prezzo">
          {voceListino.prezzo}
          {voceListino.canone && <small className="voce-canone">{voceListino.canone}</small>}
        </span>
      </li>
    ))}
  </ul>
);

export default ListinoVoci;
