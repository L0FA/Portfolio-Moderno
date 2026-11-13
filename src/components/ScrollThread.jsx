import { useEffect, useState } from "react";
import { useScrollRail } from "@/hooks/useScrollRail";

// Hilo en el margen izquierdo que une las secciones y se llena con el scroll.
// Cada sección tiene un nodo y una rama hacia su etiqueta. Solo en pantallas ≥1280 px, donde hay margen libre.
export const ScrollThread = () => {
  const { track, fill } = useScrollRail();
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    // Centro de cada etiqueta de sección relativo a <main>. Se mide desde la <section> (nunca tiene transform):
    // el header con .reveal se desplaza y, mientras tiene transform, Chrome lo usa como offsetParent.
    const measure = () => {
      const base = main.getBoundingClientRect().top;
      const ys = [...main.querySelectorAll("section")]
        .map((s) => [s, s.querySelector("header > p:first-child")])
        .filter(([, p]) => p)
        .map(
          ([s, p]) =>
            s.getBoundingClientRect().top - base + s.clientTop + parseFloat(getComputedStyle(s).paddingTop) + p.offsetHeight / 2,
        );
      if (ys.length < 2) return;
      setLayout({ top: ys[0], height: ys.at(-1) - ys[0], marks: ys.map((y) => y - ys[0]) });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(main);
    return () => ro.disconnect();
  }, []);

  if (!layout) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 hidden xl:block"
      style={{ top: layout.top, height: layout.height }}
    >
      <div className="relative mx-auto h-full max-w-6xl">
        <div ref={track} className="absolute inset-y-0 -left-8 w-px bg-border">
          <div ref={fill} className="absolute inset-0 origin-top scale-y-0 bg-primary" />
          {layout.marks.map((y) => (
            <div key={y} className="absolute left-0" style={{ top: y }}>
              <span data-rail-marker className="rail-tick absolute top-0 left-0 h-px w-12" />
              <span data-rail-marker className="rail-dot absolute top-0 left-0 size-2 -translate-1/2 rounded-full border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
