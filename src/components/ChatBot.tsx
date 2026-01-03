import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

// Configurazione Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// System prompt con tutte le info su Mauro e i prezzi
const SYSTEM_PROMPT = `Sei M.A.U.R.O. Bot (Modulo Assistenza Utenti & Risposta Operativa), l'assistente virtuale del portfolio di Mauro, uno sviluppatore freelance italiano.

## CHI È MAURO
- Sviluppatore full-stack creativo
- Specializzato in: Web Development, AI/Chatbot, App personalizzate, Trading Bot
- Località: Ascoli Piceno, Italia (lavora anche da remoto)
- Email: ceccarellimauro3@gmail.com
- Stile: professionale ma amichevole, appassionato di tecnologia e gaming

## SERVIZI E PREZZI DETTAGLIATI (Prezzi di mercato Italia 2025)

### 1. PRODOTTI DIGITALI & CONTENUTI
- **Tutorial interattivo semplice**: €300-600
- **Tutorial interattivo avanzato (con quiz, progress tracking)**: €600-1.500
- **Corso online completo (video + materiali + quiz)**: €1.000-3.000
- **E-book interattivo**: €200-500
- **Calcolatori/Tool interattivi** (es. calcolatore ROI, simulatori investimenti): €400-1.000
- **Landing page per infoprodotti**: €400-800
- **Membership site / Area riservata**: €1.500-3.500
- **Template Notion/Airtable personalizzati**: €150-400

Esempi di prodotti digitali realizzabili:
- Tutorial su investimenti, crypto, trading (es. "Come investire nel 2026")
- Guide interattive su programmazione
- Corsi su marketing digitale, AI, automazione
- Calcolatori finanziari personalizzati
- Dashboard per tracking obiettivi
- Sistemi di automazione personale

### 2. SVILUPPO WEB
- **Landing Page (1 pagina)**: €350-600
- **Sito Vetrina (3-5 pagine)**: €700-1.500
- **Sito Vetrina + Blog**: €1.200-2.000
- **Sito E-commerce base (fino a 50 prodotti)**: €1.800-3.500
- **Sito E-commerce avanzato**: €3.500-6.000
- **Web App personalizzata**: €2.500-6.000+

Tecnologie: React, Next.js, TypeScript, Tailwind CSS, Node.js

### 3. CHATBOT & INTELLIGENZA ARTIFICIALE
- **Chatbot base (risposte predefinite, FAQ)**: €500-1.000
- **Chatbot AI semplice (Gemini/GPT, FAQ + contatti)**: €1.000-1.800
- **Chatbot AI avanzato (conversazionale, integrazioni)**: €1.800-3.500
- **Assistente virtuale completo per business**: €3.000-5.000
- **Bot Telegram semplice (comandi, notifiche)**: €250-500
- **Bot Telegram medio (automazioni, database)**: €500-1.000
- **Bot Telegram avanzato (con AI integrato)**: €1.000-2.500
- **Bot Trading/Crypto (analisi, segnali, AI)**: €2.000-5.000

Tecnologie: Gemini AI, OpenAI GPT, Python, Telegram API, Node.js

### 4. APP PERSONALIZZATE
- **App web semplice (dashboard, tool interno)**: €1.500-3.000
- **App web media complessità**: €3.000-5.000
- **App web complessa (multi-utente, admin panel)**: €5.000-10.000+
- **Automazioni e integrazioni API**: €500-1.500
- **Trading Bot base**: €1.000-2.000
- **Trading Bot avanzato (come Crypto Analyzer Pro)**: €2.500-5.000

### 5. PACCHETTI COMBINATI (SCONTATI 15-20%)
- **Sito Vetrina + Chatbot base**: €1.000-1.800 (risparmi ~€200)
- **Sito Vetrina + Chatbot AI**: €1.800-2.800 (risparmi ~€400)
- **Sito completo + Chatbot AI + SEO base**: €2.500-4.000
- **E-commerce + Chatbot assistenza**: €2.800-5.000
- **Soluzione business completa**: preventivo personalizzato

### FATTORI CHE INFLUENZANO IL PREZZO
- Numero di pagine/funzionalità
- Complessità del design (custom vs template base)
- Integrazioni richieste (pagamenti, CRM, API esterne)
- Urgenza (consegna rush +25-30%)
- Manutenzione continuativa (da €50/mese)
- Revisioni extra oltre le 2 incluse

### TEMPI DI CONSEGNA MEDI
- Landing Page: 3-5 giorni lavorativi
- Sito Vetrina: 1-2 settimane
- Sito E-commerce: 2-4 settimane
- Web App: 3-6 settimane
- Chatbot base: 5-7 giorni
- Chatbot AI: 1-2 settimane
- Bot Telegram semplice: 3-5 giorni
- Bot Telegram avanzato: 1-2 settimane
- Tutorial/Corso: 2-4 settimane (dipende dal contenuto)

## PROGETTI RECENTI (da citare come esempi)
1. **Crypto Analyzer Pro AI** - Bot Telegram per analisi crypto con AI (Python, Gemini)
2. **Maicol Ceccarelli** - Sito web per drone pilot (design immersivo)
3. **AI Business Assistant** - Chatbot per ristoranti con prenotazioni (React, Gemini)

## COME COMPORTARTI
1. Sii amichevole e professionale, usa qualche emoji ma non esagerare
2. Quando qualcuno chiede un preventivo, fai domande per capire meglio le esigenze
3. Fornisci sempre una fascia di prezzo, non un prezzo fisso (es. "€800-1.200")
4. Se la richiesta è complessa, suggerisci di contattare Mauro direttamente
5. Evidenzia i vantaggi dei pacchetti combinati quando appropriato
6. Rispondi SEMPRE in italiano
7. Se non sai qualcosa, ammettilo e suggerisci di contattare Mauro
8. Mantieni le risposte concise ma complete (max 150 parole circa)
9. Usa **grassetto** per evidenziare prezzi e info importanti

## OBIETTIVO
Aiutare i visitatori a:
- Capire i servizi offerti
- Ottenere preventivi indicativi
- Rispondere alle loro domande
- Invogliarli a contattare Mauro per progetti concreti`;

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Ciao! 👋 Sono M.A.U.R.O. Bot, l\'assistente AI di questo portfolio.\n\nPosso aiutarti con info su servizi, prezzi e preventivi. Chiedimi pure!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inizializza la chat session con Gemini
  useEffect(() => {
    const initChat = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const chat = model.startChat({
          history: [
            {
              role: 'user',
              parts: [{ text: 'Inizializza la conversazione con queste istruzioni: ' + SYSTEM_PROMPT }],
            },
            {
              role: 'model',
              parts: [{ text: 'Perfetto! Sono pronto ad assistere i visitatori del portfolio di Mauro. Conosco tutti i servizi, i prezzi e sono pronto a fornire preventivi personalizzati. Come posso aiutare?' }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        });
        setChatSession(chat);
      } catch (error) {
        console.error('Errore inizializzazione Gemini:', error);
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');

    // Aggiungi messaggio utente
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      let botResponse = '';

      if (chatSession) {
        // Usa Gemini
        const result = await chatSession.sendMessage(userText);
        botResponse = result.response.text();
      } else {
        // Fallback se Gemini non è disponibile
        botResponse = 'Mi dispiace, al momento ho qualche difficoltà tecnica. 😅\n\nPuoi contattare Mauro direttamente a:\n📧 ceccarellimauro3@gmail.com';
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: botResponse
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Errore Gemini:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Ops! Qualcosa è andato storto. 😅\n\nProva a riformulare la domanda, oppure contatta Mauro direttamente:\n📧 ceccarellimauro3@gmail.com'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = ['Servizi', 'Prezzi', 'Preventivo', 'Contatto'];

  return (
    <>
      {/* Chat Button - POSIZIONE: BASSO DESTRA */}
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-dark-800 border-2 border-cyan-400 flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Apri chat"
      >
        {/* Bot Icon SVG inline */}
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <defs>
            <filter id="cyanGlowBtn" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="eyeGradBtn" cx="50%" cy="30%" r="60%">
              <stop offset="0%" style={{stopColor:'#00FFFF'}}/>
              <stop offset="100%" style={{stopColor:'#00B8D4'}}/>
            </radialGradient>
            <linearGradient id="bodyGradBtn" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#3a3a4a'}}/>
              <stop offset="100%" style={{stopColor:'#1a1a2a'}}/>
            </linearGradient>
          </defs>
          {/* Simplified bot face */}
          <rect x="15" y="20" width="70" height="50" rx="10" fill="url(#bodyGradBtn)" stroke="#00E5FF" strokeWidth="2"/>
          <rect x="22" y="30" width="22" height="18" rx="4" fill="#0a0a0a"/>
          <rect x="56" y="30" width="22" height="18" rx="4" fill="#0a0a0a"/>
          <ellipse cx="33" cy="39" rx="8" ry="6" fill="url(#eyeGradBtn)" filter="url(#cyanGlowBtn)"/>
          <ellipse cx="67" cy="39" rx="8" ry="6" fill="url(#eyeGradBtn)" filter="url(#cyanGlowBtn)"/>
          <circle cx="34" cy="38" r="2" fill="#0a0a0a"/>
          <circle cx="68" cy="38" r="2" fill="#0a0a0a"/>
          <rect x="35" y="55" width="30" height="5" rx="2" fill="#0a0a0a"/>
          {/* Antenna */}
          <circle cx="30" cy="12" r="5" fill="#a855f7" className="animate-pulse"/>
          <line x1="30" y1="17" x2="30" y2="20" stroke="#4a4a5a" strokeWidth="2"/>
          <circle cx="70" cy="12" r="5" fill="#00E5FF" className="animate-pulse"/>
          <line x1="70" y1="17" x2="70" y2="20" stroke="#4a4a5a" strokeWidth="2"/>
        </svg>
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1 bg-dark-800 border border-cyan-400/50 rounded text-cyan-400 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          🤖 Chatta con me!
        </span>
      </button>

      {/* Chat Window - POSIZIONE: BASSO DESTRA */}
      <div
        className={`fixed bottom-8 right-8 z-50 w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className={`bg-dark-900 border border-cyan-400/50 rounded-2xl shadow-[0_0_40px_rgba(0,229,255,0.2)] overflow-hidden flex flex-col ${isMinimized ? 'h-14' : 'h-[500px]'} transition-all duration-300`}>
          
          {/* Header */}
          <div className="bg-dark-800 border-b border-cyan-400/30 p-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {/* Mini bot icon */}
              <div className="w-8 h-8 rounded-full bg-dark-900 border border-cyan-400/50 flex items-center justify-center">
                <span className="text-cyan-400 text-sm">🤖</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm">M.A.U.R.O. Bot</h3>
                <p className="text-cyan-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  AI Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label={isMinimized ? 'Espandi' : 'Minimizza'}
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Chiudi"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-950/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-cyan-400 text-black rounded-br-none'
                          : 'bg-dark-800 text-gray-200 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                          {line.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j} className={msg.role === 'user' ? 'text-black' : 'text-cyan-400'}>{part}</strong> : part
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-dark-800 border border-white/10 p-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-white/5 flex gap-2 flex-wrap bg-dark-900/50">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => {
                        setInput(action);
                        setTimeout(handleSend, 50);
                      }}
                      className="px-3 py-1 bg-dark-800 border border-cyan-400/30 rounded-full text-xs text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 bg-dark-800 border-t border-white/10 shrink-0">
                <div className="flex items-center gap-2 bg-dark-900 rounded-full px-4 py-2 border border-white/10 focus-within:border-cyan-400 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 bg-transparent outline-none text-white text-sm placeholder-gray-500"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className={`p-1.5 rounded-full transition-colors ${
                      input.trim() && !isTyping
                        ? 'text-cyan-400 hover:bg-cyan-400/10'
                        : 'text-gray-600'
                    }`}
                  >
                    {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-600 mt-2">Powered by Gemini AI ✨</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBot;

