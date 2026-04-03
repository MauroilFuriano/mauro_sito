import React from 'react';
import { Palette, BrainCircuit, TrendingUp, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. Header Centralizzato */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 font-display font-bold tracking-widest mb-3 text-sm uppercase">
            Chi Sono
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            Il Tuo Partner Digitale <span className="text-gray-500 font-normal">nelle Marche.</span>
          </h2>
        </div>

        {/* 2. Immagine "Hero" 1200x630 (Contenitore con bordi Neon) */}
        <div className="relative mb-20 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-2xl opacity-40 group-hover:opacity-60 transition duration-700"></div>
          <div className="relative aspect-[21/9] md:aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-white/10 bg-dark-900 shadow-2xl">
            <picture>
              <source srcSet="/mauro.webp" type="image/webp" />
              <img
                src="/mauro_optimized.jpg"
                alt="Mauro Ceccarelli - Web & AI Specialist"
                className="w-full h-full object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
            </picture>
            {/* Overlay Gradient per profondità */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>
            
            {/* Bordo Neon Dinamico */}
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors duration-500 pointer-events-none"></div>
          </div>
        </div>

        {/* 3. Griglia Informativa: Bio & Stats */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Colonna Bio/Valori (Left) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-white font-display font-medium leading-relaxed">
                Sono uno sviluppatore web di Ascoli Piceno focalizzato sulla creazione di <span className="text-cyan-400">ecosistemi digitali</span> ad alte prestazioni.
              </p>
              <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
                <p>
                  Costruisco tutto da <span className="text-white font-semibold">zero</span> (React, Next.js, Python), 
                  rifiutando template standard o piattaforme chiuse. Il mio codice è scritto per essere veloce, sicuro e pronto a scalare.
                </p>
                <p>
                  Integro <span className="text-purple-400 font-semibold italic">Intelligenza Artificiale</span> e automazione per trasformare la presenza online in uno strumento di vendita attivo 24/7, garantendo ai miei clienti un vantaggio competitivo reale sul mercato.
                </p>
              </div>
            </div>

            {/* Value Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex flex-col p-5 bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/5 hover:border-cyan-400/30 transition-all duration-300 group/card hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4 group-hover/card:bg-cyan-400/20">
                  <Palette className="text-cyan-400" size={20} />
                </div>
                <span className="font-display font-bold text-sm text-white mb-1">Design Su Misura</span>
                <span className="text-gray-500 text-xs leading-snug">UX/UI orientata alla conversione</span>
              </div>
              
              <div className="flex flex-col p-5 bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/5 hover:border-purple-400/30 transition-all duration-300 group/card hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center mb-4 group-hover/card:bg-purple-400/20">
                  <BrainCircuit className="text-purple-400" size={20} />
                </div>
                <span className="font-display font-bold text-sm text-white mb-1">AI & Chatbot</span>
                <span className="text-gray-500 text-xs leading-snug">Automazione lead generation</span>
              </div>

              <div className="flex flex-col p-5 bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/5 hover:border-green-400/30 transition-all duration-300 group/card hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center mb-4 group-hover/card:bg-green-400/20">
                  <TrendingUp className="text-green-400" size={20} />
                </div>
                <span className="font-display font-bold text-sm text-white mb-1">Risultati Reali</span>
                <span className="text-gray-500 text-xs leading-snug">ROI misurabile e scalabile</span>
              </div>
            </div>
          </div>

          {/* Colonna Metriche (Right) */}
          <div className="lg:col-span-5">
            <div className="bg-dark-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-pulse" />
              
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex-shrink-0">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Mauro Ceccarelli</h4>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">Ascoli Piceno, MARCHE</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Lighthouse Score', value: '98', suffix: '/100', color: 'text-cyan-400', border: 'hover:border-cyan-400/20' },
                  { label: 'Conversioni Clienti', value: '+45', suffix: '%', color: 'text-green-400', border: 'hover:border-green-400/20' },
                  { label: 'Uptime Garantito', value: '99.9', suffix: '%', color: 'text-purple-400', border: 'hover:border-purple-400/20' },
                  { label: 'Caricamento', value: '<2', suffix: 's', color: 'text-yellow-400', border: 'hover:border-yellow-400/20' }
                ].map((metric, idx) => (
                  <div key={idx} className={`bg-white/[0.02] rounded-xl p-5 border border-white/5 transition-colors duration-300 ${metric.border}`}>
                    <p className={`text-3xl font-display font-black leading-none mb-2 ${metric.color}`}>
                      {metric.value}<span className="text-xs opacity-60 ml-0.5">{metric.suffix}</span>
                    </p>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter sm:tracking-normal">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500 text-center italic">
                  "Ogni sito è un motore ad alte prestazioni sviluppato su misura."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
