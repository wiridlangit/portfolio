import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById, listProyek } from '../data';
import { resume } from '../constants';
import useSeo from '../hooks/useSeo';
import Lightbox from '../components/ui/Lightbox';
import { Tag, Button } from '../components/ui/Terminal';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = useMemo(() => getProjectById(id), [id]);
  const [zoomed, setZoomed] = useState(null);

  useSeo({
    title: project ? project.nama : 'Project not found',
    description: project ? project.desk : 'This project could not be found.',
    type: 'article',
  });

  if (!project) {
    return (
      <div className="panel mx-auto mt-24 max-w-2xl rounded-xl p-8 text-center">
        <p className="font-mono text-sm text-term-accent">
          <span className="text-term-faint">$</span> find project --id {id}
        </p>
        <p className="mt-3 text-term-muted">bash: project not found</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-term-accent hover:underline"
        >
          <i className="ri-arrow-left-line" aria-hidden="true" />
          back to home
        </Link>
      </div>
    );
  }

  const gallery = project.gallery?.length ? project.gallery : [project.gambar];

  return (
    <article className="mx-auto mt-12 max-w-4xl pb-8">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 font-mono text-sm text-term-muted transition-colors hover:text-term-accent"
      >
        <i className="ri-arrow-left-line" aria-hidden="true" />
        back to projects
      </Link>

      <div className="panel mt-6 overflow-hidden rounded-xl">
        <div className="flex items-center gap-3 border-b border-term-border bg-term-bg/40 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-rose-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-term-accent/70" />
          </div>
          <p className="truncate font-mono text-xs text-term-faint">
            projects/{String(project.id).padStart(2, '0')}/README.md
          </p>
        </div>

        <div className="p-6 sm:p-10">
          <span className="inline-flex rounded-md border border-term-accent/40 bg-term-accent/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-term-accent">
            {project.domain}
          </span>

          <h1 className="mt-4 text-3xl/tight font-bold sm:text-4xl">{project.nama}</h1>
          <p className="mt-3 text-base text-term-muted">{project.desk}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setZoomed({ image, title: project.nama })}
                className="block w-full overflow-hidden rounded-lg border border-term-border transition-all duration-300 hover:border-term-accent/50"
                aria-label={`Enlarge image ${index + 1} of ${project.nama}`}
              >
                <img
                  src={image}
                  alt={`${project.nama} image ${index + 1}`}
                  className="w-full"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-term-border bg-term-bg/40 p-5">
            <p className="font-mono text-xs text-term-faint">## details</p>
            <p className="mt-3 text-base leading-relaxed text-term-muted">
              {project.deskripsiDetail || project.desk}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-term-border pt-6">
            <Link
              to="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-term-border-bright bg-term-surface/60 px-4 py-2.5 font-mono text-sm text-term-text transition-all duration-200 hover:-translate-y-0.5 hover:border-term-accent hover:text-term-accent"
            >
              <i className="ri-arrow-left-line" aria-hidden="true" />
              All projects
            </Link>
            <Button href={resume.path} download={resume.fileName} variant="ghost">
              <i className="ri-download-line" aria-hidden="true" />
              Download CV
            </Button>
            <p className="ml-auto font-mono text-xs text-term-faint">{listProyek.length} projects total</p>
          </div>
        </div>
      </div>

      <Lightbox
        open={Boolean(zoomed)}
        onClose={() => setZoomed(null)}
        title={zoomed?.title}
        image={zoomed?.image}
      />
    </article>
  );
}
