import type React from 'react';
import { segnaEvento } from '../../misurazione';

const zonaDelCollegamento = (collegamento: Element) => {
  const zona = collegamento.closest('[id], header, footer');
  return zona ? zona.id || zona.tagName.toLowerCase() : 'pagina';
};

export const segnaClicContatto = (evento: React.MouseEvent<HTMLElement>) => {
  const collegamento = (evento.target as Element).closest('a[href]');
  if (!collegamento) return;
  const indirizzo = collegamento.getAttribute('href') ?? '';
  if (indirizzo.startsWith('tel:')) segnaEvento('click_chiamata', { posizione: zonaDelCollegamento(collegamento) });
  else if (indirizzo.includes('wa.me')) segnaEvento('click_whatsapp', { posizione: zonaDelCollegamento(collegamento) });
};
