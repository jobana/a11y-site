import { InternalPageLayout } from '@/components/layout'
import { PruebasNewContent } from './PruebasNewContent'
import { TestTube } from 'lucide-react'

// Contenido HTML simulado para el TOC (basado en los IDs de las secciones)
const content = `
<h2 id="piramide-testing">Pirámide de Testing de Accesibilidad</h2>
<h2 id="navegacion-teclado">Navegación por Teclado</h2>
<h2 id="criterios-wcag">Verificación Manual de WCAG</h2>
<h2 id="herramientas-testing">Herramientas de Testing</h2>
`

export default function PruebasPage() {
  return (
    <InternalPageLayout
      content={content}
      heroIcon={TestTube}
      heroTitle="Fase 4: Pruebas"
      heroDescription="La validación sistemática de la accesibilidad. En esta fase, se verifica que el producto cumpla con los estándares establecidos y sea usable por personas con diferentes capacidades."
      heroBackground="primary"
    >
      <PruebasNewContent />
    </InternalPageLayout>
  )
}