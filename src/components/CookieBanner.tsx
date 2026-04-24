import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Stati per le preferenze custom
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già fatto una scelta
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Un piccolo delay per non apparire in modo troppo aggressivo all'istante
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('cookie_analytics', 'true');
    localStorage.setItem('cookie_marketing', 'true');
    // Qui andrebbe logica per attivare Google Analytics/Pixel
    window.dispatchEvent(new Event('cookieConsentUpdated'));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    localStorage.setItem('cookie_analytics', 'false');
    localStorage.setItem('cookie_marketing', 'false');
    // Nessuno script non necessario viene caricato
    window.dispatchEvent(new Event('cookieConsentUpdated'));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', 'custom');
    localStorage.setItem('cookie_analytics', analytics.toString());
    localStorage.setItem('cookie_marketing', marketing.toString());
    window.dispatchEvent(new Event('cookieConsentUpdated'));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 pointer-events-none flex justify-center sm:justify-start sm:p-6">
      <div className="bg-dark-900 border border-white/10 rounded-2xl shadow-2xl p-6 max-w-lg w-full pointer-events-auto backdrop-blur-xl relative">
        {/* Pulsante X (Rifiuta) obbligatorio per Linee Guida Garante Italia */}
        <button 
          onClick={handleRejectAll}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Chiudi e rifiuta tutto"
          title="Chiudi e rifiuta i cookie non tecnici"
        >
          <X size={20} />
        </button>

        {!isCustomizing ? (
          <>
            <div className="mb-4 pr-6">
              <h3 className="text-lg font-bold text-white mb-2 font-display">Informativa sui Cookie</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Questo sito utilizza cookie tecnici strettamente necessari per il funzionamento e, previo tuo consenso, cookie analitici e di profilazione per migliorare l'esperienza e offrirti contenuti personalizzati. 
                Chiudendo questo banner tramite la "X", manterrai le impostazioni di default (solo cookie tecnici).
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Leggi la nostra <Link to="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</Link> e <Link to="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-dark-950 font-bold rounded-lg transition-colors text-sm"
              >
                Accetta Tutti
              </button>
              <button 
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-5 py-2.5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-colors text-sm"
              >
                Rifiuta
              </button>
              <button 
                onClick={() => setIsCustomizing(true)}
                className="w-full sm:w-auto px-5 py-2.5 text-gray-400 hover:text-white font-medium transition-colors text-sm underline-offset-4 hover:underline"
              >
                Personalizza
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2 font-display">Personalizza Preferenze</h3>
              <p className="text-gray-400 text-sm mb-4">
                Seleziona le categorie di cookie che desideri abilitare. I cookie tecnici non possono essere disabilitati in quanto necessari al funzionamento del sito.
              </p>
              
              <div className="space-y-4">
                {/* Cookie Tecnici */}
                <div className="flex items-start justify-between p-3 bg-dark-950 rounded-lg border border-white/5">
                  <div>
                    <h4 className="text-white text-sm font-bold">Strettamente Necessari</h4>
                    <p className="text-gray-500 text-xs mt-1">Garantiscono le funzionalità base del sito.</p>
                  </div>
                  <div className="text-cyan-500 text-xs font-bold uppercase tracking-wider mt-1">Sempre Attivi</div>
                </div>

                {/* Cookie Analitici */}
                <div className="flex items-start justify-between p-3 bg-dark-950 rounded-lg border border-white/5">
                  <div>
                    <h4 className="text-white text-sm font-bold">Cookie Analitici</h4>
                    <p className="text-gray-500 text-xs mt-1">Ci aiutano a capire come i visitatori interagiscono con il sito (in forma anonima).</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>

                {/* Cookie Marketing */}
                <div className="flex items-start justify-between p-3 bg-dark-950 rounded-lg border border-white/5">
                  <div>
                    <h4 className="text-white text-sm font-bold">Profilazione / Marketing</h4>
                    <p className="text-gray-500 text-xs mt-1">Usati per tracciare i visitatori attraverso i siti web per mostrare annunci pertinenti.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-dark-950 font-bold rounded-lg transition-colors text-sm"
              >
                Salva Preferenze
              </button>
              <button 
                onClick={() => setIsCustomizing(false)}
                className="w-full sm:w-auto px-5 py-2.5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-colors text-sm"
              >
                Indietro
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
