import React, { useState } from 'react';
import { ChevronDown, Globe, Bot, Smartphone, Zap, ShoppingCart } from 'lucide-react';

/* ── Pricing Packages ─────────────────────────────────────── */

const packages = [
  {
    icon: <Globe size={20} />,
    label: 'Sito Vetrina',
    price: 'da €1.500',
    desc: '4–10 pagine custom, SEO on-page, responsive, form contatto',
    color: 'cyan',
  },
  {
    icon: <Zap size={20} />,
    label: 'Landing Page',
    price: 'da €700',
    desc: 'Pagina singola CRO-ottimizzata, analytics, A/B ready',
    color: 'purple',
  },
  {
    icon: <Bot size={20} />,
    label: 'Sito + Chatbot AI',
    price: 'da €5.700',
    desc: 'Sito vetrina + assistente LLM con RAG sui tuoi documenti',
    color: 'cyan',
  },
  {
    icon: <ShoppingCart size={20} />,
    label: 'E-commerce Custom',
    price: 'da €3.500',
    desc: 'React/Next.js headless, Stripe, gestione prodotti, SEO',
    color: 'green',
  },
  {
    icon: <ShoppingCart size={20} />,
    label: 'E-commerce + AI',
    price: 'da €8.000',
    desc: 'E-commerce con automazioni AI: raccomandazioni, recupero carrello, assistente 24/7',
    color: 'yellow',
  },
  {
    icon: <Smartphone size={20} />,
    label: 'Web App / SaaS',
    price: 'da €8.000',
    desc: 'MVP con autenticazione, dashboard, API, deploy cloud',
    color: 'purple',
  },
];

const colorMap: Record<string, { border: string; text: string; bg: string; hoverBorder: string }> = {
  cyan:   { border: 'border-cyan-400/20',   text: 'text-cyan-400',   bg: 'bg-cyan-400/10',   hoverBorder: 'hover:border-cyan-400/50' },
  purple: { border: 'border-purple-400/20', text: 'text-purple-400', bg: 'bg-purple-400/10', hoverBorder: 'hover:border-purple-400/50' },
  green:  { border: 'border-green-400/20',  text: 'text-green-400',  bg: 'bg-green-400/10',  hoverBorder: 'hover:border-green-400/50' },
  yellow: { border: 'border-yellow-400/20', text: 'text-yellow-400', bg: 'bg-yellow-400/10', hoverBorder: 'hover:border-yellow-400/50' },
};

/* ── FAQ Accordion ────────────────────────────────────────── */

const faqs = [
  {
    q: 'Perché non usi Shopify, WordPress o template?',
    a: 'Perché costruisco tutto da zero con React, TypeScript e Python. Questo mi dà controllo totale su performance, design e funzionalità — il tuo sito non dipende da plugin che smettono di funzionare, abbonamenti mensili a piattaforme terze o template uguali a quelli di altri 50.000 siti. Lighthouse score 98/100 è il mio standard minimo.',
  },
  {
    q: 'Qual è il tuo punto di forza rispetto ad altri sviluppatori?',
    a: "In Italia il 90% dei siti aziendali è ancora statico: stesso testo da 5 anni, zero automazioni, nessuna integrazione AI. Porto l'intelligenza artificiale dentro il business dei miei clienti — chatbot che rispondono 24/7, sistemi che qualificano lead in automatico, e-commerce che suggeriscono prodotti e recuperano carrelli abbandonati. Il tuo sito smette di essere un biglietto da visita e diventa uno strumento che lavora mentre tu dormi.",
  },
  {
    q: 'Cosa significa "chatbot con RAG"?',
    a: 'RAG (Retrieval-Augmented Generation) significa che il chatbot conosce i tuoi documenti aziendali — listini, cataloghi, FAQ, contratti — e risponde con precisione usando quei dati. Non inventa risposte generiche: attinge alla tua knowledge base. Risultato: un assistente virtuale che sa tutto del tuo business.',
  },
  {
    q: 'Quanto tempo ci vuole per una consegna?',
    a: 'Landing page: 5 giorni. Sito vetrina: 7–14 giorni. E-commerce: 20–60 giorni. Web App/SaaS: 8–12 settimane. Tempi certi, aggiornamenti continui, zero sorprese. Lavoro con sprint settimanali e milestone chiare concordate prima di partire.',
  },
  {
    q: 'Cosa include la consegna?',
    a: 'Sito pubblicato e funzionante, dominio, hosting e certificato SSL gestiti da me — inclusi nel progetto e rinnovati annualmente con una quota concordata. SEO on-page ottimizzata, test cross-browser e cross-device. Per i chatbot AI: configurazione del modello LLM, training sulla tua knowledge base, pannello admin per aggiornare le risposte. Il codice sorgente viene consegnato su richiesta agli sviluppatori o in caso di collaborazione white-label.',
  },
  {
    q: 'Posso richiedere modifiche dopo la consegna?',
    a: 'Sì. Ogni progetto include 2 round di revisione dopo la consegna — per correzioni, aggiustamenti grafici o piccole modifiche ai contenuti. Superate le due revisioni, si applica una tariffa oraria per le modifiche aggiuntive o evolutive.',
  },
  {
    q: 'Posso collaborare anche se sono un\'agenzia web?',
    a: "Assolutamente. Lavoro anche in white-label: sviluppo il progetto, consegno i sorgenti all'agenzia, nessun contatto con il cliente finale. Mantenimento, hosting e rinnovi restano in carico all'agenzia. Contattami per discutere tariffe B2B.",
  },
];

/* ── Component ───────────────────────────────────────────── */

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-cyan-400/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">
            Domande Frequenti
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white glow-text">
            Prezzi & Approccio
          </h3>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Niente template, niente Shopify, niente soluzioni preconfezionate.<br />
            <span className="text-cyan-400 font-medium">Codice custom · AI integrata · Risultati misurabili.</span>
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {packages.map((pkg, i) => {
            const c = colorMap[pkg.color];
            return (
              <div
                key={i}
                className={`bg-dark-900 rounded-xl p-5 border ${c.border} ${c.hoverBorder} transition-all duration-300 group flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center ${c.text} flex-shrink-0`}>
                    {pkg.icon}
                  </div>
                  <span className={`font-display font-black text-lg ${c.text}`}>{pkg.price}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{pkg.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{pkg.desc}</p>
                </div>
                <a
                  href={`https://wa.me/393480029661?text=Ciao%20Mauro!%20Sono%20interessato%20al%20pacchetto%20${encodeURIComponent(pkg.label)}%20e%20vorrei%20un%20preventivo.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto text-xs font-bold ${c.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1`}
                >
                  Richiedi preventivo →
                </a>
              </div>
            );
          })}
        </div>


        {/* Accordion FAQ */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 rounded-xl overflow-hidden bg-dark-900 hover:border-white/10 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-white font-bold text-sm leading-snug pr-2">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">Non hai trovato risposta alla tua domanda?</p>
          <a
            href="https://wa.me/393480029661?text=Ciao%20Mauro!%20Ho%20letto%20le%20FAQ%20e%20vorrei%20un%20preventivo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold text-sm rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
          >
            Scrivimi su WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
