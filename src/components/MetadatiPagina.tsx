import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsonLdDellaPagina, testoRobots, trovaPagina, urlDellaPagina } from '../data/seo';

const impostaMeta = (attributo: 'name' | 'property', chiave: string, valore: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attributo}="${chiave}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributo, chiave);
    document.head.appendChild(meta);
  }
  meta.content = valore;
};

// L'HTML di ogni pagina arriva già con questi tag dal build: qui si aggiornano gli stessi elementi durante la navigazione interna, senza crearne dei doppioni
const MetadatiPagina: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pagina = trovaPagina(pathname);
    const indirizzo = urlDellaPagina(pagina);
    document.title = pagina.titolo;
    impostaMeta('name', 'description', pagina.descrizione);
    impostaMeta('name', 'robots', testoRobots(pagina));
    impostaMeta('property', 'og:url', indirizzo);
    impostaMeta('property', 'og:title', pagina.titolo);
    impostaMeta('property', 'og:description', pagina.descrizione);

    let canonico = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (pagina.indicizzabile) {
      if (!canonico) {
        canonico = document.createElement('link');
        canonico.rel = 'canonical';
        document.head.appendChild(canonico);
      }
      canonico.href = indirizzo;
    } else {
      canonico?.remove();
    }

    const jsonLd = jsonLdDellaPagina(pagina);
    let datiStrutturati = document.getElementById('dati-strutturati');
    if (jsonLd) {
      if (!datiStrutturati) {
        datiStrutturati = document.createElement('script');
        datiStrutturati.id = 'dati-strutturati';
        datiStrutturati.setAttribute('type', 'application/ld+json');
        document.head.appendChild(datiStrutturati);
      }
      datiStrutturati.textContent = jsonLd;
    } else {
      datiStrutturati?.remove();
    }
  }, [pathname]);

  return null;
};

export default MetadatiPagina;
