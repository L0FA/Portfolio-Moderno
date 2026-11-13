import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Decode } from "@/components/Decode";
import { perfil } from "@/data/portfolio";

const navLinks = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#testimonios", label: "Testimonios" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const linkRefs = useRef({});
  const indicator = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    // Scroll-spy: la sección que cruza la mitad de la pantalla es la activa.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ["top", "contacto", ...navLinks.map((l) => l.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      io.disconnect();
    };
  }, []);

  // Mueve la línea indicadora debajo del link activo (directo al DOM, sin re-render).
  useEffect(() => {
    const bar = indicator.current;
    const link = linkRefs.current[active];
    if (!bar) return;
    if (!link) {
      bar.style.opacity = "0";
      return;
    }
    bar.style.opacity = "1";
    bar.style.width = `${link.offsetWidth}px`;
    bar.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background transition-colors ${
        scrolled || open ? "border-border" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Principal">
        <a href="#top" className="truncate font-mono text-sm font-medium tracking-tight">
          <Decode text={`${perfil.nombre} - Portfolio`} onHover />
        </a>

        <ul className="relative hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                ref={(el) => (linkRefs.current[l.href] = el)}
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`block py-2 text-sm transition-colors hover:text-foreground ${
                  active === l.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <span
            ref={indicator}
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px bg-primary opacity-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          />
        </ul>

        <div className="hidden lg:block">
          <Button href="#contacto" className="h-10">
            Contacto
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 shrink-0 p-2 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div id="menu-mobile" className="border-t border-border lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6">
            {[...navLinks, { href: "#contacto", label: "Contacto" }].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close} className="block py-3 text-base text-muted-foreground hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
