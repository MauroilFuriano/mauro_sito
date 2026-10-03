import React from 'react';

export type NomeIcona =
  | 'play'
  | 'telefono'
  | 'messaggio'
  | 'freccia'
  | 'esterno'
  | 'giu'
  | 'lucchetto'
  | 'stella'
  | 'avviso'
  | 'spunta';

interface IconaProps {
  nome: NomeIcona;
  piena?: boolean;
  className?: string;
}

export const Icona: React.FC<IconaProps> = ({ nome, piena = false, className }) => (
  <svg className={['icona', piena ? 'icona--piena' : '', className ?? ''].filter(Boolean).join(' ')} aria-hidden="true">
    <use href={`#icona-${nome}`} />
  </svg>
);

const quanteStelle = [1, 2, 3, 4, 5];

export const Stelle: React.FC = () => (
  <span className="stelle" aria-hidden="true">
    {quanteStelle.map((stella) => <Icona key={stella} nome="stella" piena />)}
  </span>
);

const Icone: React.FC = () => (
  <svg className="sprite" aria-hidden="true" focusable="false">
    <symbol id="icona-play" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" /></symbol>
    <symbol id="icona-telefono" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></symbol>
    <symbol id="icona-messaggio" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /></symbol>
    <symbol id="icona-freccia" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
    <symbol id="icona-esterno" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></symbol>
    <symbol id="icona-giu" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></symbol>
    <symbol id="icona-lucchetto" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></symbol>
    <symbol id="icona-stella" viewBox="0 0 24 24"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" /></symbol>
    <symbol id="icona-avviso" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></symbol>
    <symbol id="icona-spunta" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></symbol>
  </svg>
);

export default Icone;
