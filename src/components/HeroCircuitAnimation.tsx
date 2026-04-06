import React from 'react';

/* ─────────────────────────────────────────────────────────
   Percorsi che tracciano i flussi di luce reali dell'immagine.
   Coordinate su viewBox 1920×1080, allineate all'immagine hero-bg.jpg.
   I flussi partono da sinistra/basso e convergono verso la piattaforma
   centrale del circuito. Il cervello è in alto al centro-destra.
───────────────────────────────────────────────────────── */

const TRACES = [
  // Flusso Cyan principale — il più luminoso
  { id: 't1', color: '#00E5FF', glow: '#00E5FF', w: 2.5, delay: 0,    dur: 4,  len: 55,
    d: 'M 0 770 C 290 750 560 695 820 632 C 960 598 1060 572 1150 545' },
  // Flusso Viola
  { id: 't2', color: '#c084fc', glow: '#a855f7', w: 2,   delay: 1.4,  dur: 5.5, len: 45,
    d: 'M 0 850 C 290 828 560 773 820 712 C 960 678 1060 652 1150 625' },
  // Flusso Oro
  { id: 't3', color: '#fbbf24', glow: '#f59e0b', w: 1.8, delay: 2.8,  dur: 7,  len: 38,
    d: 'M 0 930 C 290 907 560 851 820 791 C 960 758 1060 731 1150 705' },
  // Flusso Verde
  { id: 't4', color: '#4ade80', glow: '#22c55e', w: 1.5, delay: 0.7,  dur: 3.8, len: 32,
    d: 'M 0 690 C 265 670 520 618 775 562 C 910 530 1015 505 1100 480' },
  // Flusso Cyan sottile (alto)
  { id: 't5', color: '#67e8f9', glow: '#00E5FF', w: 1.2, delay: 3.5,  dur: 6,  len: 28,
    d: 'M 0 610 C 245 590 490 542 735 492 C 888 459 1000 434 1080 410' },
  // Flusso Viola basso
  { id: 't6', color: '#e879f9', glow: '#a855f7', w: 1.5, delay: 4.5,  dur: 8.5, len: 35,
    d: 'M 0 1000 C 290 975 560 918 820 858 C 960 825 1060 797 1150 770' },
];

/* Nodi del cervello — posizioni stimate sul cervello olografico
   presente nell'immagine (~centro x:975 y:235, raggio ~180px) */
const NODES = [
  { id: 'n0', cx: 975, cy: 237, r: 7,  delay: 0    }, // centro
  { id: 'n1', cx: 938, cy: 148, r: 5,  delay: 0.3  },
  { id: 'n2', cx: 1022, cy: 144, r: 5,  delay: 0.6  },
  { id: 'n3', cx: 858,  cy: 215, r: 4,  delay: 0.9  },
  { id: 'n4', cx: 1095, cy: 212, r: 4,  delay: 1.2  },
  { id: 'n5', cx: 905,  cy: 305, r: 5,  delay: 1.5  },
  { id: 'n6', cx: 1050, cy: 300, r: 5,  delay: 1.8  },
  { id: 'n7', cx: 975,  cy: 148, r: 3.5, delay: 0.4 },
  { id: 'n8', cx: 883,  cy: 172, r: 3,  delay: 0.8  },
  { id: 'n9', cx: 1070, cy: 170, r: 3,  delay: 1.1  },
];

const NODE_MAP: Record<string, { cx: number; cy: number }> = {};
NODES.forEach(n => { NODE_MAP[n.id] = { cx: n.cx, cy: n.cy }; });

/* Connessioni tra nodi — coppie [da, a] con timing */
const EDGES: { from: string; to: string; delay: number; dur: number }[] = [
  { from: 'n1', to: 'n7',  delay: 0,   dur: 1.8 },
  { from: 'n7', to: 'n2',  delay: 0.3, dur: 2   },
  { from: 'n1', to: 'n8',  delay: 0.5, dur: 1.5 },
  { from: 'n2', to: 'n9',  delay: 0.7, dur: 1.5 },
  { from: 'n8', to: 'n3',  delay: 1,   dur: 1.8 },
  { from: 'n9', to: 'n4',  delay: 1.2, dur: 1.8 },
  { from: 'n3', to: 'n0',  delay: 1.4, dur: 2   },
  { from: 'n4', to: 'n0',  delay: 1.6, dur: 2   },
  { from: 'n0', to: 'n5',  delay: 1.8, dur: 2   },
  { from: 'n0', to: 'n6',  delay: 2,   dur: 2   },
  { from: 'n5', to: 'n6',  delay: 2.2, dur: 1.8 },
  { from: 'n1', to: 'n2',  delay: 0.2, dur: 2.5 },
  { from: 'n3', to: 'n5',  delay: 1.5, dur: 2.2 },
  { from: 'n4', to: 'n6',  delay: 1.7, dur: 2.2 },
];

/* Calcola la lunghezza approssimativa di un segmento per dasharray */
function edgeLen(from: string, to: string): number {
  const a = NODE_MAP[from];
  const b = NODE_MAP[to];
  return Math.hypot(b.cx - a.cx, b.cy - a.cy);
}

const HeroCircuitAnimation: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1920 1080"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      {/* Filtri glow — blur amplificato per screen blend */}
      {['cyan', 'purple', 'gold', 'green'].map(c => (
        <filter key={c} id={`glow-${c}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      ))}
      <filter id="glow-brain" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ── Tracce circuito: base (tenue) + scintilla mobile ── */}
    {TRACES.map(t => {
      const totalLen = 1300; // lunghezza approssimativa percorso
      const gap = totalLen - t.len;
      return (
        <g key={t.id}>
          {/* Scintilla che scorre — dash animato, screen blend la integra nell'immagine */}
          <path
            d={t.d}
            fill="none"
            stroke={t.color}
            strokeWidth={t.w + 2}
            strokeLinecap="round"
            strokeDasharray={`${t.len} ${gap}`}
            opacity={1}
            filter="url(#glow-cyan)"
            style={{
              animation: `circuit-flow ${t.dur}s linear infinite`,
              animationDelay: `${t.delay}s`,
              ['--total' as string]: totalLen + t.len,
            } as React.CSSProperties}
          />
        </g>
      );
    })}

    {/* ── Neuroni del cervello: connessioni con luce che scorre ── */}
    {EDGES.map((e, i) => {
      const a = NODE_MAP[e.from];
      const b = NODE_MAP[e.to];
      const len = edgeLen(e.from, e.to);
      const sparkLen = 14;
      return (
        <g key={i}>
          {/* Connessione base */}
          <line
            x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
            stroke="#00E5FF" strokeWidth={0.8} opacity={0.18}
          />
          {/* Luce che percorre la connessione */}
          <line
            x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
            stroke="#00E5FF" strokeWidth={1.8}
            strokeLinecap="round"
            strokeDasharray={`${sparkLen} ${len}`}
            filter="url(#glow-brain)"
            style={{
              animation: `neuron-flow ${e.dur}s linear infinite`,
              animationDelay: `${e.delay}s`,
              ['--neuron-len' as string]: len + sparkLen,
            } as React.CSSProperties}
          />
        </g>
      );
    })}

    {/* ── Nodi neurali: cerchi pulsanti ── */}
    {NODES.map(n => (
      <g key={n.id}>
        {/* Alone esterno — più visibile con screen blend */}
        <circle cx={n.cx} cy={n.cy} r={n.r * 4} fill="rgba(0,229,255,0.18)" />
        {/* Nucleo */}
        <circle
          cx={n.cx} cy={n.cy} r={n.r}
          fill="#00E5FF"
          filter="url(#glow-brain)"
          style={{
            animation: `node-pulse 2.4s ease-in-out infinite`,
            animationDelay: `${n.delay}s`,
            transformBox: 'fill-box',
            transformOrigin: 'center',
          }}
        />
      </g>
    ))}
  </svg>
);

export default HeroCircuitAnimation;
