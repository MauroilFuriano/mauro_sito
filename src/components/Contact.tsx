import React, { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
// Importiamo la libreria EmailJS
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  // Questo serve a "catturare" il form per inviarlo
  const form = useRef<HTMLFormElement>(null);

  // LEGGERE LE CHIAVI DAL FILE .ENV (SICUREZZA)
  // Invece di scriverle qui, le prendiamo dalle variabili d'ambiente
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: 'Richiesta Generale',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Controllo user_name invece di name
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Il nome è obbligatorio';
    }

    // Controllo user_email invece di email
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Formato email non valido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(false);

    if (validateForm() && form.current) {
      setIsSubmitting(true);

      // Controllo di sicurezza: se le chiavi mancano, avvisiamo in console
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.error("ERRORE: Variabili d'ambiente EmailJS mancanti!");
        setSendError(true);
        setIsSubmitting(false);
        return;
      }

      // Invio reale tramite EmailJS
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then((result) => {
          console.log('Email inviata:', result.text);
          setIsSubmitting(false);
          setIsSuccess(true);
          // Reset del form
          setFormData({ user_name: '', user_email: '', subject: 'Richiesta Generale', message: '' });

          setTimeout(() => setIsSuccess(false), 5000);
        }, (error) => {
          console.log('Errore invio:', error.text);
          setIsSubmitting(false);
          setSendError(true);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">Contattami</h2>
            <h3 className="text-4xl font-display font-bold text-white mb-6">
              Pronto a Trasformare <br /> <span className="text-cyan-400">il Tuo Business?</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-md whitespace-pre-line">
              Prenota un'analisi gratuita di 30 minuti.
              Parliamo del tuo progetto e ti mostro come posso aiutarti.

              ✓ Nessun costo ✓ Nessun impegno ✓ Risposta in 24h
            </p>

            <div className="space-y-6">
              {/* --- Email Block --- */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dark-900 rounded-full flex items-center justify-center border border-white/10 text-cyan-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white">Email</h4>
                  <p className="text-gray-400">ceccarellimauro3@gmail.com</p>
                </div>
              </div>

              {/* --- WhatsApp Block (NUOVO) --- */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dark-900 rounded-full flex items-center justify-center border border-white/10 text-green-400">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white">WhatsApp</h4>
                  <a
                    href="https://wa.me/393480029661"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    +39 348 00 29 661
                  </a>
                </div>
              </div>

              {/* --- Location Block --- */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dark-900 rounded-full flex items-center justify-center border border-white/10 text-purple-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white">Posizione</h4>
                  <p className="text-gray-400">Ascoli Piceno, Italia / Remoto</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-900 p-8 rounded-2xl border border-white/5 relative shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Send size={100} />
            </div>

            {isSuccess && (
              <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-2xl text-center p-6 animate-fade-in">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Messaggio Inviato!</h3>
                <p className="text-gray-400">Grazie per avermi contattato. Risponderò alla velocità della luce.</p>
              </div>
            )}

            {sendError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                Errore nell'invio. Controlla la connessione o scrivimi direttamente via email.
              </div>
            )}

            <form ref={form} className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className={`w-full bg-dark-800 border ${errors.user_name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-400'} rounded-lg p-3 text-white focus:outline-none focus:shadow-[0_0_20px_rgba(0,229,255,0.3)] focus:bg-dark-950 focus:scale-[1.02] focus:relative focus:z-10 transition-all duration-300 ease-out`}
                    placeholder="Mario Rossi"
                  />
                  {errors.user_name && (
                    <p className="text-red-400 text-xs flex items-center gap-1 mt-1 animate-pulse">
                      <AlertCircle size={12} /> {errors.user_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className={`w-full bg-dark-800 border ${errors.user_email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-400'} rounded-lg p-3 text-white focus:outline-none focus:shadow-[0_0_20px_rgba(0,229,255,0.3)] focus:bg-dark-950 focus:scale-[1.02] focus:relative focus:z-10 transition-all duration-300 ease-out`}
                    placeholder="mario@esempio.com"
                  />
                  {errors.user_email && (
                    <p className="text-red-400 text-xs flex items-center gap-1 mt-1 animate-pulse">
                      <AlertCircle size={12} /> {errors.user_email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Oggetto</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,229,255,0.3)] focus:bg-dark-950 focus:scale-[1.02] focus:relative focus:z-10 transition-all duration-300 ease-out"
                >
                  <option>Richiesta Generale</option>
                  <option>Sviluppo Web</option>
                  <option>Chatbot / IA</option>
                  <option>App Mobile</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Messaggio</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-dark-800 border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-400'} rounded-lg p-3 text-white focus:outline-none focus:shadow-[0_0_20px_rgba(0,229,255,0.3)] focus:bg-dark-950 focus:scale-[1.02] focus:relative focus:z-10 transition-all duration-300 ease-out resize-none`}
                  placeholder="Parlami del tuo progetto..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1 animate-pulse">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-display font-bold tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> TRASMISSIONE IN CORSO...
                  </>
                ) : (
                  'PRENOTA ANALISI GRATUITA'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;