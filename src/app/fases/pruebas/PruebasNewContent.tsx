'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  FlaskConical,
  CheckSquare2,
  Settings,
  Users,
  Monitor,
  Smartphone,
  Target,
  AlertTriangle,
  Download,
  ArrowLeft,
  ArrowRight
} from '@/components/ui'

// Datos para la pirámide de testing
const piramideTesting = [
  {
    nivel: "Base",
    titulo: "Testing Automatizado",
    descripcion: "Verificación continua de criterios objetivos",
    porcentaje: "~30%",
    color: "bg-primary-50",
    herramientas: ["axe-core", "Lighthouse", "Pa11y", "Jest-axe"],
    beneficios: [
      "Ejecución rápida y continua",
      "Detección de errores básicos",
      "Integración en CI/CD",
      "Feedback inmediato"
    ]
  },
  {
    nivel: "Medio",
    titulo: "Testing Manual",
    descripcion: "Navegación por teclado y verificación manual",
    porcentaje: "~40%",
    color: "bg-secondary-50",
    herramientas: ["Teclado", "WAVE", "Color Oracle", "DevTools"],
    beneficios: [
      "Evaluación de usabilidad",
      "Verificación de flujos complejos",
      "Detección de problemas contextuales",
      "Validación de patrones ARIA"
    ]
  },
  {
    nivel: "Cima",
    titulo: "Testing con Usuarios",
    descripcion: "Validación con personas que usan tecnologías asistivas",
    porcentaje: "~30%",
    color: "bg-tertiary-50",
    herramientas: ["NVDA", "JAWS", "VoiceOver", "TalkBack"],
    beneficios: [
      "Experiencia real de usuario",
      "Detección de barreras ocultas",
      "Validación de efectividad",
      "Insights para mejoras"
    ]
  }
]

// Datos para checklist de teclado
const checklistTeclado = [
  { tecla: "Tab", funcion: "Navega a todos los elementos interactivos" },
  { tecla: "Shift + Tab", funcion: "Navega hacia atrás correctamente" },
  { tecla: "Enter", funcion: "Activa botones y enlaces" },
  { tecla: "Espacio", funcion: "Activa botones y checkboxes" },
  { tecla: "Arrow Keys", funcion: "Funcionan en componentes complejos" },
  { tecla: "Escape", funcion: "Cierra modales y dropdowns" },
  { tecla: "Home/End", funcion: "Van al inicio/final en listas" }
]

// Datos para criterios WCAG
const criteriosWCAG = {
  nivelA: [
    { codigo: "1.1.1", descripcion: "Imágenes tienen texto alternativo apropiado" },
    { codigo: "1.3.1", descripcion: "Información transmitida por estructura semántica" },
    { codigo: "2.1.1", descripcion: "Toda funcionalidad disponible por teclado" },
    { codigo: "2.4.1", descripcion: "Mecanismo para saltar bloques de contenido" },
    { codigo: "3.1.1", descripcion: "Idioma de la página especificado" }
  ],
  nivelAA: [
    { codigo: "1.4.3", descripcion: "Contraste mínimo 4.5:1 (3:1 para texto grande)" },
    { codigo: "1.4.11", descripcion: "Contraste 3:1 para elementos no textuales" },
    { codigo: "2.4.6", descripcion: "Encabezados y etiquetas descriptivos" },
    { codigo: "3.2.3", descripcion: "Navegación consistente" },
    { codigo: "4.1.2", descripcion: "Nombre, rol y valor programáticamente determinable" }
  ]
}

// Datos para herramientas de testing
const herramientasTesting = {
  automatizado: {
    titulo: "Herramientas Automatizadas",
    icono: Settings,
    herramientas: [
      {
        nombre: "axe DevTools",
        descripcion: "Extensión de navegador que realiza auditorías automáticas de accesibilidad basadas en las reglas WCAG. Integra análisis en tiempo real durante el desarrollo, identifica problemas específicos con sugerencias de corrección y genera reportes detallados.",
        uso: "Testing durante desarrollo"
      },
      {
        nombre: "Lighthouse",
        descripcion: "Herramienta de auditoría integrada en Chrome DevTools que evalúa rendimiento, SEO, PWA y accesibilidad. Proporciona métricas cuantificables, sugerencias de mejora y seguimiento de progreso a lo largo del tiempo.",
        uso: "Evaluación completa de rendimiento y a11y"
      },
      {
        nombre: "Pa11y",
        descripcion: "Herramienta de línea de comandos que automatiza pruebas de accesibilidad en múltiples páginas. Ideal para integración continua, permite configurar umbrales de error y genera reportes en diferentes formatos (JSON, CSV, HTML).",
        uso: "Integración en pipelines CI/CD"
      }
    ]
  },
  manual: {
    titulo: "Herramientas Manuales",
    icono: Target,
    herramientas: [
      {
        nombre: "WAVE",
        descripcion: "Evaluador visual que inserta iconos y indicadores directamente en la página web para mostrar problemas de accesibilidad. Facilita la comprensión contextual de errores, alertas y características de accesibilidad sin necesidad de conocimientos técnicos profundos.",
        uso: "Identificación visual de problemas"
      },
      {
        nombre: "Color Oracle",
        descripcion: "Simulador de daltonismo que aplica filtros en tiempo real a toda la pantalla para mostrar cómo ven los colores personas con diferentes tipos de deficiencias visuales. Incluye simulaciones precisas de protanopia, deuteranopia y tritanopia.",
        uso: "Verificación de accesibilidad de color"
      },
      {
        nombre: "Accessibility Insights",
        descripcion: "Suite completa de Microsoft que combina testing automatizado y manual. Incluye guías paso a paso para evaluaciones manuales, testing con lectores de pantalla simulados y herramientas de análisis de flujo de teclado.",
        uso: "Testing manual guiado paso a paso"
      }
    ]
  },
  lectores: {
    titulo: "Lectores de Pantalla",
    icono: Users,
    herramientas: [
      {
        nombre: "NVDA",
        descripcion: "Lector de pantalla gratuito y de código abierto para Windows. Altamente configurable, con soporte para múltiples navegadores y aplicaciones. Ideal para testing de desarrollo ya que es ampliamente usado por usuarios reales y tiene actualizaciones frecuentes.",
        uso: "Testing en Windows"
      },
      {
        nombre: "VoiceOver",
        descripcion: "Lector de pantalla nativo integrado en todos los dispositivos Apple. Incluye gestos táctiles únicos en iOS, navegación por rotores y excelente integración con Safari. Esencial para testing en ecosistema Apple.",
        uso: "Testing en dispositivos Apple"
      },
      {
        nombre: "TalkBack",
        descripcion: "Lector de pantalla de Android con gestos táctiles específicos y navegación por exploración. Incluye funciones de exploración global, lectura continua y configuraciones granulares para diferentes tipos de contenido móvil.",
        uso: "Testing en dispositivos móviles Android"
      }
    ]
  }
}

// Datos para plantillas de reportes
const plantillasReportes = [
  {
    id: "reporte-manual",
    titulo: "Template de Reporte Manual",
    descripcion: "Plantilla estructurada para documentar hallazgos de testing manual con clasificación por severidad.",
    archivo: "template-reporte-manual.xlsx"
  },
  {
    id: "checklist-wcag",
    titulo: "Checklist WCAG 2.1 AA",
    descripcion: "Lista completa de criterios WCAG con ejemplos y métodos de verificación.",
    archivo: "checklist-wcag-2.1-aa.pdf"
  },
  {
    id: "guia-testing",
    titulo: "Guía de Testing con Lectores",
    descripcion: "Procedimientos paso a paso para testing con NVDA, VoiceOver y otros lectores de pantalla.",
    archivo: "guia-testing-lectores-pantalla.pdf"
  }
]

export function PruebasNewContent() {
  return (
    <div className="space-y-16">
        
        {/* 1. Pirámide de Testing */}
        <section>
          <h2 id="piramide-testing" className="text-3xl font-bold text-gray-800 mb-8">
            Pirámide de Testing de Accesibilidad
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Una estrategia integral combina diferentes tipos de testing para máxima cobertura y efectividad:
          </p>

          <div className="space-y-6">
            {piramideTesting.map((nivel, index) => (
              <Card key={index} variant="elevated" className="relative">
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${nivel.color} rounded-l-lg`}></div>
                <div className="pl-6">
                  <CardHeader
                    title={`${nivel.nivel}: ${nivel.titulo}`}
                    description={`${nivel.descripcion} (${nivel.porcentaje} de problemas detectados)`}
                  />
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Herramientas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {nivel.herramientas.map((herramienta, hIndex) => (
                            <span key={hIndex} className="bg-secondary-10 text-gray-900 px-3 py-1 rounded-full text-sm">
                              {herramienta}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Beneficios:</h4>
                        <ul className="space-y-1">
                          {nivel.beneficios.map((beneficio, bIndex) => (
                            <li key={bIndex} className="flex items-start gap-2">
                              <Icon icon={CheckSquare2} size="sm" className="text-primary-50 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-900 text-sm">{beneficio}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 2. Checklist de Navegación por Teclado */}
        <section>
          <h2 id="navegacion-teclado" className="text-3xl font-bold text-gray-800 mb-8">
            Navegación por Teclado
          </h2>
          
          <Card variant="elevated">
            <CardHeader
              title="Checklist Básico de Teclado"
              description="Verificaciones esenciales para navegación accesible"
              icon={<Icon icon={Target} size="lg" className="text-secondary-50" />}
            />
            <CardContent>
              <div className="space-y-3">
                {checklistTeclado.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-primary-10 rounded-lg">
                    <div className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center">
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <kbd className="bg-primary-90 text-white px-2 py-1 rounded text-sm font-mono">
                          {item.tecla}
                        </kbd>
                        <span className="text-gray-900">{item.funcion}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Criterios WCAG - Tabs */}
        <section>
          <h2 id="criterios-wcag" className="text-3xl font-bold text-gray-800 mb-8">
            Verificación Manual de WCAG
          </h2>

          <Tabs defaultValue="nivelA" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nivelA">
                Nivel A (Básico)
              </TabsTrigger>
              <TabsTrigger value="nivelAA">
                Nivel AA (Estándar)
              </TabsTrigger>
            </TabsList>

            {Object.entries(criteriosWCAG).map(([key, criterios]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={key === 'nivelA' ? 'Criterios Nivel A' : 'Criterios Nivel AA'}
                    description={key === 'nivelA' ? 'Requisitos básicos de accesibilidad' : 'Estándar recomendado para la mayoría de sitios'}
                  />
                  <CardContent>
                    <div className="space-y-3">
                      {criterios.map((criterio, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border border-primary-20 rounded-lg">
                          <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                            <input type="checkbox" className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="bg-primary-50 text-white px-2 py-1 rounded text-sm font-mono">
                                {criterio.codigo}
                              </span>
                            </div>
                            <p className="text-gray-900 text-sm">{criterio.descripcion}</p>
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

        {/* 4. Herramientas de Testing - Tabs */}
        <section>
          <h2 id="herramientas-testing" className="text-3xl font-bold text-gray-800 mb-8">
            Herramientas de Testing
          </h2>

          <Tabs defaultValue="automatizado" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="automatizado">
                <Icon icon={Settings} size="sm" className="mr-2" />
                Automatizado
              </TabsTrigger>
              <TabsTrigger value="manual">
                <Icon icon={Target} size="sm" className="mr-2" />
                Manual
              </TabsTrigger>
              <TabsTrigger value="lectores">
                <Icon icon={Users} size="sm" className="mr-2" />
                Lectores
              </TabsTrigger>
            </TabsList>

            {Object.entries(herramientasTesting).map(([key, categoria]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={categoria.titulo}
                    icon={<Icon icon={categoria.icono} size="lg" className="text-tertiary-50" />}
                  />
                  <CardContent>
                    <div className="space-y-4">
                      {categoria.herramientas.map((herramienta, index) => (
                        <div key={index} className="border border-primary-20 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{herramienta.nombre}</h4>
                            <span className="bg-secondary-10 text-gray-900 px-2 py-1 rounded text-xs">
                              {herramienta.uso}
                            </span>
                          </div>
                          <p className="text-gray-900 text-sm">{herramienta.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* 5. Plantillas y Reportes - FASE 2: Comentado temporalmente */}
        {/* 
        <section>
          <h2 id="plantillas-reportes" className="text-3xl font-bold text-gray-800 mb-8">
            Plantillas y Reportes
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Recursos para documentar y reportar hallazgos de testing de accesibilidad:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plantillasReportes.map((plantilla) => (
              <Card key={plantilla.id} variant="elevated" className="h-full">
                <CardHeader
                  title={plantilla.titulo}
                  icon={<Icon icon={Download} size="lg" className="text-tertiary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed mb-4">
                    {plantilla.descripcion}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      alert(`Descargando: ${plantilla.archivo}`)
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
            <Link href="/fases/desarrollo">
              <Button variant="outline" size="lg">
                <Icon icon={ArrowLeft} size="sm" className="mr-2" />
                Fase 3: Desarrollo
              </Button>
            </Link>
            
            <Link href="/fases/despliegue">
              <Button variant="primary" size="lg">
                Fase 5: Despliegue
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </div>
  )
}
