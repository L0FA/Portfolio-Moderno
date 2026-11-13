import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { testimonios } from "@/data/portfolio";

const iniciales = (nombre) =>
  nombre
    .split(" ")
    .filter((w) => /^[A-ZÁÉÍÓÚ]/.test(w) && !w.endsWith("."))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

export const Testimonios = () => (
  <Section id="testimonios" eyebrow="Testimonios" title="Lo que dicen quienes trabajaron conmigo">
    <div className="grid gap-6 md:grid-cols-2">
      {testimonios.map((t, i) => (
        <Reveal as="figure" delay={(i % 2) * 100} key={t.author} className="flex flex-col justify-between gap-8 rounded-lg border border-border bg-surface p-6 md:p-8">
          <blockquote className="text-base leading-7">“{t.quote}”</blockquote>
          <figcaption className="flex items-center gap-4">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 font-mono text-xs text-primary"
              aria-hidden="true"
            >
              {iniciales(t.author)}
            </span>
            <span>
              <span className="block text-sm font-medium">{t.author}</span>
              <span className="block text-sm text-muted-foreground">{t.role}</span>
            </span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  </Section>
);
