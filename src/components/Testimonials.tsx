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
    // Fallback con setTimeout per browser senza supporto (Safari < 17).
    const scheduleInject = () => {
      const w = window as any;
      if (typeof w.requestIdleCallback === 'function') {
        w.requestIdleCallback(injectScript, { timeout: 2000 });
      } else {
        setTimeout(injectScript, 200);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleInject();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
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
          style={{ filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[220px] h-[220px] bg-purple-500/5 rounded-full"
          style={{ filter: 'blur(40px)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">
            Recensioni Verificate
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white glow-text break-words">
            Cosa Dicono i Clienti
          </h3>
        </div>

        {/* Container con altezza riservata per evitare CLS quando Elfsight mount */}
        <div className="relative min-h-[600px] md:min-h-[500px]">
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
