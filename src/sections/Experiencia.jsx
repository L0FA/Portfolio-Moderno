import { Decode } from "@/components/Decode";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { experiencia } from "@/data/portfolio";
import { useScrollRail } from "@/hooks/useScrollRail";

export const Experiencia = () => {
  const { track, fill } = useScrollRail();
  return (
    <Section id="experiencia" eyebrow="Experiencia" title="Trayectoria">
      <ol ref={track} className="relative">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-border" />
        <span ref={fill} aria-hidden="true" className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-primary" />
        {experiencia.map((e) => (
          <li key={e.role} className="group relative grid gap-4 py-8 pl-8 md:grid-cols-[12rem_1fr] md:gap-8 md:pl-12">
            <span
              aria-hidden="true"
              data-rail-marker
              className="rail-dot absolute top-10 left-0 size-2 -translate-x-1/2 rounded-full border"
            />
            <Decode
              as="p"
              text={e.period}
              className="font-mono text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary"
            />
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
};
