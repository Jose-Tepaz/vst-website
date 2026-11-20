// Flecha de los botones. Lleva dos copias: al pasar el cursor, la primera sale cortada
// por el borde de su caja y la segunda entra desde el lado contrario (ver .arrow en globals.css).
// El trazo es el mismo de las flechas de «Lo que hacemos».
const paths = {
  "up-right": "M7 17 17 7M8 7h9v9",
  down: "M12 6v12M7 13l5 5 5-5",
  up: "M12 18V6M7 11l5-5 5 5",
  right: "M6 12h12M13 7l5 5-5 5",
  left: "M18 12H6M11 7l-5 5 5 5",
} as const;

export function Arrow({ direction = "up-right" }: { direction?: keyof typeof paths }) {
  const icon = <svg viewBox="5 5 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={paths[direction]} /></svg>;
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">{icon}{icon}</span>;
}
