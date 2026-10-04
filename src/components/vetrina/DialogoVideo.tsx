import React from 'react';

export const apriDialogoVideo = (dialogo: HTMLDialogElement | null) => {
  if (!dialogo) return;
  if (typeof dialogo.showModal === 'function') dialogo.showModal();
  else dialogo.setAttribute('open', '');
  dialogo.querySelector('video')?.play().catch(() => undefined);
};

interface DialogoVideoProps {
  dialogoRef: React.RefObject<HTMLDialogElement | null>;
}

const DialogoVideo: React.FC<DialogoVideoProps> = ({ dialogoRef }) => {
  const chiudiDialogo = () => dialogoRef.current?.close();

  return (
    <dialog
      className="video-dialogo"
      id="video-sarcolab"
      ref={dialogoRef}
      aria-labelledby="video-sarcolab-titolo"
      onClose={(evento) => evento.currentTarget.querySelector('video')?.pause()}
      onClick={(evento) => { if (evento.target === evento.currentTarget) chiudiDialogo(); }}
    >
      <div className="video-dialogo-testa">
        <p className="video-dialogo-titolo" id="video-sarcolab-titolo">Sarcolab in azione · 4 minuti</p>
        <button className="video-dialogo-chiudi" type="button" onClick={chiudiDialogo}>Chiudi</button>
      </div>
      <video controls playsInline preload="none" poster="/lavori/sarcolab-poster.webp" src="/video/sarcolab-presentazione.mp4"></video>
    </dialog>
  );
};

export default DialogoVideo;
