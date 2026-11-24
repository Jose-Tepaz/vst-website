"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { projects, tidy } from "@/lib/content";
import { RevealTitle } from "@/components/reveal-title";

// Proyectos: la sección se queda fija en pantalla y, al hacer scroll, va pasando de un proyecto a otro.
// La lista de la izquierda marca el proyecto activo y sirve para saltar a cualquiera.
// En pantallas pequeñas no se fija: se elige con la lista.
export function ProjectShowcase() {
  const shown = projects.filter(project => project.image);
  const total = shown.length;
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  function show(index: number) {
    if (index === activeRef.current) return;
    setPrevious(activeRef.current);
    activeRef.current = index;
    setActive(index);
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 851px) and (min-height: 700px)");
    let frame = 0;
    function update() {
      frame = 0;
      const element = track.current;
      if (!element || !desktop.matches) return;
      const box = element.getBoundingClientRect();
      const scrollable = box.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(0.999, -box.top / scrollable));
      show(Math.floor(progress * total));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    if (!window.matchMedia("(min-width: 851px) and (min-height: 700px)").matches) { show(index); return; }
    const scrollable = element.offsetHeight - window.innerHeight;
    const top = element.getBoundingClientRect().top + window.scrollY + ((index + 0.5) / total) * scrollable;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const stage = event.currentTarget;
    const box = stage.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    stage.style.setProperty("--ty", `${((x - 0.5) * 7).toFixed(2)}deg`);
    stage.style.setProperty("--tx", `${(-(y - 0.5) * 5).toFixed(2)}deg`);
    stage.style.setProperty("--mx", (x - 0.5).toFixed(3));
    stage.style.setProperty("--my", (y - 0.5).toFixed(3));
    stage.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    stage.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  }
  function leave(event: PointerEvent<HTMLDivElement>) {
    ["--tx", "--ty", "--mx", "--my"].forEach(name => event.currentTarget.style.removeProperty(name));
  }

  const current = shown[active];
  return <div className="work-track" ref={track} style={{ "--n": total } as React.CSSProperties}>
    <div className="work-pin">
      <div className="work-side">
        <RevealTitle id="work-title" lines={[{ text: "Trabajo" }, { text: "seleccionado.", highlight: true }]} />
        <RevealTitle as="p" className="work-note" delay={0.45} lines={[{ text: "Cada proyecto empieza con una conversación." }, { text: "Estos son algunos de los productos que hemos diseñado y desarrollado." }]} />
        <nav className="work-list" aria-label="Proyectos">
          {shown.map((project, index) => <button key={project.name} type="button" aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)}><span>{project.name}</span></button>)}
        </nav>
      </div>
      <div className="work-main">
        <div className="work-stage" onPointerMove={move} onPointerLeave={leave}>
          <div className="work-frame">
            {shown.map((project, index) => <Image key={project.name} className={active === index ? "is-active" : previous === index ? "is-previous" : undefined} src={`/images/projects/${project.image}`} alt={active === index ? `Vista de ${project.name}` : ""} aria-hidden={active !== index} fill sizes="(max-width: 850px) 100vw, 900px" preload={index === 0} />)}
            <span className="work-glare" aria-hidden="true" />
            <span className="work-count" aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="work-caption" aria-live="polite"><h3>{current.name}</h3><p>{tidy(current.description)}</p></div>
      </div>
    </div>
  </div>;
}
