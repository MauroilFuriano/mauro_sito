import React from 'react';
import { ArrowRight, Lock, Database, Zap } from 'lucide-react';

const SaasHero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

            {/* Background Decorativo (Glow) */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-4xl mx-auto">

                    {/* Eyebrow badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        <span className="text-sm font-medium text-slate-300">Trasforma la tua Visione in Software</span>
                    </div>

                    {/* Headline H1 */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white">
                        La tua Dashboard
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500"> E-commerce</span> Professionale
                    </h1>

                    {/* Sottotitolo */}
                    <p className="mt-6 text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                        Gestisci vendite, clienti e ordini in tempo reale. Affidati a noi per costruire il gestionale su misura per il tuo negozio, abbattendo i costi di abbonamento delle multinazionali.
                    </p>

                    {/* CTA Group */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://wa.me/393480029661?text=Ciao%20Mauro,%20vorrei%20informazioni%20per%20creare%20una%20dashboard%20e-commerce%20personalizzata."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex w-full sm:w-auto items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-emerald-500 rounded-xl hover:bg-emerald-400 hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                        >
                            <span>Contattami su WhatsApp</span>
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="https://dashboard-theta-khaki-71.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full sm:w-auto items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/50 backdrop-blur-sm shadow-xl"
                        >
                            Esplora la Dashboard
                        </a>
                    </div>

                    {/* Mini-Features text uder CTAs */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-emerald-500" />
                            <span>Auth Sicura Integrata</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-cyan-500" />
                            <span>Database Scalabile</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span>Alte Prestazioni</span>
                        </div>
                    </div>

                </div>

                {/* Mockup Dashboard Placeholder */}
                <div className="mt-20 relative mx-auto max-w-5xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                    <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden aspect-video">
                        {/* Struttura mock della Dashboard SaaS */}
                        <div className="absolute top-0 w-full h-12 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                            </div>
                        </div>
                        {/* TBD: Inserire qui magari un'immagine del design della dashboard o un iframe se performante */}
                        <div className="w-full h-full pt-12 flex bg-slate-950/50">
                            {/* Mockup Sidebar */}
                            <div className="w-1/4 h-full border-r border-slate-800/80 p-4 hidden sm:flex flex-col gap-3">
                                <div className="h-6 w-3/4 bg-slate-800/50 rounded-md mb-4"></div>
                                <div className="h-4 w-full bg-emerald-500/20 text-emerald-500 rounded flex items-center px-2"></div>
                                <div className="h-4 w-11/12 bg-slate-800/40 rounded"></div>
                                <div className="h-4 w-4/5 bg-slate-800/40 rounded"></div>
                                <div className="h-4 w-full bg-slate-800/40 rounded"></div>
                                <div className="mt-auto h-8 w-8 bg-slate-800 rounded-full"></div>
                            </div>

                            {/* Mockup Main Content Area */}
                            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 overflow-hidden relative">
                                {/* Header (Greeting & Profile) */}
                                <div className="flex justify-between items-center bg-slate-900/40 pb-2 border-b border-slate-800/40">
                                    <div className="h-5 w-1/3 bg-slate-700/50 rounded"></div>
                                    <div className="h-6 w-6 bg-emerald-500/20 rounded-full"></div>
                                </div>

                                {/* 3 Metric Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                                        <div className="h-3 w-1/2 bg-slate-600 rounded mb-2"></div>
                                        <div className="h-6 w-3/4 bg-slate-200 rounded mb-1"></div>
                                        <div className="h-2 w-1/3 bg-emerald-500/60 rounded"></div>
                                    </div>
                                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                                        <div className="h-3 w-2/3 bg-slate-600 rounded mb-2"></div>
                                        <div className="h-6 w-1/2 bg-slate-200 rounded mb-1"></div>
                                        <div className="h-2 w-1/4 bg-emerald-500/60 rounded"></div>
                                    </div>
                                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3 sm:p-4 hidden md:block">
                                        <div className="h-3 w-1/2 bg-slate-600 rounded mb-2"></div>
                                        <div className="h-6 w-4/5 bg-slate-200 rounded mb-1"></div>
                                        <div className="h-2 w-1/2 bg-cyan-500/60 rounded"></div>
                                    </div>
                                </div>

                                {/* Chart Area */}
                                <div className="flex-1 bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 flex flex-col justify-end gap-1 relative overflow-hidden">
                                    <div className="absolute top-4 left-4 h-4 w-1/4 bg-slate-700/50 rounded"></div>
                                    <div className="flex justify-between items-end h-[70%] w-full gap-1 opacity-60">
                                        {[40, 60, 45, 80, 50, 90, 65, 100, 75].map((h, i) => (
                                            <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/60 to-cyan-500/30 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SaasHero;
