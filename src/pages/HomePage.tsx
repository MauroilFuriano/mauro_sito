import React, { useState, useEffect } from 'react';
import Portfolio from '../components/Portfolio';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { ArrowUp } from 'lucide-react';

const HomePage: React.FC = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    // [FRONTEND SPECIALIST] Aggiunta logica per Intersection Observer (Scroll Reveal 2026)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

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
            window.removeEventListener('scroll', handleScroll);
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
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
                    <Portfolio />
                </div>
                <div className="reveal overflow-hidden">
                    <Contact />
                </div>
            </main>

            <Footer />

            {/* ChatBot - posizionato in basso a destra */}
            <ChatBot />

            {/* Scroll to Top Button - spostato più in alto per non sovrapporsi al chatbot */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-32 right-8 z-40 p-3 rounded-full bg-cyan-400/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 backdrop-blur-sm glow-box ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-400/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
};

export default HomePage;
