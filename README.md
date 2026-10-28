# Vástago Studio

Landing page en Next.js, React y TypeScript. Una única ruta pública; casos de estudio reservados para la etapa 2.

## Desarrollo

```sh
npm install
npm run dev
```

Abre http://127.0.0.1:3000. Validación: `npm run typecheck` y `npm run build`.

## Contenido

`lib/content.ts` contiene los proyectos, servicios y correo. `app/page.tsx` contiene la presentación del estudio y el proceso propuesto. `app/globals.css` define los tokens de marca y el diseño responsive.

Las portadas de los cuatro proyectos son composiciones tipográficas provisionales, no capturas ni identidades oficiales de los clientes. No se atribuyen servicios o resultados a proyectos sin confirmar. Sustituirlas por material real en la etapa 2. El correo `hola@vastago.studio` procede del documento de branding y debe confirmarse antes de publicar. El selector prepara un mailto; no envía ni almacena mensajes.

El branding original permanece en `Vastago Brand.dc.html`. No se ha desplegado el sitio.

## Cinta animada

`components/phrase-ribbon.tsx` presenta frases sobre una cinta curva azul en la parte inferior del hero. La constante `phrase` permite editar el texto. Incluye pausa y reanudación, conserva la posición al pausar y detiene el trabajo cuando la cinta está fuera de pantalla o la pestaña está oculta. Con movimiento reducido muestra todas las frases en un bloque estático. La referencia de comportamiento es la cinta pública de https://two26.studio/; se utiliza una curva propia y los colores de Vástago, sin dependencias de animación.

## Proceso por paneles

`components/build-process.tsx` contiene cuatro paneles que se apilan con scroll natural, inspirados en La Méthode de Studio RS. Cada etapa presenta título, descripción, entregable propuesto, número y enlace a la siguiente. El panel anterior reduce ligeramente su escala y se oscurece cuando entra el siguiente. La navegación superior permite saltar directamente a una etapa. Con movimiento reducido se muestran como bloques normales sin efectos. No se añaden dependencias.

## Servicios

`components/services.tsx` presenta un recorrido inspirado en “Managed in one app” de Numa. En escritorio, el título y la vista conceptual permanecen fijos mientras las tarjetas de servicio se relevan al hacer scroll. Los enlaces permiten saltar a cada servicio. En móvil y con movimiento reducido, cada servicio muestra su propio ejemplo junto al contenido, sin fijar ni apilar las tarjetas.

Las tres interfaces son ejemplos conceptuales interactivos, no capturas de trabajos reales: una revisión de prototipo que puede completarse, un pedido de muestra con cantidad y total, y un flujo ilustrativo de integración de IA. No hay compras, procesamiento real de IA ni envío de datos. El código conserva el estado de cada ejemplo durante la navegación del recorrido.

La cinta del hero admite arrastre horizontal con ratón o tacto, y desplazamiento con las flechas al enfocarla. Conserva el movimiento automático y la pausa; el desplazamiento táctil vertical de la página sigue disponible.

Las vistas conceptuales de Servicios se reproducen automáticamente en ciclos de seis fases: avance del producto, selección y confirmación de un pedido de muestra, y consulta/preparación de una respuesta ilustrativa de IA. Cada instancia solo reproduce su ciclo cuando está visible y la pestaña está activa; movimiento reducido conserva el ejemplo estático. La sección usa el negro de marca #0B0E13 y texto blanco sobre azul. No se envían solicitudes ni se procesan compras reales.

Oferta actual: Diseño UX/UI y desarrollo web; Web apps; Aplicaciones móviles; Agentes de IA; Integraciones y consultoría. La sección y el selector de contacto comparten `lib/content.ts` como fuente. Los cinco ejemplos automáticos corresponden a una web, gestión de proyectos, reserva móvil, agente e integración de sistemas.

Los cinco dispositivos comparten el mismo chasis de iPhone y la misma altura por breakpoint. Incluyen marco, botones laterales, Dynamic Island, barra de estado y gesto de inicio. El contenido tiene desplazamiento interno cuando lo necesita, sin alterar la altura exterior. Los marcadores de servicio permanecen en el flujo normal para que el dispositivo y la navegación coincidan con la tarjeta activa durante el scroll.

Navegación: al inicio se conserva el menú superior y Hablemos se destaca como botón azul. Al salir del inicio aparece una pastilla azul centrada abajo con los cuatro enlaces y sección activa; se oculta al regresar arriba. La pastilla oculta queda fuera de la navegación por teclado. Incluye tamaños móviles, área segura inferior y movimiento reducido.

El encabezado completo solo reaparece al volver al inicio (scroll de 0–2px), con entrada desde arriba. Durante todo el recorrido se mantiene la pastilla inferior, independientemente de la dirección del scroll.

Esquinas redondeadas solicitadas: tarjetas de proyectos, experiencia y proceso con radio 28px (22px en móvil); botones y superficies de las demos con 14px (12px en móvil), detalles pequeños con 8px. Se conservan el chasis del iPhone y la pastilla de navegación.

## Cierre de contacto

`components/contact-footer.tsx` reúne contacto y pie de página en un único footer semántico con `id="contacto"`. Usa el azul del logo con texto blanco, título Hablemos, selección de servicios, correo directo, navegación y firma de Vástago. Conserva `ProjectBrief` como isla interactiva y no agrega solicitudes externas. En móvil pasa a una columna; los controles mantienen áreas táctiles y foco visible.

Equipo: componente Team entre proceso y contacto, cinco perfiles según confirmación del usuario. Tres columnas en escritorio, dos en tablet y una en móvil. Nombres, roles y fotos pendientes; bloques de marca provisionales, sin identidades inventadas.

Preguntas frecuentes: `components/faq.tsx`, después del equipo y antes del contacto. Siete respuestas desplegables con details/summary nativos y apertura exclusiva; sin JavaScript adicional. No se publican tarifas, plazos ni compromisos de soporte no confirmados.
