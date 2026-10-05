import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function useTypewriter(lines, { speed = 34, startDelay = 300, linePause = 460 } = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const [completed, setCompleted] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (reducedMotion) {
      setCompleted(lines.length);
      setTyped('');
      return undefined;
    }

    setCompleted(0);
    setTyped('');

    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    let wait = startDelay;

    const tick = () => {
      if (cancelled || lineIndex >= lines.length) return;

      const line = lines[lineIndex];
      charIndex += 1;
      setTyped(line.slice(0, charIndex));

      if (charIndex >= line.length) {
        lineIndex += 1;
        charIndex = 0;
        setCompleted(lineIndex);
        wait += linePause;
      } else {
        wait += speed;
      }

      timer = setTimeout(tick, wait);
    };

    let timer = setTimeout(tick, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines, reducedMotion, speed, startDelay, linePause]);

  return { completed, typed, done: completed >= lines.length };
}
