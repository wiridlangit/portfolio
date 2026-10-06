import { profile } from '../../data';
import { resume, contact } from '../../constants';
import { useTypewriter } from '../../hooks/useTypewriter';
import { Button, StatusBadge } from '../ui/Terminal';
import CopyEmailButton from '../ui/CopyEmailButton';
import { LinkedInButton } from '../ui/SocialLinks';

const terminalLines = [
  `Hi, my name is ${profile.name}`,
  `${profile.role} — ${profile.focus.join(' · ')}`,
  `Based in ${profile.location}`,
];

export default function Hero() {
  const { completed, typed, done } = useTypewriter(terminalLines);

  const completedLines = terminalLines.slice(0, completed);

  return (
    <section
      id="home"
      className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2"
      aria-labelledby="hero-heading"
    >
      <div>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <StatusBadge label={profile.status} />
          <span className="font-mono text-xs text-term-faint">// available for new projects</span>
        </div>

        <h1 id="hero-heading" className="sr-only">
          {profile.greeting} — {profile.tagline}
        </h1>

        <div className="panel overflow-hidden rounded-xl">
          <div className="flex items-center gap-3 border-b border-term-border bg-term-bg/40 px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-rose-400/70" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-term-accent/70" />
            </div>
            <p className="truncate font-mono text-xs text-term-faint">zsh — 96×24</p>
          </div>

          <div className="min-h-40 p-5 font-mono text-sm leading-relaxed sm:p-6">
            <p className="text-term-accent">
              <span className="text-term-faint">sky@portfolio</span>
              <span className="text-term-muted">:</span>
              <span className="text-term-cyan">~</span>
              <span className="text-term-faint">$</span> whoami
            </p>
            {completedLines.map((line) => (
              <p key={line} className="text-term-text">
                {line}
              </p>
            ))}
            {!done && (
              <p className="text-term-text">
                {typed}
                <span className="animate-blink text-term-accent">▊</span>
              </p>
            )}
            {done && (
              <p className="text-term-accent">
                <span aria-hidden="true">▊</span>
                <span className="sr-only">Ready</span>
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-term-muted">{profile.intro}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkedInButton label="Connect on LinkedIn" />
          <Button href={resume.path} download={resume.fileName} variant="outline">
            <i className="ri-download-line" aria-hidden="true" />
            Download CV
          </Button>
          <Button href="#projects" variant="outline">
            View projects
            <i className="ri-arrow-down-line" aria-hidden="true" />
          </Button>
          <CopyEmailButton />
        </div>

        <p className="sr-only">
          Email: {contact.email}
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-term-accent/5 blur-2xl" aria-hidden="true" />
        <div className="panel relative overflow-hidden rounded-2xl p-3">
          <img
            src={profile.image}
            alt={`${profile.name}, ${profile.role}`}
            className="w-full rounded-xl"
            loading="eager"
          />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-3 rounded-xl border border-term-border bg-term-bg/85 px-4 py-2.5 backdrop-blur-md">
            <p className="truncate font-mono text-xs text-term-muted">
              <span className="text-term-accent">$</span> identify --self
            </p>
            <p className="shrink-0 font-mono text-xs text-term-accent">
              {profile.nickname2} · {profile.nickname1}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
