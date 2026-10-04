import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Assistente from '../components/vetrina/Assistente';
import BarraContatti from '../components/vetrina/BarraContatti';
import ChiSono from '../components/vetrina/ChiSono';
import Contatti from '../components/vetrina/Contatti';
import DialogoVideo, { apriDialogoVideo } from '../components/vetrina/DialogoVideo';
import Domande from '../components/vetrina/Domande';
import Icone from '../components/vetrina/Icone';
import Lavori from '../components/vetrina/Lavori';
import Piede from '../components/vetrina/Piede';
import Prezzi from '../components/vetrina/Prezzi';
import PrimaSchermata from '../components/vetrina/PrimaSchermata';
import Recensioni from '../components/vetrina/Recensioni';
import Servizi from '../components/vetrina/Servizi';
import Settori from '../components/vetrina/Settori';
import Testata from '../components/vetrina/Testata';
import { ScrollTrigger } from '../components/vetrina/animazioni';
import { domandeFrequenti } from '../data/home';
import { segnaEvento } from '../misurazione';
import '../styles/vetrina.css';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.mauroceccarelli.it/#person",
      "name": "Mauro Ceccarelli",
      "jobTitle": "Full Stack Developer & AI Integration Specialist",
      "url": "https://www.mauroceccarelli.it",
      "image": "https://www.mauroceccarelli.it/mauro.webp",
      "email": "mauroexe@mauroceccarelli.it",
      "telephone": "+393480029661",
      "sameAs": [
        "https://www.linkedin.com/in/mauro-ceccarelli-282255296",
        "https://github.com/MauroilFuriano",
        "https://www.instagram.com/mauroceccarelli.exe",
        "https://www.facebook.com/profile.php?id=61585910800513"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ascoli Piceno",
        "addressRegion": "Marche",
        "addressCountry": "IT"
      },
      "knowsAbout": [
        "React", "TypeScript", "Tailwind CSS", "Node.js",
        "OpenAI API", "Google Gemini", "Supabase",
        "Web Development", "Chatbot AI", "LLM Integration",
        "SaaS Development", "E-commerce Headless"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.mauroceccarelli.it/#service",
      "name": "MAURO.EXE di Mauro Ceccarelli",
      "image": "https://www.mauroceccarelli.it/og-image.jpg",
      "url": "https://www.mauroceccarelli.it",
      "telephone": "+393480029661",
      "email": "mauroexe@mauroceccarelli.it",
      "vatID": "IT02606790448",
      "taxID": "02606790448",
      "founder": { "@id": "https://www.mauroceccarelli.it/#person" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ascoli Piceno",
        "addressRegion": "Marche",
        "addressCountry": "IT"
      },
      "areaServed": [
        { "@type": "State", "name": "Marche" },
        { "@type": "Country", "name": "Italia" }
      ],
      "priceRange": "€€",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servizi Digitali",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sviluppo Siti Web", "description": "Siti web professionali custom con React, ad alta performance e ottimizzati per le conversioni." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chatbot AI & Integrazione LLM", "description": "Assistenti virtuali intelligenti basati su GPT-4o, Gemini o Claude per automazione business 24/7." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web App & SaaS su Misura", "description": "Dashboard, gestionali, piattaforme SaaS e automazioni di processo personalizzate." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Headless", "description": "Negozi online custom con React/Next.js, integrazione Stripe e gateway di pagamento." } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mauroceccarelli.it/#website",
      "url": "https://www.mauroceccarelli.it",
      "name": "Mauro.exe — Sviluppatore Web Ascoli Piceno",
      "description": "Portfolio e servizi di Mauro Ceccarelli, sviluppatore web specializzato in siti web, chatbot AI e automazione business.",
      "publisher": { "@id": "https://www.mauroceccarelli.it/#person" },
      "inLanguage": "it-IT"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.mauroceccarelli.it/#localbusiness",
      "name": "MAURO.EXE di Mauro Ceccarelli",
      "image": "https://www.mauroceccarelli.it/og-image.jpg",
      "description": "Sviluppatore web freelance specializzato in siti web custom, chatbot AI e automazione business per PMI italiane.",
      "url": "https://www.mauroceccarelli.it",
      "telephone": "+393480029661",
      "email": "mauroexe@mauroceccarelli.it",
      "vatID": "IT02606790448",
      "taxID": "02606790448",
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ascoli Piceno",
        "addressRegion": "Marche",
        "addressCountry": "IT",
        "postalCode": "63100"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.8535,
        "longitude": 13.5745
      },
      "areaServed": ["Ascoli Piceno", "Marche", "Italia"],
      "serviceType": ["Sviluppo Siti Web", "Chatbot AI", "Automazione Business"],
      "openingHours": ["Mo-Fr 09:00-18:00"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "4",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Organization",
            "name": "Redicar srl"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Mauro ci ha rifatto completamente il sito di Redicar e devo dire che il risultato mi ha sorpreso davvero. il sito è veloce, moderno e si usa bene anche dal telefono. La cosa che mi ha colpito di più è un modulo che ha integrato direttamente nel sito: i clienti possono inserire i dati della loro auto usata e ricevere subito una stima del valore. Un piccolo algoritmo proprietario, fatto su misura per noi, che già i primi giorni ha iniziato a portarci richieste nuove. Mauro è stato disponibile in ogni fase, ha spiegato tutto con calma senza fare il tecnico, e ha rispettato i tempi. Se avete un'attività e volete un sito fatto bene, lo consiglio senza esitazione. Realino Daniele Di Leo — REDICAR S.R.L., Colonnella (TE)",
          "datePublished": "2026-09-23"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Organization",
            "name": "Tipolitografia Graphic Arts"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Ottimo risultato, lavoro chiaro e corretto! Programma x t shirt top",
          "datePublished": "2026-07-09"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Fabio Campanelli"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Cercavo qualcuno che mi costruisse un sito web professionale per la mia attività di tavoli in legno e resina epossidica ad Ascoli Piceno. Grazie a Mauro il sito è veloce, con animazioni professionali, un chatbot integrato e soprattutto è ottimizzato per la SEO e la GEO. Lo consiglio a chiunque abbia un'attività e voglia farsi trovare online da clienti veri.",
          "datePublished": "2026-04-09"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Maicol Ceccarelli"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Ragazzo serio e professionale, oltre ogni mia aspettativa. Il sito che ha fatto a me è stupendo! Veramente bravo Mauro.",
          "datePublished": "2026-04-09"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/in/mauro-ceccarelli-282255296",
        "https://github.com/MauroilFuriano",
        "https://www.instagram.com/mauroceccarelli.exe"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.mauroceccarelli.it/#faq",
      "mainEntity": domandeFrequenti.map(({ domanda, risposta }) => ({
        "@type": "Question",
        "name": domanda,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": risposta
        }
      }))
    }
  ]
};

const ancoreVecchie = new Map([
  ['home', 'contenuto'],
  ['about', 'chi-sono'],
  ['services', 'servizi'],
  ['portfolio', 'lavori'],
  ['faq', 'faq'],
  ['contact', 'contatti'],
]);

const ATTESA_MASSIMA_CARATTERI = 1500;
const PAUSA_RICALCOLO = 150;
const PAUSA_LETTURA = 120;
const ATTESA_FINE_RIDIMENSIONAMENTO = 400;

type PuntoDiLettura = { sezione: Element; scarto: number } | { sezione: Element; avanzamento: number };

const zonaDelCollegamento = (collegamento: Element) => {
  const zona = collegamento.closest('[id], header, footer');
  return zona ? zona.id || zona.tagName.toLowerCase() : 'pagina';
};

// Con il palco agganciato la sezione dei lavori vive dentro il pin-spacer di GSAP, alto quanto tutta la corsa orizzontale
const ingombroSezione = (sezione: Element) => {
  const contenitore = sezione.parentElement;
  return (contenitore?.classList.contains('pin-spacer') ? contenitore : sezione).getBoundingClientRect();
};

const HomePage: React.FC = () => {
  const radiceRef = useRef<HTMLDivElement>(null);
  const contenutoRef = useRef<HTMLElement>(null);
  const dialogoVideoRef = useRef<HTMLDialogElement>(null);
  const { hash, key } = useLocation();
  const [movimentoRidotto] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const portaAllaSezione = useCallback((destinazione: HTMLElement, comportamento: ScrollBehavior) => {
    const testata = radiceRef.current?.querySelector<HTMLElement>('.testata');
    const scarto = testata && window.matchMedia('(min-width: 900px)').matches ? testata.offsetHeight : 0;
    window.scrollTo({ top: destinazione.getBoundingClientRect().top + window.scrollY - scarto, behavior: comportamento });
    destinazione.setAttribute('tabindex', '-1');
    destinazione.focus({ preventScroll: true });
  }, []);

  const apriVideo = useCallback(() => apriDialogoVideo(dialogoVideoRef.current), []);

  const seguiCollegamento = (evento: React.MouseEvent<HTMLDivElement>) => {
    const collegamento = (evento.target as Element).closest('a[href]');
    if (!collegamento) return;
    const indirizzo = collegamento.getAttribute('href') ?? '';
    if (indirizzo.startsWith('tel:')) segnaEvento('click_chiamata', { posizione: zonaDelCollegamento(collegamento) });
    else if (indirizzo.includes('wa.me')) segnaEvento('click_whatsapp', { posizione: zonaDelCollegamento(collegamento) });
    if (!indirizzo.startsWith('#') || evento.defaultPrevented) return;
    const destinazione = document.getElementById(indirizzo.slice(1));
    if (!destinazione) return;
    evento.preventDefault();
    portaAllaSezione(destinazione, movimentoRidotto ? 'auto' : 'smooth');
  };

  useEffect(() => {
    const contenuto = contenutoRef.current;
    if (!contenuto) return undefined;
    let primaMisura = true;
    let attesaRicalcolo = 0;
    // Pannelli che si aprono, banner dei cookie e caratteri che arrivano cambiano l'altezza: i punti di GSAP vanno ricalcolati
    const osservatoreAltezza = new ResizeObserver(() => {
      if (primaMisura) {
        primaMisura = false;
        return;
      }
      window.clearTimeout(attesaRicalcolo);
      attesaRicalcolo = window.setTimeout(() => ScrollTrigger.refresh(), PAUSA_RICALCOLO);
    });
    osservatoreAltezza.observe(contenuto);
    return () => {
      osservatoreAltezza.disconnect();
      window.clearTimeout(attesaRicalcolo);
    };
  }, []);

  useEffect(() => {
    const contenuto = contenutoRef.current;
    if (!contenuto) return undefined;
    let larghezzaPrecedente = window.innerWidth;
    let puntoDiLettura: PuntoDiLettura | null = null;
    let ripristinoInCorso = false;
    let attesaMisura = 0;
    let attesaFine = 0;
    const misuraPuntoDiLettura = () => {
      const sezione = [...contenuto.querySelectorAll('section')].find((candidata) => ingombroSezione(candidata).bottom > 0);
      if (!sezione) {
        puntoDiLettura = null;
        return;
      }
      const ingombro = ingombroSezione(sezione);
      puntoDiLettura = ingombro.top > 0 ? { sezione, scarto: ingombro.top } : { sezione, avanzamento: -ingombro.top / ingombro.height };
    };
    const seguiLettura = () => {
      if (ripristinoInCorso) return;
      window.clearTimeout(attesaMisura);
      attesaMisura = window.setTimeout(misuraPuntoDiLettura, PAUSA_LETTURA);
    };
    const prolungaRipristino = () => {
      window.clearTimeout(attesaFine);
      attesaFine = window.setTimeout(() => {
        ripristinoInCorso = false;
        misuraPuntoDiLettura();
      }, ATTESA_FINE_RIDIMENSIONAMENTO);
    };
    // Girando il tablet o allargando la finestra il palco dei lavori si aggancia o si sgancia e sposta di migliaia di pixel
    // quello che sta sotto; ScrollTrigger rimette solo i pixel di prima, quindi si torna al punto letto prima del cambio di larghezza
    const avviaRipristino = () => {
      if (window.innerWidth === larghezzaPrecedente) return;
      larghezzaPrecedente = window.innerWidth;
      if (!puntoDiLettura) return;
      ripristinoInCorso = true;
      window.clearTimeout(attesaMisura);
      prolungaRipristino();
    };
    const tornaAlPuntoDiLettura = () => {
      if (!ripristinoInCorso || !puntoDiLettura) return;
      const ingombro = ingombroSezione(puntoDiLettura.sezione);
      const inizioSezione = ingombro.top + window.scrollY;
      window.scrollTo(0, 'scarto' in puntoDiLettura ? inizioSezione - puntoDiLettura.scarto : inizioSezione + puntoDiLettura.avanzamento * ingombro.height);
      prolungaRipristino();
    };
    window.addEventListener('scroll', seguiLettura, { passive: true });
    window.addEventListener('resize', avviaRipristino);
    ScrollTrigger.addEventListener('refresh', tornaAlPuntoDiLettura);
    return () => {
      window.removeEventListener('scroll', seguiLettura);
      window.removeEventListener('resize', avviaRipristino);
      ScrollTrigger.removeEventListener('refresh', tornaAlPuntoDiLettura);
      window.clearTimeout(attesaMisura);
      window.clearTimeout(attesaFine);
    };
  }, []);

  useEffect(() => {
    if (!hash) return undefined;
    const ancora = hash.slice(1);
    const idSezione = ancoreVecchie.get(ancora) ?? ancora;
    let attiva = true;
    let attesaMassima = 0;
    const caratteriPronti = document.fonts ? document.fonts.ready : Promise.resolve();
    const tempoScaduto = new Promise<void>((risolvi) => { attesaMassima = window.setTimeout(risolvi, ATTESA_MASSIMA_CARATTERI); });
    Promise.race([caratteriPronti, tempoScaduto]).then(() => {
      window.requestAnimationFrame(() => {
        const destinazione = document.getElementById(idSezione);
        if (!attiva || !destinazione) return;
        ScrollTrigger.refresh();
        // Nel vecchio menu "Home" era l'inizio pagina: su telefono la testata non è fissa e #contenuto la lascerebbe fuori vista
        if (ancora === 'home') window.scrollTo(0, 0);
        else portaAllaSezione(destinazione, 'auto');
      });
    });
    return () => {
      attiva = false;
      window.clearTimeout(attesaMassima);
    };
  }, [hash, key, portaAllaSezione]);

  return (
    <div className="home-vetrina" ref={radiceRef} onClick={seguiCollegamento}>
      <SEO
        title="Web Design & Sviluppatore Web Ascoli Piceno | Mauro.exe"
        description="Web design e sviluppo siti custom ad Ascoli Piceno. Chatbot AI, React, Lighthouse 98/100. PMI delle Marche. Analisi gratuita in 24h — scrivimi."
        canonical="https://www.mauroceccarelli.it/"
        keywords="Web Design Ascoli Piceno, Sviluppatore Web Ascoli Piceno, Siti Web Marche, Realizzazione Siti Web Ascoli, Chatbot AI Marche, Sviluppo Web San Benedetto, Web Agency Ascoli, Mauro Ceccarelli"
        structuredData={structuredData}
      />
      <Helmet>
        <link rel="preload" as="image" href="/lavori/redicar-desktop.jpg" fetchPriority="high" />
      </Helmet>
      <a className="salta" href="#contenuto">Vai al contenuto</a>
      <Testata />

      <main id="contenuto" ref={contenutoRef}>
        <PrimaSchermata />
        <Settori />
        <Servizi />
        <Lavori onApriVideo={apriVideo} />
        <Recensioni />
        <Prezzi />
        <ChiSono />
        <Domande />
        <Contatti />
      </main>

      <Piede />
      <BarraContatti />
      <Assistente />
      <DialogoVideo dialogoRef={dialogoVideoRef} />
      <Icone />
    </div>
  );
};

export default HomePage;
