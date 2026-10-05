import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks, socials } from '../../constants';
import { profile } from '../../data';

const linkedin = socials.find((social) => social.id === 'linkedin');

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onResize = () => setMenuOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const handleNavClick = (event, id) => {
    setActiveSection(id);

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({ behavior: 'smooth' });
  };

  const linkClass = (id) =>
    `block rounded-md px-3 py-2 font-mono text-sm transition-all duration-200 ${
      activeSection === id
        ? 'bg-term-accent/10 text-term-accent'
        : 'text-term-muted hover:bg-term-elevated hover:text-term-text'
    }`;

  return (
    <header>
      <nav className="flex items-center justify-between gap-4 py-5" aria-label="Main navigation">
        <Link
          to="/"
          onClick={(event) => handleNavClick(event, 'home')}
          className="group flex items-center gap-2 font-mono text-base font-semibold sm:text-lg"
        >
          <span className="text-term-accent">~/</span>
          <span className="text-term-text transition-colors group-hover:text-term-accent">
            wiridlangit
          </span>
          <span className="hidden text-term-faint sm:inline">portfolio</span>
          <span className="animate-blink text-term-accent">▊</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                onClick={(event) => handleNavClick(event, link.id)}
                className={linkClass(link.id)}
                title={link.command}
                aria-current={activeSection === link.id ? 'true' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-term-accent/50 bg-term-accent/10 px-3.5 py-2.5 font-mono text-sm text-term-accent transition-all duration-200 hover:-translate-y-0.5 hover:bg-term-accent hover:text-term-bg sm:inline-flex"
            aria-label="LinkedIn profile — opens in a new tab"
          >
            <i className="ri-linkedin-fill text-base" aria-hidden="true" />
            LinkedIn
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-term-border-bright bg-term-surface/60 text-term-text transition-colors hover:border-term-accent hover:text-term-accent lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-term-border bg-term-bg/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 py-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                onClick={(event) => handleNavClick(event, link.id)}
                className={`flex items-baseline gap-3 rounded-lg px-3 py-2.5 font-mono text-sm transition-colors ${
                  activeSection === link.id
                    ? 'bg-term-accent/10 text-term-accent'
                    : 'text-term-muted hover:bg-term-elevated hover:text-term-text'
                }`}
                aria-current={activeSection === link.id ? 'true' : undefined}
              >
                <span className="text-term-accent/60">$</span>
                <span>{link.label}</span>
                <span className="ml-auto truncate text-xs text-term-faint">{link.command}</span>
              </Link>
            </li>
          ))}
          <li className="pt-2 sm:hidden">
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-term-accent/50 bg-term-accent/10 px-3 py-2.5 font-mono text-sm text-term-accent"
            >
              <i className="ri-linkedin-fill text-base" aria-hidden="true" />
              Connect on LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <span className="sr-only">
        Portfolio of {profile.name}, Information Technology graduate, now working as Product Development at Brinks.
      </span>
    </header>
  );
}
