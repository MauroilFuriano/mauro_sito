import React from 'react';
import { Palette, BrainCircuit, TrendingUp, MapPin, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column — Portrait Image ───────────── */}
          <div className="lg:col-span-5 relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 via-purple-500/10 to-transparent blur-3xl opacity-60"></div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[1.8rem] overflow-hidden border border-white/10 bg-dark-900 shadow-2xl">
                <picture>
                  <source srcSet="/mauro.webp" type="image/webp" />
                  <img
                    src="/mauro_optimized.jpg"
                    alt="Mauro Ceccarelli"
                    className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    loading="lazy"
                  />
                </picture>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent"></div>
                
                {/* Bottom Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-white font-display font-bold text-sm tracking-wide uppercase">Disponibile per Progetti</span>
                  </div>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute inset-x-4 -bottom-4 h-8 bg-cyan-400/10 blur-2xl rounded-full opacity-50"></div>
            </div>
          </div>

          {/* ── Right Column — Narrative & Data ─────────── */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Header Allineato a Sinistra */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-cyan-400/50"></div>
                <span className="text-cyan-400 font-display font-bold tracking-widest text-xs uppercase">Chi Sono</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                Mauro Ceccarelli. <br />
                <span className="text-gray-500 font-normal">Sviluppo Web & AI nelle Marche.</span>
              </h2>
            </div>

            {/* Bio Content */}
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg max-w-2xl">
              <p>
                Trasformo le <span className="text-white font-medium">visioni aziendali in realtà digitali</span> ad alte prestazioni. 
                Dalla mia base ad Ascoli Piceno, aiuto le imprese a scalare tramite il codice puro e l'integrazione intelligente dell'AI.
              </p>
              <p className="text-sm border-l-2 border-cyan-400/30 pl-4 py-1 italic bg-cyan-400/[0.02]">
                "Non uso template pronti. Ogni riga di codice è scritta su misura per massimizzare velocità, sicurezza e conversioni."
              </p>
            </div>

            {/* Blocks: Value Cards + Metrics */}
            <div className="grid sm:grid-cols-2 gap-8 items-start">
              
              {/* Value Pillar Cards (Stacked) */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 transition-colors group/card">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover/card:scale-110 transition-transform">
                    <Palette size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Design Custom</p>
                    <p className="text-gray-500 text-[11px]">UX focalizzata sul ROI</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 transition-colors group/card">
                  <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400 group-hover/card:scale-110 transition-transform">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">AI Core</p>
                    <p className="text-gray-500 text-[11px]">Automazione avanzata</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 transition-colors group/card">
                  <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 group-hover/card:scale-110 transition-transform">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Scalabilità</p>
                    <p className="text-gray-500 text-[11px]">Pronto per il futuro</p>
                  </div>
                </div>
              </div>

              {/* Metrics Box (Compact Dashboard) */}
              <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 blur-3xl rounded-full"></div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} className="text-cyan-400" /> Marche HQ
                  </h4>
                  <ExternalLink size={12} className="text-gray-600" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-500 text-[10px] uppercase font-bold">Lighthouse Score</span>
                    <span className="text-cyan-400 font-display font-black text-xl leading-none">98<span className="text-[10px] opacity-50 ml-0.5">/100</span></span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[98%] shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <span className="text-gray-500 text-[10px] uppercase font-bold">Client ROI</span>
                    <span className="text-green-400 font-display font-black text-xl leading-none">+45<span className="text-[10px] opacity-50 ml-0.5">%</span></span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full w-[45%] shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <span className="text-gray-500 text-[10px] uppercase font-bold">Uptime</span>
                    <span className="text-white font-mono text-sm">99.9%</span>
                  </div>
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
