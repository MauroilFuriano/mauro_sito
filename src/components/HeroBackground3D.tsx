import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   HeroBackground3D — Canvas 2D puro, zero dipendenze esterne

   Tecnica:
   1. Disegna hero-bg.jpg sul canvas (object-cover)
   2. In loop rAF applica glow animato sulle aree luminose:
      – globalCompositeOperation 'screen' → i glow si fondono
        con i pixel dell'immagine (NON si vedono come overlay)
      – Radial gradient pulsanti sul cervello e sui data-stream
      – Shimmer che "scorre" lungo le tracce dei circuiti
   3. Mobile / prefers-reduced-motion → <img> statica
   ─────────────────────────────────────────────────────────── */

const GRADIENT_DESKTOP =
  'linear-gradient(to right, #0a0a14 0%, #0a0a14 30%, rgba(10,10,20,0.65) 52%, rgba(10,10,20,0.05) 100%)';

/* Punti glow — coordinate normalizzate [0-1] relative al canvas.
   Corrispondono alle aree luminose dell'immagine:
   cervello (centro-destra), chip sotto, data-stream colorati */
const GLOWS = [
  { x: 0.62, y: 0.30, r: 0.12, color: '#00E5FF', speed: 0.9  }, // cervello
  { x: 0.62, y: 0.50, r: 0.07, color: '#00E5FF', speed: 1.3  }, // chip
  { x: 0.20, y: 0.72, r: 0.06, color: '#00E5FF', speed: 1.1  }, // stream sx
  { x: 0.35, y: 0.68, r: 0.05, color: '#c084fc', speed: 0.8  }, // stream viola
  { x: 0.45, y: 0.65, r: 0.05, color: '#fbbf24', speed: 1.5  }, // stream oro
  { x: 0.55, y: 0.62, r: 0.04, color: '#4ade80', speed: 1.2  }, // stream verde
];

/* Scintille che scorrono lungo i data-stream (da sx verso centro) */
const SPARKS = [
  { y: 0.71, color: '#00E5FF', speed: 0.07, phase: 0.0 },
  { y: 0.76, color: '#c084fc', speed: 0.05, phase: 0.3 },
  { y: 0.81, color: '#fbbf24', speed: 0.06, phase: 0.6 },
  { y: 0.65, color: '#4ade80', speed: 0.08, phase: 0.9 },
];

const HeroBackground3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // usa il fallback <img>

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Ridimensiona canvas al contenitore */
    const resize = () => {
      canvas.width  = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* Carica immagine */
    const img = new Image();
    img.src = '/hero-bg.jpg';

    let raf = 0;
    let t   = 0;

    /* Disegna immagine con comportamento object-cover */
    const drawImage = (W: number, H: number) => {
      const iW = img.naturalWidth  || 1920;
      const iH = img.naturalHeight || 1080;
      const scale = Math.max(W / iW, H / iH);
      const sw = iW * scale;
      const sh = iH * scale;
      const sx = (W - sw) / 2;
      const sy = (H - sh) / 2;
      ctx.globalAlpha = 0.92;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, sx, sy, sw, sh);
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      t += 0.012;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      /* 1. Immagine base */
      drawImage(W, H);

      /* 2. Glow pulsanti — screen blend si fonde coi pixel dell'img */
      ctx.globalCompositeOperation = 'screen';

      GLOWS.forEach(g => {
        const pulse = 0.5 + 0.5 * Math.sin(t * g.speed);
        const cx = g.x * W;
        const cy = g.y * H;
        const radius = g.r * Math.min(W, H) * (1 + pulse * 0.25);
        const alpha  = 0.18 + pulse * 0.22;

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grd.addColorStop(0,   hexAlpha(g.color, alpha));
        grd.addColorStop(0.5, hexAlpha(g.color, alpha * 0.4));
        grd.addColorStop(1,   hexAlpha(g.color, 0));
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      /* 3. Scintille che scorrono lungo i data-stream */
      SPARKS.forEach(s => {
        const x = ((t * s.speed + s.phase) % 0.65) * W; // 0 → 65% larghezza
        const y = s.y * H;
        const r = 28;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0,   hexAlpha(s.color, 0.7));
        grd.addColorStop(0.4, hexAlpha(s.color, 0.2));
        grd.addColorStop(1,   hexAlpha(s.color, 0));
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(animate);
    };

    img.onload  = () => { raf = requestAnimationFrame(animate); };
    img.onerror = () => { /* fallback <img> già visibile */ };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      {/* Fallback statico — sempre visibile finché canvas non è pronto */}
      <img
        src="/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.92 }}
        loading="eager"
      />

      {/* Canvas animato — sovrascrive l'img su desktop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full hidden lg:block"
        aria-hidden="true"
      />

      {/* Gradiente desktop per leggibilità testo */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{ background: GRADIENT_DESKTOP }}
      />
      {/* Overlay mobile */}
      <div className="absolute inset-0 bg-[#0a0a14]/60 lg:hidden pointer-events-none" />
    </div>
  );
};

/* Helper: converte hex + alpha in rgba */
function hexAlpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

export default HeroBackground3D;
