import React from 'react';
import { Github, Twitter, Linkedin, Terminal } from 'lucide-react';

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
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110">
            <Twitter size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;