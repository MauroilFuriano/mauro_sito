import React from 'react';
import { Github, Linkedin, Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { sintesiAttivita } from '../data/home';
import { apriPreferenzeCookie } from '../misurazione';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 border-b border-white/5 pb-8 text-center">
          <p className="text-gray-500 text-xs leading-relaxed max-w-4xl mx-auto">{sintesiAttivita}</p>
        </div>

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
          <a
            href="https://github.com/MauroilFuriano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/mauro-ceccarelli-282255296"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="https://www.instagram.com/mauroceccarelli.exe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>

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

        <div className="text-gray-500 text-sm md:text-center w-full md:w-auto text-center order-last md:order-none mt-4 md:mt-0 space-y-1">
          <p>&copy; {new Date().getFullYear()} Mauro.exe. Tutti i Sistemi Operativi.</p>
          <p className="text-xs">Mauro Ceccarelli &middot; P.IVA 02606790448</p>
          <p className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
            <a href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="/cookie-policy" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={apriPreferenzeCookie} className="hover:text-cyan-400 transition-colors">Preferenze Cookie</button>
            <span aria-hidden="true">·</span>
            <a href="/#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
          <img src="/logo-64.webp" alt="Mauro.exe" width="28" height="28" className="object-contain" />
          <span className="font-display font-bold text-white tracking-widest">MAURO.EXE</span>
        </div>

      </div>
      </div>
    </footer>
  );
};

export default Footer;