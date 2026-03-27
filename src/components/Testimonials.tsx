import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Maicol Ceccarelli",
    role: "Drone Pilot Professionista",
    company: "maicolceccarelli.it",
    text: "Ragazzo serio e professionale, oltre ogni mia aspettativa. Il sito che ha fatto a me è stupendo! Veramente bravo Mauro 👏",
    initials: "MC",
    gradient: "from-cyan-400 to-cyan-600",
    verified: true
  },
  {
    name: "Sara Benedetti",
    role: "Responsabile Marketing",
    company: "Studio Legale Benedetti & Associati",
    text: "Nelle prime due settimane dal lancio del nuovo sito le richieste di consulenza sono triplicate. Il design è professionale e i clienti ci trovano subito su Google.",
    initials: "SB",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    name: "Marco Ciabattoni",
    role: "CEO",
    company: "Ciabattoni Costruzioni Srl, Marche",
    text: "Avevo bisogno di un gestionale su misura per i cantieri. Mauro ha consegnato tutto in 3 settimane, codice pulito e senza sorprese. Lo richiamerò per il prossimo progetto.",
    initials: "MC",
    gradient: "from-green-400 to-green-600"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">
            Clienti Soddisfatti
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white glow-text">
            Cosa Dicono i Clienti
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-400/40 hover:to-transparent transition-all duration-500"
            >
              <div className="bg-dark-800 rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
                {/* Stars + verified badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  {'verified' in t && t.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 border border-white/10 rounded-full px-2 py-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                      Recensione Google
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-8 italic">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-display font-bold text-xs">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-cyan-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
