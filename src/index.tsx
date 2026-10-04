import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/caratteri.css';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

/* Dopo un deploy i chunk della versione precedente non esistono più (Skew Protection
   solo su Pro): una ricarica al minuto al massimo, per non andare in loop. */
window.addEventListener('vite:preloadError', (erroreCaricamento) => {
  try {
    if (Date.now() - Number(sessionStorage.getItem('ricaricaDopoDeploy')) < 60_000) return;
    sessionStorage.setItem('ricaricaDopoDeploy', String(Date.now()));
  } catch {
    return;
  }
  erroreCaricamento.preventDefault();
  window.location.reload();
});

/* Sempre createRoot: #root contiene SEO fallback statico che React sostituisce
   al mount. Hydrate causerebbe mismatch error. */
ReactDOM.createRoot(rootElement).render(app);