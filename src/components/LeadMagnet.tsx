import React, { useState, useRef, useEffect } from 'react';
import { Download, CheckCircle, Loader2, AlertCircle, FileText } from 'lucide-react';
import emailjs from '@emailjs/browser';

const LeadMagnet: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Inserisci la tua email');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Formato email non valido');
            return;
        }

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            // Fallback: scarica direttamente se EmailJS non è configurato
            triggerDownload();
            return;
        }

        setIsSubmitting(true);

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, PUBLIC_KEY)
            .then(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
                triggerDownload();
            })
            .catch(() => {
                // Anche in caso di errore EmailJS, lascia scaricare il PDF
                setIsSubmitting(false);
                setIsSuccess(true);
                triggerDownload();
            });
    };

    const triggerDownload = () => {
        const link = document.createElement('a');
        link.href = '/checklist_7_errori.pdf';
        link.download = 'Checklist_7_Errori_Sito_Web.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Reset automatico dopo 8 secondi
    useEffect(() => {
        if (!isSuccess) return;
        const timer = setTimeout(() => {
            setIsSuccess(false);
            setEmail('');
        }, 8000);
        return () => clearTimeout(timer);
    }, [isSuccess]);

    if (isSuccess) {
        return (
            <div className="mt-4 p-5 rounded-2xl bg-dark-800/80 border border-green-500/20 backdrop-blur-sm max-w-lg">
                <div className="flex items-center gap-3 text-green-400 mb-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="font-semibold text-sm">Download avviato!</span>
                </div>
                <p className="text-gray-400 text-xs">
                    Se il download non parte,{' '}
                    <a
                        href="/checklist_7_errori.pdf"
                        download="Checklist_7_Errori_Sito_Web.pdf"
                        className="text-cyan-400 underline hover:text-cyan-300"
                    >
                        clicca qui
                    </a>
                    .
                </p>
            </div>
        );
    }

    return (
        <div id="lead-magnet" className="mt-4 p-5 rounded-2xl bg-dark-800/40 border border-white/5 backdrop-blur-sm max-w-lg">
            <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-cyan-400/10 rounded-lg flex-shrink-0">
                    <FileText className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-[13px] leading-snug">
                        Stai Perdendo Clienti Ogni Giorno? Scopri i 7 Errori Nascosti del Tuo Sito
                    </h3>
                    <p className="text-gray-500 text-[10px] mt-1">
                        PDF gratuito · Letto da 847 titolari di PMI · Risultati in 24h
                    </p>
                </div>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                {/* Campo nascosto per EmailJS */}
                <input type="hidden" name="user_name" value="Lead Magnet - Checklist 7 Errori" />
                <input type="hidden" name="subject" value="Nuovo Lead: Checklist 7 Errori" />
                <input type="hidden" name="message" value="Questo contatto ha scaricato la checklist '7 Errori'." />

                <div className="flex-1">
                    <input
                        type="email"
                        id="lead-email"
                        name="user_email"
                        aria-label="La tua email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="La tua email"
                        className={`w-full bg-dark-900/50 border ${
                            error ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-400/50'
                        } rounded-lg px-3 py-2 text-white text-xs focus:outline-none transition-all duration-300`}
                    />
                    {error && (
                        <p className="text-red-400 text-[10px] flex items-center gap-1 mt-1">
                            <AlertCircle size={10} /> {error}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-cyan-400 text-black font-bold text-xs rounded-lg hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)] disabled:opacity-70 shrink-0"
                >
                    {isSubmitting ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <>
                            <Download size={14} />
                            Scarica Gratis
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default LeadMagnet;
