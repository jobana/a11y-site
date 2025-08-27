import { InternalPageLayout } from '@/components/layout'
import { DocumentacionNewContent } from './DocumentacionNewContent'
import { FileText } from 'lucide-react'

// Contenido HTML simulado para el TOC (basado en los IDs de las secciones)
const content = `
<h2 id="sistema-colores">Sistema de Colores y Contraste</h2>
<h2 id="componentes-ui">Componentes UI Accesibles</h2>
<h2 id="sistema-navegacion">Sistema de Navegación por Teclado</h2>
<h2 id="casos-uso">Casos de Uso y Algoritmos de Accesibilidad</h2>
<h2 id="arquitectura-poo">Arquitectura POO: Clases de Usuario</h2>
`

export default function DocumentacionPage() {
  return (
    <InternalPageLayout
      content={content}
      heroIcon={FileText}
      heroTitle="Documentación"
      heroDescription="Documentación técnica completa del sistema de accesibilidad implementado. Incluye guías de componentes, patrones de diseño y arquitectura del proyecto."
      heroBackground="primary"
    >
      <DocumentacionNewContent />
    </InternalPageLayout>
  )
}