import { InternalPageLayout } from '@/components/layout'
import { AccesibilidadSitioContent } from './AccesibilidadSitioContent'
import { Accessibility } from 'lucide-react'

export default function AccesibilidadSitioPage() {
  return (
    <InternalPageLayout
      showToc={false}
      heroIcon={Accessibility}
      heroTitle="Accesibilidad del Sitio"
      heroDescription="Documento VPAT (Voluntary Product Accessibility Template) completo del sitio web. Informe detallado de cumplimiento de estándares WCAG 2.1 AA, Section 508 y EN 301 549 para evaluadores y auditores de accesibilidad."
      heroBackground="secondary"
    >
      <AccesibilidadSitioContent />
    </InternalPageLayout>
  )
}

