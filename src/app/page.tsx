import { Metadata } from 'next'
import { HomePageLayout } from '@/components/layout'
import { InicioContent } from './InicioContent'

export const metadata: Metadata = {
  title: 'Guía de Accesibilidad Web',
  description: 'Una guía estratégica para integrar la accesibilidad en cualquier ciclo de vida del software. Transforma la accesibilidad de una consideración tardía a un componente intrínseco de los procesos de desarrollo.',
  keywords: ['accesibilidad', 'web', 'WCAG', 'desarrollo', 'inclusión', 'a11y', 'shift-left', 'ciclo de vida'],
  authors: [{ name: 'Equipo de Accesibilidad' }],
}

export default function HomePage() {
  return (
    <HomePageLayout>
      <InicioContent />
    </HomePageLayout>
  )
}
