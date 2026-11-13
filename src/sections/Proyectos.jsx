import { ArrowUpRight, Github, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Decode } from "@/components/Decode";
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

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Más reciente primero. "AAAA-MM-DD" se interpreta en UTC, por eso el formato también usa UTC.
const ordenados = [...proyectos].sort((a, b) => b.fecha.localeCompare(a.fecha));
const mesAnio = new Intl.DateTimeFormat("es-AR", { month: "short", year: "numeric", timeZone: "UTC" });

const ProjectCard = ({ p, delay }) => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false); // en pantallas táctiles el overlay se abre tocando la imagen
  const hasLinks = Boolean(p.demo || p.repo);

  return (
    <Reveal
      as="article"
      delay={delay}
      onPointerMove={track}
      className="spotlight group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface focus-within:border-primary/40"
    >
      {/* El fondo hace de skeleton hasta que carga la imagen */}
      <div
        className={`group/img relative aspect-video overflow-hidden border-b border-border bg-surface-2 ${
          loaded ? "" : "animate-pulse"
        } ${hasLinks ? "cursor-pointer" : ""}`}
        onClick={hasLinks ? () => setOpen((v) => !v) : undefined}
      >
        <img
          src={p.image}
          alt={`Captura de ${p.title}`}
          loading="lazy"
          width="1280"
          height="720"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`h-full w-full object-cover object-top transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.02] ${
            loaded ? "opacity-100" : "opacity-0"
          } ${open ? "blur-[2px]" : "group-hover/img:blur-[2px]"}`}
        />

        {hasLinks && (
          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 bg-background/70 transition-opacity duration-300 group-hover/img:pointer-events-auto group-hover/img:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100 ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {p.demo && (
              <Button href={p.demo} {...ext} className="group/btn translate-y-1 transition-[transform,background-color] duration-300 group-hover/img:translate-y-0">
                Ver sitio
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            )}
            {p.repo && (
              <Button
                href={p.repo}
                {...ext}
                variant="secondary"
                className="translate-y-1 bg-surface transition-[transform,background-color,border-color] delay-75 duration-300 group-hover/img:translate-y-0"
              >
                <Github size={16} /> Código
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
            <Decode text={mesAnio.format(new Date(p.fecha))} />
            {p.status && (
              <>
                <span aria-hidden="true">·</span>
                <Lock size={12} aria-hidden="true" />
                <Decode text={p.status} />
              </>
            )}
          </p>
          <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
        </div>
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

        {hasLinks && (
          <div className="mt-auto flex gap-6 pt-2 text-sm font-medium">
            {p.demo && (
              <a href={p.demo} {...ext} className="group/link inline-flex items-center gap-1 text-primary hover:text-primary-hover">
                <span className="link-draw">Ver sitio</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            )}
            {p.repo && (
              <a href={p.repo} {...ext} className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Github size={16} /> <span className="link-draw">Código</span>
              </a>
            )}
          </div>
        )}
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
        {ordenados.map((p, i) => (
          <ProjectCard key={p.title} p={p} delay={(i % 2) * 100} />
        ))}
      </div>
      <a
        href={github}
        {...ext}
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
