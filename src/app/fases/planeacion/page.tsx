import { InternalPageLayout } from '@/components/layout'
import { PlaneacionNewContent } from './PlaneacionNewContent'
import { ClipboardList } from 'lucide-react'

// Contenido HTML simulado para el TOC (basado en los IDs de las secciones)
const content = `
<h2 id="shift-left">El Principio Shift-Left: La Estrategia Inteligente</h2>
<h2 id="requisitos-accesibilidad">Requisitos de Accesibilidad</h2>
<h2 id="historias-usuario">Historias de Usuario Accesibles</h2>
<h2 id="buenas-practicas">Buenas Prácticas para una Planificación Inclusiva</h2>
<h2 id="buenas-practicas-detalladas">Buenas Prácticas para Planificación Inclusiva</h2>
`

export default function PlaneacionPage() {
  return (
    <InternalPageLayout
      content={content}
      heroIcon={ClipboardList}
      heroTitle="Fase 1: Planeación"
      heroDescription="La fase de planeación es la de mayor impacto y la más económica para integrar la accesibilidad. Un requisito de accesibilidad omitido en esta etapa puede costar hasta 100 veces más rectificarlo en fases posteriores."
      heroBackground="primary"
    >
      <PlaneacionNewContent />
    </InternalPageLayout>
  )
}
