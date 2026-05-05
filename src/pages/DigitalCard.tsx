import React from 'react';
import { 
  UserPlus, 
  MessageCircle, 
  Globe, 
  Linkedin, 
  Mail, 
  MapPin, 
  ChevronRight,
  Zap,
  Code2,
  Cpu
} from 'lucide-react';
import SEO from '../components/SEO';

const DigitalCard: React.FC = () => {
  const contactData = {
    name: "Mauro Ceccarelli",
    role: "Sviluppatore Web & AI",
    phone: "+39 348 00 29 661",
    email: "mauroexe@mauroceccarelli.it",
    site: "www.mauroceccarelli.it",
    linkedin: "https://www.linkedin.com/in/mauro-ceccarelli-282255296",
    location: "Ascoli Piceno, Italia"
  };

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
ORG:Mauro.exe
TITLE:${contactData.role}
TEL;TYPE=CELL:${contactData.phone}
EMAIL:${contactData.email}
URL:${contactData.site}
ADR;TYPE=WORK:;;${contactData.location}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contactData.name.replace(' ', '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-white flex flex-col items-center p-4 sm:p-8 font-sans">
      <SEO 
        title="Digital Business Card | Mauro Ceccarelli"
        description="Salva i contatti di Mauro Ceccarelli, Sviluppatore Web & AI. Disponibile per nuovi progetti e consulenze."
      />

      {/* Main Card Container */}
      <div className="w-full max-w-[450px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        
        {/* Decorative Background Glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px]" />

        {/* Header / Profile Section */}
        <div className="pt-12 pb-8 px-8 flex flex-col items-center text-center relative z-10">
          <div className="relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>
            <div className="relative w-28 h-28 rounded-full border-2 border-white/20 overflow-hidden bg-dark-900">
              <img 
                src="/mauro.webp" 
                alt={contactData.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight mb-1">{contactData.name}</h1>
          <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-4">{contactData.role}</p>
          
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <MapPin size={14} className="text-purple-500" />
            <span>{contactData.location}</span>
          </div>
        </div>

        {/* Primary CTA - Save Contact */}
        <div className="px-8 pb-8 relative z-10">
          <button 
            onClick={generateVCard}
            className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
          >
            <UserPlus size={20} />
            SALVA IN RUBRICA
          </button>
        </div>

        {/* Action Links Grid */}
        <div className="px-8 grid grid-cols-2 gap-3 mb-8 relative z-10">
          <a 
            href={`https://wa.me/${contactData.phone.replace(/\s+/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/50 transition-all group"
          >
            <MessageCircle size={24} className="text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest uppercase">WhatsApp</span>
          </a>
          <a 
            href={`mailto:${contactData.email}`}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-400/50 transition-all group"
          >
            <Mail size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Email</span>
          </a>
          <a 
            href="/"
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/50 transition-all group"
          >
            <Globe size={24} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Sito Web</span>
          </a>
          <a 
            href={contactData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-400/50 transition-all group"
          >
            <Linkedin size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest uppercase">LinkedIn</span>
          </a>
        </div>

        {/* Micro-Portfolio / Values */}
        <div className="px-8 pb-12 relative z-10">
          <h3 className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase mb-4 text-center">Perché collaborare con me?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                <Zap size={16} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">Automazione Processi</p>
                <p className="text-[10px] text-gray-500">Efficienza massima per il tuo business.</p>
              </div>
              <ChevronRight size={14} className="text-gray-700" />
            </div>

            <div className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Code2 size={16} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">Sviluppo Web Next.js</p>
                <p className="text-[10px] text-gray-500">Performance e SEO ai massimi livelli.</p>
              </div>
              <ChevronRight size={14} className="text-gray-700" />
            </div>

            <div className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Cpu size={16} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">Integrazione AI</p>
                <p className="text-[10px] text-gray-500">AI personalizzata per flussi di lavoro intelligenti.</p>
              </div>
              <ChevronRight size={14} className="text-gray-700" />
            </div>
          </div>
        </div>

      </div>

      {/* Footer / Branding */}
      <div className="mt-8 text-center pb-8">
        <p className="text-gray-600 text-[10px] font-bold tracking-widest uppercase">
          Mauro.exe — Powered by AI & High Performance
        </p>
      </div>
    </div>
  );
};

export default DigitalCard;
