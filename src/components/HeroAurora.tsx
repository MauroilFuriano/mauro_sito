/* ─────────────────────────────────────────────────────────────
   HeroAurora — Aurora UI 2026
   Stile Vercel / Linear / Stripe: blob gradiente animati lentamente.
   Zero dipendenze. Puro CSS + React.
   ─────────────────────────────────────────────────────────── */

const HeroAurora = () => (
  <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

    {/* Base */}
    <div className="absolute inset-0 bg-[#0a0a14]" />

    {/* Blob 1 — Cyan grande, destra-alto (focus principale desktop) */}
    <div style={{
      position: 'absolute',
      width: '70vw',
      height: '70vw',
      maxWidth: 900,
      maxHeight: 900,
      right: '-10%',
      top: '-5%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.06) 50%, transparent 75%)',
      filter: 'blur(80px)',
      animation: 'aurora-float-1 14s ease-in-out infinite',
    }} />

    {/* Blob 2 — Viola centro-destra */}
    <div style={{
      position: 'absolute',
      width: '55vw',
      height: '55vw',
      maxWidth: 700,
      maxHeight: 700,
      right: '5%',
      top: '30%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(192,132,252,0.14) 0%, rgba(168,85,247,0.05) 55%, transparent 75%)',
      filter: 'blur(100px)',
      animation: 'aurora-float-2 18s ease-in-out infinite',
    }} />

    {/* Blob 3 — Gold caldo, basso-destra (calore) */}
    <div style={{
      position: 'absolute',
      width: '45vw',
      height: '45vw',
      maxWidth: 600,
      maxHeight: 600,
      right: '15%',
      bottom: '-10%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(251,191,36,0.10) 0%, rgba(245,158,11,0.04) 55%, transparent 75%)',
      filter: 'blur(90px)',
      animation: 'aurora-float-3 22s ease-in-out infinite',
    }} />

    {/* Blob 4 — Cyan piccolo, centro — ponte tra testo e visual */}
    <div style={{
      position: 'absolute',
      width: '35vw',
      height: '35vw',
      maxWidth: 450,
      maxHeight: 450,
      left: '30%',
      top: '20%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(0,229,255,0.02) 55%, transparent 75%)',
      filter: 'blur(70px)',
      animation: 'aurora-float-4 11s ease-in-out infinite',
    }} />

    {/* Blob 5 — Viola scuro, sinistra-alto (profondità sinistra) */}
    <div style={{
      position: 'absolute',
      width: '40vw',
      height: '40vw',
      maxWidth: 500,
      maxHeight: 500,
      left: '-5%',
      top: '10%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(79,70,229,0.03) 55%, transparent 75%)',
      filter: 'blur(110px)',
      animation: 'aurora-float-5 16s ease-in-out infinite',
    }} />

    {/* Vignette bordi per profondità */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,20,0.7) 100%)',
      pointerEvents: 'none',
    }} />

  </div>
);

export default HeroAurora;
