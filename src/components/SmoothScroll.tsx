import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { conStileVetrina } from '../data/seo';

const SmoothScroll = () => {
  const { pathname } = useLocation();
  const scrollNativo = conStileVetrina(pathname);

  useEffect(() => {
    // Le pagine nello stile della home usano lo scroll nativo: in home pin e snap del palco dei lavori sono di GSAP
    if (scrollNativo) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [scrollNativo]);

  return null;
};

export default SmoothScroll;
