import { useEffect, useRef, useState } from 'react';

const ELFSIGHT_ID = 'ef9abb2a-7350-46f1-9833-ff3cedbb9df2';
const ELFSIGHT_SRC = 'https://elfsightcdn.com/platform.js';

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded) return;
    const el = sectionRef.current;
    if (!el) return;

    const injectScript = () => {
      if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) {
        setScriptLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = ELFSIGHT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };

    // Inietta dentro requestIdleCallback per non bloccare il main thread durante lo scroll.
    // Timeout breve: il download dello script è async (non blocca), va anticipato il più
    // possibile così l'init pesante di Elfsight avviene fuori schermo, non sotto le dita.
    // Fallback con setTimeout per browser senza supporto (Safari < 17).
    const scheduleInject = () => {
      const w = window as any;
      if (typeof w.requestIdleCallback === 'function') {
        w.requestIdleCallback(injectScript, { timeout: 500 });
      } else {
        setTimeout(injectScript, 200);
      }
    };

    // rootMargin ampio (800px): l'iniezione parte mentre l'utente è ancora lontano,
    // così il mount del widget finisce prima dell'arrivo e lo scroll non si freeza.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleInject();
          observer.disconnect();
        }
      },
      { rootMargin: '800px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scriptLoaded]);

  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
      /* [FIX AUDIT MOBILE] Rimosso contentVisibility: auto — conflitto con Elfsight script injection */
    >
      {/* Background glows — promossi a GPU layer, blur ridotto, size ridotta */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[30%] left-[5%] w-[280px] h-[280px] bg-cyan-400/5 rounded-full"
          style={{ filter: 'blur(40px)', transform: 'translateZ(0)' }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[220px] h-[220px] bg-purple-500/5 rounded-full"
          style={{ filter: 'blur(40px)', transform: 'translateZ(0)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase block">
            Recensioni Verificate
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white glow-text break-words">
            Cosa Dicono i Clienti
          </h2>
        </div>

        {/* ── Recensioni statiche per crawler (SEO/GEO) ──────────────────────────
            Visibili nel DOM ma nascosti visivamente (sr-only).
            Elfsight mostra il widget agli utenti; questo markup serve a:
            1) Google Rich Results (aggregateRating nel JSON-LD di HomePage)
            2) AI crawler (GPTBot, ClaudeBot, PerplexityBot) che non eseguono JS.
            Non rimuovere: è il "gemello SEO" del widget Elfsight.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="sr-only" aria-label="Recensioni Google verificate 5 stelle">
          <article
            itemScope
            itemType="https://schema.org/Review"
          >
            <span
              itemProp="author"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="name">Tipolitografia Graphic Arts</span>
            </span>
            <div
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
            >
              <meta itemProp="ratingValue" content="5" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
            </div>
            <p itemProp="reviewBody">
              Ottimo risultato, lavoro chiaro e corretto! Programma x t shirt top
            </p>
            <meta itemProp="datePublished" content="2026-07-09" />
            <span itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="MAURO.EXE di Mauro Ceccarelli" />
            </span>
          </article>

          <article
            itemScope
            itemType="https://schema.org/Review"
          >
            <span
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">Fabio Campanelli</span>
            </span>
            <div
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
            >
              <meta itemProp="ratingValue" content="5" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
            </div>
            <p itemProp="reviewBody">
              Cercavo qualcuno che mi costruisse un sito web professionale per la mia attività
              di tavoli in legno e resina epossidica ad Ascoli Piceno. Grazie a Mauro il sito
              è veloce, con animazioni professionali, un chatbot integrato e soprattutto è
              ottimizzato per la SEO e la GEO. Lo consiglio a chiunque abbia un'attività e
              voglia farsi trovare online da clienti veri.
            </p>
            <meta itemProp="datePublished" content="2026-04-09" />
            <span itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="MAURO.EXE di Mauro Ceccarelli" />
            </span>
          </article>

          <article
            itemScope
            itemType="https://schema.org/Review"
          >
            <span
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">Maicol Ceccarelli</span>
            </span>
            <div
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
            >
              <meta itemProp="ratingValue" content="5" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
            </div>
            <p itemProp="reviewBody">
              Ragazzo serio e professionale, oltre ogni mia aspettativa. Il sito che ha fatto
              a me è stupendo! Veramente bravo Mauro.
            </p>
            <meta itemProp="datePublished" content="2026-04-09" />
            <span itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="MAURO.EXE di Mauro Ceccarelli" />
            </span>
          </article>
        </div>

        {/* Container con altezza riservata per evitare CLS quando Elfsight mount.
            contain: layout style isola i reflow del widget dal resto della pagina. */}
        <div className="relative min-h-[600px] md:min-h-[500px]" style={{ contain: 'layout style' }}>
          <div className={`elfsight-app-${ELFSIGHT_ID}`} />

          {!scriptLoaded && (
            <div
              className="absolute inset-0 flex justify-center items-start pt-12 pointer-events-none motion-reduce:animate-none"
              aria-live="polite"
            >
              <span className="text-gray-500 text-sm animate-pulse motion-reduce:animate-none">
                Caricamento recensioni Google...
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
