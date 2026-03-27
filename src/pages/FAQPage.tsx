import React from 'react';
import Navbar from '../components/Navbar';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/* ── FAQPage JSON-LD (Google Rich Results — FAQPage schema) ── */
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Perché non usi Shopify, WordPress o template?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Costruisco tutto da zero con React, TypeScript e Python. Il sito non dipende da plugin, abbonamenti a piattaforme terze o template uguali ad altri 50.000 siti. Lighthouse score 98/100 è il mio standard minimo di consegna."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto costa un sito web vetrina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un sito vetrina custom parte da €1.200 per 4–6 pagine (design responsive, SEO on-page, form contatto). Un sito professionale con animazioni e CMS parte da €2.000. I prezzi includono dominio, hosting e SSL gestiti da me con rinnovo annuale concordato."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto costa un chatbot AI per il sito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un chatbot con LLM (GPT-4o / Gemini / Claude) parte da €3.500. Con RAG (conosce i tuoi documenti aziendali) da €6.000. Un agente AI multi-step con CRM da €10.000. I costi API del modello AI (€35–100/mese) sono a carico del cliente."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto costa un e-commerce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un e-commerce custom React/Next.js headless parte da €3.500 (starter, fino a 100 prodotti con Stripe). La versione professionale con integrazioni parte da €6.000. Un e-commerce con automazioni AI (raccomandazioni, recupero carrello) parte da €8.000."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto tempo ci vuole per la consegna?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Landing page: 5 giorni. Sito vetrina: 7–14 giorni. E-commerce: 20–60 giorni. Web App/SaaS: 8–12 settimane. Lavoro con sprint settimanali e milestone concordate. Tempi certi, aggiornamenti continui, zero sorprese."
      }
    },
    {
      "@type": "Question",
      "name": "Cosa include la consegna?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sito pubblicato e funzionante, dominio, hosting e certificato SSL gestiti da me con quota annuale concordata. SEO on-page, test cross-browser e cross-device. Il codice sorgente viene consegnato solo su richiesta a sviluppatori o in collaborazione white-label."
      }
    },
    {
      "@type": "Question",
      "name": "Posso richiedere modifiche dopo la consegna?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sì. Ogni progetto include 2 round di revisione dopo la consegna per correzioni, aggiustamenti grafici o modifiche ai contenuti. Superate le due revisioni, si applica una tariffa oraria per le modifiche aggiuntive o evolutive."
      }
    },
    {
      "@type": "Question",
      "name": "Posso collaborare con te se sono un'agenzia web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Assolutamente. Lavoro in white-label: sviluppo il progetto, consegno i sorgenti all'agenzia, nessun contatto con il cliente finale. Mantenimento, hosting e rinnovi restano in carico all'agenzia. Contattami per discutere tariffe B2B."
      }
    }
  ]
};

const FAQPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
      <SEO
        title="FAQ & Prezzi | Mauro.exe — Sviluppatore Web Ascoli Piceno"
        description="Prezzi trasparenti e risposte chiare: sito vetrina da €1.200, chatbot AI da €3.500, e-commerce custom da €3.500. Niente Shopify, niente template. Codice custom, AI integrata."
        canonical="https://www.mauroceccarelli.it/faq"
        keywords="prezzi sito web, costo chatbot AI, tariffe sviluppatore web, FAQ sviluppatore Ascoli Piceno, quanto costa sito web"
        structuredData={faqStructuredData}
      />
      <Navbar />

      <main className="pt-24">

        {/* ── Hero Hook (neuromarketing: Sistema 1, scarsità, social proof) ── */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
          </div>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Prezzi Trasparenti · Nessuna Sorpresa
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Tutto quello che devi sapere<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                prima di iniziare
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Prezzi chiari, tempi certi, zero costi nascosti. Se hai ancora dubbi,{' '}
              <a href="https://wa.me/393480029661?text=Ciao%20Mauro!%20Ho%20letto%20le%20FAQ%20e%20vorrei%20un%20preventivo." target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-medium hover:underline">scrivimi su WhatsApp</a>.
            </p>

            {/* Scarcità + social proof */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-400/30 bg-amber-400/5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                <span className="text-amber-400 text-xs font-bold">Solo 2 nuovi progetti disponibili ad Aprile</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-gray-400 text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span>"Ragazzo serio e professionale, oltre ogni aspettativa." — Maicol C. ★★★★★</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Component ── */}
        <FAQ />

      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
