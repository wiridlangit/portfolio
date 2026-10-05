import { Link } from 'react-router-dom';
import { navLinks, socials, contact } from '../../constants';
import CopyEmailButton from '../ui/CopyEmailButton';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToSection = (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="mt-32 border-t border-term-border pb-10 pt-12">
      <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-mono text-lg font-semibold">
            <span className="text-term-accent">~/</span>wiridlangit
          </p>
          <p className="mt-4 text-sm leading-relaxed text-term-muted">
            Building things that sense, think and talk.
          </p>
          <p className="mt-3 font-mono text-xs text-term-faint">{contact.location}</p>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs tracking-wide text-term-faint">// navigation</p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  onClick={(event) => scrollToSection(event, link.id)}
                  className="font-mono text-sm text-term-muted transition-colors hover:text-term-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-xs">
          <p className="mb-4 font-mono text-xs tracking-wide text-term-faint">// find me</p>
          <ul className="space-y-3">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex max-w-full items-center gap-2 font-mono text-sm text-term-muted transition-colors hover:text-term-accent"
                >
                  <i className={`${social.icon} text-base`} aria-hidden="true" />
                  <span className="shrink-0 text-term-text group-hover:text-term-accent">
                    {social.label}
                  </span>
                  <span className="truncate text-xs text-term-faint">{social.handle}</span>
                  <i
                    className="ri-arrow-up-right-line shrink-0 text-xs text-term-faint transition-colors group-hover:text-term-accent"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
          <CopyEmailButton className="mt-5 w-full" label="Copy email address" />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-2 border-t border-term-border pt-8 text-center">
        <p className="font-mono text-xs text-term-faint">
          <span className="text-term-accent">$</span> echo &quot;Built with React, Tailwind &amp; curiosity&quot;
        </p>
        <p className="font-mono text-sm text-term-muted">
          Wiridlangit Portfolio <span aria-hidden="true">😁✌️</span> {year}
        </p>
      </div>
    </footer>
  );
}
