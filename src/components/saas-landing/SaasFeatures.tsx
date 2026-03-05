import React from 'react';
import { ShieldCheck, CreditCard, LayoutDashboard, BellRing } from 'lucide-react';

const features = [
    {
        icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
        title: 'Area Clienti Sicura',
        description: 'Autenticazione protetta per permettere ai tuoi acquirenti di accedere ai propri ordini in totale autonomia.'
    },
    {
        icon: <CreditCard className="w-6 h-6 text-cyan-500" />,
        title: 'Pagamenti Integrati',
        description: 'Accetta pagamenti con carte, Apple Pay e Google Pay direttamente sul tuo store, alle tue condizioni.'
    },
    {
        icon: <LayoutDashboard className="w-6 h-6 text-indigo-500" />,
        title: 'Gestione Ordini Integrata',
        description: 'Un unico pannello di controllo privato per gestire inventario, evadere spedizioni e monitorare le vendite.'
    },
    {
        icon: <BellRing className="w-6 h-6 text-amber-500" />,
        title: 'Notifiche in Tempo Reale',
        description: 'Ricevi avvisi istantanei ad ogni nuova vendita e aggiorna in automatico i clienti sullo stato della spedizione.'
    }
];

const SaasFeatures: React.FC = () => {
    return (
        <section className="py-24 bg-slate-950 relative border-t border-slate-900">

            {/* Background Decorativo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Tutto sotto controllo, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            nella tua Dashboard.
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        Liberati delle piattaforme retail standard. Ti forniamo un sistema gestionale su misura per il tuo E-commerce, di tua proprietà e costruito per durare.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 badge-glow">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SaasFeatures;
