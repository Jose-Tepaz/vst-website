export const studio = {
  name: "Vástago Studio",
  email: "hola@vastago.studio",
};

export const projects = [
  { name: "Eppigo", cover: "eppigo", word: "Eppigo", sub: "", mark: "e", image: "eppigo-4.png", description: "Marketplace de seguros para cotizar, comparar y contratar pólizas en línea en Estados Unidos, en pocos pasos." },
  { name: "Winkelman", cover: "winkelman", word: "Winkelman", sub: "", mark: "W", image: "winkelman-1.png", description: "Sitio web renovado para presentar con claridad los servicios de ingeniería civil y topografía de Winkelman y facilitar el contacto con sus clientes en Estados Unidos." },
  {
    name: "GoAMS",
    cover: "goams",
    image: "go-ams.png",
    description: "Plataforma de gestión para agencias y agentes de seguros, con un panel para consultar pólizas, clientes, citas y comisiones.",
  },
  {
    name: "VSTCONTROL",
    cover: "vstcontrol",
    image: "plataforma-de-control.png",
    description: "Plataforma de gestión interna para dar seguimiento a facturas vencidas, cuentas por pagar y por cobrar, y al avance de los proyectos. Incluye un asistente de inteligencia artificial para interactuar con la plataforma.",
  },
];

export const services = [
  { name: "Diseño UX/UI y desarrollo web", short: "Diseño y desarrollo web", description: "Diseñamos experiencias claras y desarrollamos sitios web que expresan tu marca. Del recorrido de las personas a una web lista para publicarse.", scope: ["Diseño UX/UI", "Sitios web", "Desarrollo web"] },
  { name: "Web apps", short: "Una web app", description: "Creamos aplicaciones web alrededor de tu operación. Conectamos flujos, información y herramientas en una experiencia que tu equipo pueda usar cada día.", scope: ["Aplicaciones web", "Flujos de trabajo", "Herramientas de gestión"] },
  { name: "Aplicaciones móviles", short: "Una aplicación móvil", description: "Diseñamos y desarrollamos aplicaciones móviles pensando en cómo las personas usan su teléfono. Cuidamos cada recorrido, desde la primera pantalla hasta la acción principal.", scope: ["Experiencia móvil", "Diseño de interfaces", "Desarrollo de aplicaciones"] },
  { name: "Agentes de IA", short: "Un agente de IA", description: "Integramos y desplegamos agentes de inteligencia artificial que trabajan con tus herramientas e información, con un propósito definido desde el inicio.", scope: ["Agentes de IA", "Automatización de tareas", "Integración y despliegue"] },
  { name: "Integraciones y consultoría", short: "Integraciones y consultoría", description: "Conectamos sistemas y te ayudamos a tomar decisiones de tecnología. Revisamos tu contexto, definimos una dirección y acompañamos la integración que tu negocio necesita.", scope: ["Integración de sistemas", "Consultoría tecnológica", "Acompañamiento técnico"] },
];

export function contactHref(service?: string) {
  return `mailto:${studio.email}?subject=${encodeURIComponent("Un nuevo proyecto con Vástago")}&body=${encodeURIComponent(`Hola, Vástago.\n\nQuiero conversar sobre ${service || "un proyecto"}.\n\nMi idea es:\n\n`)}`;
}
