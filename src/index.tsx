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

/* Sempre createRoot: #root contiene SEO fallback statico che React sostituisce
   al mount. Hydrate causerebbe mismatch error. */
ReactDOM.createRoot(rootElement).render(app);