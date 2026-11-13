import { Decode } from "@/components/Decode";
import { Reveal } from "@/components/Reveal";

export const Section = ({ id, eyebrow, title, intro, children, className = "" }) => (
  <section id={id} className={`border-t border-border py-24 md:py-32 ${className}`}>
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal as="header" className="mb-12 max-w-2xl md:mb-16">
        <Decode as="p" text={eyebrow} className="font-mono text-xs uppercase tracking-widest text-primary" />
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
        {intro && <p className="mt-4 text-base leading-7 text-muted-foreground">{intro}</p>}
      </Reveal>
      {children}
    </div>
  </section>
);
