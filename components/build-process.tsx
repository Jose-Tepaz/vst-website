"use client";

import { useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { Arrow } from "@/components/arrow";
import { Roll } from "@/components/roll";
import { RevealTitle } from "@/components/reveal-title";

// Iconos de línea (trazo de 1.75, estilo Lucide): conversación, diseño, código y cohete.
const icons: ReactNode[] = [
  <svg key="0" viewBox="0 0 24 24"><path pathLength="1" d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" /><path pathLength="1" d="M8.5 11.5h7M8.5 14.5h4" /></svg>,
  <svg key="1" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5" /><path pathLength="1" d="M3 9h18M9 9v11" /></svg>,
  <svg key="2" viewBox="0 0 24 24"><path pathLength="1" d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>,
  <svg key="3" viewBox="0 0 24 24"><path pathLength="1" d="M5 15c-1.5 1.3-2 4-2 6 2 0 4.7-.5 6-2M12 15l-3-3a22 22 0 0 1 2-4 12 12 0 0 1 11-5c0 3-1 8-5 11a22 22 0 0 1-5 1Z" /><circle cx="15.5" cy="8.5" r="1.4" /><path pathLength="1" d="M9 12H4s.5-3 2-4c1.3-.9 4 0 4 0M12 15v5s3-.5 4-2c1-1.5 0-4 0-4" /></svg>,
];

const stages = [
  { title: "Entender", phase: "El punto de partida", description: "Conversamos sobre tu negocio, las personas y el problema. Definimos qué construir y por qué.", result: "Una dirección compartida.", detail: "Negocio · Personas · Alcance" },
  { title: "Diseñar", phase: "De la idea a la experiencia", description: "Diseñamos los flujos y la experiencia visual. Probamos la dirección antes de desarrollar.", result: "Una experiencia que puedes probar.", detail: "UX/UI · Flujos · Prototipos" },
  { title: "Desarrollar", phase: "Del diseño al código", description: "Convertimos el diseño en software e integramos las herramientas que el proyecto necesita.", result: "Un producto construido y probado.", detail: "Desarrollo · Integración · Pruebas" },
  { title: "Desplegar", phase: "Listo para salir", description: "Publicamos tu producto para que empiece a usarse. Revisamos que todo funcione y acordamos cómo acompañar lo que sigue.", result: "Tu producto, listo para usarse.", detail: "Despliegue · Revisión · Acompañamiento" },
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

  // El icono se mueve un poco con el cursor.
  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--mx", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
    card.style.setProperty("--my", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
  }
  function leave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.removeProperty("--mx");
    event.currentTarget.style.removeProperty("--my");
  }

  return <section id="proceso" className="method" aria-labelledby="process-title" ref={sectionRef}>
    <div className="method-head wrap">
      <div className="method-intro" data-reveal><p>Una conversación continua.<br />Decisiones compartidas en cada etapa.</p><p>Del primer intercambio a la publicación, un mismo equipo cuida el diseño y la tecnología.</p></div>
      <RevealTitle id="process-title" lines={[{ text: "Así lo", inline: true }, { text: "construimos.", highlight: true, inline: true }]} />
      <div className="method-bottom" data-reveal><p>Cuatro etapas. Una misma dirección.</p><a className="cta" href="#etapa-entender"><Roll>Explora el proceso</Roll> <Arrow direction="down" /></a></div>
    </div>
    <div className="method-stack">{stages.map((stage, index) => <article id={`etapa-${stage.title.toLowerCase()}`} className={`method-card method-card-${index}`} key={stage.title} aria-labelledby={`method-title-${index}`} style={{ "--i": index } as CSSProperties} onPointerMove={move} onPointerLeave={leave}>
      <div className="method-card-surface">
        <div className="method-card-top"><span>{stage.phase}</span><span>{String(index + 1).padStart(2, "0")} / 04</span></div>
        <div className="method-card-body">
          <div className="method-card-copy">
            <span className="method-icon" aria-hidden="true">{icons[index]}</span>
            <h3 id={`method-title-${index}`}>{stage.title}</h3>
            <p>{stage.description}</p>
            <p className="method-detail">{stage.detail}</p>
          </div>
          <span className="method-numeral" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="method-card-bottom"><p>{stage.result}</p><a className="cta" href={index < stages.length - 1 ? `#etapa-${stages[index + 1].title.toLowerCase()}` : "#contacto"}><Roll>{index < stages.length - 1 ? "Siguiente etapa" : "Hablemos de tu proyecto"}</Roll> <Arrow direction={index < stages.length - 1 ? "down" : "up-right"} /></a></div>
      </div>
    </article>)}</div>
  </section>;
}
