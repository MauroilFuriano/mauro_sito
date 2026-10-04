import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { recapiti } from '../../data/home';
import { Icona } from './Icone';
import '../../styles/assistente.css';

type ErroreRisposta = 'generico' | 'limite' | 'limite-giornaliero';

interface MessaggioChat {
  autore: 'cliente' | 'assistente';
  testo: string;
}

const domandeSuggerite = ['Quanto costa un sito?', 'In quanto tempo è pronto?', 'Cosa è compreso?', 'Mi serve un assistente AI?'];

const MESSAGGI_INVIATI = 20;
const CARATTERI_PER_MESSAGGIO = 800;
const CARATTERI_INVIATI = 8000;
const CARATTERI_DOMANDA = 500;
const ATTESA_MASSIMA_RISPOSTA = 30 * 1000;
const SECONDI_LIMITE_BREVE = 10 * 60;

const cronologiaDaInviare = (conversazione: readonly MessaggioChat[]) => {
  const cronologia: MessaggioChat[] = [];
  let caratteriInviati = 0;
  for (let posizione = conversazione.length - 1; posizione >= 0 && cronologia.length < MESSAGGI_INVIATI; posizione -= 1) {
    const { autore, testo } = conversazione[posizione];
    const testoInviato = testo.slice(0, CARATTERI_PER_MESSAGGIO);
    if (caratteriInviati + testoInviato.length > CARATTERI_INVIATI) break;
    caratteriInviati += testoInviato.length;
    cronologia.unshift({ autore, testo: testoInviato });
  }
  return cronologia;
};

const conGrassetto = (paragrafo: string) => {
  const frammenti = paragrafo.split('**');
  // Un ** rimasto senza chiusura resta testo normale
  if (frammenti.length % 2 === 0) {
    const ultimoFrammento = frammenti.pop();
    frammenti[frammenti.length - 1] += `**${ultimoFrammento}`;
  }
  return frammenti.map((frammento, posizione) => (posizione % 2 === 1 ? <strong key={posizione}>{frammento}</strong> : frammento));
};

const TestoAssistente: React.FC<{ testo: string }> = ({ testo }) => (
  <>
    {testo
      .split(/\n+/)
      .map((riga) => riga.trim().replace(/^#{1,6}\s+/, '').replace(/^[-*•]\s+/, '• '))
      .filter(Boolean)
      .map((paragrafo, posizione) => <p key={posizione}>{conGrassetto(paragrafo)}</p>)}
  </>
);

const Assistente: React.FC = () => {
  const [aperto, setAperto] = useState(false);
  const [conversazione, setConversazione] = useState<MessaggioChat[]>([]);
  const [bozza, setBozza] = useState('');
  const [inAttesa, setInAttesa] = useState(false);
  const [errore, setErrore] = useState<ErroreRisposta | null>(null);
  const [sopraIndiceLavori, setSopraIndiceLavori] = useState(false);
  const radiceRef = useRef<HTMLDivElement>(null);
  const pulsanteRef = useRef<HTMLButtonElement>(null);
  const campoRef = useRef<HTMLTextAreaElement>(null);
  const corpoRef = useRef<HTMLDivElement>(null);
  const richiestaRef = useRef<AbortController | null>(null);

  useEffect(() => () => richiestaRef.current?.abort(), []);

  useEffect(() => {
    // Con il palco dei lavori agganciato, il suo indice sta in basso a destra, proprio sotto il pulsante
    const indiceLavori = document.querySelector('.home-vetrina .lavori-indice');
    if (!indiceLavori || !('IntersectionObserver' in window)) return undefined;
    const osservatoreIndice = new IntersectionObserver(([osservazione]) => setSopraIndiceLavori(osservazione.isIntersecting));
    osservatoreIndice.observe(indiceLavori);
    return () => osservatoreIndice.disconnect();
  }, []);

  useEffect(() => {
    if (aperto) campoRef.current?.focus();
  }, [aperto]);

  // Su telefono il pannello copre la pagina: se il fuoco si posa fuori dall'assistente (anche rientrando in cima dopo l'ultimo Tab), si chiude per non nasconderlo
  useEffect(() => {
    const radice = radiceRef.current;
    if (!aperto || !radice) return undefined;
    const chiudiSeIlFuocoVaAltrove = (evento: FocusEvent) => {
      if (evento.target instanceof Node && !radice.contains(evento.target)) setAperto(false);
    };
    document.addEventListener('focusin', chiudiSeIlFuocoVaAltrove);
    return () => document.removeEventListener('focusin', chiudiSeIlFuocoVaAltrove);
  }, [aperto]);

  useLayoutEffect(() => {
    const campo = campoRef.current;
    if (!aperto || !campo) return;
    campo.style.height = 'auto';
    campo.style.height = `${campo.scrollHeight + campo.offsetHeight - campo.clientHeight}px`;
  }, [aperto, bozza]);

  useEffect(() => {
    const corpo = corpoRef.current;
    const ultimoArrivato = corpo?.querySelector('.assistente-ai-conversazione')?.lastElementChild;
    if (!aperto || !corpo || !ultimoArrivato) return;
    if (conversazione.length === 0) {
      corpo.scrollTop = 0;
      return;
    }
    // Una risposta più alta del riquadro si legge dall'inizio; se è corta, scrollTop si ferma da solo in fondo
    corpo.scrollTop += ultimoArrivato.getBoundingClientRect().top - corpo.getBoundingClientRect().top - 16;
  }, [aperto, conversazione, inAttesa, errore]);

  const chiudiConEsc = (evento: React.KeyboardEvent<HTMLDivElement>) => {
    if (evento.key !== 'Escape' || !aperto) return;
    setAperto(false);
    pulsanteRef.current?.focus();
  };

  const inviaDomanda = async (domanda: string) => {
    const testoDomanda = domanda.trim();
    if (!testoDomanda || inAttesa) return;
    const conversazioneAggiornata: MessaggioChat[] = [...conversazione, { autore: 'cliente', testo: testoDomanda }];
    setConversazione(conversazioneAggiornata);
    setBozza('');
    setErrore(null);
    setInAttesa(true);
    const richiesta = new AbortController();
    richiestaRef.current = richiesta;
    const attesaMassima = window.setTimeout(() => richiesta.abort(), ATTESA_MASSIMA_RISPOSTA);
    try {
      const rispostaServer = await fetch('/api/assistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messaggi: cronologiaDaInviare(conversazioneAggiornata) }),
        signal: richiesta.signal,
      });
      if (rispostaServer.status === 429) {
        const secondiDiAttesa = Number(rispostaServer.headers.get('Retry-After'));
        setErrore(secondiDiAttesa > SECONDI_LIMITE_BREVE ? 'limite-giornaliero' : 'limite');
        return;
      }
      const { testo } = (rispostaServer.ok ? await rispostaServer.json() : {}) as { testo?: unknown };
      if (typeof testo === 'string' && testo.trim()) {
        setConversazione((conversazionePrecedente) => [...conversazionePrecedente, { autore: 'assistente', testo: testo.trim() }]);
      } else {
        setErrore('generico');
      }
    } catch {
      setErrore('generico');
    } finally {
      window.clearTimeout(attesaMassima);
      setInAttesa(false);
    }
  };

  // Il pulsante Invia si disabilita durante l'attesa: il fuoco torna al campo prima, altrimenti finirebbe fuori dall'assistente
  const inviaBozza = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    campoRef.current?.focus();
    inviaDomanda(bozza);
  };

  const inviaConInvio = (evento: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evento.key !== 'Enter' || evento.shiftKey || evento.nativeEvent.isComposing) return;
    evento.preventDefault();
    inviaDomanda(bozza);
  };

  // I suggerimenti spariscono col primo messaggio: il fuoco passa al campo prima che il pulsante premuto venga tolto
  const scegliDomanda = (domanda: string) => {
    campoRef.current?.focus();
    inviaDomanda(domanda);
  };

  const classiAssistente = ['assistente-ai', sopraIndiceLavori && 'assistente-ai--sopra-indice'].filter(Boolean).join(' ');

  return (
    <div className={classiAssistente} ref={radiceRef} onKeyDown={chiudiConEsc}>
      <button
        className="assistente-ai-apri"
        type="button"
        ref={pulsanteRef}
        aria-label={aperto ? "Chiudi l'assistente AI" : "Apri l'assistente AI"}
        aria-expanded={aperto}
        aria-controls="assistente-ai-pannello"
        onClick={() => setAperto((apertoPrima) => !apertoPrima)}
      >
        <Icona nome={aperto ? 'chiudi' : 'chat'} />
      </button>
      <div
        className="assistente-ai-pannello"
        id="assistente-ai-pannello"
        role="dialog"
        aria-modal="false"
        aria-labelledby="assistente-ai-titolo"
        hidden={!aperto}
      >
        <div className="assistente-ai-testa">
          <span className="assistente-ai-segno" aria-hidden="true"><Icona nome="chat" /></span>
          <div>
            <h2 className="assistente-ai-titolo" id="assistente-ai-titolo">Assistente AI</h2>
            <p className="assistente-ai-sottotitolo">Ti risponde un'intelligenza artificiale</p>
          </div>
        </div>
        <div className="assistente-ai-corpo" ref={corpoRef}>
          <div className="assistente-ai-conversazione" role="log" aria-live="polite">
            <div className="assistente-ai-messaggio assistente-ai-messaggio--assistente">
              <span className="solo-lettori">Assistente: </span>
              <p>
                Ciao, sono l'assistente AI di Mauro. Posso dirti quanto costa un sito, in quanto tempo è pronto e come lavora.
                Per un preventivo preciso, Mauro risponde al telefono: <a href={recapiti.telefono}>{recapiti.telefonoLeggibile}</a>.
              </p>
            </div>
            {conversazione.map((messaggio, posizione) => (
              <div className={`assistente-ai-messaggio assistente-ai-messaggio--${messaggio.autore}`} key={posizione}>
                <span className="solo-lettori">{messaggio.autore === 'cliente' ? 'Tu: ' : 'Assistente: '}</span>
                {messaggio.autore === 'cliente' ? <p>{messaggio.testo}</p> : <TestoAssistente testo={messaggio.testo} />}
              </div>
            ))}
            {inAttesa && (
              <div className="assistente-ai-scrive">
                <span className="assistente-ai-puntini" aria-hidden="true"><span /><span /><span /></span>
                <span className="solo-lettori">L'assistente sta scrivendo</span>
              </div>
            )}
            {errore && (
              <p className="assistente-ai-errore">
                <Icona nome="avviso" />
                {errore === 'limite' && (
                  <span>
                    Hai scritto molti messaggi in poco tempo: riprova tra qualche minuto, oppure chiama Mauro al <a href={recapiti.telefono}>{recapiti.telefonoLeggibile}</a>.
                  </span>
                )}
                {errore === 'limite-giornaliero' && (
                  <span>
                    Per oggi hai raggiunto il numero massimo di messaggi. Chiama Mauro al <a href={recapiti.telefono}>{recapiti.telefonoLeggibile}</a> o scrivigli su <a href={recapiti.whatsapp} target="_blank" rel="noopener">WhatsApp</a>.
                  </span>
                )}
                {errore === 'generico' && (
                  <span>
                    Non riesco a rispondere adesso. Chiama Mauro al <a href={recapiti.telefono}>{recapiti.telefonoLeggibile}</a> o scrivigli su <a href={recapiti.whatsapp} target="_blank" rel="noopener">WhatsApp</a>.
                  </span>
                )}
              </p>
            )}
          </div>
          {conversazione.length === 0 && (
            <ul className="assistente-ai-suggerimenti" aria-label="Domande suggerite">
              {domandeSuggerite.map((domanda) => (
                <li key={domanda}>
                  <button type="button" onClick={() => scegliDomanda(domanda)}>{domanda}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form className="assistente-ai-modulo" onSubmit={inviaBozza}>
          <label className="solo-lettori" htmlFor="assistente-ai-campo">La tua domanda per l'assistente</label>
          <textarea
            className="assistente-ai-campo"
            id="assistente-ai-campo"
            ref={campoRef}
            rows={1}
            maxLength={CARATTERI_DOMANDA}
            placeholder="Scrivi la tua domanda"
            enterKeyHint="send"
            value={bozza}
            onChange={(evento) => setBozza(evento.target.value)}
            onKeyDown={inviaConInvio}
          />
          <button className="assistente-ai-invia" type="submit" aria-label="Invia" disabled={!bozza.trim() || inAttesa}>
            <Icona nome="invia" />
          </button>
        </form>
        <p className="assistente-ai-informativa">
          <Link to="/privacy-policy" target="_blank" rel="noopener">Privacy policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Assistente;
