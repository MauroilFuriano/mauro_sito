import React, { useMemo, useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

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

      {/* ── Content: Layout Bento Orizzontale 3 Colonne [WEB DESIGNER 2026] ── */}
      {/* Su desktop: 3 colonne affiancate — Badge+H1+CTA | Stats+Subtext | Terminale */}
      {/* Su mobile: ordine lineare badge → H1 → stats → CTA → terminale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full min-w-0">

        {/* ── GRIGLIA BENTO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-center">

          {/* ── COL 1: Badge + H1 + CTA ─────────────────────── */}
          {/* [WEB DESIGNER] Colonna principale: identità e conversione */}
          <div className="space-y-5 min-w-0">

            {/* Badge scarsità — above the fold, prima cosa letta */}
            <div className="hero-fade-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
              Solo 3 slot liberi — Aprile 2026
            </div>

            {/* H1 — dimensione ridotta per non dominare tutta l'altezza */}
            {/* [SEO] Keyword-first "Siti Web e Chatbot AI per le Marche" */}
            {/* [PSICOLOGIA] Riga 2 glitch = Loss Aversion */}
            <h1 className="hero-fade-in hero-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] break-words">
              <span className="text-white block">Siti Web e Chatbot AI</span>
              <span className="text-white block">per le Marche.</span>
              <span
                className="glitch-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 glow-text block mt-1 text-2xl sm:text-3xl lg:text-4xl"
                data-text="Ogni cliente che non ti trova online, va da un competitor."
              >
                Ogni cliente che non ti trova online,<br className="hidden sm:block" /> va da un competitor.
              </span>
            </h1>

            {/* CTA Buttons affiancati — [LEGGE DI HICK] solo 2 scelte */}
            <div className="hero-fade-in hero-delay-4 flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="#contact"
                className="px-6 py-3.5 bg-cyan-400 text-black font-display font-bold tracking-wider rounded-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] flex items-center justify-center gap-2 group animate-glow-pulse text-sm whitespace-nowrap"
              >
                ANALISI GRATUITA
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </a>
              <a
                href="#portfolio"
                className="px-6 py-3.5 bg-transparent border border-white/20 text-white font-display font-bold tracking-wider rounded-lg hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center text-sm whitespace-nowrap hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
              >
                VEDI PROGETTI
              </a>
            </div>

            {/* Trust micro-garanzie */}
            <p className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
              <span>✓ Nessun anticipo</span>
              <span>✓ Consegna in 3 settimane</span>
              <span>✓ 52 progetti</span>
            </p>
          </div>

          {/* ── COL 2: Stats + Subtext ── SEPARATORE CENTRALE ── */}
          {/* [WEB DESIGNER] Colonna centrale verticale con divider — bento card stile */}
          <div className="hero-fade-in hero-delay-2 hidden lg:flex flex-col items-center gap-6 px-6 border-l border-r border-white/5 self-stretch justify-center">

            {/* Stats verticali impilate — numeri in evidenza */}
            <div className="flex flex-col items-center gap-5 w-full">
              <div className="text-center">
                <div className="text-3xl font-black font-display text-white leading-none">50+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Progetti</div>
              </div>
              <div className="w-8 h-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-black font-display text-white leading-none">30+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Clienti</div>
              </div>
              <div className="w-8 h-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-black font-display text-cyan-400 leading-none">24/7</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">AI Attiva</div>
              </div>
            </div>

            {/* Subtext compatto sotto le stats */}
            <p className="text-xs text-gray-400 text-center leading-relaxed max-w-[140px]">
              <span className="text-cyan-400 font-semibold">+40% lead</span>
              {' · '}risparmia
              {' '}<span className="text-white font-semibold">20h/sett</span>
              {' '}grazie all&rsquo;AI
            </p>
          </div>

          {/* Stats su mobile — riga orizzontale visibile solo su schermi < lg */}
          <div className="hero-fade-in hero-delay-2 flex lg:hidden items-center justify-around py-4 border-t border-b border-white/5 w-full">
            <div className="text-center">
              <div className="text-2xl font-black font-display text-white">50+</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">Progetti</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-black font-display text-white">30+</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">Clienti</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-black font-display text-cyan-400">24/7</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">AI</div>
            </div>
          </div>

          {/* ── COL 3: Terminale animato ─────────────────────── */}
          {/* [WEB DESIGNER] Visual hero a destra — già visibile anche senza scroll */}
          <div
            className="relative flex justify-center items-center order-last"
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
                <div className="bg-[#0d0d1a]/95 backdrop-blur-md rounded-b-xl border border-white/[0.08] border-t-white/[0.04] p-5 font-mono text-[13px] leading-6 min-h-[300px] shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
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

              {/* Floating Notification */}
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

              {/* Floating Badge */}
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
      </div>

    </section>
  );
};

export default Hero;
