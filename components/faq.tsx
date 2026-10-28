const questions = [
  { question: "¿Qué podemos construir juntos?", answer: "Diseñamos experiencias UX/UI y desarrollamos sitios web, web apps y aplicaciones móviles. También integramos y desplegamos agentes de IA, conectamos sistemas y ofrecemos consultoría tecnológica." },
  { question: "¿Necesito tener mi idea completamente definida?", answer: "Podemos empezar con una idea, un problema o una experiencia que quieras mejorar. En la primera etapa conversamos sobre tu negocio y las personas que usarán el producto para definir una dirección y un alcance compartidos." },
  { question: "¿Pueden trabajar sobre un producto que ya existe?", answer: "Sí. Podemos ayudarte a mejorar su diseño, desarrollar nuevas funcionalidades o conectar las herramientas de tu operación. Primero revisamos el contexto y el estado del producto para definir cómo avanzar." },
  { question: "¿Cuánto tiempo toma un proyecto y cómo se cotiza?", answer: "Depende del alcance, la complejidad y las integraciones que necesite. Antes de comenzar, definimos contigo los entregables, las prioridades y las etapas para preparar una propuesta de tiempos y presupuesto." },
  { question: "¿Cómo participo durante el proceso?", answer: "Trabajamos contigo en cuatro etapas: entender, diseñar, desarrollar y desplegar. Tu conocimiento del negocio forma parte de las decisiones; compartimos avances y revisamos la dirección del producto a lo largo del proyecto." },
  { question: "¿Pueden integrar IA con las herramientas de mi negocio?", answer: "Sí. Partimos de una tarea concreta y revisamos qué información, herramientas y permisos necesita el agente. Definimos su alcance y cómo revisar sus resultados antes de integrarlo y desplegarlo." },
  { question: "¿Qué pasa después del lanzamiento?", answer: "Antes del despliegue revisamos el funcionamiento del producto y acordamos contigo el acompañamiento que necesita. El mantenimiento, las mejoras y las siguientes etapas se definen según el alcance de cada proyecto." },
];

export function Faq() {
  return <section id="preguntas" className="faq-section wrap" aria-labelledby="faq-title">
    <div className="faq-intro"><h2 id="faq-title">Preguntas<br />frecuentes.</h2><p>Resolvemos algunas preguntas que suelen aparecer al construir un producto digital.</p><a href="#contacto">¿Tienes otra pregunta? Hablemos <span aria-hidden="true">↗</span></a></div>
    <div className="faq-list">{questions.map(item => <details className="faq-item" name="studio-faq" key={item.question}><summary>{item.question}<span className="faq-indicator" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
  </section>;
}
