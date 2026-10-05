const trafficLights = ['bg-rose-400/70', 'bg-amber-400/70', 'bg-term-accent/70'];

export function TerminalCard({ label, icon, actions, children, className = '', bodyClassName = '', ...rest }) {
  return (
    <div
      className={`panel overflow-hidden rounded-xl transition-colors duration-300 hover:border-term-border-bright ${className}`}
      {...rest}
    >
      {(label || actions) && (
        <div className="flex items-center gap-3 border-b border-term-border bg-term-bg/40 px-4 py-2.5">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            {trafficLights.map((color) => (
              <span key={color} className={`size-2.5 rounded-full ${color}`} />
            ))}
          </div>
          {label && (
            <p className="truncate font-mono text-xs text-term-faint">
              {icon && <span className="mr-2 text-term-accent/70">{icon}</span>}
              {label}
            </p>
          )}
          {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={`p-5 sm:p-6 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

export function SectionHeading({ command, title, description, align = 'center', className = '', ...rest }) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`} {...rest}>
      {command && (
        <div className={`mb-3 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
          <span className="animate-blink text-term-accent">$</span>
          <span className="font-mono text-sm text-term-muted">{command}</span>
        </div>
      )}
      <h2 className="text-3xl/tight font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className={`mt-4 text-base/relaxed text-term-muted ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-term-border bg-term-elevated px-2.5 py-1 font-mono text-xs text-term-muted transition-colors hover:border-term-accent-dim hover:text-term-accent ${className}`}
    >
      {children}
    </span>
  );
}

export function Button({ variant = 'primary', className = '', children, ...rest }) {
  const variants = {
    primary:
      'bg-term-accent text-term-bg hover:bg-term-accent-dim hover:text-term-text border border-term-accent',
    outline: 'border border-term-border-bright bg-term-surface/60 text-term-text hover:border-term-accent hover:text-term-accent',
    ghost: 'text-term-muted hover:text-term-accent border border-transparent',
  };

  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function StatusBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-term-accent-dim/60 bg-term-accent/10 px-3 py-1.5 font-mono text-xs text-term-accent">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-term-accent opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-term-accent" />
      </span>
      {label}
    </span>
  );
}
