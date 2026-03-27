import React from 'react';
import { Palette, BrainCircuit, TrendingUp, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left Column — Profile Photo ──────────── */}
          <div className="order-1">
            {/* Gradient border frame */}
            <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-cyan-400 shadow-2xl shadow-cyan-400/10">
              <div className="rounded-2xl overflow-hidden">
                <picture>
                  <source srcSet="/mauro.webp" type="image/webp" />
                  <img
                    src="/mauro_optimized.jpg"
                    alt="Mauro Ceccarelli — Full Stack Developer & AI Specialist"
                    loading="lazy"
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '3/4', maxHeight: '540px' }}
                  />
                </picture>
              </div>

              {/* Name + availability overlay at bottom of photo */}
              <div className="absolute bottom-0 left-0 right-0 mx-[2px] mb-[2px] rounded-b-2xl bg-gradient-to-t from-dark-900/95 via-dark-900/60 to-transparent px-5 pt-16 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">Mauro Ceccarelli</h4>
                    <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin size={10} aria-hidden="true" />
                      Ascoli Piceno, Marche
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-dark-900/80 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-green-400 text-xs font-bold">Disponibile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics strip — 4 columns below photo */}
            <div className="grid grid-cols-4 gap-2 mt-3" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <div className="bg-dark-900 rounded-xl p-3 border border-white/5 hover:border-cyan-400/25 transition-colors duration-300 text-center">
                <p className="text-lg font-display font-black text-cyan-400 leading-none">98<span className="text-xs text-cyan-400/70">/100</span></p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">Lighthouse</p>
              </div>
              <div className="bg-dark-900 rounded-xl p-3 border border-white/5 hover:border-green-400/25 transition-colors duration-300 text-center">
                <p className="text-lg font-display font-black text-green-400 leading-none">+45<span className="text-xs text-green-400/70">%</span></p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">Conversioni</p>
              </div>
              <div className="bg-dark-900 rounded-xl p-3 border border-white/5 hover:border-purple-400/25 transition-colors duration-300 text-center">
                <p className="text-lg font-display font-black text-purple-400 leading-none">99.9<span className="text-xs text-purple-400/70">%</span></p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">Uptime</p>
              </div>
              <div className="bg-dark-900 rounded-xl p-3 border border-white/5 hover:border-yellow-400/25 transition-colors duration-300 text-center">
                <p className="text-lg font-display font-black text-yellow-400 leading-none">&lt;2<span className="text-xs text-yellow-400/70">s</span></p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">Caricamento</p>
              </div>
            </div>
          </div>

          {/* ── Right Column — Copy & Value Props ────────── */}
          <div className="order-2 md:pt-4">
            <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">
              Chi Sono?
            </h2>
            <h3 className="text-4xl font-display font-bold text-white mb-6" style={{ textWrap: 'balance' }}>
              Il Tuo Partner Digitale{' '}
              <br />
              <span className="text-gray-500">nelle Marche.</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Aiuto imprenditori e aziende a trasformare la loro presenza online in uno
              strumento che genera risultati concreti. Niente template, niente soluzioni
              preconfezionate — solo siti web e chatbot AI costruiti su misura, progettati
              per convertire visitatori in clienti e automatizzare il tuo business.
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
