import { InternalPageLayout } from '@/components/layout'
import { RecursosContent } from './RecursosContent'
import { BookOpen } from 'lucide-react'

export default function RecursosPage() {
  return (
    <InternalPageLayout
      showToc={false}
      heroIcon={BookOpen}
      heroTitle="Recursos de Accesibilidad"
      heroDescription="Colección de recursos externos, estándares y herramientas para el desarrollo de sitios web accesibles. Incluye normas WCAG, Section 508, ACTA Europea de Accesibilidad y proyectos de referencia."
      heroBackground="tertiary"
    >
      <RecursosContent />
    </InternalPageLayout>
  )
}