import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Cpu } from 'lucide-react';
import gsap from 'gsap';
import LeadMagnet from './LeadMagnet';
import CodeTerminal from './CodeTerminal';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isGlitching, setIsGlitching] = useState(true);

  // Particelle e Stelle generate dinamicamente per l'effetto "Original"
  const particles = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${15 + Math.random() * 20}s`,
      size: `${1.5 + Math.random() * 2.5}px`
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 250 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: `${Math.random() * 2 + 1}px`
    }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsGlitching(entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return () => observer.disconnect();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.gsap-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.2);
      tl.fromTo('.gsap-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }, 0.4);
      tl.fromTo('.gsap-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.6);
      tl.fromTo('.gsap-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.8);
      tl.fromTo('.gsap-mockup', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, 1.0);
      tl.fromTo('.gsap-lead', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.2);

    }, heroRef);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden bg-[#05050A]">

      {/* ── Background: Stelle e Particelle Originali ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,15,35,1)_0%,rgba(5,5,10,1)_100%)]" />
        
        {/* Stelle scintillanti */}
        {stars.map((star, i) => (
          <div
            key={`hero-star-${i}`}
            className="absolute bg-white rounded-full animate-twinkle opacity-30"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay
            }}
          />
        ))}

        {/* Particelle fluttuanti */}
        {particles.map((p, i) => (
          <div
            key={`hero-particle-${i}`}
            className="absolute bg-cyan-400/20 rounded-full animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
        
        {/* Stelle cadenti */}
        <div className="absolute top-1/4 left-1/4 w-px h-px bg-white animate-shooting-star" />
        <div className="absolute top-1/3 right-1/4 w-px h-px bg-white animate-shooting-star" style={{ animationDelay: '4s' }} />

        {/* Gradiente overlay per profondità desktop */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#05050A] via-[#05050A]/80 to-transparent z-10" />
      </div>

      {/* ── Contenuto Hero ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative w-full flex flex-col lg:flex-row items-center justify-between z-20 gap-12">
        
        {/* Left Col: Text */}
        <div className="w-full lg:w-1/2 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0">

          {/* Badge */}
          <div className="gsap-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase" style={{ opacity: 0 }}>
            <Cpu size={14} className="animate-pulse" />
            Sviluppatore Web & AI 2026
          </div>

          {/* Headline */}
          <div>
            <h1 className="gsap-title font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-white mb-6" style={{ opacity: 0 }}>
              Sviluppatore Web<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                ad Ascoli Piceno
              </span>
            </h1>

            <div className="gsap-subtitle block mt-6 mb-8" style={{ opacity: 0 }}>
              <span
                className={`${isGlitching ? 'glitch-text' : ''} text-cyan-400 text-xl sm:text-2xl font-bold leading-snug block`}
                data-text="Ogni cliente che non ti trova online, va da un competitor."
              >
                Ogni cliente che non ti trova online, va da un competitor.
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-start w-full lg:w-auto">
            <a
              href="#contact"
              className="gsap-cta relative overflow-hidden flex-none px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 bg-cyan-400 text-black font-display font-bold tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] hover:bg-white hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group animate-glow-pulse text-sm sm:text-base lg:text-lg whitespace-nowrap"
              style={{ opacity: 0 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                ANALISI GRATUITA
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </a>
            <a
              href="#portfolio"
              className="gsap-cta flex-none px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 border border-white/20 text-white/80 font-display font-bold tracking-wider rounded-xl hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-300 active:scale-95 flex items-center justify-center text-sm sm:text-base lg:text-lg whitespace-nowrap hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
              style={{ opacity: 0 }}
            >
              VEDI PROGETTI
            </a>
          </div>

          {/* Lead Magnet */}
          <div className="gsap-lead pt-6 min-h-[120px] w-full max-w-lg lg:ml-0 mx-auto" style={{ opacity: 0 }}>
            <LeadMagnet />
          </div>

        </div>

        {/* Right Col: Mockup (Terminal) */}
        <div className="gsap-mockup w-full lg:w-1/2 hidden lg:flex justify-center relative" style={{ opacity: 0 }}>
           <CodeTerminal />
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-30 animate-bounce cursor-pointer group"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            const yOffset = -50; 
            const y = aboutSection.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
          }
        }}
      >
        <span className="text-cyan-400/60 text-[10px] font-bold tracking-[0.3em] uppercase group-hover:text-cyan-400 transition-colors">Esplora</span>
        <ChevronDown className="text-cyan-400/50 group-hover:text-cyan-400 transition-colors" size={20} />
      </div>

    </section>
  );
};

export default Hero;
