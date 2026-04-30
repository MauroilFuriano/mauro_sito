import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const TERMINAL_LINES = [
  { text: 'initializing_core_systems...', type: 'system' },
  { text: 'loading_advanced_ai_models_2026...', type: 'system' },
  { text: 'establishing_neural_connection...', type: 'system' },
  { text: 'status: online', type: 'success' },
  { text: '> user: "Voglio scavalcare la concorrenza online"', type: 'user' },
  { text: '> system: Analisi competitor in corso...', type: 'system' },
  { text: '> system: Generazione strategia SEO & AI...', type: 'system' },
  { text: '> system: Ottimizzazione conversione: 100%', type: 'success' },
  { text: '> bot: Il tuo nuovo sito è pronto per dominare.', type: 'bot' }
];

const CodeTerminal: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showTerminal && visibleLines < TERMINAL_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 400 + Math.random() * 600);
      return () => clearTimeout(timer);
    }
  }, [showTerminal, visibleLines]);

  return (
    <div className={`w-full max-w-2xl transition-all duration-1000 transform ${showTerminal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="relative">
        {/* Effetto Glow Sotto il Terminale */}
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-2xl rounded-[2rem] opacity-50" />
        
        <div className="relative bg-[#0d0d1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl isolate-blur">
          {/* Header Terminale */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-xs text-gray-500 font-mono italic">mauro-ceccarelli.ai / v2.6</div>
          </div>

          {/* Contenuto Terminale */}
          <div className="p-6 font-mono text-sm sm:text-base min-h-[320px]">
            {TERMINAL_LINES.slice(0, visibleLines).map((line, idx) => (
              <div key={idx} className={`mb-2 leading-relaxed ${
                line.type === 'success' ? 'text-green-400' : 
                line.type === 'bot' ? 'text-cyan-400' : 
                line.type === 'user' ? 'text-purple-400' : 
                'text-gray-300'
              }`}>
                {line.text}
              </div>
            ))}
            {visibleLines < TERMINAL_LINES.length && (
              <span className="inline-block w-2 h-5 bg-cyan-500 animate-blink" />
            )}
          </div>
        </div>

        {/* Floating Notification */}
        <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl animate-float max-w-[220px] hidden md:block isolate-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Shield className="text-cyan-400" size={20} />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Security Layer</div>
              <div className="text-sm font-bold text-white">AI Protected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
