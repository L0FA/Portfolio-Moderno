import { Section } from "@/components/Section";
import { stack } from "@/data/portfolio";

export const Acerca_De = () => (
  <Section id="sobre-mi" eyebrow="Sobre mí" title="Pensamiento lógico, foco en resultados concretos">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="space-y-4 text-base leading-7 text-muted-foreground">
        <p>
          Soy desarrollador Full Stack con formación en la Universidad Tecnológica Nacional y experiencia en
          administración de datos. Esa combinación me hace cuidar tanto la arquitectura interna como la experiencia de
          quien usa el producto.
        </p>
        <p>
          Me interesa que el código sea claro y fácil de mantener, y que cada decisión técnica responda a una necesidad
          real. Trabajo bien en equipo y también con autonomía en proyectos independientes.
        </p>
        <p>
          Fuera del trabajo construyo proyectos personales para probar tecnologías nuevas, y sigo de cerca el mundo del
          diseño digital, que me ayuda a unir lo técnico con lo visual.
        </p>
      </div>

      <dl className="grid gap-8 sm:grid-cols-2">
        {stack.map((s) => (
          <div key={s.area}>
            <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.area}</dt>
            <dd className="mt-4">
              <ul className="space-y-2 text-base">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </Section>
);
