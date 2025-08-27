import { InternalPageLayout } from '@/components/layout'
import { ContactoNewContent } from './ContactoNewContent'
import { MessageSquare } from 'lucide-react'

export default function ContactoPage() {
  const content = `
<h2 id="informacion-contacto">Información de Contacto</h2>
<h2 id="formulario-contacto">Formulario de Contacto</h2>
<h2 id="informacion-adicional">Información Adicional</h2>
  `
  
  return (
    <InternalPageLayout
      content={content}
      heroIcon={MessageSquare}
      heroTitle="Contacto y Soporte"
      heroDescription="Estamos aquí para ayudarte. Reporta incidencias de accesibilidad, comparte feedback o simplemente contáctanos para cualquier consulta."
      heroBackground="primary"
    >
      <ContactoNewContent />
    </InternalPageLayout>
  )
}