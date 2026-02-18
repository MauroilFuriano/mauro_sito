import React from 'react';
import { Globe, Bot, Smartphone, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => (
  <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-cyan-400 hover:to-purple-600 transition-all duration-500 hover:scale-[1.02]">
    <div className="bg-dark-900 rounded-xl p-8 h-full relative z-10 flex flex-col items-start transition-colors">
      <div className="w-14 h-14 bg-dark-800 rounded-lg flex items-center justify-center mb-6 border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300">
        <div className="text-gray-300 group-hover:text-cyan-400 transition-colors">
          {icon}
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>

      <a href="#contact" className="mt-auto flex items-center gap-2 text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
        PARLIAMONE ORA <ArrowRight size={16} />
      </a>
    </div>

    {/* Glow Underlay */}
    <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
            description="Siti che convertono visitatori in clienti, non solo belle vetrine. Landing page ottimizzate, e-commerce, dashboard aziendali. ✅ Veloci ✅ Mobile-first ✅ Orientati al risultato"
            delay="0"
          />
          <ServiceCard
            icon={<Bot size={32} />}
            title="Chatbot & IA"
            description="Assistenti AI che rispondono ai clienti in tempo reale, qualificano lead e prenotano appuntamenti. Integrati con WhatsApp, Messenger e sito web. ✅ Risposta immediata ✅ Nessun cliente perso ✅ Lavora H24"
            delay="100"
          />
          <ServiceCard
            icon={<Smartphone size={32} />}
            title="App Su Misura"
            description="Automazioni e web app che ti fanno risparmiare ore ogni settimana. Dai workflow automatizzati alle integrazioni con i tuoi strumenti. ✅ Meno lavoro manuale ✅ Più efficienza ✅ Scala con te"
            delay="200"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;