import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
      <SEO
        title="Privacy Policy | Mauro.exe"
        description="Informativa sulla privacy ai sensi del Regolamento UE 2016/679 (GDPR) per il sito mauroceccarelli.it"
        canonical="https://www.mauroceccarelli.it/privacy-policy"
        keywords=""
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          <div className="mb-12">
            <p className="text-cyan-400 font-display font-bold tracking-widest text-sm uppercase mb-2">Legale</p>
            <h1 className="text-4xl font-display font-black text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">Ultimo aggiornamento: Marzo 2026</p>
          </div>

          <div className="prose-custom space-y-10 text-gray-400 leading-relaxed">

            <section>
              <h2 className="text-white font-bold text-xl mb-3">1. Titolare del Trattamento</h2>
              <p>
                Il Titolare del trattamento dei dati personali raccolti tramite il sito <strong className="text-gray-200">mauroceccarelli.it</strong> è:
              </p>
              <div className="mt-3 p-4 bg-dark-800 rounded-xl border border-white/5 text-sm space-y-1">
                <p><strong className="text-gray-300">Mauro Ceccarelli</strong></p>
                <p>Ascoli Piceno (AP), Italia</p>
                <p>P.IVA: 02606790448</p>
                <p>Email: <a href="mailto:mauroexe@mauroceccarelli.it" className="text-cyan-400 hover:underline">mauroexe@mauroceccarelli.it</a></p>
                <p>Telefono: <a href="tel:+393480029661" className="text-cyan-400 hover:underline">+39 348 002 9661</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">2. Dati Raccolti e Finalità</h2>
              <p>Il sito raccoglie i seguenti dati personali:</p>
              <ul className="mt-3 space-y-3 list-none">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-300">Modulo di contatto</strong> — nome, indirizzo email e messaggio inseriti volontariamente dall'utente. Finalità: rispondere alle richieste di contatto e preventivo. Base giuridica: esecuzione di misure precontrattuali (art. 6 §1 lett. b GDPR).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-300">Dati tecnici e di navigazione</strong> — indirizzo IP, tipo di browser, sistema operativo, pagine visitate, raccolti automaticamente per il monitoraggio degli errori tramite il servizio Sentry. Finalità: manutenzione e miglioramento del sito. Base giuridica: legittimo interesse del Titolare (art. 6 §1 lett. f GDPR).
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">3. Responsabili del Trattamento</h2>
              <p>Per l'erogazione dei propri servizi, il Titolare si avvale di fornitori terzi che trattano i dati in qualità di responsabili del trattamento, con adeguate garanzie contrattuali:</p>
              <ul className="mt-3 space-y-2 list-none">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">EmailJS</strong> (EmailJS Ltd, UK/USA) — invio delle email dal modulo di contatto. Privacy policy: <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">emailjs.com</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">Sentry</strong> (Functional Software Inc., USA) — monitoraggio errori applicazione. Privacy policy: <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">sentry.io</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">Vercel</strong> (Vercel Inc., USA) — hosting e distribuzione del sito web. Privacy policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">vercel.com</a></span>
                </li>
              </ul>
              <p className="mt-3 text-sm">Il trasferimento di dati verso paesi extra-UE (USA) avviene nel rispetto delle Clausole Contrattuali Standard approvate dalla Commissione Europea.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">4. Conservazione dei Dati</h2>
              <p>I dati raccolti tramite il modulo di contatto sono conservati per un periodo massimo di <strong className="text-gray-300">24 mesi</strong> dalla ricezione, necessario alla gestione della relazione precontrattuale. I dati tecnici raccolti da Sentry sono conservati per <strong className="text-gray-300">90 giorni</strong>.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">5. Diritti dell'Interessato</h2>
              <p>In qualità di interessato, hai il diritto di:</p>
              <ul className="mt-3 space-y-1.5 list-none">
                {[
                  'Accedere ai tuoi dati personali (art. 15 GDPR)',
                  'Richiedere la rettifica di dati inesatti (art. 16 GDPR)',
                  'Richiedere la cancellazione dei tuoi dati ("diritto all\'oblio", art. 17 GDPR)',
                  'Richiedere la limitazione del trattamento (art. 18 GDPR)',
                  'Opporti al trattamento basato su legittimo interesse (art. 21 GDPR)',
                  'Richiedere la portabilità dei dati (art. 20 GDPR)',
                ].map((right, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Per esercitare i tuoi diritti, contatta il Titolare all'indirizzo <a href="mailto:mauroexe@mauroceccarelli.it" className="text-cyan-400 hover:underline">mauroexe@mauroceccarelli.it</a>. Risponderemo entro 30 giorni.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">6. Diritto di Reclamo</h2>
              <p>Hai il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali italiana (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">garanteprivacy.it</a>) se ritieni che il trattamento dei tuoi dati personali violi il GDPR.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">7. Cookie</h2>
              <p>Per informazioni dettagliate sull'utilizzo dei cookie su questo sito, consulta la nostra <a href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</a>.</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
