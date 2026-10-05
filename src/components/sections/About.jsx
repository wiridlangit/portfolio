import { profile } from '../../data';
import { SectionHeading, TerminalCard, Tag } from '../ui/Terminal';

const aos = {
  'data-aos': 'fade-up',
  'data-aos-duration': '800',
  'data-aos-once': 'true',
};

export default function About() {
  return (
    <section id="about" className="py-16" aria-labelledby="about-heading">
      <SectionHeading
        command="cat about.md"
        title="A little about me"
        align="left"
        {...aos}
        className="mb-10"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <TerminalCard
          label="~/about/profile"
          icon="ri-user-3-line"
          className="lg:col-span-2"
          {...aos}
          bodyClassName="space-y-5"
        >
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-term-muted">
              {paragraph}
            </p>
          ))}

          <div className="flex flex-wrap gap-2 pt-2">
            {profile.focus.map((item) => (
              <Tag key={item}>#{item.replace(/\s+/g, '').toLowerCase()}</Tag>
            ))}
          </div>
        </TerminalCard>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <TerminalCard label="~/about/at-a-glance" icon="ri-eye-line" {...aos}>
            <dl className="space-y-4">
              <div>
                <dt className="font-mono text-xs text-term-faint">status</dt>
                <dd className="mt-1 text-sm text-term-accent">{profile.status}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-term-faint">role</dt>
                <dd className="mt-1 text-sm text-term-text">{profile.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-term-faint">based in</dt>
                <dd className="mt-1 text-sm text-term-text">{profile.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-term-faint">focus</dt>
                <dd className="mt-1 text-sm text-term-text">{profile.focus.join(' · ')}</dd>
              </div>
            </dl>
          </TerminalCard>

          <TerminalCard label="~/about/values" icon="ri-heart-3-line" {...aos}>
            <ul className="space-y-3 text-sm text-term-muted">
              <li className="flex gap-2">
                <span className="text-term-accent" aria-hidden="true">
                  ▸
                </span>
                 Build AI for the device it actually needs to run on.
              </li>
              <li className="flex gap-2">
                <span className="text-term-accent" aria-hidden="true">
                  ▸
                </span>
                Test performance where real-world conditions can break it.
              </li>
              <li className="flex gap-2">
                <span className="text-term-accent" aria-hidden="true">
                  ▸
                </span>
                Turn technical problems into reliable products.
              </li>
            </ul>
          </TerminalCard>
        </div>
      </div>

      <h2 id="about-heading" className="sr-only">
        About
      </h2>
    </section>
  );
}
