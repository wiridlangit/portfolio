import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import { LinkedInButton } from '../components/ui/SocialLinks';

export default function NotFound() {
  useSeo({
    title: '404 — Page not found',
    description: 'The page you were looking for does not exist.',
  });

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center py-20">
      <div className="panel overflow-hidden rounded-xl">
        <div className="flex items-center gap-3 border-b border-term-border bg-term-bg/40 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-rose-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-term-accent/70" />
          </div>
          <p className="font-mono text-xs text-term-faint">zsh — 404</p>
        </div>

        <div className="space-y-4 p-6 font-mono text-sm leading-relaxed sm:p-10">
          <p className="text-term-accent">
            <span className="text-term-faint">sky@portfolio</span>
            <span className="text-term-muted">:</span>
            <span className="text-term-cyan">~</span>
            <span className="text-term-faint">$</span> cd {window.location.pathname}
          </p>
          <p className="text-term-muted">
            cd: no such file or directory: <span className="text-rose-400">{window.location.pathname}</span>
          </p>
          <p className="text-term-accent">
            <span className="text-term-faint">$</span> <span className="animate-blink">▊</span>
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="font-mono text-6xl font-bold text-term-accent text-glow sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This route does not exist</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-term-muted">
          The page you were looking for was moved, renamed, or never compiled. Here is the way back.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-term-accent px-4 py-2.5 font-mono text-sm font-medium text-term-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-term-accent-dim hover:text-term-text"
          >
            <i className="ri-home-4-line" aria-hidden="true" />
            Back to home
          </Link>
          <LinkedInButton variant="outline" label="Connect on LinkedIn" />
        </div>
      </div>
    </section>
  );
}
