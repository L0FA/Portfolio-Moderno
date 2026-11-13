import { perfil, redes } from "@/data/portfolio";

export const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>
        © {new Date().getFullYear()} {perfil.nombre}
      </p>
      <ul className="flex gap-6">
        {redes.map((r) => (
          <li key={r.label}>
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              {r.label}
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${perfil.email}`} className="hover:text-foreground">
            Email
          </a>
        </li>
      </ul>
    </div>
  </footer>
);
