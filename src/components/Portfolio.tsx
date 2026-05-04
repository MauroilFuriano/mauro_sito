import React, { useRef, useCallback } from 'react';
import { ExternalLink, Github, Layout, Video, Car, Scissors, Hammer } from 'lucide-react';

const projects = [
  {
    title: "Maicol Ceccarelli - Drone Pilot",
    category: "Sito Web Vetrina",
    description: "Portfolio immersivo e ad altissime prestazioni per un pilota di droni professionista.",
    features: [
      "🏆 +65% Conversion Rate sui preventivi",
      "⚡ Velocità di caricamento < 0.2 secondi",
      "✨ Design premiato per esperienza immersiva"
    ],
    tech: ["HTML/CSS", "JavaScript", "Responsive Design", "SEO"],
    image: "/projects/drone-site-mockup.svg",
    fallbackImage: "/projects/drone-sito.png",
    icon: <Layout size={20} />,
    link: "https://www.maicolceccarelli.it",
    github: "#",
    imageStyle: "object-cover object-top"
  },
  {
    title: "FC Resinwood Creations",
    category: "Sito Vetrina Artigianale",
    description: "Sito vetrina per laboratorio artigianale di Ascoli Piceno specializzato in tavoli live edge in ulivo e resina epossidica. Ogni pezzo è unico, fatto a mano su misura.",
    features: [
      "🪵 Gallery immersiva che valorizza i pezzi unici in legno e resina",
      "📍 SEO locale ottimizzato per artigianato Ascoli Piceno",
      "📱 Design mobile-first per clienti che arrivano da Instagram e TikTok"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Schema.org", "SEO Locale", "Social Integration"],
    image: "/projects/fcresinwood-new.webp",
    fallbackImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=75&w=800&auto=format&fm=webp&fit=crop",
    icon: <Hammer size={20} />,
    link: "https://fcresinwoodcreations.com/",
    github: "#",
    imageStyle: "object-cover object-center"
  },
  {
    title: "Alex Nova - Videomaker & Fotografo",
    category: "Sito Portfolio Creativo",
    description: "Portfolio professionale per videomaker e fotografo specializzato in Wedding Film, contenuti commerciali e ritratti editoriali. Design cinematografico con forte impatto visivo.",
    features: [
      "🎬 Design cinematografico che valorizza il portfolio video",
      "📍 SEO locale ottimizzato per Milano e provincia",
      "📱 Esperienza mobile-first per clienti in movimento"
    ],
    tech: ["React", "Tailwind CSS", "SEO Schema.org", "Responsive Design"],
    image: "/alex_nova.webp",
    fallbackImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=75&w=800&auto=format&fm=webp&fit=crop",
    icon: <Video size={20} />,
    link: "https://demo-videomaker.vercel.app/",
    github: "#",
    imageStyle: "object-cover object-center"
  },
  {
    title: "Nova Motors - Concessionaria Auto Premium",
    category: "Sito Concessionaria + Chatbot",
    description: "Sito vetrina per concessionaria di auto usate certificate premium ad Ascoli Piceno. Chatbot deterministico per qualificazione lead e gestione richieste di permuta e finanziamento.",
    features: [
      "🤖 Chatbot deterministico per permuta, finanziamento e info veicoli",
      "🏎️ Catalog auto usate premium con schede dettagliate",
      "📍 SEO locale ottimizzato con Schema.org AutoDealer"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Chatbot deterministico", "Schema.org", "SEO locale"],
    image: "/projects/nova-motors.png",
    fallbackImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=75&w=800&auto=format&fm=webp&fit=crop",
    icon: <Car size={20} />,
    link: "https://egocars.vercel.app/",
    github: "#",
    imageStyle: "object-cover object-center"
  },
  {
    title: "Aura Style Studio - Salone Unisex",
    category: "Sito Parrucchiere + AI + Gestionale",
    description: "Piattaforma completa per salone unisex: chatbot AI con LLM per assistenza clienti, sistema di prenotazione online e dashboard gestionale per la gestione degli appuntamenti.",
    features: [
      "🧠 Chatbot AI (LLM) per assistenza e consulenza stile 24/7",
      "📅 Sistema prenotazioni online con selezione servizio/data/ora",
      "🖥️ Dashboard gestionale per amministrazione appuntamenti"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "LLM Integration", "Booking System", "Admin Dashboard"],
    image: "/projects/aura-style.png",
    fallbackImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=75&w=800&auto=format&fm=webp&fit=crop",
    icon: <Scissors size={20} />,
    link: "https://sito-parrucchieri.vercel.app/",
    github: "#",
    imageStyle: "object-cover object-top"
  }
];

const Portfolio: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(hover: none)').matches || 
                     (window.navigator as any).maxTouchPoints > 0 ||
                     /FBAN|FBAV|Instagram/i.test(navigator.userAgent);
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (isTouchDevice) return;
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -20;
    const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 20;
    card.style.transition = 'none';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback((index: number) => {
    if (isTouchDevice) return;
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'rotateX(0) rotateY(0) scale3d(1,1,1)';
  }, [isTouchDevice]);

  // Handle image error - fallback to alternative image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallback: string) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallback) {
      target.src = fallback;
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-dark-900 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">Il Mio Lavoro</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white glow-text break-words">
            Progetti Recenti
          </h3>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: isTouchDevice ? 'none' : '1000px' }}>
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{ transformStyle: isTouchDevice ? 'flat' : 'preserve-3d' }}
              className="group rounded-2xl bg-dark-800 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.2)] flex flex-col relative overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-dark-900 rounded-t-2xl">
                <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10 rounded-t-2xl" />

                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => handleImageError(e, project.fallbackImage)}
                  className={`w-full h-full transform group-hover:scale-110 transition-transform duration-700 rounded-t-2xl ${project.imageStyle}`}
                />

                <div className="absolute top-4 right-4 z-20 bg-dark-900/80 backdrop-blur border border-cyan-400/30 p-2 rounded-lg text-cyan-400">
                  {project.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1" style={{ transform: isTouchDevice ? 'none' : 'translateZ(30px)' }}>
                <div className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">
                  {project.category}
                </div>
                <h4 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed break-words">
                  {project.description}
                </p>

                {/* [FRONTEND SPECIALIST] Lista Ul/Li stilizzata e professionale senza emoji */}
                <ul className="mb-6 space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex-1"></div> {/* Spacer to push bottom content down on desktop grid */}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6" style={{ transform: isTouchDevice ? 'none' : 'translateZ(40px)' }}>
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {/* [FRONTEND SPECIALIST] Animazione underline/freccia sui link */}
                {/* Fix mobile: position relative + z-index alto per garantire che i tap vengano ricevuti anche con il 3D context attivo */}
                <div
                  className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5"
                  style={{
                    transform: isTouchDevice ? 'none' : 'translateZ(50px)',
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'auto'
                  }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-white relative group/link"
                    style={{ touchAction: 'manipulation' }}
                  >
                    <ExternalLink size={16} className="text-cyan-400 group-hover/link:-translate-y-1 transition-transform" />
                    <span>Live</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover/link:w-full transition-all duration-300"></span>
                  </a>
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors relative group/link"
                    >
                      <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
                      <span>Codice</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/link:w-full transition-all duration-300"></span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

