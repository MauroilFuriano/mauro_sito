import React from 'react';
// Ho rimosso Twitter e aggiunto Facebook e Instagram
import { Github, Linkedin, Terminal, Facebook, Instagram, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Info Locali */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-cyan-400" />
            <span>Ascoli Piceno, Marche - Italia</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-cyan-400" />
            <a href="tel:+393480029661" className="hover:text-cyan-400 transition-colors">+39 348 002 9661</a>
          </div>
        </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex gap-6 w-full md:w-auto justify-center md:justify-start">
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

        <div className="text-gray-500 text-sm md:text-center w-full md:w-auto text-center order-last md:order-none mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Mauro.exe. Tutti i Sistemi Operativi.
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
          <Terminal className="text-cyan-400" size={20} />
          <span className="font-display font-bold text-white tracking-widest">MAURO.EXE</span>
        </div>

      </div>
      </div>
    </footer>
  );
};

export default Footer;