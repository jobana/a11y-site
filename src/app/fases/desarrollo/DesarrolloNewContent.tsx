'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  Laptop,
  Code,
  Settings,
  CheckSquare2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Smartphone,
  Download,
  ArrowLeft,
  ArrowRight
} from '@/components/ui'

// Datos para jerarquía de accesibilidad
const jerarquiaAccesibilidad = [
  {
    nivel: 1,
    titulo: "HTML Semántico",
    descripcion: "Base sólida y funcional",
    color: "text-primary-50",
    beneficios: [
      "Estructura semántica clara",
      "Funciona sin CSS o JavaScript",
      "Compatible con tecnologías asistivas",
      "Mejor SEO y indexación"
    ]
  },
  {
    nivel: 2,
    titulo: "CSS Responsivo",
    descripcion: "Presentación adaptable",
    color: "text-secondary-50",
    beneficios: [
      "Diseño adaptable a diferentes pantallas",
      "Contraste y legibilidad optimizados",
      "Animaciones y transiciones accesibles",
      "Estados de focus visibles"
    ]
  },
  {
    nivel: 3,
    titulo: "JavaScript Progresivo",
    descripcion: "Funcionalidad mejorada",
    color: "text-tertiary-50",
    beneficios: [
      "Interactividad mejorada",
      "Validación en tiempo real",
      "Navegación dinámica accesible",
      "Gestión de estados complejos"
    ]
  },
  {
    nivel: 4,
    titulo: "ARIA como Puente",
    descripcion: "Donde el HTML no es suficiente",
    color: "text-primary-50",
    beneficios: [
      "Widgets complejos accesibles",
      "Estados dinámicos comunicados",
      "Relaciones entre elementos",
      "Regiones live actualizadas"
    ]
  }
]

// Datos para elementos HTML semánticos
const elementosSemanticos = [
  {
    categoria: "Landmarks",
    elementos: [
      { tag: "<header>", uso: "Cabecera de página o sección", ejemplo: "Logo, navegación principal" },
      { tag: "<nav>", uso: "Bloques de navegación", ejemplo: "Menú principal, breadcrumbs" },
      { tag: "<main>", uso: "Contenido principal único", ejemplo: "Artículo, dashboard principal" },
      { tag: "<aside>", uso: "Contenido relacionado", ejemplo: "Sidebar, widgets" },
      { tag: "<footer>", uso: "Pie de página o sección", ejemplo: "Copyright, enlaces legales" }
    ]
  },
  {
    categoria: "Contenido",
    elementos: [
      { tag: "<article>", uso: "Contenido independiente", ejemplo: "Post de blog, noticia" },
      { tag: "<section>", uso: "Sección temática", ejemplo: "Capítulo, pestaña" },
      { tag: "<h1-h6>", uso: "Jerarquía de títulos", ejemplo: "Títulos y subtítulos" },
      { tag: "<p>", uso: "Párrafos de texto", ejemplo: "Contenido textual" },
      { tag: "<figure>", uso: "Contenido referenciado", ejemplo: "Imagen con caption" }
    ]
  }
]

// Datos para patrones ARIA
const patronesARIA = [
  {
    id: "modal",
    titulo: "Modal Dialog",
    descripcion: "Ventanas modales accesibles con gestión de foco",
    atributos: [
      "role=\"dialog\"",
      "aria-modal=\"true\"",
      "aria-labelledby",
      "aria-describedby"
    ],
    consideraciones: [
      "Foco inicial en el modal",
      "Trap de foco dentro del modal",
      "Escape para cerrar",
      "Restaurar foco al cerrar"
    ]
  },
  {
    id: "tabs",
    titulo: "Tabs (Pestañas)",
    descripcion: "Navegación por pestañas con soporte de teclado",
    atributos: [
      "role=\"tablist\"",
      "role=\"tab\"",
      "role=\"tabpanel\"",
      "aria-selected",
      "aria-controls"
    ],
    consideraciones: [
      "Flechas para navegar entre tabs",
      "Espacio/Enter para activar",
      "Tab panel asociado correctamente",
      "Estado seleccionado claro"
    ]
  },
  {
    id: "accordion",
    titulo: "Accordion",
    descripcion: "Contenido expandible/colapsable",
    atributos: [
      "aria-expanded",
      "aria-controls",
      "aria-labelledby",
      "role=\"button\""
    ],
    consideraciones: [
      "Estado expandido/colapsado claro",
      "Navegación por flechas opcional",
      "Múltiples paneles abiertos",
      "Animaciones accesibles"
    ]
  }
]

// Datos para frameworks
const frameworksAccesibilidad = {
  react: {
    titulo: "React",
    icono: Code,
    caracteristicas: [
      "JSX permite HTML semántico directo",
      "Hooks para gestión de estados accesibles",
      "Librerías como React-ARIA y Reach UI",
      "Testing con React Testing Library"
    ],
    ejemplo: `// Componente accesible en React
function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      className="btn"
    >
      {children}
    </button>
  );
}`
  },
  vue: {
    titulo: "Vue.js",
    icono: Code,
    caracteristicas: [
      "Directivas v-model para formularios",
      "Slots para contenido flexible",
      "Vue-axe para testing de accesibilidad",
      "Composition API para lógica reutilizable"
    ],
    ejemplo: `<!-- Componente accesible en Vue -->
<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :aria-pressed="pressed"
    class="btn"
  >
    <slot></slot>
  </button>
</template>`
  },
  angular: {
    titulo: "Angular",
    icono: Code,
    caracteristicas: [
      "CDK de Angular Material para a11y",
      "Directivas para gestión de foco",
      "Testing con Angular Testing Utilities",
      "LiveAnnouncer para cambios dinámicos"
    ],
    ejemplo: `// Componente accesible en Angular
@Component({
  selector: 'app-button',
  template: \`
    <button
      (click)="onClick()"
      [disabled]="disabled"
      [attr.aria-pressed]="pressed"
      class="btn"
    >
      <ng-content></ng-content>
    </button>
  \`
})`
  }
}

// Datos para herramientas de desarrollo
const herramientasDesarrollo = [
  {
    id: "axe-devtools",
    titulo: "axe DevTools",
    descripcion: "Extensión de navegador para auditorías automáticas de accesibilidad",
    url: "https://www.deque.com/axe/devtools/"
  },
  {
    id: "wave-tool",
    titulo: "WAVE Web Accessibility Evaluator",
    descripcion: "Herramienta visual para identificar problemas de accesibilidad en páginas web",
    url: "https://wave.webaim.org/"
  },
  {
    id: "lighthouse",
    titulo: "Lighthouse Accessibility Audit",
    descripcion: "Auditoría integrada en Chrome DevTools para evaluación completa",
    url: "https://developers.google.com/web/tools/lighthouse"
  }
]

export function DesarrolloNewContent() {
  return (
    <div className="space-y-16">
        
        {/* 1. Jerarquía de la Accesibilidad */}
        <section>
          <h2 id="jerarquia-accesibilidad" className="text-3xl font-bold text-gray-800 mb-8">
            La Jerarquía de la Accesibilidad
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            El desarrollo accesible sigue una estructura jerárquica donde cada capa construye 
            sobre la anterior, creando una base sólida y progresivamente enriquecida:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jerarquiaAccesibilidad.map((nivel) => (
              <Card key={nivel.nivel} variant="elevated" className="h-full">
                <CardHeader
                  title={nivel.titulo}
                  description={nivel.descripcion}
                />
                <CardContent>
                  <ul className="space-y-2">
                    {nivel.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon icon={CheckSquare2} size="sm" className={`${nivel.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-gray-900 text-sm">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 2. HTML Semántico */}
        <section>
          <h2 id="html-semantico" className="text-3xl font-bold text-gray-800 mb-8">
            HTML Semántico
          </h2>
          
          <div className="space-y-8">
            {elementosSemanticos.map((categoria) => (
              <Card key={categoria.categoria} variant="elevated">
                <CardHeader
                  title={`Elementos ${categoria.categoria}`}
                  icon={<Icon icon={Code} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-primary-20">
                          <th className="text-left py-3 px-4 font-semibold text-gray-800">Elemento</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-800">Uso</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-800">Ejemplo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoria.elementos.map((elemento, index) => (
                          <tr key={index} className="border-b border-primary-10">
                            <td className="py-3 px-4">
                              <code className="bg-primary-10 text-gray-800 px-2 py-1 rounded text-sm">
                                {elemento.tag}
                              </code>
                            </td>
                            <td className="py-3 px-4 text-gray-900 text-sm">{elemento.uso}</td>
                            <td className="py-3 px-4 text-gray-900 text-sm">{elemento.ejemplo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Patrones ARIA - Accordion */}
        <section>
          <h2 id="patrones-aria" className="text-3xl font-bold text-gray-800 mb-8">
            Patrones ARIA Esenciales
          </h2>
          
          <div className="mb-8 bg-tertiary-10 border border-tertiary-20 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Icon icon={Lightbulb} size="md" className="text-tertiary-50 mt-1" />
              <div>
                <h4 className="font-semibold text-tertiary-90 mb-2">Principio ARIA:</h4>
                <p className="text-gray-900 text-sm">
                  ARIA debe usarse solo cuando el HTML semántico no es suficiente. 
                  Primero busca elementos nativos, luego considera ARIA como complemento.
                </p>
              </div>
            </div>
          </div>

          <Accordion type="multiple">
            {patronesARIA.map((patron) => (
              <AccordionItem key={patron.id} value={patron.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Icon icon={Code} size="md" className="text-secondary-50" />
                    <div>
                      <span className="font-semibold">{patron.titulo}</span>
                      <p className="text-sm text-gray-900 mt-1">{patron.descripcion}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Atributos Clave:</h4>
                      <ul className="space-y-2">
                        {patron.atributos.map((atributo, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <code className="bg-secondary-10 text-gray-800 px-2 py-1 rounded text-sm">
                              {atributo}
                            </code>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Consideraciones:</h4>
                      <ul className="space-y-2">
                        {patron.consideraciones.map((consideracion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon icon={CheckSquare2} size="sm" className="text-primary-50 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-900 text-sm">{consideracion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 4. Frameworks y Librerías */}
        <section>
          <h2 id="frameworks-librerias" className="text-3xl font-bold text-gray-800 mb-8">
            Accesibilidad en Frameworks
          </h2>

          <Tabs defaultValue="react" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="react">
                <Icon icon={Code} size="sm" className="mr-2" />
                React
              </TabsTrigger>
              <TabsTrigger value="vue">
                <Icon icon={Code} size="sm" className="mr-2" />
                Vue.js
              </TabsTrigger>
              <TabsTrigger value="angular">
                <Icon icon={Code} size="sm" className="mr-2" />
                Angular
              </TabsTrigger>
            </TabsList>

            {Object.entries(frameworksAccesibilidad).map(([key, framework]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <Card>
                  <CardHeader
                    title={framework.titulo}
                    icon={<Icon icon={framework.icono} size="lg" className="text-tertiary-50" />}
                  />
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Características:</h4>
                        <ul className="space-y-2">
                          {framework.caracteristicas.map((caracteristica, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Icon icon={CheckSquare2} size="sm" className="text-secondary-50 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-900 text-sm">{caracteristica}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Ejemplo de Código:</h4>
                        <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                          <pre className="text-gray-800 text-sm overflow-x-auto">
                            <code>{framework.ejemplo}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* 5. Herramientas de Desarrollo */}
        <section>
          <h2 id="herramientas-desarrollo" className="text-3xl font-bold text-gray-800 mb-8">
            Herramientas de Desarrollo
          </h2>
          
          <p className="text-lg text-gray-900 leading-relaxed mb-8">
            Herramientas esenciales para validar y mejorar la accesibilidad durante el desarrollo:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {herramientasDesarrollo.map((herramienta) => (
              <Card key={herramienta.id} variant="elevated" className="h-full">
                <CardHeader
                  title={herramienta.titulo}
                  icon={<Icon icon={Settings} size="lg" className="text-tertiary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed mb-4">
                    {herramienta.descripcion}
                  </p>
                </CardContent>
                <CardFooter>
                  <a 
                    href={herramienta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-full"
                    >
                      <Icon icon={Download} size="sm" className="mr-2" />
                      Visitar Sitio
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. Navegación */}
        <section className="border-t border-primary-20 pt-12">
          <div className="flex justify-between items-center">
            <Link href="/fases/diseno">
              <Button variant="outline" size="lg">
                <Icon icon={ArrowLeft} size="sm" className="mr-2" />
                Fase 2: Diseño
              </Button>
            </Link>
            
            <Link href="/fases/pruebas">
              <Button variant="primary" size="lg">
                Fase 4: Pruebas
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </div>
  )
}
