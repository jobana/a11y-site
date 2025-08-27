import { InternalPageLayout } from '@/components/layout'
import { DiseñoNewContent } from './DiseñoNewContent'
import { Palette } from 'lucide-react'

// Contenido HTML simulado para el TOC (basado en los IDs de las secciones)
const content = `
<h2 id="impacto-diseno-inclusivo">Impacto del Diseño Inclusivo</h2>
<h2 id="principios-diseno">Principios de Diseño Inclusivo</h2>
<h2 id="tipos-discapacidades">Diseñando para Diferentes Capacidades</h2>
<h2 id="contraste-colores">Contraste, Colores y Tipografía</h2>
<h2 id="herramientas-diseno">Herramientas para Diseño Accesible</h2>
`

export default function DiseñoPage() {
  return (
    <InternalPageLayout
      content={content}
      heroIcon={Palette}
      heroTitle="Fase 2: Diseño"
      heroDescription="El diseño inclusivo es la base para crear experiencias digitales accesibles. En esta fase, los principios de accesibilidad se traducen en decisiones de diseño que benefician a todos los usuarios."
      heroBackground="secondary"
    >
      <DiseñoNewContent />
    </InternalPageLayout>
  )
}