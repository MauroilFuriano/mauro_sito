import React from 'react';
import { ChevronRight } from 'lucide-react';
import LeadMagnet from './LeadMagnet';
import HeroParticles from './HeroParticles';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Immagine — piena luminosità */}
        <img
          src="/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1, objectPosition: '65% 25%' }}
          loading="eager"
        />

        {/* Overlay desktop: abbastanza scuro a sinistra per leggibilità testo,
            quasi trasparente a destra per mostrare l'immagine */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: 'linear-gradient(to right, #0a0a14 0%, #0a0a14 28%, rgba(10,10,20,0.38) 50%, rgba(10,10,20,0.08) 100%)',
            zIndex: 1,
          }}
        />

        {/* Overlay mobile — leggermente ridotto */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'rgba(10,10,20,0.52)', zIndex: 1 }}
        />

        {/* Stelle + particelle + shooting stars */}
        <HeroParticles />

      </div>

      {/* ── Contenuto Hero ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative w-full min-w-0" style={{ zIndex: 10 }}>
        <div className="max-w-2xl space-y-8">

          {/* Badge */}
          <div className="hero-fade-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
            Sviluppatore Web Ascoli Piceno
          </div>

          {/* Headline */}
          <div>
            <h1 className="hero-fade-in hero-delay-1 font-display text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] text-white mb-6">
              Siti Web e Chatbot AI per le Marche.
            </h1>

            <div className="hero-fade-in hero-delay-2 block mt-6 mb-8">
              <span
                className="glitch-text text-cyan-400 text-xl sm:text-2xl lg:text-3xl font-bold leading-snug block"
                data-text="Ogni cliente che non ti trova online, va da un competitor."
              >
                Ogni cliente che non ti trova online, va da un competitor.
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-fade-in hero-delay-4 flex flex-col sm:flex-row gap-5">
            <a
              href="#contact"
              className="px-10 py-4 bg-cyan-400 text-black font-display font-bold tracking-wider rounded-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] flex items-center justify-center gap-2 group animate-glow-pulse text-base whitespace-nowrap"
            >
              ANALISI GRATUITA
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a
              href="#portfolio"
              className="px-10 py-4 bg-transparent border border-white/20 text-white font-display font-bold tracking-wider rounded-lg hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center text-base whitespace-nowrap hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            >
              VEDI PROGETTI
            </a>
          </div>

          {/* Lead Magnet — solo mobile */}
          <div className="hero-fade-in hero-delay-5 pt-2 lg:hidden">
            <LeadMagnet />
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
