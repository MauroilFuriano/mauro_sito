import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   HeroGalaxy — WebGL GLSL Fragment Shader
   Galassia procedurale: Via Lattea, nebulosa, stelle, shooting stars
   Zero dipendenze — puro WebGL
   ───────────────────────────────────────────────────────────── */

const VERT = `attribute vec2 a_pos;
void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;

const FRAG = `precision highp float;
uniform vec2  u_res;
uniform float u_time;

/* ── Hash / Noise ─────────────────────────────────────────── */
float h11(float n){return fract(sin(n)*43758.5453);}
float h21(vec2 p) {return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(
    mix(h21(i),            h21(i+vec2(1.0,0.0)),f.x),
    mix(h21(i+vec2(0.0,1.0)),h21(i+vec2(1.0,1.0)),f.x),
    f.y);
}

float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){v+=a*noise(p); p=p*2.03+vec2(3.1,1.7); a*=0.5;}
  return v;
}

/* ── Single star cell ─────────────────────────────────────── */
float star(vec2 uv, float scale, float cut){
  vec2 g  = fract(uv*scale)-0.5;
  vec2 id = floor(uv*scale);
  float r = h21(id);
  if(r<cut) return 0.0;
  float sz = 0.004 + h21(id+3.7)*0.011;
  float tw = 0.5 + 0.5*sin(u_time*(1.5+h21(id+9.1)*2.5)+r*6.2832);
  return smoothstep(sz,0.0,length(g))*tw*mix(0.4,1.0,h21(id+1.1));
}

void main(){
  vec2 uv = gl_FragCoord.xy/u_res;
  float ar = u_res.x/u_res.y;
  vec2 p   = (uv-0.5)*vec2(ar,1.0);

  /* ── Base space ─────────────────────────────────────────── */
  vec3 col = vec3(0.025, 0.02, 0.055);

  /* ── Milky Way band ─────────────────────────────────────── */
  float mwAx = p.x*cos(-0.22) - p.y*sin(-0.22);
  float mw   = exp(-mwAx*mwAx*7.0);
  col += vec3(0.07,0.14,0.32)*mw*(0.5+0.5*fbm(p*1.8+vec2(0.5,  u_time*0.003)));
  col += vec3(0.12,0.22,0.45)*mw*              fbm(p*3.2-vec2(u_time*0.002,0.2))*0.35;

  /* ── Nebulae ─────────────────────────────────────────────── */
  float n1 = fbm(p*2.2+vec2( u_time*0.006, 1.2));
  float n2 = fbm(p*1.7+vec2(-0.5,          u_time*0.005));
  float n3 = fbm(p*2.8+vec2( u_time*0.004,-0.8));

  /* Cyan cluster — destra, allineato ai blob Aurora */
  vec2 c1 = p-vec2(0.45, 0.05);
  col += vec3(0.0,0.70,1.0)*smoothstep(0.30,0.65,n1)*exp(-dot(c1,c1)*1.8)*0.28;

  /* Purple diffuso */
  col += vec3(0.35,0.0,0.75)*smoothstep(0.40,0.72,n2)*0.13;

  /* Gold accent — basso destra */
  vec2 c2 = p-vec2(0.2,-0.35);
  col += vec3(0.90,0.45,0.0)*smoothstep(0.50,0.78,n3)*exp(-dot(c2,c2)*2.5)*0.09;

  /* ── Star field — 10 layer con densità e colori diversi ─── */
  col += vec3(0.90,0.95,1.00)*star(uv,        80.0, 0.65)*1.00;
  col += vec3(0.75,0.88,1.00)*star(uv,        48.0, 0.70)*1.30;
  col += vec3(1.00,0.92,0.75)*star(uv+0.09,   62.0, 0.70)*0.90;
  col += vec3(0.90,0.93,1.00)*star(uv,       150.0, 0.55)*0.45;
  col += vec3(1.00,1.00,1.00)*star(uv,       280.0, 0.42)*0.28;
  col += vec3(0.80,0.90,1.00)*star(uv+0.15,  400.0, 0.38)*0.18;
  /* stelle extra nella Via Lattea */
  col += vec3(0.85,0.92,1.00)*star(uv*1.4+0.07,200.0,0.45)*mw*1.60;
  /* stelle luminose / colorate in primo piano */
  col += vec3(0.50,0.80,1.00)*star(uv,        18.0, 0.965)*4.5;
  col += vec3(1.00,0.90,0.55)*star(uv+0.50,   22.0, 0.968)*3.5;
  col += vec3(1.00,1.00,1.00)*star(uv+0.30,   12.0, 0.972)*5.5;

  /* ── Shooting star ───────────────────────────────────────── */
  float ep  = floor(u_time*0.14);
  float ph  = fract(u_time*0.14);
  vec2  s0  = vec2(mix(-0.5, 0.0, h11(ep*3.7)),
                   mix( 0.1, 0.45,h11(ep*1.3+0.5)));
  vec2  sd  = normalize(vec2(mix(0.7,1.0,  h11(ep)),
                              mix(-0.25,-0.55,h11(ep+0.3))));
  float dur = mix(0.18,0.38,h11(ep+0.7));
  float vis = smoothstep(0.0,0.04,ph)*smoothstep(dur,dur*0.65,ph);
  vec2  sUV = (s0+sd*ph*1.3)/vec2(ar,1.0)+0.5;
  vec2  ts  = uv-sUV;
  float al  = dot(ts,-sd);
  float pe  = length(ts-al*(-sd));
  col += vec3(0.55,0.90,1.0)
       * smoothstep(0.0025,0.0,pe)
       * smoothstep(0.0,0.12,al)
       * smoothstep(0.20,0.02,al)
       * vis * 3.5;

  /* ── Vignette ────────────────────────────────────────────── */
  col *= smoothstep(1.15, 0.35, length(p*vec2(0.85,1.0)));

  gl_FragColor = vec4(clamp(col,0.0,1.0), 1.0);
}`;

export default function HeroGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = (
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;
    if (!gl) return;

    /* ── Compile ── */
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
      console.error('Program link error:', gl.getProgramInfoLog(prog));
    gl.useProgram(prog);

    /* ── Full-screen quad ── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    /* ── Resize ── */
    let W = 0, H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      W = canvas.width  = canvas.offsetWidth  * dpr;
      H = canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, W, H);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Render loop ── */
    let raf = 0;
    const t0 = performance.now();
    const draw = (now: number) => {
      gl.uniform2f(uRes, W, H);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
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
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
