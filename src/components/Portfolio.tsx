import React, { useState } from 'react';
import { ExternalLink, Github, Terminal, Bot, Layout } from 'lucide-react';

const projects = [
  {
    title: "Crypto Analyzer Pro AI",
    category: "AI Trading Bot & Backend",
    description: "Bot Telegram strutturato con AI per analisi automatizzata dei mercati Futures H24.",
    features: [
      "150+ utenti attivi giornalieri",
      "Alert direzionali in tempo reale",
      "Architettura Serverless ad alta affidabilità"
    ],
    tech: ["Python", "Telegram API", "Pandas", "Gemini AI"],
    // Prova prima SVG, se non funziona usa PNG
    image: "/projects/crypto-analyzer-mockup.svg",
    fallbackImage: "/projects/bot-code.png",
    icon: <Terminal size={20} />,
    link: "https://t.me/cryptoanalyzer_AI_Bot",
    github: "#",
    imageStyle: "object-cover object-left-top"
  },
  {
    title: "Maicol Ceccarelli - Drone Pilot",
    category: "Sito Web Vetrina",
    description: "Portfolio immersivo e ad altissime prestazioni per un pilota di droni professionista.",
    features: [
      "+65% conversion rate sui preventivi",
      "TTFB < 200ms e score Lighthouse a 99",
      "Design premiato per user experience"
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
    title: "AI Business Assistant",
    category: "Web App & AI Chatbot",
    description: "Piattaforma conversazionale B2B per la gestione automatizzata del customer care.",
    features: [
      "Acquisizione prenotazioni fuori orario (40%)",
      "Riduzione del carico operativo (-12h/settimana)",
      "Latenza di risposta media garantita in 8s"
    ],
    tech: ["React", "TypeScript", "Gemini AI", "Tailwind CSS"],
    image: "/projects/ai-assistant-mockup.svg",
    fallbackImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
    icon: <Bot size={20} />,
    link: "https://ai-business-assistant-two.vercel.app",
    github: "#",
    imageStyle: "object-cover"
  }
];

const Portfolio: React.FC = () => {
  // [FRONTEND SPECIALIST] Stato hook per gestire il 3D Tilt indipendente per ogni card
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardTransform, setCardTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setHoveredCard(index);
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 gradi
    const rotateY = ((x - centerX) / centerX) * 10;

    setCardTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setCardTransform({ rotateX: 0, rotateY: 0 });
  };

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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-display font-bold tracking-widest mb-2 text-sm uppercase">Il Mio Lavoro</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white glow-text">
            Progetti Recenti
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: hoveredCard === index
                  ? `rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                  : 'rotateX(0) rotateY(0) scale3d(1, 1, 1)',
                transition: hoveredCard === index ? 'none' : 'transform 0.5s ease',
                transformStyle: 'preserve-3d'
              }}
              className="group rounded-2xl bg-dark-800 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.2)] flex flex-col relative"
            >
              {/* Image Container */}
              <div
                className="relative h-48 overflow-hidden bg-dark-900 rounded-t-2xl"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10" />

                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => handleImageError(e, project.fallbackImage)}
                  className={`w-full h-full transform group-hover:scale-110 transition-transform duration-700 ${project.imageStyle}`}
                />

                <div className="absolute top-4 right-4 z-20 bg-dark-900/80 backdrop-blur border border-cyan-400/30 p-2 rounded-lg text-cyan-400">
                  {project.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col" style={{ transform: 'translateZ(30px)' }}>
                <div className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">
                  {project.category}
                </div>
                <h4 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>

                {/* [FRONTEND SPECIALIST] Lista Ul/Li stilizzata e professionale senza emoji */}
                <ul className="mb-6 space-y-2 flex-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6" style={{ transform: 'translateZ(40px)' }}>
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {/* [FRONTEND SPECIALIST] Animazione underline/freccia sui link */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5" style={{ transform: 'translateZ(50px)' }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-white relative group/link"
                  >
                    <ExternalLink size={16} className="text-cyan-400 group-hover/link:-translate-y-1 transition-transform" />
                    <span>Live Demo</span>
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

