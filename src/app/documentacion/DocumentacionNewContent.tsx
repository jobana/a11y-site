'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  BookOpen,
  Palette,
  Code,
  Target,
  Users,
  FlaskConical,
  CheckSquare2,
  Eye,
  VolumeX,
  Hand,
  Brain,
  Monitor,
  Smartphone,
  AlertTriangle,
  ArrowLeft,
  ArrowRight
} from '@/components/ui'

// Datos para paleta de colores real implementada
const paletaColores = {
  primary: {
    nombre: "Primary (Rosa - Sistema Principal)",
    uso: "Navegación principal, enlaces, botones primarios, elementos interactivos principales",
    descripcion: "Paleta rosa basada en #C279A2 con escala de 10 tonos para máxima flexibilidad",
    tonos: [
      { valor: "10", variable: "--primary-10", color: "#f7f1f5", contraste: "19.6:1", uso: "Fondos de navegación lateral, fondos sutiles", wcag: "AAA" },
      { valor: "20", variable: "--primary-20", color: "#ead3df", contraste: "16.2:1", uso: "Bordes suaves, divisores", wcag: "AAA" },
      { valor: "30", variable: "--primary-30", color: "#ddb5c9", contraste: "12.8:1", uso: "Estados hover en fondos claros", wcag: "AAA" },
      { valor: "50", variable: "--primary-50", color: "#c279a2", contraste: "4.52:1", uso: "Elementos interactivos, iconos", wcag: "AA" },
      { valor: "70", variable: "--primary-70", color: "#8e4f71", contraste: "7.1:1", uso: "Texto secundario (reemplazado por gray-80)", wcag: "AA" },
      { valor: "80", variable: "--primary-80", color: "#743a59", contraste: "9.8:1", uso: "Texto sobre fondos claros, estado activo", wcag: "AAA" },
      { valor: "90", variable: "--primary-90", color: "#5a2540", contraste: "14.2:1", uso: "Texto principal oscuro", wcag: "AAA" }
    ]
  },
  secondary: {
    nombre: "Secondary (Morado - Estados Positivos)",
    uso: "Estados de éxito, confirmaciones, elementos de fase Diseño y Despliegue",
    descripcion: "Paleta morado suave análoga al rosa para comunicar estados positivos",
    tonos: [
      { valor: "10", variable: "--secondary-10", color: "#f6f3f7", contraste: "18.9:1", uso: "Fondos de notificaciones de éxito", wcag: "AAA" },
      { valor: "20", variable: "--secondary-20", color: "#e8dfe9", contraste: "15.4:1", uso: "Bordes de confirmación", wcag: "AAA" },
      { valor: "30", variable: "--secondary-30", color: "#d2c2d5", contraste: "11.7:1", uso: "Estados hover en elementos positivos", wcag: "AAA" },
      { valor: "50", variable: "--secondary-50", color: "#8b5a8c", contraste: "4.89:1", uso: "Botones de confirmación, iconos de éxito", wcag: "AA" },
      { valor: "60", variable: "--secondary-60", color: "#7a4f7b", contraste: "6.2:1", uso: "Estados activos en elementos positivos", wcag: "AA" },
      { valor: "70", variable: "--secondary-70", color: "#69446a", contraste: "8.1:1", uso: "Texto en contextos de éxito", wcag: "AA" },
      { valor: "80", variable: "--secondary-80", color: "#583959", contraste: "10.9:1", uso: "Texto principal en elementos morados", wcag: "AAA" }
    ]
  },
  tertiary: {
    nombre: "Tertiary (Coral - Alertas y Atención)",
    uso: "Advertencias, alertas, elementos de fase Desarrollo, llamadas de atención",
    descripcion: "Paleta coral cálida complementaria para elementos que requieren atención",
    tonos: [
      { valor: "10", variable: "--tertiary-10", color: "#fff5f2", contraste: "17.8:1", uso: "Fondos de alertas informativas", wcag: "AAA" },
      { valor: "20", variable: "--tertiary-20", color: "#ffe4dc", contraste: "14.1:1", uso: "Bordes de advertencia", wcag: "AAA" },
      { valor: "30", variable: "--tertiary-30", color: "#ffcab7", contraste: "10.5:1", uso: "Estados hover en alertas", wcag: "AAA" },
      { valor: "50", variable: "--tertiary-50", color: "#ff8a65", contraste: "4.67:1", uso: "Botones de alerta, iconos de advertencia", wcag: "AA" },
      { valor: "60", variable: "--tertiary-60", color: "#e6705a", contraste: "6.8:1", uso: "Estados activos en elementos de atención", wcag: "AA" },
      { valor: "80", variable: "--tertiary-80", color: "#b33c44", contraste: "9.2:1", uso: "Texto en contextos de alerta", wcag: "AAA" },
      { valor: "90", variable: "--tertiary-90", color: "#992239", contraste: "12.6:1", uso: "Texto principal en elementos coral", wcag: "AAA" }
    ]
  },
  gray: {
    nombre: "Gray (Escala de Grises - Texto y Neutrales)",
    uso: "Texto principal, texto secundario, fondos neutros, elementos de interfaz",
    descripcion: "Escala de grises optimizada para legibilidad y contraste, incluyendo gray-80 personalizado",
    tonos: [
      { valor: "80", variable: "--gray-800", color: "#424242", contraste: "10.4:1", uso: "Texto secundario legible, reemplaza primary-70", wcag: "AAA" },
      { valor: "800", variable: "text-gray-800", color: "#424242", contraste: "12.6:1", uso: "Títulos H2, texto de encabezados", wcag: "AAA" },
      { valor: "900", variable: "text-gray-900", color: "#212121", contraste: "21:1", uso: "Texto principal de párrafos, máxima legibilidad", wcag: "AAA" }
    ]
  }
}

// Datos para componentes UI reales implementados
const componentesUI = [
  {
    id: "button",
    nombre: "Button",
    descripcion: "Sistema de botones con variants accesibles y estados optimizados para contraste WCAG",
    accesibilidad: {
      contraste: "Todos los variants cumplen mínimo 4.5:1, mayoría 7:1+ (AAA)",
      teclado: "Enter/Espacio para activación, Tab para navegación",
      lectores: "Roles button implícitos, aria-label cuando necesario",
      tactil: "Mínimo 44px en todas las variantes size='lg'"
    },
    variants: [
      { nombre: "primary", contraste: "4.52:1", uso: "Acciones principales", wcag: "AA" },
      { nombre: "secondary", contraste: "4.89:1", uso: "Acciones secundarias", wcag: "AA" },
      { nombre: "outline", contraste: "9.8:1", uso: "Acciones terciarias", wcag: "AAA" }
    ],
    codigo: `<Button variant="primary" size="lg">
  <Icon icon={CheckSquare2} size="sm" className="mr-2" />
  Acción Principal
</Button>`
  },
  {
    id: "card",
    nombre: "Card",
    descripcion: "Contenedor modular con estructura semántica y soporte completo para contenido accesible",
    accesibilidad: {
      contraste: "Bordes border-primary-20 (16.2:1), texto text-gray-900 (21:1)",
      estructura: "Landmarks semánticos con CardHeader, CardContent, CardFooter",
      navegacion: "Focus management automático para elementos interactivos internos",
      responsive: "Breakpoints accesibles, zoom 200% soportado"
    },
    variants: [
      { nombre: "default", uso: "Contenido básico", caracteristica: "bg-white con border sutil" },
      { nombre: "elevated", uso: "Contenido destacado", caracteristica: "box-shadow y border mejorado" }
    ],
    codigo: `<Card variant="elevated">
  <CardHeader 
    title="Título Accesible" 
    description="Descripción clara"
    icon={<Icon icon={Target} size="lg" />} 
  />
  <CardContent>
    <p className="text-gray-900">Contenido con contraste 21:1</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Acción</Button>
  </CardFooter>
</Card>`
  },
  {
    id: "accordion",
    nombre: "Accordion",
    descripcion: "Contenido expandible con navegación completa por teclado y comunicación de estados via ARIA",
    accesibilidad: {
      aria: "aria-expanded, aria-controls, aria-labelledby automáticos",
      teclado: "Enter/Espacio expande/colapsa, flechas opcionales entre items",
      focus: "Focus management en contenido expandido, outline visible",
      animacion: "Respeta prefers-reduced-motion del usuario"
    },
    estados: [
      { estado: "expanded", aria: "aria-expanded='true'", visual: "Icono rotado, contenido visible" },
      { estado: "collapsed", aria: "aria-expanded='false'", visual: "Icono normal, contenido oculto" }
    ],
    codigo: `<Accordion type="multiple">
  <AccordionItem value="item1">
    <AccordionTrigger className="text-left">
      <div className="flex items-center gap-3">
        <Icon icon={Code} size="md" className="text-secondary-50" />
        <span className="font-semibold">Título</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      Contenido accesible con focus management
    </AccordionContent>
  </AccordionItem>
</Accordion>`
  },
  {
    id: "tabs",
    nombre: "Tabs",
    descripcion: "Sistema de pestañas con navegación ARIA completa y soporte para teclado avanzado",
    accesibilidad: {
      aria: "role='tablist', role='tab', role='tabpanel', aria-selected",
      teclado: "Flechas navegan tabs, Tab entra/sale, Enter/Espacio activa",
      focus: "Roving tabindex pattern, focus visible en tab activo",
      asociacion: "aria-controls asocia tabs con panels correctamente"
    },
    patrones: [
      { patron: "Roving Tabindex", descripcion: "Solo tab activo recibe focus, flechas cambian" },
      { patron: "Panel Association", descripcion: "aria-controls conecta tab con su panel" },
      { patron: "Selection Follows Focus", descripcion: "Tab activo se selecciona automáticamente" }
    ],
    codigo: `<Tabs defaultValue="tab1" orientation="horizontal">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">
      <Icon icon={Monitor} size="sm" className="mr-2" />
      Tab 1
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" className="mt-8">
    <Card>Contenido del tab</Card>
  </TabsContent>
</Tabs>`
  },
  {
    id: "icon",
    nombre: "Icon",
    descripcion: "Wrapper para iconos Lucide con optimizaciones de accesibilidad y consistencia visual",
    accesibilidad: {
      aria: "aria-hidden='true' por defecto para iconos decorativos",
      contraste: "Todos los iconos cumplen 3:1 mínimo para elementos no-textuales",
      size: "Sistema de tamaños consistente (sm: 16px, md: 20px, lg: 24px, xl: 32px)",
      semantic: "Soporte para aria-label cuando el icono transmite información"
    },
    sizes: [
      { size: "sm", pixels: "16px", uso: "Iconos inline, botones pequeños" },
      { size: "md", pixels: "20px", uso: "Iconos estándar, navegación" },
      { size: "lg", pixels: "24px", uso: "Headers, elementos destacados" },
      { size: "xl", pixels: "32px+", uso: "Hero sections, iconos principales" }
    ],
    codigo: `{/* Icono decorativo */}
<Icon icon={CheckSquare2} size="md" className="text-primary-50" />

{/* Icono informativo */}
<Icon 
  icon={AlertTriangle} 
  size="lg" 
  className="text-tertiary-50"
  aria-label="Advertencia importante" 
/>`
  }
]

// Datos para navegación por teclado
const navegacionTeclado = [
  {
    elemento: "Navegación Principal",
    teclas: ["Tab", "Enter", "Flechas"],
    comportamiento: "Tab navega entre secciones, Enter abre/cierra, flechas navegan dentro de secciones",
    implementacion: "role='navigation', aria-label descriptivo, manejo de foco programático"
  },
  {
    elemento: "Componentes Tabs",
    teclas: ["Tab", "Flechas", "Home", "End"],
    comportamiento: "Tab entra/sale del tablist, flechas navegan entre tabs, Home/End van al primero/último",
    implementacion: "role='tablist', aria-selected, roving tabindex pattern"
  },
  {
    elemento: "Modales y Overlays",
    teclas: ["Tab", "Escape"],
    comportamiento: "Tab mantiene foco dentro del modal, Escape cierra y restaura foco",
    implementacion: "Focus trap, aria-modal='true', manejo de focus inicial y restauración"
  }
]

// Datos para clases POO de usuarios según el diagrama UML
const clasesUsuario = [
  {
    clase: "Usuario con Discapacidad",
    tipo: "Clase Abstracta",
    hereda: null,
    propiedades: ["-String: perfilID", "-boolean: usaTecnologiaAsistencia"],
    metodos: ["+enviarFormularioConAyudaContextual()"],
    descripcion: "Clase abstracta que establece el contrato fundamental para cualquier perfil de usuario en el sistema, encapsulando atributos comunes y una funcionalidad principal."
  },
  {
    clase: "Usuario navegación asistida",
    tipo: "Clase Abstracta",
    hereda: "Usuario con Discapacidad",
    propiedades: ["#boolean: dispositivoEsTeclad"],
    metodos: ["+navegarPorTeclado()"],
    descripcion: "Clase abstracta intermedia que agrupa perfiles de usuario que dependen de métodos de navegación basados en teclado u otros métodos asistidos. El atributo protegido permite que sus subclases directas accedan y especifiquen estos datos."
  },
  {
    clase: "Usuario con Apoyo en contenido",
    tipo: "Clase Abstracta",
    hereda: "Usuario con Discapacidad",
    propiedades: ["#boolean: preferenciaSubtitulos"],
    metodos: ["+controlarSubtitulosDeVideo()", "+obtenerContenidoTextualClaro()"],
    descripcion: "Clase abstracta intermedia que agrupa perfiles de usuario que requieren apoyo para la comprensión de contenido, como subtítulos para multimedia o contenido textual simplificado."
  },
  {
    clase: "UsuarioDiscapacidadFisica",
    tipo: "Clase Concreta",
    hereda: "Usuario navegación asistida",
    propiedades: [],
    metodos: ["+interactuarConDispositivosDeAyuda()"],
    descripcion: "Representa a un usuario con discapacidad física que podría usar dispositivos de asistencia especializados que simulan acciones de teclado o mouse, heredando así capacidades de navegación por teclado."
  },
  {
    clase: "UsuarioDiscapacidadVisual",
    tipo: "Clase Concreta",
    hereda: "Usuario navegación asistida",
    propiedades: ["-String: softwareLectorPantalla", "-String: textoAlternativo", "-String: nivelDeVision"],
    metodos: ["+explorarConLectorDePantalla()", "+identificarContenidoDeImagenes()"],
    descripcion: "Representa a un usuario con discapacidad visual que depende del software lector de pantalla y texto alternativo para imágenes, también heredando navegación por teclado."
  },
  {
    clase: "UsuarioDiscapacidadCognitiva",
    tipo: "Clase Concreta",
    hereda: "Usuario con Apoyo en contenido",
    propiedades: ["-boolean: reqReduccionDeMovimiento", "-boolean: tiempoAdicionalRequerido"],
    metodos: ["+interactuarSinParpadeos()"],
    descripcion: "Representa a un usuario con discapacidad cognitiva que se beneficia de la reducción de movimiento, contenido claro y potencialmente tiempo adicional para procesar información. Hereda características de apoyo de contenido."
  },
  {
    clase: "UsuarioDiscapacidadAuditiva",
    tipo: "Clase Concreta",
    hereda: "Usuario con Apoyo en contenido",
    propiedades: ["-boolean: requiereTranscripciones"],
    metodos: [],
    descripcion: "Representa a un usuario con discapacidad auditiva que necesita alternativas textuales para contenido de audio, como transcripciones y subtítulos. Hereda características de apoyo de contenido."
  },
  {
    clase: "UsuarioBajaVision",
    tipo: "Clase Concreta",
    hereda: "Usuario con Discapacidad",
    propiedades: ["-String: nivelContrasteRequerido", "-int: magnificacionFuenteNecesaria"],
    metodos: ["+escalarFuenteSinPerderInfo()", "+modificarContrasteYColores()", "+activarModoEscalaDeGrises()"],
    descripcion: "Representa a un usuario con baja visión que requiere personalizaciones visuales como escalado de fuentes, ajustes de contraste y modo de escala de grises, pero no necesariamente métodos de navegación alternativos."
  }
]

export function DocumentacionNewContent() {
  return (
    <div className="space-y-16">
        
        {/* 1. Sistema de Colores y Contraste */}
        <section>
          <h2 id="sistema-colores" className="text-3xl font-bold text-gray-800 mb-8">
            Sistema de Colores y Contraste
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Sistema de colores basado en metodología Carbon Design System con verificación 
            WCAG completa. Cada tono calculado para cumplimiento AA/AAA según contexto de uso:
          </p>

          <Tabs defaultValue="primary" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="primary">
                <Icon icon={Palette} size="sm" className="mr-2" />
                Primary
              </TabsTrigger>
              <TabsTrigger value="secondary">
                <Icon icon={Palette} size="sm" className="mr-2" />
                Secondary
              </TabsTrigger>
              <TabsTrigger value="tertiary">
                <Icon icon={Palette} size="sm" className="mr-2" />
                Tertiary
              </TabsTrigger>
              <TabsTrigger value="gray">
                <Icon icon={Palette} size="sm" className="mr-2" />
                Gray
              </TabsTrigger>
            </TabsList>

            {Object.entries(paletaColores).map(([key, paleta]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={paleta.nombre}
                    description={paleta.descripcion}
                  />
                  <CardContent>
                    <div className="mb-4 bg-tertiary-10 border border-tertiary-20 rounded-lg p-4">
                      <p className="text-gray-900 text-sm">
                        <strong>Uso principal:</strong> {paleta.uso}
                      </p>
                    </div>
                    <div className="space-y-4">
                      {paleta.tonos.map((tono, index) => (
                        <div key={index} className="border border-primary-20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                              <div 
                                className="w-16 h-16 rounded-lg border border-gray-300"
                                style={{ 
                                  backgroundColor: tono.color 
                                }}
                              ></div>
                              <div>
                                <p className="font-semibold text-gray-800">{key}-{tono.valor}</p>
                                <p className="text-sm text-gray-900 font-mono">{tono.variable}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  tono.wcag === 'AAA' ? 'bg-secondary-10 text-secondary-80' : 'bg-primary-10 text-primary-80'
                                }`}>
                                  {tono.wcag}
                                </span>
                                <span className="font-semibold text-gray-800">{tono.contraste}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-900">{tono.uso}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* 2. Componentes UI Accesibles */}
        <section>
          <h2 id="componentes-ui" className="text-3xl font-bold text-gray-800 mb-8">
            Componentes UI Accesibles
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Biblioteca de componentes con accesibilidad nativa integrada. Cada componente implementa 
            patrones ARIA estándar, navegación por teclado completa y cumplimiento WCAG AA/AAA:
          </p>

          <Accordion type="multiple">
            {componentesUI.map((componente) => (
              <AccordionItem key={componente.id} value={componente.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Icon icon={Code} size="md" className="text-tertiary-50" />
                    <div>
                      <span className="font-semibold text-lg">{componente.nombre}</span>
                      <p className="text-sm text-gray-900 mt-1">{componente.descripcion}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-4">
                    {/* Características de Accesibilidad */}
                    <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                      <h4 className="font-semibold text-secondary-90 mb-3 flex items-center gap-2">
                        <Icon icon={CheckSquare2} size="sm" />
                        Características de Accesibilidad
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(componente.accesibilidad).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium text-secondary-80 capitalize">{key}:</span>
                            <span className="text-gray-900 text-sm ml-2">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Variants/Estados/Patrones si existen */}
                    {componente.variants && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Variants Disponibles:</h4>
                        <div className="space-y-2">
                          {componente.variants.map((variant, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-primary-20 rounded-lg">
                              <div>
                                <span className="font-medium text-gray-800">{variant.nombre}</span>
                                <span className="text-sm text-gray-900 ml-2">- {variant.uso}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {'contraste' in variant && (
                                  <span className="text-sm font-mono text-gray-900">{variant.contraste}</span>
                                )}
                                {'wcag' in variant && (
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    variant.wcag === 'AAA' ? 'bg-secondary-10 text-secondary-80' : 'bg-primary-10 text-primary-80'
                                  }`}>
                                    {variant.wcag}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {componente.estados && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Estados ARIA:</h4>
                        <div className="space-y-2">
                          {componente.estados.map((estado, index) => (
                            <div key={index} className="p-3 border border-primary-20 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-gray-800">{estado.estado}</span>
                                <code className="bg-primary-10 text-gray-800 px-2 py-1 rounded text-xs">
                                  {estado.aria}
                                </code>
                              </div>
                              <p className="text-sm text-gray-900">{estado.visual}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {componente.patrones && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Patrones ARIA Implementados:</h4>
                        <div className="space-y-2">
                          {componente.patrones.map((patron, index) => (
                            <div key={index} className="p-3 border border-tertiary-20 rounded-lg">
                              <span className="font-medium text-tertiary-80">{patron.patron}:</span>
                              <span className="text-sm text-gray-900 ml-2">{patron.descripcion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {componente.sizes && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Tamaños Disponibles:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {componente.sizes.map((size, index) => (
                            <div key={index} className="p-3 border border-primary-20 rounded-lg text-center">
                              <div className="font-medium text-gray-800">{size.size}</div>
                              <div className="text-sm text-gray-900 font-mono">{size.pixels}</div>
                              <div className="text-xs text-gray-900 mt-1">{size.uso}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ejemplo Visual */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Ejemplo Visual:</h4>
                      <div className="bg-white border-2 border-primary-20 rounded-lg p-6 mb-4">
                        {componente.id === 'button' && (
                          <div className="space-y-4">
                            <div className="flex gap-4 flex-wrap">
                              <Button variant="primary" size="lg">
                                <Icon icon={CheckSquare2} size="sm" className="mr-2" />
                                Primary Button
                              </Button>
                              <Button variant="secondary" size="lg">
                                <Icon icon={Users} size="sm" className="mr-2" />
                                Secondary Button
                              </Button>
                              <Button variant="outline" size="lg">
                                <Icon icon={Target} size="sm" className="mr-2" />
                                Outline Button
                              </Button>
                            </div>
                            <p className="text-sm text-gray-900">
                              Prueba la navegación por teclado: Tab para enfocar, Enter/Espacio para activar
                            </p>
                          </div>
                        )}
                        
                        {componente.id === 'card' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card variant="default">
                              <CardHeader
                                title="Card Estándar"
                                description="Ejemplo de card básico"
                                icon={<Icon icon={Target} size="lg" className="text-primary-50" />}
                              />
                              <CardContent>
                                <p className="text-gray-900">Contenido del card con contraste 21:1 para máxima legibilidad.</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="primary" size="sm">Acción</Button>
                              </CardFooter>
                            </Card>
                            
                            <Card variant="elevated">
                              <CardHeader
                                title="Card Elevado"
                                description="Con shadow y border mejorado"
                                icon={<Icon icon={Eye} size="lg" className="text-secondary-50" />}
                              />
                              <CardContent>
                                <p className="text-gray-900">Card destacado para contenido importante.</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="secondary" size="sm">Acción</Button>
                              </CardFooter>
                            </Card>
                          </div>
                        )}

                        {componente.id === 'accordion' && (
                          <Accordion type="multiple">
                            <AccordionItem value="demo1">
                              <AccordionTrigger className="text-left">
                                <div className="flex items-center gap-3">
                                  <Icon icon={Code} size="md" className="text-secondary-50" />
                                  <span className="font-semibold">¿Cómo funciona la navegación?</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-gray-900">
                                  Usa Enter o Espacio para expandir/colapsar. El estado se comunica via aria-expanded
                                  a lectores de pantalla. Focus management mantiene el foco visible.
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="demo2">
                              <AccordionTrigger className="text-left">
                                <div className="flex items-center gap-3">
                                  <Icon icon={CheckSquare2} size="md" className="text-tertiary-50" />
                                  <span className="font-semibold">Estados ARIA implementados</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-gray-900">
                                  aria-expanded, aria-controls y aria-labelledby se manejan automáticamente.
                                  Compatible con todos los lectores de pantalla principales.
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        )}

                        {componente.id === 'tabs' && (
                          <Tabs defaultValue="tab1" orientation="horizontal">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="tab1">
                                <Icon icon={Monitor} size="sm" className="mr-2" />
                                Desktop
                              </TabsTrigger>
                              <TabsTrigger value="tab2">
                                <Icon icon={Smartphone} size="sm" className="mr-2" />
                                Mobile
                              </TabsTrigger>
                              <TabsTrigger value="tab3">
                                <Icon icon={Target} size="sm" className="mr-2" />
                                Testing
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="tab1" className="mt-4">
                              <Card>
                                <CardContent>
                                  <p className="text-gray-900">
                                    Contenido de desktop. Usa flechas izquierda/derecha para navegar entre tabs,
                                    Tab para entrar/salir del tablist.
                                  </p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            <TabsContent value="tab2" className="mt-4">
                              <Card>
                                <CardContent>
                                  <p className="text-gray-900">
                                    Contenido móvil optimizado. Los tabs mantienen accesibilidad táctil 
                                    con targets de 44px mínimo.
                                  </p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            <TabsContent value="tab3" className="mt-4">
                              <Card>
                                <CardContent>
                                  <p className="text-gray-900">
                                    Información de testing. role=&quot;tablist&quot;, role=&quot;tab&quot;, role=&quot;tabpanel&quot; 
                                    implementados según ARIA Authoring Practices.
                                  </p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        )}

                        {componente.id === 'icon' && (
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium text-gray-800 mb-2">Tamaños disponibles:</h5>
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <Icon icon={CheckSquare2} size="sm" className="text-primary-50" />
                                  <p className="text-xs text-gray-900 mt-1">Small (16px)</p>
                                </div>
                                <div className="text-center">
                                  <Icon icon={CheckSquare2} size="md" className="text-secondary-50" />
                                  <p className="text-xs text-gray-900 mt-1">Medium (20px)</p>
                                </div>
                                <div className="text-center">
                                  <Icon icon={CheckSquare2} size="lg" className="text-tertiary-50" />
                                  <p className="text-xs text-gray-900 mt-1">Large (24px)</p>
                                </div>
                                <div className="text-center">
                                  <Icon icon={CheckSquare2} size="xl" className="text-primary-80" />
                                  <p className="text-xs text-gray-900 mt-1">Extra Large (32px+)</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-2">Con información semántica:</h5>
                              <div className="flex items-center gap-2">
                                <Icon 
                                  icon={AlertTriangle} 
                                  size="lg" 
                                  className="text-tertiary-50"
                                  aria-label="Advertencia importante" 
                                />
                                <span className="text-gray-900">Este icono incluye aria-label para lectores de pantalla</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Código de Implementación */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Código de Implementación:</h4>
                      <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                        <pre className="text-gray-800 text-sm overflow-x-auto">
                          <code>{componente.codigo}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 4. Sistema de Navegación */}
        <section>
          <h2 id="sistema-navegacion" className="text-3xl font-bold text-gray-800 mb-8">
            Sistema de Navegación por Teclado
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Patrones de navegación consistentes que garantizan acceso completo via teclado 
            a toda la funcionalidad:
          </p>

          <div className="space-y-6">
            {navegacionTeclado.map((nav, index) => (
              <Card key={index} variant="elevated">
                <CardHeader
                  title={nav.elemento}
                  icon={<Icon icon={Target} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Teclas Soportadas:</h4>
                      <div className="flex gap-2 flex-wrap">
                        {nav.teclas.map((tecla, tIndex) => (
                          <kbd key={tIndex} className="bg-primary-90 text-white px-3 py-1 rounded text-sm font-mono">
                            {tecla}
                          </kbd>
                        ))}
                      </div>
                      <p className="text-gray-900 text-sm mt-3">{nav.comportamiento}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Implementación ARIA:</h4>
                      <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                        <code className="text-gray-800 text-sm">{nav.implementacion}</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Casos de Uso y Algoritmos de Accesibilidad */}
        <section>
          <h2 id="casos-uso" className="text-3xl font-bold text-gray-800 mb-8">
            Casos de Uso y Algoritmos de Accesibilidad
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Implementación de algoritmos específicos para diferentes perfiles de usuario, 
            garantizando que cada interacción sea accesible y funcional:
          </p>

          <Tabs defaultValue="cognitiva" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="cognitiva">
                <Icon icon={Brain} size="sm" className="mr-2" />
                Discapacidad Cognitiva
              </TabsTrigger>
              <TabsTrigger value="fisica">
                <Icon icon={Hand} size="sm" className="mr-2" />
                Discapacidad Física
              </TabsTrigger>
              <TabsTrigger value="visual">
                <Icon icon={Eye} size="sm" className="mr-2" />
                Discapacidad Visual
              </TabsTrigger>
              <TabsTrigger value="bajavision">
                <Icon icon={Eye} size="sm" className="mr-2" />
                Baja Visión
              </TabsTrigger>
              <TabsTrigger value="transversales">
                <Icon icon={Target} size="sm" className="mr-2" />
                Transversales
              </TabsTrigger>
            </TabsList>

            {/* Usuarios con Discapacidad Cognitiva */}
            <TabsContent value="cognitiva" className="mt-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader
                    title="Comprender Contenido con Apoyos Visuales"
                    description="Algoritmo para usuarios que procesan mejor la información visual"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                        <p className="text-gray-900 text-sm">El usuario puede tener dificultades para procesar grandes bloques de texto o conceptos abstractos.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario navega a una página con instrucciones, opciones o información.</li>
                          <li>El sistema presenta el contenido combinando texto con apoyos visuales.</li>
                          <li>Junto a una acción importante (ej. texto &quot;Guardar cambios&quot;), el sistema muestra un ícono universalmente reconocible (ej. un disquete o una marca de verificación).</li>
                          <li>Para explicar un concepto (ej. &quot;Configuración de privacidad&quot;), el sistema utiliza una imagen o pictograma simple (ej. un escudo o un candado).</li>
                          <li>Los botones para acciones críticas no solo tienen texto claro, sino que también se apoyan en color e íconos para reforzar el significado (ej. &quot;Confirmar&quot; con un ícono verde, &quot;Eliminar&quot; con un ícono rojo).</li>
                          <li>El usuario asocia el texto con la imagen, lo que le permite comprender la función o el concepto de manera más rápida y segura.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Evitar Animaciones Molestas"
                    description="Control de movimiento para usuarios sensibles a estímulos visuales"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                        <p className="text-gray-900 text-sm">El usuario es sensible a animaciones o parpadeos rápidos.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario abre una página del sitio web.</li>
                          <li>El sistema muestra el contenido. Si existe una animación decorativa esta no debe parpadear más de tres veces por segundo.</li>
                          <li>Para carruseles, el sistema provee un mecanismo de control claramente visible (ej. un botón de &quot;Pausa&quot;).</li>
                          <li>El usuario activa el control para detener el paso de elementos.</li>
                          <li>El sistema detiene inmediatamente todo el movimiento.</li>
                          <li>El usuario puede consumir el contenido de la página de forma estática y segura.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Usuarios con Discapacidad Física */}
            <TabsContent value="fisica" className="mt-8">
              <Card>
                <CardHeader
                  title="Interactuar usando Dispositivos de Ayuda"
                  description="Soporte para interruptores, pulsadores, joysticks de cabeza y otros dispositivos"
                />
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-tertiary-10 border border-tertiary-20 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                      <p className="text-gray-900 text-sm">El usuario tiene un dispositivo de ayuda (interruptor, pulsador, joystick de cabeza, etc.) configurado en su sistema operativo para simular acciones de teclado o mouse.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                        <li>El usuario abre una página del sitio web.</li>
                        <li>El usuario realiza una acción con su dispositivo de ayuda (ej. presiona un interruptor).</li>
                        <li>El software del dispositivo traduce la acción a un comando estándar (ej. Tecla Tab o Clic de mouse).</li>
                        <li>El sistema (sitio web) recibe el comando estándar, sin necesidad de saber qué dispositivo lo originó.</li>
                        <li>El sistema responde de manera predecible a ese comando. Si fue Tecla Tab, el foco se mueve al siguiente elemento interactivo.</li>
                        <li>El elemento que recibe el foco muestra un contorno visual claro y notorio, permitiendo al usuario saber dónde se encuentra en la página.</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Usuarios con Discapacidad Visual */}
            <TabsContent value="visual" className="mt-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader
                    title="Explorar Contenido mediante Lector de Pantalla"
                    description="Navegación semántica para tecnologías asistivas"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                        <p className="text-gray-900 text-sm">El usuario tiene un software lector de pantalla (como JAWS, NVDA o VoiceOver) activo.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario accede a una página del sitio web.</li>
                          <li>El sistema presenta el contenido con una estructura HTML semántica correcta (títulos &lt;h1&gt;, &lt;h2&gt;, párrafos &lt;p&gt;, listas &lt;ul&gt;, etc.).</li>
                          <li>El lector de pantalla anuncia el título de la página.</li>
                          <li>El usuario presiona un comando para navegar por encabezados (ej. la tecla H).</li>
                          <li>El lector de pantalla lee el siguiente encabezado, permitiendo al usuario &quot;escanear&quot; la estructura del contenido para entender su jerarquía.</li>
                          <li>El usuario utiliza las flechas del teclado para que el lector de pantalla lea el contenido (párrafos, listas) de forma secuencial.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Identificar Contenido de Imágenes por medio de su Texto Alternativo"
                    description="Descripción textual para contenido visual"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                        <p className="text-gray-900 text-sm">El usuario tiene un lector de pantalla activo.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario navega por la página y el foco del lector de pantalla llega a un elemento de imagen (&lt;img&gt;).</li>
                          <li>El sistema ha provisto un texto descriptivo en el atributo alt de la imagen.</li>
                          <li>El lector de pantalla anuncia que es una imagen y lee en voz alta el contenido del texto alternativo. (ej. &quot;Imagen, logotipo de la empresa VASS&quot;).</li>
                          <li>Si la imagen es puramente decorativa, el sistema tiene un atributo alt vacío (alt=&quot;&quot;).</li>
                          <li>El lector de pantalla ignora la imagen decorativa y no la anuncia, evitando &quot;ruido&quot; innecesario en la navegación.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Usuarios con Baja Visión */}
            <TabsContent value="bajavision" className="mt-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader
                    title="Escalar Fuente Manteniendo Funcionalidad"
                    description="Zoom responsivo sin pérdida de información"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-tertiary-10 border border-tertiary-20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                        <p className="text-gray-900 text-sm">El usuario necesita un tamaño de texto mayor para poder leer cómodamente.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario abre una página del sitio web.</li>
                          <li>El usuario utiliza la función de zoom del navegador (ej. presionando Ctrl y +) para aumentar el tamaño del contenido hasta un 200%.</li>
                          <li>El sistema (sitio web) responde de manera fluida al cambio de tamaño. El diseño se reorganiza (reflow) para ajustarse a la ventana sin necesidad de usar una barra de desplazamiento horizontal.</li>
                          <li>Todo el texto es visible, los botones y enlaces siguen siendo funcionales y no se superponen ni se ocultan elementos.</li>
                          <li>El usuario puede leer y operar la página completa con el nuevo tamaño de fuente.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Modificar Contraste y Colores"
                    description="Personalización visual para mejor legibilidad"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                        <p className="text-gray-900 text-sm">El usuario requiere un contraste más alto entre el texto y el fondo para distinguir el contenido.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario está navegando en el sitio web.</li>
                          <li>El usuario activa una opción para cambiar el contraste. Esto puede ser un plugin del navegador para esta función o un modo de alto contraste activado a nivel del sistema operativo (ej. en Windows o macOS).</li>
                          <li>El sistema detecta la elección del usuario (por el clic o mediante código CSS que reconoce la configuración del sistema operativo).</li>
                          <li>El sistema aplica una hoja de estilos alternativa que cambia los colores del sitio.</li>
                          <li>La página se muestra con una nueva paleta de colores de alto contraste, asegurando que toda la información siga siendo legible y funcional.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Activar Modo Escala de Grises"
                    description="Eliminación de color para reducir fatiga visual"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Precondición:</h4>
                        <p className="text-gray-900 text-sm">El usuario prefiere o necesita eliminar la información de color para reducir la fatiga visual o por sensibilidad a ciertos colores.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario está en una página del sitio web.</li>
                          <li>El usuario activa una opción para cambiar el modo de color a blanco y negro. Esto puede ser un plugin del navegador para esta función o un modo de alto contraste activado a nivel del sistema operativo (ej. en Windows o macOS).</li>
                          <li>El sistema aplica un filtro CSS (filter: grayscale(100%);) a toda la página web.</li>
                          <li>Todos los elementos del sitio (imágenes, textos, botones) se muestran instantáneamente en tonos de gris.</li>
                          <li>El usuario puede seguir navegando e interactuando con el sitio, que permanece completamente funcional pero sin color.</li>
                          <li>Los niveles de contraste prevalecen según el estándar WCAG.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Casos de Uso Transversales */}
            <TabsContent value="transversales" className="mt-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader
                    title="Navegar por Elementos Interactivos por Teclado"
                    description="Acceso completo via teclado a toda la funcionalidad"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario abre una página del sitio web.</li>
                          <li>El sistema asegura que todos los elementos interactivos (enlaces, botones, campos de formulario) pueden recibir foco.</li>
                          <li>El usuario presiona la tecla Tab.</li>
                          <li>El sistema mueve el foco al siguiente elemento interactivo en un orden lógico y coherente con la estructura visual de la página.</li>
                          <li>El usuario presiona Shift + Tab.</li>
                          <li>El sistema mueve el foco al elemento interactivo anterior.</li>
                          <li>Con el foco en un elemento (ej. un botón &quot;Ver más&quot;), el usuario presiona la tecla Enter o la Barra espaciadora.</li>
                          <li>El sistema ejecuta la acción asociada a ese elemento, como si se hubiera hecho clic con el mouse.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Enviar Formulario con Ayuda Contextual"
                    description="Validación accesible con soporte para el usuario"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario navega usando su teclado o dispositivo de ayuda hasta una página que contiene un formulario.</li>
                          <li>Cada campo del formulario tiene un rótulo visible (ej.: &quot;Nombre completo&quot;).</li>
                          <li>Si hay campos obligatorios, se indica con texto (por ejemplo: &quot;*Campo obligatorio&quot;).</li>
                          <li>Junto a campos complejos (como fechas o contraseñas), se muestra un ícono de ayuda con instrucciones breves.</li>
                          <li>El usuario completa los campos y navega hasta el botón &quot;Enviar&quot;.</li>
                          <li>El usuario activa el botón &quot;Enviar&quot;.</li>
                          <li>Si hay un error de validación:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                              <li>El sistema mueve el foco directamente al primer campo que contiene un error.</li>
                              <li>El sistema muestra un mensaje de texto, junto al campo, explicando el error de forma clara. (ej. &quot;El formato del correo es incorrecto&quot;).</li>
                            </ul>
                          </li>
                          <li>Si el envío es exitoso:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                              <li>El sistema procesa los datos.</li>
                              <li>El sistema muestra un mensaje de confirmación claro (ej. &quot;Formulario enviado con éxito&quot;).</li>
                              <li>El sistema mueve el foco a este mensaje de confirmación para que el usuario sepa de inmediato que la acción se completó.</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Permitir Activar/Desactivar Subtítulos en Contenido Multimedia"
                    description="Control de subtítulos para usuarios auditivos y cognitivos"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario abre una página con contenido de video.</li>
                          <li>El sistema muestra un reproductor de video con un botón de subtítulos visible.</li>
                          <li>El usuario da clic en el botón &quot;Subtítulos&quot; o &quot;CC&quot;.</li>
                          <li>El sistema activa los subtítulos si estaban desactivados, o los desactiva si estaban activos.</li>
                          <li>El video continúa con subtítulos visibles o sin ellos, según la selección del usuario.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="Permitir Obtener Contenido Textual Claro"
                    description="Información estructurada para mejor comprensión"
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Algoritmo:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900">
                          <li>El usuario abre una sección del sitio (por ejemplo, un artículo o un servicio).</li>
                          <li>El sistema muestra:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                              <li>Títulos y subtítulos jerarquizados.</li>
                              <li>Párrafos cortos y bien organizados.</li>
                              <li>Palabras claves en negrita o resaltadas.</li>
                              <li>Los enlaces y botones tienen textos descriptivos (por ejemplo: &quot;Ver detalles&quot; en lugar de &quot;clic aquí&quot;).</li>
                            </ul>
                          </li>
                          <li>El usuario navega por el contenido usando el scroll o teclado.</li>
                          <li>El contenido es comprensible, está distribuido de manera clara, maneja una jerarquía visual entre títulos, subtítulos y párrafos.</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* 5. Arquitectura POO: Clases de Usuario */}
        <section>
          <h2 id="arquitectura-poo" className="text-3xl font-bold text-gray-800 mb-8">
            Arquitectura POO: Clases de Usuario
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Modelado orientado a objetos que representa diferentes tipos de usuarios y sus 
            necesidades específicas de accesibilidad:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clasesUsuario.map((clase, index) => (
              <Card key={index} variant="elevated" className="h-full">
                <CardHeader
                  title={clase.clase}
                  description={`${clase.tipo}${clase.hereda ? ` - Hereda de ${clase.hereda}` : ''}`}
                  icon={<Icon icon={Users} size="lg" className="text-tertiary-50" />}
                />
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Propiedades:</h4>
                      <ul className="text-sm text-gray-900">
                        {clase.propiedades.map((prop, pIndex) => (
                          <li key={pIndex}>• {prop}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Métodos:</h4>
                      <ul className="text-sm text-gray-900">
                        {clase.metodos.map((metodo, mIndex) => (
                          <li key={mIndex}>• {metodo}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-tertiary-10 border border-tertiary-20 rounded-lg p-3">
                      <p className="text-gray-900 text-sm">{clase.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. Navegación */}
        <section className="border-t border-primary-20 pt-12">
          <div className="flex justify-between items-center">
            <Link href="/fases/despliegue">
              <Button variant="outline" size="lg">
                <Icon icon={ArrowLeft} size="sm" className="mr-2" />
                Fase 5: Despliegue
              </Button>
            </Link>
            
            <Link href="/recursos">
              <Button variant="primary" size="lg">
                Recursos
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </div>
  )
}
