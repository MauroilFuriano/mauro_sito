import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';

const OfferSection: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-dark-900 border-t border-white/5 relative overflow-hidden">
            {/* Decoro di background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="reveal p-1 bg-gradient-to-r from-purple-500/50 via-cyan-400/50 to-purple-500/50 rounded-3xl animate-glow-pulse">
                    <div className="p-8 md:p-12 bg-dark-900 rounded-[23px] text-center">

                        <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-full mb-6">
                            <Star className="w-8 h-8 text-purple-400" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Dimentica i problemi tecnici.</span> Facciamo tutto noi.
                        </h2>

                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto">
                            Non dovrai impazzire con server, domini o programmazione. Progettiamo l'interfaccia, scriviamo il codice, addestriamo l'Intelligenza Artificiale sulle regole del tuo Hotel e ti consegniamo le chiavi in mano di una piattaforma pronta a fatturare. Tu devi solo preparare le camere per i nuovi ospiti.
                        </p>

                        <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-semibold mb-8 text-sm tracking-wide">
                            Attenzione: Aggiungiamo al nostro portfolio massimo 2 strutture al mese per garantire un livello di servizio altamente personalizzato.
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                <span>Zero Rischi</span>
                            </div>
                            <div className="hidden sm:block text-gray-700">•</div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                <span>Nessun costo nascosto</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferSection;
