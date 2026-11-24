"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

const stages = [
  { name: "Diseño", status: "Definiendo la experiencia", progress: 30, items: ["Entender tu negocio", "Prototipo navegable", "Revisión contigo"], done: 1 },
  { name: "Desarrollo", status: "Construyendo cada pantalla", progress: 68, items: ["Interfaz lista", "Conexión con tus sistemas", "Pruebas con personas"], done: 2 },
  { name: "Despliegue", status: "Listo para publicarse", progress: 100, items: ["Ajustes finales", "Publicación", "Acompañamiento"], done: 3 },
];

// Teléfono interactivo del inicio: sigue el cursor, y sus pestañas recorren las etapas de un proyecto.
export function HeroMockup() {
  const [stage, setStage] = useState(0);
  const [manual, setManual] = useState(false);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (manual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setStage(value => (value + 1) % stages.length), 3200);
    return () => clearInterval(timer);
  }, [manual]);

  function move(event: PointerEvent<HTMLDivElement>) {
    const element = scene.current;
    if (!element || event.pointerType === "touch") return;
    const box = element.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    element.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
    element.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
    element.style.setProperty("--px", x.toFixed(3));
    element.style.setProperty("--py", y.toFixed(3));
  }
  function leave() {
    const element = scene.current;
    if (!element) return;
    ["--rx", "--ry", "--px", "--py"].forEach(name => element.style.removeProperty(name));
  }

  const current = stages[stage];
  return <div className="hero-mockup" ref={scene} onPointerMove={move} onPointerLeave={leave} role="group" aria-label="Ejemplo conceptual de un proyecto en Vástago">
    <div className="hm-phone">
      <span className="hm-island" aria-hidden="true" />
      <div className="hm-screen">
        <p className="hm-hello">Así avanza tu proyecto.</p>
        <h3 key={stage}>{current.status}</h3>
        <div className="hm-tabs" role="tablist" aria-label="Etapas del proyecto">
          {stages.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={stage === index} onClick={() => { setManual(true); setStage(index); }}>{item.name}</button>)}
        </div>
        <div className="hm-progress" aria-hidden="true"><span style={{ width: `${current.progress}%` }} /></div>
        <ul className="hm-list">
          {current.items.map((item, index) => <li key={item} className={index < current.done ? "is-done" : undefined}><i aria-hidden="true">{index < current.done ? "✓" : ""}</i>{item}</li>)}
        </ul>
      </div>
    </div>
    <div className="hm-card hm-card-a" aria-hidden="true"><small>Un mismo equipo</small><strong>Diseño y desarrollo.</strong></div>
    <div className="hm-card hm-card-b" aria-hidden="true"><small>Estado</small><strong>{current.progress}%</strong></div>
  </div>;
}
