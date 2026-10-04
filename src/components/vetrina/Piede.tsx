import React from 'react';
import { Link } from 'react-router-dom';
import { recapiti, sintesiAttivita } from '../../data/home';
import { apriPreferenzeCookie } from '../../misurazione';
import { Icona, type NomeIcona } from './Icone';

const pagineDelSito = [
  { percorso: '/hotel', nome: 'Hotel' },
  { percorso: '/agri-ecommerce', nome: 'Aziende agricole' },
  { percorso: '/saas', nome: 'Gestionali per negozi' },
  { percorso: '/simulatore', nome: 'Calcola il preventivo' },
  { percorso: '/privacy-policy', nome: 'Privacy policy' },
  { percorso: '/cookie-policy', nome: 'Cookie policy' },
];

const iconeDelPiede: readonly { nome: string; icona: NomeIcona; indirizzo: string; nuovaScheda?: boolean }[] = [
  { nome: `Chiama il ${recapiti.telefonoLeggibile}`, icona: 'telefono', indirizzo: recapiti.telefono },
  { nome: `Scrivi a ${recapiti.email}`, icona: 'email', indirizzo: `mailto:${recapiti.email}` },
  { nome: 'LinkedIn', icona: 'linkedin', indirizzo: recapiti.linkedin, nuovaScheda: true },
  { nome: 'GitHub', icona: 'github', indirizzo: recapiti.github, nuovaScheda: true },
  { nome: 'Instagram', icona: 'instagram', indirizzo: recapiti.instagram, nuovaScheda: true },
  { nome: 'Facebook', icona: 'facebook', indirizzo: recapiti.facebook, nuovaScheda: true },
];

const Piede: React.FC = () => (
  <footer className="piede">
    <div className="piede-griglia">
      <p className="piede-sintesi">{sintesiAttivita}</p>
      <p className="piede-firma">MAURO.EXE di Mauro Ceccarelli · Sviluppatore web freelance · Ascoli Piceno, Marche · P.IVA 02606790448</p>
      <ul className="piede-social" aria-label="Contatti e profili social">
        {iconeDelPiede.map((voce) => (
          <li key={voce.icona}>
            <a
              href={voce.indirizzo}
              target={voce.nuovaScheda ? '_blank' : undefined}
              rel={voce.nuovaScheda ? 'noopener' : undefined}
              aria-label={voce.nome}
              title={voce.nome}
            >
              <Icona nome={voce.icona} />
            </a>
          </li>
        ))}
      </ul>
      <nav aria-label="Pagine del sito">
        <ul className="piede-link">
          {pagineDelSito.map((pagina) => (
            <li key={pagina.percorso}><Link to={pagina.percorso}>{pagina.nome}</Link></li>
          ))}
          <li><button className="piede-preferenze" type="button" onClick={apriPreferenzeCookie}>Preferenze cookie</button></li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Piede;
