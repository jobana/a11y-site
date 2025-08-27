import { InternalPageLayout } from '@/components/layout'
import { DespliegueNewContent } from './DespliegueNewContent'
import { Rocket } from 'lucide-react'

// Contenido HTML simulado para el TOC (basado en los IDs de las secciones)
const content = `
<h2 id="objetivos-despliegue">Objetivos del Despliegue Accesible</h2>
<h2 id="checklist-predespliegue">Checklist Pre-Despliegue</h2>
<h2 id="herramientas-monitoreo">Herramientas de Monitoreo</h2>
<h2 id="plan-mantenimiento">Plan de Mantenimiento Continuo</h2>
`

export default function DespliegePage() {
  return (
    <InternalPageLayout
      content={content}
      heroIcon={Rocket}
      heroTitle="Fase 5: Despliegue"
      heroDescription="El lanzamiento seguro y monitoreado de la accesibilidad. En esta fase final, se asegura que el producto mantenga su calidad accesible en producción y se establecen procesos de monitoreo continuo."
      heroBackground="secondary"
    >
      <DespliegueNewContent />
    </InternalPageLayout>
  )
}