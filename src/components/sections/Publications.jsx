import { getPrimaryPublication } from '../../data';
import { Tag } from '../ui/Terminal';

export default function Publications() {
  const publication = getPrimaryPublication();

  if (!publication) return null;

  return (
    <section
      id="publications"
      className="pb-16"
      aria-labelledby="publications-heading"
      data-aos="fade-up"
      data-aos-duration="900"
      data-aos-once="true"
    >
      <div className="relative overflow-hidden rounded-xl border border-term-accent/30 bg-term-surface/70 p-6 backdrop-blur-md transition-colors duration-300 hover:border-term-accent/60 sm:p-8">
        <div
          className="animate-glow pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-term-accent/10 blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex shrink-0 items-center gap-3 sm:block">
            <span className="inline-flex size-14 items-center justify-center rounded-xl border border-term-accent/40 bg-term-accent/10 font-mono text-xs font-bold tracking-tight text-term-accent">
              IEEE
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-term-accent sm:mt-3 sm:block">
              {publication.label}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-mono text-xs text-term-faint">
              <i className="ri-links-line" aria-hidden="true" />
              {publication.venue}
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-term-accent">
                <i className="ri-checkbox-circle-fill" aria-hidden="true" />
                peer reviewed
              </span>
            </p>

            <h3
              id="publications-heading"
              className="mt-2 text-xl/tight font-bold text-term-text sm:text-2xl"
            >
              {publication.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {publication.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-term-accent bg-term-accent px-4 py-2.5 font-mono text-sm font-medium text-term-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-term-accent-dim hover:text-term-text"
            >
              <i className="ri-file-text-line" aria-hidden="true" />
              Read on IEEE Xplore
              <i className="ri-arrow-up-right-line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
