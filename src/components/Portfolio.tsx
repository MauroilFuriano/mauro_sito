import React from 'react';
import { ExternalLink, Github, Terminal, Bot, Layout } from 'lucide-react';

const projects = [
  {
    title: "Crypto Analyzer Pro AI",
    category: "AI Trading Bot & Backend",
    description: "Bot Telegram con AI per analisi mercati Futures 24/7.\n📊 150+ utenti attivi giornalieri\n⚡ Alert in tempo reale\n🎯 Analisi automatica senza intervento umano",
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
    description: "Portfolio immersivo per pilota droni professionista.\n📈 +65% richieste preventivo vs sito precedente\n⚡ Caricamento ultra-rapido (<1.5s)\n🎨 Design premiato dai clienti (4.8/5)",
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
    description: "Chatbot AI per piccole aziende con prenotazioni automatiche.\n📞 40% prenotazioni arrivano fuori orario\n⏱️ -12 ore/settimana risparmiate dal team\n💬 Risposta media in 8 secondi",
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
  // Handle image error - fallback to alternative image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallback: string) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallback) {
      target.src = fallback;
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-dark-900 relative">
      {/* Background Glow */}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-dark-800 border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-dark-900">
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
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">
                  {project.category}
                </div>
                <h4 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1 whitespace-pre-line">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors"
                    >
                      <Github size={16} /> Codice
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

