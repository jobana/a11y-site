import { InternalPageLayout } from '@/components/layout'
import { GeneralidadesNewContent } from './GeneralidadesNewContent'
import { BookOpen } from 'lucide-react'

// Contenido HTML simulado para el TOC (basado en los IDs de las secciones)
const content = `
<h2 id="que-es-accesibilidad">1. ¿Qué es la accesibilidad web?</h2>
<h2 id="discapacidad-impedimentos">2. Discapacidad e impedimentos</h2>
<h2 id="beneficios-valor-agregado">3. Beneficios y valor agregado</h2>
<h2 id="normativa-legal">4. Normativa legal y estándares internacionales</h2>
<h2 id="roles-desarrollo">5. Roles en el desarrollo accesible</h2>
<h2 id="glosario-terminos">6. Glosario de términos clave</h2>
`

export default function GeneralidadesPage() {
  return (
    <InternalPageLayout
      content={content}
      heroIcon={BookOpen}
      heroTitle="Generalidades"
      heroDescription="Conceptos clave para entender las bases de la accesibilidad y por qué es importante."
      heroBackground="primary"
    >
      <GeneralidadesNewContent />
    </InternalPageLayout>
  )
}
