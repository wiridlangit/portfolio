import { Link } from 'react-router-dom';
import { listProyek } from '../../data';
import { SectionHeading, Tag } from '../ui/Terminal';

export default function Projects() {
  return (
    <section id="projects" className="py-16" aria-labelledby="projects-heading">
      <SectionHeading
        command="ls -la projects/"
        title="Projects"
        description="Here are some of the projects I've worked on so far!"
        align="center"
        className="mb-14"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {listProyek.map((project) => (
          <article
            key={project.id}
            className="panel group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-term-accent/40"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={project.dad}
            data-aos-once="true"
          >
            <div className="relative overflow-hidden border-b border-term-border bg-term-bg/50">
              <img
                src={project.gambar}
                alt={`${project.nama} screenshot`}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-3 top-3 rounded-md border border-term-border bg-term-bg/85 px-2 py-0.5 font-mono text-[11px] text-term-accent backdrop-blur-sm">
                {project.domain}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-term-accent">
                {project.nama}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-term-muted">{project.desk}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-term-border pt-4 font-mono text-xs">
                <span className="text-term-faint">dir: projects/{String(project.id).padStart(2, '0')}</span>
                <Link
                  to={`/project/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-term-accent transition-colors hover:text-term-text"
                  aria-label={`View details of ${project.nama}`}
                >
                  details <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
    </section>
  );
}
