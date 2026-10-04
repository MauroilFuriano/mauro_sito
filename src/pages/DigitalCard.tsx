import React from 'react';
import { Link } from 'react-router-dom';
import AzioniContatto from '../components/vetrina/AzioniContatto';
import Icone, { Icona } from '../components/vetrina/Icone';
import { segnaClicContatto } from '../components/vetrina/clicContatto';
import { recapiti } from '../data/home';
import { apriPreferenzeCookie } from '../misurazione';
import '../styles/vetrina.css';
import '../styles/biglietto.css';

const contatto = {
  nome: 'Mauro Ceccarelli',
  ruolo: 'Sviluppatore Web & AI',
  telefono: '+39 348 00 29 661',
  sito: 'www.mauroceccarelli.it',
  luogo: 'Ascoli Piceno, Italia',
};

const motiviPerCollaborare = [
  { titolo: 'Automazione Processi', descrizione: 'Efficienza massima per il tuo business.' },
  { titolo: 'Sviluppo Web Next.js', descrizione: 'Performance e SEO ai massimi livelli.' },
  { titolo: 'Integrazione AI', descrizione: 'AI personalizzata per flussi di lavoro intelligenti.' },
];

const salvaInRubrica = () => {
  const schedaContatto = `BEGIN:VCARD
VERSION:3.0
FN:${contatto.nome}
ORG:Mauro.exe
TITLE:${contatto.ruolo}
TEL;TYPE=CELL:${contatto.telefono}
EMAIL:${recapiti.email}
URL:${contatto.sito}
ADR;TYPE=WORK:;;${contatto.luogo}
END:VCARD`;
  const indirizzoFile = URL.createObjectURL(new Blob([schedaContatto], { type: 'text/vcard' }));
  const scaricamento = document.createElement('a');
  scaricamento.href = indirizzoFile;
  scaricamento.download = `${contatto.nome.replace(' ', '_')}.vcf`;
  document.body.appendChild(scaricamento);
  scaricamento.click();
  scaricamento.remove();
  URL.revokeObjectURL(indirizzoFile);
};

const DigitalCard: React.FC = () => (
  <div className="home-vetrina biglietto-pagina" onClick={segnaClicContatto}>
    <main className="biglietto" id="biglietto">
      <img className="biglietto-foto" src="/mauro.webp" width={900} height={1207} alt={contatto.nome} />
      <h1>{contatto.nome}</h1>
      <p className="biglietto-ruolo">{contatto.ruolo}</p>
      <p className="biglietto-luogo">{contatto.luogo}</p>

      <AzioniContatto conNota />
      <button type="button" className="pulsante pulsante--scrivi biglietto-salva" onClick={salvaInRubrica}>
        <Icona nome="rubrica" />Salva in rubrica
      </button>

      <ul className="biglietto-collegamenti">
        <li><a href={`mailto:${recapiti.email}`}><Icona nome="email" />Email</a></li>
        <li><a href="/"><Icona nome="sito" />Sito web</a></li>
        <li><a href={recapiti.linkedin} target="_blank" rel="noopener noreferrer"><Icona nome="linkedin" />LinkedIn</a></li>
      </ul>

      <section className="biglietto-motivi" aria-labelledby="titolo-motivi">
        <h2 id="titolo-motivi">Perché collaborare con me?</h2>
        <ul>
          {motiviPerCollaborare.map((motivo) => (
            <li key={motivo.titolo}><strong>{motivo.titolo}</strong> {motivo.descrizione}</li>
          ))}
        </ul>
      </section>
    </main>

    <footer className="biglietto-piede">
      <p>Mauro.exe — Powered by AI & High Performance</p>
      <nav aria-label="Informazioni legali">
        <ul className="piede-link">
          <li><Link to="/privacy-policy">Privacy policy</Link></li>
          <li><Link to="/cookie-policy">Cookie policy</Link></li>
          <li><button className="piede-preferenze" type="button" onClick={apriPreferenzeCookie}>Preferenze cookie</button></li>
        </ul>
      </nav>
    </footer>
    <Icone />
  </div>
);

export default DigitalCard;
