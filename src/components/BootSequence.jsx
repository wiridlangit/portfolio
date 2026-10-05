import { useEffect, useState } from 'react';
import { profile } from '../data';
import { usePrefersReducedMotion } from '../hooks/useTypewriter';

const SESSION_KEY = 'portfolio:booted';

const bootLines = [
  { prompt: 'mounting design system', detail: 'terminal.theme --dark' },
  { prompt: 'loading projects', detail: '10+ records' },
  { prompt: 'indexing certificates', detail: '10+ records' },
  { prompt: 'locating operator', detail: `@${profile.location.split(',')[0]}` },
  { prompt: 'opening session', detail: 'welcome, sky' },
];

export default function BootSequence({ onDone }) {
  const reducedMotion = usePrefersReducedMotion();
  const [visibleLine, setVisibleLine] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        onDone();
        return;
      }
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // sessionStorage unavailable — fall through to the intro animation
    }

    setMounted(true);
  }, [onDone]);

  useEffect(() => {
    if (!mounted) return undefined;

    if (reducedMotion) {
      setVisibleLine(bootLines.length);
      const leaveTimer = setTimeout(() => setLeaving(true), 300);
      return () => clearTimeout(leaveTimer);
    }

    if (visibleLine >= bootLines.length) {
      const leaveTimer = setTimeout(() => setLeaving(true), 450);
      return () => clearTimeout(leaveTimer);
    }

    const lineTimer = setTimeout(() => setVisibleLine((line) => line + 1), 320);
    return () => clearTimeout(lineTimer);
  }, [mounted, visibleLine, reducedMotion]);

  useEffect(() => {
    if (!leaving) return undefined;
    const doneTimer = setTimeout(() => {
      setFinished(true);
      onDone();
    }, 650);
    return () => clearTimeout(doneTimer);
  }, [leaving, onDone]);

  if (!mounted || finished) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-term-bg px-6 transition-all duration-700 ${
        leaving ? 'pointer-events-none -translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative w-full max-w-xl font-mono text-sm">
        <div className="mb-4 flex items-center gap-2 text-term-faint">
          <span className="text-term-accent">~</span>
          <span>wiridlangit — zsh</span>
          <span className="animate-blink text-term-accent">▊</span>
        </div>

        <ul className="space-y-1.5">
          {bootLines.map((line, index) => (
            <li
              key={line.prompt}
              className={`flex items-baseline gap-3 transition-all duration-300 ${
                index < visibleLine ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
              }`}
            >
              <span className="shrink-0 text-term-accent">[ OK ]</span>
              <span className="text-term-text">{line.prompt}</span>
              <span className="hidden truncate text-term-faint sm:inline">— {line.detail}</span>
            </li>
          ))}
        </ul>

        {reducedMotion ? null : (
          <p className="mt-6 flex items-center gap-2 text-term-muted">
            <span>initializing</span>
            <span className="inline-flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-1.5 rounded-full bg-term-accent"
                  style={{ animation: `blink 1s steps(2, start) ${dot * 0.2}s infinite` }}
                />
              ))}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
