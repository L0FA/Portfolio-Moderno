import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/useInView";

const RAMP = " .:-=+*#%@"; // de menos a más denso
const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const COLS = 44;
const DECODE_MS = 1300; // los caracteres se resuelven de arriba hacia abajo
const WIPE_MS = 700; // luego la foto real barre sobre ellos
const DELAY_MS = 350; // espera a que termine de entrar la figura

// La foto se genera primero en caracteres mono (más densos donde es más oscura) y después aparece la imagen real.
export const PortraitReveal = ({ src, alt, className = "" }) => {
  const img = useRef(null);
  const canvas = useRef(null);
  const [done, setDone] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (done) return;
    const el = img.current;
    const cv = canvas.current;
    let raf = 0;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      const W = el.clientWidth;
      const H = el.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      cv.width = W * dpr;
      cv.height = H * dpr;
      const ctx = cv.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Grilla de celdas y luminancia de cada una, recortando como object-cover (centrado).
      const cw = W / COLS;
      const ch = cw * 1.25;
      const rows = Math.ceil(H / ch);
      const nw = el.naturalWidth;
      const nh = el.naturalHeight;
      const cropW = Math.min(nw, (nh * W) / H);
      const cropH = Math.min(nh, (nw * H) / W);
      const off = document.createElement("canvas");
      off.width = COLS;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      octx.drawImage(el, (nw - cropW) / 2, (nh - cropH) / 2, cropW, cropH, 0, 0, COLS, rows);
      const px = octx.getImageData(0, 0, COLS, rows).data;
      const chars = [];
      for (let i = 0; i < COLS * rows; i++) {
        const lum = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) / 255;
        chars.push(RAMP[Math.min(RAMP.length - 1, Math.floor((1 - lum) * RAMP.length))]);
      }

      const color = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();
      ctx.font = `${Math.floor(ch * 0.9)}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      const t0 = performance.now() + DELAY_MS;

      const frame = (now) => {
        const t = Math.max(0, now - t0);
        const front = (t / DECODE_MS) * 1.2; // borde de avance, pasa un poco del final para resolver todo
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = color;
        for (let r = 0; r < rows; r++) {
          const rp = r / rows;
          if (rp > front) break;
          const resolved = rp < front - 0.2;
          for (let c = 0; c < COLS; c++) {
            const ch0 = resolved ? chars[r * COLS + c] : NOISE[(Math.random() * NOISE.length) | 0];
            if (ch0 !== " ") ctx.fillText(ch0, c * cw, r * ch);
          }
        }

        const q = Math.min(Math.max((t - DECODE_MS) / WIPE_MS, 0), 1);
        const eased = 1 - (1 - q) ** 3;
        el.style.clipPath = `inset(0 0 ${(1 - eased) * 100}% 0)`;
        if (q > 0 && q < 1) ctx.fillRect(0, eased * H, W, 1); // línea de barrido
        if (q < 1) raf = requestAnimationFrame(frame);
        else setDone(true);
      };
      raf = requestAnimationFrame(frame);
    };

    el.decode().then(start, () => setDone(true));
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [done]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!done && <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />}
      <img
        ref={img}
        src={src}
        alt={alt}
        width="640"
        height="800"
        fetchPriority="high"
        className="relative aspect-4/5 w-full object-cover"
        style={done ? undefined : { clipPath: "inset(0 0 100% 0)" }}
      />
    </div>
  );
};
