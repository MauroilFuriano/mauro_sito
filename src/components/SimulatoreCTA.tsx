import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ChevronRight, Clock, CheckCircle2, Euro } from 'lucide-react';

// [FRONTEND SPECIALIST] Componente CTA per il Simulatore Preventivo
// [SITO_2026] Segue il metodo Atomic Answer (BLUF): valore immediato + CTA diretta
// [SITO_2026] Semantic HTML: <section> con id per i crawler AI

const STATS = [
  { icon: <Clock size={16} />, label: 'Risultato istantaneo', value: '< 2 min' },
  { icon: <CheckCircle2 size={16} />, label: 'Nessun impegno', value: '100% Gratuito' },
  { icon: <Euro size={16} />, label: 'Prezzi trasparenti', value: 'Senza sorprese' },
];

// Counter animato via requestAnimationFrame — sincronizzato col paint, zero jank
const useCountUp = (target: number, duration = 1500, active: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    let rafId = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else setCount(target);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, active]);
  return count;
};

const SimulatoreCTA: React.FC = () => {
  // [FRONTEND SPECIALIST] IntersectionObserver locale per animare i counter solo quando visibili
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const preventiviCount = useCountUp(127, 1800, isVisible);

  return (
    // [SITO_2026] tag <section> semantico con id navigabile dai crawler AI
    <section
      id="simulatore-preventivo"
      ref={sectionRef}
      aria-labelledby="simulatore-heading"
      className="py-24 relative overflow-hidden"
    >
      {/* ── Sfondo con linee circuit-board sottili ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orb ambientali */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] bg-cyan-400/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Card principale ── */}
        <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-cyan-400/30 via-purple-500/10 to-transparent">
          <div className="bg-dark-900/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">

            {/* Decorazione angolo top-right */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* ── Colonna sinistra: Copy ── */}
              <div className="space-y-6">

                {/* Badge counter — [SITO_2026] Social proof: preventivi generati */}
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
                    <span>
                      <span className="font-display text-base text-white">{preventiviCount}</span>
                      {' '}preventivi già generati
                    </span>
                  </div>
                </div>

                {/* [SITO_2026] H2 formulato come domanda naturale dell'utente */}
                <h2
                  id="simulatore-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
                >
                  Quanto costa il tuo{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 glow-text">
                    progetto digitale?
                  </span>
                </h2>

                {/* [SITO_2026] Atomic Answer BLUF: risposta di 40-60 parole sotto l'H2 */}
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
                  Il nostro simulatore calcola in{' '}
                  <strong className="text-white">meno di 2 minuti</strong> il costo stimato del tuo
                  sito web o chatbot AI. Seleziona le funzionalità che ti servono e ottieni una
                  stima trasparente —{' '}
                  <strong className="text-cyan-400">senza impegno e senza contattare nessuno</strong>.
                </p>

                {/* Stats pillole */}
                <div className="flex flex-wrap gap-3">
                  {STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm"
                    >
                      <span className="text-cyan-400">{stat.icon}</span>
                      <span className="text-gray-400">{stat.label}:</span>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* [FRONTEND SPECIALIST] CTA principale — Link interno (react-router) per SPA navigation */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    to="/simulatore"
                    id="cta-simulatore-preventivo"
                    aria-label="Apri il simulatore per calcolare il preventivo del tuo progetto web"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-400 text-black font-display font-black tracking-wider rounded-xl
                      hover:bg-cyan-300 transition-all duration-300
                      shadow-[0_0_30px_rgba(0,229,255,0.35)] hover:shadow-[0_0_50px_rgba(0,229,255,0.55)]
                      animate-glow-pulse text-sm sm:text-base overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s ease-in-out infinite',
                      }}
                    />
                    <Calculator size={20} className="flex-shrink-0 relative z-10" />
                    <span className="relative z-10">🧮 Calcola il tuo Preventivo Gratis</span>
                    <ChevronRight
                      size={18}
                      className="flex-shrink-0 relative z-10 group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </Link>
                </div>

                <p className="text-xs text-gray-600 flex items-center gap-4 flex-wrap">
                  <span>✓ Nessun dato personale richiesto</span>
                  <span>✓ Stima immediata e trasparente</span>
                  <span>✓ Prezzi aggiornati al 2026</span>
                </p>
              </div>

              {/* ── Colonna destra: Mockup visuale del simulatore ── */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="relative w-full max-w-sm">

                  {/* Glow ambientale */}
                  <div className="absolute -inset-6 bg-cyan-400/[0.05] rounded-3xl blur-2xl pointer-events-none" />

                  {/* Card mockup simulatore */}
                  <div className="relative bg-dark-800/80 border border-white/[0.06] rounded-2xl p-6 space-y-4 backdrop-blur-sm">

                    {/* Header finto */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                        <Calculator size={16} className="text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-bold">Simulatore Preventivo</div>
                        <div className="text-gray-500 text-xs">Mauro.exe — Aprile 2026</div>
                      </div>
                    </div>

                    {/* Righe mockup configurazione — Feature chiave del Sito Vetrina */}
                    {[
                      { label: 'Tipo progetto', value: 'Sito Vetrina', color: 'text-cyan-400' },
                      { label: 'SEO Base & Lighthouse 98/100', value: '✓ Incluso', color: 'text-green-400' },
                      { label: 'Dominio .it + Hosting Cloud', value: '✓ 1 Anno', color: 'text-green-400' },
                      { label: 'Assistenza Post-Lancio', value: '✓ 30 Giorni', color: 'text-green-400' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-sm gap-2">
                        <span className="text-gray-500 text-xs">{row.label}</span>
                        <span className={`font-bold text-xs flex-shrink-0 ${row.color}`}>{row.value}</span>
                      </div>
                    ))}

                    {/* Divider — prezzo attrattivo per invogliare il simulatore */}
                    <div className="border-t border-white/5 pt-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-gray-500 text-xs uppercase tracking-widest">Stima totale</span>
                          {/* Prezzo stima totale */}
                          <div className="flex items-baseline gap-2 mt-1">
                            <div className="text-white font-display text-3xl font-black">
                              €<span className="text-cyan-400">1.499</span>
                            </div>
                          </div>
                          <span className="text-gray-600 text-xs">IVA esclusa · pagamento dilazionabile</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Consegna stimata</div>
                          <div className="text-white font-bold text-sm mt-1">10 giorni</div>
                        </div>
                      </div>
                    </div>

                  </div>


                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* [FRONTEND SPECIALIST] Animazione shimmer inline — rispetta prefers-reduced-motion */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          #cta-simulatore-preventivo * { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default SimulatoreCTA;
