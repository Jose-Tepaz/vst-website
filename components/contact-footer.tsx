import { ProjectBrief } from "@/components/interactions";
import { studio } from "@/lib/content";

export function ContactFooter() {
  return <footer id="contacto" className="contact-footer" aria-labelledby="contact-title">
    <div className="wrap">
      <div className="contact-footer-main">
        <div className="contact-footer-intro">
          <h2 id="contact-title">Hablemos<span aria-hidden="true">↗</span></h2>
          <p>Tu próxima idea empieza con una conversación. Cuéntanos qué quieres construir y le damos forma contigo.</p>
        </div>
        <ProjectBrief />
      </div>
      <a className="contact-footer-email" href={`mailto:${studio.email}`}>{studio.email}<span aria-hidden="true">↗</span></a>
      <div className="contact-footer-signature">
        <p>Del diseño al despliegue.<br />Un mismo equipo.</p>
        <nav aria-label="Enlaces del pie de página"><a href="#proyectos">Proyectos</a><a href="#servicios">Servicios</a><a href="#estudio">Estudio</a></nav>
        <a className="contact-footer-top" href="#inicio">Volver arriba <span aria-hidden="true">↑</span></a>
      </div>
    </div>
  </footer>;
}
