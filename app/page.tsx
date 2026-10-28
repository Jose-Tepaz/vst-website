import { Menu, Motion } from "@/components/interactions";
import { projects } from "@/lib/content";
import { Services } from "@/components/services";
import { PhraseRibbon } from "@/components/phrase-ribbon";
import { Faq } from "@/components/faq";
import { Team } from "@/components/team";
import { ContactFooter } from "@/components/contact-footer";
import { BuildProcess } from "@/components/build-process";

function Logo() {
  return <a className="logo" href="#inicio" aria-label="Vástago Studio, inicio"><span className="monogram">VST</span><span className="logotype">Vástago<span>Studio</span></span></a>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <Menu><Logo /></Menu>
    <main id="contenido">
      <section id="inicio" className="hero hero-with-ribbon" aria-labelledby="hero-title">
        <div className="hero-content wrap">
        <h1 id="hero-title">Del diseño<br />al despliegue.</h1>
        <div className="hero-bottom">
          <p>Somos Vástago. Un estudio boutique de diseño y desarrollo de software. Creamos productos digitales, de la primera idea al mundo real.</p>
        </div>
        </div>
        <PhraseRibbon />
      </section>

      <section id="proyectos" className="work wrap" aria-labelledby="work-title">
        <div className="section-intro" data-reveal><h2 id="work-title">Trabajo<br />seleccionado.</h2><p>Cada proyecto empieza con una conversación.<br />Estos son algunos de los nombres que forman parte de nuestro recorrido.</p></div>
        <div className="projects">
          {projects.map(project => <article className={`project ${project.cover}`} key={project.name} data-reveal>
            <div className="project-cover" aria-hidden="true"><span className="cover-mark">{project.mark}</span><div className="cover-word">{project.word}<span>{project.sub}</span></div><span className="cover-caption">{project.name}</span></div>
            <h3>{project.name}</h3>
          </article>)}
        </div>
      </section>

      <Services />

      <section id="estudio" className="studio studio-reframed wrap" aria-labelledby="studio-title">
        <div className="studio-presentation">
          <div className="studio-introduction"><h2 id="studio-title" data-reveal>Tu visión.<br />Nuestro compromiso.</h2><p data-reveal>Somos Vástago, un estudio boutique de diseño y desarrollo de software. Nos involucramos en tu negocio para construir un producto que tenga sentido para quienes lo usan.</p><a href="#contacto" data-reveal>Conozcamos tu proyecto <span aria-hidden="true">↗</span></a></div>
          <div className="studio-tenure" data-reveal><strong>4</strong><p>años conectando<br />diseño y desarrollo.</p><span>De la primera idea al despliegue.</span></div>
        </div>
        <div className="studio-principles"><article data-reveal><h3>Cerca de tu equipo.</h3><p>Conversamos contigo, entendemos el contexto y compartimos las decisiones. Tu conocimiento del negocio forma parte del proyecto desde el inicio.</p></article><article data-reveal><h3>De principio a fin.</h3><p>Diseñamos pensando en cómo se construye y desarrollamos cuidando la experiencia. Un mismo equipo acompaña el producto hasta su puesta en marcha.</p></article></div>
      </section>

      <BuildProcess />

      <Team />

      <Faq />

    </main>
    <ContactFooter />
    <Motion />
  </>;
}
