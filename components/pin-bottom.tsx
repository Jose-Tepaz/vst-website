"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Deja el bloque fijo cuando queda centrado en pantalla (o, si es más alto, cuando se ve su final),
// de modo que lo que viene después (el contacto) entre por encima y lo cubra.
export function PinBottom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    function update() {
      // Si cabe en pantalla se queda centrado; si es más alto, se detiene cuando se ve su final.
      const free = window.innerHeight - element!.offsetHeight;
      element!.style.top = `${free >= 0 ? free / 2 : free}px`;
    }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  return <div ref={ref} className="pin-bottom">{children}</div>;
}
