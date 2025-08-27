import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guía de Accesibilidad Web",
  description: "Una guía completa para desarrollar aplicaciones web accesibles siguiendo las mejores prácticas y estándares WCAG.",
  keywords: ["accesibilidad", "web", "WCAG", "desarrollo", "inclusión", "a11y"],
  authors: [{ name: "Equipo de Accesibilidad" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`} suppressHydrationWarning>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}