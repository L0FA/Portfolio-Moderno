import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { proyectos, redes } from "@/data/portfolio";

// Guarda la posición del cursor en variables CSS; el borde iluminado (.spotlight) la sigue.
const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

const ProjectCard = ({ p, delay }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Reveal
      as="article"
      delay={delay}
      onPointerMove={track}
      className="spotlight group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface focus-within:border-primary/40"
    >
      {/* El fondo hace de skeleton hasta que carga la imagen */}
      <div className={`aspect-video overflow-hidden border-b border-border bg-surface-2 ${loaded ? "" : "animate-pulse"}`}>
        <img
          src={p.image}
          alt={`Captura de ${p.title}`}
          loading="lazy"
          width="1280"
          height="720"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`h-full w-full object-cover object-top transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.02] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
        <p className="text-base leading-7 text-muted-foreground">{p.summary}</p>
        <ul className="space-y-2 text-sm leading-6">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span
                className="mt-2.5 h-px w-3 shrink-0 bg-primary transition-[width] duration-500 group-hover:w-4"
                aria-hidden="true"
              />
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
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1 text-primary hover:text-primary-hover"
            >
              <span className="link-draw">Ver sitio</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github size={16} /> <span className="link-draw">Código</span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
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
        {proyectos.map((p, i) => (
          <ProjectCard key={p.title} p={p} delay={(i % 2) * 100} />
        ))}
      </div>
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-12 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="link-draw">Más proyectos en GitHub</span>
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </Section>
  );
};
