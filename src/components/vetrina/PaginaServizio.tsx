import React from 'react';
import { Link } from 'react-router-dom';
import { passiMetodo } from '../../data/home';
import type { ContenutoPaginaServizio } from '../../data/pagineServizio';
import { segnaEvento } from '../../misurazione';
import AzioniContatto from './AzioniContatto';
import { Icona } from './Icone';
import PaginaVetrina from './PaginaVetrina';
import '../../styles/pagina-servizio.css';

const PaginaServizio: React.FC<{ contenuto: ContenutoPaginaServizio }> = ({ contenuto }) => {
  const { etichetta, titolo, sottotitolo, prezzo, demo, titoloPunti, punti, argomento, chiusura } = contenuto;
  return (
    <PaginaVetrina>
      <section className="pagina-eroe" aria-labelledby="titolo-pagina">
        <div className="larghezza">
          <p className="pagina-etichetta">{etichetta}</p>
          <h1 id="titolo-pagina">{titolo}</h1>
          <p className="pagina-sottotitolo">{sottotitolo}</p>
          <AzioniContatto id="azioni-eroe" conNota />
          <p className="pagina-prezzo">{prezzo}</p>
          {demo && (
            <a
              className="link-freccia link-freccia--esterno"
              href={demo.indirizzo}
              target="_blank"
              rel="noopener"
              onClick={() => segnaEvento('click_demo', { event_category: 'Lead' })}
            >
              {demo.testo}<Icona nome="esterno" />
            </a>
          )}
        </div>
      </section>

      <section className="sezione sezione--filo" aria-labelledby="titolo-punti">
        <div className="larghezza">
          <h2 className="titolo-sezione" id="titolo-punti">{titoloPunti}</h2>
          <ul className="pagina-punti">
            {punti.map((punto) => (
              <li className="pagina-punto" key={punto.titolo}>
                <h3>{punto.titolo}</h3>
                <p>{punto.testo}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sezione sezione--filo" aria-labelledby="titolo-argomento">
        <div className="larghezza pagina-argomento">
          <h2 className="titolo-sezione titolo-sezione--medio" id="titolo-argomento">{argomento.titolo}</h2>
          <p className="testo-grande">{argomento.testo}</p>
        </div>
      </section>

      <section className="sezione sezione--filo" aria-labelledby="titolo-metodo">
        <div className="larghezza">
          <h2 className="titolo-sezione" id="titolo-metodo">Come lavoro</h2>
          <ol className="metodo pagina-metodo">
            {passiMetodo.map((passo, indice) => (
              <li className="passo" key={passo.evidenza}>
                <span className="passo-numero" aria-hidden="true">{indice + 1}</span>
                <p><strong>{passo.evidenza}</strong> {passo.seguito}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sezione sezione--filo pagina-chiusura" aria-labelledby="titolo-chiusura">
        <div className="larghezza">
          <h2 className="titolo-sezione titolo-sezione--medio" id="titolo-chiusura">{chiusura.titolo}</h2>
          <p className="testo-grande">{chiusura.testo}</p>
          <AzioniContatto grandi conNota />
          <Link className="link-freccia" to="/simulatore">Calcola una stima del prezzo<Icona nome="freccia" /></Link>
        </div>
      </section>
    </PaginaVetrina>
  );
};

export default PaginaServizio;
