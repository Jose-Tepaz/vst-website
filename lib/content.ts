export const studio = {
  name: "Vástago Studio",
  email: "hola@vastago.studio",
};

// Portadas editoriales provisionales. Los casos y capturas reales llegan en la etapa 2.
export const projects = [
  { name: "Eppigo GoAMS", cover: "eppigo", word: "Eppigo", sub: "GoAMS", mark: "e" },
  { name: "Winkelman", cover: "winkelman", word: "Winkelman", sub: "", mark: "W" },
  { name: "Teknergy", cover: "teknergy", word: "Teknergy", sub: "", mark: "T" },
  { name: "Tienda Borgatta", cover: "borgatta", word: "borgatta", sub: "Tienda", mark: "b" },
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
