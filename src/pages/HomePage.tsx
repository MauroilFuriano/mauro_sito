import React, { useEffect } from 'react';
import Portfolio from '../components/Portfolio';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import SEO from '../components/SEO';

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
      "email": "ceccarellimauro3@gmail.com",
      "telephone": "+393480029661",
      "sameAs": [
        "https://www.linkedin.com/in/mauro-ceccarelli-282255296",
        "https://github.com/mauroceccarelli",
        "https://www.instagram.com/mauroceccarelli.exe",
        "https://www.facebook.com/mauro.exe"
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
      "name": "Mauro.exe — Sviluppo Web & AI",
      "url": "https://www.mauroceccarelli.it",
      "telephone": "+393480029661",
      "email": "ceccarellimauro3@gmail.com",
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
      "name": "MAURO.EXE — Mauro Ceccarelli",
      "description": "Sviluppatore web freelance specializzato in siti web custom, chatbot AI e automazione business per PMI italiane.",
      "url": "https://www.mauroceccarelli.it",
      "telephone": "+393480029661",
      "email": "ceccarellimauro3@gmail.com",
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
        "reviewCount": "3",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.linkedin.com/in/mauro-ceccarelli-282255296",
        "https://github.com/mauroceccarelli",
        "https://www.instagram.com/mauroceccarelli.exe"
      ]
    }
  ]
};



const WhatsappIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
);

const HomePage: React.FC = () => {
    // [FRONTEND SPECIALIST] Aggiunta logica per Intersection Observer (Scroll Reveal 2026)
    useEffect(() => {
        // [FRONTEND SPECIALIST] Inizializzazione IntersectionObserver per elementi '.reveal'
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15, // Attiva quando il 15% è visibile
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active'); // Attiva l'animazione definita in index.css
                    // Opzionale: smettere di osservare una volta rivelato
                    // observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
            <SEO
                title="Sviluppatore Web Ascoli Piceno | Siti Web & Chatbot AI | Mauro.exe"
                description="Sviluppatore Web ad Ascoli Piceno. Creo Siti Web professionali e Chatbot AI per aziende nelle Marche. Automazione business e soluzioni digitali su misura. Richiedi consulenza gratuita."
                canonical="https://www.mauroceccarelli.it/"
                keywords="Sviluppatore Web Ascoli Piceno, Siti Web Marche, Realizzazione Siti Web Ascoli, Web Designer Ascoli Piceno, Chatbot AI Marche, Sviluppo Web San Benedetto, Agenzia Web Ascoli, Mauro Ceccarelli"
                structuredData={structuredData}
            />
            <Navbar />

            <main>
                {/* [FRONTEND SPECIALIST] Hero è above the fold, quindi visibile di default. Aggiungo 'reveal' alle altre sezioni */}
                <Hero />
                <div className="reveal">
                    <About />
                </div>
                <div className="reveal overflow-hidden">
                    <Services />
                </div>
                <div className="reveal">
                    <Testimonials />
                </div>
                <div className="reveal">
                    <Portfolio />
                </div>
                <div className="reveal overflow-hidden">
                    <Contact />
                </div>
            </main>

            <Footer />

            {/* ChatBot - posizionato in basso a destra */}
            <ChatBot />


            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-400/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
};

export default HomePage;
