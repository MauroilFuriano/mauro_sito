import emailjs from '@emailjs/browser';

interface RichiestaEmail {
  nome: string;
  email?: string;
  oggetto: string;
  messaggio: string;
}

export const inviaRichiestaEmail = async ({ nome, email = '', oggetto, messaggio }: RichiestaEmail) => {
  const servizio = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const modello = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const chiavePubblica = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!servizio || !modello || !chiavePubblica) throw new Error('EmailJS non configurato');
  await emailjs.send(servizio, modello, { user_name: nome, user_email: email, subject: oggetto, message: messaggio }, { publicKey: chiavePubblica });
};
