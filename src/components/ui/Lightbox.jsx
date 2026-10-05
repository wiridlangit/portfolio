import { useEffect } from 'react';

export default function Lightbox({ open, onClose, title, image, meta }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-term-bg/90 p-4 backdrop-blur-sm animate__animated animate__fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="panel w-full max-w-3xl overflow-hidden rounded-xl animate__animated animate__zoomIn"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-term-border px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-rose-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-term-accent/70" />
          </div>
          <p className="truncate font-mono text-xs text-term-faint">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-lg text-term-muted transition-colors hover:text-term-accent"
            aria-label="Close preview"
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4">
          <img src={image} alt={title} className="w-full rounded-lg" />
        </div>
        {meta && <p className="border-t border-term-border px-5 py-3 font-mono text-xs text-term-muted">{meta}</p>}
      </div>
    </div>
  );
}
