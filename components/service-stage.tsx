import type { CSSProperties } from "react";

// Orden de aparición de cada pieza: se lee como "una estructura que se arma".
const order = (value: number) => ({ "--i": value }) as CSSProperties;

// Servicio 01: de una estructura a una experiencia digital.
// La ventana es la protagonista; tipografía, retícula y componentes la anotan.
function WebComposition() {
  return <div className="svc-canvas svc-web" aria-hidden="true">
    <span className="svc-shape svc-shape-a" /><span className="svc-shape svc-shape-b" />
    <div className="piece wc-type" style={order(2)}><small>Tipografía</small><b>Aa</b><small className="sub">Archivo</small></div>
    <div className="piece wc-grid" style={order(3)}><small>Retícula</small><div><i /><i /><i /><i /></div></div>
    <div className="piece wc-browser" style={order(0)}>
      <div className="wc-bar"><i /><i /><i /><span>tumarca.com</span></div>
      <div className="wc-page">
        <div className="wc-nav">
          <b>Tu marca</b>
          <nav className="wc-links"><i>Proyectos</i><i>Servicios</i><i>Estudio</i></nav>
          <span>Contacto</span>
        </div>
        <div className="wc-hero">
          <div>
            <strong>Una idea.<br />Todo por crear.</strong>
            <em /><em />
            <span className="wc-cta">Explorar<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </div>
          <div className="wc-art"><i /></div>
        </div>
        <div className="wc-cards">
          <div><span className="ic" /><span className="ln" /><span className="ln" /></div>
          <div><span className="ic" /><span className="ln" /><span className="ln" /></div>
          <div><span className="ic" /><span className="ln" /><span className="ln" /></div>
        </div>
      </div>
    </div>
    <div className="piece wc-phone" style={order(1)}>
      <div className="wc-phone-bar"><b>Tu marca</b><i /></div>
      <strong>Una idea.<br />Todo por crear.</strong>
      <em /><em />
      <div className="wc-phone-art"><i /></div>
    </div>
    <div className="piece wc-parts" style={order(4)}><small>Componentes</small><div><i className="a" /><i className="b" /><i className="c" /></div></div>
    <svg className="wc-link" viewBox="0 0 48 24"><path d="M10.2 9.54C11 9 11.6 9.9 12.35 9.4" fill="none" stroke="#0080FF" strokeWidth=".13" strokeDasharray=".4 .3" strokeLinecap="round" /><circle cx="10.2" cy="9.54" r=".3" fill="#fff" stroke="#0080FF" strokeWidth=".14" /><circle cx="12.35" cy="9.4" r=".3" fill="#fff" stroke="#0080FF" strokeWidth=".14" /></svg>
  </div>;
}

// Servicios 02 a 05: pendientes de diseñar con el mismo lenguaje del 01.
function PendingComposition() {
  return <div className="svc-canvas svc-pending"><span>Composición en preparación</span></div>;
}

export function ServiceStage({ index }: { index: number }) {
  return <figure className="svc-stage">
    {index === 0 ? <WebComposition /> : <PendingComposition />}
    <figcaption className="svc-chip"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5 14 9l6.5 2L14 13l-2 6.5L10 13l-6.5-2L10 9z" /></svg>Ejemplo conceptual</figcaption>
  </figure>;
}
