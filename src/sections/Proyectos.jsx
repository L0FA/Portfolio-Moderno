import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { proyectos, redes } from "@/data/portfolio";

const ProjectCard = ({ p }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-primary/40">
      {/* El fondo hace de skeleton hasta que carga la imagen */}
      <div className={`aspect-video border-b border-border bg-surface-2 ${loaded ? "" : "animate-pulse"}`}>
        <img
          src={p.image}
          alt={`Captura de ${p.title}`}
          loading="lazy"
          width="1280"
          height="720"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`h-full w-full object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
        <p className="text-base leading-7 text-muted-foreground">{p.summary}</p>
        <ul className="space-y-2 text-sm leading-6">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-2.5 h-px w-3 shrink-0 bg-primary" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>

        <div className="mt-auto flex gap-6 pt-2 text-sm font-medium">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:text-primary-hover">
              Ver sitio <ArrowUpRight size={16} />
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Github size={16} /> Código
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const Proyectos = () => {
  const github = redes.find((r) => r.label === "GitHub").href;
  return (
    <Section
      id="proyectos"
      eyebrow="Proyectos"
      title="Trabajo reciente"
      intro="Aplicaciones que diseñé y desarrollé de punta a punta: arquitectura, backend, interfaz y deploy."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {proyectos.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Más proyectos en GitHub <ArrowUpRight size={16} />
      </a>
    </Section>
  );
};
