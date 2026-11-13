import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { prefersReducedMotion } from "@/hooks/useInView";

// El tema inicial lo fija el script de index.html antes de pintar (evita el parpadeo).
const apply = (theme) => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Sin almacenamiento (modo privado): el tema dura solo esta visita.
  }
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  const toggle = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (!document.startViewTransition || prefersReducedMotion()) return apply(next);

    // Revela el tema nuevo en un círculo que crece desde el botón.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => apply(next)).ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      ),
    );
  };

  const label = theme === "dark" ? "Activar modo claro" : "Activar modo oscuro";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};
