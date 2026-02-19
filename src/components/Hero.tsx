import React, { useMemo } from 'react';
import { ChevronRight, Code, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  // Generate MORE random particles for the background (increased from 30 to 80)
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1, // 1px to 4px
      color: Math.random() > 0.5 ? 'bg-cyan-400' : 'bg-purple-500',
      duration: Math.random() * 15 + 10, // 10s to 25s
      delay: Math.random() * 20, // 0s to 20s
    }));
  }, []);

  // Generate static stars for space effect
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5, // 0.5px to 2.5px
      opacity: Math.random() * 0.7 + 0.3, // 0.3 to 1
      twinkleDuration: Math.random() * 3 + 2, // 2s to 5s
      twinkleDelay: Math.random() * 5, // 0s to 5s
    }));
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Static Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.twinkleDuration}s ease-in-out infinite`,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Background Effect */}


      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full opacity-0 blur-[1px] ${p.color}`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-particle ${p.duration}s linear infinite`,
              animationDelay: `-${p.delay}s`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color === 'bg-cyan-400' ? '#00E5FF' : '#a855f7'}`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase animate-pulse">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00E5FF]" />
            Disponibile per nuovi progetti
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-black leading-tight text-white">
            Sviluppo Web & IA: <br />
            <span
              className="glitch-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 glow-text"
              data-text="Business Digitale"
            >
              Business Digitale
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            <span className="text-cyan-400 font-bold">Chatbot intelligenti</span> che rispondono 24/7 e siti ottimizzati per vendere. <br className="hidden md:block" />
            Per PMI che vogliono automatizzare senza assumere personale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="px-6 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-display font-bold tracking-wider rounded hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] flex items-center justify-center gap-2 group animate-glow-pulse whitespace-nowrap text-sm md:text-base"
            >
              RICHIEDI ANALISI GRATUITA
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="px-6 py-3 md:px-8 md:py-4 bg-transparent border border-white/20 text-white font-display font-bold tracking-wider rounded hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center whitespace-nowrap text-sm md:text-base"
            >
              VEDI PROGETTI
            </a>
          </div>
        </div>

        {/* Hero Visual/Graphic */}
        <div className="relative hidden md:flex justify-center items-center">
          <div className="relative w-96 h-96">
            {/* Spinning Rings */}
            <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-12 border border-white/10 rounded-full animate-[pulse_3s_ease-in-out_infinite]" />

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 bg-dark-800/80 backdrop-blur-md rounded-2xl border border-cyan-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)] animate-float">
                <Code size={48} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" />

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 p-3 bg-dark-900 border border-purple-500/50 rounded-lg shadow-lg animate-bounce delay-75">
                  <Cpu size={20} className="text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

