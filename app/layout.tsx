import type { Metadata } from "next";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
