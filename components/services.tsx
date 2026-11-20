"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { contactHref, services } from "@/lib/content";
import { Arrow } from "@/components/arrow";
import { ServiceStage } from "@/components/service-stage";

export function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const total = services.length;
    const next: Record<string, number> = {
      ArrowDown: (active + 1) % total, ArrowRight: (active + 1) % total,
      ArrowUp: (active + total - 1) % total, ArrowLeft: (active + total - 1) % total,
      Home: 0, End: total - 1,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    setActive(next[event.key]);
    tabs.current[next[event.key]]?.focus();
  }

  return <section id="servicios" className="services services-scroll" aria-labelledby="services-title"><div className="wrap svc">
    <div className="svc-rail" data-reveal>
      <h2 id="services-title">Lo que <br />hacemos.</h2>
      <p>Diseño y desarrollo. <br />Un mismo equipo.</p>
      <div className="svc-tabs" role="tablist" aria-label="Nuestros servicios" onKeyDown={onKeyDown}>
        {services.map((service, index) => <button
          key={service.name}
          ref={element => { tabs.current[index] = element; }}
          type="button"
          role="tab"
          className="svc-tab"
          id={`servicio-tab-${index}`}
          aria-selected={active === index}
          aria-controls={`servicio-panel-${index}`}
          tabIndex={active === index ? 0 : -1}
          onClick={() => setActive(index)}
        >
          <span className="svc-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="svc-name">{service.name}</span>
          <span className="svc-arrow" aria-hidden="true"><i>+</i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg></span>
        </button>)}
      </div>
    </div>
    <div className="svc-panels" data-reveal>
      {services.map((service, index) => <div
        key={service.name}
        role="tabpanel"
        className="svc-panel"
        id={`servicio-panel-${index}`}
        aria-labelledby={`servicio-tab-${index}`}
        hidden={active !== index}
      >
        <div className="svc-copy">
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <ul className="svc-scope">{service.scope.map(scope => <li key={scope}>{scope}</li>)}</ul>
          <a className="cta" href={contactHref(service.short)} aria-label={`Hablemos de tu proyecto: ${service.name}`}>Hablemos de tu proyecto <Arrow /></a>
        </div>
        <ServiceStage index={index} />
      </div>)}
    </div>
  </div></section>;
}
