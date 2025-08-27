import { InternalPageLayout } from '@/components/layout'
import { DesarrolloNewContent } from './DesarrolloNewContent'
import { Code } from 'lucide-react'

// Contenido HTML simulado para el TOC (basado en los IDs de las secciones)
const content = `
<h2 id="jerarquia-accesibilidad">La Jerarquía de la Accesibilidad</h2>
<h2 id="html-semantico">HTML Semántico</h2>
<h2 id="patrones-aria">Patrones ARIA Esenciales</h2>
<h2 id="frameworks-librerias">Accesibilidad en Frameworks</h2>
<h2 id="herramientas-desarrollo">Herramientas de Desarrollo</h2>
`

export default function DesarrolloPage() {
  return (
    <InternalPageLayout
      content={content}
      heroIcon={Code}
      heroTitle="Fase 3: Desarrollo"
      heroDescription="La implementación técnica de la accesibilidad. En esta fase, el código se convierte en la herramienta para hacer realidad los principios de diseño inclusivo, siguiendo estándares web y mejores prácticas."
      heroBackground="tertiary"
    >
      <DesarrolloNewContent />
    </InternalPageLayout>
  )
}