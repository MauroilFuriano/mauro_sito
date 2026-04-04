import React, { useEffect } from 'react';
import HeroAgri from '../components/agri-ecommerce/HeroAgri';
import FeaturesAgri from '../components/agri-ecommerce/FeaturesAgri';
import CtaAgri from '../components/agri-ecommerce/CtaAgri';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const AgriEcommerceLanding: React.FC = () => {
    useEffect(() => {
        // Logica di scroll reveal mutuata dalle altre landing pages
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
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
        <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-emerald-400 selection:text-black">
            <SEO
                title="AI E-Commerce Agroalimentare | Marche Italia"
                description="Sviluppo di siti web ed E-Commerce per aziende agricole con Chatbot AI. Vendi più velocemente h24 in automatico i tuoi prodotti d'eccellenza."
                canonical="https://www.mauroceccarelli.it/agri-ecommerce"
                keywords="Ecommerce Agricolo, Vendita Vino Online, AI Ecommerce, Chatbot Azienda Agricola, Vendita Miele, Vendita Formaggi AI"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'E-Commerce AI per Aziende Agricole',
                    description: "Sviluppo di siti web ed e-commerce con chatbot AI per aziende agricole e agri-food. Vendita automatizzata 24/7 di vino, miele, formaggi e prodotti d'eccellenza.",
                    provider: { '@id': 'https://www.mauroceccarelli.it/#service' },
                    serviceType: 'E-commerce con AI per Agri-Food',
                    areaServed: { '@type': 'Country', name: 'Italia' },
                    url: 'https://www.mauroceccarelli.it/agri-ecommerce',
                    offers: {
                        '@type': 'Offer',
                        description: 'Sito e-commerce + Chatbot AI per aziende agricole',
                        priceCurrency: 'EUR',
                        availability: 'https://schema.org/InStock',
                    },
                }}
            />
            {/* Header Isolato Minimal */}
            <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-start">
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                            <span className="text-emerald-500 font-bold text-xl leading-none">&gt;_</span>
                        </div>
                        <span className="font-bold text-lg tracking-wider text-white">MAURO.EXE</span>
                    </a>
                </div>
            </header>

            <main className="pt-16">
                <HeroAgri />
                <FeaturesAgri />
                <CtaAgri />
            </main>
            
            <Footer />
        </div>
    );
};

export default AgriEcommerceLanding;
