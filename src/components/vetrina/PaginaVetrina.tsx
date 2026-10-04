import React from 'react';
import Assistente from './Assistente';
import BarraContatti from './BarraContatti';
import Icone from './Icone';
import Piede from './Piede';
import Testata from './Testata';
import { segnaClicContatto } from './clicContatto';
import '../../styles/vetrina.css';

interface PaginaVetrinaProps {
  children: React.ReactNode;
  conBarraContatti?: boolean;
  conAssistente?: boolean;
}

const PaginaVetrina: React.FC<PaginaVetrinaProps> = ({ children, conBarraContatti = true, conAssistente = true }) => (
  <div className="home-vetrina" onClick={segnaClicContatto}>
    <a className="salta" href="#contenuto">Vai al contenuto</a>
    <Testata />
    <main id="contenuto">{children}</main>
    <Piede />
    {conBarraContatti && <BarraContatti />}
    {conAssistente && <Assistente />}
    <Icone />
  </div>
);

export default PaginaVetrina;
