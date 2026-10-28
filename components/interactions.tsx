"use client";

import { useEffect, useState, type ReactNode } from "react";
import { contactHref, services } from "@/lib/content";

export function Menu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const links = [{ id: "proyectos", label: "Proyectos" }, { id: "servicios", label: "Servicios" }, { id: "estudio", label: "Estudio" }, { id: "contacto", label: "Hablemos" }];
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
    <nav className={`bottom-navigation${showBottom ? " is-visible" : ""}`}  aria-label="Navegación de secciones" aria-hidden={!showBottom} inert={!showBottom}>
      {links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined}>{link.label}</a>)}
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
