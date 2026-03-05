import React from 'react';
import { MessageSquare, CalendarCheck, Globe2 } from 'lucide-react';

const DemoSection: React.FC = () => {
    return (
        <section id="demo" className="relative py-24 px-6 bg-dark-900 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Non è una semplice chat. È un vero <span className="text-cyan-400 glow-text">Concierge che non sbaglia mai</span>.
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Video Player */}
                    <div className="reveal rounded-2xl overflow-hidden glow-box bg-dark-800 border border-white/10 aspect-video relative">
                        <iframe
                            src="https://www.youtube.com/embed/olECVYumod8?autoplay=1&mute=1&controls=0&loop=1&playlist=olECVYumod8&showinfo=0&rel=0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                            title="hotel_ai_demo"
                        ></iframe>
                    </div>

                    {/* Features */}
                    <div className="space-y-8">
                        <div className="reveal group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors duration-300 hover:bg-white/10">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-cyan-400/10 text-cyan-400">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-white">Capisce il linguaggio naturale</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        L'utente scrive come se parlasse a un umano. Niente comandi rigidi o menu limitanti: capisce il contesto, lo slang e le richieste complesse.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="reveal group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors duration-300 hover:bg-white/10" style={{ transitionDelay: '100ms' }}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                                    <CalendarCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-white">Corregge gli errori dei clienti</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Come si vede nel video, l'AI rileva incoerenze sulle date (es. check-in 28 Marzo, check-out 1 Marzo) e guida l'utente a correggere senza far saltare la prenotazione.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="reveal group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors duration-300 hover:bg-white/10" style={{ transitionDelay: '200ms' }}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-cyan-400/10 text-cyan-400">
                                    <Globe2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-white">Multilingua istantaneo</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Risponde perfettamente a turisti da tutto il mondo nella loro lingua madre, abbattendo ogni barriera linguistica.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
