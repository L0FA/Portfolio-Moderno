import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Decode } from "@/components/Decode";
import { DotGrid } from "@/components/DotGrid";
import { PortraitReveal } from "@/components/PortraitReveal";
import { perfil, redes } from "@/data/portfolio";

const iconos = { GitHub: Github, LinkedIn: Linkedin };
const titulo = "Construyo aplicaciones web completas, del modelo de datos a la interfaz.";
const hora = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Argentina/Buenos_Aires",
});

const useHoraBA = () => {
  const [now, setNow] = useState(() => hora.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(hora.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return now;
};

export const Hero = () => {
  const horaBA = useHoraBA();
  return (
    <section id="top" className="relative pt-16">
      <DotGrid />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          <Decode
            as="p"
            text={`${perfil.rol} · ${perfil.ubicacion}`}
            className="font-mono text-xs uppercase tracking-widest text-primary"
          />
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl">
            <span className="sr-only">{titulo}</span>
            {/* Entrada palabra por palabra; el texto real va en sr-only para lectores de pantalla */}
            <span aria-hidden="true">
              {titulo.split(" ").map((w, i) => (
                <span key={i}>
                  <span className="animate-rise inline-block" style={{ animationDelay: `${120 + i * 45}ms` }}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            </span>
          </h1>
          <div className="animate-rise [animation-delay:600ms]">
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Soy {perfil.nombre}. Trabajo con React, Next.js, Node.js y bases de datos SQL y NoSQL. Me formé en la UTN y
              vengo de la gestión de datos, algo que hoy aplico a diseñar backends ordenados y confiables.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#proyectos" className="group">
                Ver proyectos <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
              <Button href={perfil.cv} variant="secondary" download className="group">
                <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" /> Descargar CV
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {redes.map((r) => {
                const Icon = iconos[r.label];
                return (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                    >
                      <Icon size={16} /> <span className="link-draw">{r.label}</span>
                    </a>
                  </li>
                );
              })}
              <li>
                <a href={`mailto:${perfil.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                  <Mail size={16} /> <span className="link-draw">{perfil.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <figure className="animate-rise mx-auto w-full max-w-xs [animation-delay:300ms] lg:max-w-none">
          <PortraitReveal
            src="/Perfil.jpeg"
            alt={`Retrato de ${perfil.nombre}`}
            className="rounded-lg border border-border bg-surface"
          />
          <figcaption className="mt-4 space-y-1 text-sm">
            <span className="flex items-center gap-2 text-foreground">
              <span className="size-2 rounded-full bg-success" aria-hidden="true" />
              Disponible para full-time y freelance
            </span>
            <span className="block pl-4 font-mono text-xs text-muted-foreground">
              Buenos Aires · <time>{horaBA}</time> (GMT-3)
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
