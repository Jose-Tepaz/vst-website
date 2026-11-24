import type { CSSProperties } from "react";

// Texto de los botones: al pasar el cursor, cada letra sube y es reemplazada por su copia,
// una tras otra (ver .roll en globals.css). El texto completo queda disponible para lectores de pantalla.
export function Roll({ children }: { children: string }) {
  return <span className="roll">
    <span className="roll-sr">{children}</span>
    <span aria-hidden="true">{Array.from(children).map((char, index) => <span key={index} className="roll-char" style={{ "--i": index } as CSSProperties}>{char}</span>)}</span>
  </span>;
}
