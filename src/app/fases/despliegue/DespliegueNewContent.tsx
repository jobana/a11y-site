'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  Rocket,
  CheckSquare2,
  Settings,
  AlertTriangle,
  FileText,
  Monitor,
  Target,
  Download,
  ArrowLeft,
  ArrowRight
} from '@/components/ui'

// Datos para objetivos del despliegue
const objetivosDespliegue = [
  {
    titulo: "Mantener Estándares WCAG",
    descripcion: "Garantizar cumplimiento continuo en producción",
    icono: Target,
    acciones: [
      "Auditorías automatizadas regulares",
      "Validación en cada deploy",
      "Monitoreo de métricas clave",
      "Alertas por incumplimientos"
    ]
  },
  {
    titulo: "Monitoreo Continuo",
    descripcion: "Supervisar la experiencia del usuario en tiempo real",
    icono: Monitor,
    acciones: [
      "Métricas de rendimiento accesible",
      "Tracking de errores de a11y",
      "Análisis de patrones de uso",
      "Feedback de usuarios activo"
    ]
  },
  {
    titulo: "Respuesta Rápida",
    descripcion: "Resolver problemas reportados eficientemente",
    icono: AlertTriangle,
    acciones: [
      "Canal dedicado para reportes",
      "SLA definido para correcciones",
      "Escalación automática",
      "Comunicación transparente"
    ]
  },
  {
    titulo: "Evolución Continua",
    descripcion: "Adaptarse a nuevos estándares y tecnologías",
    icono: Settings,
    acciones: [
      "Actualización de herramientas",
      "Capacitación del equipo",
      "Evaluación de nuevas técnicas",
      "Roadmap de mejoras"
    ]
  }
]

// Datos para checklist pre-despliegue
const checklistPreDespliegue = {
  validacion: [
    { item: "Auditoría completa con herramientas automatizadas" },
    { item: "Testing manual en múltiples navegadores" },
    { item: "Validación con lectores de pantalla" },
    { item: "Pruebas de rendimiento con zoom 200%" },
    { item: "Verificación de contraste en diferentes dispositivos" }
  ],
  documentacion: [
    { item: "Declaración de accesibilidad actualizada" },
    { item: "Guía de usuario para tecnologías asistivas" },
    { item: "Documentación técnica de componentes accesibles" },
    { item: "Plan de respuesta a reportes de usuarios" },
    { item: "Cronograma de auditorías periódicas" }
  ],
  monitoreo: [
    { item: "Herramientas de monitoreo configuradas" },
    { item: "Alertas automáticas para regresiones" },
    { item: "Métricas de accesibilidad en dashboards" },
    { item: "Logs de errores relacionados con a11y" },
    { item: "Feedback de usuarios habilitado" }
  ]
}

// Datos para herramientas de monitoreo
const herramientasMonitoreo = {
  automatizadas: {
    titulo: "Herramientas Automatizadas",
    icono: Settings,
    herramientas: [
      {
        nombre: "axe Monitor",
        descripcion: "Plataforma de monitoreo continuo que ejecuta auditorías automáticas de accesibilidad en sitios web en producción. Rastrea regresiones en tiempo real, genera alertas cuando se detectan nuevos problemas y mantiene un historial completo de cumplimiento WCAG.",
        beneficios: ["Detección automática de regresiones", "Reportes detallados", "Integración con CI/CD"]
      },
      {
        nombre: "Lighthouse CI",
        descripcion: "Sistema de integración continua que ejecuta auditorías Lighthouse automáticamente en cada deploy. Proporciona métricas comparativas, establece umbrales de calidad y bloquea deployments que no cumplan con estándares de accesibilidad definidos.",
        beneficios: ["Métricas de rendimiento", "Puntuación de accesibilidad", "Tendencias históricas"]
      },
      {
        nombre: "Pa11y Dashboard",
        descripcion: "Dashboard centralizado que monitorea la accesibilidad de múltiples páginas y sitios web. Permite programar auditorías regulares, visualizar tendencias a lo largo del tiempo y configurar alertas por email cuando se detectan problemas críticos.",
        beneficios: ["Vista centralizada", "Programación de auditorías", "Alertas por email"]
      }
    ]
  },
  analytics: {
    titulo: "Analytics y Métricas",
    icono: Monitor,
    herramientas: [
      {
        nombre: "Google Analytics",
        descripcion: "Configuración de eventos personalizados para rastrear interacciones de usuarios con tecnologías asistivas. Permite medir el uso de características de accesibilidad, identificar patrones de navegación alternativos y comprender mejor el comportamiento de usuarios con discapacidades.",
        beneficios: ["Tracking de uso de a11y", "Patrones de navegación", "Dispositivos asistivos"]
      },
      {
        nombre: "Hotjar/FullStory",
        descripcion: "Herramientas de grabación de sesiones que capturan interacciones reales de usuarios, incluyendo navegación por teclado y uso de tecnologías asistivas. Proporcionan insights cualitativos invaluables sobre barreras de accesibilidad no detectadas en testing automatizado.",
        beneficios: ["Comportamiento real", "Identificación de barreras", "Insights cualitativos"]
      },
      {
        nombre: "Core Web Vitals",
        descripcion: "Métricas oficiales de Google que miden la experiencia de usuario en términos de velocidad de carga, interactividad y estabilidad visual. Cruciales para accesibilidad ya que los usuarios con discapacidades son especialmente sensibles a problemas de rendimiento.",
        beneficios: ["Rendimiento percibido", "Estabilidad visual", "Interactividad"]
      }
    ]
  },
  feedback: {
    titulo: "Canales de Feedback",
    icono: FileText,
    herramientas: [
      {
        nombre: "Widget de Accesibilidad",
        descripcion: "Botón flotante integrado en el sitio web que permite a los usuarios reportar problemas de accesibilidad directamente desde la página donde los experimentan. Incluye captura automática de contexto, información del navegador y tecnologías asistivas utilizadas.",
        beneficios: ["Acceso fácil", "Contexto específico", "Categorización automática"]
      },
      {
        nombre: "Formulario Dedicado",
        descripcion: "Página web específicamente diseñada para recibir reportes detallados de problemas de accesibilidad. Incluye campos estructurados para descripción del problema, pasos para reproducir, capturas de pantalla y información sobre tecnologías asistivas.",
        beneficios: ["Información detallada", "Capturas de pantalla", "Seguimiento de casos"]
      },
      {
        nombre: "Email/Chat Support",
        descripcion: "Canales de comunicación directa que permiten a usuarios con discapacidades contactar al equipo de soporte para reportar barreras de accesibilidad o solicitar asistencia. Incluye SLA específicos para temas de accesibilidad y personal entrenado.",
        beneficios: ["Comunicación directa", "Resolución personalizada", "Historial de casos"]
      }
    ]
  }
}

// Datos para plan de mantenimiento
const planMantenimiento = [
  {
    frecuencia: "Diario",
    actividades: [
      "Monitoreo automático de métricas",
      "Revisión de alertas y errores",
      "Respuesta a reportes urgentes"
    ],
    responsable: "Equipo de Desarrollo"
  },
  {
    frecuencia: "Semanal",
    actividades: [
      "Auditoría de nuevas funcionalidades",
      "Análisis de tendencias de uso",
      "Actualización de documentación"
    ],
    responsable: "QA y UX"
  },
  {
    frecuencia: "Mensual",
    actividades: [
      "Auditoría completa del sitio",
      "Revisión de feedback de usuarios",
      "Planificación de mejoras"
    ],
    responsable: "Product Owner"
  },
  {
    frecuencia: "Trimestral",
    actividades: [
      "Evaluación con usuarios reales",
      "Actualización de herramientas",
      "Capacitación del equipo"
    ],
    responsable: "Liderazgo Técnico"
  }
]

// Datos para recursos descargables
const recursosDescargables = [
  {
    id: "declaracion-template",
    titulo: "Template de Declaración de Accesibilidad",
    descripcion: "Plantilla completa para crear tu declaración de accesibilidad conforme a estándares internacionales.",
    archivo: "template-declaracion-accesibilidad.docx"
  },
  {
    id: "plan-monitoreo",
    titulo: "Plan de Monitoreo Continuo",
    descripcion: "Guía detallada para implementar monitoreo automatizado y manual de accesibilidad en producción.",
    archivo: "plan-monitoreo-continuo.pdf"
  },
  {
    id: "checklist-mantenimiento",
    titulo: "Checklist de Mantenimiento",
    descripcion: "Lista de verificación periódica para mantener los estándares de accesibilidad a largo plazo.",
    archivo: "checklist-mantenimiento-a11y.xlsx"
  }
]

export function DespliegueNewContent() {
  return (
    <div className="space-y-16">
        
        {/* 1. Objetivos del Despliegue Accesible */}
        <section>
          <h2 id="objetivos-despliegue" className="text-3xl font-bold text-gray-800 mb-8">
            Objetivos del Despliegue Accesible
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objetivosDespliegue.map((objetivo, index) => (
              <Card key={index} variant="elevated" className="h-full">
                <CardHeader
                  title={objetivo.titulo}
                  description={objetivo.descripcion}
                  icon={<Icon icon={objetivo.icono} size="lg" className="text-secondary-50" />}
                />
                <CardContent>
                  <ul className="space-y-2">
                    {objetivo.acciones.map((accion, aIndex) => (
                      <li key={aIndex} className="flex items-start gap-2">
                        <Icon icon={CheckSquare2} size="sm" className="text-secondary-50 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-900 text-sm">{accion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 2. Checklist Pre-Despliegue - Tabs */}
        <section>
          <h2 id="checklist-predespliegue" className="text-3xl font-bold text-gray-800 mb-8">
            Checklist Pre-Despliegue
          </h2>

          <Tabs defaultValue="validacion" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="validacion">
                Validación Final
              </TabsTrigger>
              <TabsTrigger value="documentacion">
                Documentación
              </TabsTrigger>
              <TabsTrigger value="monitoreo">
                Configuración
              </TabsTrigger>
            </TabsList>

            {Object.entries(checklistPreDespliegue).map(([key, items]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={key === 'validacion' ? 'Validación Final' : key === 'documentacion' ? 'Documentación Requerida' : 'Configuración de Monitoreo'}
                    description={`Elementos esenciales para ${key === 'validacion' ? 'la validación final' : key === 'documentacion' ? 'la documentación' : 'el monitoreo'}`}
                  />
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 bg-primary-10 rounded-lg">
                          <div className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center">
                            <input type="checkbox" className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-900">{item.item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* 3. Herramientas de Monitoreo - Tabs */}
        <section>
          <h2 id="herramientas-monitoreo" className="text-3xl font-bold text-gray-800 mb-8">
            Herramientas de Monitoreo
          </h2>

          <Tabs defaultValue="automatizadas" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="automatizadas">
                <Icon icon={Settings} size="sm" className="mr-2" />
                Automatizadas
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <Icon icon={Monitor} size="sm" className="mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="feedback">
                <Icon icon={FileText} size="sm" className="mr-2" />
                Feedback
              </TabsTrigger>
            </TabsList>

            {Object.entries(herramientasMonitoreo).map(([key, categoria]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={categoria.titulo}
                    icon={<Icon icon={categoria.icono} size="lg" className="text-tertiary-50" />}
                  />
                  <CardContent>
                    <div className="space-y-6">
                      {categoria.herramientas.map((herramienta, index) => (
                        <div key={index} className="border border-primary-20 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">{herramienta.nombre}</h4>
                          <p className="text-gray-900 text-sm mb-3">{herramienta.descripcion}</p>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Beneficios:</h5>
                            <ul className="space-y-1">
                              {herramienta.beneficios.map((beneficio, bIndex) => (
                                <li key={bIndex} className="flex items-start gap-2">
                                  <Icon icon={CheckSquare2} size="sm" className="text-primary-50 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-900 text-sm">{beneficio}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* 4. Plan de Mantenimiento */}
        <section>
          <h2 id="plan-mantenimiento" className="text-3xl font-bold text-gray-800 mb-8">
            Plan de Mantenimiento Continuo
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Un cronograma estructurado garantiza el mantenimiento sostenible de la accesibilidad:
          </p>

          <div className="space-y-6">
            {planMantenimiento.map((periodo, index) => (
              <Card key={index} variant="elevated">
                <CardHeader
                  title={`Actividades ${periodo.frecuencia}s`}
                  description={`Responsable: ${periodo.responsable}`}
                />
                <CardContent>
                  <ul className="space-y-2">
                    {periodo.actividades.map((actividad, aIndex) => (
                      <li key={aIndex} className="flex items-start gap-2">
                        <Icon icon={CheckSquare2} size="sm" className="text-tertiary-50 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-900 text-sm">{actividad}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Recursos Descargables - FASE 2: Comentado temporalmente */}
        {/* 
        <section>
          <h2 id="recursos-descargables" className="text-3xl font-bold text-gray-800 mb-8">
            Recursos para Despliegue
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Plantillas y guías para implementar un despliegue accesible exitoso:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recursosDescargables.map((recurso) => (
              <Card key={recurso.id} variant="elevated" className="h-full">
                <CardHeader
                  title={recurso.titulo}
                  icon={<Icon icon={Download} size="lg" className="text-tertiary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed mb-4">
                    {recurso.descripcion}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      alert(`Descargando: ${recurso.archivo}`)
                    }}
                  >
                    <Icon icon={Download} size="sm" className="mr-2" />
                    Descargar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        */}

        {/* 6. Navegación */}
        <section className="border-t border-primary-20 pt-12">
          <div className="flex justify-between items-center">
            <Link href="/fases/pruebas">
              <Button variant="outline" size="lg">
                <Icon icon={ArrowLeft} size="sm" className="mr-2" />
                Fase 4: Pruebas
              </Button>
            </Link>
            
            <Link href="/documentacion">
              <Button variant="primary" size="lg">
                Documentación
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </div>
  )
}
