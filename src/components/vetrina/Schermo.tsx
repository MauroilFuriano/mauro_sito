import React from 'react';
import { srcsetDi, type ImmagineSito } from '../../data/home';

export interface SchermoProps {
  immagine: ImmagineSito;
  misure: string;
  pellicola?: 'chat' | 'ferma';
  caricamentoPigro?: boolean;
  prioritaAlta?: boolean;
}

const Schermo: React.FC<SchermoProps> = ({ immagine, misure, pellicola, caricamentoPigro = true, prioritaAlta = false }) => (
  <div className="schermo">
    <div className={pellicola ? `schermo-pellicola schermo-pellicola--${pellicola}` : 'schermo-pellicola'}>
      <img
        className="schermo-img"
        src={immagine.src}
        srcSet={srcsetDi(immagine)}
        sizes={misure}
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
