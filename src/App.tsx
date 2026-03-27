import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sentry from './sentry';

const HomePage = lazy(() => import('./pages/HomePage'));
const HotelLanding = lazy(() => import('./pages/HotelLanding'));
const SaasLanding = lazy(() => import('./pages/SaasLanding'));
const AgriEcommerceLanding = lazy(() => import('./pages/AgriEcommerceLanding'));
const PromoPasqua = lazy(() => import('./pages/PromoPasqua'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));

const Loading = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <span className="text-cyan-400 text-lg animate-pulse">Caricamento...</span>
  </div>
);

const ErrorFallback = () => (
  <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-white px-6">
    <h1 className="text-3xl font-bold mb-4">Qualcosa e andato storto</h1>
    <p className="text-gray-400 mb-8 text-center">Si e verificato un errore imprevisto. Riprova a caricare la pagina.</p>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-cyan-400 text-dark-950 font-bold rounded-lg hover:bg-cyan-300 transition-colors"
    >
      Ricarica pagina
    </button>
  </div>
);

const App: React.FC = () => {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotel" element={<HotelLanding />} />
            <Route path="/reception-ai" element={<Navigate to="/hotel" replace />} />
            <Route path="/saas" element={<SaasLanding />} />
            <Route path="/agri-ecommerce" element={<AgriEcommerceLanding />} />
            <Route path="/promo-pasqua" element={<PromoPasqua />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          </Routes>
        </Suspense>
      </Router>
    </Sentry.ErrorBoundary>
  );
};

export default App;
