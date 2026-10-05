import { experience } from '../../data';
import { SectionHeading, Tag } from '../ui/Terminal';

const aos = {
  'data-aos': 'fade-up',
  'data-aos-duration': '800',
  'data-aos-once': 'true',
};

const kindStyles = {
  work: {
    dot: 'bg-term-accent',
    badge: 'border-term-accent/40 bg-term-accent/10 text-term-accent',
    icon: 'ri-briefcase-2-line',
  },
  organization: {
    dot: 'bg-term-amber',
    badge: 'border-term-amber/40 bg-term-amber/10 text-term-amber',
    icon: 'ri-group-line',
  },
  education: {
    dot: 'bg-term-cyan',
    badge: 'border-term-cyan/40 bg-term-cyan/10 text-term-cyan',
    icon: 'ri-graduation-cap-line',
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-16" aria-labelledby="experience-heading">
      <SectionHeading
        command="git log --author=wiridlangit"
        title="Experience & education"
        description="Where I have been, what I built there, and what I am still building."
        align="center"
        className="mb-14"
        {...aos}
      />

      <ol className="relative ml-2 border-l border-dashed border-term-border-bright sm:ml-4">
        {experience.map((entry, index) => {
          const style = kindStyles[entry.kind] ?? kindStyles.work;

          return (
            <li
              key={entry.id}
              className="relative pb-10 pl-8 last:pb-0 sm:pl-10"
              {...aos}
              data-aos-delay={index * 80}
            >
              <span
                className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-term-bg ${style.dot}`}
                aria-hidden="true"
              />

              <div className="panel rounded-xl p-5 transition-colors duration-300 hover:border-term-border-bright sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${style.badge}`}
                  >
                    <i className={style.icon} aria-hidden="true" />
                    {entry.kind}
                  </span>
                  <span className="font-mono text-xs text-term-faint">{entry.period}</span>
                  <span className="ml-auto hidden font-mono text-xs text-term-faint sm:inline">
                    {entry.location}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold sm:text-2xl">{entry.role}</h3>
                <p className="mt-1 font-mono text-sm text-term-accent">{entry.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-term-muted">{entry.summary}</p>

                {entry.points?.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {entry.points.map((point) => (
                      <li key={point.slice(0, 32)} className="flex gap-2.5 text-sm text-term-muted">
                        <span className="mt-[3px] shrink-0 text-term-accent" aria-hidden="true">
                          <i className="ri-checkbox-blank-line text-[10px]" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {entry.tags?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <h2 id="experience-heading" className="sr-only">
        Experience
      </h2>
    </section>
  );
}
