import React from 'react';
import { ArrowDown, Bot } from 'lucide-react';

const HeroSection: React.FC = () => {
    const scrollToDemo = () => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 pb-16">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse glow-box delay-1000" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Eyebrow */}
                <div className="inline-block mb-6 px-4 py-2 border border-purple-500/30 rounded-full bg-purple-500/10 backdrop-blur-sm reveal active">
                    <span className="text-purple-400 font-medium text-sm tracking-wide uppercase">
                        Soluzione esclusiva per B&B, Hotel e Case Vacanza.
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight reveal active" style={{ transitionDelay: '100ms' }}>
                    Smettila di regalare il 20% a Booking. Crea il tuo sito indipendente con un'{' '}
                    <span className="glitch-text text-cyan-400" data-text="Intelligenza Artificiale">
                        Intelligenza Artificiale
                    </span>{' '}
                    che prenota per te.
                </h1>

                {/* Sub-headline */}
                <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed reveal active" style={{ transitionDelay: '200ms' }}>
                    Un sito web moderno, veloce e dotato di un Concierge Virtuale integrato nativamente. Lavora 24/7, risponde in multilingua e converte i visitatori in clienti diretti.
                </p>

                {/* CTA Button */}
                <div className="reveal active" style={{ transitionDelay: '300ms' }}>
                    <button
                        onClick={scrollToDemo}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-300 bg-cyan-400 rounded-full hover:bg-cyan-300 animate-glow-pulse"
                    >
                        <Bot className="mr-2 h-5 w-5" />
                        <span className="text-lg">Guarda come funziona il Bot</span>
                        <div className="absolute inset-0 h-full w-full rounded-full transition-all duration-300 opacity-0 group-hover:opacity-20 bg-white" />
                    </button>
                </div>

                {/* Arrow Down */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce reveal active" style={{ transitionDelay: '500ms' }}>
                    <button onClick={scrollToDemo} className="text-cyan-400/50 hover:text-cyan-400 transition-colors">
                        <ArrowDown className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
