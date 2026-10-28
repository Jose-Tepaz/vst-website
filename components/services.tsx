"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { contactHref, services } from "@/lib/content";


function ServiceDemo({ index }: { index: number }) {
  const [done, setDone] = useState(false);
  const [example, setExample] = useState(false);
  const [phase, setPhase] = useState(0);
  const demoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = false;
    function sync() {
      clearInterval(timer);
      timer = undefined;
      if (visible && !reduced.matches && !document.hidden) {
        timer = setInterval(() => setPhase(value => (value + 1) % 6), 1500);
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .25 });
    if (demoRef.current) observer.observe(demoRef.current);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { clearInterval(timer); observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  const completed = done || phase >= 2;
  const running = example || phase > 0;
  return <div className="iphone-shell">
    <span className="iphone-volume" aria-hidden="true" /><span className="iphone-power" aria-hidden="true" />
    <div className={`service-demo demo-${index} demo-phase-${phase}`} ref={demoRef} data-ui data-phase={phase}>
    <div className="iphone-status" aria-hidden="true"><span>9:41</span><span className="iphone-island"><i /></span><svg viewBox="0 0 55 20" fill="currentColor"><path d="M1 15h3v4H1zm5-4h3v8H6zm5-4h3v12h-3zm5-4h3v16h-3z"/><rect x="27" y="4" width="23" height="13" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="30" y="7" width="16" height="7" rx="1"/><path d="M52 8h2v5h-2z"/></svg></div>
    <div className="demo-top"><span className="demo-vst">VST</span><span>Ejemplo conceptual</span></div>
    {index === 1 ? <div className="demo-content"><p className="demo-greeting">Tu equipo, conectado.</p><h4>Un lugar para<br />hacer que pase.</h4><div className="demo-project"><span>Proyecto web</span><strong>{["En diseño", "Revisando prototipo", "Diseño aprobado", "Desarrollo en curso", "Listo para desplegar", "Producto publicado"][phase]}</strong><div className="demo-progress"><span style={{ width: done ? "100%" : `${[24, 40, 60, 78, 94, 100][phase]}%` }} /></div></div><p className="demo-label">Lo que sigue</p><button className={`demo-task${completed ? " completed" : ""}`} onClick={() => setDone(!completed)} aria-pressed={completed}><span className="demo-check" aria-hidden="true">{completed ? "✓" : ""}</span>Revisar el prototipo</button><p className="demo-feedback">{["El proyecto empieza a tomar forma.", "Tu equipo revisa la experiencia.", "Revisión completa. Podemos avanzar.", "Diseño y desarrollo conectados.", "Últimos detalles antes de salir.", "Una idea que ya se puede usar."][phase]}</p></div>
    : index === 0 ? <div className="demo-content"><p className="demo-greeting">Una web con tu identidad.</p><h4>Del diseño<br />a tu web.</h4><div className="demo-site"><div className="demo-site-nav"><strong>Tu marca</strong><span>Estudio · Contacto</span></div><div className={`demo-site-page site-phase-${phase}`}><strong>Una idea.<br />Todo por crear.</strong><p>Un espacio digital para contar lo que haces.</p><span className="demo-site-action">Explorar el proyecto ↗</span></div></div><div className="demo-order-status"><span aria-hidden="true">{phase >= 4 ? "✓" : "↗"}</span>{["Explorando el recorrido", "Definiendo la interfaz", "Probando el prototipo", "Desarrollando la web", "Revisando cada pantalla", "Web lista para publicar"][phase]}</div><p className="demo-feedback">Del diseño de la experiencia al sitio en funcionamiento.</p></div>
    : index === 2 ? <div className="demo-content"><p className="demo-greeting">Pensada para llevar contigo.</p><h4>Tu próxima cita,<br />a un toque.</h4><div className="demo-mobile-booking"><p>Selecciona un día</p><div className="demo-days">{["Lun", "Mar", "Mié", "Jue"].map((day, dayIndex) => <span key={day} className={dayIndex === (phase < 2 ? 0 : 2) ? "is-selected" : ""}>{day}<strong>{12 + dayIndex}</strong></span>)}</div><p>Horarios disponibles</p><div className="demo-time-slots"><span className={phase >= 3 ? "is-selected" : ""}>10:00</span><span>11:30</span></div></div><button className="demo-run" onClick={() => setDone(!done)} aria-pressed={done}>{done || phase >= 4 ? "Cita de ejemplo confirmada ✓" : "Reservar una cita"}</button><p className="demo-feedback">{["Explora las fechas disponibles.", "Elige el día que te funciona.", "Tu selección se guarda.", "Un horario que encaja contigo.", "Confirmación lista en tu teléfono.", "Una experiencia móvil completa."][phase]}</p></div>
    : index === 4 ? <div className="demo-content"><p className="demo-greeting">Cada sistema, conectado.</p><h4>Tus herramientas.<br />El mismo contexto.</h4><div className="demo-connections">{["Tu sitio web", "Tu CRM", "Tu equipo"].map((system, systemIndex) => <div key={system} className={phase > systemIndex ? "is-connected" : ""}><span>{system}</span><span aria-hidden="true">{phase > systemIndex ? "✓" : "·"}</span></div>)}</div><div className="demo-order-status"><span aria-hidden="true">↗</span>{["Revisando el contexto", "Definiendo la conexión", "Sincronizando información", "Validando el recorrido", "Sistemas conectados", "Una operación con continuidad"][phase]}</div><p className="demo-feedback">Consultoría e integración adaptadas a tu operación. Flujo de muestra.</p></div>
    : <div className="demo-content"><p className="demo-greeting">Herramientas que se conectan.</p><h4>Menos pasos.<br />Más contexto.</h4><div className="demo-message" key={phase}>{["Llega una consulta desde tu sitio web.", "Consulta recibida. Buscando contexto…", "Consultando la información del negocio…", "Preparando una propuesta de respuesta…", "Respuesta lista para revisar.", "Consulta atendida. El equipo tiene el contexto."][phase]}</div><button className="demo-run" onClick={() => setExample(!example)} aria-pressed={example}>{example ? "Reiniciar ejemplo" : "Ver el recorrido"}<span aria-hidden="true">↗</span></button><ol className={`demo-workflow${running ? " is-running" : ""}`}>{["Recibir la consulta", "Consultar la información", "Preparar una respuesta"].map((step, stepIndex) => <li key={step} className={example || phase > stepIndex ? "is-complete" : ""}><span aria-hidden="true">{example || phase > stepIndex ? "✓" : "·"}</span>{step}</li>)}</ol><p className="demo-feedback">Recorrido automático de ejemplo. Sin conexión a datos reales.</p></div>}
    <div className="demo-bottom"><span>Diseñado para las personas.</span><span aria-hidden="true">↗</span></div>
    </div><span className="iphone-home" aria-hidden="true" />
  </div>;
}

export function Services() {
  const [active, setActive] = useState(0);
  const laneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const lane = laneRef.current;
      if (!lane) return;
      const cards = Array.from(lane.querySelectorAll<HTMLElement>(".service-marker"));
      const laneTop = lane.getBoundingClientRect().top;
      let next = 0;
      cards.forEach((card, index) => { if (laneTop + card.offsetTop <= window.innerHeight * .4) next = index; });
      setActive(previous => previous === next ? previous : next);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  return <section id="servicios" className="services services-scroll" aria-labelledby="services-title"><div className="wrap service-journey">
    <div className="service-rail"><h2 id="services-title">Lo que<br />hacemos.</h2><p>Diseño y desarrollo.<br />Un mismo equipo.</p><nav aria-label="Nuestros servicios">{services.map((service, index) => <a key={service.name} href={`#servicio-${index}`} aria-current={active === index ? "step" : undefined}>{service.name}<span aria-hidden="true">{active === index ? "↗" : "+"}</span></a>)}</nav></div>
    <div className="service-showcase" aria-label="Ejemplos conceptuales de nuestros servicios">{services.map((service, index) => <div key={service.name} hidden={active !== index} className="service-demo-frame"><ServiceDemo index={index} /></div>)}</div>
    <div className="service-chapters" ref={laneRef}>{services.map((service, index) => <Fragment key={service.name}><span className="service-marker" id={`servicio-${index}`} aria-hidden="true" /><article className={`service-chapter service-chapter-${index}`}>
      <div className="service-chapter-copy"><h3>{service.name}</h3><p>{service.description}</p><ul>{service.scope.map(scope => <li key={scope}>{scope}</li>)}</ul><a href={contactHref(service.short)}>Hablemos de tu idea <span aria-hidden="true">↗</span></a></div>
      <div className="service-demo-mobile"><ServiceDemo index={index} /></div>
    </article></Fragment>)}</div>
  </div></section>;
}
