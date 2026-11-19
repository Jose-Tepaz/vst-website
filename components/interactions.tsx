"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { contactHref, services } from "@/lib/content";

// Iconos de Lucide (licencia ISC): layout-grid, sparkles, users y message-circle.
// Las formas con clase "f" se rellenan suavemente cuando la sección está activa.
const sectionLinks = [
  { id: "proyectos", label: "Proyectos", icon: <><rect className="f" x="3" y="3" width="7" height="7" rx="1" /><rect className="f" x="14" y="3" width="7" height="7" rx="1" /><rect className="f" x="14" y="14" width="7" height="7" rx="1" /><rect className="f" x="3" y="14" width="7" height="7" rx="1" /></> },
  { id: "servicios", label: "Servicios", icon: <><path className="f" d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></> },
  { id: "estudio", label: "Estudio", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle className="f" cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { id: "contacto", label: "Hablemos", icon: <path className="f" d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /> },
];

export function Menu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  // Ancho real de cada nombre: la píldora y el nombre se animan hasta esa medida exacta.
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [labelWidths, setLabelWidths] = useState<number[]>([]);
  useEffect(() => {
    function measure() { setLabelWidths(labelRefs.current.map(label => label?.offsetWidth ?? 0)); }
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  useEffect(() => {
    function close(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const awayFromTop = y > 2;
      setScrolled(awayFromTop);
      if (awayFromTop) setOpen(false);
      let current = "";
      for (const id of ["proyectos", "servicios", "estudio", "contacto"]) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * .4) current = id;
      }
      setActive(current);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  const showTop = !scrolled;
  const showBottom = scrolled;
  const activeIndex = sectionLinks.findIndex(link => link.id === active);
  const pillStyle = { "--active-index": Math.max(activeIndex, 0), "--active-label": `${labelWidths[activeIndex] ?? 0}px` } as CSSProperties;
  return <>
    <div className="header-space"><header className={`header scroll-header${showTop ? " is-visible" : ""}`} aria-hidden={!showTop} inert={!showTop}>
    {children}
    <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? "Cerrar" : "Menú"}</button>
    <nav id="navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Principal">
      <a href="#proyectos" onClick={() => setOpen(false)}>Proyectos</a>
      <a href="#servicios" onClick={() => setOpen(false)}>Servicios</a>
      <a href="#estudio" onClick={() => setOpen(false)}>Estudio</a>
      <a className="nav-contact" href="#contacto" onClick={() => setOpen(false)}>Hablemos <span aria-hidden="true">↗</span></a>
    </nav>
    </header></div>
    <nav className={`bottom-navigation${showBottom ? " is-visible" : ""}${activeIndex >= 0 ? " has-active" : ""}`} style={pillStyle} aria-label="Navegación de secciones" aria-hidden={!showBottom} inert={!showBottom}>
      {sectionLinks.map((link, index) => <a key={link.id} href={`#${link.id}`} title={link.label} aria-current={active === link.id ? "location" : undefined}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{link.icon}</svg>
        <span className="bottom-navigation-label" style={{ "--label": `${labelWidths[index] ?? 0}px` } as CSSProperties}><span ref={label => { labelRefs.current[index] = label; }}>{link.label}</span></span>
      </a>)}
    </nav>
  </>;
}

export function ProjectBrief() {
  const [selected, setSelected] = useState<string[]>([]);
  function toggle(name: string) { setSelected(previous => previous.includes(name) ? previous.filter(item => item !== name) : [...previous, name]); }
  return <div className="brief">
    <p>Quiero construir…</p>
    <div className="brief-options" aria-label="Selecciona los servicios para tu proyecto">
      {services.map(service => <button key={service.name} type="button" aria-pressed={selected.includes(service.short)} onClick={() => toggle(service.short)}>{service.short}<span aria-hidden="true">{selected.includes(service.short) ? "✓" : "+"}</span></button>)}
    </div>
    <a className="button contact-button" href={contactHref(selected.length ? selected.join(" y ") : undefined)}>Hablemos de tu proyecto <span aria-hidden="true">↗</span></a>
    <p className="contact-note">Se abrirá tu aplicación de correo con la idea que elegiste.</p>
  </div>;
}

export function Motion() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
