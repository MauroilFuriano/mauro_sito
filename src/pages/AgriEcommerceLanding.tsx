import React, { useEffect } from 'react';
import HeroAgri from '../components/agri-ecommerce/HeroAgri';
import FeaturesAgri from '../components/agri-ecommerce/FeaturesAgri';
import CtaAgri from '../components/agri-ecommerce/CtaAgri';
import Footer from '../components/Footer';

const AgriEcommerceLanding: React.FC = () => {
    useEffect(() => {
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

            <main id="main-content" className="pt-16">
                <HeroAgri />
                <FeaturesAgri />
                <CtaAgri />
            </main>
            
            <Footer />
        </div>
    );
};

export default AgriEcommerceLanding;
