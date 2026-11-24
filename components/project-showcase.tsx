"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { projects, tidy } from "@/lib/content";
import { RevealTitle } from "@/components/reveal-title";

const STEP_MS = 850;

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

    // Un gesto de scroll = un proyecto, sin importar la fuerza: mientras la sección está fija se
    // intercepta la rueda, el teclado y el toque, y se avanza exactamente un paso con una pausa.
    let lockedUntil = 0;
    let lastWheel = 0;
    let lastDelta = 0;
    let touchY = 0;
    function pinned() {
      const element = track.current;
      if (!element || !desktop.matches) return false;
      const box = element.getBoundingClientRect();
      return box.top <= 1 && box.bottom >= window.innerHeight - 1;
    }
    function inRange(dir: number) { const next = activeRef.current + dir; return next >= 0 && next < total; }
    function step(dir: 1 | -1) {
      if (!inRange(dir) || performance.now() < lockedUntil) return;
      lockedUntil = performance.now() + STEP_MS;
      show(activeRef.current + dir);
      goTo(activeRef.current, true);
    }
    function onWheel(event: WheelEvent) {
      if (event.ctrlKey || !pinned() || Math.abs(event.deltaY) < 2) return;
      const dir = event.deltaY > 0 ? 1 : -1;
      const now = performance.now();
      const fresh = now - lastWheel > 90 || Math.abs(event.deltaY) > lastDelta * 1.6;
      lastWheel = now;
      lastDelta = Math.abs(event.deltaY);
      if (!inRange(dir)) return; // en los extremos el scroll sigue normal
      event.preventDefault();
      if (fresh) step(dir);
    }
    function onKey(event: KeyboardEvent) {
      if (!pinned()) return;
      const down = ["ArrowDown", "PageDown"].includes(event.key) || (event.key === " " && !event.shiftKey);
      const up = ["ArrowUp", "PageUp"].includes(event.key) || (event.key === " " && event.shiftKey);
      if (!down && !up) return;
      if (inRange(down ? 1 : -1)) { event.preventDefault(); step(down ? 1 : -1); }
    }
    function onTouchStart(event: TouchEvent) { touchY = event.touches[0].clientY; }
    function onTouchMove(event: TouchEvent) {
      if (!pinned()) return;
      const dy = touchY - event.touches[0].clientY;
      const dir = dy > 0 ? 1 : -1;
      if (!inRange(dir)) return;
      event.preventDefault();
      if (Math.abs(dy) > 28) { step(dir); touchY = event.touches[0].clientY; }
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", onWheel); window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart); window.removeEventListener("touchmove", onTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  function goTo(index: number, instant = false) {
    const element = track.current;
    if (!element) return;
    if (!window.matchMedia("(min-width: 851px) and (min-height: 700px)").matches) { show(index); return; }
    const scrollable = element.offsetHeight - window.innerHeight;
    const top = element.getBoundingClientRect().top + window.scrollY + ((index + 0.5) / total) * scrollable;
    window.scrollTo({ top, behavior: instant ? ("instant" as ScrollBehavior) : "smooth" });
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
    <div className="work-stack">
      <RevealTitle as="p" className="work-stack-title" lines={[{ text: "Trabajo" }, { text: "seleccionado.", highlight: true }]} />
      <p className="work-note-m">Cada proyecto empieza con una conversación. Estos son algunos de los productos que hemos diseñado y desarrollado.</p>
      {shown.map((project, index) => <article className="work-card" key={project.name} style={{ "--i": index } as React.CSSProperties}>
        <div className="work-card-img"><Image src={`/images/projects/${project.image}`} alt={`Vista de ${project.name}`} fill sizes="100vw" /></div>
        <h3>{project.name}</h3><p>{tidy(project.description)}</p>
      </article>)}
    </div>
  </div>;
}
