import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   HeroParticles — Canvas 2D puro, zero dipendenze

   • Stelle fisse con twinkle (opacity sin-wave)
   • Particelle cilindriche che salgono e svaniscono
   • Shooting stars occasionali (diagonale)
   ─────────────────────────────────────────────────────────── */

interface Star {
  x: number; y: number; r: number;
  baseAlpha: number; phase: number; speed: number;
  color: string;
}

interface Particle {
  x: number; y: number; r: number;
  vy: number; alpha: number; color: string;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  len: number; alpha: number; active: boolean;
}

const STAR_COLORS  = ['#ffffff', '#e0f7ff', '#00E5FF', '#b3f0ff'];
const PART_COLORS  = ['#00E5FF', '#c084fc', '#ffffff', '#4ade80'];

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Rispetta prefers-reduced-motion ── */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let stars: Star[]         = [];
    let particles: Particle[] = [];
    const shoots: ShootingStar[] = Array.from({ length: 3 }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, len: 0, alpha: 0, active: false,
    }));

    /* ── Resize ── */
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildStars();
    };

    /* ── Genera stelle fisse ── */
    const buildStars = () => {
      const count = Math.floor((W * H) / 6000);   // densità adattiva
      stars = Array.from({ length: count }, () => ({
        x:         Math.random() * W,
        y:         Math.random() * H,
        r:         Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.15,
        phase:     Math.random() * Math.PI * 2,
        speed:     Math.random() * 0.8 + 0.3,
        color:     STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    };

    /* ── Spawna una particella ── */
    const spawnParticle = () => {
      particles.push({
        x:     Math.random() * W,
        y:     H + 4,
        r:     Math.random() * 1.8 + 0.6,
        vy:    -(Math.random() * 0.6 + 0.25),
        alpha: Math.random() * 0.5 + 0.25,
        color: PART_COLORS[Math.floor(Math.random() * PART_COLORS.length)],
      });
    };

    /* ── Attiva una shooting star ── */
    const triggerShoot = (s: ShootingStar) => {
      s.x     = Math.random() * W * 0.7;
      s.y     = Math.random() * H * 0.4;
      s.vx    = Math.random() * 4 + 3;
      s.vy    = Math.random() * 2 + 1;
      s.len   = Math.random() * 80 + 50;
      s.alpha = 0.9;
      s.active = true;
    };

    /* ── Loop ── */
    let raf = 0;
    let t   = 0;
    let partTimer = 0;
    let shootTimer = 0;

    const draw = () => {
      t += 0.016;
      partTimer  += 1;
      shootTimer += 1;

      ctx.clearRect(0, 0, W, H);

      /* Stelle */
      stars.forEach(s => {
        const a = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace(')', `,${a})`).replace('rgb', 'rgba')
          || `rgba(255,255,255,${a})`;
        // hex → rgba manuale
        ctx.globalAlpha = a;
        ctx.fillStyle   = s.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      /* Particelle */
      if (partTimer > 8) { spawnParticle(); partTimer = 0; }
      particles = particles.filter(p => p.alpha > 0.01);
      particles.forEach(p => {
        p.y    += p.vy;
        p.alpha -= 0.0018;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      /* Shooting stars */
      if (shootTimer > 240 + Math.random() * 300) {
        const inactive = shoots.find(s => !s.active);
        if (inactive) triggerShoot(inactive);
        shootTimer = 0;
      }

      shoots.forEach(s => {
        if (!s.active) return;
        s.x     += s.vx;
        s.y     += s.vy;
        s.alpha -= 0.025;
        if (s.alpha <= 0 || s.x > W || s.y > H) { s.active = false; return; }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        const grad = ctx.createLinearGradient(
          s.x - s.vx * 6, s.y - s.vy * 6, s.x, s.y,
        );
        grad.addColorStop(0, 'rgba(0,229,255,0)');
        grad.addColorStop(1, '#00E5FF');
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * (s.len / 10), s.y - s.vy * (s.len / 10));
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
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
