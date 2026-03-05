import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

const ProblemSolution: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-[#050505] border-t border-white/5 relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Da <span className="text-red-400">ostaggio delle piattaforme</span> a <span className="text-cyan-400 glow-text">brand indipendente</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Problema */}
                    <div className="reveal p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-red-500/20 rounded-xl">
                                <XCircle className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-200">Se non hai un sito (o se è vecchio)</h3>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-lg">
                            Sei completamente in ostaggio delle piattaforme. Se l'algoritmo decide di nasconderti, la tua struttura si svuota. I turisti che cercano il tuo nome su Google trovano solo i link delle agenzie e tu perdi il controllo del tuo brand (e un sacco di soldi in commissioni).
                        </p>
                    </div>

                    {/* Soluzione */}
                    <div className="reveal p-8 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-transparent border border-cyan-400/30 glow-box" style={{ transitionDelay: '100ms' }}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-cyan-400/20 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                                <CheckCircle2 className="h-8 w-8 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Con il nostro ecosistema Web + AI</h3>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-lg">
                            Diventi padrone delle tue prenotazioni. Hai una piattaforma di tua proprietà, bellissima da vedere e con una tecnologia (l'AI) che i tuoi concorrenti locali si sognano.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
