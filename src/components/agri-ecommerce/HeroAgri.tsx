import React from 'react';
import { Leaf, Bot, TrendingUp, ShoppingCart } from 'lucide-react';

const HeroAgri: React.FC = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
            {/* Background Sfumato Naturale */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-dark-900"></div>
                
                {/* Glow Emerald/Amber */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
                
                {/* Pattern Grid leggero */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Colonna Testo (Copywright framework PAS/AIDA) */}
                <div className="reveal">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8 backdrop-blur-sm">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-400 font-mono text-sm uppercase tracking-wider">
                            Agri-Food E-commerce & AI
                        </span>
                    </div>

                    {/* Problem / Hook */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                        I tuoi Prodotti sono d'Eccellenza.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400 glitch-text" data-text="Ma chi li vende la notte?">
                            Ma chi li vende la notte?
                        </span>
                    </h1>

                    {/* Agitation / Solution */}
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
                        Vino, miele, formaggi: coltivi e produci la qualità, ma gestire ordini e clienti porta via il tuo tempo prezioso.
                        Entra nel futuro con un <span className="text-emerald-300 font-semibold">E-commerce Autopilota</span> dotato di <span className="text-amber-300 font-semibold">Intelligenza Artificiale</span>. Un Chatbot vende e assiste i tuoi clienti 24/7.
                    </p>

                    {/* Pulsanti rimossi su richiesta per focalizzare l'header sul messaggio */}

                    <div className="mt-10 flex items-center gap-6 text-sm text-gray-500 font-mono">
                        <div className="flex items-center gap-2">
                            <ShoppingCart size={16} className="text-emerald-500" />
                            <span>Ordini +34%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bot size={16} className="text-amber-500" />
                            <span>Attivo 24/7/365</span>
                        </div>
                    </div>
                </div>

                {/* Colonna Visiva / Dashboard Mockup */}
                <div className="relative reveal delay-200 hidden lg:block">
                    {/* Elemento fluttuante decorativo */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                    
                    <div className="relative rounded-2xl border border-white/10 bg-dark-800/80 backdrop-blur-xl p-6 shadow-2xl">
                        {/* Browser Header */}
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="mx-auto bg-dark-900 rounded-md px-4 py-1 flex items-center gap-2 text-xs text-gray-500 font-mono">
                                <Leaf size={12} className="text-emerald-400" />
                                tenuta.tuosito.it
                            </div>
                        </div>

                        {/* Mockup E-commerce */}
                        <div className="space-y-4">
                            <div className="aspect-video bg-dark-900 rounded-lg overflow-hidden relative group">
                                <img 
                                  src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1000&auto=format&fit=crop" 
                                  alt="Vigneti e vino" 
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-xl font-bold text-white">Vino & Tradizione</h3>
                                    <p className="text-emerald-400 text-sm">Shop Online Attivo</p>
                                </div>
                            </div>

                            {/* Chatbot Overlay Simulation */}
                            <div className="absolute -bottom-6 -right-6 bg-dark-800 border border-emerald-500/30 rounded-2xl p-4 shadow-xl w-64 transform transition-transform hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-2">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Bot size={16} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">AI Sommelier</div>
                                        <div className="text-xs text-green-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-dark-900 rounded-lg p-3 text-sm text-gray-300">
                                    "Buongiorno! Cerchi un rosso fermo per accompagnare formaggi stagionati? Posso suggerirti il nostro..."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroAgri;
