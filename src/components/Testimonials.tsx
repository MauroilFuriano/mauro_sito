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
