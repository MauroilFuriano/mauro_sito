import React from 'react';
import { Link } from 'react-router-dom';
import { recapiti } from '../../data/home';
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

const profiliSocial: readonly { nome: string; icona: NomeIcona; indirizzo: string }[] = [
  { nome: 'LinkedIn', icona: 'linkedin', indirizzo: recapiti.linkedin },
  { nome: 'GitHub', icona: 'github', indirizzo: recapiti.github },
  { nome: 'Instagram', icona: 'instagram', indirizzo: recapiti.instagram },
  { nome: 'Facebook', icona: 'facebook', indirizzo: recapiti.facebook },
];

const Piede: React.FC = () => (
  <footer className="piede">
    <div className="piede-griglia">
      <p className="piede-sintesi">
        Mauro Ceccarelli è uno sviluppatore web freelance con sede ad Ascoli Piceno, specializzato in siti custom React e chatbot AI per PMI italiane.
        I suoi siti raggiungono un punteggio Lighthouse di 98/100 e vengono consegnati in 7–14 giorni.
        Offre tre servizi principali: siti web professionali (da €1.500), chatbot con intelligenza artificiale GPT-4o/Gemini (da €4.200) e automazione business (da €8.000).
        Opera nelle Marche e in tutta Italia con un approccio code-first senza WordPress né Shopify. Contatto: mauroexe@mauroceccarelli.it | +39 348 002 9661.
      </p>
      <p className="piede-firma">MAURO.EXE di Mauro Ceccarelli · Sviluppatore web freelance · Ascoli Piceno, Marche · P.IVA 02606790448</p>
      <p className="piede-contatti">
        <a href={recapiti.telefono}>{recapiti.telefonoLeggibile}</a>
        <a href={`mailto:${recapiti.email}`}>{recapiti.email}</a>
      </p>
      <ul className="piede-social" aria-label="Profili social">
        {profiliSocial.map((profilo) => (
          <li key={profilo.nome}>
            <a href={profilo.indirizzo} target="_blank" rel="noopener" aria-label={profilo.nome}><Icona nome={profilo.icona} /></a>
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
