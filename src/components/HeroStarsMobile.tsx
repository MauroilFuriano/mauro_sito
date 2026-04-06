import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   HeroStarsMobile — Canvas 2D, solo mobile
   Stelle con twinkle + particelle flottanti, ZERO nebulosa.
   Design per batteria: DPR 1.0, max 120 stelle, pausa se off-screen.
   ───────────────────────────────────────────────────────────── */

interface Star {
  x: number; y: number; r: number;
  baseAlpha: number; phase: number; speed: number;
  color: string;
}

interface Particle {
  x: number; y: number; r: number;
  vy: number; alpha: number; color: string;
}

const STAR_COLORS = ['#ffffff', '#e0f7ff', '#00E5FF', '#b3f0ff', '#c084fc'];
const PART_COLORS = ['#00E5FF', '#c084fc', '#ffffff', '#7dd3fc'];

export default function HeroStarsMobile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Rispetta prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Pausa GPU quando fuori viewport — risparmio batteria */
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    let W = 0, H = 0;
    let stars: Star[]     = [];
    let particles: Particle[] = [];

    /* ── Resize: DPR fisso 1.0 su mobile ── */
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;   // DPR 1.0 — risparmio batteria
      H = canvas.height = canvas.offsetHeight;
      buildStars();
    };

    /* ── Stelle fisse — max 120 ── */
    const buildStars = () => {
      const count = Math.min(Math.floor((W * H) / 7000), 120);
      stars = Array.from({ length: count }, () => ({
        x:         Math.random() * W,
        y:         Math.random() * H,
        r:         Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.2,
        phase:     Math.random() * Math.PI * 2,
        speed:     Math.random() * 0.7 + 0.3,
        color:     STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    };

    /* ── Particella ── */
    const spawnParticle = () => {
      particles.push({
        x:     Math.random() * W,
        y:     H + 4,
        r:     Math.random() * 1.4 + 0.4,
        vy:    -(Math.random() * 0.45 + 0.18),
        alpha: Math.random() * 0.45 + 0.2,
        color: PART_COLORS[Math.floor(Math.random() * PART_COLORS.length)],
      });
    };

    let raf = 0;
    let t   = 0;
    let partTimer = 0;

    const draw = () => {
      /* Se fuori viewport: salta il render, risparmia batteria */
      if (!isVisible) { raf = requestAnimationFrame(draw); return; }

      t += 0.016;
      partTimer++;

      ctx.clearRect(0, 0, W, H);

      /* Stelle con twinkle (sin-wave alpha) */
      stars.forEach(s => {
        const a = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      /* Particelle — spawn ogni 12 frame (meno frequenti del desktop) */
      if (partTimer > 12) { spawnParticle(); partTimer = 0; }
      particles = particles.filter(p => p.alpha > 0.01);
      particles.forEach(p => {
        p.y    += p.vy;
        p.alpha -= 0.0015;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
