import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home',      href: '#home' },
  { name: 'Chi Sono',  href: '#about' },
  { name: 'Servizi',   href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'FAQ',       href: '#faq' },
  { name: 'Contatti',  href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + link.href);
    } else {
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 isolate-blur ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center min-w-0">

        <a
          href="#home"
          className="flex items-center gap-2 md:gap-4 group flex-shrink-0"
          onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}
        >
          <img
            src="/logo.webp"
            alt="Mauro.exe - Sviluppatore Web Ascoli Piceno"
            width="80"
            height="80"
            fetchPriority="high"
            className="w-14 h-14 md:w-20 md:h-20 object-contain transition-[transform,filter] duration-300
                       drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]
                       group-hover:drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]
                       group-hover:scale-110 flex-shrink-0
                       [transform:translate3d(0,0,0)] [will-change:transform]"
          />
          <div className="flex flex-col flex-shrink-0">
            <span className="font-display font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors glow-text text-lg sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
              MAURO.EXE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="relative text-sm lg:text-base font-medium tracking-wide transition-colors py-2 group text-gray-300 hover:text-cyan-400"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            </a>
          ))}

          <a
            href="https://wa.me/393480029661"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 glow-box"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
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
          isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: '#0d0d1a' }}
      >
        <div className="flex flex-col p-6 space-y-2 items-center text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="text-lg font-medium transition-all w-full py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}

          <div className="w-full pt-4 border-t border-white/10 mt-2">
            <a
              href="https://wa.me/393480029661"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:border-cyan-400/40 transition-all duration-300 text-sm uppercase text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
