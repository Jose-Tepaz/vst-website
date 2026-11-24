import { ProjectBrief } from "@/components/interactions";
import { studio } from "@/lib/content";
import { Arrow } from "@/components/arrow";
import { Roll } from "@/components/roll";

export function ContactFooter() {
  return <footer id="contacto" className="contact-footer" aria-labelledby="contact-title">
    <div className="wrap">
      <div className="contact-footer-main">
        <div className="contact-footer-intro" data-reveal>
          <h2 id="contact-title">Hablemos<span aria-hidden="true">↗</span></h2>
          <p>Tu próxima idea empieza con una conversación. Cuéntanos qué quieres lograr y lo construimos contigo.</p>
        </div>
        <ProjectBrief />
      </div>
      <a className="contact-footer-email cta" data-reveal href={`mailto:${studio.email}`}><Roll>{studio.email}</Roll><Arrow /></a>
      <div className="contact-footer-signature" data-reveal>
        <p>Del diseño al despliegue. <br />Un mismo equipo.</p>
        <nav aria-label="Enlaces del pie de página"><a href="#proyectos">Proyectos</a><a href="#servicios">Servicios</a><a href="#estudio">Estudio</a></nav>
        <a className="contact-footer-top cta" href="#inicio"><Roll>Volver arriba</Roll> <Arrow direction="up" /></a>
      </div>
    </div>
  </footer>;
}
