import React from 'react';
import PaginaVetrina from '../components/vetrina/PaginaVetrina';
import '../styles/pagina-servizio.css';
import '../styles/pagina-legale.css';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PaginaVetrina>
      <div className="larghezza pagina-legale">
        <p className="pagina-etichetta">Legale</p>
        <h1>Privacy Policy</h1>
        <p className="legale-data">Ultimo aggiornamento: <time dateTime="2026-10-04">4 ottobre 2026</time></p>

        <div className="riquadro-legale riquadro-legale--breve">
          <h2>In breve</h2>
          <ul>
            {[
              'Tratto i dati che mi mandi tu (per richiamarti, per un preventivo o quando scrivi all\'assistente AI) e i dati tecnici che servono a mostrarti il sito, come l\'indirizzo IP.',
              'Statistiche (Google Analytics) e misura degli annunci (Google Ads) partono solo se le accetti. Puoi cambiare idea quando vuoi da «Preferenze cookie».',
              'Non vendo i tuoi dati e non li uso per mostrarti pubblicità personalizzata.',
              'Per qualsiasi domanda sui tuoi dati: mauroexe@mauroceccarelli.it.',
            ].map((puntoInBreve) => (
              <li key={puntoInBreve}>{puntoInBreve}</li>
            ))}
          </ul>
        </div>

        <div className="testo-legale">

          <section>
            <h2>1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali raccolti tramite il sito <strong>mauroceccarelli.it</strong> è:
            </p>
            <div className="riquadro-legale">
              <p><strong>MAURO.EXE di Mauro Ceccarelli</strong></p>
              <p>Ascoli Piceno (AP), Italia</p>
              <p>P.IVA: 02606790448</p>
              <p>Email: <a href="mailto:mauroexe@mauroceccarelli.it">mauroexe@mauroceccarelli.it</a></p>
              <p>Telefono: <a href="tel:+393480029661">+39 348 002 9661</a></p>
            </div>
          </section>

          <section>
            <h2>2. Dati Trattati e Finalità</h2>
            <ul>
              <li>
                <strong>Richieste di contatto e preventivo</strong> — Nel modulo «Preferisci essere richiamato?» inserisci nome, telefono e servizio di interesse: arrivano al Titolare per email tramite EmailJS. Nel simulatore preventivo nome, email, configurazione scelta e prezzo stimato arrivano al Titolare per email tramite EmailJS; se vuoi, puoi mandare lo stesso riepilogo anche su WhatsApp. Se chiami, scrivi su WhatsApp o mandi un'email, il Titolare riceve il tuo numero o indirizzo, il nome del profilo WhatsApp e il testo del messaggio. I messaggi WhatsApp passano da WhatsApp Ireland Limited, titolare autonomo. Finalità: rispondere alle richieste di contatto e preventivo. Base giuridica: misure precontrattuali adottate su tua richiesta (art. 6 §1 lett. b GDPR).
              </li>
              <li>
                <strong>Assistente AI</strong> — Se scrivi all'assistente AI della home, i messaggi passano dal server del sito a Google (Gemini API), che scrive la risposta. Il sito non salva le conversazioni: restano nella pagina finché non la chiudi o la ricarichi. Per evitare abusi, il server tiene in memoria l'indirizzo IP solo per contare i messaggi, al massimo per un giorno. Ti risponde un sistema di intelligenza artificiale, non una persona (art. 50 Reg. UE 2024/1689): le risposte possono contenere errori e non sono un preventivo. Non scrivere dati personali o sensibili. Finalità: rispondere alle tue domande sui servizi. Base giuridica: misure precontrattuali adottate su tua richiesta (art. 6 §1 lett. b GDPR); per il controllo degli abusi, legittimo interesse del Titolare (art. 6 §1 lett. f GDPR).
              </li>
              <li>
                <strong>Incarichi e fatture</strong> — Se la richiesta diventa un incarico, il Titolare usa i tuoi dati per il contratto e per la fattura. Base giuridica: esecuzione del contratto (art. 6 §1 lett. b GDPR) e obblighi fiscali e contabili (art. 6 §1 lett. c GDPR).
              </li>
              <li>
                <strong>Dati di navigazione</strong> — Per mostrarti le pagine, l'hosting Vercel riceve l'indirizzo IP, la pagina richiesta, il browser e l'ora della visita, e li registra nei log tecnici. Finalità: far funzionare il sito e proteggerlo da abusi. Base giuridica: legittimo interesse del Titolare (art. 6 §1 lett. f GDPR). Questi dati non servono a profilarti.
              </li>
              <li>
                <strong>Statistiche e annunci</strong> — Solo se li accetti nel banner dei cookie. Google Analytics conta le visite e le azioni sul sito (pagine aperte, clic su «Chiama» e «WhatsApp», invio delle richieste) con un identificativo casuale, e il Titolare usa questi dati solo in forma statistica; se accetti anche il marketing, Google Analytics invia a Google anche i dati di Google signals, marcati come non personalizzati. Google Ads riceve la pagina da cui entri nel sito e le richieste di contatto (invio del modulo, clic su «Chiama» e «WhatsApp»), per capire quali arrivano dagli annunci, senza remarketing e senza annunci personalizzati; per collegare la richiesta all'annuncio, Google può ricevere l'email o il telefono inseriti nei moduli, trasformati in un codice (hash). Prima del consenso il sito non scarica nemmeno la libreria di Google. I dettagli sono nella <a href="/cookie-policy">Cookie Policy</a>. Base giuridica: consenso (art. 6 §1 lett. a GDPR; art. 122 Codice Privacy). Puoi revocarlo quando vuoi dal link «Preferenze cookie» in fondo a ogni pagina: da quel momento il sito smette di inviare dati a Google. La revoca non rende illecito il trattamento fatto prima.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Destinatari dei Dati</h2>
            <p>Il Titolare comunica i dati solo ai soggetti qui sotto e, se la richiesta diventa un incarico, all'Agenzia delle Entrate, che riceve la fattura elettronica tramite il Sistema di Interscambio, e all'eventuale commercialista che tiene la contabilità. Non li vende e non li diffonde.</p>
            <p>Responsabili del trattamento (art. 28 GDPR):</p>
            <ul>
              <li>
                <strong>EmailJS</strong> (EmailJS Pte. Ltd., Singapore; server negli USA presso Amazon Web Services) — inoltra al Titolare le richieste del modulo «Preferisci essere richiamato?» e del simulatore preventivo. Privacy policy: <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">emailjs.com</a>
              </li>
              <li>
                <strong>Google LLC (USA), servizio Gemini API</strong> — scrive le risposte dell'assistente AI. Il Titolare usa il servizio dall'Italia: per questo Google non usa i messaggi per migliorare i suoi prodotti e li conserva 55 giorni solo per individuare abusi. Condizioni del servizio: <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">ai.google.dev</a>
              </li>
              <li>
                <strong>Google Ireland Limited</strong> — Google Analytics, solo se accetti i cookie statistici, e conversioni avanzate di Google Ads (email o telefono dei moduli trasformati in hash), solo se accetti i cookie di marketing. Privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com</a>
              </li>
              <li>
                <strong>Aruba S.p.A.</strong> (Italia) — casella email del Titolare.
              </li>
            </ul>
            <p>Altri soggetti, che trattano i dati secondo la propria informativa:</p>
            <ul>
              <li>
                <strong>Vercel Inc.</strong> (USA) — ospita il sito e ne registra i log tecnici. Privacy policy: <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">vercel.com</a>
              </li>
              <li>
                <strong>Google Ireland Limited</strong> — titolare autonomo per i cookie e la misura delle conversioni di Google Ads, solo se accetti i cookie di marketing. Informativa: <a href="https://business.safety.google/adscookies/" target="_blank" rel="noopener noreferrer">business.safety.google</a>
              </li>
              <li>
                <strong>WhatsApp Ireland Limited</strong> (gruppo Meta) — titolare autonomo per i messaggi che scegli di inviare su WhatsApp. Privacy policy: <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer">whatsapp.com</a>
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Trasferimenti fuori dall'Unione Europea</h2>
            <p>Alcuni fornitori trattano dati fuori dall'Unione europea. Google LLC e Vercel Inc. aderiscono al Data Privacy Framework UE-USA: il trasferimento si basa sulla decisione di adeguatezza della Commissione europea del 10 luglio 2023 (art. 45 GDPR). EmailJS Pte. Ltd. (Singapore, server negli USA) applica le Clausole Contrattuali Standard approvate dalla Commissione (art. 46 GDPR). Google e WhatsApp, quando agiscono come titolari autonomi, trasferiscono i dati secondo le proprie informative.</p>
          </section>

          <section>
            <h2>5. Conservazione dei Dati</h2>
            <ul>
              {[
                'Richieste di contatto e preventivo (modulo, WhatsApp, email, telefono): fino a 12 mesi dall\'ultimo contatto, poi il Titolare le cancella. Se la richiesta porta a un lavoro, i documenti contabili e fiscali si conservano 10 anni (art. 2220 c.c.).',
                'EmailJS conserva una copia delle richieste inviate al massimo per 30 giorni.',
                'Assistente AI: il sito non salva le conversazioni; Google le conserva 55 giorni solo per individuare abusi.',
                'Log tecnici dell\'hosting: quelli che il Titolare vede nel pannello di Vercel restano disponibili 1 ora; i dati di traffico che Vercel tratta per conto proprio, per far funzionare e proteggere la sua rete, restano per il tempo indicato nella sua informativa.',
                'Google Analytics: i dati legati all\'identificativo si cancellano alla scadenza impostata nella proprietà, al massimo dopo 14 mesi.',
                'La durata dei cookie è indicata nella Cookie Policy.',
              ].map((tempoDiConservazione) => (
                <li key={tempoDiConservazione}>{tempoDiConservazione}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>6. Diritti dell'Interessato</h2>
            <p>In qualità di interessato, hai il diritto di:</p>
            <ul>
              {[
                'Accedere ai tuoi dati personali (art. 15 GDPR)',
                'Richiedere la rettifica di dati inesatti (art. 16 GDPR)',
                'Richiedere la cancellazione dei tuoi dati ("diritto all\'oblio", art. 17 GDPR)',
                'Richiedere la limitazione del trattamento (art. 18 GDPR)',
                'Richiedere la portabilità dei dati (art. 20 GDPR)',
                'Opporti al trattamento basato su legittimo interesse (art. 21 GDPR)',
                'Revocare in ogni momento il consenso ai cookie statistici e di marketing, senza effetto sul trattamento fatto prima (art. 7 §3 GDPR)',
              ].map((diritto) => (
                <li key={diritto}>{diritto}</li>
              ))}
            </ul>
            <p>Per esercitare i tuoi diritti, scrivi al Titolare all'indirizzo <a href="mailto:mauroexe@mauroceccarelli.it">mauroexe@mauroceccarelli.it</a>. Il Titolare risponde senza ritardo e al più tardi entro un mese. Nei casi complessi il termine può allungarsi di due mesi: in quel caso te lo comunica (art. 12 GDPR).</p>
          </section>

          <section>
            <h2>7. Diritto di Reclamo</h2>
            <p>Se ritieni che il trattamento violi il GDPR, puoi proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>) o all'autorità di controllo del Paese UE in cui vivi o lavori (art. 77 GDPR; art. 141 Codice Privacy).</p>
          </section>

          <section>
            <h2>8. Conferimento dei Dati</h2>
            <p>Fornire i dati è facoltativo. Senza nome e telefono, però, il Titolare non può richiamarti; senza nome ed email il simulatore non può inviare la richiesta. Se rifiuti i cookie statistici e di marketing, il sito funziona allo stesso modo.</p>
          </section>

          <section>
            <h2>9. Decisioni Automatizzate</h2>
            <p>Il Titolare non prende decisioni basate solo su un trattamento automatizzato che producano effetti giuridici o incidano in modo analogo su di te (art. 22 GDPR). Il prezzo del simulatore è una stima calcolata nel tuo browser; le risposte dell'assistente AI sono indicative e non impegnano il Titolare.</p>
          </section>

          <section>
            <h2>10. Cookie</h2>
            <p>Per informazioni dettagliate sui cookie e sugli altri strumenti usati da questo sito, consulta la <a href="/cookie-policy">Cookie Policy</a>.</p>
          </section>

        </div>
      </div>
    </PaginaVetrina>
  );
};

export default PrivacyPolicyPage;
