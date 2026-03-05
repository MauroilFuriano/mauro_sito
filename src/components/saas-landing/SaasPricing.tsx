import React from 'react';
import { Check } from 'lucide-react';

const plans = [
    {
        name: 'SaaS Starter',
        description: 'Ideale per validare la tua idea sul mercato.',
        price: '99',
        period: '/mo',
        features: [
            'Pannello Autenticazione',
            'Dashboard Area Riservata',
            'Integrazione Stripe Checkout',
            'Database in Cloud',
            'Supporto Email'
        ],
        buttonText: 'Inizia Sviluppo',
        popular: false,
        gradient: 'from-slate-800 to-slate-900',
        border: 'border-slate-800'
    },
    {
        name: 'Nexus Pro',
        description: 'L\'infrastruttura completa per scalare.',
        price: '249',
        period: '/mo',
        features: [
            'Tutto nel piano Starter',
            'Abbonamenti Ricorrenti Multi-tier',
            'Sistema Notifiche Real-Time',
            'Integrazione API Esterne',
            'Role-Based Access (Admin/User)',
            'Server Dedicato'
        ],
        buttonText: 'Prenota Sessione',
        popular: true,
        gradient: 'from-slate-900 to-emerald-950/20',
        border: 'border-emerald-500/50'
    }
];

const SaasPricing: React.FC = () => {
    return (
        <section className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Piani chiari. Zero sorprese.
                    </h2>
                    <p className="text-lg text-slate-400">
                        Scegli il piano di sviluppo adatto alla fase del tuo progetto. Gestiamo dall'MVP fino all'applicazione enterprise pronta per migliaia di utenti.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-2xl bg-gradient-to-b ${plan.gradient} border ${plan.border} flex flex-col`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-slate-400 text-sm h-10">{plan.description}</p>
                            </div>

                            <div className="mb-8 flex items-baseline text-white">
                                <span className="text-5xl font-extrabold tracking-tight">€{plan.price}</span>
                                <span className="text-slate-500 ml-1 font-medium">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, featureIdx) => (
                                    <li key={featureIdx} className="flex items-start text-slate-300">
                                        <Check className="h-5 w-5 text-emerald-500 mr-3 shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={plan.popular ? "https://dashboard-theta-khaki-71.vercel.app/" : "mailto:tuamail@esempio.com"}
                                className={`w-full py-4 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${plan.popular
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                                        : 'bg-slate-800 text-white hover:bg-slate-700'
                                    }`}
                            >
                                {plan.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SaasPricing;
