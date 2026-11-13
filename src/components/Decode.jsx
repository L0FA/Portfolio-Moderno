import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "@/hooks/useInView";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FIXED = new Set([" ", ".", "·", "-", "—"]);

// Texto mono que se "decodifica" de izquierda a derecha. Pensado solo para fuentes monoespaciadas (no cambia el ancho).
export const Decode = ({ text, as = "span", className = "", onHover = false }) => {
  const Tag = as;
  const [ref, inView] = useInView();
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (prefersReducedMotion()) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const dur = 400 + text.length * 18;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const solved = Math.floor(p * text.length);
      setOut(
        [...text]
          .map((c, i) => {
            if (i < solved || FIXED.has(c)) return c;
            const r = CHARS[(Math.random() * CHARS.length) | 0];
            return c === c.toLowerCase() ? r.toLowerCase() : r;
          })
          .join(""),
      );
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    if (inView && !onHover) run();
  }, [inView, onHover, run]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <Tag ref={ref} className={className} onMouseEnter={onHover ? run : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
};
