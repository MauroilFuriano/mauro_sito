import React from 'react';

export type NomeIcona =
  | 'play'
  | 'telefono'
  | 'email'
  | 'messaggio'
  | 'freccia'
  | 'esterno'
  | 'giu'
  | 'lucchetto'
  | 'stella'
  | 'avviso'
  | 'spunta'
  | 'sole'
  | 'luna'
  | 'chat'
  | 'invia'
  | 'chiudi'
  | 'linkedin'
  | 'github'
  | 'instagram'
  | 'facebook';

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
    <symbol id="icona-email" viewBox="0 0 24 24"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></symbol>
    <symbol id="icona-messaggio" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /></symbol>
    <symbol id="icona-freccia" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
    <symbol id="icona-esterno" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></symbol>
    <symbol id="icona-giu" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></symbol>
    <symbol id="icona-lucchetto" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></symbol>
    <symbol id="icona-stella" viewBox="0 0 24 24"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" /></symbol>
    <symbol id="icona-avviso" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></symbol>
    <symbol id="icona-spunta" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></symbol>
    <symbol id="icona-sole" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></symbol>
    <symbol id="icona-luna" viewBox="0 0 24 24"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /></symbol>
    <symbol id="icona-chat" viewBox="0 0 24 24"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></symbol>
    <symbol id="icona-invia" viewBox="0 0 24 24"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></symbol>
    <symbol id="icona-chiudi" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></symbol>
    <symbol id="icona-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></symbol>
    <symbol id="icona-github" viewBox="0 0 24 24"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></symbol>
    <symbol id="icona-instagram" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></symbol>
    <symbol id="icona-facebook" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></symbol>
  </svg>
);

export default Icone;
