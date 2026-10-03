import React from 'react';

interface SenzaACapoProps {
  testo: string;
  parole?: string;
}

const SenzaACapo: React.FC<SenzaACapoProps> = ({ testo, parole }) => {
  const inizio = parole ? testo.indexOf(parole) : -1;
  if (!parole || inizio < 0) return <>{testo}</>;
  return (
    <>
      {testo.slice(0, inizio)}
      <span className="senza-a-capo">{parole}</span>
      {testo.slice(inizio + parole.length)}
    </>
  );
};

export default SenzaACapo;
