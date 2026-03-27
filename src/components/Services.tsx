import React from 'react';
import { Globe, Bot, Smartphone, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: string;
  startingPrice: string;
  originalPrice?: string;
  isMostRequested?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, delay, startingPrice, originalPrice, isMostRequested }) => (
  <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-400/50 hover:to-transparent transition-all duration-500 hover:scale-[1.02]">
    {isMostRequested && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
        <span className="bg-cyan-400 text-dark-900 text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-[0_0_16px_rgba(0,229,255,0.5)]">
          PIÙ RICHIESTO
        </span>
      </div>
    )}

    <div className="bg-dark-900 rounded-2xl p-8 h-full relative z-10 flex flex-col items-start transition-colors">
      <div className="w-14 h-14 bg-dark-800 rounded-lg flex items-center justify-center mb-6 border border-white/5 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-500">
        <div className="text-gray-300 group-hover:text-cyan-400 transition-colors">
          {icon}
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 mb-6 leading-relaxed flex-1">
        {description}
      </p>

      {/* Features List Elegante */}
      <ul className="mb-8 space-y-3 w-full border-t border-white/5 pt-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300 text-sm font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0 opacity-80" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a href="#contact" className="mt-auto flex items-center gap-2 text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
        PARLIAMONE ORA <ArrowRight size={16} />
      </a>
      <p className="text-xs text-gray-600 mt-3">
        {originalPrice && (
          <span className="line-through text-gray-600 mr-1">{originalPrice}</span>
        )}
        · {startingPrice}
      </p>
      <p className="text-xs text-gray-500 mt-2">✓ Prima call gratuita · ✓ Preventivo senza impegno</p>
    </div>

    {/* Glow Underlay Sober */}
    <div className="absolute inset-0 bg-cyan-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">Le Mie Competenze</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white glow-text">
            Soluzioni Digitali
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Globe size={32} />}
            title="Sviluppo Web"
            description="Siti web fulminei che trattengono gli utenti e triplicano le vendite sul tuo e-commerce, superando la lentezza dei siti tradizionali."
            features={[
              "Esperienza utente intuitiva e fluida",
              "Sistemi E-commerce ad alta conversione",
              "Gestione dei contenuti semplificata"
            ]}
            delay="0"
            startingPrice="A partire da €1.200"
          />
          <ServiceCard
            icon={<Bot size={32} />}
            title="Chatbot & IA"
            description="Assistenti virtuali perfetti che qualificano i contatti e rispondono ai tuoi clienti 24/7, mentre tu dormi o ti dedichi ad altro."
            features={[
              "Assistenza clienti sempre attiva",
              "Qualificazione automatica dei contatti",
              "Risposte intelligenti ed immediate"
            ]}
            delay="100"
            startingPrice="A partire da €3.500"
            originalPrice="€4.200"
            isMostRequested
          />
          <ServiceCard
            icon={<Smartphone size={32} />}
            title="App Su Misura"
            description="Colleghiamo i tuoi software aziendali per eliminare i noiosi lavori manuali di copia-incolla dei tuoi dipendenti."
            features={[
              "Automazione delle attività ripetitive",
              "Sincronizzazione dati tra gestionali",
              "Piattaforme cloud scalabili e sicure"
            ]}
            delay="200"
            startingPrice="A partire da €8.000"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;