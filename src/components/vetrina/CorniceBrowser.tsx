import React from 'react';
import { Icona } from './Icone';
import Schermo, { type SchermoProps } from './Schermo';

interface CorniceBrowserProps extends SchermoProps {
  indirizzo: string;
  comeFigura?: boolean;
}

const CorniceBrowser: React.FC<CorniceBrowserProps> = ({ indirizzo, comeFigura = false, ...schermo }) => {
  const Cornice = comeFigura ? 'figure' : 'div';
  return (
    <Cornice className="browser">
      <div className="browser-barra" aria-hidden="true">
        <span className="browser-puntini"><span></span><span></span><span></span></span>
        <span className="browser-indirizzo"><Icona nome="lucchetto" />{indirizzo}</span>
      </div>
      <Schermo {...schermo} />
    </Cornice>
  );
};

export default CorniceBrowser;
