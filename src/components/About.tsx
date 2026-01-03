import React from 'react';
import { Gamepad2, Coffee, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-2 md:order-1">
             {/* Abstract Code Visual */}
             <div className="bg-dark-900 border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-400 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600" />
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-purple-400">const</span>
                    <span className="text-cyan-400">developer</span>
                    <span className="text-white">=</span>
                    <span className="text-yellow-300">{`{`}</span>
                  </div>
                  <div className="pl-6 flex gap-2">
                    <span className="text-white">nome:</span>
                    <span className="text-green-400">'Mauro'</span>,
                  </div>
                  <div className="pl-6 flex gap-2">
                    <span className="text-white">classe:</span>
                    <span className="text-green-400">'Creatore'</span>,
                  </div>
                  <div className="pl-6 flex gap-2">
                    <span className="text-white">skills:</span>
                    <span className="text-yellow-300">['Web', 'IA', 'App']</span>,
                  </div>
                  <div className="pl-6 flex gap-2">
                    <span className="text-white">passione:</span>
                    <span className="text-green-400">'Infinita'</span>
                  </div>
                  <div className="text-yellow-300">{`};`}</div>
                  
                  <div className="pt-4 flex gap-2">
                    <span className="text-purple-400">while</span>
                    <span className="text-yellow-300">(</span>
                    <span className="text-white">vivo</span>
                    <span className="text-yellow-300">)</span>
                    <span className="text-yellow-300">{`{`}</span>
                  </div>
                  <div className="pl-6 text-cyan-400">developer.crea(futuro);</div>
                  <div className="text-yellow-300">{`}`}</div>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">Chi Sono?</h2>
            <h3 className="text-4xl font-display font-bold text-white mb-6">
              Non solo semplici <br /> <span className="text-gray-500">Righe di Codice.</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Sono un artigiano digitale che unisce immaginazione e realtà. Il mio viaggio è iniziato nel mondo del gaming, dove ho imparato che ogni pixel conta e le prestazioni sono fondamentali. Oggi applico gli stessi principi per costruire soluzioni web robuste e sistemi intelligenti.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-400/50 transition-colors">
                <Gamepad2 className="text-cyan-400 mb-3" size={32} />
                <span className="font-display font-bold text-sm">Gamer</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-400/50 transition-colors">
                <Zap className="text-purple-400 mb-3" size={32} />
                <span className="font-display font-bold text-sm">Innovatore</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-400/50 transition-colors">
                <Coffee className="text-yellow-400 mb-3" size={32} />
                <span className="font-display font-bold text-sm">Instancabile</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;