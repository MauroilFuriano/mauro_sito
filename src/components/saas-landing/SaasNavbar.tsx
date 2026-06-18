import React from 'react';
import { ArrowRight, Hexagon } from 'lucide-react';

const SaasNavbar: React.FC = () => {
    return (
        <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="relative">
                            <Hexagon className="h-8 w-8 text-emerald-500" />
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Nexus<span className="text-emerald-500">SaaS</span>
                        </span>
                    </div>

                    {/* Azioni Destre (Solo CTA Principale) */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://dashboard-theta-khaki-71.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-3 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-white transition-all duration-200 bg-emerald-500 border border-transparent rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 focus:ring-offset-slate-900 whitespace-nowrap"
                        >
                            <span className="md:hidden">Esplora</span>
                            <span className="hidden md:inline">Esplora Dashboard</span>
                            <ArrowRight className="ml-1 md:ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            {/* Glow effec sulle CTA primarie */}
                            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-20 blur group-hover:opacity-40 transition duration-200"></div>
                        </a>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default SaasNavbar;
