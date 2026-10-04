import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { apriPreferenzeCookie } from '../misurazione';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
      <SEO
        title="Cookie Policy | Mauro.exe"
        description="Cookie e strumenti di tracciamento di mauroceccarelli.it, secondo l'art. 122 del Codice Privacy e le Linee guida cookie del Garante del 10 giugno 2021."
        canonical="https://www.mauroceccarelli.it/cookie-policy"
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          <div className="mb-12">
            <p className="text-cyan-400 font-display font-bold tracking-widest text-sm uppercase mb-2">Legale</p>
            <h1 className="text-4xl font-display font-black text-white mb-2">Cookie Policy</h1>
            <p className="text-gray-500 text-sm">Ultimo aggiornamento: <time dateTime="2026-10-04">4 ottobre 2026</time> · Ai sensi dell'art. 122 del Codice Privacy (D.Lgs. 196/2003) e delle Linee guida cookie del Garante (provvedimento n. 231 del 10 giugno 2021)</p>
          </div>

          <div className="space-y-10 text-gray-400 leading-relaxed">

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Cosa sono i cookie</h2>
              <p>I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al terminale (computer, tablet, smartphone), dove vengono memorizzati per essere ritrasmessi agli stessi siti alla successiva visita. Strumenti simili, come il localStorage del browser, conservano informazioni sul dispositivo allo stesso modo.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Cookie e strumenti usati</h2>
              <p className="mb-4">Senza il tuo consenso il sito <strong className="text-gray-200">mauroceccarelli.it</strong> non usa cookie: salva nel localStorage del browser solo la scelta che fai nel banner e, se lo cambi, il tema chiaro o scuro della home. Prima della scelta non carica strumenti di Google. Solo se accetti, attiva i cookie statistici (Google Analytics) e di marketing (Google Ads); questi ultimi comprendono anche cookie che Google salva sui propri domini.</p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[40rem] text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 text-gray-300 font-bold">Nome</th>
                      <th className="text-left py-3 pr-4 text-gray-300 font-bold">Tipo</th>
                      <th className="text-left py-3 pr-4 text-gray-300 font-bold">Finalità</th>
                      <th className="text-left py-3 text-gray-300 font-bold">Durata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">cookie_consent, cookie_versione, cookie_analytics, cookie_marketing</td>
                      <td className="py-3 pr-4">Tecnico (localStorage)</td>
                      <td className="py-3 pr-4">Ricordare la scelta fatta nel banner e la versione della cookie policy su cui l'hai fatta</td>
                      <td className="py-3">Finché non cambi la scelta o cancelli i dati del sito dal browser</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">tema</td>
                      <td className="py-3 pr-4">Tecnico (localStorage)</td>
                      <td className="py-3 pr-4">Ricordare il tema chiaro o scuro scelto nella home</td>
                      <td className="py-3">Finché non cambi tema o cancelli i dati del sito dal browser</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">_ga, _ga_29CR0733KS</td>
                      <td className="py-3 pr-4">Statistico (solo se accettato)</td>
                      <td className="py-3 pr-4">Google Analytics 4: conta le visite e le azioni sul sito con un identificativo casuale; il Titolare usa questi dati solo in forma statistica. Se accetti anche i cookie di marketing, Google Analytics invia a Google anche i dati di Google signals, sempre marcati come non personalizzati. Fornitore: Google Ireland Limited, responsabile del trattamento; i dati possono passare a Google LLC (USA, Data Privacy Framework). <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Informativa</a></td>
                      <td className="py-3">Fino a 2 anni</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-gray-300 font-mono text-xs">_gcl_au, _gcl_aw e gli altri cookie _gcl_, _gac_gb_ (cookie); _gcl_ls (localStorage); cookie di Google su google.com e doubleclick.net</td>
                      <td className="py-3 pr-4">Marketing (solo se accettato)</td>
                      <td className="py-3 pr-4">Google Ads: capire quali visite e richieste di contatto (invio del modulo, clic su «Chiama» e «WhatsApp») arrivano dagli annunci; riceve la pagina da cui entri nel sito e le richieste, senza remarketing e senza annunci personalizzati. Quando invii un modulo, Google può ricevere l'email o il telefono che hai scritto, trasformati in un codice (hash), per collegare la richiesta all'annuncio. Fornitore: Google Ireland Limited, titolare autonomo. <a href="https://business.safety.google/adscookies/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Informativa</a></td>
                      <td className="py-3">_gcl_ e _gac_gb_ 90 giorni, cookie di Google fino a 13 mesi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm">La richiesta inviata dal simulatore preventivo viene contata come conversione degli annunci solo se accetti sia i cookie statistici sia quelli di marketing. L'assistente AI della home non usa cookie e non salva le conversazioni nel browser.</p>

              <div className="mt-4 p-4 bg-dark-800 border border-white/5 rounded-xl text-sm">
                <p className="text-cyan-400 font-bold mb-1">Gestione delle Preferenze</p>
                <p>Puoi cambiare o revocare il consenso quando vuoi dal link «Preferenze cookie» in fondo a ogni pagina o dal pulsante qui sotto. La revoca ha effetto subito: il sito smette di inviare dati a Google, cancella i cookie _ga, _gcl_ e _gac_ dal proprio dominio e i dati _gcl_ls dal browser. I cookie che Google ha già salvato sui suoi domini (google.com, doubleclick.net) si cancellano dalle impostazioni del browser, con le guide qui sotto.</p>
                <button
                  type="button"
                  onClick={apriPreferenzeCookie}
                  className="mt-3 inline-flex items-center min-h-[44px] px-4 rounded-lg border border-cyan-400/40 text-cyan-400 font-bold hover:bg-cyan-400/10 transition-colors"
                >
                  Apri le preferenze cookie
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Come cancellare o bloccare i cookie</h2>
              <p>Puoi cancellare o bloccare i cookie dalle impostazioni del browser. Ecco le guide dei principali browser:</p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  { nome: 'Google Chrome', indirizzo: 'https://support.google.com/chrome/answer/95647?hl=it' },
                  { nome: 'Mozilla Firefox', indirizzo: 'https://support.mozilla.org/it/kb/clear-cookies-and-site-data-firefox' },
                  { nome: 'Safari', indirizzo: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
                  { nome: 'Microsoft Edge', indirizzo: 'https://support.microsoft.com/it-it/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use' },
                ].map((guidaBrowser) => (
                  <li key={guidaBrowser.nome} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <a href={guidaBrowser.indirizzo} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{guidaBrowser.nome}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm">Se blocchi cookie e dati dei siti, il sito funziona lo stesso, ma non ricorda la tua scelta e ti mostra di nuovo il banner.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">Contatti</h2>
              <p>Per qualsiasi domanda relativa all'utilizzo dei cookie su questo sito, contatta il Titolare del trattamento: <a href="mailto:mauroexe@mauroceccarelli.it" className="text-cyan-400 hover:underline">mauroexe@mauroceccarelli.it</a></p>
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
