import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vástago Studio — Diseño y desarrollo de software",
  icons: { icon: "/icon.svg" },
  description: "Estudio boutique con 4 años de experiencia en diseño UX/UI, desarrollo web, web apps, aplicaciones móviles, agentes de IA, integraciones y consultoría.",
  openGraph: { title: "Vástago Studio", description: "Del diseño al despliegue. Productos digitales con criterio.", locale: "es", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
