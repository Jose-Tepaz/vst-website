"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Deja el bloque fijo cuando su borde inferior llega al borde inferior de la pantalla,
// de modo que lo que viene después (el contacto) entre por encima y lo cubra.
export function PinBottom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    function update() { element!.style.top = `${Math.min(0, window.innerHeight - element!.offsetHeight)}px`; }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  return <div ref={ref} className="pin-bottom">{children}</div>;
}
