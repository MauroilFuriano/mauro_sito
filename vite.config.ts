import path from 'path';
import { defineConfig } from 'vite'; // Nota: loadEnv non serve più qui
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  // Abbiamo rimosso tutta la parte "define: process.env..."
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});