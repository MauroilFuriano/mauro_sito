import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Loader2, Shield, Star, Zap, Clock, Lock, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const reveal = {
  initial:  { opacity: 0, height: 0 },
  animate:  { opacity: 1, height: 'auto', transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit:     { opacity: 0, height: 0,      transition: { duration: 0.25, ease: 'easeIn'  as const } },
};

// ─────────────────────────────────────────────────────────────────────────────
// PREZZI (originali, prima dello sconto -30%)
// Fonte: FAQ mauroceccarelli.it
// ─────────────────────────────────────────────────────────────────────────────
const PROMO = 0.30;
const disc = (p: number) => Math.round(p * (1 - PROMO));

const P = {
  siteBase:          2000,   // sito vetrina professionale custom
  chatbotDet:         800,   // chatbot deterministico (info azienda)
  chatbotAI:         3500,   // chatbot LLM (GPT-4o / Gemini)
  gestionale:        1200,   // gestionale prenotazioni / admin panel
  ecommerce:         3500,   // e-commerce Stripe starter
  apiCarfax:         2000,   // API Carfax + funzione "Salva nel Garage"
  geo2026:            300,   // GEO ottimizzazione AI Overviews
  multilang:          400,   // multilingua IT+EN
  analytics:          200,   // Analytics dashboard GA4
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface ChatbotOption { id: string; label: string; desc: string; price: number; }
interface ExtraOption   { id: string; label: string; desc: string; price: number; }
interface Template {
  id: string; emoji: string; label: string; tagline: string;
  demoUrl: string | null;
  chatbotOptions: ChatbotOption[];
  extras: ExtraOption[];
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────
const TEMPLATES: Template[] = [
  {
    id: 'fotografo',
    emoji: '📸',
    label: 'Fotografo / Videomaker',
    tagline: 'Portfolio immersivo che vende da solo — clienti diretti senza intermediari.',
    demoUrl: 'https://demo-videomaker.vercel.app/',
    chatbotOptions: [
      { id: 'none',  label: 'Nessun chatbot',           desc: 'Solo form contatto',                           price: 0 },
      { id: 'det',   label: 'Chatbot Deterministico',   desc: 'Risponde alle FAQ con info della tua attività', price: P.chatbotDet },
      { id: 'ai',    label: 'Chatbot AI (LLM)',          desc: 'Conversazione intelligente H24, qualifica lead', price: P.chatbotAI },
    ],
    extras: [],
  },
  {
    id: 'parruccheria',
    emoji: '✂️',
    label: 'Parruccheria / Beauty',
    tagline: 'Prenotazioni H24, agenda sempre piena — niente più telefonate perse.',
    demoUrl: 'https://sito-parrucchieri.vercel.app/',
    chatbotOptions: [
      { id: 'none',  label: 'Nessun chatbot',           desc: 'Solo form prenotazione',                        price: 0 },
      { id: 'det',   label: 'Chatbot Deterministico',   desc: 'Come nel demo — risponde a orari, prezzi, FAQ', price: P.chatbotDet },
      { id: 'ai',    label: 'Chatbot AI (LLM)',          desc: 'Prenotazione conversazionale intelligente H24', price: P.chatbotAI },
    ],
    extras: [
      { id: 'gestionale', label: 'Gestionale Prenotazioni', desc: 'Admin panel: visualizza, modifica, cancella appuntamenti (come nel demo)', price: P.gestionale },
    ],
  },
  {
    id: 'hotel',
    emoji: '🏨',
    label: 'Hotel / B&B',
    tagline: 'Prenota diretto senza commissioni OTA — guadagni di più su ogni camera.',
    demoUrl: 'https://hotel-automatico.vercel.app/',
    chatbotOptions: [
      { id: 'none',  label: 'Nessun chatbot',           desc: 'Solo form prenotazione',                        price: 0 },
      { id: 'det',   label: 'Chatbot Deterministico',   desc: 'Risponde a disponibilità, prezzi, servizi',    price: P.chatbotDet },
      { id: 'ai',    label: 'Chatbot AI Prenotazioni',  desc: 'Come nel demo — prenotazioni H24 intelligenti', price: P.chatbotAI },
    ],
    extras: [
      { id: 'gestionale', label: 'Gestionale Prenotazioni', desc: 'Dashboard admin: calendario, disponibilità, clienti', price: P.gestionale },
    ],
  },
  {
    id: 'ristorante',
    emoji: '🍽️',
    label: 'Ristorante / Pizzeria',
    tagline: 'Menu digitale + prenotazione tavoli — sala piena ogni sera.',
    demoUrl: null,
    chatbotOptions: [
      { id: 'none',  label: 'Nessun chatbot',           desc: 'Solo form prenotazione',                        price: 0 },
      { id: 'det',   label: 'Chatbot Deterministico',   desc: 'Risponde a menù, orari, prenotazioni',         price: P.chatbotDet },
      { id: 'ai',    label: 'Chatbot AI Tavoli',        desc: 'Prenotazione conversazionale, allergie, eventi', price: P.chatbotAI },
    ],
    extras: [],
  },
  {
    id: 'cantina',
    emoji: '🍷',
    label: 'Cantina / Agriturismo',
    tagline: 'Racconta il territorio, vendi online — turisti da tutta Italia.',
    demoUrl: 'https://sitodemovini.vercel.app/',
    chatbotOptions: [
      { id: 'none',  label: 'Nessun chatbot',           desc: 'Solo catalogo e form contatto',                 price: 0 },
      { id: 'det',   label: 'Chatbot Deterministico',   desc: 'Risponde a visite, degustazioni, prodotti',    price: P.chatbotDet },
      { id: 'ai',    label: 'Chatbot AI Sommelier',     desc: 'Consiglia vini, gestisce prenotazioni visite',  price: P.chatbotAI },
    ],
    extras: [
      { id: 'ecommerce', label: 'E-commerce Vini (Stripe)', desc: 'Negozio online completo: catalogo, pagamenti, spedizioni', price: P.ecommerce },
    ],
  },
  {
    id: 'concessionaria',
    emoji: '🚗',
    label: 'Concessionaria / Auto',
    tagline: 'Showroom virtuale 24/7 — lead qualificati mentre dormi.',
    demoUrl: 'https://egocars.vercel.app/',
    chatbotOptions: [
      { id: 'none',  label: 'Nessun chatbot',           desc: 'Solo catalogo veicoli e form contatto',         price: 0 },
      { id: 'det',   label: 'Chatbot Deterministico',   desc: 'Risponde a modelli, prezzi, finanziamenti',    price: P.chatbotDet },
      { id: 'ai',    label: 'Chatbot AI + API Carfax',  desc: 'Storia veicolo, qualifica lead, "Salva nel Garage"', price: P.chatbotAI },
    ],
    extras: [
      { id: 'apiCarfax', label: 'API Carfax + "Salva nel Garage"', desc: 'Storia completa del veicolo, lista preferiti personale per ogni utente', price: P.apiCarfax },
    ],
  },
];

type TemplateId = string;

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL ADD-ONS (indipendenti dal template)
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_ADDONS = [
  { id: 'seo',       label: 'SEO Base & Lighthouse 98/100',        desc: 'Meta tag, schema JSON-LD, Core Web Vitals, sitemap XML',              price: 0,        locked: true },
  { id: 'geo2026',   label: 'GEO 2026 — ChatGPT & AI Overviews',  desc: 'llms.txt, FAQ schema, citazione nei risultati AI generativi',         price: P.geo2026, locked: false },
  { id: 'multilang', label: 'Multilingua (IT + EN)',               desc: 'i18n completo, URL hreflang, SEO multilingua',                        price: P.multilang, locked: false },
  { id: 'analytics', label: 'Analytics Dashboard GA4 + Hotjar',   desc: 'Report mensile automatico, heatmap, conversioni tracciate',           price: P.analytics, locked: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// VETRINA OPTIONS
// ─────────────────────────────────────────────────────────────────────────────
const VETRINA_CHATBOT_OPTIONS: ChatbotOption[] = [
  { id: 'none', label: 'Nessun chatbot',         desc: 'Solo form contatto standard.',                                                                                                                      price: 0           },
  { id: 'det',  label: 'Chatbot Deterministico', desc: 'Risponditore automatico H24. Filtra i contatti e risponde alle domande frequenti (orari, servizi) mentre tu lavori.',                               price: P.chatbotDet },
  { id: 'ai',   label: 'Chatbot AI (LLM)',        desc: "Un'Intelligenza Artificiale addestrata sulla tua azienda. Dialoga in modo naturale, capisce le intenzioni del cliente e ti fissa appuntamenti.",  price: P.chatbotAI  },
];

const VETRINA_EXTRAS: ExtraOption[] = [
  { id: 'gestionale', label: 'Cruscotto Direzionale (Admin Panel)', desc: "La tua area riservata. Visualizza e gestisci tutti i lead, i contatti e le conversazioni del chatbot da un'unica schermata intuitiva.", price: P.gestionale },
];

const VETRINA_INCLUDED = [
  { label: 'SEO Base & Lighthouse 98/100',      sub: 'Sito fulmineo, ottimizzato per piacere a Google fin dal giorno zero.' },
  { label: 'Dominio .it + Hosting Cloud (1 Anno)', sub: 'Server ad altissime prestazioni per non far mai aspettare i tuoi clienti.' },
  { label: 'Design Unico (No Template)',         sub: 'Interfaccia grafica studiata su misura per il tuo brand, diversa da qualsiasi competitor.' },
  { label: 'Mobile & Tablet First',             sub: 'Esperienza utente perfetta per smartphone, da dove arriva il 90% del tuo traffico.' },
  { label: 'Assistenza Post-Lancio (30 Giorni)', sub: 'Non ti lascio solo dopo la pubblicazione. Monitoraggio e fix inclusi.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED PRICE HOOK
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// FORM TYPE
// ─────────────────────────────────────────────────────────────────────────────
interface FormData { name: string; email: string; phone: string; privacy: boolean; }

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function SimulatorePreventivo() {
  const [path, setPath]                     = useState<'vetrina' | 'template' | null>(null);
  const [templateId, setTemplateId]         = useState<TemplateId | null>(null);
  const [chatbotOption, setChatbotOption]   = useState<string>('none');
  const [extras, setExtras]                 = useState<Set<string>>(new Set());
  const [globalAddons, setGlobalAddons]     = useState<Set<string>>(new Set(['seo']));
  const [form, setForm]                     = useState<FormData>({ name: '', email: '', phone: '', privacy: false });
  const [errors, setErrors]                 = useState<Record<string, string>>({});
  const [submitting, setSubmitting]         = useState(false);
  const [success, setSuccess]               = useState(false);
  const topRef                              = useRef<HTMLDivElement>(null);
  const formRef                             = useRef<HTMLDivElement>(null);

  const template = TEMPLATES.find(t => t.id === templateId) ?? null;

  // Reset template-specific choices when template changes
  const selectTemplate = (id: TemplateId) => {
    setTemplateId(id);
    setChatbotOption('ai'); // Pre-seleziona chatbot AI (Status Quo Bias)
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

  // ── Price calculation ─────────────────────────────────────────────────────
  const originalTotal = (() => {
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

  const promoTotal = disc(originalTotal);
  const savings    = originalTotal - promoTotal;

  const { value: animatedPromo,     flash: flashPromo }     = useAnimatedPrice(promoTotal);
  const { value: animatedOriginal,  flash: flashOriginal }  = useAnimatedPrice(originalTotal);
  const { value: animatedSavings,   flash: flashSavings }   = useAnimatedPrice(savings);

  // ── Form ─────────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name    = 'Il nome è obbligatorio';
    if (!form.phone.trim()) e.phone   = 'Il numero WhatsApp è obbligatorio';
    if (!form.email.trim()) e.email   = "L'email è obbligatoria";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email non valida';
    if (!form.privacy)      e.privacy = 'Accetta la privacy policy per continuare';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const chatbotLabel = path === 'vetrina'
      ? VETRINA_CHATBOT_OPTIONS.find(c => c.id === chatbotOption)?.label ?? 'Nessuno'
      : template?.chatbotOptions.find(c => c.id === chatbotOption)?.label ?? 'Nessuno';
    const extrasLabel  = path === 'vetrina'
      ? [...extras].map(id => VETRINA_EXTRAS.find(x => x.id === id)?.label).filter(Boolean).join(', ')
      : [...extras].map(id => template?.extras.find(x => x.id === id)?.label).filter(Boolean).join(', ');
    const globalsLabel = [...globalAddons].filter(id => id !== 'seo').map(id => GLOBAL_ADDONS.find(a => a.id === id)?.label).filter(Boolean).join(', ');

    const waMsg = encodeURIComponent(
      `Ciao Mauro! Ho completato il Simulatore Preventivo.\n` +
      `Nome: ${form.name}\n` +
      `Soluzione: ${path === 'vetrina' ? 'Sito Vetrina Custom' : `Template ${template?.label}`}\n` +
      `Chatbot: ${chatbotLabel}\n` +
      `Extra template: ${extrasLabel || 'Nessuno'}\n` +
      `Add-on globali: SEO (incluso)${globalsLabel ? ', ' + globalsLabel : ''}\n` +
      `Preventivo promo: €${promoTotal} (invece di €${originalTotal})\n` +
      `Email: ${form.email}\n` +
      `Attendo il tuo preventivo con la promo –30%!`
    );

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => window.open(`https://wa.me/393480029661?text=${waMsg}`, '_blank'), 800);
    }, 1200);
  };

  const handleReset = () => {
    setPath(null); setTemplateId(null); setChatbotOption('none');
    setExtras(new Set()); setGlobalAddons(new Set(['seo']));
    setForm({ name: '', email: '', phone: '', privacy: false });
    setErrors({}); setSubmitting(false); setSuccess(false);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ─────────────────────────────────────────────────────────────────────────
  if (success) return (
    <>
      <SEO
        title="Preventivo Bloccato | Mauro.exe"
        description="Preventivo ricevuto. Ti contatto entro 2 ore su WhatsApp."
        canonical="https://www.mauroceccarelli.it/simulatore"
        keywords="preventivo sito web Ascoli Piceno"
      />
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Preventivo bloccato!</h2>
          <p className="text-cyan-400 font-bold mb-4">Hai appena fatto la mossa più intelligente per la tua attività.</p>
          <p className="text-gray-400 leading-relaxed mb-6">
            Ti ho riservato uno dei 3 posti di Aprile. Riceverai un messaggio WhatsApp da me entro 2 ore con il preventivo dettagliato e la promo –30% già applicata.
          </p>
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-8">
            <p className="text-amber-300 text-sm">
              🎁 <strong>Bonus:</strong> Riceverai gratuitamente una mini-audit SEO del tuo sito attuale (valore €90) solo per aver completato il simulatore.
            </p>
          </div>
          <a
            href={`https://wa.me/393480029661`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Scrivimi su WhatsApp ora
          </a>
          <div className="mt-8">
            <button onClick={handleReset} className="text-gray-600 hover:text-gray-400 text-xs underline underline-offset-4 transition-colors">
              ← Ricomincia il simulatore
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        title="Simulatore Preventivo Sito Web | Mauro.exe — Ascoli Piceno"
        description="Scopri il costo del tuo sito web professionale. Configura template, chatbot AI e moduli. Promo Pasqua –30%. Solo 3 posti ad Aprile."
        canonical="https://www.mauroceccarelli.it/simulatore"
        keywords="preventivo sito web Ascoli Piceno, costo chatbot AI, template sito web PMI Marche"
      />
      <div ref={topRef} className="min-h-screen bg-[#0d0d1a] text-gray-200 selection:bg-cyan-400 selection:text-black">
        {/* Glow bg */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-[-10%] w-[50%] h-[40%] bg-cyan-400/3 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-[-10%] w-[40%] h-[35%] bg-purple-600/3 rounded-full blur-[120px]" />
        </div>

        {/* ── lg: left scrolls, right sidebar sempre visibile ─────── */}
        <div className="relative z-10 lg:flex lg:min-h-screen">

          {/* ── LEFT: contenuto scorrevole ──────────────────────────── */}
          <div className="flex-1 min-w-0 px-4 py-10 lg:pl-8 xl:pl-16 lg:pr-8">

          {/* ── HEADER ─────────────────────────────────────────────────── */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-bold mb-5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse inline-block" />
              ⚡ 2 posti disponibili ad Aprile — promo –30% in scadenza
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
              Ogni Giorno Senza Preventivo<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Stai Scegliendo il Buio.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              Configura il sito dei tuoi sogni — ottieni il prezzo esatto{' '}
              <span className="text-white font-bold">in 30 secondi, gratis</span>.<br />
              Promo <span className="text-cyan-400 font-bold">–30%</span> attiva:{' '}
              <span className="text-amber-400 font-bold">scade il 20 aprile 2026</span>.
            </p>
            <p className="text-xs text-gray-600 mt-3">
              Nessuna carta di credito &nbsp;·&nbsp; Nessuna email richiesta per configurare &nbsp;·&nbsp; Zero impegno
            </p>
          </div>

          {/* ── CONFIGURATORE STEPS ─────────────────────────────────── */}
          <div className="space-y-12">

              {/* ① SCELTA BASE ──────────────────────────────────────── */}
              <section>
                <SectionLabel number={1} label="Da dove vuoi partire?" />
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {/* Sito Vetrina */}
                  <button
                    onClick={() => { setPath('vetrina'); setTemplateId(null); setChatbotOption('none'); setExtras(new Set()); }}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      path === 'vetrina'
                        ? 'border-cyan-400 bg-cyan-400/5 shadow-[0_0_24px_rgba(0,229,255,0.12)]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                    }`}
                  >
                    {path === 'vetrina' && <CheckCircle size={18} className="text-cyan-400 float-right" />}
                    <div className="text-3xl mb-3">⚙️</div>
                    <h3 className="font-bold text-white text-base mb-1">Sito Vetrina Personalizzato</h3>
                    <p className="text-gray-500 text-xs mb-3">Design su misura, mobile-first, architettura unica. Per chi non vuole somigliare a nessun altro.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-cyan-400 font-black text-xl">€{disc(P.siteBase).toLocaleString('it-IT')}</span>
                      <span className="text-gray-600 line-through text-sm">€{P.siteBase.toLocaleString('it-IT')}</span>
                      <span className="text-green-400 text-xs font-bold">–30%</span>
                    </div>
                  </button>

                  {/* Template settore */}
                  <button
                    onClick={() => setPath('template')}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 relative ${
                      path === 'template'
                        ? 'border-cyan-400 bg-cyan-400/5 shadow-[0_0_24px_rgba(0,229,255,0.12)]'
                        : 'border-cyan-400/30 bg-white/[0.02] hover:border-cyan-400/60'
                    }`}
                  >
                    <div className="absolute -top-3.5 left-4 bg-cyan-400 text-black text-[11px] font-black px-3 py-1 rounded-full shadow-lg shadow-cyan-400/30">
                      PIÙ SCELTO
                    </div>
                    {path === 'template' && <CheckCircle size={18} className="text-cyan-400 float-right mt-1" />}
                    <div className="text-3xl mb-3">🚀</div>
                    <h3 className="font-bold text-white text-base mb-1">Template Premium per Settore</h3>
                    <p className="text-cyan-300 text-[11px] font-bold mb-2 uppercase tracking-wide">Online in 3 Giorni</p>
                    <p className="text-gray-500 text-xs mb-3">Layout 3D già ottimizzato per il tuo settore. Chatbot, gestionale e moduli configurabili.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-cyan-400 font-black text-xl">da €{disc(P.siteBase).toLocaleString('it-IT')}</span>
                      <span className="text-gray-600 line-through text-sm">€{P.siteBase.toLocaleString('it-IT')}</span>
                      <span className="text-green-400 text-xs font-bold">–30%</span>
                    </div>
                  </button>
                </div>
              </section>

              {/* ② VETRINA — Incluso + Opzioni ──────────────────────── */}
              <AnimatePresence>
              {path === 'vetrina' && (
                <motion.section key="step2-vetrina" {...reveal} style={{ overflow: 'hidden' }}>
                  <SectionLabel number={2} label="Cosa ottieni con il Sito Vetrina" />

                  {/* Sempre incluso */}
                  <div className="mt-4 mb-7 p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
                    <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-4">✅ Sempre incluso nel prezzo</p>
                    <div className="space-y-3">
                      {VETRINA_INCLUDED.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs leading-relaxed">
                            <span className="text-white font-bold">{item.label}:</span>{' '}
                            <span className="text-gray-400">{item.sub}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chatbot options */}
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-300 mb-1">Aggiungi un Assistente Virtuale</p>
                    <p className="text-xs text-gray-500 mb-3">L'AI che lavora per te mentre dormi.</p>
                    <div className="space-y-2">
                      {VETRINA_CHATBOT_OPTIONS.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setChatbotOption(opt.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                            chatbotOption === opt.id
                              ? 'border-cyan-400/60 bg-cyan-400/5'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            chatbotOption === opt.id ? 'border-cyan-400' : 'border-white/30'
                          }`}>
                            {chatbotOption === opt.id && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-bold text-white">{opt.label}</p>
                              {opt.id === 'ai' && (
                                <span className="text-[10px] font-black text-red-400 bg-red-400/10 border border-red-400/30 px-1.5 py-0.5 rounded-full">🔥 SCELTA CONSIGLIATA</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {opt.price === 0 ? (
                              <span className="text-gray-500 text-sm">Incluso</span>
                            ) : (
                              <div>
                                <p className="text-[11px] text-gray-600 line-through">+€{opt.price.toLocaleString('it-IT')}</p>
                                <p className={`font-black text-sm ${chatbotOption === opt.id ? 'text-cyan-400' : 'text-gray-400'}`}>
                                  +€{disc(opt.price).toLocaleString('it-IT')}
                                </p>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra: Admin Panel */}
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-1">Moduli Aggiuntivi</p>
                    <p className="text-xs text-gray-500 mb-3">Potenzia il tuo sito con strumenti professionali.</p>
                    <div className="space-y-2">
                      {VETRINA_EXTRAS.map(ex => {
                        const sel = extras.has(ex.id);
                        return (
                          <button
                            key={ex.id}
                            onClick={() => toggleExtra(ex.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                              sel ? 'border-purple-400/50 bg-purple-400/5' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                              sel ? 'border-purple-400 bg-purple-400' : 'border-white/30'
                            }`}>
                              {sel && <CheckCircle size={11} className="text-black" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-white">{ex.label}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{ex.desc}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-[11px] text-gray-600 line-through">+€{ex.price.toLocaleString('it-IT')}</p>
                              <p className={`font-black text-sm ${sel ? 'text-purple-400' : 'text-gray-400'}`}>
                                +€{disc(ex.price).toLocaleString('it-IT')}
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

              {/* ② TEMPLATE SETTORE (solo se path = template) ────────── */}
              <AnimatePresence>
              {path === 'template' && (
                <motion.section key="step2" {...reveal} style={{ overflow: 'hidden' }}>
                  <SectionLabel number={2} label="Scegli il tuo settore" />
                  <p className="text-gray-500 text-sm mt-1 mb-4">Clicca per selezionare. Ogni template è personalizzabile al 100%.</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TEMPLATES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => selectTemplate(t.id)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                          templateId === t.id
                            ? 'border-cyan-400 bg-cyan-400/5 shadow-[0_0_20px_rgba(0,229,255,0.1)]'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-3xl">{t.emoji}</span>
                          {templateId === t.id && <CheckCircle size={16} className="text-cyan-400" />}
                        </div>
                        <h3 className="font-bold text-white text-sm mb-1">{t.label}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-3">{t.tagline}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-cyan-400 font-black">da €{disc(P.siteBase).toLocaleString('it-IT')}</span>
                          </div>
                          {t.demoUrl && (
                            <a
                              href={t.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded-lg hover:bg-cyan-400/10 transition-colors"
                            >
                              Demo <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.section>
              )}
              </AnimatePresence>

              {/* ③ CONFIGURAZIONE (solo se template selezionato) ─────── */}
              <AnimatePresence>
              {path === 'template' && template && (
                <motion.section key={`step3-${templateId}`} {...reveal} style={{ overflow: 'hidden' }}>
                  <SectionLabel number={3} label={`Configura il tuo ${template.label}`} />

                  {/* Sempre incluso */}
                  <div className="mt-4 mb-6 p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
                    <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-4">✅ Sempre incluso nel prezzo</p>
                    <div className="space-y-3">
                      {VETRINA_INCLUDED.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs leading-relaxed">
                            <span className="text-white font-bold">{item.label}:</span>{' '}
                            <span className="text-gray-400">{item.sub}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chatbot options */}
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-300 mb-3">Opzione Chatbot</p>
                    <div className="space-y-2">
                      {template.chatbotOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setChatbotOption(opt.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                            chatbotOption === opt.id
                              ? 'border-cyan-400/60 bg-cyan-400/5'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            chatbotOption === opt.id ? 'border-cyan-400' : 'border-white/30'
                          }`}>
                            {chatbotOption === opt.id && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-bold text-white">{opt.label}</p>
                              {opt.id === 'ai' && (
                                <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded-full">MIGLIOR ROI</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {opt.price === 0 ? (
                              <span className="text-gray-500 text-sm">Incluso</span>
                            ) : (
                              <div>
                                <p className="text-[11px] text-gray-600 line-through">+€{opt.price.toLocaleString('it-IT')}</p>
                                <p className={`font-black text-sm ${chatbotOption === opt.id ? 'text-cyan-400' : 'text-gray-400'}`}>
                                  +€{disc(opt.price).toLocaleString('it-IT')}
                                </p>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Template extras */}
                  {template.extras.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-bold text-gray-300 mb-3">Moduli aggiuntivi per {template.label}</p>
                      <div className="space-y-2">
                        {template.extras.map(ex => {
                          const sel = extras.has(ex.id);
                          return (
                            <button
                              key={ex.id}
                              onClick={() => toggleExtra(ex.id)}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                                sel ? 'border-purple-400/50 bg-purple-400/5' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                                sel ? 'border-purple-400 bg-purple-400' : 'border-white/30'
                              }`}>
                                {sel && <CheckCircle size={11} className="text-black" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-white">{ex.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{ex.desc}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-[11px] text-gray-600 line-through">+€{ex.price.toLocaleString('it-IT')}</p>
                                <p className={`font-black text-sm ${sel ? 'text-purple-400' : 'text-gray-400'}`}>
                                  +€{disc(ex.price).toLocaleString('it-IT')}
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

              {/* ④ ADD-ON GLOBALI (visibili se path scelto) ────────────── */}
              <AnimatePresence>
              {path && (
                <motion.section key="step4" {...reveal} style={{ overflow: 'hidden' }}>
                  <SectionLabel number={path === 'template' && template ? 4 : 3} label="Aggiungi moduli extra al tuo sito" />
                  <p className="text-gray-500 text-sm mt-1 mb-4">Il SEO base è sempre incluso gratis.</p>
                  <div className="space-y-2">
                    {GLOBAL_ADDONS.map(addon => {
                      const sel = globalAddons.has(addon.id);
                      return (
                        <button
                          key={addon.id}
                          onClick={() => toggleGlobal(addon.id)}
                          disabled={addon.locked}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                            addon.locked
                              ? 'border-green-500/20 bg-green-500/5 cursor-default'
                              : sel
                              ? 'border-cyan-400/50 bg-cyan-400/5'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                            addon.locked ? 'border-green-400 bg-green-400' : sel ? 'border-cyan-400 bg-cyan-400' : 'border-white/30'
                          }`}>
                            {(addon.locked || sel) && <CheckCircle size={11} className="text-black" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-bold ${addon.locked ? 'text-green-400' : 'text-white'}`}>{addon.label}</span>
                              {addon.locked && (
                                <span className="text-[10px] font-black text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                                  INCLUSO GRATIS
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{addon.desc}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {addon.locked ? (
                              <span className="text-green-400 font-black text-sm">€0</span>
                            ) : (
                              <div>
                                <p className="text-[11px] text-gray-600 line-through">+€{addon.price}</p>
                                <p className={`font-black text-sm ${sel ? 'text-cyan-400' : 'text-gray-400'}`}>+€{disc(addon.price)}</p>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.section>
              )}
              </AnimatePresence>

              {/* ⑤ FORM ─────────────────────────────────────────────── */}
              <AnimatePresence>
              {path && (
                <motion.section key="step5" {...reveal} style={{ overflow: 'hidden' }}>
                <div ref={formRef}>
                  <SectionLabel number={path === 'template' && template ? 5 : 4} label="Blocca il tuo prezzo Pasqua" />
                  <div className="flex items-center gap-2 my-4 p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg">
                    <Clock size={15} className="text-amber-400 flex-shrink-0" />
                    <span className="text-amber-400 text-sm font-bold">Promo –30% Pasqua · Scade 20 Aprile 2026</span>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Nome *</label>
                        <input type="text" name="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Mario Rossi"
                          className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all text-sm`} />
                        {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">WhatsApp *</label>
                        <input type="tel" name="phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+39 348 000 0000"
                          className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all text-sm`} />
                        {errors.phone && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="mario@latuaattivita.it"
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all text-sm`} />
                      {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" name="privacy" id="privacy" checked={form.privacy}
                        onChange={e => setForm(p => ({ ...p, privacy: e.target.checked }))}
                        className="mt-1 w-4 h-4 accent-cyan-400 cursor-pointer flex-shrink-0" />
                      <label htmlFor="privacy" className="text-gray-400 text-xs leading-relaxed cursor-pointer">
                        Accetto la <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Privacy Policy</a>. I miei dati saranno usati solo per inviarmi il preventivo. *
                      </label>
                    </div>
                    {errors.privacy && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={11} />{errors.privacy}</p>}

                    <button type="submit" disabled={submitting}
                      className={`w-full py-4 rounded-xl font-black text-black text-sm tracking-wider bg-gradient-to-r from-cyan-400 to-cyan-500 hover:shadow-[0_0_28px_rgba(0,229,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 ${submitting ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-0.5 transform'}`}>
                      {submitting ? <><Loader2 size={18} className="animate-spin" /> ELABORAZIONE...</> : <><Zap size={16} />BLOCCA IL PREZZO ORA →</>}
                    </button>
                    <p className="text-center text-gray-600 text-xs">No grazie, preferisco pagare il prezzo pieno</p>
                    <p className="text-center text-gray-600 text-xs flex items-center justify-center gap-1.5"><Lock size={10} /> I tuoi dati sono al sicuro. Nessuno spam.</p>
                  </form>
                </div>
                </motion.section>
              )}
              </AnimatePresence>

          </div>{/* end configuratore steps */}
          </div>{/* end left scrollable */}

          {/* ── RIGHT: sidebar sempre visibile (desktop) ──────────────── */}
          <div className="hidden lg:block w-[300px] xl:w-[340px] flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-l border-white/10 bg-[#0d0d1a] px-5 py-8">
              <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-orange-500/15 to-red-500/15 border border-orange-500/25 flex items-start gap-2">
                <Zap size={13} className="text-orange-400 flex-shrink-0 mt-0.5 animate-pulse" />
                <p className="text-xs font-bold text-orange-300 leading-snug">⚡ PROMO PASQUA –30% APPLICATA.<br />SOLO 3 POSTI RIMANENTI AD APRILE.</p>
              </div>

              <div className={`p-5 rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 ${flashPromo ? 'shadow-[0_0_24px_rgba(0,229,255,0.2)]' : ''}`}>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Il tuo preventivo</p>

                {/* Riepilogo configurazione */}
                {path && (
                  <div className="mb-4 pb-4 border-b border-white/10 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sito base</span>
                      <span className="text-white font-bold">€{disc(P.siteBase).toLocaleString('it-IT')}</span>
                    </div>
                    {path === 'template' && template && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{template.emoji} {template.label}</span>
                        <span className="text-gray-300">incluso</span>
                      </div>
                    )}
                    {path === 'template' && template && chatbotOption !== 'none' && (() => {
                      const cb = template.chatbotOptions.find(c => c.id === chatbotOption);
                      return cb ? (
                        <div className="flex justify-between">
                          <span className="text-gray-400 truncate max-w-[150px]">{cb.label}</span>
                          <span className="text-cyan-400 font-bold">+€{disc(cb.price).toLocaleString('it-IT')}</span>
                        </div>
                      ) : null;
                    })()}
                    {path === 'template' && template && [...extras].map(id => {
                      const ex = template.extras.find(e => e.id === id);
                      return ex ? (
                        <div key={id} className="flex justify-between">
                          <span className="text-gray-400 truncate max-w-[150px]">{ex.label}</span>
                          <span className="text-purple-400 font-bold">+€{disc(ex.price).toLocaleString('it-IT')}</span>
                        </div>
                      ) : null;
                    })}
                    {path === 'vetrina' && chatbotOption !== 'none' && (() => {
                      const cb = VETRINA_CHATBOT_OPTIONS.find(c => c.id === chatbotOption);
                      return cb ? (
                        <div className="flex justify-between">
                          <span className="text-gray-400 truncate max-w-[150px]">{cb.label}</span>
                          <span className="text-cyan-400 font-bold">+€{disc(cb.price).toLocaleString('it-IT')}</span>
                        </div>
                      ) : null;
                    })()}
                    {path === 'vetrina' && [...extras].map(id => {
                      const ex = VETRINA_EXTRAS.find(e => e.id === id);
                      return ex ? (
                        <div key={id} className="flex justify-between">
                          <span className="text-gray-400 truncate max-w-[150px]">{ex.label}</span>
                          <span className="text-purple-400 font-bold">+€{disc(ex.price).toLocaleString('it-IT')}</span>
                        </div>
                      ) : null;
                    })}
                    {[...globalAddons].filter(id => id !== 'seo').map(id => {
                      const a = GLOBAL_ADDONS.find(x => x.id === id);
                      return a ? (
                        <div key={id} className="flex justify-between">
                          <span className="text-gray-400 truncate max-w-[150px]">{a.label.split('—')[0].trim()}</span>
                          <span className="text-cyan-400 font-bold">+€{disc(a.price)}</span>
                        </div>
                      ) : null;
                    })}
                    <div className="flex justify-between text-gray-600">
                      <span>SEO Base & Lighthouse 98/100</span>
                      <span className="text-green-400 font-bold">Gratis</span>
                    </div>
                  </div>
                )}

                {/* Price display */}
                {promoTotal > 0 ? (
                  <div className="text-center mb-4">
                    <p className={`text-gray-500 line-through text-sm mb-1 tabular-nums transition-all ${flashOriginal ? 'text-red-400/70' : ''}`}>
                      €{animatedOriginal.toLocaleString('it-IT')}
                    </p>
                    <p className={`text-4xl font-black tabular-nums transition-all duration-300 ${flashPromo ? 'text-cyan-300 scale-105' : 'text-white'}`}>
                      €{animatedPromo.toLocaleString('it-IT')}
                    </p>
                    {savings > 0 && (
                      <p className={`text-xs font-bold mt-2 transition-all ${flashSavings ? 'text-green-300' : 'text-green-400'}`}>
                        Risparmi €{animatedSavings.toLocaleString('it-IT')} con la promo
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-center text-gray-600 text-sm py-6 italic">
                    Seleziona una soluzione per vedere il preventivo in tempo reale
                  </p>
                )}

                {/* Trust signals */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {[
                    { icon: <Shield size={11} className="text-green-400" />, text: 'Nessun anticipo richiesto' },
                    { icon: <Star size={11} className="text-cyan-400" />,   text: 'Lighthouse 98/100 garantito' },
                    { icon: <CheckCircle size={11} className="text-purple-400" />, text: 'GDPR compliant' },
                    { icon: <Zap size={11} className="text-amber-400" />,   text: '52 progetti consegnati' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      {t.icon}<span>{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>
          </div>{/* end sidebar scroll */}
          </div>{/* end right sidebar */}

        </div>{/* end lg:flex */}

        {/* ── MOBILE ONLY: floating bottom bar ──────────────────────────── */}
        {promoTotal > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d1a]/95 backdrop-blur-md border-t border-white/10 p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide hidden lg:block mb-0.5">Preventivo live</p>
              <p className="text-gray-500 text-xs line-through tabular-nums">€{originalTotal.toLocaleString('it-IT')}</p>
              <p className={`text-2xl font-black tabular-nums transition-all duration-300 ${flashPromo ? 'text-cyan-300' : 'text-white'}`}>
                €{animatedPromo.toLocaleString('it-IT')}
              </p>
              {savings > 0 && <p className="text-green-400 text-[10px] font-bold">Risparmi €{animatedSavings.toLocaleString('it-IT')}</p>}
            </div>
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-black text-sm rounded-xl shadow-lg shadow-cyan-400/20"
            >
              <Zap size={14} />
              Blocca
            </button>
          </div>
        )}

      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
        <span className="text-cyan-400 text-xs font-black">{number}</span>
      </div>
      <h2 className="text-lg font-black text-white">{label}</h2>
    </div>
  );
}
