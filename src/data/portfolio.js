// Todo el contenido del sitio vive acá. Para sumar un proyecto, agregá un objeto a `proyectos`
// y su captura (16:9, .webp) en /public/projects. `demo` y `repo` son opcionales: si faltan, el link no se muestra.
// `status` (opcional) es una etiqueta para proyectos sin link público, por ejemplo "En desarrollo · repo privado".

export const perfil = {
  nombre: "Santiago López Fabbri",
  rol: "Desarrollador Full Stack",
  ubicacion: "Buenos Aires, Argentina",
  email: "santiagolopez@portfolioslf.com",
  cv: "/CVSLF.pdf",
};

export const redes = [
  { label: "GitHub", href: "https://github.com/L0FA" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/santiago-lopez-fabbri/" },
];

export const proyectos = [
  {
    title: "Aprende Programando",
    summary:
      "Plataforma gratuita para aprender programación desde cero, con cursos de Frontend, Backend y Videojuegos.",
    highlights: [
      "Lecciones en Markdown y seguimiento de progreso por estudiante",
      "Sistema de XP y niveles para sostener la constancia",
      "API REST en Express con autenticación JWT y rate limiting",
    ],
    tags: ["Next.js", "React", "Express", "Prisma", "Turso", "Tailwind CSS"],
    image: "/projects/aprende-programando.webp",
    demo: "https://www.aprendeprogramando.portfolioslf.com",
    repo: "https://github.com/L0FA/aprende-programando",
  },
  {
    title: "Hide",
    summary:
      "Red social anónima para iOS, Android y web: cada persona es solo un alias. Una única app hecha con Expo.",
    highlights: [
      "Chats 1 a 1 que se autodestruyen: el servidor fija la caducidad y un cron los borra",
      "Historias de 24 h visibles solo para seguidores, con vistas opcionales",
      "Seguridad en Postgres con RLS, cubierta por tests de privacidad automatizados",
    ],
    tags: ["Expo", "React Native", "Supabase", "PostgreSQL", "Expo Router", "Leaflet"],
    image: "/projects/hide.webp",
    status: "En desarrollo · repo privado",
  },
  {
    title: "L0FAChat",
    summary:
      "Chat en tiempo real con salas sincronizadas y reproducción de música compartida entre usuarios.",
    highlights: [
      "Sincronización de salas y mensajes con Socket.io",
      "Persistencia en Turso (SQLite distribuido)",
      "Playlist compartida: todos escuchan lo mismo al mismo tiempo",
    ],
    tags: ["React 19", "Socket.io", "Express", "Turso", "Tailwind CSS 4", "Vite"],
    image: "/projects/l0fachat.webp",
    repo: "https://github.com/L0FA/chat-en-vivo",
  },
  {
    title: "Popcorn",
    summary:
      "Aplicación para explorar películas, ver tendencias y guardar favoritas, conectada a una API externa.",
    highlights: [
      "Búsqueda y detalle de películas con datos en tiempo real",
      "Lista de favoritas persistente",
      "Interfaz responsive pensada primero para mobile",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "API REST"],
    image: "/projects/popcorn.webp",
    demo: "https://popcorn.portfolioslf.com",
    repo: "https://github.com/L0FA/popcorn",
  },
  {
    title: "Portfolio",
    summary:
      "Este sitio. Contenido separado de la presentación para poder sumar proyectos sin tocar componentes.",
    highlights: [
      "Sistema de diseño propio: escala de 4 px, un radio, una paleta",
      "Formulario de contacto con EmailJS y estados de carga y error",
      "Metadatos, Open Graph y diseño responsive",
    ],
    tags: ["React 19", "Vite", "Tailwind CSS 4", "EmailJS"],
    image: "/projects/portfolio.webp",
    demo: "https://portfolioslf.com",
    repo: "https://github.com/L0FA/Portfolio-Moderno",
  },
];

export const stack = [
  { area: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML y CSS"] },
  { area: "Backend", items: ["Node.js", "Express", "Socket.io", "Prisma", "APIs REST", "JWT"] },
  { area: "Datos", items: ["MySQL", "MongoDB", "SQLite / Turso", "Excel avanzado"] },
  { area: "Herramientas", items: ["Git", "GitHub Actions", "Vite", "Python"] },
];

export const experiencia = [
  {
    period: "2025 — Presente",
    role: "Desarrollador Full Stack Freelance",
    company: "Independiente",
    description:
      "Desarrollo de sitios y aplicaciones a medida para clientes, desde la planificación hasta el deploy, integrando frontend y backend.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  },
  {
    period: "2024 — 2025",
    role: "Administrador de Datos",
    company: "Administración Mabresama",
    description:
      "Administración, documentación y mantenimiento de información sensible en bases de datos locales y en servidor.",
    technologies: ["MySQL", "MongoDB", "AdminProp", "Excel", "Node.js", "Git"],
  },
  {
    period: "2023 — 2024",
    role: "Diplomatura en Desarrollo Web Full Stack",
    company: "Universidad Tecnológica Nacional — FRBA",
    description: "Formación en desarrollo Front-End y Back-End.",
    technologies: ["React", "TypeScript", "Next.js", "Angular", "Node.js", "Express", "MongoDB", "Python"],
  },
  {
    period: "2022 — 2023",
    role: "Data Entry y mapas virtuales",
    company: "Atom Protect",
    description:
      "Gestión de datos y construcción de mapas de sucursales con la API de Google Maps, optimizando flujos de trabajo y la integridad de la información geoespacial.",
    technologies: ["Google Maps API", "MySQL", "Excel", "Google Sheets", "Python"],
  },
];

// Citas textuales: no editar sin autorización de cada persona.
export const testimonios = [
  {
    quote:
      "Trabajar con Santiago fue una experiencia excelente. Supo entender nuestras necesidades desde el primer momento y transformar nuestras ideas en un sitio funcional y moderno. Su conocimiento técnico y su capacidad para organizar la información hicieron que todo el proyecto se realizara de forma rápida y eficiente.",
    author: "Pablo Guillermo Lopez",
    role: "Cliente",
  },
  {
    quote:
      "Santiago hizo un trabajo excepcional organizando nuestros mapas globales y creando sucursales de manera eficiente usando la API de Google Maps. Su conocimiento técnico y autonomía hicieron que los procesos que antes eran lentos se agilizaran significativamente.",
    author: "Magalí Gonzalez",
    role: "Atom Protect",
  },
  {
    quote:
      "Santiago se destacó por su organización y precisión en la gestión de nuestra documentación y bases de datos. Su capacidad para sistematizar información y mantener todo actualizado nos facilitó mucho el trabajo diario.",
    author: "Adriana J. Kirzner",
    role: "Administración Mabresama",
  },
  {
    quote:
      "Con Santiago siempre tuvimos la tranquilidad de que los datos estaban correctos y accesibles. Su atención al detalle y rapidez en la gestión de información hicieron que nuestro equipo trabajara de forma más eficiente.",
    author: "Alejandra Kirzner",
    role: "Administración Mabresama",
  },
];
