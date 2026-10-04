import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-dark-900 text-gray-200 selection:bg-cyan-400 selection:text-black">
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          <div className="mb-12">
            <p className="text-cyan-400 font-display font-bold tracking-widest text-sm uppercase mb-2">Legale</p>
            <h1 className="text-4xl font-display font-black text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">Ultimo aggiornamento: <time dateTime="2026-10-04">4 ottobre 2026</time></p>
          </div>

          <div className="mb-10 p-5 bg-dark-800 rounded-xl border border-white/5 text-gray-300 leading-relaxed">
            <h2 className="text-white font-bold text-lg mb-3">In breve</h2>
            <ul className="space-y-2 list-none">
              {[
                'Tratto i dati che mi mandi tu (per richiamarti, per un preventivo o quando scrivi all\'assistente AI) e i dati tecnici che servono a mostrarti il sito, come l\'indirizzo IP.',
                'Statistiche (Google Analytics) e misura degli annunci (Google Ads) partono solo se le accetti. Puoi cambiare idea quando vuoi da «Preferenze cookie».',
                'Non vendo i tuoi dati e non li uso per mostrarti pubblicità personalizzata.',
                'Per qualsiasi domanda sui tuoi dati: mauroexe@mauroceccarelli.it.',
              ].map((puntoInBreve) => (
                <li key={puntoInBreve} className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span>{puntoInBreve}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="prose-custom space-y-10 text-gray-400 leading-relaxed">

            <section>
              <h2 className="text-white font-bold text-xl mb-3">1. Titolare del Trattamento</h2>
              <p>
                Il Titolare del trattamento dei dati personali raccolti tramite il sito <strong className="text-gray-200">mauroceccarelli.it</strong> è:
              </p>
              <div className="mt-3 p-4 bg-dark-800 rounded-xl border border-white/5 text-sm space-y-1">
                <p><strong className="text-gray-300">MAURO.EXE di Mauro Ceccarelli</strong></p>
                <p>Ascoli Piceno (AP), Italia</p>
                <p>P.IVA: 02606790448</p>
                <p>Email: <a href="mailto:mauroexe@mauroceccarelli.it" className="text-cyan-400 hover:underline">mauroexe@mauroceccarelli.it</a></p>
                <p>Telefono: <a href="tel:+393480029661" className="text-cyan-400 hover:underline">+39 348 002 9661</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">2. Dati Trattati e Finalità</h2>
              <ul className="mt-3 space-y-3 list-none">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-300">Richieste di contatto e preventivo</strong> — Nel modulo «Preferisci essere richiamato?» inserisci nome, telefono e servizio di interesse: arrivano al Titolare per email tramite EmailJS. Nel simulatore preventivo nome, email, configurazione scelta e prezzo stimato compongono un messaggio WhatsApp, che parte solo se lo invii tu. Se chiami, scrivi su WhatsApp o mandi un'email, il Titolare riceve il tuo numero o indirizzo, il nome del profilo WhatsApp e il testo del messaggio. I messaggi WhatsApp passano da WhatsApp Ireland Limited, titolare autonomo. Finalità: rispondere alle richieste di contatto e preventivo. Base giuridica: misure precontrattuali adottate su tua richiesta (art. 6 §1 lett. b GDPR).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-300">Assistente AI</strong> — Se scrivi all'assistente AI della home, i messaggi passano dal server del sito a Google (Gemini API), che scrive la risposta. Il sito non salva le conversazioni: restano nella pagina finché non la chiudi o la ricarichi. Per evitare abusi, il server tiene in memoria l'indirizzo IP solo per contare i messaggi, al massimo per un giorno. Ti risponde un sistema di intelligenza artificiale, non una persona (art. 50 Reg. UE 2024/1689): le risposte possono contenere errori e non sono un preventivo. Non scrivere dati personali o sensibili. Finalità: rispondere alle tue domande sui servizi. Base giuridica: misure precontrattuali adottate su tua richiesta (art. 6 §1 lett. b GDPR); per il controllo degli abusi, legittimo interesse del Titolare (art. 6 §1 lett. f GDPR).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-300">Incarichi e fatture</strong> — Se la richiesta diventa un incarico, il Titolare usa i tuoi dati per il contratto e per la fattura. Base giuridica: esecuzione del contratto (art. 6 §1 lett. b GDPR) e obblighi fiscali e contabili (art. 6 §1 lett. c GDPR).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-300">Dati di navigazione</strong> — Per mostrarti le pagine, l'hosting Vercel riceve l'indirizzo IP, la pagina richiesta, il browser e l'ora della visita, e li registra nei log tecnici. Finalità: far funzionare il sito e proteggerlo da abusi. Base giuridica: legittimo interesse del Titolare (art. 6 §1 lett. f GDPR). Questi dati non servono a profilarti.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-300">Statistiche e annunci</strong> — Solo se li accetti nel banner dei cookie. Google Analytics conta le visite e le azioni sul sito (pagine aperte, clic su «Chiama» e «WhatsApp», invio delle richieste) con un identificativo casuale, e il Titolare usa questi dati solo in forma statistica; se accetti anche il marketing, Google Analytics invia a Google anche i dati di Google signals, marcati come non personalizzati. Google Ads riceve la pagina da cui entri nel sito e le richieste di contatto (invio del modulo, clic su «Chiama» e «WhatsApp»), per capire quali arrivano dagli annunci, senza remarketing e senza annunci personalizzati; per collegare la richiesta all'annuncio, Google può ricevere l'email o il telefono inseriti nei moduli, trasformati in un codice (hash). Prima del consenso il sito non scarica nemmeno la libreria di Google. I dettagli sono nella <a href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</a>. Base giuridica: consenso (art. 6 §1 lett. a GDPR; art. 122 Codice Privacy). Puoi revocarlo quando vuoi dal link «Preferenze cookie» in fondo a ogni pagina: da quel momento il sito smette di inviare dati a Google. La revoca non rende illecito il trattamento fatto prima.
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">3. Destinatari dei Dati</h2>
              <p>Il Titolare comunica i dati solo ai soggetti qui sotto e, se la richiesta diventa un incarico, all'Agenzia delle Entrate, che riceve la fattura elettronica tramite il Sistema di Interscambio, e all'eventuale commercialista che tiene la contabilità. Non li vende e non li diffonde.</p>
              <p className="mt-3">Responsabili del trattamento (art. 28 GDPR):</p>
              <ul className="mt-2 space-y-2 list-none">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">EmailJS</strong> (EmailJS Pte. Ltd., Singapore; server negli USA presso Amazon Web Services) — inoltra al Titolare le richieste del modulo «Preferisci essere richiamato?». Privacy policy: <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">emailjs.com</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">Google LLC (USA), servizio Gemini API</strong> — scrive le risposte dell'assistente AI. Il Titolare usa il servizio dall'Italia: per questo Google non usa i messaggi per migliorare i suoi prodotti e li conserva 55 giorni solo per individuare abusi. Condizioni del servizio: <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">ai.google.dev</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">Google Ireland Limited</strong> — Google Analytics, solo se accetti i cookie statistici, e conversioni avanzate di Google Ads (email o telefono dei moduli trasformati in hash), solo se accetti i cookie di marketing. Privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">policies.google.com</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">Aruba S.p.A.</strong> (Italia) — casella email del Titolare.</span>
                </li>
              </ul>
              <p className="mt-4">Altri soggetti, che trattano i dati secondo la propria informativa:</p>
              <ul className="mt-2 space-y-2 list-none">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">Vercel Inc.</strong> (USA) — ospita il sito e ne registra i log tecnici. Privacy policy: <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">vercel.com</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">Google Ireland Limited</strong> — titolare autonomo per i cookie e la misura delle conversioni di Google Ads, solo se accetti i cookie di marketing. Informativa: <a href="https://business.safety.google/adscookies/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">business.safety.google</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span><strong className="text-gray-300">WhatsApp Ireland Limited</strong> (gruppo Meta) — titolare autonomo per i messaggi che scegli di inviare su WhatsApp. Privacy policy: <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">whatsapp.com</a></span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">4. Trasferimenti fuori dall'Unione Europea</h2>
              <p>Alcuni fornitori trattano dati fuori dall'Unione europea. Google LLC e Vercel Inc. aderiscono al Data Privacy Framework UE-USA: il trasferimento si basa sulla decisione di adeguatezza della Commissione europea del 10 luglio 2023 (art. 45 GDPR). EmailJS Pte. Ltd. (Singapore, server negli USA) applica le Clausole Contrattuali Standard approvate dalla Commissione (art. 46 GDPR). Google e WhatsApp, quando agiscono come titolari autonomi, trasferiscono i dati secondo le proprie informative.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">5. Conservazione dei Dati</h2>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'Richieste di contatto e preventivo (modulo, WhatsApp, email, telefono): fino a 12 mesi dall\'ultimo contatto, poi il Titolare le cancella. Se la richiesta porta a un lavoro, i documenti contabili e fiscali si conservano 10 anni (art. 2220 c.c.).',
                  'EmailJS conserva una copia delle richieste inviate al massimo per 30 giorni.',
                  'Assistente AI: il sito non salva le conversazioni; Google le conserva 55 giorni solo per individuare abusi.',
                  'Log tecnici dell\'hosting: quelli che il Titolare vede nel pannello di Vercel restano disponibili 1 ora; i dati di traffico che Vercel tratta per conto proprio, per far funzionare e proteggere la sua rete, restano per il tempo indicato nella sua informativa.',
                  'Google Analytics: i dati legati all\'identificativo si cancellano alla scadenza impostata nella proprietà, al massimo dopo 14 mesi.',
                  'La durata dei cookie è indicata nella Cookie Policy.',
                ].map((tempoDiConservazione) => (
                  <li key={tempoDiConservazione} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{tempoDiConservazione}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">6. Diritti dell'Interessato</h2>
              <p>In qualità di interessato, hai il diritto di:</p>
              <ul className="mt-3 space-y-1.5 list-none">
                {[
                  'Accedere ai tuoi dati personali (art. 15 GDPR)',
                  'Richiedere la rettifica di dati inesatti (art. 16 GDPR)',
                  'Richiedere la cancellazione dei tuoi dati ("diritto all\'oblio", art. 17 GDPR)',
                  'Richiedere la limitazione del trattamento (art. 18 GDPR)',
                  'Richiedere la portabilità dei dati (art. 20 GDPR)',
                  'Opporti al trattamento basato su legittimo interesse (art. 21 GDPR)',
                  'Revocare in ogni momento il consenso ai cookie statistici e di marketing, senza effetto sul trattamento fatto prima (art. 7 §3 GDPR)',
                ].map((diritto) => (
                  <li key={diritto} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{diritto}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Per esercitare i tuoi diritti, scrivi al Titolare all'indirizzo <a href="mailto:mauroexe@mauroceccarelli.it" className="text-cyan-400 hover:underline">mauroexe@mauroceccarelli.it</a>. Il Titolare risponde senza ritardo e al più tardi entro un mese. Nei casi complessi il termine può allungarsi di due mesi: in quel caso te lo comunica (art. 12 GDPR).</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">7. Diritto di Reclamo</h2>
              <p>Se ritieni che il trattamento violi il GDPR, puoi proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">garanteprivacy.it</a>) o all'autorità di controllo del Paese UE in cui vivi o lavori (art. 77 GDPR; art. 141 Codice Privacy).</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">8. Conferimento dei Dati</h2>
              <p>Fornire i dati è facoltativo. Senza nome e telefono, però, il Titolare non può richiamarti; senza nome ed email il simulatore non prepara il messaggio. Se rifiuti i cookie statistici e di marketing, il sito funziona allo stesso modo.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">9. Decisioni Automatizzate</h2>
              <p>Il Titolare non prende decisioni basate solo su un trattamento automatizzato che producano effetti giuridici o incidano in modo analogo su di te (art. 22 GDPR). Il prezzo del simulatore è una stima calcolata nel tuo browser; le risposte dell'assistente AI sono indicative e non impegnano il Titolare.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-3">10. Cookie</h2>
              <p>Per informazioni dettagliate sui cookie e sugli altri strumenti usati da questo sito, consulta la <a href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</a>.</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
