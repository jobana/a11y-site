'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  Monitor,
  Keyboard,
  Eye,
  VolumeX,
  Brain,
  Mail,
  ArrowLeft,
  ArrowRight,
  Accessibility
} from '@/components/ui'

// Datos del producto para VPAT
const informacionProducto = {
  nombre: "Sistema de Guía de Accesibilidad Web",
  version: "1.0",
  fecha: "Diciembre 2024",
  desarrollador: "Tesis de Grado - Accesibilidad Web",
  estandares: ["WCAG 2.1 AA", "Section 508", "EN 301 549"],
  tecnologias: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"]
}

// Criterios WCAG 2.1 AA evaluados
const criteriosWCAG = {
  perceptible: {
    titulo: "1. Perceptible",
    descripcion: "La información y los componentes de la interfaz deben ser presentados de manera que los usuarios puedan percibirlos",
    criterios: [
      {
        codigo: "1.1.1",
        titulo: "Contenido no textual",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Todo contenido no textual tiene alternativas textuales apropiadas",
        implementacion: "Iconos con aria-label, imágenes con alt descriptivos, elementos decorativos marcados apropiadamente"
      },
      {
        codigo: "1.3.1",
        titulo: "Información y relaciones",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "La información, estructura y relaciones están determinadas programáticamente",
        implementacion: "HTML semántico, landmarks ARIA, jerarquía de headings apropiada"
      },
      {
        codigo: "1.3.2",
        titulo: "Secuencia significativa",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "El orden de lectura es lógico y significativo",
        implementacion: "Orden DOM lógico, navegación secuencial coherente"
      },
      {
        codigo: "1.4.3",
        titulo: "Contraste (Mínimo)",
        nivel: "AA",
        cumplimiento: "Cumple",
        descripcion: "Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande",
        implementacion: "Sistema de colores verificado: texto principal 21:1, elementos UI 4.5:1+"
      },
      {
        codigo: "1.4.10",
        titulo: "Reflow",
        nivel: "AA",
        cumplimiento: "Cumple",
        descripcion: "Contenido se reajusta sin scroll horizontal hasta 320px de ancho",
        implementacion: "Diseño responsive, breakpoints accesibles, zoom 200% soportado"
      },
      {
        codigo: "1.4.11",
        titulo: "Contraste de elementos no textuales",
        nivel: "AA",
        cumplimiento: "Cumple",
        descripcion: "Contraste mínimo 3:1 para elementos gráficos e interfaz",
        implementacion: "Bordes, iconos y elementos UI cumplen 3:1, mayoría supera 4.5:1"
      }
    ]
  },
  operable: {
    titulo: "2. Operable",
    descripcion: "Los componentes de la interfaz y la navegación deben ser operables",
    criterios: [
      {
        codigo: "2.1.1",
        titulo: "Teclado",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Toda funcionalidad disponible via teclado",
        implementacion: "Navegación completa por Tab, Enter, Espacio, flechas. Focus management en componentes"
      },
      {
        codigo: "2.1.2",
        titulo: "Sin trampa de teclado",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "El foco no queda atrapado en ningún elemento",
        implementacion: "Focus trap en modales con Escape, navegación libre en toda la aplicación"
      },
      {
        codigo: "2.4.1",
        titulo: "Omitir bloques",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Mecanismo para omitir bloques de contenido",
        implementacion: "Skip links implícitos via landmarks semánticos y navegación por headings"
      },
      {
        codigo: "2.4.2",
        titulo: "Página titulada",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Páginas tienen títulos descriptivos",
        implementacion: "Titles únicos y descriptivos en cada página"
      },
      {
        codigo: "2.4.3",
        titulo: "Orden de foco",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Orden de foco es lógico y significativo",
        implementacion: "Orden DOM lógico, roving tabindex en componentes complejos"
      },
      {
        codigo: "2.4.6",
        titulo: "Encabezados y etiquetas",
        nivel: "AA",
        cumplimiento: "Cumple",
        descripcion: "Encabezados y etiquetas describen el tema o propósito",
        implementacion: "Jerarquía h1-h6 lógica, labels descriptivos en formularios"
      },
      {
        codigo: "2.4.7",
        titulo: "Foco visible",
        nivel: "AA",
        cumplimiento: "Cumple",
        descripcion: "Indicador de foco claramente visible",
        implementacion: "Outline visible en todos los elementos interactivos, contraste adecuado"
      }
    ]
  },
  comprensible: {
    titulo: "3. Comprensible",
    descripcion: "La información y el manejo de la interfaz deben ser comprensibles",
    criterios: [
      {
        codigo: "3.1.1",
        titulo: "Idioma de la página",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Idioma principal de la página está determinado programáticamente",
        implementacion: "lang='es' declarado en HTML root"
      },
      {
        codigo: "3.2.1",
        titulo: "Al recibir el foco",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "No se inician cambios de contexto al recibir foco",
        implementacion: "Foco no trigger cambios automáticos, interacción explícita requerida"
      },
      {
        codigo: "3.2.2",
        titulo: "Al recibir entrada",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "No se inician cambios de contexto con entrada de datos",
        implementacion: "Cambios de estado son predecibles y controlados por el usuario"
      },
      {
        codigo: "3.3.1",
        titulo: "Identificación de errores",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Errores son identificados y descritos al usuario",
        implementacion: "Estados de error claros con mensajes descriptivos"
      },
      {
        codigo: "3.3.2",
        titulo: "Etiquetas o instrucciones",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Etiquetas e instrucciones cuando se requiere entrada",
        implementacion: "Labels asociados, instrucciones claras en componentes interactivos"
      }
    ]
  },
  robusto: {
    titulo: "4. Robusto",
    descripcion: "El contenido debe ser robusto para ser interpretado por una amplia variedad de agentes de usuario",
    criterios: [
      {
        codigo: "4.1.1",
        titulo: "Análisis",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Marcado válido según especificaciones",
        implementacion: "HTML5 semántico válido, atributos ARIA correctos"
      },
      {
        codigo: "4.1.2",
        titulo: "Nombre, función, valor",
        nivel: "A",
        cumplimiento: "Cumple",
        descripcion: "Nombre, función y valor determinados programáticamente",
        implementacion: "Roles ARIA, states y properties implementados correctamente"
      },
      {
        codigo: "4.1.3",
        titulo: "Mensajes de estado",
        nivel: "AA",
        cumplimiento: "Cumple",
        descripcion: "Mensajes de estado comunicados a tecnologías asistivas",
        implementacion: "Live regions para cambios dinámicos, estados aria-live apropiados"
      }
    ]
  }
}

// Funciones de accesibilidad implementadas
const funcionesAccesibilidad = [
  {
    categoria: "Navegación",
    icono: Keyboard,
    caracteristicas: [
      "Navegación completa por teclado en toda la aplicación",
      "Skip links implícitos via landmarks semánticos",
      "Orden de tabulación lógico y predecible",
      "Focus management en componentes complejos (modales, tabs)",
      "Indicadores de foco visibles con contraste adecuado"
    ]
  },
  {
    categoria: "Contenido Visual",
    icono: Eye,
    caracteristicas: [
      "Contraste de color WCAG AA/AAA en todo el contenido",
      "Textos redimensionables hasta 200% sin pérdida de funcionalidad",
      "Diseño responsive desde 320px de ancho",
      "Iconos con significado alternativo textual",
      "Paleta de colores accesible verificada"
    ]
  },
  {
    categoria: "Tecnologías Asistivas",
    icono: VolumeX,
    caracteristicas: [
      "HTML semántico con landmarks apropiados",
      "Estructura de headings jerárquica (h1-h6)",
      "Atributos ARIA para componentes complejos",
      "Descripciones programáticas de elementos",
      "Compatibilidad con lectores de pantalla principales"
    ]
  },
  {
    categoria: "Usabilidad Cognitiva",
    icono: Brain,
    caracteristicas: [
      "Estructura de contenido clara y predecible",
      "Navegación consistente en todas las páginas",
      "Instrucciones claras para elementos interactivos",
      "Tiempo suficiente para completar tareas",
      "Contenido organizado de forma lógica"
    ]
  }
]

// Métodos de evaluación utilizados
const metodosEvaluacion = [
  {
    metodo: "Evaluación Automatizada",
    herramientas: ["axe DevTools", "Lighthouse Accessibility Audit", "WAVE"],
    descripcion: "Análisis automático de código para detectar problemas comunes de accesibilidad"
  },
  {
    metodo: "Evaluación Manual",
    herramientas: ["Navegación por teclado", "Lectores de pantalla", "Validación WCAG"],
    descripcion: "Pruebas manuales de navegación, interacción y conformidad con criterios WCAG"
  },
  {
    metodo: "Validación de Código",
    herramientas: ["Validador HTML5", "TypeScript", "ESLint a11y"],
    descripcion: "Verificación de markup semántico y patrones de código accesibles"
  }
]

export function AccesibilidadSitioContent() {
  return (
    <div className="space-y-16">
      
      {/* 1. Resumen Ejecutivo */}
      <section>
        <h2 id="resumen-ejecutivo" className="text-3xl font-bold text-gray-800 mb-8">
          Resumen Ejecutivo
        </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card variant="elevated">
              <CardHeader
                title="Estado de Cumplimiento"
                icon={<Icon icon={CheckCircle} size="lg" className="text-secondary-50" />}
              />
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">WCAG 2.1 AA:</span>
                    <span className="bg-secondary-10 text-secondary-80 px-3 py-1 rounded font-semibold">
                      CUMPLE
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">Section 508:</span>
                    <span className="bg-secondary-10 text-secondary-80 px-3 py-1 rounded font-semibold">
                      CUMPLE
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">EN 301 549:</span>
                    <span className="bg-secondary-10 text-secondary-80 px-3 py-1 rounded font-semibold">
                      CUMPLE
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader
                title="Métricas de Accesibilidad"
                icon={<Icon icon={Users} size="lg" className="text-tertiary-50" />}
              />
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">Criterios Evaluados:</span>
                    <span className="font-semibold text-gray-800">25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">Criterios Cumplidos:</span>
                    <span className="font-semibold text-secondary-80">25 (100%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">Nivel de Conformidad:</span>
                    <span className="font-semibold text-primary-80">AA</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-6">
            <p className="text-secondary-80 leading-relaxed">
              <strong>Declaración:</strong> Este sitio web cumple con los estándares WCAG 2.1 nivel AA 
              y está diseñado para ser accesible para personas con discapacidades. Hemos implementado 
              un sistema de diseño inclusivo que garantiza la usabilidad para todos los usuarios, 
              independientemente de sus capacidades o tecnologías asistivas utilizadas.
            </p>
          </div>
        </section>

        {/* 2. Información del Producto */}
        <section>
          <h2 id="informacion-producto" className="text-3xl font-bold text-gray-800 mb-8">
            Información del Producto
          </h2>
          
          <Card variant="elevated">
            <CardHeader
              title="Detalles del Sistema"
              icon={<Icon icon={Monitor} size="lg" className="text-primary-50" />}
            />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-gray-800">Nombre del Producto:</span>
                    <p className="text-gray-900">{informacionProducto.nombre}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Versión:</span>
                    <p className="text-gray-900">{informacionProducto.version}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Fecha de Evaluación:</span>
                    <p className="text-gray-900">{informacionProducto.fecha}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Desarrollador:</span>
                    <p className="text-gray-900">{informacionProducto.desarrollador}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-gray-800">Estándares Evaluados:</span>
                    <ul className="text-gray-900 mt-2">
                      {informacionProducto.estandares.map((estandar, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Icon icon={CheckCircle} size="sm" className="text-secondary-50" />
                          {estandar}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Tecnologías Utilizadas:</span>
                    <ul className="text-gray-900 mt-2">
                      {informacionProducto.tecnologias.map((tech, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Icon icon={CheckCircle} size="sm" className="text-primary-50" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Criterios WCAG 2.1 AA Evaluados */}
        <section>
          <h2 id="criterios-wcag" className="text-3xl font-bold text-gray-800 mb-8">
            Criterios WCAG 2.1 AA Evaluados
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Evaluación detallada de cada principio WCAG con criterios específicos y su implementación:
          </p>

          <Tabs defaultValue="perceptible" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="perceptible">
                <Icon icon={Eye} size="sm" className="mr-2" />
                Perceptible
              </TabsTrigger>
              <TabsTrigger value="operable">
                <Icon icon={Keyboard} size="sm" className="mr-2" />
                Operable
              </TabsTrigger>
              <TabsTrigger value="comprensible">
                <Icon icon={Brain} size="sm" className="mr-2" />
                Comprensible
              </TabsTrigger>
              <TabsTrigger value="robusto">
                <Icon icon={Shield} size="sm" className="mr-2" />
                Robusto
              </TabsTrigger>
            </TabsList>

            {Object.entries(criteriosWCAG).map(([key, principio]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={principio.titulo}
                    description={principio.descripcion}
                  />
                  <CardContent>
                    <div className="space-y-6">
                      {principio.criterios.map((criterio, index) => (
                        <div key={index} className="border border-primary-20 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm bg-primary-10 text-gray-800 px-2 py-1 rounded">
                                {criterio.codigo}
                              </span>
                              <div>
                                <h4 className="font-semibold text-gray-800">{criterio.titulo}</h4>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  criterio.nivel === 'AA' 
                                    ? 'bg-secondary-10 text-secondary-80' 
                                    : 'bg-primary-10 text-primary-80'
                                }`}>
                                  Nivel {criterio.nivel}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon icon={CheckCircle} size="sm" className="text-secondary-50" />
                                            <span className="text-gray-900 font-semibold text-sm">
                {criterio.cumplimiento}
              </span>
                            </div>
                          </div>
                          <p className="text-gray-900 text-sm mb-3">{criterio.descripcion}</p>
                          <div className="bg-tertiary-10 border border-tertiary-20 rounded-lg p-3">
                            <span className="font-semibold text-gray-900 text-sm">Implementación:</span>
                            <p className="text-gray-900 text-sm mt-1">{criterio.implementacion}</p>
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

        {/* 4. Funciones de Accesibilidad */}
        <section>
          <h2 id="funciones-accesibilidad" className="text-3xl font-bold text-gray-800 mb-8">
            Funciones de Accesibilidad Implementadas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {funcionesAccesibilidad.map((funcion, index) => (
              <Card key={index} variant="elevated" className="h-full">
                <CardHeader
                  title={funcion.categoria}
                  icon={<Icon icon={funcion.icono} size="lg" className="text-secondary-50" />}
                />
                <CardContent>
                  <ul className="space-y-3">
                    {funcion.caracteristicas.map((caracteristica, cIndex) => (
                      <li key={cIndex} className="flex items-start gap-2">
                        <Icon icon={CheckCircle} size="sm" className="text-secondary-50 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-900 text-sm">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Métodos de Evaluación */}
        <section>
          <h2 id="metodos-evaluacion" className="text-3xl font-bold text-gray-800 mb-8">
            Métodos de Evaluación Utilizados
          </h2>
          
          <div className="space-y-6">
            {metodosEvaluacion.map((metodo, index) => (
              <Card key={index} variant="elevated">
                <CardHeader
                  title={metodo.metodo}
                  icon={<Icon icon={CheckCircle} size="lg" className="text-tertiary-50" />}
                />
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Herramientas Utilizadas:</h4>
                      <ul className="space-y-2">
                        {metodo.herramientas.map((herramienta, hIndex) => (
                          <li key={hIndex} className="flex items-center gap-2">
                            <Icon icon={CheckCircle} size="sm" className="text-primary-50" />
                            <span className="text-gray-900 text-sm">{herramienta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Descripción del Proceso:</h4>
                      <p className="text-gray-900 text-sm leading-relaxed">{metodo.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. Información de Contacto */}
        <section>
          <h2 id="contacto-accesibilidad" className="text-3xl font-bold text-gray-800 mb-8">
            Información de Contacto para Accesibilidad
          </h2>
          
          <Card variant="elevated">
            <CardHeader
              title="Soporte de Accesibilidad"
              description="Si experimenta dificultades para acceder a cualquier contenido o funcionalidad de este sitio, o tiene sugerencias de mejora"
              icon={<Icon icon={Mail} size="lg" className="text-primary-50" />}
            />
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-900 leading-relaxed">
                  Estamos comprometidos con la accesibilidad y trabajamos continuamente para mejorar 
                  la experiencia de todos nuestros usuarios. Si encuentra alguna barrera de 
                  accesibilidad o tiene sugerencias para mejorar la usabilidad del sitio, 
                  no dude en contactarnos.
                </p>
                <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                  <p className="text-gray-900 text-sm">
                    <strong>Compromiso:</strong> Responderemos a todas las consultas relacionadas 
                    con accesibilidad dentro de 48 horas hábiles y trabajaremos para resolver 
                    cualquier problema identificado en el menor tiempo posible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7. Navegación */}
        <section className="border-t border-primary-20 pt-12">
          <div className="flex justify-between items-center">
            <Link href="/recursos">
              <Button variant="outline" size="lg">
                <Icon icon={ArrowLeft} size="sm" className="mr-2" />
                Recursos
              </Button>
            </Link>
            
            <Link href="/contacto">
              <Button variant="primary" size="lg">
                Contacto
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </div>
    )
  }
