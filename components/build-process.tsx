"use client";

import { useEffect, useRef } from "react";

const stages = [
  { title: "Entender", phase: "El punto de partida", description: "Conversamos sobre tu negocio, las personas y el problema. Definimos qué construir y por qué.", result: "Una dirección compartida.", detail: "Negocio · Personas · Alcance" },
  { title: "Diseñar", phase: "La idea toma forma", description: "Damos forma a los flujos y a la experiencia visual. Probamos la dirección antes de desarrollar.", result: "Una experiencia que puedes probar.", detail: "UX/UI · Flujos · Prototipos" },
  { title: "Desarrollar", phase: "Del diseño al código", description: "Convertimos el diseño en software e integramos las herramientas que el proyecto necesita.", result: "Tu producto toma forma.", detail: "Desarrollo · Integración · Pruebas" },
  { title: "Desplegar", phase: "Listo para salir", description: "Preparamos la salida, revisamos el funcionamiento y acordamos cómo acompañar lo que sigue.", result: "Listo para salir al mundo.", detail: "Despliegue · Revisión · Acompañamiento" },
];

export function BuildProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>(".method-card") || []);
    let frame = 0;
    function update() {
      frame = 0;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        const progress = !reduced.matches && next ? Math.max(0, Math.min(1, 1 - next.getBoundingClientRect().top / window.innerHeight)) : 0;
        card.style.setProperty("--stack-scale", String(1 - progress * 0.055));
        card.style.setProperty("--stack-shade", String(progress * 0.4));
      });
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, []);

  return <section id="proceso" className="method" aria-labelledby="process-title" ref={sectionRef}>
    <div className="method-head wrap">
      <div className="method-intro"><p>Una conversación continua.<br />Decisiones compartidas en cada etapa.</p><p>Del primer intercambio a la puesta en marcha, un mismo equipo cuida el diseño y la tecnología.</p></div>
      <h2 id="process-title" data-reveal>Así lo construimos.</h2>
      <div className="method-bottom"><p>Cuatro etapas. Una misma dirección.</p><a href="#etapa-entender">Explora el proceso <span aria-hidden="true">↓</span></a></div>
      <nav className="method-nav" aria-label="Etapas del proyecto">{stages.map(stage => <a key={stage.title} href={`#etapa-${stage.title.toLowerCase()}`}>{stage.title}</a>)}</nav>
    </div>
    <div className="method-stack">{stages.map((stage, index) => <article id={`etapa-${stage.title.toLowerCase()}`} className={`method-card method-card-${index}`} key={stage.title} aria-labelledby={`method-title-${index}`}>
      <div className="method-card-surface">
        <div className="method-card-top"><span>{stage.phase}</span><span>{String(index + 1).padStart(2, "0")} / 04</span></div>
        <div className="method-card-body"><div className="method-card-copy"><h3 id={`method-title-${index}`}>{stage.title}</h3><p>{stage.description}</p><p className="method-detail">{stage.detail}</p></div><span className="method-numeral" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
        <div className="method-card-bottom"><p>{stage.result}</p><a href={index < stages.length - 1 ? `#etapa-${stages[index + 1].title.toLowerCase()}` : "#contacto"}>{index < stages.length - 1 ? "Siguiente etapa" : "Hablemos de tu proyecto"}<span aria-hidden="true">{index < stages.length - 1 ? "↓" : "↗"}</span></a></div>
      </div>
    </article>)}</div>
  </section>;
}
