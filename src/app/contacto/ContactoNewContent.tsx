'use client'

import React, { useState, useEffect } from 'react'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Icon,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Info,
  Send,
  User,
  MessageSquare,
  Shield,
  Accessibility
} from '@/components/ui'

// Tipos para el formulario
interface FormData {
  nombre: string
  email: string
  tipoConsulta: string
  asunto: string
  mensaje: string
  prioridad: string
  aceptaContacto: boolean
}

interface FormErrors {
  [key: string]: string
}

interface FieldValidation {
  [key: string]: boolean
}

export function ContactoNewContent() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    tipoConsulta: '',
    asunto: '',
    mensaje: '',
    prioridad: 'media',
    aceptaContacto: false
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [fieldTouched, setFieldTouched] = useState<FieldValidation>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Validación reactiva del campo nombre
  const validateNombre = (value: string): string => {
    if (!value.trim()) return 'El nombre es obligatorio'
    if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres'
    if (value.trim().length > 50) return 'El nombre no puede exceder 50 caracteres'
    return ''
  }

  // Validación reactiva del campo email
  const validateEmail = (value: string): string => {
    if (!value.trim()) return 'El correo electrónico es obligatorio'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'El formato del correo electrónico es incorrecto'
    if (value.length > 100) return 'El correo electrónico no puede exceder 100 caracteres'
    return ''
  }

  // Validación reactiva del campo tipo de consulta
  const validateTipoConsulta = (value: string): string => {
    if (!value) return 'Debe seleccionar un tipo de consulta'
    return ''
  }

  // Validación reactiva del campo asunto
  const validateAsunto = (value: string): string => {
    if (!value.trim()) return 'El asunto es obligatorio'
    if (value.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres'
    if (value.trim().length > 100) return 'El asunto no puede exceder 100 caracteres'
    return ''
  }

  // Validación reactiva del campo mensaje
  const validateMensaje = (value: string): string => {
    if (!value.trim()) return 'El mensaje es obligatorio'
    if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres'
    if (value.trim().length > 1000) return 'El mensaje no puede exceder 1000 caracteres'
    return ''
  }

  // Validación reactiva del campo acepta contacto
  const validateAceptaContacto = (value: boolean): string => {
    if (!value) return 'Debe aceptar el contacto para continuar'
    return ''
  }

  // Validación completa del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    newErrors.nombre = validateNombre(formData.nombre)
    newErrors.email = validateEmail(formData.email)
    newErrors.tipoConsulta = validateTipoConsulta(formData.tipoConsulta)
    newErrors.asunto = validateAsunto(formData.asunto)
    newErrors.mensaje = validateMensaje(formData.mensaje)
    newErrors.aceptaContacto = validateAceptaContacto(formData.aceptaContacto)

    // Solo incluir errores que no estén vacíos
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== '')
    )

    setErrors(filteredErrors)
    return Object.keys(filteredErrors).length === 0
  }

  // Validación reactiva cuando cambia un campo
  useEffect(() => {
    // Solo validar campos que han sido tocados
    const newErrors = { ...errors }
    
    if (fieldTouched.nombre) {
      newErrors.nombre = validateNombre(formData.nombre)
    }
    
    if (fieldTouched.email) {
      newErrors.email = validateEmail(formData.email)
    }
    
    if (fieldTouched.tipoConsulta) {
      newErrors.tipoConsulta = validateTipoConsulta(formData.tipoConsulta)
    }
    
    if (fieldTouched.asunto) {
      newErrors.asunto = validateAsunto(formData.asunto)
    }
    
    if (fieldTouched.mensaje) {
      newErrors.mensaje = validateMensaje(formData.mensaje)
    }
    
    if (fieldTouched.aceptaContacto) {
      newErrors.aceptaContacto = validateAceptaContacto(formData.aceptaContacto)
    }

    // Limpiar errores vacíos
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== '')
    )

    setErrors(filteredErrors)
  }, [formData, fieldTouched])

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Marcar todos los campos como tocados para mostrar todos los errores
    setFieldTouched({
      nombre: true,
      email: true,
      tipoConsulta: true,
      asunto: true,
      mensaje: true,
      aceptaContacto: true
    })
    
    if (!validateForm()) {
      // Mover el foco al primer campo con error
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        element?.focus()
      }
      return
    }

    setIsSubmitting(true)
    
    // Simulación de envío
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        nombre: '',
        email: '',
        tipoConsulta: '',
        asunto: '',
        mensaje: '',
        prioridad: 'media',
        aceptaContacto: false
      })
      setErrors({})
      setFieldTouched({})
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejo de cambios en los campos
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Marcar el campo como tocado para activar validación
    if (!fieldTouched[field]) {
      setFieldTouched(prev => ({ ...prev, [field]: true }))
    }
  }

  // Manejo de pérdida de foco (blur)
  const handleBlur = (field: keyof FormData) => {
    if (!fieldTouched[field]) {
      setFieldTouched(prev => ({ ...prev, [field]: true }))
    }
  }

  return (
    <div className="space-y-16">
      
      {/* Información de Contacto */}
      <section>
        <h2 id="informacion-contacto" className="text-3xl font-bold text-gray-800 mb-8">
          Información de Contacto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Datos de Contacto */}
          <Card variant="elevated">
            <CardHeader
              title="Datos de Contacto"
              description="Información directa para consultas y soporte"
              icon={<Icon icon={Info} size="lg" className="text-primary-50" />}
            />
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon icon={Mail} size="md" className="text-primary-50" />
                  <div>
                    <p className="font-semibold text-gray-800">Correo Electrónico</p>
                    <a 
                      href="mailto:accesibilidad@vasscompany.com" 
                      className="text-primary-70 hover:text-primary-80 transition-colors"
                      aria-label="Enviar correo a accesibilidad@vasscompany.com"
                    >
                      accesibilidad@vasscompany.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Icon icon={Phone} size="md" className="text-primary-50" />
                  <div>
                    <p className="font-semibold text-gray-800">Teléfono</p>
                    <p className="text-gray-900">+57 (1) 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Icon icon={MapPin} size="md" className="text-primary-50" />
                  <div>
                    <p className="font-semibold text-gray-800">Dirección</p>
                    <p className="text-gray-900">Bogotá, Colombia</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Especialistas en Accesibilidad */}
          <Card variant="elevated">
            <CardHeader
              title="Especialistas en Accesibilidad"
              description="Equipo dedicado a garantizar la inclusión digital"
              icon={<Icon icon={Accessibility} size="lg" className="text-secondary-50" />}
            />
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                  <p className="text-gray-900 text-sm">
                    <strong>Tiempo de respuesta:</strong> 24-48 horas para consultas generales, 
                    4-8 horas para incidencias críticas de accesibilidad.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">
                    <strong>Horarios de atención:</strong>
                  </p>
                  <ul className="text-sm text-gray-900 space-y-1">
                    <li>• Lunes a Viernes: 8:00 AM - 6:00 PM (GMT-5)</li>
                    <li>• Sábados: 9:00 AM - 1:00 PM (GMT-5)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section>
        <h2 id="formulario-contacto" className="text-3xl font-bold text-gray-800 mb-8">
          Formulario de Contacto
        </h2>
        
        <Card variant="elevated" className="max-w-4xl mx-auto">
          <CardHeader
            title="Envíanos tu Mensaje"
            description="Completa el formulario y nos pondremos en contacto contigo"
            icon={<Icon icon={Send} size="lg" className="text-tertiary-50" />}
          />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <CardContent>
              {/* Información Personal */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon icon={User} size="md" className="text-primary-50" />
                    Información Personal
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo Nombre */}
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-800 mb-2">
                        Nombre completo <span className="text-tertiary-60" aria-label="Campo obligatorio">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        onBlur={() => handleBlur('nombre')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary-50 transition-colors ${
                          errors.nombre ? 'border-tertiary-60 bg-tertiary-10' : 'border-primary-20'
                        }`}
                        aria-describedby={errors.nombre ? 'nombre-error' : 'nombre-help'}
                        aria-invalid={!!errors.nombre}
                        required
                      />
                      {errors.nombre ? (
                        <p id="nombre-error" className="mt-2 text-sm text-tertiary-80 flex items-center gap-2">
                          <Icon icon={AlertTriangle} size="sm" />
                          {errors.nombre}
                        </p>
                      ) : (
                        <p id="nombre-help" className="mt-2 text-sm text-gray-600">
                          <Icon icon={Info} size="sm" className="inline mr-1" />
                          Mínimo 2 caracteres, máximo 50
                        </p>
                      )}
                    </div>

                    {/* Campo Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                        Correo electrónico <span className="text-tertiary-60" aria-label="Campo obligatorio">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary-50 transition-colors ${
                          errors.email ? 'border-tertiary-60 bg-tertiary-10' : 'border-primary-20'
                        }`}
                        aria-describedby={errors.email ? 'email-error' : 'email-help'}
                        aria-invalid={!!errors.email}
                        required
                      />
                      {errors.email ? (
                        <p id="email-error" className="mt-2 text-sm text-tertiary-80 flex items-center gap-2">
                          <Icon icon={AlertTriangle} size="sm" />
                          {errors.email}
                        </p>
                      ) : (
                        <p id="email-help" className="mt-2 text-sm text-gray-600">
                          <Icon icon={Info} size="sm" className="inline mr-1" />
                          Formato: usuario@dominio.com
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tipo de Consulta y Prioridad */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon icon={MessageSquare} size="md" className="text-primary-50" />
                    Detalles de la Consulta
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tipo de Consulta */}
                    <div>
                      <label htmlFor="tipoConsulta" className="block text-sm font-medium text-gray-800 mb-2">
                        Tipo de consulta <span className="text-tertiary-60" aria-label="Campo obligatorio">*</span>
                      </label>
                      <select
                        id="tipoConsulta"
                        name="tipoConsulta"
                        value={formData.tipoConsulta}
                        onChange={(e) => handleInputChange('tipoConsulta', e.target.value)}
                        onBlur={() => handleBlur('tipoConsulta')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary-50 transition-colors ${
                          errors.tipoConsulta ? 'border-tertiary-60 bg-tertiary-10' : 'border-primary-20'
                        }`}
                        aria-describedby={errors.tipoConsulta ? 'tipoConsulta-error' : undefined}
                        aria-invalid={!!errors.tipoConsulta}
                        required
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="incidencia-accesibilidad">Incidencia de Accesibilidad</option>
                        <option value="sugerencia">Sugerencia de Mejora</option>
                        <option value="consulta-tecnica">Consulta Técnica</option>
                        <option value="feedback-general">Feedback General</option>
                        <option value="soporte-usuario">Soporte de Usuario</option>
                        <option value="otro">Otro</option>
                      </select>
                      {errors.tipoConsulta && (
                        <p id="tipoConsulta-error" className="mt-2 text-sm text-tertiary-80 flex items-center gap-2">
                          <Icon icon={AlertTriangle} size="sm" />
                          {errors.tipoConsulta}
                        </p>
                      )}
                    </div>

                    {/* Prioridad */}
                    <div>
                      <label htmlFor="prioridad" className="block text-sm font-medium text-gray-800 mb-2">
                        Nivel de prioridad
                      </label>
                      <select
                        id="prioridad"
                        name="prioridad"
                        value={formData.prioridad}
                        onChange={(e) => handleInputChange('prioridad', e.target.value)}
                        className="w-full px-4 py-3 border border-primary-20 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary-50 transition-colors"
                      >
                        <option value="baja">Baja - Consulta general</option>
                        <option value="media">Media - Sugerencia o feedback</option>
                        <option value="alta">Alta - Problema que afecta funcionalidad</option>
                        <option value="critica">Crítica - Bloquea el uso del sitio</option>
                      </select>
                      <p className="mt-2 text-sm text-gray-600">
                        <Icon icon={Info} size="sm" className="inline mr-1" />
                        Las incidencias críticas se atienden con prioridad máxima
                      </p>
                    </div>
                  </div>
                </div>

                {/* Asunto y Mensaje */}
                <div className="space-y-6">
                  {/* Campo Asunto */}
                  <div>
                    <label htmlFor="asunto" className="block text-sm font-medium text-gray-800 mb-2">
                      Asunto <span className="text-tertiary-60" aria-label="Campo obligatorio">*</span>
                    </label>
                    <input
                      type="text"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={(e) => handleInputChange('asunto', e.target.value)}
                      onBlur={() => handleBlur('asunto')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary-50 transition-colors ${
                        errors.asunto ? 'border-tertiary-60 bg-tertiary-10' : 'border-primary-20'
                      }`}
                      aria-describedby={errors.asunto ? 'asunto-error' : 'asunto-help'}
                      aria-invalid={!!errors.asunto}
                      required
                    />
                    {errors.asunto ? (
                      <p id="asunto-error" className="mt-2 text-sm text-tertiary-80 flex items-center gap-2">
                        <Icon icon={AlertTriangle} size="sm" />
                        {errors.asunto}
                      </p>
                    ) : (
                      <p id="asunto-help" className="mt-2 text-sm text-gray-600">
                        <Icon icon={Info} size="sm" className="inline mr-1" />
                        Mínimo 5 caracteres, máximo 100
                      </p>
                    )}
                  </div>

                  {/* Campo Mensaje */}
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-800 mb-2">
                      Mensaje <span className="text-tertiary-60" aria-label="Campo obligatorio">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={6}
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      onBlur={() => handleBlur('mensaje')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-primary-50 transition-colors resize-vertical ${
                        errors.mensaje ? 'border-tertiary-60 bg-tertiary-10' : 'border-primary-20'
                      }`}
                      aria-describedby={errors.mensaje ? 'mensaje-error' : 'mensaje-help'}
                      aria-invalid={!!errors.mensaje}
                      required
                    />
                    {errors.mensaje ? (
                      <p id="mensaje-error" className="mt-2 text-sm text-tertiary-80 flex items-center gap-2">
                        <Icon icon={AlertTriangle} size="sm" />
                        {errors.mensaje}
                      </p>
                    ) : (
                      <p id="mensaje-help" className="mt-2 text-sm text-gray-600">
                        <Icon icon={Info} size="sm" className="inline mr-1" />
                        Mínimo 10 caracteres, máximo 1000
                      </p>
                    )}
                  </div>
                </div>

                {/* Checkbox de Contacto */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="aceptaContacto"
                    name="aceptaContacto"
                    checked={formData.aceptaContacto}
                    onChange={(e) => handleInputChange('aceptaContacto', e.target.checked)}
                    onBlur={() => handleBlur('aceptaContacto')}
                    className="mt-1 w-4 h-4 text-primary-60 border-primary-20 rounded focus:ring-primary-50 focus:ring-2"
                    aria-describedby={errors.aceptaContacto ? 'aceptaContacto-error' : undefined}
                    aria-invalid={!!errors.aceptaContacto}
                  />
                  <label htmlFor="aceptaContacto" className="text-sm text-gray-900">
                    Acepto que VASS Company me contacte por correo electrónico para responder mi consulta. 
                    Puedo revocar este consentimiento en cualquier momento.
                  </label>
                </div>
                {errors.aceptaContacto && (
                  <p id="aceptaContacto-error" className="mt-2 text-sm text-tertiary-80 flex items-center gap-2">
                    <Icon icon={AlertTriangle} size="sm" />
                    {errors.aceptaContacto}
                  </p>
                )}
              </div>
            </CardContent>

            {/* Footer del Formulario */}
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Icon icon={Shield} size="sm" />
                  Tus datos están protegidos y solo se usarán para responder tu consulta
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      nombre: '',
                      email: '',
                      tipoConsulta: '',
                      asunto: '',
                      mensaje: '',
                      prioridad: 'media',
                      aceptaContacto: false
                    })
                    setErrors({})
                    setFieldTouched({})
                    setSubmitStatus('idle')
                  }}
                  disabled={isSubmitting}
                >
                  Limpiar
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  aria-describedby={submitStatus === 'success' ? 'success-message' : submitStatus === 'error' ? 'error-message' : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Icon icon={Send} size="sm" className="mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </section>

      {/* Mensajes de Estado */}
      {submitStatus === 'success' && (
        <div id="success-message" className="max-w-4xl mx-auto">
          <Card className="border-secondary-20 bg-secondary-10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-secondary-80">
                <Icon icon={CheckCircle} size="lg" />
                <div>
                  <h3 className="font-semibold text-lg">¡Mensaje Enviado con Éxito!</h3>
                  <p className="text-sm">
                    Hemos recibido tu mensaje y nos pondremos en contacto contigo en las próximas 24-48 horas. 
                    Para incidencias críticas de accesibilidad, la respuesta será más rápida.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {submitStatus === 'error' && (
        <div id="error-message" className="max-w-4xl mx-auto">
          <Card className="border-tertiary-20 bg-tertiary-10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-tertiary-80">
                <Icon icon={AlertTriangle} size="lg" />
                <div>
                  <h3 className="font-semibold text-lg">Error al Enviar el Mensaje</h3>
                  <p className="text-sm">
                    Ha ocurrido un error al enviar tu mensaje. Por favor, intenta nuevamente o 
                    contacta directamente a <strong>accesibilidad@vasscompany.com</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Información Adicional */}
      <section>
        <h2 id="informacion-adicional" className="text-3xl font-bold text-gray-800 mb-8">
          Información Adicional
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Política de Privacidad */}
          <Card variant="elevated">
            <CardHeader
              title="Política de Privacidad"
              description="Cómo protegemos y usamos tu información"
              icon={<Icon icon={Shield} size="lg" className="text-primary-50" />}
            />
            <CardContent>
              <div className="space-y-3 text-sm text-gray-900">
                <p>
                  <strong>Recopilación:</strong> Solo recopilamos la información que nos proporcionas 
                  voluntariamente en este formulario.
                </p>
                <p>
                  <strong>Uso:</strong> Tu información se usa exclusivamente para responder tu consulta 
                  y mejorar nuestros servicios.
                </p>
                <p>
                  <strong>Almacenamiento:</strong> Los datos se almacenan de forma segura y se eliminan 
                  después de resolver tu consulta.
                </p>
                <p>
                  <strong>Compartir:</strong> Nunca compartimos tu información personal con terceros.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Compromiso de Accesibilidad */}
          <Card variant="elevated">
            <CardHeader
              title="Compromiso de Accesibilidad"
              description="Nuestro compromiso con la inclusión digital"
              icon={<Icon icon={Accessibility} size="lg" className="text-secondary-50" />}
            />
            <CardContent>
              <div className="space-y-3 text-sm text-gray-900">
                <p>
                  <strong>WCAG 2.1 AA:</strong> Nos comprometemos a mantener el cumplimiento 
                  de los estándares de accesibilidad web.
                </p>
                <p>
                  <strong>Respuesta Rápida:</strong> Las incidencias de accesibilidad se atienden 
                  con prioridad máxima.
                </p>
                <p>
                  <strong>Mejora Continua:</strong> Cada feedback nos ayuda a hacer nuestro sitio 
                  más accesible para todos.
                </p>
                <p>
                  <strong>Comunicación Clara:</strong> Te mantendremos informado sobre el estado 
                  de tu consulta.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

