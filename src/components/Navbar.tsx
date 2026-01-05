import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Chi Sono', href: '#about' },
    { name: 'Servizi', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contatti', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO MAURO.EXE - VERSIONE GRANDANGOLARE */}
        <a 
          href="#home" 
          className="flex items-center gap-4 group" 
          onClick={(e) => handleNavClick(e, '#home')}
        >
          {/* Contenitore Immagine Logo:
              - Mobile: w-12 h-12 (48px)
              - Desktop (md): w-20 h-20 (80px) -> Molto più grande! 
          */}
          <div className="relative w-12 h-12 md:w-20 md:h-20 overflow-hidden rounded-xl border-2 border-cyan-400/30 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.15)] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]">
            <img 
              src="/logo.png" 
              alt="Mauro.exe Logo" 
              className="w-full h-full object-cover"
            />
            {/* Effetto Scanline (raggio che passa sopra) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse" />
          </div>

          {/* Testo Accanto al Logo:
              - Mobile: text-xl
              - Desktop (md): text-3xl -> Scritta bella grossa
          */}
          <span className="font-display font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors glow-text text-xl md:text-3xl">
            MAURO.EXE
          </span>
        </a>

        {/* Desktop Navigation - Ho aumentato un po' anche il font dei menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-base font-medium tracking-wide text-gray-300 hover:text-cyan-400 transition-colors py-2 group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 text-sm font-bold tracking-widest rounded hover:bg-cyan-400 hover:text-black transition-all duration-300 glow-box uppercase"
          >
            Lavora con me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-cyan-400 transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 items-center text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xl font-medium text-gray-300 hover:text-cyan-400 transition-all w-full py-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;