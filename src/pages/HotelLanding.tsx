import React, { useEffect } from 'react';
import HeroSection from '../components/hotel-landing/HeroSection';
import DemoSection from '../components/hotel-landing/DemoSection';
import ProblemSolution from '../components/hotel-landing/ProblemSolution';
import OfferSection from '../components/hotel-landing/OfferSection';
import CTASection from '../components/hotel-landing/CTASection';

const HotelLanding: React.FC = () => {
    useEffect(() => {
        // Interseca logica di scroll reveal per la landing
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

        // Cambia il title e meta description provvisoriamente per ottimizzazione su condivisioni link
        document.title = "AI Concierge per Hotel | Disintermedia e lavora H24";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Trasforma il tuo sito web hotel nella tua migliore Receptionist con Intelligenza Artificiale.');
        }

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
            document.title = "Mauro.exe | Sviluppatore Frontend & Web Designer"; // reset
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
            {/* Header Isolato Minimal (Solo Logo che refresha la pagina) */}
            <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-start">
                    <a href="/hotel" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 flex items-center justify-center bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                            <span className="text-cyan-400 font-bold text-xl leading-none">&gt;_</span>
                        </div>
                        <span className="font-bold text-lg tracking-wider text-white">MAURO.EXE</span>
                    </a>
                </div>
            </header>

            <main className="pt-16">
                <HeroSection />
                <DemoSection />
                <ProblemSolution />
                <OfferSection />
                <CTASection />
            </main>
        </div>
    );
};

export default HotelLanding;
