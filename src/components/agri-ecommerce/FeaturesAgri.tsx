import React from 'react';
import { Bot, Store, LineChart, Cpu, Leaf, MessageSquare } from 'lucide-react';

const features = [
    {
        title: "Il tuo Negozio non Chiude Mai",
        description: "Vendi il tuo miele, formaggio o vino alle 3 di notte. Mentre riposi, goditi un sistema e-commerce che raccoglie ordini e pagamenti senza interruzioni.",
        icon: <Store className="w-8 h-8 text-amber-400" />,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
    },
    {
        title: "Chatbot Intelligente (AI)",
        description: "Un assistente virtuale addestrato sui tuoi prodotti risponde ai dubbi dei clienti in millisecondi. Consiglia gli abbinamenti perfetti e guida all'acquisto.",
        icon: <Bot className="w-8 h-8 text-emerald-400" />,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]"
    },
    {
        title: "Maggiore Conversione",
        description: "Più assistenza in tempo reale significa meno carrelli abbandonati. Trasforma subito i visitatori curiosi in clienti affezionati del tuo brand.",
        icon: <LineChart className="w-8 h-8 text-amber-400" />,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
    },
    {
        title: "Nessun Ingarbuglio Tecnico",
        description: "Dimentica la gestione complicata. Creiamo l'architettura su misura per te, facile da usare, e ci occupiamo di tutta la manutenzione tecnologica.",
        icon: <Cpu className="w-8 h-8 text-emerald-400" />,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]"
    },
    {
        title: "Focus sull'Eccellenza",
        description: "Tu coltivi la terra e produci eccellenza. Noi costruiamo la macchina digitale che valorizza la tua storia e distribuisce i tuoi prodotti nel mondo.",
        icon: <Leaf className="w-8 h-8 text-amber-400" />,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
    },
    {
        title: "Fidelizzazione via WhatsApp & Email",
        description: "Invia promozioni mirate, ricette o suggerimenti per la conservazione in modo automatico. Rendi unica l'esperienza dei tuoi acquirenti.",
        icon: <MessageSquare className="w-8 h-8 text-emerald-400" />,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]"
    }
];

const FeaturesAgri: React.FC = () => {
    return (
        <section className="py-24 relative bg-dark-900" id="vantaggi">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Coltiva i Tuoi Prodotti. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                            Alla Vendita Pensa l'AI.
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Un sistema e-commerce integrato che non si limita a mostrare i prodotti, ma li vende attivamente grazie all'intelligenza artificiale, permettendoti di concentrarti su ciò che sai fare meglio: la produzione.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className={`reveal delay-${(index % 3) * 100} group bg-dark-800 border border-white/5 p-8 rounded-2xl transition-all duration-300 hover:bg-dark-800/80 hover:-translate-y-2 relative overflow-hidden ${feature.glowColor}`}
                        >
                            {/* Decorative background glow on hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                            
                            <div className="w-16 h-16 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                                {feature.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed relative z-10">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesAgri;
