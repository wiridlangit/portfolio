import { listTools } from '../../data';
import { SectionHeading } from '../ui/Terminal';

export default function Tools() {
  return (
    <section id="tools" className="py-16" aria-labelledby="tools-heading">
      <SectionHeading
        command="apt list --installed | grep skills"
        title="Tools I've gotten pretty comfy with"
        description="These are a few of the tools I've been playing around with while working on my projects!"
        align="left"
        className="mb-12"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listTools.map((tool) => (
          <div
            key={tool.id}
            className="panel group flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-term-accent/40"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={tool.dad}
            data-aos-once="true"
          >
            <img
              src={tool.gambar}
              alt={`${tool.nama} icon`}
              className="size-12 shrink-0 rounded-md border border-term-border bg-term-bg/60 p-1.5"
              loading="lazy"
            />
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold transition-colors group-hover:text-term-accent">
                {tool.nama}
              </h3>
              <p className="truncate font-mono text-xs text-term-faint">{tool.ket}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 id="tools-heading" className="sr-only">
        Tools
      </h2>
    </section>
  );
}
