import React from 'react';
import { recapiti } from '../../data/home';
import { Icona } from './Icone';

interface AzioniContattoProps {
  id?: string;
  grandi?: boolean;
  conNota?: boolean;
}

const AzioniContatto: React.FC<AzioniContattoProps> = ({ id, grandi = false, conNota = false }) => {
  const misura = grandi ? ' pulsante--grande' : '';
  return (
    <>
      <div className="azioni" id={id}>
        <a className={`pulsante pulsante--chiama${misura}`} href={recapiti.telefono}>
          <Icona nome="telefono" />Chiamami: {recapiti.telefonoLeggibile}
        </a>
        <a className={`pulsante pulsante--scrivi${misura}`} href={recapiti.whatsapp} target="_blank" rel="noopener">
          <Icona nome="messaggio" />Scrivimi su WhatsApp
        </a>
      </div>
      {conNota && <p className="nota-richiamo">Se non rispondo subito, ti richiamo entro 24 ore.</p>}
    </>
  );
};

export default AzioniContatto;
