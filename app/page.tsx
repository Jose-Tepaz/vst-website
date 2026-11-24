import { PinBottom } from "@/components/pin-bottom";
import { HeroMockup } from "@/components/hero-mockup";
import { Studio } from "@/components/studio";
import { ProjectShowcase } from "@/components/project-showcase";
import { Menu, Motion } from "@/components/interactions";
import { Services } from "@/components/services";
import { Faq } from "@/components/faq";
import { Team } from "@/components/team";
import { ContactFooter } from "@/components/contact-footer";
import { BuildProcess } from "@/components/build-process";
import { Arrow } from "@/components/arrow";
import { Roll } from "@/components/roll";

function Logo() {
  return <a className="logo" href="#inicio" aria-label="Vástago Studio, inicio"><span className="monogram">VST</span><span className="logotype">Vástago<span>Studio</span></span></a>;
}

// Vástago lleva más de 4 años en 2026: se cuenta desde 2022 para que la cifra no se quede vieja.
// Se calcula al construir el sitio, así que sube sola con cada publicación.
const yearsActive = new Date().getFullYear() - 2022;

export default function Home() {
  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <Menu><Logo /></Menu>
    <main id="contenido">
      <section id="inicio" className="hero hero-with-ribbon" aria-labelledby="hero-title">
        <div className="hero-content wrap">
        <h1 id="hero-title">Del diseño<br /><span className="hl">al despliegue.</span></h1>
        <div className="hero-bottom">
          <p>Somos Vástago. Un estudio boutique de diseño y desarrollo de software. Creamos productos digitales, de la primera idea a las personas que los usan.</p>
          <a className="cta hero-cta" href="#contacto"><Roll>Cuéntanos tu proyecto</Roll> <Arrow /></a>
        </div>
          <HeroMockup />
        </div>
      </section>

      <div className="cover-stack">
      <section id="proyectos" className="work wrap" aria-labelledby="work-title">
        <ProjectShowcase />
      </section>

      <Services />

      <div className="sheet">
      <Studio years={yearsActive} />
      </div>

      <BuildProcess />

      <div className="sheet"><Team /></div>

      <PinBottom><Faq /></PinBottom>

      <ContactFooter />
      </div>
    </main>
    <Motion />
  </>;
}
