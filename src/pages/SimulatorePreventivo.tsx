import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Shield, Clock, Lock, ExternalLink, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AzioniContatto from '../components/vetrina/AzioniContatto';
import { Icona } from '../components/vetrina/Icone';
import PaginaVetrina from '../components/vetrina/PaginaVetrina';
import { inviaRichiestaEmail } from '../inviaRichiesta';
import '../styles/pagina-servizio.css';
import { leggiValoreCookie } from '../misurazione';

const fireSimulatoreConversion = () => {
  const gtag = (window as any).gtag;
  // Con send_to esplicito gtag.js attiva GA4 da solo, anche senza config. È una conversione degli annunci: servono Statistici e Marketing
  if (typeof gtag === 'function' && leggiValoreCookie('cookie_analytics') === 'true' && leggiValoreCookie('cookie_marketing') === 'true') {
    gtag('event', 'ads_conversion_Richiesta_preventivo_2', {
      send_to: 'G-29CR0733KS',
    });
  }
};

const reveal = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeIn' as const } },
};

const P = {
  siteBase: 1500,   // sito vetrina professionale custom
  chatbotDet: 800,   // chatbot deterministico (info azienda)
  chatbotAI: 2000,   // chatbot LLM (GPT-4o / Gemini)
  gestionale: 1200,   // gestionale prenotazioni / admin panel
  ecommerce: 2000,   // negozio online sul sito base: con i 1.500 del sito fa i 3.500 € del listino
  apiCarfax: 2000,   // API Carfax + funzione "Salva nel Garage"
  geo2026: 300,   // GEO ottimizzazione AI Overviews
  multilang: 400,   // multilingua IT+EN
  analytics: 200,   // Analytics dashboard GA4
};

// toLocaleString('it-IT') lascia 1500 senza punto: le migliaia si separano a mano come nel resto del sito
const inEuro = (importo: number) => `${String(importo).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;

interface ChatbotOption { id: string; label: string; desc: string; price: number; }
interface ExtraOption { id: string; label: string; desc: string; price: number; }
interface Template {
  id: string; emoji: string; label: string; tagline: string;
  demoUrl: string | null;
  chatbotOptions: ChatbotOption[];
  extras: ExtraOption[];
}

const TEMPLATES: Template[] = [
  {
    id: 'fotografo',
    emoji: '📸',
    label: 'Fotografo / Videomaker',
    tagline: 'Un portfolio che mostra i tuoi lavori e raccoglie richieste dirette, senza intermediari.',
    demoUrl: 'https://demo-videomaker.vercel.app/',
    chatbotOptions: [
      { id: 'none', label: 'Nessun chatbot', desc: 'Solo form contatto', price: 0 },
      { id: 'det', label: 'Risponditore automatico', desc: 'Risponde alle FAQ con info della tua attività', price: P.chatbotDet },
      { id: 'ai', label: 'Assistente AI', desc: 'Conversazione intelligente H24, qualifica lead', price: P.chatbotAI },
    ],
    extras: [],
  },
  {
    id: 'parruccheria',
    emoji: '✂️',
    label: 'Parruccheria / Beauty',
    tagline: 'Prenotazioni a qualsiasi ora, senza rispondere al telefono mentre lavori.',
    demoUrl: 'https://sito-parrucchieri.vercel.app/',
    chatbotOptions: [
      { id: 'none', label: 'Nessun chatbot', desc: 'Solo form prenotazione', price: 0 },
      { id: 'det', label: 'Risponditore automatico', desc: 'Come nel demo — risponde a orari, prezzi, FAQ', price: P.chatbotDet },
      { id: 'ai', label: 'Assistente AI', desc: 'Prenotazione conversazionale intelligente H24', price: P.chatbotAI },
    ],
    extras: [
      { id: 'gestionale', label: 'Pannello prenotazioni', desc: 'Area riservata per vedere, spostare e cancellare gli appuntamenti (come nel demo)', price: P.gestionale },
    ],
  },
  {
    id: 'hotel',
    emoji: '🏨',
    label: 'Hotel / B&B',
    tagline: 'Prenota diretto senza commissioni OTA — guadagni di più su ogni camera.',
    demoUrl: 'https://hotel-automatico.vercel.app/',
    chatbotOptions: [
      { id: 'none', label: 'Nessun chatbot', desc: 'Solo form prenotazione', price: 0 },
      { id: 'det', label: 'Risponditore automatico', desc: 'Risponde a disponibilità, prezzi, servizi', price: P.chatbotDet },
      { id: 'ai', label: 'Chatbot AI Prenotazioni', desc: 'Come nel demo — prenotazioni H24 intelligenti', price: P.chatbotAI },
    ],
    extras: [
      { id: 'gestionale', label: 'Pannello prenotazioni', desc: 'Area riservata con calendario, disponibilità e clienti', price: P.gestionale },
    ],
  },
  {
    id: 'ristorante',
    emoji: '🍽️',
    label: 'Ristorante / Pizzeria',
    tagline: 'Menu digitale e prenotazione dei tavoli dal telefono.',
    demoUrl: 'https://ai-business-assistant-two.vercel.app/',
    chatbotOptions: [
      { id: 'none', label: 'Nessun chatbot', desc: 'Solo form prenotazione', price: 0 },
      { id: 'det', label: 'Risponditore automatico', desc: 'Risponde a menù, orari, prenotazioni', price: P.chatbotDet },
      { id: 'ai', label: 'Chatbot AI Tavoli', desc: 'Prenotazione conversazionale, allergie, eventi', price: P.chatbotAI },
    ],
    extras: [],
  },
  {
    id: 'cantina',
    emoji: '🍷',
    label: 'Cantina / Agriturismo',
    tagline: 'Racconta il territorio e vendi i tuoi vini online.',
    demoUrl: 'https://sitodemovini.vercel.app/',
    chatbotOptions: [
      { id: 'none', label: 'Nessun chatbot', desc: 'Solo catalogo e form contatto', price: 0 },
      { id: 'det', label: 'Risponditore automatico', desc: 'Risponde a visite, degustazioni, prodotti', price: P.chatbotDet },
      { id: 'ai', label: 'Chatbot AI Sommelier', desc: 'Consiglia vini, gestisce prenotazioni visite', price: P.chatbotAI },
    ],
    extras: [
      { id: 'ecommerce', label: 'E-commerce Vini (Stripe)', desc: 'Negozio online completo: catalogo, pagamenti, spedizioni', price: P.ecommerce },
    ],
  },
  {
    id: 'concessionaria',
    emoji: '🚗',
    label: 'Concessionaria / Auto',
    tagline: 'Il tuo parco auto online, consultabile a qualsiasi ora.',
    demoUrl: 'https://egocars.vercel.app/',
    chatbotOptions: [
      { id: 'none', label: 'Nessun chatbot', desc: 'Solo catalogo veicoli e form contatto', price: 0 },
      { id: 'det', label: 'Risponditore automatico', desc: 'Risponde a modelli, prezzi, finanziamenti', price: P.chatbotDet },
      { id: 'ai', label: 'Chatbot AI + API Carfax', desc: 'Storia veicolo, qualifica lead, "Salva nel Garage"', price: P.chatbotAI },
    ],
    extras: [
      { id: 'apiCarfax', label: 'API Carfax + "Salva nel Garage"', desc: 'Storia completa del veicolo, lista preferiti personale per ogni utente', price: P.apiCarfax },
    ],
  },
];

type TemplateId = string;

const GLOBAL_ADDONS = [
  { id: 'seo', label: 'SEO di base', desc: 'Titoli e descrizioni per Google, dati strutturati, sitemap, pagine veloci', price: 0, locked: true },
  { id: 'geo2026', label: 'GEO — testi per ChatGPT e AI Overviews', desc: 'Domande frequenti con dati strutturati e testi chiari, facili da riprendere per gli assistenti AI', price: P.geo2026, locked: false },
  { id: 'multilang', label: 'Multilingua (IT + EN)', desc: 'Il sito anche in inglese, con titoli e indirizzi per Google in tutte e due le lingue', price: P.multilang, locked: false },
  { id: 'analytics', label: 'Statistiche GA4 + Hotjar', desc: 'Report mensile automatico, mappe dei clic e richieste tracciate', price: P.analytics, locked: false },
];

const VETRINA_CHATBOT_OPTIONS: ChatbotOption[] = [
  { id: 'none', label: 'Nessun chatbot', desc: 'Solo form contatto standard.', price: 0 },
  { id: 'det', label: 'Risponditore automatico', desc: 'Risponditore automatico H24. Filtra i contatti e risponde alle domande frequenti (orari, servizi) mentre tu lavori.', price: P.chatbotDet },
  { id: 'ai', label: 'Assistente AI', desc: "Un'Intelligenza Artificiale addestrata sulla tua azienda. Dialoga in modo naturale, capisce le intenzioni del cliente e ti fissa appuntamenti.", price: P.chatbotAI },
];

const VETRINA_EXTRAS: ExtraOption[] = [
  { id: 'gestionale', label: 'Pannello contatti', desc: 'La tua area riservata: vedi e gestisci richieste, contatti e conversazioni del chatbot in una sola schermata.', price: P.gestionale },
];

const VETRINA_INCLUDED = [
  { label: 'SEO di base', sub: 'Titoli, descrizioni e dati strutturati preparati per Google fin dal primo giorno.' },
  { label: 'Dominio .it + Hosting Cloud (1 Anno)', sub: 'Server ad altissime prestazioni per non far mai aspettare i tuoi clienti.' },
  { label: 'Design Unico (No Template)', sub: 'Interfaccia grafica studiata su misura per il tuo brand, diversa da qualsiasi competitor.' },
  { label: 'Pensato per il telefono', sub: 'Si legge e si usa bene da smartphone e tablet, da dove arriva gran parte delle visite.' },
  { label: 'Assistenza Post-Lancio (30 Giorni)', sub: 'Non ti lascio solo dopo la pubblicazione. Monitoraggio e fix inclusi.' },
  { label: 'Vetrina Progetti / Servizi', sub: 'Una sezione studiata per valorizzare al massimo i tuoi lavori o i tuoi servizi di punta.' },
  { label: 'Integrazione Riprova Sociale', sub: 'Sezione dedicata a recensioni e testimonial per trasformare i visitatori in clienti fiduciosi.' },
  { label: 'Sezione FAQ Strategica', sub: "Risposte alle domande frequenti posizionate per abbattere le obiezioni all'acquisto." },
];

const TEMPLATE_INCLUDED = VETRINA_INCLUDED.filter((voce) => !voce.label.startsWith('Design Unico'));

function useAnimatedPrice(target: number) {
  const [value, setValue] = useState(target);
  const [flash, setFlash] = useState(false);
  const prevRef = useRef(target);

  useEffect(() => {
    if (prevRef.current === target) return;
    setFlash(true);
    const timeout = setTimeout(() => setFlash(false), 600);

    const start = prevRef.current;
    const diff = target - start;
    const startTime = performance.now();
    const duration = 400;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(start + diff * eased));
      if (t < 1) requestAnimationFrame(tick);
      else prevRef.current = target;
    };
    requestAnimationFrame(tick);
    return () => clearTimeout(timeout);
  }, [target]);

  return { value, flash };
}

interface FormData { name: string; email: string; }

export default function SimulatorePreventivo() {
  const [path, setPath] = useState<'vetrina' | 'template' | null>(null);
  const [templateId, setTemplateId] = useState<TemplateId | null>(null);
  const [chatbotOption, setChatbotOption] = useState<string>('none');
  const [extras, setExtras] = useState<Set<string>>(new Set());
  const [globalAddons, setGlobalAddons] = useState<Set<string>>(new Set(['seo']));
  const [form, setForm] = useState<FormData>({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [linkWhatsApp, setLinkWhatsApp] = useState('https://wa.me/393480029661');
  const topRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const template = TEMPLATES.find(t => t.id === templateId) ?? null;

  const selectTemplate = (id: TemplateId) => {
    setTemplateId(id);
    setChatbotOption('none');
    setExtras(new Set());
  };

  const toggleExtra = (id: string) => {
    setExtras(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleGlobal = (id: string) => {
    const addon = GLOBAL_ADDONS.find(a => a.id === id);
    if (addon?.locked) return;
    setGlobalAddons(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const estimateTotal = (() => {
    if (!path) return 0;
    let t = P.siteBase;
    if (path === 'template' && template) {
      const cb = template.chatbotOptions.find(c => c.id === chatbotOption);
      if (cb) t += cb.price;
      template.extras.forEach(e => { if (extras.has(e.id)) t += e.price; });
    }
    if (path === 'vetrina') {
      const vcb = VETRINA_CHATBOT_OPTIONS.find(c => c.id === chatbotOption);
      if (vcb) t += vcb.price;
      VETRINA_EXTRAS.forEach(e => { if (extras.has(e.id)) t += e.price; });
    }
    GLOBAL_ADDONS.forEach(a => { if (globalAddons.has(a.id) && !a.locked) t += a.price; });
    return t;
  })();

  const { value: animatedEstimate, flash: flashEstimate } = useAnimatedPrice(estimateTotal);

  useEffect(() => {
    if (success) window.scrollTo(0, 0);
  }, [success]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Il nome è obbligatorio';
    if (!form.email.trim()) e.email = "L'email è obbligatoria";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email non valida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const chatbotLabel = path === 'vetrina'
      ? VETRINA_CHATBOT_OPTIONS.find(c => c.id === chatbotOption)?.label ?? 'Nessuno'
      : template?.chatbotOptions.find(c => c.id === chatbotOption)?.label ?? 'Nessuno';
    const extrasLabel = path === 'vetrina'
      ? [...extras].map(id => VETRINA_EXTRAS.find(x => x.id === id)?.label).filter(Boolean).join(', ')
      : [...extras].map(id => template?.extras.find(x => x.id === id)?.label).filter(Boolean).join(', ');
    const globalsLabel = [...globalAddons].filter(id => id !== 'seo').map(id => GLOBAL_ADDONS.find(a => a.id === id)?.label).filter(Boolean).join(', ');

    const soluzione = path === 'vetrina' ? 'Sito Vetrina Custom' : `Template ${template?.label}`;
    const riepilogo =
      `Soluzione: ${soluzione}\n` +
      `Chatbot: ${chatbotLabel}\n` +
      `Extra template: ${extrasLabel || 'Nessuno'}\n` +
      `Add-on globali: SEO (incluso)${globalsLabel ? ', ' + globalsLabel : ''}\n` +
      `Preventivo stimato: ${inEuro(estimateTotal)}\n` +
      `Email: ${form.email.trim()}`;

    setLinkWhatsApp(`https://wa.me/393480029661?text=${encodeURIComponent(`Ciao Mauro! Ho completato il Simulatore Preventivo.\nNome: ${form.name.trim()}\n${riepilogo}\nAttendo il preventivo dettagliato!`)}`);
    setSending(true);
    setSendError(false);
    try {
      await inviaRichiestaEmail({ nome: form.name.trim(), email: form.email.trim(), oggetto: `Richiesta di preventivo: ${soluzione}`, messaggio: riepilogo });
      fireSimulatoreConversion();
      setSuccess(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setPath(null); setTemplateId(null); setChatbotOption('none');
    setExtras(new Set()); setGlobalAddons(new Set(['seo']));
    setForm({ name: '', email: '' });
    setErrors({}); setSendError(false); setSuccess(false);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (success) return (
    <PaginaVetrina conBarraContatti={false} conAssistente={false}>
      <section className="pagina-eroe" aria-labelledby="titolo-esito">
        <div className="larghezza">
          <p className="pagina-etichetta">Simulatore preventivo</p>
          <h1 id="titolo-esito">Richiesta inviata</h1>
          <p className="pagina-sottotitolo">
            Ho ricevuto il riepilogo: entro 24 ore ti mando il preventivo scritto a {form.email.trim()}. Se preferisci, mandamelo anche su WhatsApp.
          </p>
          <div className="azioni">
            <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="pulsante pulsante--scrivi">
              <Icona nome="messaggio" />Invia il riepilogo su WhatsApp
            </a>
          </div>
          <button onClick={handleReset} className="link-freccia mt-6 bg-transparent border-0 p-0">
            Ricomincia il simulatore
          </button>
        </div>
      </section>
    </PaginaVetrina>
  );

  return (
    <PaginaVetrina conBarraContatti={false} conAssistente={false}>
      <div ref={topRef}>
        <section className="pagina-eroe" aria-labelledby="titolo-pagina">
          <div className="larghezza">
            <p className="pagina-etichetta">Simulatore preventivo</p>
            <h1 id="titolo-pagina">
              Quanto costa il tuo sito?{' '}<br />
              <span className="text-[var(--cobalto-testo)]">Calcola il preventivo.</span>
            </h1>
            <p className="pagina-sottotitolo">
              Scegli cosa ti serve e vedi subito una stima. Il prezzo finale te lo scrivo nel preventivo, prima di iniziare.
            </p>
            <p className="pagina-prezzo">Nessuna carta di credito · Nessuna email richiesta per configurare · Zero impegno</p>
            <AzioniContatto conNota />
          </div>
        </section>

        <div className={`larghezza lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:items-start ${estimateTotal > 0 ? 'pb-28 lg:pb-16' : 'pb-16'}`}>

          <div className="min-w-0">

            <div className="space-y-12">

              <section>
                <SectionLabel number={1} label="Da dove vuoi partire?" />
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <button
                    onClick={() => { setPath('vetrina'); setTemplateId(null); setChatbotOption('none'); setExtras(new Set()); }}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${path === 'vetrina'
                        ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]'
                        : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                      }`}
                  >
                    {path === 'vetrina' && <CheckCircle size={18} className="text-[var(--cobalto-testo)] float-right" />}
                    <h3 className="font-bold text-[var(--inchiostro)] text-base mb-1">Sito Vetrina Personalizzato</h3>
                    <p className="text-[var(--grafite)] text-xs mb-3">Design su misura, mobile-first, architettura unica. Per chi non vuole somigliare a nessun altro.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[var(--cobalto-testo)] font-bold text-xl">{inEuro(P.siteBase)}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setPath('template')}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 relative ${path === 'template'
                        ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]'
                        : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                      }`}
                  >
                    {path === 'template' && <CheckCircle size={18} className="text-[var(--cobalto-testo)] float-right mt-1" />}
                    <h3 className="font-bold text-[var(--inchiostro)] text-base mb-1">Template Premium per Settore</h3>
                    <p className="text-[var(--cobalto-testo)] text-xs font-bold mb-2 uppercase tracking-wide">Online in 3 Giorni</p>
                    <p className="text-[var(--grafite)] text-xs mb-3">Layout 3D già ottimizzato per il tuo settore. Chatbot, gestionale e moduli configurabili.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[var(--cobalto-testo)] font-bold text-xl">da {inEuro(P.siteBase)}</span>
                    </div>
                  </button>
                </div>
              </section>

              <AnimatePresence>
                {path === 'vetrina' && (
                  <motion.section key="step2-vetrina" {...reveal} style={{ overflow: 'hidden' }}>
                    <SectionLabel number={2} label="Cosa ottieni con il Sito Vetrina" />

                    <div className="mt-4 mb-7 p-5 rounded-2xl border border-[var(--filo)] bg-[var(--superficie)]">
                      <p className="text-xs font-bold text-[var(--cobalto-testo)] uppercase tracking-widest mb-4">Sempre incluso nel prezzo</p>
                      <div className="space-y-3">
                        {VETRINA_INCLUDED.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle size={14} className="text-[var(--cobalto-testo)] flex-shrink-0 mt-0.5" />
                            <p className="text-xs leading-relaxed">
                              <span className="text-[var(--inchiostro)] font-bold">{item.label}:</span>{' '}
                              <span className="text-[var(--grafite)]">{item.sub}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-bold text-[var(--inchiostro)] mb-1">Aggiungi un Assistente Virtuale</p>
                      <p className="text-xs text-[var(--grafite)] mb-3">L'AI che lavora per te mentre dormi.</p>
                      <div className="space-y-2">
                        {VETRINA_CHATBOT_OPTIONS.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setChatbotOption(opt.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${chatbotOption === opt.id
                                ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]'
                                : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                              }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${chatbotOption === opt.id ? 'border-[var(--cobalto)]' : 'border-[var(--filo)]'
                              }`}>
                              {chatbotOption === opt.id && <div className="w-2 h-2 rounded-full bg-[var(--cobalto)]" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-bold text-[var(--inchiostro)]">{opt.label}</p>
                              </div>
                              <p className="text-xs text-[var(--grafite)] mt-0.5">{opt.desc}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              {opt.price === 0 ? (
                                <span className="text-[var(--grafite)] text-sm">Incluso</span>
                              ) : (
                                <p className={`font-bold text-sm ${chatbotOption === opt.id ? 'text-[var(--cobalto-testo)]' : 'text-[var(--grafite)]'}`}>
                                  +{inEuro(opt.price)}
                                </p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[var(--inchiostro)] mb-1">Moduli Aggiuntivi</p>
                      <p className="text-xs text-[var(--grafite)] mb-3">Potenzia il tuo sito con strumenti professionali.</p>
                      <div className="space-y-2">
                        {VETRINA_EXTRAS.map(ex => {
                          const sel = extras.has(ex.id);
                          return (
                            <button
                              key={ex.id}
                              onClick={() => toggleExtra(ex.id)}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${sel ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]' : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                                }`}
                            >
                              <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${sel ? 'border-[var(--cobalto)] bg-[var(--cobalto)]' : 'border-[var(--filo)]'
                                }`}>
                                {sel && <CheckCircle size={11} className="text-white" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-[var(--inchiostro)]">{ex.label}</p>
                                <p className="text-xs text-[var(--grafite)] mt-0.5">{ex.desc}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className={`font-bold text-sm ${sel ? 'text-[var(--cobalto-testo)]' : 'text-[var(--grafite)]'}`}>
                                  +{inEuro(ex.price)}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {path === 'template' && (
                  <motion.section key="step2" {...reveal} style={{ overflow: 'hidden' }}>
                    <SectionLabel number={2} label="Scegli il tuo settore" />
                    <p className="text-[var(--grafite)] text-sm mt-1 mb-4">Clicca per selezionare. Ogni template è personalizzabile al 100%.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {TEMPLATES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => selectTemplate(t.id)}
                          className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 ${templateId === t.id
                              ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]'
                              : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                            }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-3xl">{t.emoji}</span>
                            {templateId === t.id && <CheckCircle size={16} className="text-[var(--cobalto-testo)]" />}
                          </div>
                          <h3 className="font-bold text-[var(--inchiostro)] text-sm mb-1">{t.label}</h3>
                          <p className="text-[var(--grafite)] text-xs leading-relaxed mb-3">{t.tagline}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[var(--cobalto-testo)] font-bold">da {inEuro(P.siteBase)}</span>
                            </div>
                            {t.demoUrl && (
                              <a
                                href={t.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="flex items-center gap-1 text-xs font-bold text-[var(--cobalto-testo)] border border-[var(--cobalto)] px-2 py-1 rounded-lg hover:bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)] transition-colors"
                              >
                                Demo <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 p-5 rounded-2xl border border-[var(--filo)] bg-[var(--superficie)]">
                      <p className="text-xs font-bold text-[var(--cobalto-testo)] uppercase tracking-widest mb-4">Sempre incluso nel prezzo</p>
                      <div className="space-y-3">
                        {TEMPLATE_INCLUDED.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle size={14} className="text-[var(--cobalto-testo)] flex-shrink-0 mt-0.5" />
                            <p className="text-xs leading-relaxed">
                              <span className="text-[var(--inchiostro)] font-bold">{item.label}:</span>{' '}
                              <span className="text-[var(--grafite)]">{item.sub}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {path === 'template' && template && (
                  <motion.section key={`step3-${templateId}`} {...reveal} style={{ overflow: 'hidden' }}>
                    <SectionLabel number={3} label={`Configura il tuo ${template.label}`} />

                    <div className="mb-6">
                      <p className="text-sm font-bold text-[var(--inchiostro)] mb-3">Opzione Chatbot</p>
                      <div className="space-y-2">
                        {template.chatbotOptions.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setChatbotOption(opt.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${chatbotOption === opt.id
                                ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]'
                                : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                              }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${chatbotOption === opt.id ? 'border-[var(--cobalto)]' : 'border-[var(--filo)]'
                              }`}>
                              {chatbotOption === opt.id && <div className="w-2 h-2 rounded-full bg-[var(--cobalto)]" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-bold text-[var(--inchiostro)]">{opt.label}</p>
                              </div>
                              <p className="text-xs text-[var(--grafite)] mt-0.5">{opt.desc}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              {opt.price === 0 ? (
                                <span className="text-[var(--grafite)] text-sm">Incluso</span>
                              ) : (
                                <p className={`font-bold text-sm ${chatbotOption === opt.id ? 'text-[var(--cobalto-testo)]' : 'text-[var(--grafite)]'}`}>
                                  +{inEuro(opt.price)}
                                </p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {template.extras.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-bold text-[var(--inchiostro)] mb-3">Moduli aggiuntivi per {template.label}</p>
                        <div className="space-y-2">
                          {template.extras.map(ex => {
                            const sel = extras.has(ex.id);
                            return (
                              <button
                                key={ex.id}
                                onClick={() => toggleExtra(ex.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${sel ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]' : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                                  }`}
                              >
                                <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${sel ? 'border-[var(--cobalto)] bg-[var(--cobalto)]' : 'border-[var(--filo)]'
                                  }`}>
                                  {sel && <CheckCircle size={11} className="text-white" />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-bold text-[var(--inchiostro)]">{ex.label}</p>
                                  <p className="text-xs text-[var(--grafite)] mt-0.5">{ex.desc}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className={`font-bold text-sm ${sel ? 'text-[var(--cobalto-testo)]' : 'text-[var(--grafite)]'}`}>
                                    +{inEuro(ex.price)}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.section>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {path && (
                  <motion.section key="step4" {...reveal} style={{ overflow: 'hidden' }}>
                    <SectionLabel number={path === 'template' && template ? 4 : 3} label="Aggiungi moduli extra al tuo sito" />
                    <p className="text-[var(--grafite)] text-sm mt-1 mb-4">La SEO di base è sempre inclusa.</p>
                    <div className="space-y-2">
                      {GLOBAL_ADDONS.map(addon => {
                        const sel = globalAddons.has(addon.id);
                        return (
                          <button
                            key={addon.id}
                            onClick={() => toggleGlobal(addon.id)}
                            disabled={addon.locked}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${addon.locked
                                ? 'border-[var(--filo)] bg-[var(--superficie)] cursor-default'
                                : sel
                                  ? 'border-[var(--cobalto)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)]'
                                  : 'border-[var(--filo)] bg-[var(--superficie)] hover:border-[var(--grafite)]'
                              }`}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${addon.locked ? 'border-[var(--cobalto)] bg-[var(--cobalto)]' : sel ? 'border-[var(--cobalto)] bg-[var(--cobalto)]' : 'border-[var(--filo)]'
                              }`}>
                              {(addon.locked || sel) && <CheckCircle size={11} className="text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-sm font-bold ${addon.locked ? 'text-[var(--cobalto-testo)]' : 'text-[var(--inchiostro)]'}`}>{addon.label}</span>
                                {addon.locked && (
                                  <span className="text-xs font-bold text-[var(--cobalto-testo)] bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)] px-2 py-0.5 rounded-full border border-[var(--cobalto)]">
                                    INCLUSO GRATIS
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[var(--grafite)] mt-0.5">{addon.desc}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              {addon.locked ? (
                                <span className="text-[var(--cobalto-testo)] font-bold text-sm">0 €</span>
                              ) : (
                                <p className={`font-bold text-sm ${sel ? 'text-[var(--cobalto-testo)]' : 'text-[var(--grafite)]'}`}>+{inEuro(addon.price)}</p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {path && (
                  <motion.section key="step5" {...reveal} style={{ overflow: 'hidden' }}>
                    <div ref={formRef}>
                      <SectionLabel number={path === 'template' && template ? 5 : 4} label="Richiedi il tuo preventivo" />
                      <div className="flex items-center gap-2 my-4 p-3 bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)] border border-[var(--cobalto)] rounded-lg">
                        <Clock size={15} className="text-[var(--cobalto-testo)] flex-shrink-0" />
                        <span className="text-[var(--cobalto-testo)] text-sm font-bold">Ti mando il preventivo scritto via email entro 24 ore</span>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-[var(--grafite)] uppercase tracking-wider block mb-1.5">Nome *</label>
                            <input type="text" name="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                              placeholder="Mario Rossi"
                              className={`w-full bg-[var(--superficie)] border ${errors.name ? 'border-[var(--inchiostro)]' : 'border-[var(--filo)]'} rounded-xl p-3 text-[var(--inchiostro)] placeholder-[var(--grafite)] focus:outline-none focus:border-[var(--cobalto)] transition-all text-sm`} />
                            {errors.name && <p className="text-[var(--inchiostro)] font-semibold text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[var(--grafite)] uppercase tracking-wider block mb-1.5">Email *</label>
                            <input type="email" name="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                              placeholder="mario@latuaattivita.it"
                              className={`w-full bg-[var(--superficie)] border ${errors.email ? 'border-[var(--inchiostro)]' : 'border-[var(--filo)]'} rounded-xl p-3 text-[var(--inchiostro)] placeholder-[var(--grafite)] focus:outline-none focus:border-[var(--cobalto)] transition-all text-sm`} />
                            {errors.email && <p className="text-[var(--inchiostro)] font-semibold text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
                          </div>
                        </div>

                        <button type="submit" disabled={sending}
                          className="pulsante pulsante--chiama w-full disabled:opacity-70 disabled:cursor-wait">
                          {sending ? 'Invio in corso…' : 'Invia la richiesta →'}
                        </button>
                        {sendError && (
                          <p role="alert" className="text-center text-[var(--inchiostro)] font-semibold text-sm">
                            L'invio non è riuscito. Riprova, oppure <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="underline font-bold">mandami il riepilogo su WhatsApp</a>.
                          </p>
                        )}
                        <p className="text-center text-[var(--grafite)] text-xs leading-relaxed">
                          <Lock size={10} className="inline mr-1.5 -mt-0.5" />Nome, email e configurazione mi arrivano per email: servono solo a prepararti il preventivo. <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[var(--cobalto-testo)] hover:underline">Privacy Policy</a>
                        </p>
                      </form>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

            </div>
          </div>

          <aside className="hidden lg:block sticky top-[calc(var(--altezza-testata)+24px)]" aria-label="Il tuo preventivo">
            <div className={`p-5 rounded-2xl border bg-[var(--superficie)] transition-colors duration-300 ${flashEstimate ? 'border-[var(--cobalto)]' : 'border-[var(--filo)]'}`}>
              <p className="text-xs font-bold text-[var(--grafite)] uppercase tracking-widest mb-4">Il tuo preventivo</p>

              {path && (
                <div className="mb-4 pb-4 border-b border-[var(--filo)] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--grafite)]">Sito base</span>
                    <span className="text-[var(--inchiostro)] font-bold">{inEuro(P.siteBase)}</span>
                  </div>
                  {path === 'template' && template && (
                    <div className="flex justify-between">
                      <span className="text-[var(--grafite)]">{template.emoji} {template.label}</span>
                      <span className="text-[var(--inchiostro)]">incluso</span>
                    </div>
                  )}
                  {path === 'template' && template && chatbotOption !== 'none' && (() => {
                    const cb = template.chatbotOptions.find(c => c.id === chatbotOption);
                    return cb ? (
                      <div className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[150px]">{cb.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(cb.price)}</span>
                      </div>
                    ) : null;
                  })()}
                  {path === 'template' && template && [...extras].map(id => {
                    const ex = template.extras.find(e => e.id === id);
                    return ex ? (
                      <div key={id} className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[150px]">{ex.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(ex.price)}</span>
                      </div>
                    ) : null;
                  })}
                  {path === 'vetrina' && chatbotOption !== 'none' && (() => {
                    const cb = VETRINA_CHATBOT_OPTIONS.find(c => c.id === chatbotOption);
                    return cb ? (
                      <div className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[150px]">{cb.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(cb.price)}</span>
                      </div>
                    ) : null;
                  })()}
                  {path === 'vetrina' && [...extras].map(id => {
                    const ex = VETRINA_EXTRAS.find(e => e.id === id);
                    return ex ? (
                      <div key={id} className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[150px]">{ex.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(ex.price)}</span>
                      </div>
                    ) : null;
                  })}
                  {[...globalAddons].filter(id => id !== 'seo').map(id => {
                    const a = GLOBAL_ADDONS.find(x => x.id === id);
                    return a ? (
                      <div key={id} className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[150px]">{a.label.split('—')[0].trim()}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(a.price)}</span>
                      </div>
                    ) : null;
                  })}
                  <div className="flex justify-between text-[var(--grafite)]">
                    <span>SEO di base</span>
                    <span className="text-[var(--cobalto-testo)] font-bold">Gratis</span>
                  </div>
                </div>
              )}

              {estimateTotal > 0 ? (
                <div className="text-center mb-4">
                  <p className={`text-4xl font-bold tabular-nums transition-all duration-300 ${flashEstimate ? 'text-[var(--cobalto-testo)] scale-105' : 'text-[var(--inchiostro)]'}`}>
                    {inEuro(animatedEstimate)}
                  </p>
                </div>
              ) : (
                <p className="text-center text-[var(--grafite)] text-sm py-6 italic">
                  Seleziona una soluzione per vedere il preventivo in tempo reale
                </p>
              )}

              <div className="pt-4 border-t border-[var(--filo)] space-y-2">
                {[
                  { icon: <Shield size={11} className="text-[var(--cobalto-testo)]" />, text: 'Prezzo scritto prima di iniziare' },
                  { icon: <CheckCircle size={11} className="text-[var(--cobalto-testo)]" />, text: 'Pagamento anche a rate' },
                  { icon: <Clock size={11} className="text-[var(--cobalto-testo)]" />, text: 'Sito vetrina in 7-14 giorni' },
                  { icon: <Phone size={11} className="text-[var(--cobalto-testo)]" />, text: 'Al telefono rispondo io' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[var(--grafite)]">
                    {t.icon}<span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {estimateTotal > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <AnimatePresence>
              {showMobileDetail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[var(--carta)] border-t border-[var(--filo)] px-4 pt-4 pb-2 space-y-1.5 text-xs"
                >
                  <p className="text-xs font-bold text-[var(--grafite)] uppercase tracking-widest mb-2">Riepilogo voci</p>
                  <div className="flex justify-between">
                    <span className="text-[var(--grafite)]">Sito base</span>
                    <span className="text-[var(--inchiostro)] font-bold">{inEuro(P.siteBase)}</span>
                  </div>
                  {path === 'template' && template && (
                    <div className="flex justify-between">
                      <span className="text-[var(--grafite)]">{template.emoji} {template.label}</span>
                      <span className="text-[var(--inchiostro)]">incluso</span>
                    </div>
                  )}
                  {path === 'template' && template && chatbotOption !== 'none' && (() => {
                    const cb = template.chatbotOptions.find(c => c.id === chatbotOption);
                    return cb ? (
                      <div className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[200px]">{cb.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(cb.price)}</span>
                      </div>
                    ) : null;
                  })()}
                  {path === 'template' && template && [...extras].map(id => {
                    const ex = template.extras.find(e => e.id === id);
                    return ex ? (
                      <div key={id} className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[200px]">{ex.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(ex.price)}</span>
                      </div>
                    ) : null;
                  })}
                  {path === 'vetrina' && chatbotOption !== 'none' && (() => {
                    const cb = VETRINA_CHATBOT_OPTIONS.find(c => c.id === chatbotOption);
                    return cb ? (
                      <div className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[200px]">{cb.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(cb.price)}</span>
                      </div>
                    ) : null;
                  })()}
                  {path === 'vetrina' && [...extras].map(id => {
                    const ex = VETRINA_EXTRAS.find(e => e.id === id);
                    return ex ? (
                      <div key={id} className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[200px]">{ex.label}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(ex.price)}</span>
                      </div>
                    ) : null;
                  })}
                  {[...globalAddons].filter(id => id !== 'seo').map(id => {
                    const a = GLOBAL_ADDONS.find(x => x.id === id);
                    return a ? (
                      <div key={id} className="flex justify-between">
                        <span className="text-[var(--grafite)] truncate max-w-[200px]">{a.label.split('—')[0].trim()}</span>
                        <span className="text-[var(--cobalto-testo)] font-bold">+{inEuro(a.price)}</span>
                      </div>
                    ) : null;
                  })}
                  <div className="flex justify-between text-[var(--grafite)] pb-2 border-b border-[var(--filo)]">
                    <span>SEO di base</span>
                    <span className="text-[var(--cobalto-testo)] font-bold">Gratis</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-[var(--carta)] border-t border-[var(--filo)] p-4 flex items-center justify-between gap-4">
              <button onClick={() => setShowMobileDetail(v => !v)} className="text-left flex-1">
                <p className={`text-2xl font-bold tabular-nums transition-all duration-300 ${flashEstimate ? 'text-[var(--cobalto-testo)]' : 'text-[var(--inchiostro)]'}`}>
                  {inEuro(animatedEstimate)}
                </p>
                <p className="text-xs text-[var(--grafite)] mt-0.5">{showMobileDetail ? '▼ chiudi dettaglio' : '▲ vedi dettaglio'}</p>
              </button>
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="pulsante pulsante--chiama flex-shrink-0"
              >
                Richiedi
              </button>
            </div>
          </div>
        )}
      </div>
    </PaginaVetrina>
  );
}

function SectionLabel({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-[color-mix(in_srgb,var(--cobalto)_8%,transparent)] border border-[var(--cobalto)] flex items-center justify-center flex-shrink-0">
        <span className="text-[var(--cobalto-testo)] text-xs font-bold">{number}</span>
      </div>
      <h2 className="text-lg font-bold text-[var(--inchiostro)]">{label}</h2>
    </div>
  );
}
