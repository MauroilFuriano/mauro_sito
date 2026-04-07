import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   HeroStarsMobile — Canvas 2D, solo mobile
   • Stelle twinkle + glow su ~15% di esse
   • Drift lento (le stelle si muovono impercettibilmente)
   • Shooting stars occasionali (gradient line)
   • DPR 1.0, max 120 stelle, pausa off-screen — battery-safe
   ───────────────────────────────────────────────────────────── */

interface Star {
  x: number; y: number; r: number;
  baseAlpha: number; phase: number; speed: number;
  color: string; glow: boolean;
  vx: number; vy: number;
}

interface Particle {
  x: number; y: number; r: number;
  vy: number; alpha: number; color: string;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  len: number; alpha: number;
}

const STAR_COLORS = ['#ffffff', '#e0f7ff', '#00E5FF', '#b3f0ff', '#c084fc', '#7dd3fc'];
const PART_COLORS = ['#00E5FF', '#c084fc', '#ffffff', '#7dd3fc'];

export default function HeroStarsMobile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Pausa quando fuori viewport — risparmio batteria */
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    let W = 0, H = 0;
    let stars: Star[] = [];
    let particles: Particle[] = [];
    let shooting: ShootingStar | null = null;
    let shootTimer = 0;

    /* ── Resize — DPR 1.0 su mobile ── */
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildStars();
    };

    /* ── Stelle con glow e drift ── */
    const buildStars = () => {
      const count = Math.min(Math.floor((W * H) / 6500), 130);
      stars = Array.from({ length: count }, (_, i) => ({
        x:         Math.random() * W,
        y:         Math.random() * H,
        r:         Math.random() * 1.5 + 0.35,
        baseAlpha: Math.random() * 0.55 + 0.25,
        phase:     Math.random() * Math.PI * 2,
        speed:     Math.random() * 0.8 + 0.3,
        color:     STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        /* Il 15% delle stelle brilla con glow */
        glow:      i < Math.floor(count * 0.15),
        /* Drift impercettibile (±0.05 px/frame) */
        vx:        (Math.random() - 0.5) * 0.05,
        vy:        (Math.random() - 0.5) * 0.035,
      }));
    };

    const spawnParticle = () => {
      particles.push({
        x:     Math.random() * W,
        y:     H + 4,
        r:     Math.random() * 1.3 + 0.4,
        vy:    -(Math.random() * 0.4 + 0.15),
        alpha: Math.random() * 0.4 + 0.2,
        color: PART_COLORS[Math.floor(Math.random() * PART_COLORS.length)],
      });
    };

    /* ── Shooting star ── */
    const spawnShooting = () => {
      shooting = {
        x:   Math.random() * W * 0.55,
        y:   Math.random() * H * 0.38,
        vx:  W * 0.014 + Math.random() * W * 0.006,
        vy:  H * 0.004 + Math.random() * H * 0.002,
        len: W * 0.09,
        alpha: 1.0,
      };
    };

    let raf = 0;
    let t = 0;
    let partTimer = 0;

    const draw = () => {
      if (!isVisible) { raf = requestAnimationFrame(draw); return; }

      t += 0.016;
      partTimer++;
      shootTimer++;

      ctx.clearRect(0, 0, W, H);

      /* ── Stelle ── */
      stars.forEach(s => {
        /* Drift — wrap ai bordi */
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = W + 2;
        else if (s.x > W + 2) s.x = -2;
        if (s.y < -2) s.y = H + 2;
        else if (s.y > H + 2) s.y = -2;

        const a = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));

        if (s.glow) {
          ctx.shadowBlur  = 7;
          ctx.shadowColor = s.color;
        }

        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();

        if (s.glow) {
          ctx.shadowBlur  = 0;
          ctx.shadowColor = 'transparent';
        }
      });

      ctx.globalAlpha = 1;

      /* ── Particelle ── */
      if (partTimer > 14) { spawnParticle(); partTimer = 0; }
      particles = particles.filter(p => p.alpha > 0.01);
      particles.forEach(p => {
        p.y     += p.vy;
        p.alpha -= 0.0012;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      /* ── Shooting star — ogni ~3.5s ── */
      if (shootTimer > 210 && !shooting) {
        spawnShooting();
        shootTimer = 0;
      }
      if (shooting) {
        shooting.x     += shooting.vx;
        shooting.y     += shooting.vy;
        shooting.alpha -= 0.018;

        if (shooting.alpha <= 0 || shooting.x > W + 10) {
          shooting = null;
        } else {
          const x0 = shooting.x - shooting.len;
          const y0 = shooting.y - shooting.len * 0.28;
          const grad = ctx.createLinearGradient(x0, y0, shooting.x, shooting.y);
          grad.addColorStop(0, 'rgba(0,229,255,0)');
          grad.addColorStop(0.6, `rgba(180,240,255,${shooting.alpha * 0.5})`);
          grad.addColorStop(1, `rgba(0,229,255,${shooting.alpha})`);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 1.5;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(shooting.x, shooting.y);
          ctx.stroke();

          /* Puntino luminoso in testa */
          ctx.globalAlpha = shooting.alpha;
          ctx.shadowBlur  = 6;
          ctx.shadowColor = '#00E5FF';
          ctx.beginPath();
          ctx.arc(shooting.x, shooting.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

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
