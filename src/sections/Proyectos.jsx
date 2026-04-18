import { ArrowUpRight, Github } from "lucide-react"
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton"
import { useState } from "react";

const proyectos = [


{
    title: "JARVIS AI - Asistente HUD",
    description: `Asistente virtual de escritorio avanzado inspirado en Iron Man. 
    Desarrollado con Electron y OpenAI, cuenta con un sistema de voz 
    'Always Listening' que responde a su nombre, una interfaz HUD transparente 
    completamente táctica y un módulo de aprendizaje evolutivo que permite a la 
    IA recordar preferencias y estilos del usuario de forma persistente.`,
    image: "/projects/Jarvis.png",
    tags: ["Electron", "OpenAI", "React", "Voice HUD", "Framermotion", "Node.js"],
    link: "#",
    github: "https://github.com/L0FA/jarvis-ai"
},
{
    title: "L0FAChat - Real-time Chat",
    description: `Plataforma de comunicación en tiempo real con arquitectura cliente-servidor 
    robusta. Implementa sincronización de salas mediante Socket.io, persistencia de 
    datos distribuida en Turso (SQLite) y un sistema de música sincronizado que 
    permite a los usuarios escuchar la misma playlist en tiempo real sin latencia.`,
    image: "/projects/Whatsappnt.png",
    tags: ["React 19", "Socket.io", "Turso DB", "TailwindCSS 4", "Express", "Vite"],
    link: "https://chat.portfolioslf.com",
    github: "https://github.com/L0FA/chat-en-vivo"
},
{
    title: "Aprende Programando - LMS",
    description: `Plataforma educativa (Learning Management System) diseñada para la 
    enseñanza de programación. Incluye un sistema de gestión de cursos, lecciones 
    interactivas con soporte para Markdown, dashboards de progreso del estudiante 
    y una arquitectura escalable basada en Next.js y Prisma.`,
    image: "/projects/AprendeProgramando.png",
    tags: ["Next.js 14", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "Markdown"],
    link: "https://aprendeprogramando.portfolioslf.com",
    github: "https://github.com/L0FA/aprende-programando"
},
{
    title: "Portfolio Moderno",
    description: `Mi portfolio profesional diseñado para destacar habilidades técnicas 
    y proyectos de impacto. Con un enfoque en diseño HUD y animaciones fluidas, 
    sirve como una demostración de buenas prácticas en desarrollo frontend, 
    componentización y arquitectura modular utilizando React y TailwindCSS.`,
    image: "/projects/Portfolio.png",
    tags: ["React", "Vite", "TailwindCSS", "Node.js", "Framermotion", "Lucide React"],
    link: "https://portfolioslf.com",
    github: "https://github.com/L0FA/portfolio-moderno"
},
{
    title: "Popcorn - Movie Platform",
    description: `Aplicación de exploración de películas que permite descubrir tendencias y 
    detalles del mundo cinematográfico. Desarrollada con React y TailwindCSS, 
    prioriza la experiencia de usuario mediante una interfaz rápida, responsiva 
    y conectada a APIs externas para datos en tiempo real.`,
    image: "/projects/Popcorn.png",
    tags: ["React", "Vite", "TailwindCSS", "Integración API", "Diseño UX/UI"],
    link: "https://popcorn.portfolioslf.com",
    github: "https://github.com/L0FA/popcorn"
},

]

export const Proyectos = () => {

    const [CtaClicked, setCtaClicked] = useState(false);


    return (
        <section id="Proyectos" className="py-32 relative-overflow-hidden">

            {/* Brillos de Fondo*/}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl"/>
            <div className=" container mx-auto px-6 relative z-10">

                {/* Header de Sección */}
                <div className="text-center mx-auto max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in"> 
                        Trabajos Destacados 
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                            Proyectos que
                            <span className="font-serif italic font-normal text-white">
                                {" "}
                                 logran un impacto.
                                 </span>
                        </h2>
                        <p className="text-muted-foreground animate-fade-in animation-delay-200">
                            Una selección de mis trabajos mas recientes, desde aplicaciones web complejas
                            a herramientas innovadoras, que otorguen soluciones a problemas del día a día 
                            en nuestro mundo.
                        </p>
                </div>

                {/* Planilla de Proyectos */}
                <div className="grid md:grid-cols-2 gap-8">
                    {proyectos.map((project, idx) => (
                        <div
                         key={idx}
                          className="group glass rounded 2xl overflow-hidden animate-fade-in md:row-span-1"
                          style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                          >
                            
                            
                            {/* Imagenes */}
                        <div className="relative overflow-hidden aspect-video">
                        <img
                         src={project.image}
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                        <div
                        className="absolute inset-0 bg-linear-to-t
                         from-card via-card/50 to-transparent opacity-60"
                        />
                        {/* Links de Overlay */}
                        <div className="absolute inset-0 flex items-center 
                        justify-center gap-4 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300">
                            <a 
                            href={project.link} 
                            className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </a>
                            <a 
                            href={project.github}
                            className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <h3 className="text-xl font-semibold
                             group-hover:text-primary transition-colors">{project.title}</h3>
                            <ArrowUpRight
                            className="w-5 h-5text-muted-foreground
                             group-hover:text-primary group-hover:translate-x-1
                              group:hover:-translate-y-1 transition-all" 
                              
                              />
                        </div>
                        <p className="text-muted-foreground text-sm">
                            {project.description}
                            </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIdx) => (
                        <span
                         key={tagIdx}
                         className="px-4 py-1.5 rounded-full
                          bg-surface text-xs font-medium border 
                          border-border/50 text-muted-foreground
                           hover:border-primary/50 hover:text-primary
                            transition-all duration-300"
                            >
                                {tag}
                                </span>
                        ))}
                        </div>
                        </div>
                        </div>
                    ))}
                </div>

{/* Ver Todos CTA */}
<div
  className="text-center mt-12"
>
  {!CtaClicked && (
    <div
      onClick={() => {
        setCtaClicked(true); // inicia fade-out
        const el = document.getElementById("Proyectos");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });

        // Opcional: acción extra después del fade
        setTimeout(() => {
          console.log("Botón oculto completamente");
        }, 500); // coincide con duration-500
      }}
      className="inline-flex w-full justify-center items-center cursor-pointer touch-manipulation"
    >
      <AnimatedBorderButton
        className={`transition-opacity duration-500 ${
          CtaClicked ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        Ver Todos Los Proyectos
        <ArrowUpRight className="w-5 h-5 ml-2" />
      </AnimatedBorderButton>
    </div>
  )}
</div>



                </div>
        </section>
    );
};
