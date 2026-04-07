import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background astratto scuro che funge da continuazione dello spazio */}
      <div className="absolute inset-0 bg-dark-900 border-t border-white/5" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#05050A] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2.5rem] p-6 lg:p-12 relative overflow-hidden group">
          {/* Subtle glow hover effect su tutta la card */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

          {/* ── Left Column — Portrait Image ───────────── */}
          <div className="lg:col-span-5 relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 via-purple-500/10 to-transparent blur-3xl opacity-60"></div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[1.8rem] overflow-hidden border border-white/10 bg-dark-900 shadow-2xl">
                <picture>
                  <source srcSet="/mauro.webp" type="image/webp" />
                  <img
                    src="/mauro_optimized.jpg"
                    alt="Mauro Ceccarelli"
                    className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    loading="lazy"
                  />
                </picture>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent"></div>

                {/* Bottom Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-white font-display font-bold text-sm tracking-wide uppercase">Disponibile per Progetti</span>
                  </div>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute inset-x-4 -bottom-4 h-8 bg-cyan-400/10 blur-2xl rounded-full opacity-50"></div>
            </div>
          </div>

          {/* ── Right Column — Bio ─────────────────────── */}
          <div className="lg:col-span-7 space-y-8">

            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-cyan-400/50"></div>
                <span className="text-cyan-400 font-display font-bold tracking-widest text-sm uppercase">Chi Sono?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                Il Tuo Partner Digitale <br />
                <span className="text-gray-400 font-normal">nelle Marche.</span>
              </h2>
            </div>

            {/* Bio */}
            <div className="space-y-5 text-gray-400 leading-relaxed text-lg max-w-2xl">
              <p>
                Sono un <span className="text-white font-medium">sviluppatore web di Ascoli Piceno</span>.
              </p>
              <p>
                Creo siti web professionali e <span className="text-white font-medium">chatbot AI</span> per aziende nelle Marche e in tutta Italia.
              </p>
              <p>
                Costruisco tutto da zero in <span className="text-white font-medium">JavaScript, React e Python</span> — niente Shopify, niente WordPress, niente template uguali a quelli di altri mille siti. Ogni riga di codice è scritta per te.
              </p>
              <p>
                Il mio punto di forza? Portare l'AI nelle PMI italiane. Mentre i siti dei tuoi competitor restano statici da anni, i miei clienti hanno{' '}
                <span className="text-white font-medium">assistenti virtuali che rispondono a ogni ora</span>,{' '}
                sistemi che qualificano lead in automatico e e-commerce che vendono mentre loro dormono.
              </p>
            </div>

          </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
