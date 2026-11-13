import { Decode } from "@/components/Decode";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { perfil, redes } from "@/data/portfolio";

const vacio = { Nombre: "", Email: "", Mensaje: "" };
const campo =
  "w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none";

export const Contacto = () => {
  const [form, setForm] = useState(vacio);
  const [estado, setEstado] = useState("idle"); // idle | enviando | ok | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setEstado("enviando");
    try {
      const { VITE_EMAILJS_SERVICE_ID: s, VITE_EMAILJS_TEMPLATE_ID: t, VITE_EMAILJS_PUBLIC_KEY: k } = import.meta.env;
      if (!s || !t || !k) throw new Error("Faltan las variables de entorno de EmailJS");
      // Las claves Nombre/Email/Mensaje deben coincidir con la plantilla de EmailJS.
      await emailjs.send(s, t, form, k);
      setForm(vacio);
      setEstado("ok");
    } catch (err) {
      console.error("EmailJS:", err);
      setEstado("error");
    }
  };

  const contactos = [
    { label: "Email", value: perfil.email, href: `mailto:${perfil.email}` },
    ...redes.map((r) => ({ label: r.label, value: r.href.replace(/^https:\/\/(www\.)?/, ""), href: r.href, ext: true })),
    { label: "Ubicación", value: perfil.ubicacion },
  ];

  return (
    <Section
      id="contacto"
      eyebrow="Contacto"
      title="¿Tenés un proyecto o una búsqueda abierta?"
      intro="Estoy disponible para posiciones full-time y proyectos freelance. Escribime por el formulario o por cualquiera de estos medios."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <dl className="space-y-6">
          {contactos.map((c) => (
            <div key={c.label}>
              <Decode as="dt" text={c.label} className="font-mono text-xs uppercase tracking-widest text-muted-foreground" />
              <dd className="mt-2 break-words text-base">
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.ext && { target: "_blank", rel: "noopener noreferrer" })}
                    className="underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <form onSubmit={onSubmit} className="space-y-6 rounded-lg border border-border bg-surface p-6 md:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Nombre</span>
              <input required autoComplete="name" value={form.Nombre} onChange={set("Nombre")} className={campo} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="nombre@empresa.com"
                value={form.Email}
                onChange={set("Email")}
                className={campo}
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Mensaje</span>
            <textarea
              required
              rows={5}
              placeholder="Contame sobre el proyecto o la posición."
              value={form.Mensaje}
              onChange={set("Mensaje")}
              className={`${campo} resize-y`}
            />
          </label>

          <Button type="submit" disabled={estado === "enviando"} className="w-full sm:w-auto">
            {estado === "enviando" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Enviando…
              </>
            ) : (
              <>
                Enviar mensaje <Send size={16} />
              </>
            )}
          </Button>

          <div aria-live="polite">
            {estado === "ok" && (
              <p className="flex items-start gap-2 text-sm text-success">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> Mensaje enviado. Te respondo a la brevedad.
              </p>
            )}
            {estado === "error" && (
              <p className="flex items-start gap-2 text-sm text-danger">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>
                  No se pudo enviar el mensaje. Escribime directamente a{" "}
                  <a href={`mailto:${perfil.email}`} className="underline underline-offset-4">
                    {perfil.email}
                  </a>
                  .
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
};
