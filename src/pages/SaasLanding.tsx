import React, { useEffect } from 'react';
import SaasNavbar from '../components/saas-landing/SaasNavbar';
import SaasHero from '../components/saas-landing/SaasHero';
import SaasFeatures from '../components/saas-landing/SaasFeatures';
import SEO from '../components/SEO';

const SaasLanding: React.FC = () => {
    useEffect(() => {
        // Al mount del componente, scrollo in cima (comportamento SPA)
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-200 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
            <SEO
                title="Dashboard E-commerce Personalizzata | Gestione Negozio Smart"
                description="Crea la tua area ordini e clienti personalizzata. Nessun costo mensile per piattaforme standard. Dashboard e-commerce sviluppata su misura per la tua attività."
                canonical="https://www.mauroceccarelli.it/saas"
                keywords="Dashboard E-commerce, Gestione Ordini, Software Negozio, Piattaforma Personalizzata, E-commerce Su Misura"
            />
            {/* Navbar Slim (Esclusiva della Landing SaaS) */}
            <SaasNavbar />

            <main>
                {/* Sezione Eroe con Mockup Dashboard */}
                <SaasHero />

                {/* Sezione Infrastruttura / Punti di Forza SaaS */}
                <SaasFeatures />

            </main>

            {/* Footer minimalista CTA */}
            <footer className="pt-20 pb-10 text-center border-t border-slate-800/50 bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Cerchi una gestione negozio smart ed efficiente?</h2>
                    <p className="text-slate-400 mb-8">Nessun costo mensile per piattaforme standard che ti limitano. Crea la tua area ordini e clienti personalizzata, sviluppata a misura per la tua attività.</p>
                    <a
                        href="https://wa.me/393480029661?text=Ciao%20Mauro,%20vorrei%20informazioni%20per%20creare%20una%20dashboard%20e-commerce%20personalizzata."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-950 bg-emerald-500 rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                        Scrivimi su WhatsApp (Senza Impegno)
                    </a>
                </div>
                <p className="text-slate-600">© {new Date().getFullYear()} Mauro Ceccarelli. Tutti i diritti riservati.</p>
            </footer>
        </div>
    );
};

export default SaasLanding;
