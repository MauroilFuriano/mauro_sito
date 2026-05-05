import React, { lazy, Suspense, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CookieBanner from './components/CookieBanner';

/* ── GA4 page view tracker per SPA — solo con consenso analytics ── */
const GA4PageTracker: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const analyticsConsent = localStorage.getItem('cookie_analytics');
    if (analyticsConsent !== 'true') return;
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
      });
    }
  }, [location]);
  return null;
};

/* ── Lazy pages ─────────────────────────────────────────────── */
const HomePage = lazy(() => import('./pages/HomePage'));
const HotelLanding = lazy(() => import('./pages/HotelLanding'));
const SaasLanding = lazy(() => import('./pages/SaasLanding'));
const AgriEcommerceLanding = lazy(() => import('./pages/AgriEcommerceLanding'));
const SimulatorePreventivo = lazy(() => import('./pages/SimulatorePreventivo'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const DigitalCard = lazy(() => import('./pages/DigitalCard'));

/* ── Loading fallback ───────────────────────────────────────── */
const Loading = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <span className="text-cyan-400 text-lg animate-pulse">Caricamento...</span>
  </div>
);

/* ── Error fallback ─────────────────────────────────────────── */
const ErrorFallback = () => (
  <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-white px-6">
    <h1 className="text-3xl font-bold mb-4">Qualcosa è andato storto</h1>
    <p className="text-gray-400 mb-8 text-center">
      Si è verificato un errore imprevisto. Riprova a caricare la pagina.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-cyan-400 text-dark-950 font-bold rounded-lg hover:bg-cyan-300 transition-colors"
    >
      Ricarica pagina
    </button>
  </div>
);

/* ── Custom ErrorBoundary — Sentry è lazy, non disponibile al mount ─ */
interface EBState { hasError: boolean }
class ErrorBoundary extends Component<{ children: React.ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }
  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}

/* ── App ────────────────────────────────────────────────────── */
const App: React.FC = () => (
  <ErrorBoundary>
    <SmoothScroll />
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CookieBanner />
      <GA4PageTracker />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotel" element={<HotelLanding />} />
          <Route path="/reception-ai" element={<Navigate to="/hotel" replace />} />
          <Route path="/saas" element={<SaasLanding />} />
          <Route path="/agri-ecommerce" element={<AgriEcommerceLanding />} />
          <Route path="/promo-pasqua" element={<Navigate to="/" replace />} />
          <Route path="/simulatore" element={<SimulatorePreventivo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/card" element={<DigitalCard />} />
          {/* /faq non esiste come pagina — è un anchor nella home. Redirect. */}
          <Route path="/faq" element={<Navigate to="/#faq" replace />} />
          {/* Catch-all: qualsiasi URL sconosciuto torna in home (evita pagine bianche) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  </ErrorBoundary>
);

export default App;
