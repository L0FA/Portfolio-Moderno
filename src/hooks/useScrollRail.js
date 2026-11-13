import { useEffect, useRef } from "react";

// Riel que se llena con el scroll: `track` es la línea, `fill` su relleno.
// Los elementos con [data-rail-marker] dentro de `track` reciben data-on="true" al cruzar el 60% de la pantalla.
// Se escribe el DOM directo (sin re-render) y se agrupa en un frame por scroll.
export const useScrollRail = () => {
  const track = useRef(null);
  const fill = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = track.current;
      if (!el || !fill.current) return;
      const mid = window.innerHeight * 0.6;
      const r = el.getBoundingClientRect();
      const p = r.height ? Math.min(Math.max((mid - r.top) / r.height, 0), 1) : 0;
      fill.current.style.transform = `scaleY(${p})`;
      el.querySelectorAll("[data-rail-marker]").forEach((m) => {
        m.dataset.on = String(m.getBoundingClientRect().top < mid);
      });
    };
    const schedule = () => frame || (frame = requestAnimationFrame(update));
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { track, fill };
};
