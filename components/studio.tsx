"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Arrow } from "@/components/arrow";
import { Roll } from "@/components/roll";
import { RevealTitle } from "@/components/reveal-title";

const principles = [
  {
    title: "Cerca de tu equipo.",
    text: "Conversamos contigo, entendemos el contexto y compartimos las decisiones. Tu conocimiento del negocio forma parte del proyecto desde el inicio.",
  },
  {
    title: "De principio a fin.",
    text: "Diseñamos pensando en cómo se construye y desarrollamos cuidando la experiencia. Un mismo equipo acompaña el producto hasta su despliegue.",
  },
];

// Sección del estudio: presentación a la izquierda, una tarjeta oscura con los años a la derecha
// (la cifra cuenta hacia arriba y la luz sigue al cursor) y dos tarjetas con los principios.
export function Studio({ years }: { years: number }) {
  const [count, setCount] = useState(years);
  const tenure = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = tenure.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      setCount(0);
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        setCount(Math.round((1 - Math.pow(1 - progress, 3)) * years));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [years]);

  function glow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    card.style.setProperty("--ry", `${((x - 0.5) * 6).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${(-(y - 0.5) * 5).toFixed(2)}deg`);
  }
  function reset(event: PointerEvent<HTMLElement>) {
    ["--gx", "--gy", "--rx", "--ry"].forEach(name => event.currentTarget.style.removeProperty(name));
  }

  return <section id="estudio" className="st wrap" aria-labelledby="studio-title">
    <div className="st-top">
      <div className="st-intro">
        <RevealTitle id="studio-title" lines={[{ text: "Tu visión." }, { text: "Nuestro compromiso.", highlight: true }]} />
        <p data-reveal>Tú sabes qué quieres lograr y a quién quieres llegar. Nosotros nos involucramos para construir un producto digital que tenga sentido para quienes lo usan. Nos comprometemos a acompañarte en cada decisión de diseño y tecnología desde la primera conversación.</p>
        <a className="cta" href="#contacto" data-reveal><Roll>Conozcamos tu proyecto</Roll> <Arrow /></a>
      </div>
      <div className="st-tenure-wrap" data-reveal>
        <div className="st-tenure" ref={tenure} onPointerMove={glow} onPointerLeave={reset}>
          <span className="st-chip">Desde 2022</span>
          <strong aria-label={`Más de ${years}`}><span aria-hidden="true">+{count}</span></strong>
          <p>años conectando<br />diseño y desarrollo.</p>
          <ul aria-label="De la primera idea al despliegue"><li>Idea</li><li>Diseño</li><li>Desarrollo</li><li>Despliegue</li></ul>
        </div>
      </div>
    </div>
    <div className="st-cards">
      {principles.map((principle, index) => <article key={principle.title} className="st-card" data-reveal style={{ "--stagger": index } as CSSProperties} onPointerMove={glow} onPointerLeave={reset}>
        <h3>{principle.title}</h3>
        <p>{principle.text}</p>
      </article>)}
    </div>
  </section>;
}
