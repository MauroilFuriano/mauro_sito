import React from 'react';
import { recapiti } from '../../data/home';
import AzioniContatto from './AzioniContatto';
import { Icona } from './Icone';

const ChiSono: React.FC = () => (
  <section className="sezione sezione--filo chi-sono" id="chi-sono" aria-labelledby="titolo-chi-sono">
    <div className="chi-sono-griglia">
      <figure className="ritratto">
        <div className="ritratto-foto">
          <img
            src="/mauro-titti.jpg"
            width={960}
            height={1280}
            loading="lazy"
            decoding="async"
            alt="Mauro Ceccarelli sul divano di casa, con gli occhiali e una felpa nera, con Titti, il gatto nero, in braccio e un altro gatto che dorme dietro"
          />
        </div>
        <figcaption>Mauro Ceccarelli e Titti</figcaption>
      </figure>
      <div className="chi-sono-testo">
        <h2 className="titolo-sezione" id="titolo-chi-sono">Chi sono</h2>
        <h3>Chi è Mauro Ceccarelli?</h3>
        <p className="testo-grande">Sono Mauro, sviluppatore web freelance. Lavoro ad Ascoli Piceno e scrivo il codice dei miei siti da zero, uno per uno. Lavoro da solo, e per te è un vantaggio: parli sempre con chi fa il lavoro, e i tempi li decido io, non un'agenzia. Se nelle foto vedi un gatto nero, è Titti: passa le giornate sulla mia scrivania.</p>
        <a className="link-freccia link-freccia--esterno" href={recapiti.linkedin} target="_blank" rel="noopener">
          Il mio profilo su LinkedIn<Icona nome="esterno" />
        </a>
        <AzioniContatto />
      </div>
    </div>
  </section>
);

export default ChiSono;
