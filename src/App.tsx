import React, { lazy, Suspense, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CookieBanner from './components/CookieBanner';
import MetadatiPagina from './components/MetadatiPagina';
import { EVENTO_CONSENSO, attivaTagConsentiti, leggiValoreCookie, segnaEvento } from './misurazione';

const GA4PageTracker: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    let statisticiAccettati = leggiValoreCookie('cookie_analytics') === 'true';
    const segnaPagina = () => {
      attivaTagConsentiti();
      if (leggiValoreCookie('cookie_analytics') !== 'true') return;
      segnaEvento('page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
      });
    };
    // attivaTagConsentiti carica gtag.js solo a pagina caricata: prima di allora config e visita non partirebbero
    const segnaDopoIlCaricamento = () => {
      if (document.readyState === 'complete') segnaPagina();
      else window.addEventListener('load', segnaPagina, { once: true });
    };
    // Chi riapre le preferenze è già stato contato: la visita si segna solo quando Statistici passa da no a sì
    const segnaSeAppenaAccettati = () => {
      const statisticiOra = leggiValoreCookie('cookie_analytics') === 'true';
      if (statisticiOra && !statisticiAccettati) segnaDopoIlCaricamento();
      statisticiAccettati = statisticiOra;
    };
    segnaDopoIlCaricamento();
    window.addEventListener(EVENTO_CONSENSO, segnaSeAppenaAccettati);
    return () => {
      window.removeEventListener('load', segnaPagina);
      window.removeEventListener(EVENTO_CONSENSO, segnaSeAppenaAccettati);
    };
  }, [location]);
  return null;
};

const ScrollInCima: React.FC = () => {
  const { pathname, hash } = useLocation();
  const tipoNavigazione = useNavigationType();
  useEffect(() => {
    // Con un Link si arriva in cima alla pagina nuova; indietro/avanti e le ancore restano al browser e alla home
    if (tipoNavigazione !== 'POP' && !hash) window.scrollTo(0, 0);
  }, [pathname, hash, tipoNavigazione]);
  return null;
};

const HomePage = lazy(() => import('./pages/HomePage'));
const HotelLanding = lazy(() => import('./pages/HotelLanding'));
const SaasLanding = lazy(() => import('./pages/SaasLanding'));
const AgriEcommerceLanding = lazy(() => import('./pages/AgriEcommerceLanding'));
const SimulatorePreventivo = lazy(() => import('./pages/SimulatorePreventivo'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const DigitalCard = lazy(() => import('./pages/DigitalCard'));

const Loading = () => {
  const { pathname } = useLocation();
  // La classe accende già il fondo della home di index.css, chiaro o scuro secondo data-tema, mentre arriva il resto
  if (pathname === '/') return <div className="home-vetrina" />;
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <span className="text-cyan-400 text-lg animate-pulse">Caricamento...</span>
    </div>
  );
};

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

const App: React.FC = () => (
  <ErrorBoundary>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollInCima />
      <SmoothScroll />
      <MetadatiPagina />
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
          <Route path="/faq" element={<Navigate to="/#faq" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <CookieBanner />
    </Router>
  </ErrorBoundary>
);

export default App;
