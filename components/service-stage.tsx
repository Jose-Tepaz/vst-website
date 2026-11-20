import type { CSSProperties } from "react";

// Orden de aparición de cada pieza: se lee como "una estructura que se arma".
const order = (value: number) => ({ "--i": value }) as CSSProperties;

const check = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>;

// Conector punteado: une una anotación con el elemento de la ventana que explica.
function Link({ path, from, to }: { path: string; from: [number, number]; to: [number, number] }) {
  return <svg className="wc-link" viewBox="0 0 48 24"><path d={path} fill="none" stroke="#0080FF" strokeWidth=".13" strokeDasharray=".4 .3" strokeLinecap="round" /><circle cx={from[0]} cy={from[1]} r=".3" fill="#fff" stroke="#0080FF" strokeWidth=".14" /><circle cx={to[0]} cy={to[1]} r=".3" fill="#fff" stroke="#0080FF" strokeWidth=".14" /></svg>;
}

function Shapes() {
  return <><span className="svc-shape svc-shape-a" /><span className="svc-shape svc-shape-b" /></>;
}

function WindowBar({ url }: { url: string }) {
  return <div className="wc-bar"><i /><i /><i /><span>{url}</span></div>;
}

// Servicio 01: de una estructura a una experiencia digital.
// La ventana es la protagonista; tipografía, retícula y componentes la anotan.
function WebComposition() {
  return <div className="svc-canvas svc-web" aria-hidden="true">
    <Shapes />
    <div className="piece wc-type" style={order(2)}><small>Tipografía</small><b>Aa</b><small className="sub">Archivo</small></div>
    <div className="piece wc-grid" style={order(3)}><small>Retícula</small><div><i /><i /><i /><i /></div></div>
    <div className="piece wc-browser" style={order(0)}>
      <WindowBar url="tumarca.com" />
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
    <Link path="M10.2 9.54C11 9 11.6 9.9 12.35 9.4" from={[10.2, 9.54]} to={[12.35, 9.4]} />
  </div>;
}

// Servicio 02: una herramienta que el equipo usa cada día.
function AppsComposition() {
  return <div className="svc-canvas svc-apps" aria-hidden="true">
    <Shapes />
    <div className="piece ap-chart" style={order(2)}><small>Herramientas de gestión</small><div className="ap-bars"><i /><i /><i /><i /></div></div>
    <div className="piece ap-flow" style={order(3)}><small>Flujos de trabajo</small>
      <ol><li><i /><span className="sk" /></li><li><i /><span className="sk" /></li><li className="next"><i /><span className="sk" /></li></ol>
    </div>
    <div className="piece ap-window" style={order(0)}>
      <WindowBar url="tuapp.com" />
      <div className="ap-page">
        <div className="ap-head"><b>Tu operación</b><nav><i className="on">Todo</i><i>En curso</i><i>Listo</i></nav></div>
        <div className="ap-metrics">
          <div><span className="sk" /><span className="sk big" /></div>
          <div><span className="sk" /><span className="sk big" /></div>
          <div><span className="sk" /><span className="sk big" /></div>
        </div>
        <div className="ap-rows">
          <div><i className="av" /><span className="sk" /><em className="pill a">Listo</em></div>
          <div><i className="av" /><span className="sk" /><em className="pill o">En curso</em></div>
          <div><i className="av" /><span className="sk" /><em className="pill g">Pendiente</em></div>
        </div>
      </div>
    </div>
    <div className="piece ap-detail" style={order(1)}><i className="av" /><span className="sk" /><span className="sk short" /><em className="pill o">En curso</em><span className="btn" /></div>
    <Link path="M10.2 10C11 9.6 11.6 10.4 12.4 10" from={[10.2, 10]} to={[12.4, 10]} />
  </div>;
}

// Servicio 03: una acción principal, a pocos toques.
function MobileComposition() {
  return <div className="svc-canvas svc-mobile" aria-hidden="true">
    <Shapes />
    <div className="piece mo-ux" style={order(2)}><small>Experiencia móvil</small><ol className="mo-steps"><li /><li /><li className="off" /></ol></div>
    <div className="piece mo-ui" style={order(3)}><small>Diseño de interfaces</small><div><i className="a" /><i className="b" /><i className="c" /></div></div>
    <div className="piece mo-main" style={order(0)}>
      <strong>Tu próxima cita,<br />a un toque.</strong>
      <span className="lb">Selecciona un día</span>
      <div className="mo-days"><span>Lun<b>12</b></span><span className="on">Mar<b>13</b></span><span>Mié<b>14</b></span><span>Jue<b>15</b></span></div>
      <span className="lb">Horarios disponibles</span>
      <div className="mo-slots"><span className="on">10:00</span><span>11:30</span></div>
      <span className="mo-btn">Reservar una cita</span>
    </div>
    <div className="piece mo-done" style={order(1)}><i className="ok">{check}</i><div><strong>Cita de ejemplo confirmada</strong><span className="sk" /></div></div>
    <Link path="M16.2 15C19 14.4 21.4 16.2 24.6 15.44" from={[16.2, 15]} to={[24.6, 15.44]} />
  </div>;
}

// Servicio 04: el agente prepara el trabajo; el equipo lo revisa.
function AgentComposition() {
  return <div className="svc-canvas svc-agent" aria-hidden="true">
    <Shapes />
    <div className="piece ia-steps" style={order(2)}><small>Automatización de tareas</small>
      <ul><li><i>{check}</i>Recibir la consulta</li><li><i>{check}</i>Consultar la información</li><li><i>{check}</i>Preparar una respuesta</li></ul>
    </div>
    <div className="piece ia-window" style={order(0)}>
      <WindowBar url="tumarca.com" />
      <div className="ia-page">
        <div className="ia-list">
          <span className="lb">Consultas</span>
          <div className="ia-item on"><i className="av" /><div><span className="sk" /><span className="sk short" /></div></div>
          <div className="ia-item"><i className="av" /><div><span className="sk" /><span className="sk short" /></div></div>
          <div className="ia-item"><i className="av" /><div><span className="sk" /><span className="sk short" /></div></div>
        </div>
        <div className="ia-chat">
          <b>Consulta recibida</b>
          <div className="ia-msg"><i className="av" /><div><span className="sk" /><span className="sk" /><span className="sk short" /></div></div>
          <div className="ia-reply">
            <header>Respuesta sugerida<em className="pill o">Lista para revisar</em></header>
            <span className="sk" /><span className="sk" /><span className="sk" /><span className="sk short" />
            <div className="ia-actions"><span className="o">Editar</span><span className="a">Enviar</span></div>
          </div>
        </div>
      </div>
    </div>
    <div className="piece ia-site" style={order(1)}><small>Tu sitio web</small><span className="field" /><span className="field" /><span className="btn" /></div>
    <Link path="M9.6 8.15C10.3 7.7 10.9 8.6 11.6 8.15" from={[9.6, 8.15]} to={[11.6, 8.15]} />
  </div>;
}

// Servicio 05: sistemas que comparten el mismo contexto.
function IntegrationComposition() {
  return <div className="svc-canvas svc-integration" aria-hidden="true">
    <Shapes />
    <div className="piece in-sys" style={order(2)}><small>Integración de sistemas</small>
      <svg viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4h18M16 1l4 3-4 3M22 11H4M8 8l-4 3 4 3" /></svg>
      <span className="sk" /><span className="sk short" />
    </div>
    <div className="piece in-help" style={order(3)}><small>Acompañamiento técnico</small>
      <div><i className="av" /><span className="sk" /></div><div><i className="av" /><span className="sk short" /></div>
    </div>
    <div className="piece in-window" style={order(0)}>
      <WindowBar url="tumarca.com" />
      <div className="in-page">
        <div className="in-head"><b>El mismo contexto</b><em className="pill o">Sistemas conectados</em></div>
        <div className="in-map">
          <div className="in-node"><span className="ni"><i /></span><span className="lbl">Tu sitio web</span></div>
          <span className="in-line" />
          <div className="in-node"><span className="ni"><i /></span><span className="lbl">Tu CRM</span></div>
          <span className="in-line" />
          <div className="in-node"><span className="ni"><i /></span><span className="lbl">Tu equipo</span></div>
        </div>
        <div className="in-log">
          <div><i>{check}</i><span className="sk" /></div>
          <div><i>{check}</i><span className="sk" /></div>
        </div>
      </div>
    </div>
    <div className="piece in-done" style={order(1)}><i>{check}</i><strong>Una operación con continuidad</strong></div>
    <Link path="M10.2 11C11 10.6 11.6 11.4 12.4 11.04" from={[10.2, 11]} to={[12.4, 11.04]} />
  </div>;
}

export function ServiceStage({ index }: { index: number }) {
  const compositions = [WebComposition, AppsComposition, MobileComposition, AgentComposition, IntegrationComposition];
  const Composition = compositions[index] ?? WebComposition;
  return <figure className="svc-stage">
    <Composition />
  </figure>;
}
