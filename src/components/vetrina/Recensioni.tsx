import React from 'react';
import { recapiti, recensioni } from '../../data/home';
import AzioniContatto from './AzioniContatto';
import { Icona, Stelle } from './Icone';
import SenzaACapo from './SenzaACapo';

const Recensioni: React.FC = () => (
  <section className="sezione sezione--filo recensioni" id="recensioni" aria-labelledby="titolo-recensioni">
    <div className="recensioni-griglia">
      <div className="recensioni-testa">
        <h2 className="titolo-sezione" id="titolo-recensioni">Cosa dicono i clienti</h2>
        <div className="voto">
          <p className="voto-numero">5,0</p>
          <div className="voto-dettagli">
            <Stelle />
            <p className="voto-fonte">su Google</p>
            <a className="link-freccia link-freccia--esterno" href={recapiti.schedaGoogle} target="_blank" rel="noopener">
              Leggi tutte le recensioni su Google<Icona nome="esterno" />
            </a>
            <a className="link-freccia link-freccia--esterno" href={recapiti.nuovaRecensioneGoogle} target="_blank" rel="noopener">
              Lascia una recensione<Icona nome="esterno" />
            </a>
          </div>
        </div>
      </div>
      {recensioni.map((recensione) => (
        <figure
          key={recensione.variante}
          className={`recensione${recensione.lunga ? ' recensione--lunga' : ''} recensione--${recensione.variante}`}
        >
          <blockquote><p>“<SenzaACapo testo={recensione.testo} parole={recensione.senzaACapo} />”</p></blockquote>
          <figcaption><strong>{recensione.autore}</strong><span>{recensione.data}</span></figcaption>
        </figure>
      ))}
      <div className="recensioni-chiusura">
        <AzioniContatto conNota />
      </div>
    </div>
  </section>
);

export default Recensioni;
