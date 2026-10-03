import React from 'react';
import { Link } from 'react-router-dom';
import { settori, type Settore } from '../../data/home';
import { Icona } from './Icone';
import SenzaACapo from './SenzaACapo';

const ContenutoSettore: React.FC<{ settore: Settore }> = ({ settore }) => (
  <>
    <span className="settore-nome"><SenzaACapo testo={settore.nome} parole={settore.senzaACapo} /></span>
    <span className="settore-testo"><span>{settore.descrizione}</span><span className="settore-destinazione">{settore.destinazione}</span></span>
    <span className="settore-freccia" aria-hidden="true"><Icona nome="freccia" /></span>
  </>
);

const Settori: React.FC = () => (
  <section className="sezione settori" aria-labelledby="titolo-settori">
    <div className="larghezza">
      <h2 className="titolo-sezione titolo-sezione--medio" id="titolo-settori">Con chi lavoro</h2>
      <ul className="settori-elenco">
        {settori.map((settore) => (
          <li key={settore.nome}>
            {settore.percorso.startsWith('#') ? (
              <a className="settore" href={settore.percorso}><ContenutoSettore settore={settore} /></a>
            ) : (
              <Link className="settore" to={settore.percorso}><ContenutoSettore settore={settore} /></Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Settori;
