import React, { useMemo, useState, useEffect } from 'react';
import { ChevronRight, Zap, Users, Clock } from 'lucide-react';

/* ── Static Data ─────────────────────────────────────────────── */

interface TerminalLine {
  text: string;
  type: 'comment' | 'code' | 'success' | 'empty';
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: '// mauro.exe — AI Chatbot Engine', type: 'comment' },
  { text: '', type: 'empty' },
  { text: 'const chatbot = new AIAssistant({', type: 'code' },
  { text: '  model: "gpt-4-turbo",', type: 'code' },
  { text: '  language: "it",', type: 'code' },
  { text: '  tasks: [', type: 'code' },
  { text: '    "prenotazioni automatiche",', type: 'code' },
  { text: '    "assistenza clienti 24/7",', type: 'code' },
  { text: '    "lead generation",', type: 'code' },
  { text: '  ]', type: 'code' },
  { text: '});', type: 'code' },
  { text: '', type: 'empty' },
  { text: 'await chatbot.deploy("production");', type: 'code' },
  { text: '// ✓ Status: Live & Running', type: 'success' },
];

const highlightLine = (line: TerminalLine): React.ReactNode => {
  if (line.type === 'comment') return <span className="text-gray-500 italic">{line.text}</span>;
  if (line.type === 'success') return <span className="text-green-400">{line.text}</span>;
  if (line.type === 'empty') return '\u00A0';

  const parts = line.text.split(/(\b(?:const|new|await)\b|"[^"]*")/g);
  return parts.map((part, i) => {
    if (/^(const|new|await)$/.test(part)) {
      return <span key={i} className="text-purple-400">{part}</span>;
    }
    if (part.startsWith('"')) {
      return <span key={i} className="text-green-400">{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
};

/* ── Component ───────────────────────────────────────────────── */

const Hero: React.FC = () => {
  // Particles — refined, fewer for cleaner look
  const particles = useMemo(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#00E5FF' : '#a855f7',
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 20,
    })), []);

  // Stars — subtler field
  const stars = useMemo(() =>
    Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      twinkleDuration: Math.random() * 3 + 2,
      twinkleDelay: Math.random() * 5,
    })), []);

  // Mouse parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Terminal line-by-line reveal
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    const timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        setVisibleLines(prev => {
          if (prev >= TERMINAL_LINES.length) {
            clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, 120);
    }, 800);
    return () => {
      clearTimeout(timerId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden">

      {/* ── Background Layers ──────────────────────────── */}

      {/* Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map(s => (
          <div
            key={`star-${s.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animation: `twinkle ${s.twinkleDuration}s ease-in-out infinite`,
              animationDelay: `${s.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Mesh Orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-400/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-purple-500/[0.07] rounded-full blur-[120px] pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-0 blur-[0.5px]"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animation: `float-particle ${p.duration}s linear infinite`,
              animationDelay: `-${p.delay}s`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* ── Content Grid ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full min-w-0">

        {/* Left Column */}
        <div className="space-y-6 min-w-0 w-full">

          {/* Badge */}
          <div className="hero-fade-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase max-w-full">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
            Solo 3 slot liberi — Aprile 2026
          </div>

          {/* Headline — Variante 5: SEO locale (riga 1) + Loss Aversion con glitch (riga 2) */}
          {/* [SEO] H1 keyword-first: "Siti Web e Chatbot AI per le Marche" per Local SEO Ascoli/Marche */}
          {/* [PSICOLOGIA] Prima parola "Siti Web" = soluzione immediata; riga 2 = Loss Aversion */}
          <h1 className="hero-fade-in hero-delay-1 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.15] break-words w-full">
            <span className="text-white">Siti Web e Chatbot AI per le Marche.</span>
            <br />
            <span
              className="glitch-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 glow-text break-words"
              data-text="Ogni cliente che non ti trova online, va da un competitor."
            >
              Ogni cliente che non ti trova online, va da un competitor.
            </span>
          </h1>

          {/* Subtext */}
          <p className="hero-fade-in hero-delay-2 text-base md:text-lg lg:text-xl text-gray-400 w-full max-w-lg leading-relaxed break-words">
            Sono un <span className="text-cyan-400 font-bold">sviluppatore web</span> di Ascoli Piceno. Creo{' '}
            <span className="text-cyan-400 font-bold">siti web professionali</span> e{' '}
            <span className="text-cyan-400 font-bold">chatbot AI</span> per aziende nelle Marche e in tutta Italia.
            I miei clienti ottengono in media{' '}
            <span className="text-white font-bold">+40% di lead qualificati</span> e risparmiano{' '}
            <span className="text-white font-bold">20h/settimana</span> grazie all'AI — mentre tu ti concentri sul business.
          </p>

          {/* Stats Row — Social Proof */}
          <div className="hero-fade-in hero-delay-3 flex flex-wrap items-center gap-4 sm:gap-6 py-4 border-t border-b border-white/5">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              <span className="text-white font-bold text-lg font-display">50+</span>
              <span className="text-gray-500 text-sm">Progetti</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <Users size={16} className="text-cyan-400" />
              <span className="text-white font-bold text-lg font-display">30+</span>
              <span className="text-gray-500 text-sm">Clienti</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyan-400" />
              <span className="text-white font-bold text-lg font-display">24/7</span>
              <span className="text-gray-500 text-sm">AI Attiva</span>
            </div>
          </div>


          {/* CTA Buttons */}
          <div className="hero-fade-in hero-delay-4 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full overflow-hidden">
            <a
              href="#contact"
              className="w-full px-2 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-display font-bold tracking-wider rounded-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] flex items-center justify-center gap-2 group animate-glow-pulse text-xs sm:text-sm md:text-base text-center"
            >
              ANALISI GRATUITA DEL TUO SITO
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
            <a
              href="#portfolio"
              className="w-full px-2 py-3 md:px-8 md:py-4 bg-transparent border border-white/20 text-white font-display font-bold tracking-wider rounded-lg hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm md:text-base text-center hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            >
              VEDI PROGETTI
            </a>
          </div>

          {/* Trust Indicators */}
          <p className="text-xs text-gray-500 flex items-center justify-center gap-4 flex-wrap mt-4">
            <span>✓ Nessun anticipo</span>
            <span>✓ Consegna in 3 settimane</span>
            <span>✓ 52 progetti consegnati</span>
          </p>

        </div>

        {/* ── Right Column — Terminal Mockup ────────────── */}
        <div
          className="relative hidden md:flex justify-center items-center"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div className="relative w-full max-w-md hero-fade-in hero-delay-2">

            {/* Terminal Ambient Glow */}
            <div className="absolute -inset-4 bg-cyan-400/[0.04] rounded-2xl blur-xl pointer-events-none" />

            {/* Terminal Window */}
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a2e] rounded-t-xl border border-white/[0.08] border-b-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-gray-500 text-xs font-mono ml-2">mauro@dev ~/chatbot-engine</span>
              </div>

              {/* Body */}
              <div className="bg-[#0d0d1a]/95 backdrop-blur-md rounded-b-xl border border-white/[0.08] border-t-white/[0.04] p-5 font-mono text-[13px] leading-6 min-h-[340px] shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                {TERMINAL_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`flex transition-all duration-300 ${
                      i < visibleLines ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                    }`}
                  >
                    <span className="text-gray-600 select-none w-8 text-right mr-4 flex-shrink-0 text-xs leading-6">
                      {i + 1}
                    </span>
                    <span className="text-gray-300">{highlightLine(line)}</span>
                  </div>
                ))}

                {/* Blinking Cursor */}
                {visibleLines >= TERMINAL_LINES.length && (
                  <div className="flex mt-1">
                    <span className="text-gray-600 select-none w-8 text-right mr-4 flex-shrink-0 text-xs leading-6">
                      {TERMINAL_LINES.length + 1}
                    </span>
                    <span className="text-cyan-400 animate-blink">▊</span>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Notification — Bottom-left */}
            <div
              className="absolute -bottom-6 -left-6 p-3 bg-[#1a1a2e]/95 backdrop-blur-md border border-green-500/20 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] hero-fade-in hero-delay-5"
              style={{
                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)] animate-pulse" />
                <span className="text-green-400 text-xs font-bold font-mono">+1 nuovo lead acquisito</span>
              </div>
            </div>

            {/* Floating Badge — Top-right */}
            <div
              className="absolute -top-4 -right-4 px-3 py-1.5 bg-purple-500/15 border border-purple-500/25 rounded-lg backdrop-blur-md hero-fade-in hero-delay-4"
              style={{
                transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
                transition: 'transform 0.12s ease-out',
              }}
            >
              <span className="text-purple-400 text-xs font-bold font-mono">AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
