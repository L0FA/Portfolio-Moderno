import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useInView";

const GAP = 24; // múltiplo de la escala de 4 px
const RADIUS = 160;

// Grilla de puntos que se ilumina alrededor del cursor. Escucha el puntero en el elemento padre
// y solo redibuja mientras hay movimiento: quieta no consume CPU.
export const DotGrid = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const ease = prefersReducedMotion() ? 1 : 0.18;
    const s = { x: 0, y: 0, tx: 0, ty: 0, i: 0, ti: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let colors = {};

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = { dot: cs.getPropertyValue("--color-border").trim(), hi: cs.getPropertyValue("--color-primary").trim() };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const k = s.i * Math.max(0, 1 - Math.hypot(x - s.x, y - s.y) / RADIUS);
          ctx.beginPath();
          if (k > 0.02) {
            ctx.globalAlpha = 0.3 + 0.7 * k;
            ctx.fillStyle = colors.hi;
            ctx.arc(x, y, 1 + k, 0, Math.PI * 2);
          } else {
            ctx.globalAlpha = 1;
            ctx.fillStyle = colors.dot;
            ctx.arc(x, y, 1, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      raf = 0;
      s.x += (s.tx - s.x) * ease;
      s.y += (s.ty - s.y) * ease;
      s.i += (s.ti - s.i) * ease;
      draw();
      if (Math.abs(s.tx - s.x) > 0.5 || Math.abs(s.ty - s.y) > 0.5 || Math.abs(s.ti - s.i) > 0.01) {
        raf = requestAnimationFrame(tick);
      }
    };
    const kick = () => raf || (raf = requestAnimationFrame(tick));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      s.tx = e.clientX - r.left;
      s.ty = e.clientY - r.top;
      if (s.i < 0.02) {
        // Al entrar, la luz aparece donde está el cursor en vez de viajar desde la última posición.
        s.x = s.tx;
        s.y = s.ty;
      }
      s.ti = 1;
      kick();
    };
    const onLeave = () => {
      s.ti = 0;
      kick();
    };

    readColors();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    // Al cambiar de tema, releer los colores.
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ maskImage: "radial-gradient(ellipse 80% 70% at 35% 45%, #000 40%, transparent 100%)" }}
    />
  );
};
