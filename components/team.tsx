"use client";

import Image from "next/image";
import { PhraseRibbon } from "@/components/phrase-ribbon";
import { useEffect, useRef, useState, type PointerEvent, type CSSProperties } from "react";

const portraitSlots = ["Retrato 01", "Retrato 02", "Retrato 03", "Retrato 04", "Retrato 05"];

export function Team() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const gesture = useRef<{ id: number; x: number; y: number; dx: number; horizontal: boolean } | null>(null);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    function sync() {
      clearInterval(timer);
      if (visible && !document.hidden && !reduced.matches && !paused && !engaged && !dragging) {
        timer = setInterval(() => setActive(value => (value + 1) % portraitSlots.length), 4000);
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .25 });
    if (section.current) observer.observe(section.current);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { clearInterval(timer); observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [paused, engaged, dragging]);
  function move(direction: number) { setActive(value => (value + direction + portraitSlots.length) % portraitSlots.length); }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, horizontal: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }
  function updateDrag(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.horizontal && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
      finishDrag(event, true);
      return;
    }
    if (Math.abs(dx) > 5) current.horizontal = true;
    if (current.horizontal) { current.dx = dx; setDragX(dx); }
  }
  function finishDrag(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    const threshold = Math.min(85, event.currentTarget.clientWidth * .2);
    if (!cancelled && Math.abs(current.dx) >= threshold) move(current.dx < 0 ? 1 : -1);
    setDragX(0);
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return <section ref={section} id="equipo" className="team-section team-slider wrap" aria-labelledby="team-title">
    <div className="team-heading">
      <h2 id="team-title">Las personas<br />detrás de Vástago.</h2>
      <p>Diseñamos, desarrollamos y construimos contigo. Conoce al equipo que acompaña tu proyecto de principio a fin.</p>
    </div>
    <div className="team-carousel" role="region" aria-roledescription="carrusel" aria-label="Equipo de Vástago"
      onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false); }}
      onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
      <div className="team-ribbon-background" aria-hidden="true" inert><PhraseRibbon /></div>
      <div className={`team-deck${dragging ? " is-dragging" : ""}`} onPointerDown={startDrag} onPointerMove={updateDrag} onPointerUp={event => finishDrag(event)} onPointerCancel={event => finishDrag(event, true)} onLostPointerCapture={event => finishDrag(event, true)} onDragStart={event => event.preventDefault()}>
        {portraitSlots.map((slot, index) => {
          const depth = (index - active + portraitSlots.length) % portraitSlots.length;
          return <article className={`team-stack-card${depth === 0 ? " is-front" : ""}`} key={slot} aria-hidden={depth !== 0} style={{ "--depth": depth, "--drag-x": `${depth === 0 ? dragX : 0}px`, "--drag-rotation": `${depth === 0 ? dragX / 22 : 0}deg`, zIndex: portraitSlots.length - depth } as CSSProperties}>
            <div className={`team-portrait team-portrait-${index}`}>
              <Image draggable={false} className="team-illustration" src="/images/team-illustration.png" alt="Retrato ilustrado de muestra para el equipo" fill sizes="(max-width: 650px) 85vw, 420px" />
            </div>
            <div className="team-member-caption"><h3>{index === 0 ? "Jose Tepaz" : "Nombre por confirmar"}</h3><p>{index === 0 ? "Founder | Forward Deployed Engineer" : "Rol por confirmar"}</p></div>
          </article>;
        })}
      </div>
      <div className="team-slider-controls">
        <span className="team-slide-count" aria-label={`Perfil ${active + 1} de ${portraitSlots.length}`}>{String(active + 1).padStart(2, "0")} <span>/ 05</span></span>
        <div><button type="button" onClick={() => move(-1)} aria-label="Perfil anterior">←</button><button className="team-pause" type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Reanudar" : "Pausar"}</button><button type="button" onClick={() => move(1)} aria-label="Siguiente perfil">→</button></div>
      </div>
    </div>
  </section>;
}
