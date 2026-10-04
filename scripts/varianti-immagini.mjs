import sharp from 'sharp';

const CARTELLA = 'public/lavori';
const LARGHEZZE_COMPUTER = [720, 1080];
const LARGHEZZE_TELEFONO = [260, 390, 520];

// Nella prima schermata le cornici mostrano solo l'inizio della pagina: redicar tiene anche il tratto che scorre con la parallasse
const ritagliPrimaSchermata = [
  { origine: 'redicar-desktop.webp', nome: 'redicar-eroe.webp', altezza: 1540 },
  { origine: 'fc-resinwood-desktop.webp', nome: 'fc-resinwood-eroe.webp', altezza: 920 },
  { origine: 'graphic-arts-mobile.webp', nome: 'graphic-arts-eroe.webp', altezza: 1720 },
];

const copieRidotte = [
  ...['redicar', 'ink-service', 'graphic-arts', 'fc-resinwood', 'sarcolab'].map((sito) => [`${sito}-desktop.webp`, LARGHEZZE_COMPUTER]),
  ...['redicar', 'ink-service', 'graphic-arts', 'fc-resinwood'].map((sito) => [`${sito}-mobile.webp`, LARGHEZZE_TELEFONO]),
  ['redicar-eroe.webp', LARGHEZZE_COMPUTER],
  ['fc-resinwood-eroe.webp', LARGHEZZE_COMPUTER],
  ['graphic-arts-eroe.webp', LARGHEZZE_TELEFONO],
];

const salvaWebp = (immagine, nome) => immagine.webp({ quality: 75, effort: 6 }).toFile(`${CARTELLA}/${nome}`);

for (const { origine, nome, altezza } of ritagliPrimaSchermata) {
  const { width: larghezza } = await sharp(`${CARTELLA}/${origine}`).metadata();
  const { size } = await salvaWebp(sharp(`${CARTELLA}/${origine}`).extract({ left: 0, top: 0, width: larghezza, height: altezza }), nome);
  console.log(`${nome.padEnd(32)} ${larghezza}×${altezza}  ${Math.round(size / 1024)} KB`);
}

for (const [origine, larghezze] of copieRidotte) {
  for (const larghezza of larghezze) {
    const nome = origine.replace(/\.webp$/, `-${larghezza}.webp`);
    const { height, size } = await salvaWebp(sharp(`${CARTELLA}/${origine}`).resize({ width: larghezza }), nome);
    console.log(`${nome.padEnd(32)} ${larghezza}×${height}  ${Math.round(size / 1024)} KB`);
  }
}
