import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { experiencia } from "@/data/portfolio";

export const Experiencia = () => (
  <Section id="experiencia" eyebrow="Experiencia" title="Trayectoria">
    <ol className="divide-y divide-border border-y border-border">
      {experiencia.map((e) => (
        <li key={e.role} className="grid gap-4 py-8 md:grid-cols-[12rem_1fr] md:gap-8">
          <p className="font-mono text-sm text-muted-foreground">{e.period}</p>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{e.role}</h3>
            <p className="mt-1 text-base text-primary">{e.company}</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{e.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
              {e.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);
