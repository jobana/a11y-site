'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Hand,
  Brain,
  Clock,
  Users,
  TrendingUp,
  Search,
  DollarSign,
  Award,
  Scale,
  Globe,
  FileText,
  UserCheck,
  Palette,
  Code,
  TestTube,
  BookOpen,
  Monitor,
  Accessibility,
  type LucideIcon
} from '@/components/ui'

// Definición de términos del glosario con iconos
const glosarioTerminos = [
  {
    termino: "Diseño Inclusivo",
    definicion: "Una metodología de diseño que busca crear productos y servicios que sean utilizables por la mayor cantidad posible de personas, sin necesidad de adaptaciones especiales. Va más allá de la accesibilidad para discapacidades y considera la diversidad humana en su totalidad.",
    icon: Users
  },
  {
    termino: "HTML Semántico", 
    definicion: "El uso de etiquetas HTML según su significado y propósito, no por su apariencia. Por ejemplo, usar <button> para un botón, <h1> para el título principal, o <nav> para un bloque de navegación. Esto crea una estructura lógica que las tecnologías de asistencia pueden interpretar correctamente.",
    icon: Code
  },
  {
    termino: "Lector de Pantalla",
    definicion: "Un software utilizado por personas ciegas o con baja visión que convierte el contenido de una pantalla en voz sintetizada o en una salida braille. Ejemplos comunes son NVDA, JAWS y VoiceOver.",
    icon: Volume2
  },
  {
    termino: "POUR",
    definicion: "El acrónimo de los cuatro principios fundamentales de la accesibilidad web según las WCAG: Perceptible, Operable, Understandable (Comprensible) y Robust (Robusto).",
    icon: Award
  },
  {
    termino: "Tecnología de Asistencia (AT)",
    definicion: "Cualquier software o hardware que ayuda a las personas con discapacidad a interactuar con el mundo digital. Incluye lectores de pantalla, magnificadores, software de reconocimiento de voz y dispositivos de entrada alternativos.",
    icon: Accessibility
  },
  {
    termino: "Texto Alternativo (Alt Text)",
    definicion: "Una descripción textual corta que se asigna a una imagen en el código para describir su contenido y función a los usuarios que no pueden verla.",
    icon: FileText
  },
  {
    termino: "Usabilidad",
    definicion: "La facilidad con la que una persona puede utilizar un producto o servicio para alcanzar un objetivo específico. La accesibilidad es un componente fundamental de la usabilidad, ya que un producto no puede ser usable si una persona no puede acceder a él.",
    icon: UserCheck
  },
  {
    termino: "W3C (World Wide Web Consortium)",
    definicion: "El organismo internacional que desarrolla los estándares abiertos para la web, incluyendo HTML, CSS y, fundamentalmente, las pautas de accesibilidad (WCAG).",
    icon: Globe
  },
  {
    termino: "WAI (Web Accessibility Initiative)",
    definicion: "La iniciativa dentro del W3C dedicada a promover y desarrollar los estándares y materiales de apoyo para la accesibilidad web.",
    icon: BookOpen
  },
  {
    termino: "WCAG (Web Content Accessibility Guidelines)",
    definicion: "Las Pautas de Accesibilidad para el Contenido Web. Son el estándar técnico de referencia a nivel mundial para crear contenido digital accesible para todas las personas, incluyendo aquellas con discapacidades.",
    icon: Scale
  }
]

export function GeneralidadesNewContent() {
  return (
    <div className="space-y-16">
      
      {/* 1. ¿Qué es la accesibilidad web? */}
      <section>
        <h2 id="que-es-accesibilidad" className="text-3xl font-bold text-gray-800 mb-6">
          1. ¿Qué es la accesibilidad web?
        </h2>
        <div className="prose prose-lg max-w-none text-gray-80 space-y-4">
          <p className="text-lg leading-relaxed">
            La accesibilidad web es el conjunto de prácticas de diseño y desarrollo que garantizan que cualquier persona, 
            incluidas aquellas con algún tipo de discapacidad, pueda percibir, comprender, navegar e interactuar con la web 
            de manera efectiva. Más que una característica técnica, es un principio fundamental del diseño universal que 
            busca eliminar barreras y ofrecer una experiencia de usuario equitativa para todos.
          </p>
          <p>
            En la práctica, esto significa crear sitios y aplicaciones que sean compatibles con tecnologías de asistencia 
            (como lectores de pantalla), que puedan ser operados sin necesidad de un mouse, y cuyo contenido sea claro y 
            fácil de entender. Un producto digital accesible no solo beneficia a personas con discapacidades permanentes, 
            sino que también mejora la usabilidad para una audiencia más amplia, incluyendo personas mayores, usuarios con 
            limitaciones temporales (como un brazo roto) o aquellos que acceden al contenido desde diferentes dispositivos y contextos.
          </p>
        </div>
      </section>

      {/* 2. Discapacidad e impedimentos - ACCORDION */}
      <section>
        <h2 id="discapacidad-impedimentos" className="text-3xl font-bold text-gray-800 mb-6">
          2. Discapacidad e impedimentos
        </h2>
        <div className="mb-6">
          <p className="text-lg text-gray-900 leading-relaxed">
            Para diseñar productos digitales inclusivos, es fundamental comprender que la discapacidad no es un problema 
            de la persona, sino el resultado de la interacción con un entorno que presenta barreras. El objetivo de la 
            accesibilidad no es "reparar" al usuario, sino eliminar esas barreras digitales.
          </p>
          <p className="text-gray-80 mt-4">
            Adoptando un enfoque centrado en la persona, describimos los principales tipos de discapacidad a considerar 
            en el desarrollo web, reconociendo que muchas personas pueden experimentar una combinación de ellas.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="visual">
          <AccordionItem value="visual">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <Icon icon={Eye} size="md" className="text-primary-50" />
                <span className="font-semibold">Discapacidad Visual</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <p className="text-gray-80">
                  Abarca un amplio espectro que va desde la ceguera total y la baja visión hasta el daltonismo o la 
                  sensibilidad a la luz. Las personas en este grupo a menudo dependen de tecnologías de asistencia como 
                  lectores de pantalla, que convierten el contenido visual en voz o braille, o de la capacidad de aumentar 
                  el tamaño del texto y el contraste.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Barreras comunes:</h4>
                  <p className="text-red-800 text-sm">
                    Imágenes sin texto alternativo, bajo contraste de color entre texto y fondo, y sitios que no se 
                    pueden navegar con teclado.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="auditiva">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <Icon icon={VolumeX} size="md" className="text-primary-50" />
                <span className="font-semibold">Discapacidad Auditiva</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <p className="text-gray-80">
                  Se refiere a la pérdida parcial o total de la audición. Para estos usuarios, el contenido presentado 
                  exclusivamente en formato de audio, como videos sin subtítulos, podcasts sin transcripción o alertas 
                  sonoras, es inaccesible.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Barreras comunes:</h4>
                  <p className="text-red-800 text-sm">
                    Videos, tutoriales o webinars que solo transmiten información a través del audio.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="motriz">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <Icon icon={Hand} size="md" className="text-primary-50" />
                <span className="font-semibold">Discapacidad Motriz</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <p className="text-gray-80">
                  Incluye a personas con limitaciones en el movimiento, fuerza o precisión, que pueden afectar el uso de 
                  un mouse o un teclado convencional. Estos usuarios pueden depender de métodos de entrada alternativos, 
                  como la navegación exclusiva por teclado, software de reconocimiento de voz o dispositivos de asistencia 
                  como pulsadores o joysticks.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Barreras comunes:</h4>
                  <p className="text-red-800 text-sm">
                    Funcionalidades que solo se pueden activar con un mouse, menús desplegables complejos y límites de 
                    tiempo para completar acciones.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cognitiva">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <Icon icon={Brain} size="md" className="text-primary-50" />
                <span className="font-semibold">Discapacidad Cognitiva y del Aprendizaje</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <p className="text-gray-80">
                  Este es un grupo muy diverso que incluye dificultades relacionadas con la memoria, la resolución de 
                  problemas, la atención (como el TDAH) y la lectura (como la dislexia). La sobrecarga de información, 
                  los procesos complejos o un lenguaje ambiguo pueden crear barreras significativas.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Barreras comunes:</h4>
                  <p className="text-red-800 text-sm">
                    Navegación inconsistente, textos largos y densos, y animaciones o contenidos que se mueven y distraen.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="temporal">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-3">
                <Icon icon={Clock} size="md" className="text-primary-50" />
                <span className="font-semibold">Limitaciones Temporales y Situacionales</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <p className="text-gray-80">
                  La accesibilidad no solo beneficia a personas con discapacidades permanentes. También apoya a usuarios 
                  en una variedad de contextos:
                </p>
                <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                  <h4 className="font-semibold text-primary-90 mb-2">Ejemplos:</h4>
                  <p className="text-gray-900 text-sm">
                    <strong>Temporal:</strong> Alguien con un brazo roto que no puede usar el mouse, o con una infección 
                    de oído que le impide escuchar audio.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 3. Beneficios y valor agregado - CARDS */}
      <section>
        <h2 id="beneficios-valor-agregado" className="text-3xl font-bold text-gray-800 mb-6">
          3. Beneficios y Valor Agregado al implementar accesibilidad web
        </h2>
        <p className="text-lg text-gray-900 leading-relaxed mb-8">
          Adoptar la accesibilidad web no es solo una obligación ética o legal; es una decisión estratégica que genera 
          beneficios tangibles en múltiples áreas. Integrar estos principios en el ciclo de desarrollo se traduce en la 
          creación de productos de mayor calidad y con un alcance más amplio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Ampliación del Mercado"
              icon={<Icon icon={TrendingUp} size="lg" className="text-tertiary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm leading-relaxed">
                Un diseño inclusivo permite que los productos y servicios digitales lleguen a un público más amplio. 
                Esto incluye al 7% de la población colombiana que reporta alguna discapacidad, y un segmento creciente 
                de personas mayores y usuarios con limitaciones temporales.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Mejora de la Experiencia de Usuario (UX)"
              icon={<Icon icon={Users} size="lg" className="text-tertiary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm leading-relaxed">
                Las prácticas de accesibilidad benefician a todos los usuarios. Un diseño con texto claro, navegación 
                consistente y estructura lógica es más fácil de usar para cualquiera, mejorando la satisfacción del 
                cliente y reduciendo la frustración.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Fortalecimiento de la Reputación de Marca"
              icon={<Icon icon={Award} size="lg" className="text-tertiary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm leading-relaxed">
                Las organizaciones que priorizan la inclusión digital proyectan una imagen positiva y socialmente 
                responsable. Demostrar compromiso genuino con la equidad puede ser un diferenciador clave en el mercado.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Optimización para Motores de Búsqueda (SEO)"
              icon={<Icon icon={Search} size="lg" className="text-tertiary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm leading-relaxed">
                Existe una fuerte correlación entre las buenas prácticas de accesibilidad y un mejor posicionamiento 
                en buscadores. El HTML semántico y los textos alternativos mejoran la visibilidad orgánica.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Reducción de Costos a Largo Plazo"
              icon={<Icon icon={DollarSign} size="lg" className="text-tertiary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm leading-relaxed">
                Integrar la accesibilidad desde las fases iniciales es significativamente más económico que corregir 
                un producto finalizado. Un enfoque Shift-Left minimiza reprocesos y optimiza recursos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Normativa legal y estándares internacionales - TABS */}
      <section>
        <h2 id="normativa-legal" className="text-3xl font-bold text-gray-800 mb-6">
          4. Normativa Legal y Estándares Internacionales
        </h2>
        <p className="text-lg text-gray-900 leading-relaxed mb-8">
          La accesibilidad web no opera en un vacío; está respaldada por un sólido marco de leyes nacionales y 
          estándares globales que buscan garantizar la inclusión digital. Comprender este contexto es fundamental 
          para dimensionar la importancia de implementar estas prácticas en cualquier proyecto de desarrollo.
        </p>

        <Tabs defaultValue="wcag" orientation="horizontal">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wcag">Estándar Global: WCAG</TabsTrigger>
            <TabsTrigger value="colombia">Normativa en Colombia</TabsTrigger>
          </TabsList>

          <TabsContent value="wcag" className="mt-8">
            <Card>
              <CardHeader 
                title="Las Pautas de Accesibilidad para el Contenido Web (WCAG)"
                icon={<Icon icon={Globe} size="lg" className="text-primary-60" />}
              />
              <CardContent>
                <p className="text-gray-900 mb-6">
                  Las WCAG del World Wide Web Consortium (W3C) son el referente técnico a nivel mundial. Estas 
                  directrices sirven como la base para la mayoría de las legislaciones sobre accesibilidad digital 
                  en todo el mundo. Se organizan en tres niveles de conformidad:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-tertiary-10 border border-tertiary-20 rounded-lg p-4">
                    <h4 className="font-bold text-tertiary-90 mb-2">Nivel A (Básico)</h4>
                    <p className="text-gray-900 text-sm">
                      El mínimo indispensable para no excluir a grupos de usuarios.
                    </p>
                  </div>
                  
                  <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                    <h4 className="font-bold text-secondary-90 mb-2">Nivel AA (Recomendado)</h4>
                    <p className="text-gray-900 text-sm">
                      El estándar objetivo para la mayoría de las organizaciones y el nivel exigido por muchas 
                      legislaciones, ya que elimina las barreras más comunes.
                    </p>
                  </div>
                  
                  <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                    <h4 className="font-bold text-primary-90 mb-2">Nivel AAA (Óptimo)</h4>
                    <p className="text-gray-900 text-sm">
                      El nivel más alto de accesibilidad, recomendado para sitios web con audiencias especializadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colombia" className="mt-8">
            <Card>
              <CardHeader 
                title="Marco Legal en Colombia"
                icon={<Icon icon={Scale} size="lg" className="text-secondary-60" />}
              />
              <CardContent>
                <p className="text-gray-900 mb-6">
                  En Colombia, la accesibilidad digital es un derecho y una obligación legal, especialmente para las 
                  entidades públicas, pero sus principios son aplicables a todo el sector tecnológico.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-50 pl-4">
                    <h4 className="font-semibold text-primary-90">Ley 1712 de 2014 (Ley de Transparencia)</h4>
                    <p className="text-gray-900 text-sm">
                      Establece que la información en poder de las entidades públicas debe ser accesible para toda 
                      la población, sentando una de las bases para la inclusión digital.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary-50 pl-4">
                    <h4 className="font-semibold text-primary-90">Resolución 1519 de 2020 (MinTIC)</h4>
                    <p className="text-gray-900 text-sm">
                      Define los estándares que deben cumplir los sitios web y aplicaciones del Estado, alineándose 
                      directamente con las WCAG 2.1. Exige, como mínimo, el cumplimiento del nivel AA.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary-50 pl-4">
                    <h4 className="font-semibold text-primary-90">Norma Técnica Colombiana (NTC) 5854</h4>
                    <p className="text-gray-900 text-sm">
                      Basada en las WCAG 2.0, proporciona los requisitos técnicos específicos para la accesibilidad 
                      de las páginas web en el país.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary-50 pl-4">
                    <h4 className="font-semibold text-primary-90">Decreto 2106 de 2019</h4>
                    <p className="text-gray-900 text-sm">
                      Refuerza la obligación de aplicar la accesibilidad en todos los trámites y servicios digitales 
                      ofrecidos por el Estado.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 bg-primary-10 border border-primary-20 rounded-lg p-4">
                  <p className="text-gray-900 font-medium text-sm">
                    💡 Este marco legal evidencia que la accesibilidad ha dejado de ser una recomendación para 
                    convertirse en un requisito fundamental en el desarrollo de software.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* 5. Roles en el desarrollo accesible - CARDS */}
      <section>
        <h2 id="roles-desarrollo" className="text-3xl font-bold text-gray-800 mb-6">
          5. Roles en el Desarrollo Accesible
        </h2>
        <p className="text-lg text-gray-900 leading-relaxed mb-8">
          La accesibilidad es un esfuerzo de equipo. Aunque todos comparten la responsabilidad de crear productos 
          inclusivos, cada rol en el ciclo de vida del software tiene un impacto y unas tareas específicas. Integrar 
          la accesibilidad de manera efectiva depende de que cada miembro del equipo conozca y ejecute sus responsabilidades.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Gestión de Proyectos"
              description="Project Manager / Product Owner"
              icon={<Icon icon={Users} size="lg" className="text-secondary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm mb-4">
                El rol de gestión es el principal facilitador de la accesibilidad. Su función es asegurar que la 
                inclusión sea una prioridad estratégica y no una idea de último momento.
              </p>
              <div className="space-y-2 text-sm text-gray-900">
                <p>• Incluir la accesibilidad como requisito no funcional desde el inicio</p>
                <p>• Asegurar que las historias de usuario contemplen necesidades de personas con discapacidad</p>
                <p>• Asignar tiempo y recursos necesarios para tareas de accesibilidad</p>
                <p>• Fomentar una cultura de equipo que valore la inclusión</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Diseño"
              description="UX/UI"
              icon={<Icon icon={Palette} size="lg" className="text-secondary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm mb-4">
                El equipo de diseño sienta las bases de una experiencia accesible. Las decisiones que se toman en esta 
                fase pueden prevenir la mayoría de las barreras de accesibilidad antes de que se escriba una línea de código.
              </p>
              <div className="space-y-2 text-sm text-gray-900">
                <p>• Diseñar paletas de colores que cumplan con ratios de contraste mínimos</p>
                <p>• Elegir tipografías legibles y definir jerarquía visual clara</p>
                <p>• Crear flujos de navegación lógicos y consistentes</p>
                <p>• Anotar comportamiento de componentes y texto alternativo</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Desarrollo"
              description="Frontend / Backend"
              icon={<Icon icon={Code} size="lg" className="text-secondary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm mb-4">
                Los desarrolladores son responsables de traducir el diseño en un producto funcional y robusto que sea 
                compatible con las tecnologías de asistencia.
              </p>
              <div className="space-y-2 text-sm text-gray-900">
                <p>• Utilizar HTML semántico para dar estructura y significado</p>
                <p>• Implementar correctamente los atributos ARIA cuando sea necesario</p>
                <p>• Garantizar que toda la funcionalidad sea operable con teclado</p>
                <p>• Asegurar que mensajes de error sean accesibles</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="h-full">
            <CardHeader
              title="Calidad"
              description="QA Analyst"
              icon={<Icon icon={TestTube} size="lg" className="text-secondary-50" />}
            />
            <CardContent>
              <p className="text-gray-900 text-sm mb-4">
                El analista de calidad verifica que el producto final cumpla con los requisitos de accesibilidad definidos. 
                Su rol es crucial para identificar barreras que pudieron pasarse por alto en fases anteriores.
              </p>
              <div className="space-y-2 text-sm text-gray-900">
                <p>• Integrar pruebas de accesibilidad en el plan de pruebas general</p>
                <p>• Utilizar herramientas de evaluación automática (Axe, Lighthouse)</p>
                <p>• Realizar pruebas manuales exhaustivas con teclado y lectores de pantalla</p>
                <p>• Reportar errores con descripciones claras e impacto en el usuario</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Glosario de términos clave - LISTA CON ICONOS */}
      <section>
        <h2 id="glosario-terminos" className="text-3xl font-bold text-gray-800 mb-6">
          6. Glosario de términos clave
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {glosarioTerminos.map((termino, index) => (
            <div 
              key={index}
              className="flex gap-4 p-4 bg-primary-10 rounded-lg border border-primary-20 hover:border-primary-30 transition-colors"
            >
              <div className="flex-shrink-0">
                <Icon 
                  icon={termino.icon} 
                  size="lg" 
                  className="text-primary-50" 
                />
              </div>
              <div>
                <h3 className="font-semibold text-primary-90 mb-2">
                  {termino.termino}
                </h3>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {termino.definicion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

