import React, { useEffect, useState } from 'react';
import { recapiti } from '../../data/home';
import { EVENTO_CONSENSO, leggiValoreCookie } from '../../misurazione';
import { Icona } from './Icone';

const BarraContatti: React.FC = () => {
  const [consensoDato, setConsensoDato] = useState(() => leggiValoreCookie('cookie_consent') !== null);
  const [eroeSuperato, setEroeSuperato] = useState(false);

  useEffect(() => {
    const segnaConsenso = () => setConsensoDato(true);
    window.addEventListener(EVENTO_CONSENSO, segnaConsenso);
    return () => window.removeEventListener(EVENTO_CONSENSO, segnaConsenso);
  }, []);

  useEffect(() => {
    const azioniEroe = document.getElementById('azioni-eroe');
    if (!azioniEroe || !('IntersectionObserver' in window)) return undefined;
    const osservatoreAzioni = new IntersectionObserver(([osservazione]) => {
      setEroeSuperato(!osservazione.isIntersecting && osservazione.boundingClientRect.top < 0);
    });
    osservatoreAzioni.observe(azioniEroe);
    return () => osservatoreAzioni.disconnect();
  }, []);

  return (
    <div className="barra-contatti" id="barra-contatti" hidden={!(consensoDato && eroeSuperato)}>
      <a className="pulsante pulsante--chiama" href={recapiti.telefono}><Icona nome="telefono" />Chiama</a>
      <a className="pulsante pulsante--scrivi" href={recapiti.whatsapp} target="_blank" rel="noopener"><Icona nome="messaggio" />WhatsApp</a>
    </div>
  );
};

export default BarraContatti;
