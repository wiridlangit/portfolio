import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navLinks } from '../../constants';

const SHOW_AFTER = 360;
const SCROLL_OFFSET = 140;

export default function SectionRail() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 900);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) {
      setVisible(false);
      return undefined;
    }

    let ticking = false;

    const update = () => {
      ticking = false;

      setVisible(window.scrollY > SHOW_AFTER);

      let current = sections[0].id;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top - SCROLL_OFFSET <= 0) {
          current = section.id;
        }
      });
      setActive(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  const goTo = (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    setActive(id);
    target.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted || pathname !== '/') return null;

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block ${
        visible
          ? 'translate-x-0 opacity-100'
          : 'pointer-events-none translate-x-4 opacity-0'
      } transition-all duration-300 ease-out`}
    >
      <ul className="relative flex flex-col items-end gap-3.5">
        <span
          className="absolute right-[3.5px] top-2 bottom-2 w-px bg-term-border"
          aria-hidden="true"
        />

        {navLinks.map((link) => {
          const isActive = active === link.id;

          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(event) => goTo(event, link.id)}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-3"
                title={link.command}
              >
                <span
                  className={`pointer-events-none whitespace-nowrap rounded-md border border-term-border bg-term-surface/90 px-2 py-1 font-mono text-xs text-term-muted opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:translate-x-0 group-hover:text-term-accent group-hover:opacity-100 ${
                    isActive ? 'translate-x-0 text-term-accent opacity-100' : '-translate-x-2'
                  }`}
                >
                  {link.label}
                </span>

                <span className="relative flex size-2 shrink-0 items-center justify-center">
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      isActive
                        ? 'size-2.5 bg-term-accent shadow-[0_0_10px_2px] shadow-term-accent/50'
                        : 'size-2 bg-term-faint/50 group-hover:bg-term-accent/80'
                    }`}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}