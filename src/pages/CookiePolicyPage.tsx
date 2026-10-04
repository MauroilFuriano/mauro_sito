import React from 'react';
import PaginaVetrina from '../components/vetrina/PaginaVetrina';
import '../styles/pagina-servizio.css';
import '../styles/pagina-legale.css';
import { apriPreferenzeCookie } from '../misurazione';

const CookiePolicyPage: React.FC = () => {
  return (
    <PaginaVetrina>
      <div className="larghezza pagina-legale">
        <p className="pagina-etichetta">Legale</p>
        <h1>Cookie Policy</h1>
        <p className="legale-data">Ultimo aggiornamento: <time dateTime="2026-10-04">4 ottobre 2026</time> · Ai sensi dell'art. 122 del Codice Privacy (D.Lgs. 196/2003) e delle Linee guida cookie del Garante (provvedimento n. 231 del 10 giugno 2021)</p>

        <div className="testo-legale">

          <section>
            <h2>Cosa sono i cookie</h2>
            <p>I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al terminale (computer, tablet, smartphone), dove vengono memorizzati per essere ritrasmessi agli stessi siti alla successiva visita. Strumenti simili, come il localStorage del browser, conservano informazioni sul dispositivo allo stesso modo.</p>
          </section>

          <section>
            <h2>Cookie e strumenti usati</h2>
            <p>Senza il tuo consenso il sito <strong>mauroceccarelli.it</strong> non usa cookie: salva nel localStorage del browser solo la scelta che fai nel banner e, se lo cambi, il tema chiaro o scuro della home. Prima della scelta non carica strumenti di Google. Solo se accetti, attiva i cookie statistici (Google Analytics) e di marketing (Google Ads); questi ultimi comprendono anche cookie che Google salva sui propri domini.</p>

            <div className="tabella-legale">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Finalità</th>
                    <th>Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="nome-cookie">cookie_consent, cookie_versione, cookie_analytics, cookie_marketing</td>
                    <td>Tecnico (localStorage)</td>
                    <td>Ricordare la scelta fatta nel banner e la versione della cookie policy su cui l'hai fatta</td>
                    <td>Finché non cambi la scelta o cancelli i dati del sito dal browser</td>
                  </tr>
                  <tr>
                    <td className="nome-cookie">tema</td>
                    <td>Tecnico (localStorage)</td>
                    <td>Ricordare il tema chiaro o scuro scelto nella home</td>
                    <td>Finché non cambi tema o cancelli i dati del sito dal browser</td>
                  </tr>
                  <tr>
                    <td className="nome-cookie">_ga, _ga_29CR0733KS</td>
                    <td>Statistico (solo se accettato)</td>
                    <td>Google Analytics 4: conta le visite e le azioni sul sito con un identificativo casuale; il Titolare usa questi dati solo in forma statistica. Se accetti anche i cookie di marketing, Google Analytics invia a Google anche i dati di Google signals, sempre marcati come non personalizzati. Fornitore: Google Ireland Limited, responsabile del trattamento; i dati possono passare a Google LLC (USA, Data Privacy Framework). <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Informativa</a></td>
                    <td>Fino a 2 anni</td>
                  </tr>
                  <tr>
                    <td className="nome-cookie">_gcl_au, _gcl_aw e gli altri cookie _gcl_, _gac_gb_ (cookie); _gcl_ls (localStorage); cookie di Google su google.com e doubleclick.net</td>
                    <td>Marketing (solo se accettato)</td>
                    <td>Google Ads: capire quali visite e richieste di contatto (invio del modulo, clic su «Chiama» e «WhatsApp») arrivano dagli annunci; riceve la pagina da cui entri nel sito e le richieste, senza remarketing e senza annunci personalizzati. Quando invii un modulo, Google può ricevere l'email o il telefono che hai scritto, trasformati in un codice (hash), per collegare la richiesta all'annuncio. Fornitore: Google Ireland Limited, titolare autonomo. <a href="https://business.safety.google/adscookies/" target="_blank" rel="noopener noreferrer">Informativa</a></td>
                    <td>_gcl_ e _gac_gb_ 90 giorni, cookie di Google fino a 13 mesi</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="nota-legale">La richiesta inviata dal simulatore preventivo viene contata come conversione degli annunci solo se accetti sia i cookie statistici sia quelli di marketing. L'assistente AI della home non usa cookie e non salva le conversazioni nel browser.</p>

            <div className="riquadro-legale">
              <p className="riquadro-titolo">Gestione delle Preferenze</p>
              <p>Puoi cambiare o revocare il consenso quando vuoi dal link «Preferenze cookie» in fondo a ogni pagina o dal pulsante qui sotto. La revoca ha effetto subito: il sito smette di inviare dati a Google, cancella i cookie _ga, _gcl_ e _gac_ dal proprio dominio e i dati _gcl_ls dal browser. I cookie che Google ha già salvato sui suoi domini (google.com, doubleclick.net) si cancellano dalle impostazioni del browser, con le guide qui sotto.</p>
              <button
                type="button"
                onClick={apriPreferenzeCookie}
                className="pulsante pulsante--scrivi"
              >
                Apri le preferenze cookie
              </button>
            </div>
          </section>

          <section>
            <h2>Come cancellare o bloccare i cookie</h2>
            <p>Puoi cancellare o bloccare i cookie dalle impostazioni del browser. Ecco le guide dei principali browser:</p>
            <ul>
              {[
                { nome: 'Google Chrome', indirizzo: 'https://support.google.com/chrome/answer/95647?hl=it' },
                { nome: 'Mozilla Firefox', indirizzo: 'https://support.mozilla.org/it/kb/clear-cookies-and-site-data-firefox' },
                { nome: 'Safari', indirizzo: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
                { nome: 'Microsoft Edge', indirizzo: 'https://support.microsoft.com/it-it/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use' },
              ].map((guidaBrowser) => (
                <li key={guidaBrowser.nome}>
                  <a href={guidaBrowser.indirizzo} target="_blank" rel="noopener noreferrer">{guidaBrowser.nome}</a>
                </li>
              ))}
            </ul>
            <p className="nota-legale">Se blocchi cookie e dati dei siti, il sito funziona lo stesso, ma non ricorda la tua scelta e ti mostra di nuovo il banner.</p>
          </section>

          <section>
            <h2>Contatti</h2>
            <p>Per qualsiasi domanda relativa all'utilizzo dei cookie su questo sito, contatta il Titolare del trattamento: <a href="mailto:mauroexe@mauroceccarelli.it">mauroexe@mauroceccarelli.it</a></p>
            <p>Per informazioni complete sul trattamento dei dati personali, consulta la <a href="/privacy-policy">Privacy Policy</a>.</p>
          </section>

        </div>
      </div>
    </PaginaVetrina>
  );
};

export default CookiePolicyPage;
