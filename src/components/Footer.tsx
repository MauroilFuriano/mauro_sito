import React from 'react';
// Ho rimosso Twitter e aggiunto Facebook e Instagram
import { Github, Linkedin, Terminal, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
           <Terminal className="text-cyan-400" size={20} />
           <span className="font-display font-bold text-white tracking-widest">MAURO.EXE</span>
        </div>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Mauro.exe. Tutti i Sistemi Operativi.
        </div>

        <div className="flex gap-6">
          {/* Github - Link aggiornato */}
          <a 
            href="https://github.com/MauroilFuriano" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>

          {/* LinkedIn - Link aggiornato */}
          <a 
            href="https://www.linkedin.com/in/mauro-ceccarelli-282255296" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>

          {/* Instagram -⚠️ INSERISCI IL TUO LINK QUI AL POSTO DI # */}
          <a 
            href="https://www.instagram.com/mauroceccarelli.exe/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>

          {/* Facebook - ⚠️ INSERISCI IL TUO LINK QUI AL POSTO DI # */}
          <a 
            href="https://www.facebook.com/profile.php?id=61585910800513" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;