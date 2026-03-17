import React from 'react';
import { ArrowRight, Grape, CheckCircle } from 'lucide-react';

const benefits = [
    "Integrazione AI con i tuoi prodotti",
    "Gestione Ordini e Spedizioni",
    "Caricamento Prodotti Base (Vino, Formaggio, Miele, Olio)",
    "Nessun Abbonamento Nascosto"
];

const CtaAgri: React.FC = () => {
    return (
        <section className="relative py-24 overflow-hidden" id="contatti">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=2000&auto=format&fit=crop" 
                    alt="Agricoltura smart" 
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/90 to-dark-900/50"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center reveal">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full border border-emerald-500/30 mb-8">
                    <Grape className="w-10 h-10 text-emerald-400" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Metti il "Pilota Automatico" alla <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-500">
                        Tua Azienda Agricola.
                    </span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    Il mercato si muove in fretta. Non farti trovare impreparato: ottieni una Demo Gratuita e scopri come il nostro AI Chatbot può rivoluzionare la tua vendita diretta.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12 text-left">
                    {benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-400">
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span>{b}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full">
                    <a href="https://sitodemovini.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl font-bold text-white text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                        Inizia la Demo
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="https://wa.me/393480029661" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-dark-800 border border-white/10 rounded-xl font-bold text-gray-300 hover:bg-white/5 hover:border-amber-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center justify-center gap-2 group">
                        Richiedi Consulenza
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CtaAgri;
