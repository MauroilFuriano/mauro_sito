import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
      <SEO
        title="Cookie Policy | Mauro.exe"
        description="Informativa sull'utilizzo dei cookie sul sito mauroceccarelli.it ai sensi del Provvedimento Garante Privacy 2021."
        canonical="https://www.mauroceccarelli.it/cookie-policy"
        keywords=""
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          <div className="mb-12">
            <p className="text-cyan-400 font-display font-bold tracking-widest text-sm uppercase mb-2">Legale</p>
            <h1 className="text-4xl font-display font-black text-white mb-2">Cookie Policy</h1>
            <p className="text-gray-500 text-sm">Ultimo aggiornamento: Marzo 2026 · Ai sensi del Provvedimento Garante Privacy 8 gennaio 2022</p>
          </div>

          <div className="space-y-10 text-gray-400 leading-relaxed">

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Cosa sono i cookie</h2>
              <p>I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al terminale (computer, tablet, smartphone), dove vengono memorizzati per essere ritrasmessi agli stessi siti alla successiva visita.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Cookie e Tracciamenti utilizzati</h2>
              <p className="mb-4">Il sito <strong className="text-gray-200">mauroceccarelli.it</strong> utilizza di default esclusivamente <strong className="text-gray-200">cookie tecnici</strong> (e tecnologie affini come il localStorage), necessari al corretto funzionamento del sito e per i quali non è richiesto un preventivo consenso. Solo previa esplicita accettazione tramite l'apposito banner, il sito potrà installare cookie analitici e di profilazione.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 text-gray-300 font-bold">Nome / Cookie</th>
                      <th className="text-left py-3 pr-4 text-gray-300 font-bold">Tipo</th>
                      <th className="text-left py-3 pr-4 text-gray-300 font-bold">Finalità</th>
                      <th className="text-left py-3 text-gray-300 font-bold">Durata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">cookie_consent / analytics / marketing</td>
                      <td className="py-3 pr-4">Tecnico (Local Storage)</td>
                      <td className="py-3 pr-4">Memorizzare le preferenze di consenso dell'utente</td>
                      <td className="py-3">12 Mesi</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">__sentry_sdk</td>
                      <td className="py-3 pr-4">Tecnico</td>
                      <td className="py-3 pr-4">Monitoraggio errori (Sentry)</td>
                      <td className="py-3">Sessione</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">_vercel_*</td>
                      <td className="py-3 pr-4">Tecnico</td>
                      <td className="py-3 pr-4">Funzionamento infrastruttura hosting (Vercel)</td>
                      <td className="py-3">Sessione</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">Analytics / Pixel Terze Parti</td>
                      <td className="py-3 pr-4">Analitico / Profilazione</td>
                      <td className="py-3 pr-4">Raccolta statistiche o tracciamento conversioni (solo se accettati)</td>
                      <td className="py-3">Variabile</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-dark-800 border border-white/5 rounded-xl text-sm">
                <p className="text-cyan-400 font-bold mb-1">Gestione delle Preferenze</p>
                <p>Puoi modificare o revocare il tuo consenso in qualsiasi momento aprendo il pannello di gestione dei cookie cliccando l'icona in basso a sinistra (oppure eliminando i dati di navigazione dal browser).</p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Come disabilitare i cookie</h2>
              <p>È possibile bloccare o eliminare i cookie tramite le impostazioni del browser. Di seguito i link alle guide dei principali browser:</p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                  { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox' },
                  { name: 'Safari', url: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
                  { name: 'Microsoft Edge', url: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
                ].map((b) => (
                  <li key={b.name} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{b.name}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm">La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento di alcune funzionalità del sito.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Contatti</h2>
              <p>Per qualsiasi domanda relativa all'utilizzo dei cookie su questo sito, contatta il Titolare del trattamento: <a href="mailto:ceccarellimauro3@gmail.com" className="text-cyan-400 hover:underline">ceccarellimauro3@gmail.com</a></p>
              <p className="mt-2">Per informazioni complete sul trattamento dei dati personali, consulta la <a href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</a>.</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
