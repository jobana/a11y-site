'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  Palette,
  Users,
  Settings,
  Target,
  Eye,
  VolumeX,
  Hand,
  Brain,
  CheckSquare2,
  AlertTriangle,
  Lightbulb,
  Type,
  Monitor,
  Smartphone,
  Download,
  ArrowLeft,
  ArrowRight
} from '@/components/ui'

// Datos para tipos de discapacidades
const tiposDiscapacidades = [
  {
    id: "visuales",
    titulo: "Discapacidades Visuales",
    icono: Eye,
    color: "text-primary-50",
    descripcion: "Ceguera, baja visión, daltonismo, sensibilidad a la luz",
    consideraciones: [
      "Contraste suficiente para texto e iconos",
      "Texto alternativo para imágenes informativas",
      "Navegación por teclado completa",
      "Compatibilidad con lectores de pantalla"
    ]
  },
  {
    id: "auditivas",
    titulo: "Discapacidades Auditivas",
    icono: VolumeX,
    color: "text-secondary-50",
    descripcion: "Sordera, pérdida auditiva, procesamiento auditivo",
    consideraciones: [
      "Subtítulos para contenido de video",
      "Transcripciones para contenido de audio",
      "Indicadores visuales para alertas sonoras",
      "Lenguaje claro y simple"
    ]
  },
  {
    id: "motoras",
    titulo: "Discapacidades Motoras",
    icono: Hand,
    color: "text-tertiary-50",
    descripcion: "Movilidad limitada, temblores, falta de miembros",
    consideraciones: [
      "Targets táctiles mínimo 44px × 44px",
      "Navegación por teclado completa",
      "Tiempo suficiente para interacciones",
      "Evitar gestos complejos obligatorios"
    ]
  },
  {
    id: "cognitivas",
    titulo: "Discapacidades Cognitivas",
    icono: Brain,
    color: "text-primary-50",
    descripcion: "Dislexia, TDAH, memoria, procesamiento",
    consideraciones: [
      "Instrucciones claras y paso a paso",
      "Evitar distracciones innecesarias",
      "Feedback inmediato para acciones",
      "Estructura consistente y predecible"
    ]
  }
]

// Datos para principios de diseño inclusivo
const principiosDiseno = [
  {
    id: "diversidad-usuarios",
    titulo: "Diversidad de Usuarios",
    descripcion: "Considera diferentes capacidades y contextos de uso",
    icono: Users,
    puntos: [
      "Capacidades visuales, auditivas, motoras y cognitivas",
      "Contextos ambientales como luz brillante o ruido",
      "Situaciones temporales como multitarea o estrés",
      "Diversidad tecnológica de dispositivos y conexiones"
    ]
  },
  {
    id: "flexibilidad",
    titulo: "Flexibilidad en el Diseño",
    descripcion: "Múltiples formas de interacción y personalización",
    icono: Settings,
    puntos: [
      "Teclado y mouse como alternativas equivalentes",
      "Zoom y ampliación hasta 200% sin pérdida de funcionalidad",
      "Preferencias de usuario para movimiento y contraste",
      "Temas claros y oscuros con transiciones suaves"
    ]
  },
  {
    id: "simplicidad",
    titulo: "Simplicidad y Claridad",
    descripcion: "Jerarquía visual clara y contenido comprensible",
    icono: Target,
    puntos: [
      "Encabezados bien estructurados (H1, H2, H3...)",
      "Espaciado consistente entre elementos",
      "Lenguaje claro y simple apropiado para la audiencia",
      "Feedback inmediato para acciones del usuario"
    ]
  }
]

// Datos para requisitos de contraste
const nivelesContraste = [
  {
    nivel: "AA (Requerido)",
    color: "bg-secondary-10 border-secondary-20 text-secondary-80",
    requisitos: [
      "4.5:1 - Texto normal",
      "3:1 - Texto grande (18pt+ o 14pt+ bold)",
      "3:1 - Elementos no textuales (iconos, bordes)"
    ]
  },
  {
    nivel: "AAA (Recomendado)",
    color: "bg-primary-10 border-primary-20 text-primary-80",
    requisitos: [
      "7:1 - Texto normal",
      "4.5:1 - Texto grande",
      "Mayor legibilidad en todas las condiciones"
    ]
  }
]

// Datos para herramientas de diseño
const herramientasDiseno = {
  figma: {
    titulo: "Figma",
    icono: Monitor,
    herramientas: [
      "Plugin A11y - Annotations: Permite documentar requisitos de accesibilidad directamente en los componentes del diseño, generando especificaciones técnicas para el equipo de desarrollo.",
      "Stark: Plugin integral que verifica contraste en tiempo real, simula diferentes tipos de daltonismo y proporciona métricas WCAG automáticas durante el proceso de diseño.",
      "Color Oracle: Herramienta especializada que simula con precisión cómo ven los colores las personas con diferentes tipos de daltonismo (protanopia, deuteranopia, tritanopia).",
      "Focus Orderer: Plugin que permite definir y visualizar el orden de tabulación para navegación por teclado, esencial para crear flujos de navegación lógicos y accesibles."
    ]
  },
  xd: {
    titulo: "Adobe XD",
    icono: Monitor,
    herramientas: [
      "Accessibility checker integrado: Herramienta nativa que analiza automáticamente los diseños en busca de problemas de accesibilidad comunes y sugiere mejoras basadas en las pautas WCAG.",
      "Voice prototyping: Funcionalidad avanzada para diseñar y prototipar interfaces de voz, permitiendo crear experiencias accesibles para usuarios que dependen de comandos de voz.",
      "Responsive resize: Sistema inteligente que permite probar cómo se comportan los diseños en diferentes tamaños de pantalla, crucial para accesibilidad en dispositivos móviles.",
      "Exportación con anotaciones: Capacidad de exportar diseños con especificaciones detalladas de accesibilidad incluidas, facilitando la implementación correcta por parte de los desarrolladores."
    ]
  },
  sketch: {
    titulo: "Sketch",
    icono: Monitor,
    herramientas: [
      "Stark plugin: Suite completa de herramientas de accesibilidad que incluye verificación de contraste, simulación de daltonismo, y generación de reportes de cumplimiento WCAG.",
      "Symbol libraries accesibles: Bibliotecas de componentes pre-diseñados que incluyen estados de accesibilidad (focus, hover, disabled) y especificaciones técnicas integradas.",
      "Sketch Mirror: Herramienta de testing en tiempo real que permite probar diseños en dispositivos físicos, incluyendo pruebas con tecnologías asistivas como lectores de pantalla móviles.",
      "Exportación optimizada: Sistema de exportación que genera assets optimizados para desarrollo accesible, incluyendo SVGs con markup semántico y especificaciones de texto alternativo."
    ]
  }
}

// Datos para plantillas descargables
const plantillasDescargables = [
  {
    id: "wireframes-kit",
    titulo: "Kit de Wireframes Accesibles",
    descripcion: "Componentes base con anotaciones de accesibilidad, plantillas de páginas comunes y biblioteca de iconos accesibles.",
    archivo: "wireframes-accesibles-kit.fig"
  },
  {
    id: "contraste-guia",
    titulo: "Guía de Contraste y Color",
    descripcion: "Paletas pre-verificadas WCAG, calculadora de contraste interactiva y simuladores de daltonismo.",
    archivo: "guia-contraste-color.pdf"
  },
  {
    id: "checklist-diseno",
    titulo: "Checklist Interactivo de Diseño",
    descripcion: "Lista verificable por proyecto con progreso guardado automáticamente y exportación de reportes.",
    archivo: "checklist-diseno-accesible.html"
  }
]

export function DiseñoNewContent() {
  return (
    <div className="space-y-16">
        
        {/* 1. Impacto del Diseño Inclusivo */}
        <section>
          <h2 id="impacto-diseno-inclusivo" className="text-3xl font-bold text-gray-800 mb-8">
            Impacto del Diseño Inclusivo
          </h2>
          
          <Card variant="elevated" className="mb-8">
            <CardHeader
              title="¿Por qué es importante el diseño inclusivo?"
              icon={<Icon icon={Lightbulb} size="lg" className="text-tertiary-50" />}
            />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      15%
                    </div>
                    <p className="text-gray-900">
                      <strong>De la población mundial</strong> tiene algún tipo de discapacidad
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Icon icon={AlertTriangle} size="md" className="text-tertiary-50" />
                    <p className="text-gray-900">
                      <strong>Situaciones temporales</strong> afectan a todos (lesiones, fatiga, distracción)
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon icon={Users} size="md" className="text-secondary-50" />
                    <p className="text-gray-900">
                      <strong>Envejecimiento</strong> genera nuevas necesidades de accesibilidad
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Icon icon={Smartphone} size="md" className="text-primary-50" />
                    <p className="text-gray-900">
                      <strong>Tecnología diversa</strong> requiere interfaces adaptables
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Principios de Diseño Inclusivo */}
        <section>
          <h2 id="principios-diseno" className="text-3xl font-bold text-gray-800 mb-8">
            Principios de Diseño Inclusivo
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {principiosDiseno.map((principio) => (
              <Card key={principio.id} variant="elevated" className="h-full">
                <CardHeader
                  title={principio.titulo}
                  description={principio.descripcion}
                  icon={<Icon icon={principio.icono} size="lg" className="text-secondary-50" />}
                />
                <CardContent>
                  <ul className="space-y-2">
                    {principio.puntos.map((punto, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon icon={CheckSquare2} size="sm" className="text-secondary-50 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-900 text-sm">{punto}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Tipos de Discapacidades - Accordion */}
        <section>
          <h2 id="tipos-discapacidades" className="text-3xl font-bold text-gray-800 mb-8">
            Diseñando para Diferentes Capacidades
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Para crear diseños verdaderamente inclusivos, es fundamental comprender las diferentes 
            capacidades y necesidades de los usuarios:
          </p>

          <Accordion type="multiple">
            {tiposDiscapacidades.map((tipo) => (
              <AccordionItem key={tipo.id} value={tipo.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Icon icon={tipo.icono} size="md" className={tipo.color} />
                    <div>
                      <span className="font-semibold">{tipo.titulo}</span>
                      <p className="text-sm text-gray-900 mt-1">{tipo.descripcion}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Consideraciones de Diseño:</h4>
                    <ul className="space-y-2">
                      {tipo.consideraciones.map((consideracion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon icon={CheckSquare2} size="sm" className="text-primary-50 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-900 text-sm leading-relaxed">{consideracion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 4. Contraste, Colores y Tipografía */}
        <section>
          <h2 id="contraste-colores" className="text-3xl font-bold text-gray-800 mb-8">
            Contraste, Colores y Tipografía
          </h2>
          
          <div className="space-y-8">
            <Card variant="elevated">
              <CardHeader
                title="Requisitos de Contraste WCAG"
                icon={<Icon icon={Eye} size="lg" className="text-primary-50" />}
              />
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nivelesContraste.map((nivel, index) => (
                    <div key={index} className={`${nivel.color} rounded-lg p-4 border`}>
                      <h4 className="font-bold mb-3">Nivel {nivel.nivel}</h4>
                      <ul className="space-y-1">
                        {nivel.requisitos.map((requisito, reqIndex) => (
                          <li key={reqIndex} className="text-sm">
                            • {requisito}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader
                title="Tipografía Accesible"
                icon={<Icon icon={Type} size="lg" className="text-tertiary-50" />}
              />
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Mejores Prácticas:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Tamaño base:</strong> 16px mínimo (1rem)</li>
                      <li>• <strong>Interlineado:</strong> 1.5 (150%) para texto corrido</li>
                      <li>• <strong>Longitud de línea:</strong> 45-75 caracteres máximo</li>
                      <li>• <strong>Alineación:</strong> Izquierda preferida</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Selección de Fuentes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Sans-serif</strong> para pantallas</li>
                      <li>• <strong>Serif</strong> para texto impreso o largo</li>
                      <li>• <strong>Evitar fuentes decorativas</strong> en interfaces</li>
                      <li>• <strong>Web fonts optimizadas</strong> con fallbacks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. Herramientas para Diseño Accesible */}
        <section>
          <h2 id="herramientas-diseno" className="text-3xl font-bold text-gray-800 mb-8">
            Herramientas para Diseño Accesible
          </h2>

          <Tabs defaultValue="figma" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="figma">
                <Icon icon={Monitor} size="sm" className="mr-2" />
                Figma
              </TabsTrigger>
              <TabsTrigger value="xd">
                <Icon icon={Monitor} size="sm" className="mr-2" />
                Adobe XD
              </TabsTrigger>
              <TabsTrigger value="sketch">
                <Icon icon={Monitor} size="sm" className="mr-2" />
                Sketch
              </TabsTrigger>
            </TabsList>

            {Object.entries(herramientasDiseno).map(([key, herramienta]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={herramienta.titulo}
                    icon={<Icon icon={herramienta.icono} size="lg" className="text-secondary-50" />}
                  />
                  <CardContent>
                    <ul className="space-y-3">
                      {herramienta.herramientas.map((tool, index) => {
                        const [nombre, ...descripcionParts] = tool.split(': ');
                        const descripcion = descripcionParts.join(': ');
                        return (
                          <li key={index} className="flex items-start gap-3">
                            <Icon icon={CheckSquare2} size="sm" className="text-primary-50 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-900 text-sm leading-relaxed">
                              <strong className="font-bold">{nombre}:</strong> {descripcion}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* 6. Plantillas y Recursos - FASE 2: Comentado temporalmente */}
        {/* 
        <section>
          <h2 id="plantillas" className="text-3xl font-bold text-gray-800 mb-8">
            Plantillas y Recursos
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Recursos listos para usar que te ayudarán a implementar diseño accesible en tus proyectos:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plantillasDescargables.map((plantilla) => (
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

        {/* 7. Navegación */}
        <section className="border-t border-primary-20 pt-12">
          <div className="flex justify-between items-center">
            <Link href="/fases/planeacion">
              <Button variant="outline" size="lg">
                <Icon icon={ArrowLeft} size="sm" className="mr-2" />
                Fase 1: Planeación
              </Button>
            </Link>
            
            <Link href="/fases/desarrollo">
              <Button variant="primary" size="lg">
                Fase 3: Desarrollo
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
  )
}
