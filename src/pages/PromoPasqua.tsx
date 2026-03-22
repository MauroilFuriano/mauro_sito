import React, { useEffect, useState } from 'react';
import { Gift, Clock, CheckCircle, ArrowRight, MessageCircle, Sparkles, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const DEADLINE = new Date('2026-04-20T23:59:59');

function useCountdown(target: Date) {
    const calc = () => {
        const diff = Math.max(0, target.getTime() - Date.now());
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000),
            expired: diff === 0,
        };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
        const id = setInterval(() => setTime(calc), 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

const PromoPasqua: React.FC = () => {
    const countdown = useCountdown(DEADLINE);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const whatsappUrl =
        'https://wa.me/393480029661?text=Ciao%20Mauro%2C%20sono%20interessato%20alla%20Promo%20Pasqua%202026%20con%20lo%20sconto%20del%2030%25.%20Vorrei%20saperne%20di%20pi%C3%B9!';

    return (
        <div className="min-h-screen bg-dark-900 text-gray-200 selection:bg-amber-400 selection:text-black">
            <SEO
                title="Promo Pasqua 2026 | -30% Sito Web + SEO/GEO | MAURO.EXE"
                description="Offerta di Pasqua: 30% di sconto sulla creazione o rinnovo del tuo sito web con ottimizzazione SEO/GEO 2026. Solo 3 posti disponibili. Scade il 20 Aprile."
                canonical="https://www.mauroceccarelli.it/promo-pasqua"
                keywords="Promo Pasqua Sito Web, Sconto Sito Web, Offerta SEO 2026, Sviluppatore Web Ascoli Piceno, Promo Pasqua"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'Offer',
                    name: 'Promo Pasqua 2026 - Sito Web + SEO/GEO',
                    description:
                        'Sconto del 30% sulla creazione o rinnovo sito web con ottimizzazione SEO e GEO aggiornata al 2026. Include chatbot AI opzionale.',
                    priceCurrency: 'EUR',
                    availability: 'https://schema.org/LimitedAvailability',
                    validFrom: '2026-03-22',
                    validThrough: '2026-04-20',
                    seller: { '@id': 'https://www.mauroceccarelli.it/#person' },
                    url: 'https://www.mauroceccarelli.it/promo-pasqua',
                }}
            />

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 flex items-center justify-center bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                            <span className="text-amber-400 font-bold text-xl leading-none">&gt;_</span>
                        </div>
                        <span className="font-bold text-lg tracking-wider text-white">MAURO.EXE</span>
                    </a>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-amber-400">
                        <Gift className="h-4 w-4" />
                        <span>Offerta Limitata</span>
                    </div>
                </div>
            </header>

            <main className="pt-20">
                {/* Hero */}
                <section className="relative px-6 pt-16 pb-20 overflow-hidden">
                    {/* Glow effects */}
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-amber-500/30 rounded-full bg-amber-500/10 backdrop-blur-sm">
                            <Gift className="h-4 w-4 text-amber-400" />
                            <span className="text-amber-400 font-medium text-sm tracking-wide uppercase">
                                Promo Pasqua 2026
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            <span className="text-amber-400">-30%</span> sul tuo nuovo sito web
                            <br />
                            <span className="text-white">con SEO/GEO 2026</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Creazione o rinnovo completo del tuo sito, ottimizzato per Google, AI e ricerca locale.
                            Un investimento che lavora per te 24 ore su 24.
                        </p>

                        {/* Countdown */}
                        {!countdown.expired && (
                            <div className="mb-12">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                                    <Clock className="h-4 w-4" />
                                    <span>L'offerta scade il 20 Aprile 2026</span>
                                </div>
                                <div className="flex justify-center gap-3 md:gap-4">
                                    {[
                                        { value: countdown.days, label: 'Giorni' },
                                        { value: countdown.hours, label: 'Ore' },
                                        { value: countdown.minutes, label: 'Min' },
                                        { value: countdown.seconds, label: 'Sec' },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex flex-col items-center bg-dark-800 border border-white/5 rounded-xl px-4 py-3 min-w-[70px]"
                                        >
                                            <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                                                {String(item.value).padStart(2, '0')}
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA primary */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-[#25D366] rounded-full hover:bg-[#20bd5a] shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            <span className="text-lg">Scrivimi su WhatsApp</span>
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <p className="mt-4 text-sm text-gray-500">Nessun impegno. Parliamone e vediamo se fa per te.</p>
                    </div>
                </section>

                {/* Cosa include */}
                <section className="px-6 py-20 border-t border-white/5">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
                            Cosa include l'offerta
                        </h2>
                        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
                            Tutto quello che serve alla tua attività per essere trovata online nel 2026.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Sparkles,
                                    title: 'Sito Web Professionale',
                                    desc: 'Design moderno, veloce, responsive. Ottimizzato per convertire visitatori in clienti.',
                                },
                                {
                                    icon: Shield,
                                    title: 'SEO/GEO 2026',
                                    desc: 'Ottimizzazione per Google, AI Overviews e ricerca locale. Schema Markup, llms.txt, Core Web Vitals.',
                                },
                                {
                                    icon: MessageCircle,
                                    title: 'Chatbot AI (Opzionale)',
                                    desc: 'Assistente virtuale che risponde ai tuoi clienti 24/7 in multilingua. Prenota, vende, informa.',
                                },
                                {
                                    icon: Gift,
                                    title: 'Google Business Profile',
                                    desc: 'Configurazione completa del profilo Google per apparire nelle ricerche locali e su Maps.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="p-6 rounded-xl bg-dark-800 border border-white/5 hover:border-amber-500/20 transition-colors"
                                >
                                    <item.icon className="h-8 w-8 text-amber-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Urgency + Social Proof */}
                <section className="px-6 py-20 border-t border-white/5">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-red-400 text-sm font-medium">Solo 3 posti disponibili</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Perché solo 3 posti?
                        </h2>
                        <p className="text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto">
                            Lavoro da solo e seguo ogni progetto personalmente. Per garantire qualità e attenzione, accetto
                            un massimo di 3 progetti con questa promo. Quando sono occupati, l'offerta si chiude.
                        </p>

                        {/* Trust signals */}
                        <div className="flex flex-wrap justify-center gap-6 mb-12">
                            {[
                                'Sviluppatore verificato',
                                'Ascoli Piceno, Marche',
                                'Progetti consegnati con successo',
                            ].map((text) => (
                                <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                                    <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Final CTA */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-300 bg-amber-400 rounded-full hover:bg-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                        >
                            <Gift className="mr-2 h-5 w-5" />
                            <span className="text-lg">Voglio il 30% di sconto</span>
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <p className="mt-4 text-sm text-gray-500">
                            Rispondò personalmente entro poche ore.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center border-t border-white/5">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} Mauro Ceccarelli. Tutti i diritti riservati.
                </p>
            </footer>
        </div>
    );
};

export default PromoPasqua;
