import React from 'react';
import { Bot, MessageCircle } from 'lucide-react';

const CTASection: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-dark-900 border-t border-white/5 relative">
            <div className="max-w-4xl mx-auto text-center">
                <div className="reveal mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Pronto a far riposare la tua reception e <span className="text-cyan-400 glow-text">aumentare i margini?</span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-12">
                        Prova subito il concierge in azione, oppure fissa una chiacchierata informale con me su WhatsApp.
                    </p>
                </div>

                <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10" style={{ transitionDelay: '200ms' }}>
                    <a
                        href="https://hotel-automatico.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            // Tracciamento evento Demo
                            (window as any).fbq?.('trackCustom', 'ClickDemoButton');
                            (window as any).gtag?.('event', 'click_demo', { event_category: 'Lead' });
                        }}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-300 bg-cyan-400 rounded-full hover:bg-cyan-300 animate-glow-pulse w-full sm:w-auto"
                    >
                        <Bot className="mr-2 h-6 w-6" />
                        <span className="text-lg">Prova tu stesso il Bot in diretta</span>
                        <div className="absolute inset-0 h-full w-full rounded-full transition-all duration-300 opacity-0 group-hover:opacity-20 bg-white" />
                    </a>

                    <a
                        href="https://wa.me/393480029661?text=Ciao%20Mauro%2C%20ho%20visto%20il%20video%20dell%27AI%20per%20gli%20hotel%20e%20vorrei%20farti%20una%20domanda..."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            // Tracciamento evento WhatsApp Lead
                            (window as any).fbq?.('track', 'Contact');
                            (window as any).gtag?.('event', 'click_whatsapp', { event_category: 'Lead' });
                        }}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-[#25D366] rounded-full hover:bg-[#20bd5a] w-full sm:w-auto shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)]"
                    >
                        <MessageCircle className="mr-2 h-6 w-6" />
                        <span className="text-lg">Scrivimi su WhatsApp (senza impegno)</span>
                        <div className="absolute inset-0 h-full w-full rounded-full transition-all duration-300 opacity-0 group-hover:opacity-10 bg-black" />
                    </a>
                </div>

                {/* Branding Footer per Landing isolata */}
                <div className="mt-24 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Mauro Ceccarelli. Tutti i diritti riservati.</p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;

