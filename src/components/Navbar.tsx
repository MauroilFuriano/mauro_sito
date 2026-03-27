import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  href: string;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { name: 'Home',      href: '#home' },
  { name: 'Chi Sono',  href: '#about' },
  { name: 'Servizi',   href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'FAQ',       href: '/faq', isRoute: true },
  { name: 'Contatti',  href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsOpen(false);

    if (link.isRoute) {
      navigate(link.href);
      return;
    }

    // Anchor link: if on homepage scroll to section, else navigate home + hash
    if (location.pathname !== '/') {
      navigate('/' + link.href);
    } else {
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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

        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-4 group"
          onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}
        >
          <img
            src="/logo.png"
            alt="Mauro.exe - Sviluppatore Web Ascoli Piceno"
            width="80"
            height="80"
            fetchPriority="high"
            className="w-14 h-14 md:w-20 md:h-20 object-contain transition-all duration-300
                       drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]
                       group-hover:drop-shadow-[0_0_25px_rgba(0,229,255,1)]
                       group-hover:scale-110"
          />
          <span className="font-display font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors glow-text text-xl md:text-3xl">
            MAURO.EXE
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`relative text-base font-medium tracking-wide transition-colors py-2 group ${
                link.isRoute && location.pathname === link.href
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            </a>
          ))}
          <a
            href="#lead-magnet"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') {
                navigate('/#lead-magnet');
              } else {
                const el = document.getElementById('lead-magnet');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-5 py-3 bg-green-400/10 border border-green-400/30 text-green-400 text-sm font-bold tracking-wide rounded hover:bg-green-400/20 hover:border-green-400 transition-all duration-300 uppercase whitespace-nowrap"
          >
            <Download size={14} />
            7 Errori Gratis
          </a>
          <a
            href="#contact"
            onClick={handleCTA}
            className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 text-sm font-bold tracking-widest rounded hover:bg-cyan-400 hover:text-black transition-all duration-300 glow-box uppercase"
          >
            Lavora con me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-cyan-400 transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full border-b border-white/10 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: '#0d0d1a' }}
      >
        <div className="flex flex-col p-6 space-y-2 items-center text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-lg font-medium transition-all w-full py-3 rounded-lg hover:bg-white/5 ${
                link.isRoute && location.pathname === link.href
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          {/* CTA mobile */}
          <div className="w-full pt-4 border-t border-white/10 mt-2">
            <a
              href="#contact"
              onClick={handleCTA}
              className="block w-full py-4 bg-cyan-400 text-black font-display font-bold tracking-widest rounded-lg hover:bg-cyan-300 transition-all duration-300 text-sm uppercase text-center"
            >
              Lavora con me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
