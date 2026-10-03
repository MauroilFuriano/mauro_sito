import React, { useEffect, useRef, useState } from 'react';
import { recapiti } from '../../data/home';
import { Icona } from './Icone';

const vociMenu = [
  { ancora: '#servizi', nome: 'Servizi' },
  { ancora: '#lavori', nome: 'Lavori' },
  { ancora: '#prezzi', nome: 'Prezzi' },
  { ancora: '#chi-sono', nome: 'Chi sono' },
  { ancora: '#contatti', nome: 'Contatti' },
];

const Testata: React.FC = () => {
  const inizioPaginaRef = useRef<HTMLDivElement>(null);
  const [staccata, setStaccata] = useState(false);

  useEffect(() => {
    const inizioPagina = inizioPaginaRef.current;
    if (!inizioPagina || !('IntersectionObserver' in window)) return undefined;
    const osservatoreInizio = new IntersectionObserver(([osservazione]) => setStaccata(!osservazione.isIntersecting));
    osservatoreInizio.observe(inizioPagina);
    return () => osservatoreInizio.disconnect();
  }, []);

  return (
    <>
      <div ref={inizioPaginaRef} aria-hidden="true" />
      <header className={staccata ? 'testata testata--staccata' : 'testata'}>
        <div className="testata-riga">
          <p className="marchio"><span className="marchio-nome">Mauro Ceccarelli</span><span className="marchio-ruolo">Sviluppatore web · Ascoli Piceno</span></p>
          <nav className="menu" aria-label="Menu principale">
            <ul className="menu-voci">
              {vociMenu.map((voceMenu) => (
                <li key={voceMenu.ancora}><a href={voceMenu.ancora}>{voceMenu.nome}</a></li>
              ))}
            </ul>
          </nav>
          <a className="pulsante pulsante--chiama pulsante--testata" href={recapiti.telefono}><Icona nome="telefono" />Chiamami</a>
        </div>
      </header>
    </>
  );
};

export default Testata;
