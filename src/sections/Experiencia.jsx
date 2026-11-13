import { Decode } from "@/components/Decode";
import { useEffect, useRef } from "react";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { experiencia } from "@/data/portfolio";

// El riel se llena con el scroll; cada puesto se marca al cruzar el 60% de la pantalla. Se actualiza el DOM directo (sin re-render).
const useTimeline = () => {
  const list = useRef(null);
  const fill = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const ol = list.current;
      if (!ol) return;
      const mid = window.innerHeight * 0.6;
      const r = ol.getBoundingClientRect();
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      fill.current.style.transform = `scaleY(${p})`;
      for (const li of ol.children) {
        if (li.tagName === "LI") li.dataset.on = String(li.getBoundingClientRect().top + 40 < mid);
      }
    };
    const onScroll = () => frame || (frame = requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { list, fill };
};

export const Experiencia = () => {
  const { list, fill } = useTimeline();
  return (
    <Section id="experiencia" eyebrow="Experiencia" title="Trayectoria">
      <ol ref={list} className="relative">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-border" />
        <span
          ref={fill}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-primary"
        />
        {experiencia.map((e) => (
          <li key={e.role} className="exp-row group relative grid gap-4 py-8 pl-8 md:grid-cols-[12rem_1fr] md:gap-8 md:pl-12">
            <span
              aria-hidden="true"
              className="exp-dot absolute top-10 left-0 size-2 -translate-x-1/2 rounded-full border border-border bg-background transition-colors duration-500"
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
