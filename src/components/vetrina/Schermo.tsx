import React from 'react';
import type { ImmagineSito } from '../../data/home';

export interface SchermoProps {
  immagine: ImmagineSito;
  pellicola?: 'chat' | 'ferma';
  caricamentoPigro?: boolean;
  prioritaAlta?: boolean;
}

const Schermo: React.FC<SchermoProps> = ({ immagine, pellicola, caricamentoPigro = true, prioritaAlta = false }) => (
  <div className="schermo">
    <div className={pellicola ? `schermo-pellicola schermo-pellicola--${pellicola}` : 'schermo-pellicola'}>
      <img
        className="schermo-img"
        src={immagine.src}
        width={immagine.larghezza}
        height={immagine.altezza}
        loading={caricamentoPigro ? 'lazy' : undefined}
        decoding="async"
        fetchPriority={prioritaAlta ? 'high' : undefined}
        alt={immagine.alt}
      />
    </div>
  </div>
);

export default Schermo;
