"use client";

import { useEffect, useId, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";

const phrase = "Diseño con intención · Software que funciona · Del diseño al despliegue · ";

export function PhraseRibbon() {
  const curveId = useId();
  const unitRef = useRef<SVGTSpanElement>(null);
  const textRef = useRef<SVGTextPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lengthRef = useRef(0);
  const dragRef = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  function moveBy(distance: number) {
    const length = lengthRef.current;
    if (!length) return;
    offsetRef.current = ((offsetRef.current + distance) % length + length) % length;
    textRef.current?.setAttribute("startOffset", String(-offsetRef.current));
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    dragRef.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function drag(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current === null) return;
    const width = event.currentTarget.querySelector("svg")?.getBoundingClientRect().width || 1440;
    moveBy((dragRef.current - event.clientX) * 1440 / width);
    dragRef.current = event.clientX;
  }
  function stopDrag() { dragRef.current = null; setDragging(false); }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveBy(event.key === "ArrowRight" ? -120 : 120);
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let length = 0;
    let visible = false;
    let disposed = false;

    function tick(time: number) {
      if (previous && dragRef.current === null) offsetRef.current = (offsetRef.current + Math.min(time - previous, 64) * 0.065) % length;
      previous = time;
      textRef.current?.setAttribute("startOffset", String(-offsetRef.current));
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!reduced.matches && visible && length > 0 && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (containerRef.current) observer.observe(containerRef.current);
    document.fonts.ready.then(() => {
      if (disposed) return;
      length = unitRef.current?.getComputedTextLength() || 0;
      lengthRef.current = length;
      sync();
    });
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <div className="phrase-ribbon" ref={containerRef}>
    <div className={`ribbon-interaction${dragging ? " is-dragging" : ""}`} role="group" aria-label="Cinta de frases. Arrastra o usa las flechas izquierda y derecha para moverla." tabIndex={0} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag} onKeyDown={keyboard}>
    <svg className="ribbon-art" viewBox="0 0 1440 270" aria-hidden="true" focusable="false">
      <defs><path id={curveId} d="M -160 120 C 130 285 430 285 720 100 S 1280 -85 1600 -20 L 9000 1483" /></defs>
      <path className="ribbon-band" d="M -160 120 C 130 285 430 285 720 100 S 1280 -85 1600 -20" />
      <text className="ribbon-text" dy=".35em"><textPath href={`#${curveId}`} ref={textRef} startOffset="0">
        <tspan ref={unitRef}>{phrase}</tspan>
        {Array.from({ length: 5 }, (_, index) => <tspan key={index}>{phrase}</tspan>)}
      </textPath></text>
    </svg>
    </div>
    <p className="ribbon-static" aria-hidden="true">Diseño con intención.<br />Software que funciona.<br />Del diseño al despliegue.</p>
  </div>;
}
