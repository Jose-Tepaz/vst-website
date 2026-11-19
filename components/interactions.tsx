"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { contactHref, services } from "@/lib/content";

// Iconos de Lucide (licencia ISC): layout-grid, sparkles, users, message-circle, menu, ellipsis y x.
// Las formas con clase "f" se rellenan suavemente cuando la sección está activa.
const sectionLinks = [
  { id: "proyectos", label: "Proyectos", icon: <><rect className="f" x="3" y="3" width="7" height="7" rx="1" /><rect className="f" x="14" y="3" width="7" height="7" rx="1" /><rect className="f" x="14" y="14" width="7" height="7" rx="1" /><rect className="f" x="3" y="14" width="7" height="7" rx="1" /></> },
  { id: "servicios", label: "Servicios", icon: <><path className="f" d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></> },
  { id: "estudio", label: "Estudio", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle className="f" cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { id: "contacto", label: "Hablemos", icon: <path className="f" d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /> },
];
// Lo que muestra la barra compacta cuando todavía no hay sección activa (portada).
const menuItem = { id: "", label: "Menú", icon: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></> };
const compactItems = [...sectionLinks, menuItem];

function Icon({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
}

export function Menu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
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
    <SectionIsland active={active} visible={scrolled} />
  </>;
}

// Barra flotante tipo "isla".
// Cerrada: muestra la sección actual (su nombre cambia girando como un cilindro) y el botón «···».
// Abierta: muestra todas las secciones; la píldora se desliza hasta la que señalas y despliega su nombre.
function SectionIsland({ active, visible }: { active: string; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [leaving, setLeaving] = useState<string | null>(null);
  const [labelWidths, setLabelWidths] = useState<number[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastActive = useRef(active);
  const openedAt = useRef(0);
  const isOpen = open && visible;

  // Ancho real de cada nombre: la píldora y la barra se animan hasta esa medida exacta.
  useEffect(() => {
    function measure() { setLabelWidths(measureRefs.current.map(label => label?.offsetWidth ?? 0)); }
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Efecto cilindro: el nombre anterior sale girando hacia arriba mientras entra el nuevo.
  useEffect(() => {
    if (lastActive.current === active) return;
    setLeaving(lastActive.current);
    lastActive.current = active;
    const timer = window.setTimeout(() => setLeaving(null), 450);
    return () => window.clearTimeout(timer);
  }, [active]);

  // Se cierra con Esc, al tocar fuera o al seguir haciendo scroll.
  useEffect(() => {
    if (!isOpen) return;
    openedAt.current = window.scrollY;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // El botón deja de estar inactivo tras el siguiente pintado; entonces recibe el foco.
      if (navRef.current?.contains(document.activeElement)) requestAnimationFrame(() => toggleRef.current?.focus({ preventScroll: true }));
    }
    function onPointer(event: PointerEvent) { if (!navRef.current?.contains(event.target as Node)) setOpen(false); }
    function onScroll() { if (Math.abs(window.scrollY - openedAt.current) > 40) setOpen(false); }
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); window.removeEventListener("scroll", onScroll); };
  }, [isOpen]);

  const activeIndex = sectionLinks.findIndex(link => link.id === active);
  const currentIndex = activeIndex >= 0 ? activeIndex : sectionLinks.length;
  const pillIndex = hovered ?? (activeIndex >= 0 ? activeIndex : null);
  const style = {
    "--active-label": `${labelWidths[currentIndex] ?? 0}px`,
    "--pill-index": pillIndex ?? 0,
    "--pill-label": `${pillIndex === null ? 0 : labelWidths[pillIndex] ?? 0}px`,
  } as CSSProperties;

  function openMenu() {
    setOpen(true);
    setHovered(null);
    // Para quien navega con teclado: el foco pasa a la sección actual dentro del menú abierto.
    requestAnimationFrame(() => linkRefs.current[Math.max(activeIndex, 0)]?.focus({ preventScroll: true }));
  }
  function closeMenu() { setOpen(false); setHovered(null); requestAnimationFrame(() => toggleRef.current?.focus({ preventScroll: true })); }

  function renderCurrent(id: string, state: "enter" | "leave" | "still") {
    const item = compactItems.find(entry => entry.id === id) ?? menuItem;
    return <span key={`${state}-${id}`} className={`isla-roll${state === "enter" ? " is-entering" : state === "leave" ? " is-leaving" : ""}`} aria-hidden="true">
      <Icon>{item.icon}</Icon><span className="isla-text">{item.label}</span>
    </span>;
  }

  const currentLabel = (compactItems[currentIndex] ?? menuItem).label;
  return <nav ref={navRef} className={`isla${visible ? " is-visible" : ""}${isOpen ? " is-open" : ""}${pillIndex !== null ? " has-pill" : ""}`} style={style} aria-label="Navegación de secciones" aria-hidden={!visible} inert={!visible}>
    <span className="isla-measure" aria-hidden="true">
      {compactItems.map((item, index) => <span key={item.label} className="isla-text" ref={label => { measureRefs.current[index] = label; }}>{item.label}</span>)}
    </span>
    <button ref={toggleRef} type="button" className="isla-compact" aria-expanded={isOpen} aria-controls="isla-secciones" aria-label={`${currentLabel}. Abrir menú de secciones`} inert={isOpen} onClick={openMenu}>
      <span className="isla-current">
        {leaving !== null && renderCurrent(leaving, "leave")}
        {renderCurrent(active, leaving !== null ? "enter" : "still")}
      </span>
      <span className="isla-dots"><Icon><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></Icon></span>
    </button>
    <div id="isla-secciones" className="isla-panel" inert={!isOpen} onPointerLeave={() => setHovered(null)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(null); }}>
      {sectionLinks.map((link, index) => <a key={link.id} ref={anchor => { linkRefs.current[index] = anchor; }} href={`#${link.id}`}
        aria-current={active === link.id ? "location" : undefined} data-expanded={pillIndex === index ? "" : undefined}
        style={{ "--label": `${labelWidths[index] ?? 0}px` } as CSSProperties}
        onPointerEnter={() => setHovered(index)} onFocus={() => setHovered(index)} onClick={() => { setOpen(false); setHovered(null); }}>
        <Icon>{link.icon}</Icon>
        <span className="isla-label"><span className="isla-text">{link.label}</span></span>
      </a>)}
      <button type="button" className="isla-close" aria-label="Cerrar menú de secciones" onClick={closeMenu}><Icon><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon></button>
    </div>
  </nav>;
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
