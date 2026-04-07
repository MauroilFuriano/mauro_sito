import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

/* Sentry caricato dopo page load — non blocca rendering né TTI
   457KB → fuori dal critical path, save ~151KB gzip sul first load */
const loadSentry = () => import('./sentry').catch(() => {});
const w = window as typeof window & { requestIdleCallback?: (cb: () => void) => void };
if (w.requestIdleCallback) {
  w.requestIdleCallback(loadSentry);
} else {
  w.addEventListener('load', loadSentry, { once: true });
}

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

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}