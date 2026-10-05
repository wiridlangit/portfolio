import { useCallback, useRef, useState } from 'react';
import { ToastContext } from './ToastContext';

let nextId = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    (message, { tone = 'success', duration = 2600 } = {}) => {
      const id = nextId++;
      setToasts((current) => [...current, { id, message, tone }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      );
      return id;
    },
    [dismiss],
  );

  const value = { notify, dismiss };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="panel pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg px-4 py-3 font-mono text-sm shadow-lg animate__animated animate__fadeInUp"
          >
            <i
              className={`text-lg ${toast.tone === 'error' ? 'text-rose-400' : 'text-term-accent'}`}
              aria-hidden="true"
            >
              {toast.tone === 'error' ? 'ri-error-warning-line' : 'ri-checkbox-circle-line'}
            </i>
            <span className="flex-1 text-term-text">{toast.message}</span>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="text-term-faint transition-colors hover:text-term-accent"
              aria-label="Dismiss notification"
            >
              <i className="ri-close-line text-lg" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
