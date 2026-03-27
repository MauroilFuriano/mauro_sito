import React from 'react';
import { Palette, BrainCircuit, TrendingUp, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ── Left Column — Metrics Dashboard ──────────── */}
          <div className="relative order-2 md:order-1">
            <div className="bg-dark-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" />

              {/* Card header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-br from-cyan-400 to-purple-500">
                    <picture>
                      <source srcSet="/mauro.webp" type="image/webp" />
                      <img
                        src="/mauro_optimized.jpg"
                        alt="Mauro Ceccarelli"
                        width={40}
                        height={40}
                        className="w-full h-full rounded-[10px] object-cover object-top"
                      />
                    </picture>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-dark-900" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-sm truncate">Mauro Ceccarelli</h4>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <MapPin size={10} className="flex-shrink-0" aria-hidden="true" />
                    Ascoli Piceno, Marche
                  </p>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4" style={{ fontVariantNumeric: 'tabular-nums' }}>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-cyan-400/20 transition-colors duration-300">
                  <p className="text-3xl font-display font-black text-cyan-400">
                    98<span className="text-lg text-cyan-400/70">/100</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Lighthouse Score</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-green-400/20 transition-colors duration-300">
                  <p className="text-3xl font-display font-black text-green-400">
                    +45<span className="text-lg text-green-400/70">%</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Conversioni Clienti</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-purple-400/20 transition-colors duration-300">
                  <p className="text-3xl font-display font-black text-purple-400">
                    99.9<span className="text-lg text-purple-400/70">%</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Uptime Garantito</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-yellow-400/20 transition-colors duration-300">
                  <p className="text-3xl font-display font-black text-yellow-400">
                    &lt;2<span className="text-lg text-yellow-400/70">s</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Tempo di Caricamento</p>
                </div>
              </div>

              <div className="absolute inset-0 bg-cyan-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
            </div>
          </div>

          {/* ── Right Column — Photo + Copy ───────────── */}
          <div className="order-1 md:order-2">

            {/* Photo + Heading side by side */}
            <div className="flex items-center gap-5 mb-6">
              <div className="flex-shrink-0">
                <div className="p-[2px] rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/10">
                  <picture>
                    <source srcSet="/mauro.webp" type="image/webp" />
                    <img
                      src="/mauro_optimized.jpg"
                      alt="Mauro Ceccarelli"
                      loading="lazy"
                      className="w-24 h-24 md:w-28 md:h-28 rounded-[14px] object-cover object-top block"
                    />
                  </picture>
                </div>
              </div>
              <div>
                <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-1 text-sm uppercase">
                  Chi Sono?
                </h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight" style={{ textWrap: 'balance' }}>
                  Il Tuo Partner Digitale{' '}
                  <span className="text-gray-500">nelle Marche.</span>
                </h3>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-4">
              Costruisco tutto da <span className="text-white font-medium">zero in JavaScript, React e Python</span> —
              niente Shopify, niente WordPress, niente template uguali a quelli di altri mille siti.
              Ogni riga di codice è scritta per te.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Il mio punto di forza? <span className="text-cyan-400 font-medium">Portare l'AI nelle PMI italiane.</span>{' '}
              Mentre i siti dei tuoi competitor restano statici da anni, i miei clienti hanno
              assistenti virtuali che rispondono a ogni ora, sistemi che qualificano lead in automatico
              e e-commerce che vendono mentre loro dormono.
            </p>

            {/* Value Proposition Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-5 bg-white/[0.03] rounded-xl border border-white/5 hover:border-cyan-400/30 transition-colors duration-300 group/card">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-3 group-hover/card:bg-cyan-400/20 transition-colors duration-300">
                  <Palette className="text-cyan-400" size={24} aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-sm text-white">Design Su Misura</span>
                <span className="text-gray-500 text-xs text-center mt-1">Ogni progetto è unico</span>
              </div>

              <div className="flex flex-col items-center p-5 bg-white/[0.03] rounded-xl border border-white/5 hover:border-purple-400/30 transition-colors duration-300 group/card">
                <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center mb-3 group-hover/card:bg-purple-400/20 transition-colors duration-300">
                  <BrainCircuit className="text-purple-400" size={24} aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-sm text-white">AI Integrata</span>
                <span className="text-gray-500 text-xs text-center mt-1">Automazione intelligente</span>
              </div>

              <div className="flex flex-col items-center p-5 bg-white/[0.03] rounded-xl border border-white/5 hover:border-green-400/30 transition-colors duration-300 group/card">
                <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center mb-3 group-hover/card:bg-green-400/20 transition-colors duration-300">
                  <TrendingUp className="text-green-400" size={24} aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-sm text-white">Risultati Concreti</span>
                <span className="text-gray-500 text-xs text-center mt-1">Conversioni misurabili</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
