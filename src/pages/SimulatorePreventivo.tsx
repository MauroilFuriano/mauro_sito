import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Loader2, ChevronRight, Shield, Star, Zap, Clock, Lock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

// ─────────────────────────────────────────────────────────────────────────────
// COPY — Generato con logica di neuromarketing (loss aversion, FOMO, anchoring,
// goal gradient, IKEA effect, reciprocità, confirm-shaming etico)
// ─────────────────────────────────────────────────────────────────────────────

const COPY = {

  // 1. Titolo H1 — Loss Aversion pura: il costo dell'assenza digitale
  h1: 'Ogni Giorno Senza Sito Perdi Clienti.',

  // 2. Sottotitolo — benefit immediato + urgenza reale
  subtitle: 'Scopri in 2 minuti quanto costa il tuo sito web. Promo Pasqua –30% valida fino al 20 aprile.',

  // 3. Badge scarsità — ancora visiva sopra il fold
  badge: '🔥 Solo 3 posti liberi ad Aprile',

  // ── STEP 1 ── La Bivio ─────────────────────────────────────────────────────
  step1: {
    title: 'Da dove vuoi partire?',
    subtitle: 'Scegli la soluzione più adatta alla tua attività.',
    optionA: {
      label: 'Sito Vetrina Professionale',
      badge: null,
      price: 'da €980',
      originalPrice: '€1.400',
      description:
        'Design su misura, mobile-first, ottimizzato Google. Vai online in 7 giorni e smetti di perdere clienti che cercano la tua attività online.',
    },
    optionB: {
      label: 'Template Pronto per il Tuo Settore',
      badge: 'Più Scelto',
      price: 'da €490',
      originalPrice: '€700',
      description:
        'Template testato su centinaia di attività nel tuo settore. Online in 3 giorni, risultati immediati, nessuna attesa.',
    },
  },

  // ── STEP 2 ── Template settore (solo se scelta Opzione B) ──────────────────
  step2: {
    title: 'Qual è il tuo settore?',
    subtitle: 'Ogni template è ottimizzato per convertire visitatori in clienti nel tuo mercato specifico.',
    templates: [
      {
        id: 'fotografo',
        emoji: '📸',
        label: 'Fotografo',
        tagline: 'Portfolio che vende da solo — i clienti ti trovano e prenotano online.',
        price: 490,
      },
      {
        id: 'parruccheria',
        emoji: '✂️',
        label: 'Parruccheria / Beauty',
        tagline: 'Prenotazioni H24 — niente più telefonate perse, agenda sempre piena.',
        price: 490,
      },
      {
        id: 'hotel',
        emoji: '🏨',
        label: 'Hotel / B&B',
        tagline: 'Prenota dirette senza commissioni OTA — guadagni di più su ogni camera.',
        price: 590,
      },
      {
        id: 'ristorante',
        emoji: '🍽️',
        label: 'Ristorante / Pizzeria',
        tagline: 'Menu digitale + prenotazioni online — sala piena ogni sera.',
        price: 490,
      },
      {
        id: 'cantina',
        emoji: '🍷',
        label: 'Cantina / Agriturismo',
        tagline: 'Racconta il territorio, vendi vino online — turisti da tutta Italia.',
        price: 590,
      },
      {
        id: 'concessionaria',
        emoji: '🚗',
        label: 'Concessionaria / Auto',
        tagline: 'Showroom virtuale 24/7 — lead qualificati mentre dormi.',
        price: 690,
      },
    ],
  },

  // ── STEP 3 ── Moduli aggiuntivi ────────────────────────────────────────────
  step3: {
    title: 'Potenzia il tuo sito.',
    subtitle: 'Ogni modulo è progettato per portarti più clienti. Il SEO base è SEMPRE incluso gratis.',
    addons: [
      {
        id: 'seo',
        label: 'SEO Base',
        sublabel: 'INCLUSO GRATIS',
        description: 'Ottimizzazione Google, meta tag, sitemap XML e schema markup.',
        price: 0,
        locked: true,
        included: true,
      },
      {
        id: 'chatbot',
        label: 'Chatbot AI',
        sublabel: '+€290 (promo –30%)',
        description: 'Risponde ai clienti H24, qualifica i lead, prenota appuntamenti in automatico.',
        price: 290,
        locked: false,
        included: false,
        defaultSelected: true,
      },
      {
        id: 'ecommerce',
        label: 'E-commerce',
        sublabel: '+€490',
        description: 'Negozio online completo con Stripe. Vendi prodotti o servizi direttamente dal sito.',
        price: 490,
        locked: false,
        included: false,
        defaultSelected: false,
      },
      {
        id: 'geo2026',
        label: 'Add-on GEO 2026',
        sublabel: '+€190',
        description: 'Ottimizzazione per ricerche locali e AI overview Google 2026. Prima che lo faccia la concorrenza.',
        price: 190,
        locked: false,
        included: false,
        defaultSelected: false,
      },
    ],
  },

  // ── STEP 4 ── Blocca il prezzo ─────────────────────────────────────────────
  step4: {
    title: 'Blocca il tuo prezzo Pasqua.',
    urgencyText:
      'La promo –30% scade il 20 aprile. Inserisci i tuoi dati: ti contatto entro 2 ore su WhatsApp con il preventivo definitivo, senza impegni.',
    ctaButton: 'Blocca il Prezzo Ora →',
    ctaDecline: 'No grazie, preferisco pagare il prezzo pieno',
    privacyNote: 'I tuoi dati sono al sicuro. Nessuno spam, solo il tuo preventivo.',
  },

  // ── SIDEBAR ────────────────────────────────────────────────────────────────
  sidebar: {
    title: 'Il tuo preventivo',
    scarcityBanner: '⚡ Solo 3 posti disponibili ad Aprile 2026',
    savingsLabel: 'Stai risparmiando con la promo Pasqua:',
    trustSignals: [
      { icon: 'shield', text: '30 giorni soddisfatti o rimborsati' },
      { icon: 'star', text: '47 attività già online nelle Marche' },
      { icon: 'zap', text: 'Online in 7 giorni lavorativi garantiti' },
    ],
    discountNote: 'Promo Pasqua –30% applicata automaticamente',
  },

  // ── PROGRESS BAR ── Goal Gradient Effect ──────────────────────────────────
  progressLabels: [
    { step: 1, label: 'Inizia!', subtext: 'Scegli la base' },
    { step: 2, label: 'Ottimo!', subtext: 'Scegli il settore' },
    { step: 3, label: 'Quasi fatto!', subtext: 'Personalizza' },
    { step: 4, label: 'Un ultimo step!', subtext: 'Blocca il prezzo' },
  ],

  // ── SUCCESS MESSAGE ── Reciprocità + WhatsApp next step ───────────────────
  success: {
    title: 'Preventivo bloccato!',
    subtitle: 'Hai appena fatto la mossa più intelligente per la tua attività.',
    body: 'Ti ho riservato uno dei 3 posti di Aprile. Riceverai un messaggio WhatsApp da me entro 2 ore con il preventivo dettagliato e la promo –30% già applicata.',
    gift: '🎁 Bonus sorpresa: riceverai gratuitamente una mini-audit SEO del tuo sito attuale (valore €90) solo per aver completato il simulatore.',
    whatsappCta: 'Scrivimi subito su WhatsApp',
    whatsappUrl: 'https://wa.me/393480029661?text=Ciao+Mauro!+Ho+appena+completato+il+simulatore+preventivo.+Sono+in+attesa+del+tuo+messaggio!',
    closingNote: 'Mauro Ceccarelli — Sviluppatore Web · Ascoli Piceno · +39 348 002 9661',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type PathType = 'vetrina' | 'template' | null;
type TemplateId = 'fotografo' | 'parruccheria' | 'hotel' | 'ristorante' | 'cantina' | 'concessionaria' | null;

interface FormData {
  name: string;
  email: string;
  phone: string;
  privacy: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY — Sconto Pasqua
// ─────────────────────────────────────────────────────────────────────────────
const PROMO_DISCOUNT = 0.30;

function applyDiscount(price: number): number {
  return Math.round(price * (1 - PROMO_DISCOUNT));
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const ScarcityBadge: React.FC = () => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-bold animate-pulse">
    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
    {COPY.badge}
  </div>
);

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  skipStep2: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, skipStep2 }) => {
  const effectiveTotal = skipStep2 ? totalSteps - 1 : totalSteps;
  const effectiveCurrent = skipStep2 && currentStep >= 3 ? currentStep - 1 : currentStep;
  const pct = Math.round(((effectiveCurrent - 1) / (effectiveTotal - 1)) * 100);

  const label = COPY.progressLabels[currentStep - 1];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-cyan-400 font-bold text-sm">{label?.label}</span>
        <span className="text-gray-500 text-xs">{label?.subtext} · Step {effectiveCurrent}/{effectiveTotal}</span>
      </div>
      <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

interface SidebarProps {
  path: PathType;
  selectedTemplate: TemplateId;
  selectedAddons: string[];
  currentStep: number;
}

const Sidebar: React.FC<SidebarProps> = ({ path, selectedTemplate, selectedAddons, currentStep }) => {
  const basePrice = (() => {
    if (path === 'vetrina') return 1400;
    if (path === 'template' && selectedTemplate) {
      const t = COPY.step2.templates.find(t => t.id === selectedTemplate);
      return t ? t.price / (1 - PROMO_DISCOUNT) : 700;
    }
    return 0;
  })();

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const a = COPY.step3.addons.find(a => a.id === id);
    return sum + (a && !a.included ? (a.price / (1 - PROMO_DISCOUNT)) : 0);
  }, 0);

  const totalOriginal = Math.round(basePrice + addonsTotal);
  const totalDiscounted = applyDiscount(totalOriginal);
  const savings = totalOriginal - totalDiscounted;

  const trustIcons: Record<string, React.ReactNode> = {
    shield: <Shield size={16} className="text-cyan-400" />,
    star: <Star size={16} className="text-amber-400" />,
    zap: <Zap size={16} className="text-green-400" />,
  };

  return (
    <aside className="sticky top-24 bg-dark-800 border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl">
      {/* Scarcità */}
      <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg px-3 py-2 text-amber-400 text-xs font-bold text-center">
        {COPY.sidebar.scarcityBanner}
      </div>

      {/* Titolo */}
      <h3 className="text-white font-display font-bold text-base tracking-wide">
        {COPY.sidebar.title}
      </h3>

      {/* Riepilogo prezzi */}
      <div className="space-y-2 text-sm">
        {path === 'vetrina' && (
          <div className="flex justify-between text-gray-400">
            <span>Sito Vetrina</span>
            <span>€1.400</span>
          </div>
        )}
        {path === 'template' && selectedTemplate && (() => {
          const t = COPY.step2.templates.find(t => t.id === selectedTemplate);
          return t ? (
            <div className="flex justify-between text-gray-400">
              <span>Template {t.label}</span>
              <span>€{Math.round(t.price / (1 - PROMO_DISCOUNT))}</span>
            </div>
          ) : null;
        })()}
        {selectedAddons.filter(id => id !== 'seo').map(id => {
          const a = COPY.step3.addons.find(a => a.id === id);
          if (!a || a.included) return null;
          const origPrice = Math.round(a.price / (1 - PROMO_DISCOUNT));
          return (
            <div key={id} className="flex justify-between text-gray-400">
              <span>{a.label}</span>
              <span>€{origPrice}</span>
            </div>
          );
        })}
        <div className="flex justify-between text-gray-500 text-xs">
          <span>SEO Base</span>
          <span className="text-green-400 font-bold">GRATIS</span>
        </div>
      </div>

      {totalOriginal > 0 && (
        <>
          <div className="border-t border-white/10 pt-4 space-y-1">
            <div className="flex justify-between text-gray-500 text-sm line-through">
              <span>Prezzo intero</span>
              <span>€{totalOriginal}</span>
            </div>
            <div className="flex justify-between text-cyan-400 font-bold text-lg">
              <span>Prezzo promo</span>
              <span>€{totalDiscounted}</span>
            </div>
          </div>

          {savings > 0 && (
            <div className="bg-green-400/10 border border-green-400/30 rounded-lg px-3 py-2 text-center">
              <p className="text-green-400 text-xs font-bold">{COPY.sidebar.savingsLabel}</p>
              <p className="text-green-400 text-xl font-bold">–€{savings}</p>
              <p className="text-green-400/70 text-xs">{COPY.sidebar.discountNote}</p>
            </div>
          )}
        </>
      )}

      {currentStep < 4 && totalOriginal === 0 && (
        <p className="text-gray-600 text-xs text-center italic">Il riepilogo si aggiornerà man mano che scegli.</p>
      )}

      {/* Trust Signals */}
      <div className="border-t border-white/10 pt-4 space-y-2">
        {COPY.sidebar.trustSignals.map((ts) => (
          <div key={ts.text} className="flex items-center gap-2">
            {trustIcons[ts.icon]}
            <span className="text-gray-400 text-xs">{ts.text}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface Step1Props {
  onSelect: (path: PathType) => void;
  selected: PathType;
}

const Step1: React.FC<Step1Props> = ({ onSelect, selected }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
      {COPY.step1.title}
    </h2>
    <p className="text-gray-400 mb-8">{COPY.step1.subtitle}</p>

    <div className="grid sm:grid-cols-2 gap-4">
      {/* Opzione A — Sito Vetrina */}
      <button
        onClick={() => onSelect('vetrina')}
        className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          selected === 'vetrina'
            ? 'border-cyan-400 bg-cyan-400/5 shadow-[0_0_24px_rgba(0,229,255,0.15)]'
            : 'border-white/10 bg-dark-800 hover:border-white/30'
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display font-bold text-white text-base leading-tight pr-2">
            {COPY.step1.optionA.label}
          </h3>
          {selected === 'vetrina' && (
            <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-cyan-400">{COPY.step1.optionA.price}</span>
          <span className="text-gray-500 line-through text-sm">{COPY.step1.optionA.originalPrice}</span>
          <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-0.5 rounded-full">–30%</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{COPY.step1.optionA.description}</p>
      </button>

      {/* Opzione B — Template (DECOY anchor + "Più Scelto") */}
      <button
        onClick={() => onSelect('template')}
        className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          selected === 'template'
            ? 'border-cyan-400 bg-cyan-400/5 shadow-[0_0_24px_rgba(0,229,255,0.15)]'
            : 'border-cyan-400/40 bg-dark-800 hover:border-cyan-400/70'
        }`}
      >
        {/* Badge "Più Scelto" — Social Proof + Default Effect */}
        <div className="absolute -top-3 left-4">
          <span className="bg-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {COPY.step1.optionB.badge}
          </span>
        </div>
        <div className="flex justify-between items-start mb-3 mt-1">
          <h3 className="font-display font-bold text-white text-base leading-tight pr-2">
            {COPY.step1.optionB.label}
          </h3>
          {selected === 'template' && (
            <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-cyan-400">{COPY.step1.optionB.price}</span>
          <span className="text-gray-500 line-through text-sm">{COPY.step1.optionB.originalPrice}</span>
          <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-0.5 rounded-full">–30%</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{COPY.step1.optionB.description}</p>
      </button>
    </div>
  </div>
);

interface Step2Props {
  onSelect: (id: TemplateId) => void;
  selected: TemplateId;
}

const Step2: React.FC<Step2Props> = ({ onSelect, selected }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
      {COPY.step2.title}
    </h2>
    <p className="text-gray-400 mb-8">{COPY.step2.subtitle}</p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {COPY.step2.templates.map((t) => {
        const discountedPrice = applyDiscount(t.price);
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id as TemplateId)}
            className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
              selected === t.id
                ? 'border-cyan-400 bg-cyan-400/5 shadow-[0_0_20px_rgba(0,229,255,0.12)]'
                : 'border-white/10 bg-dark-800 hover:border-white/25'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-3xl">{t.emoji}</span>
              {selected === t.id && <CheckCircle size={18} className="text-cyan-400" />}
            </div>
            <h3 className="font-display font-bold text-white text-sm mb-1">{t.label}</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-3">{t.tagline}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-cyan-400 font-bold">€{discountedPrice}</span>
              <span className="text-gray-600 line-through text-xs">€{t.price}</span>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

interface Step3Props {
  selected: string[];
  onToggle: (id: string) => void;
}

const Step3: React.FC<Step3Props> = ({ selected, onToggle }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
      {COPY.step3.title}
    </h2>
    <p className="text-gray-400 mb-8">{COPY.step3.subtitle}</p>

    <div className="space-y-3">
      {COPY.step3.addons.map((addon) => {
        const isSelected = selected.includes(addon.id);
        return (
          <div
            key={addon.id}
            onClick={() => !addon.locked && onToggle(addon.id)}
            className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-200 ${
              addon.locked
                ? 'border-green-400/30 bg-green-400/5 cursor-default'
                : isSelected
                ? 'border-cyan-400/60 bg-cyan-400/5 cursor-pointer'
                : 'border-white/10 bg-dark-800 hover:border-white/20 cursor-pointer'
            }`}
          >
            {/* Checkbox */}
            <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
              addon.locked
                ? 'border-green-400 bg-green-400'
                : isSelected
                ? 'border-cyan-400 bg-cyan-400'
                : 'border-white/30 bg-transparent'
            }`}>
              {(addon.locked || isSelected) && (
                <CheckCircle size={12} className="text-black" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`font-bold text-sm ${addon.locked ? 'text-green-400' : 'text-white'}`}>
                  {addon.label}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  addon.included
                    ? 'bg-green-400/20 text-green-400'
                    : 'bg-dark-900 text-gray-400 border border-white/10'
                }`}>
                  {addon.sublabel}
                </span>
                {addon.locked && (
                  <Lock size={12} className="text-green-400" />
                )}
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{addon.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

interface Step4Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

const Step4: React.FC<Step4Props> = ({ formData, onChange, onSubmit, isSubmitting, errors }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
      {COPY.step4.title}
    </h2>
    <p className="text-gray-400 mb-8 leading-relaxed">{COPY.step4.urgencyText}</p>

    {/* Countdown promo */}
    <div className="flex items-center gap-2 mb-6 p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg">
      <Clock size={16} className="text-amber-400 flex-shrink-0" />
      <span className="text-amber-400 text-sm font-bold">Promo –30% Pasqua · Scade 20 Aprile 2026</span>
    </div>

    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Nome *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Mario Rossi"
            className={`w-full bg-dark-800 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_16px_rgba(0,229,255,0.2)] transition-all`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.name}</p>}
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">WhatsApp / Telefono *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+39 348 000 0000"
            className={`w-full bg-dark-800 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_16px_rgba(0,229,255,0.2)] transition-all`}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="mario@latuaattivita.it"
          className={`w-full bg-dark-800 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_16px_rgba(0,229,255,0.2)] transition-all`}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.email}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          checked={formData.privacy}
          onChange={onChange}
          className="mt-1 w-4 h-4 accent-cyan-400 cursor-pointer flex-shrink-0"
        />
        <label htmlFor="privacy" className="text-gray-400 text-xs leading-relaxed cursor-pointer">
          Accetto la{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
            Privacy Policy
          </a>
          . I miei dati saranno usati solo per inviarmi il preventivo. *
        </label>
      </div>
      {errors.privacy && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={11} /> {errors.privacy}</p>}

      {/* CTA principale — Action-oriented, loss aversion */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl font-display font-bold text-black text-base tracking-wider bg-gradient-to-r from-cyan-400 to-cyan-500 hover:shadow-[0_0_28px_rgba(0,229,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
          isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <><Loader2 size={20} className="animate-spin" /> ELABORAZIONE IN CORSO...</>
        ) : (
          <>{COPY.step4.ctaButton}</>
        )}
      </button>

      {/* Confirm-shaming etico */}
      <p className="text-center text-gray-600 text-xs cursor-default">
        {COPY.step4.ctaDecline}
      </p>

      <p className="text-center text-gray-600 text-xs flex items-center justify-center gap-1.5">
        <Lock size={11} /> {COPY.step4.privacyNote}
      </p>
    </form>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUCCESS SCREEN
// ─────────────────────────────────────────────────────────────────────────────

const SuccessScreen: React.FC = () => (
  <div className="text-center py-12 px-4 max-w-lg mx-auto">
    <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle size={40} className="text-green-400" />
    </div>
    <h2 className="text-3xl font-display font-bold text-white mb-3">{COPY.success.title}</h2>
    <p className="text-cyan-400 font-bold mb-4">{COPY.success.subtitle}</p>
    <p className="text-gray-400 leading-relaxed mb-6">{COPY.success.body}</p>

    {/* Reciprocità — regalo inaspettato */}
    <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-8">
      <p className="text-amber-300 text-sm leading-relaxed">{COPY.success.gift}</p>
    </div>

    <a
      href={COPY.success.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-green-500/30 text-sm"
    >
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
      {COPY.success.whatsappCta}
    </a>

    <p className="text-gray-600 text-xs mt-6">{COPY.success.closingNote}</p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

const SimulatorePreventivo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [path, setPath] = useState<PathType>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo', 'chatbot']);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', privacy: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  const skipStep2 = path === 'vetrina';
  const totalSteps = 4;

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goNext = () => {
    scrollToTop();
    if (currentStep === 1 && skipStep2) {
      setCurrentStep(3);
    } else {
      setCurrentStep(s => Math.min(s + 1, totalSteps));
    }
  };

  const goBack = () => {
    scrollToTop();
    if (currentStep === 3 && skipStep2) {
      setCurrentStep(1);
    } else {
      setCurrentStep(s => Math.max(s - 1, 1));
    }
  };

  const handleToggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Il nome è obbligatorio';
    if (!formData.phone.trim()) e.phone = 'Il numero WhatsApp è obbligatorio';
    if (!formData.email.trim()) e.email = "L'email è obbligatoria";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email non valida';
    if (!formData.privacy) e.privacy = 'Accetta la privacy policy per continuare';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Costruisce il messaggio WhatsApp con il riepilogo
    const templateLabel = selectedTemplate
      ? COPY.step2.templates.find(t => t.id === selectedTemplate)?.label
      : null;
    const addonsLabel = selectedAddons
      .filter(id => id !== 'seo')
      .map(id => COPY.step3.addons.find(a => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const waMessage = encodeURIComponent(
      `Ciao Mauro! Ho compilato il simulatore preventivo.\n` +
      `Nome: ${formData.name}\n` +
      `Soluzione: ${path === 'vetrina' ? 'Sito Vetrina' : `Template – ${templateLabel}`}\n` +
      `Add-on: SEO (incluso)${addonsLabel ? ', ' + addonsLabel : ''}\n` +
      `Email: ${formData.email}\n` +
      `Attendo il tuo preventivo con la promo Pasqua –30%!`
    );

    // Simula invio (in produzione: EmailJS / Supabase / API endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Apri WhatsApp in background dopo 1 secondo
      setTimeout(() => {
        window.open(`https://wa.me/393480029661?text=${waMessage}`, '_blank');
      }, 1000);
    }, 1200);
  };

  const canProceedStep1 = path !== null;
  const canProceedStep2 = selectedTemplate !== null;
  const canProceedStep3 = true; // sempre avanzabile

  const canProceed = (): boolean => {
    if (currentStep === 1) return canProceedStep1;
    if (currentStep === 2) return canProceedStep2;
    if (currentStep === 3) return canProceedStep3;
    return false;
  };

  return (
    <>
      <SEO
        title="Simulatore Preventivo Sito Web | Mauro.exe — Ascoli Piceno"
        description="Scopri in 2 minuti quanto costa il tuo sito web professionale. Promo Pasqua –30%. Solo 3 posti disponibili ad Aprile."
        canonical="https://www.mauroceccarelli.it/simulatore"
        keywords="preventivo sito web Ascoli Piceno, costo sito web Marche, template sito web, chatbot AI PMI"
      />

      <div ref={topRef} className="min-h-screen bg-dark-950 text-gray-200 selection:bg-cyan-400 selection:text-black">
        {/* Background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-[-10%] w-[50%] h-[40%] bg-cyan-400/4 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] w-[40%] h-[35%] bg-purple-600/4 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 sm:py-16">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <ScarcityBadge />
                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
                  {COPY.h1}
                </h1>
                <p className="mt-3 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                  {COPY.subtitle}
                </p>
              </div>

              {/* Layout: form + sidebar */}
              <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">

                {/* Form card */}
                <div className="bg-dark-800 border border-white/8 rounded-2xl p-6 sm:p-8 shadow-2xl">
                  <ProgressBar currentStep={currentStep} totalSteps={totalSteps} skipStep2={skipStep2} />

                  {currentStep === 1 && (
                    <Step1 onSelect={(p) => { setPath(p); if (p === 'template') setSelectedTemplate(null); }} selected={path} />
                  )}
                  {currentStep === 2 && path === 'template' && (
                    <Step2 onSelect={setSelectedTemplate} selected={selectedTemplate} />
                  )}
                  {currentStep === 3 && (
                    <Step3 selected={selectedAddons} onToggle={handleToggleAddon} />
                  )}
                  {currentStep === 4 && (
                    <Step4
                      formData={formData}
                      onChange={handleFormChange}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      errors={errors}
                    />
                  )}

                  {/* Navigazione */}
                  {currentStep < 4 && (
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/8">
                      {currentStep > 1 ? (
                        <button
                          onClick={goBack}
                          className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                        >
                          ← Indietro
                        </button>
                      ) : (
                        <span />
                      )}
                      <button
                        onClick={goNext}
                        disabled={!canProceed()}
                        className={`flex items-center gap-2 px-7 py-3 rounded-xl font-display font-bold text-sm transition-all duration-300 ${
                          canProceed()
                            ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transform hover:-translate-y-0.5'
                            : 'bg-dark-900 text-gray-600 border border-white/10 cursor-not-allowed'
                        }`}
                      >
                        {currentStep === 3 ? 'Calcola il preventivo' : 'Avanti'}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="hidden lg:block">
                  <Sidebar
                    path={path}
                    selectedTemplate={selectedTemplate}
                    selectedAddons={selectedAddons}
                    currentStep={currentStep}
                  />
                </div>
              </div>

              {/* Sidebar mobile — sotto il form */}
              <div className="lg:hidden mt-6">
                <Sidebar
                  path={path}
                  selectedTemplate={selectedTemplate}
                  selectedAddons={selectedAddons}
                  currentStep={currentStep}
                />
              </div>
            </>
          ) : (
            <SuccessScreen />
          )}
        </div>
      </div>
    </>
  );
};

export default SimulatorePreventivo;
