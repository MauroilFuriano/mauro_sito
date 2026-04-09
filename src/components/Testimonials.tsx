import { useEffect, useRef, useState } from 'react';

const ELFSIGHT_ID = 'ef9abb2a-7350-46f1-9833-ff3cedbb9df2';

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  /* Lazy load: carica Elfsight platform.js solo quando la sezione
     entra nel viewport — zero impatto su performance iniziale */
  useEffect(() => {
    if (loaded) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Inietta script solo una volta
          if (!document.querySelector('script[src*="elfsight"]')) {
            const script = document.createElement('script');
            script.src = 'https://elfsightcdn.com/platform.js';
            script.async = true;
            document.head.appendChild(script);
          }
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // pre-carica 200px prima del viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
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

        {/* Elfsight Google Reviews — certificato Google */}
        <div
          className={`elfsight-app-${ELFSIGHT_ID}`}
          data-elfsight-app-lazy=""
        />

        {/* Placeholder minimo mentre il widget carica */}
        {!loaded && (
          <div className="flex justify-center py-12">
            <span className="text-gray-500 text-sm animate-pulse">Caricamento recensioni Google...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
