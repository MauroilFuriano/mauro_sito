import path from 'path';
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
      png: { quality: 70 },
      jpeg: { quality: 70 },
      webp: { quality: 75 },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap':   ['gsap'],
          'vendor-framer': ['framer-motion'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
          'vendor-sentry': ['@sentry/react'],
          'vendor-misc':   ['lenis', 'lucide-react', 'react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
});