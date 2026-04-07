import React, { useEffect, useRef, Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import LeadMagnet from './LeadMagnet';
import HeroGalaxy from './HeroGalaxy';
import HeroStarsMobile from './HeroStarsMobile';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Timeline per entrata mozzafiato (Hero + Testi principali)
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animazione Badge
      tl.fromTo('.gsap-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.2);
      
      // Animazione Title (Siti Web e Chatbot AI)
      tl.fromTo('.gsap-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }, 0.4);
      
      // Glitch text subtitle
      tl.fromTo('.gsap-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.6);
      
      // Bottoni CTA
      tl.fromTo('.gsap-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.8);
      
      // Lead Magnet
      tl.fromTo('.gsap-lead', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.0);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden">

      {/* ── Background Galaxy & Fallbacks ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Fallback Statico Desktop (per prefers-reduced-motion) */}
        <img
          src="/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover hidden lg:block"
          style={{ opacity: 1, objectPosition: '65% 25%', zIndex: 0 }}
          loading="eager"
        />

        {/* Galassia GLSL: Via Lattea, nebulosa, stelle. Active su Desktop se motion consentita */}
        <HeroGalaxy />

        {/* Stelle + particelle Canvas 2D — solo mobile, no nebulosa, battery-safe */}
        <div className="absolute inset-0 lg:hidden">
          <HeroStarsMobile />
        </div>

        {/* Gradiente overlay per leggibilità testo (Desktop) */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: 'linear-gradient(to right, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.80) 25%, rgba(10,10,20,0.30) 55%, transparent 100%)',
            zIndex: 5,
          }}
        />

        {/* Gradiente overlay per leggibilità testo (Mobile) */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,20,0.3) 0%, rgba(10,10,20,0.85) 100%)',
            zIndex: 5,
          }}
        />
      </div>

      {/* ── Contenuto Hero Centrale ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative w-full min-w-0 flex flex-col items-center justify-center text-center" style={{ zIndex: 10 }}>
        
        <div className="w-full space-y-8 flex flex-col items-center">

          {/* Badge */}
          <div className="gsap-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase" style={{ opacity: 0 }}>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
            Sviluppatore Web Ascoli Piceno
          </div>

          {/* Headline */}
          <div>
            <h1 className="gsap-title font-display text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.05] text-white mb-6 max-w-4xl mx-auto" style={{ opacity: 0 }}>
              Siti Web e Chatbot AI per le Marche.
            </h1>

            <div className="gsap-subtitle block mt-6 mb-8" style={{ opacity: 0 }}>
              <span
                className="glitch-text motion-reduce:before:hidden motion-reduce:after:hidden motion-reduce:animate-none text-cyan-400 text-xl sm:text-2xl lg:text-3xl font-bold leading-snug block max-w-3xl mx-auto"
                data-text="Ogni cliente che non ti trova online, va da un competitor."
              >
                Ogni cliente che non ti trova online, va da un competitor.
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primario */}
            <a
              href="#contact"
              className="gsap-cta flex-none px-8 py-4 bg-cyan-400 text-black font-display font-bold tracking-wider rounded-xl hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] active:scale-95 flex items-center justify-center gap-2 group animate-glow-pulse motion-reduce:animate-none text-base sm:text-lg whitespace-nowrap"
              style={{ opacity: 0 }}
            >
              ANALISI GRATUITA
              <ChevronRight className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform" size={20} />
            </a>
            {/* Secondario */}
            <a
              href="#portfolio"
              className="gsap-cta flex-none px-8 py-4 border border-white/20 text-white/80 font-display font-bold tracking-wider rounded-xl hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-300 active:scale-95 flex items-center justify-center text-base sm:text-lg whitespace-nowrap hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
              style={{ opacity: 0 }}
            >
              VEDI PROGETTI
            </a>
          </div>

          {/* Lead Magnet */}
          <div className="gsap-lead pt-6 min-h-[120px] w-full max-w-lg mx-auto" style={{ opacity: 0 }}>
            <LeadMagnet />
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
