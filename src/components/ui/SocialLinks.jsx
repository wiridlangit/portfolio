import { socials } from '../../constants';

export function SocialIconLink({ social, className = '', showLabel = false }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-sm transition-all duration-200 hover:-translate-y-0.5 ${
        social.accent
          ? 'border-term-accent/40 bg-term-accent/10 text-term-accent hover:bg-term-accent hover:text-term-bg'
          : 'border-term-border-bright bg-term-surface/60 text-term-muted hover:border-term-accent hover:text-term-accent'
      } ${className}`}
      aria-label={`${social.label} — opens in a new tab`}
    >
      <i className={`${social.icon} text-base`} aria-hidden="true" />
      {showLabel && <span>{social.label}</span>}
    </a>
  );
}

export default function SocialLinks({ showLabel = false, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socials.map((social) => (
        <SocialIconLink key={social.id} social={social} showLabel={showLabel} />
      ))}
    </div>
  );
}

export function LinkedInButton({ variant = 'primary', className = '', label = 'Connect on LinkedIn' }) {
  const linkedin = socials.find((social) => social.id === 'linkedin');

  const variants = {
    primary: 'bg-term-accent text-term-bg hover:bg-term-accent-dim hover:text-term-text',
    outline: 'border border-term-border-bright bg-term-surface/60 text-term-text hover:border-term-accent hover:text-term-accent',
  };

  return (
    <a
      href={linkedin.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-term-accent px-4 py-2.5 font-mono text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      <i className="ri-linkedin-fill text-base" aria-hidden="true" />
      {label}
      <i className="ri-arrow-up-right-line text-sm" aria-hidden="true" />
    </a>
  );
}
