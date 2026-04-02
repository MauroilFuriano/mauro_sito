import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

// [REGOLA PICCO-FINE] Questa sezione è l'ultimo "picco" emotivo prima del footer.
// L'utente ricorderà questa frase molto più del form di contatto.
// Copy basato su Pattern Interruption + Loss Aversion + Call to Identity.

const ClosingCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const waMsg = encodeURIComponent(
    'Ciao Mauro! Ho visto il tuo sito e vorrei parlare del mio progetto. Quando sei disponibile?'
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Sezione finale — Chiamata all'azione"
      className="relative py-24 overflow-hidden"
    >
      {/* Ambient glow di sfondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-400/5 rounded-full blur-[100px]" />
      </div>

      {/* Linea separatrice top */}
      <div className="max-w-4xl mx-auto px-6 border-t border-white/5 pt-24">

        {/* Corpo principale */}
        <div
          className="text-center space-y-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* [PATTERN INTERRUPTION] Frase breve ad alto contrasto emotivo */}
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-bold">
            Sei arrivato fin qui.
          </p>

          {/* [LOSS AVERSION + CALL TO IDENTITY] Headline finale */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Il tuo competitor{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              forse no.
            </span>
          </h2>

          {/* Sottotitolo — rinforzo narrativo */}
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Ogni giorno senza un sito che converte è un giorno in cui qualcun altro
            prende i tuoi clienti. Il momento migliore per agire è adesso.
          </p>

          {/* CTA principale — WhatsApp (risposta immediata, bassa frizione) */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
            }}
          >
            <a
              href={`https://wa.me/393480029661?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              id="closing-cta-whatsapp"
              className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-400 text-black font-display font-bold text-lg rounded-xl
                         hover:bg-cyan-300 transition-all duration-300
                         shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.6)]
                         group"
            >
              {/* WhatsApp icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Parliamoci su WhatsApp
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Micro-garanzie finali — abbattono le ultime obiezioni */}
          <p className="text-xs text-gray-600 tracking-wide">
            Rispondo entro 2 ore · Nessun impegno · Consulenza iniziale gratuita
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
