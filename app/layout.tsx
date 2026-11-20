import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";

// El mismo título y descripción se usan en buscadores y al compartir el enlace.
const title = "Vástago Studio — Diseño y desarrollo de software";
const description = "Estudio boutique con 4 años de experiencia en diseño UX/UI, desarrollo web, web apps, aplicaciones móviles, agentes de IA, integraciones y consultoría.";

export const metadata: Metadata = {
  title,
  icons: { icon: "/icon.svg" },
  description,
  openGraph: { title, description, locale: "es", type: "website" },
};

// Las tipografías se piden junto con el HTML, no cuando el navegador termina de leer el CSS:
// así el texto llega ya con Archivo y se reduce el cambio de tipografía al cargar.
const fontWeights = [400, 500, 600, 700, 800];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  for (const weight of fontWeights) preload(`/fonts/archivo-${weight}.ttf`, { as: "font", type: "font/ttf", crossOrigin: "anonymous" });
  return <html lang="es"><body>{children}</body></html>;
}
