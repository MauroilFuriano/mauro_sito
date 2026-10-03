import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { recapiti } from '../../data/home';
import { segnaEvento } from '../../misurazione';
import AzioniContatto from './AzioniContatto';
import { Icona } from './Icone';

type CampoRichiamo = 'nome' | 'telefono' | 'bisogno' | 'privacy';
type EsitoRichiamo = 'inviata' | 'errore' | null;

interface RichiestaRichiamo {
  nome: string;
  telefono: string;
  bisogno: string;
  privacy: boolean;
  esca: string;
}

const richiestaVuota: RichiestaRichiamo = { nome: '', telefono: '', bisogno: '', privacy: false, esca: '' };

const ordineCampi: readonly CampoRichiamo[] = ['nome', 'telefono', 'bisogno', 'privacy'];

const bisogniPossibili = [
  { valore: 'sito-web', etichetta: 'Sito web' },
  { valore: 'assistente-ai', etichetta: 'Assistente AI' },
  { valore: 'e-commerce', etichetta: 'E-commerce' },
  { valore: 'gestionale', etichetta: 'Gestionale' },
  { valore: 'non-lo-so', etichetta: 'Non lo so ancora' },
];

const campoValido: Record<CampoRichiamo, (richiesta: RichiestaRichiamo) => boolean> = {
  nome: (richiesta) => richiesta.nome.trim().length >= 2,
  telefono: (richiesta) => richiesta.telefono.replace(/\D/g, '').length >= 6,
  bisogno: (richiesta) => richiesta.bisogno !== '',
  privacy: (richiesta) => richiesta.privacy,
};

const ErroreCampo: React.FC<{ id: string; visibile: boolean; children: React.ReactNode }> = ({ id, visibile, children }) => (
  <p className="campo-errore" id={id} hidden={!visibile}><Icona nome="avviso" />{children}</p>
);

const Contatti: React.FC = () => {
  const [richiesta, setRichiesta] = useState<RichiestaRichiamo>(richiestaVuota);
  const [campiErrati, setCampiErrati] = useState<Partial<Record<CampoRichiamo, boolean>>>({});
  const [invioInCorso, setInvioInCorso] = useState(false);
  const [esito, setEsito] = useState<EsitoRichiamo>(null);

  const aggiornaCampo = <Campo extends keyof RichiestaRichiamo>(campo: Campo, valore: RichiestaRichiamo[Campo]) => {
    const richiestaAggiornata = { ...richiesta, [campo]: valore };
    setRichiesta(richiestaAggiornata);
    if (campo !== 'esca' && campiErrati[campo as CampoRichiamo]) {
      setCampiErrati((errati) => ({ ...errati, [campo]: !campoValido[campo as CampoRichiamo](richiestaAggiornata) }));
    }
  };

  const inviaRichiesta = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (invioInCorso) return;
    const verifica = Object.fromEntries(ordineCampi.map((campo) => [campo, !campoValido[campo](richiesta)])) as Record<CampoRichiamo, boolean>;
    setCampiErrati(verifica);
    const primoErrato = ordineCampi.find((campo) => verifica[campo]);
    if (primoErrato) {
      setEsito(null);
      const campoDaCorreggere = evento.currentTarget.elements.namedItem(primoErrato);
      if (campoDaCorreggere instanceof HTMLElement) campoDaCorreggere.focus();
      return;
    }
    if (richiesta.esca) {
      setEsito('inviata');
      return;
    }

    const servizio = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const modello = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const chiavePubblica = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!servizio || !modello || !chiavePubblica) {
      setEsito('errore');
      return;
    }

    const bisognoScelto = bisogniPossibili.find((bisogno) => bisogno.valore === richiesta.bisogno)?.etichetta ?? richiesta.bisogno;
    setInvioInCorso(true);
    try {
      await emailjs.send(servizio, modello, {
        user_name: richiesta.nome.trim(),
        user_email: '',
        subject: `Richiesta di richiamata: ${bisognoScelto}`,
        message: `Telefono: ${richiesta.telefono.trim()}\nDi cosa ha bisogno: ${bisognoScelto}`,
      }, { publicKey: chiavePubblica });
      segnaEvento('generate_lead', { event_category: 'Lead', bisogno: richiesta.bisogno });
      setRichiesta(richiestaVuota);
      setCampiErrati({});
      setEsito('inviata');
    } catch {
      setEsito('errore');
    } finally {
      setInvioInCorso(false);
    }
  };

  return (
    <section className="sezione contatti" id="contatti" aria-labelledby="titolo-contatti">
      <div className="larghezza">
        <h2 className="titolo-sezione parliamone" id="titolo-contatti">Parliamone</h2>
        <div className="contatti-griglia">
          <div className="contatti-diretti">
            <p className="testo-grande">Chiamami o scrivimi su WhatsApp. Rispondo io, e se non posso ti richiamo entro 24 ore.</p>
            <AzioniContatto grandi />
            <p className="contatti-recapiti"><a className="link-in-linea" href={`mailto:${recapiti.email}`}>{recapiti.email}</a> · Lavoro ad Ascoli Piceno, in tutte le Marche e in Abruzzo, anche a distanza.</p>
          </div>

          <form className="modulo" id="modulo-richiamo" noValidate onSubmit={inviaRichiesta}>
            <h3>Preferisci essere richiamato?</h3>
            <div className="campo">
              <label htmlFor="richiamo-nome">Nome</label>
              <input
                id="richiamo-nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
                aria-describedby={campiErrati.nome ? 'errore-nome' : undefined}
                aria-invalid={campiErrati.nome}
                value={richiesta.nome}
                onChange={(evento) => aggiornaCampo('nome', evento.target.value)}
              />
              <ErroreCampo id="errore-nome" visibile={Boolean(campiErrati.nome)}>Scrivi il tuo nome.</ErroreCampo>
            </div>
            <div className="campo">
              <label htmlFor="richiamo-telefono">Telefono</label>
              <input
                id="richiamo-telefono"
                name="telefono"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                aria-describedby={campiErrati.telefono ? 'errore-telefono' : undefined}
                aria-invalid={campiErrati.telefono}
                value={richiesta.telefono}
                onChange={(evento) => aggiornaCampo('telefono', evento.target.value)}
              />
              <ErroreCampo id="errore-telefono" visibile={Boolean(campiErrati.telefono)}>Scrivi un numero di telefono a cui richiamarti.</ErroreCampo>
            </div>
            <div className="campo">
              <label htmlFor="richiamo-bisogno">Di cosa hai bisogno</label>
              <div className="campo-selezione">
                <select
                  id="richiamo-bisogno"
                  name="bisogno"
                  required
                  aria-describedby={campiErrati.bisogno ? 'errore-bisogno' : undefined}
                  aria-invalid={campiErrati.bisogno}
                  value={richiesta.bisogno}
                  onChange={(evento) => aggiornaCampo('bisogno', evento.target.value)}
                >
                  <option value="" disabled>Scegli una voce</option>
                  {bisogniPossibili.map((bisogno) => <option key={bisogno.valore} value={bisogno.valore}>{bisogno.etichetta}</option>)}
                </select>
              </div>
              <ErroreCampo id="errore-bisogno" visibile={Boolean(campiErrati.bisogno)}>Scegli una voce: va bene anche “Non lo so ancora”.</ErroreCampo>
            </div>
            <div className="campo campo--casella">
              <input
                className="casella"
                id="richiamo-privacy"
                name="privacy"
                type="checkbox"
                required
                aria-describedby={campiErrati.privacy ? 'errore-privacy' : undefined}
                aria-invalid={campiErrati.privacy}
                checked={richiesta.privacy}
                onChange={(evento) => aggiornaCampo('privacy', evento.target.checked)}
              />
              <label htmlFor="richiamo-privacy">Ho letto la <Link className="link-in-linea" to="/privacy-policy" target="_blank" rel="noopener">privacy policy</Link></label>
              <ErroreCampo id="errore-privacy" visibile={Boolean(campiErrati.privacy)}>Spunta la casella per continuare.</ErroreCampo>
            </div>
            <div className="campo-esca" aria-hidden="true">
              <label htmlFor="richiamo-controllo">Lascia vuoto questo campo</label>
              <input
                id="richiamo-controllo"
                name="controllo-modulo"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={richiesta.esca}
                onChange={(evento) => aggiornaCampo('esca', evento.target.value)}
              />
            </div>
            <button className="pulsante pulsante--chiama" type="submit" aria-disabled={invioInCorso}>
              <Icona nome="telefono" />Richiamami
            </button>
            <div className="modulo-esito" id="esito-richiamo" role="status">
              {esito === 'inviata' && (
                <><Icona nome="spunta" /><span>Grazie, ti richiamo entro 24 ore.</span></>
              )}
              {esito === 'errore' && (
                <>
                  <Icona nome="avviso" />
                  <span>
                    Non sono riuscito a inviare la richiesta. Chiamami al <a href={recapiti.telefono}>{recapiti.telefonoLeggibile}</a> o scrivimi su <a href={recapiti.whatsapp} target="_blank" rel="noopener">WhatsApp</a>.
                  </span>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contatti;
