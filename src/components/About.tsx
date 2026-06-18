import React, { useState } from 'react';
import { Linkedin, Github, ExternalLink, Zap, Cat, User } from 'lucide-react';

const About: React.FC = () => {
  const [showBadges, setShowBadges] = useState(false);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background astratto scuro che funge da continuazione dello spazio */}
      <div className="absolute inset-0 bg-dark-900 border-t border-white/5" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#05050A] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl rounded-[2.5rem] p-6 lg:p-12 relative overflow-hidden group">
          {/* Subtle glow hover effect su tutta la card */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

          {/* ── Left Column — Portrait Image ───────────── */}
          <div className="lg:col-span-5 relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 via-purple-500/10 to-transparent blur-3xl opacity-60"></div>

            <div 
              className="relative group cursor-pointer"
              onClick={() => setShowBadges(!showBadges)}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[1.8rem] overflow-hidden border border-white/10 bg-dark-900 shadow-2xl">
                <picture>
                  <source srcSet="/mauro.webp" type="image/webp" />
                  <img
                    src="/mauro_optimized.jpg"
                    alt="Mauro Ceccarelli"
                    className={`w-full h-full object-cover object-top filter transition-all duration-1000 ${showBadges ? 'grayscale-0 scale-105' : 'grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105'}`}
                    loading="lazy"
                  />
                </picture>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent"></div>

                {/* Dynamic Badges Interaction */}
                <div
                  className="absolute top-[60%] left-[15%] z-20 transition-all duration-300"
                  style={{
                    opacity: showBadges ? 1 : 0,
                    transform: showBadges ? 'translate(0,0) scale(1)' : 'translate(-20px,10px) scale(0.8)',
                    pointerEvents: showBadges ? 'auto' : 'none',
                  }}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <Cat size={14} className="text-purple-400" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Titti - Frontend Specialist</span>
                  </div>
                </div>

                <div
                  className="absolute top-[40%] right-[15%] z-20 transition-all duration-300 delay-100"
                  style={{
                    opacity: showBadges ? 1 : 0,
                    transform: showBadges ? 'translate(0,0) scale(1)' : 'translate(20px,10px) scale(0.8)',
                    pointerEvents: showBadges ? 'auto' : 'none',
                  }}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    <User size={14} className="text-cyan-400" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Mauro - Web Developer</span>
                  </div>
                </div>

                {/* Hint toast */}
                <div
                  className="absolute bottom-6 left-6 right-6 p-4 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between transition-opacity duration-300"
                  style={{ opacity: showBadges ? 0 : 1, pointerEvents: showBadges ? 'none' : 'auto' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-white font-display font-medium text-xs tracking-wide uppercase">Clicca per scoprire il team</span>
                  </div>
                  <Zap size={14} className="text-cyan-400 animate-bounce" />
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute inset-x-4 -bottom-4 h-8 bg-cyan-400/10 blur-2xl rounded-full opacity-50"></div>
            </div>
          </div>

          {/* ── Right Column — Bio ─────────────────────── */}
          <div className="lg:col-span-7 space-y-8">

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-cyan-400/50"></div>
                <span className="text-cyan-400 font-display font-bold tracking-widest text-sm uppercase">Chi Sono?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                Il Tuo Partner Digitale <br />
                <span className="text-cyan-400">nelle Marche e in Italia.</span>
              </h2>
            </div>

            {/* Bio Strategica — Metodo BLUF (GEO 2026) */}
            <div className="space-y-8 text-gray-400 leading-relaxed text-lg max-w-2xl">
              
              {/* Atomic Answer 1 */}
              <div className="space-y-2">
                <h3 className="text-white font-display font-bold text-xl flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Chi è Mauro Ceccarelli?
                </h3>
                <p>
                  Sono uno <span className="text-white font-medium">sviluppatore web full-stack</span> e il tuo partner digitale per la scalabilità. Aiuto le aziende a crescere tramite siti web ad alte prestazioni e <span className="text-white font-medium">chatbot AI</span> di ultima generazione.
                </p>
              </div>

              {/* Atomic Answer 2 */}
              <div className="space-y-2">
                <h3 className="text-white font-display font-bold text-xl flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Qual è il mio approccio tecnico?
                </h3>
                <p>
                  Costruisco architetture custom in <span className="text-white font-medium">React, TypeScript e Python</span>. Rifiuto template predefiniti o piattaforme chiuse (niente WordPress o Shopify) per garantire <span className="text-white font-medium">performance massime (Lighthouse 98+)</span> e sicurezza totale ai miei clienti.
                </p>
              </div>

              {/* Atomic Answer 3 */}
              <div className="space-y-2">
                <h3 className="text-white font-display font-bold text-xl flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Perché scegliere l'integrazione AI?
                </h3>
                <p>
                  L'AI trasforma un sito statico in un asset generativo. Implemento <span className="text-white font-medium">assistenti virtuali H24</span> e sistemi RAG (Retrieval-Augmented Generation) che permettono al tuo business di rispondere istantaneamente ai lead, riducendo i tempi di chiusura dei contratti.
                </p>
              </div>

              {/* Social Links — E-E-A-T Signals */}
              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-6">
                <a 
                  href="https://www.linkedin.com/in/mauro-ceccarelli-282255296" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors group"
                >
                  <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                  <span>LINKEDIN</span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://github.com/MauroilFuriano"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group"
                >
                  <Github size={18} className="group-hover:scale-110 transition-transform" />
                  <span>GITHUB</span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

          </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
