import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Proyectos } from "@/sections/Proyectos";
import { Experiencia } from "@/sections/Experiencia";
import { Acerca_De } from "@/sections/Acerca_De";
import { Testimonios } from "@/sections/Testimonios";
import { Contacto } from "@/sections/Contacto";

const App = () => (
  <>
    <a href="#proyectos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
      Saltar al contenido
    </a>
    <Navbar />
    <main>
      <Hero />
      <Proyectos />
      <Experiencia />
      <Acerca_De />
      <Testimonios />
      <Contacto />
    </main>
    <Footer />
  </>
);

export default App;
