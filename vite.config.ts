import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: false,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      // Su Windows, se Vite vede il disco come "c:" e il plugin come "C:", le copie compresse finiscono sopra gli originali di public/: le immagini lì vanno messe già ottimizzate
      includePublic: false,
      png: { quality: 70 },
      jpeg: { quality: 70 },
      webp: { quality: 75 },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Con l'elenco per pacchetto react/jsx-runtime finiva nel chunk di framer-motion, scaricato così su ogni pagina
        manualChunks: (idModulo) => {
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run[\\/]router)[\\/]/.test(idModulo)) return 'vendor-react';
          if (/[\\/]node_modules[\\/]gsap[\\/]/.test(idModulo)) return 'vendor-gsap';
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(idModulo)) return 'vendor-framer';
          if (/[\\/]node_modules[\\/](lenis|lucide-react|react-helmet-async)[\\/]/.test(idModulo)) return 'vendor-misc';
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});