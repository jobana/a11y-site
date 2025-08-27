'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card, CardHeader, CardContent, CardFooter,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  ClipboardList,
  TrendingUp,
  Scale,
  CheckSquare2,
  Download,
  Target,
  Users,
  Search,
  Cycle,
  Eye,
  Hand,
  VolumeX,
  Brain,
  ArrowLeft,
  ArrowRight
} from '@/components/ui'

// Datos para historias de usuario
const historiasUsuario = [
  {
    id: "visual",
    titulo: "Usuario con Discapacidad Visual",
    icono: Eye,
    color: "text-primary-50",
    historia: "Como usuario que utiliza un lector de pantalla, quiero que todas las imágenes informativas tengan texto alternativo para poder entender el contenido visual de la página.",
    contexto: "Los lectores de pantalla no pueden interpretar imágenes sin descripción textual. El texto alternativo debe ser descriptivo y contextual, no solo decorativo."
  },
  {
    id: "motriz",
    titulo: "Usuario con Discapacidad Motriz",
    icono: Hand,
    color: "text-secondary-50",
    historia: "Como usuario que navega solo con teclado, quiero poder acceder y activar todos los botones y enlaces para completar mi tarea sin usar un mouse.",
    contexto: "La navegación por teclado debe ser lógica, visible y completa. Todos los elementos interactivos deben ser alcanzables mediante Tab y activables con Enter o Espacio."
  },
  {
    id: "baja-vision",
    titulo: "Usuario con Baja Visión",
    icono: Eye,
    color: "text-tertiary-50",
    historia: "Como usuario con baja visión, quiero poder aumentar el tamaño del texto al 200% sin que se rompa el diseño para poder leer el contenido cómodamente.",
    contexto: "El diseño responsive debe soportar zoom hasta 200% sin pérdida de funcionalidad. Los elementos no deben solaparse ni salirse de la pantalla."
  },
  {
    id: "auditiva",
    titulo: "Usuario con Discapacidad Auditiva",
    icono: VolumeX,
    color: "text-primary-50",
    historia: "Como usuario sordo, quiero que todos los videos tutoriales tengan subtítulos sincronizados para poder entender la información auditiva.",
    contexto: "Los subtítulos deben ser precisos, estar sincronizados y incluir información contextual como efectos de sonido o música relevante."
  }
]

// Datos para buenas prácticas generales
const buenasPracticasGenerales = [
  {
    id: "definir-wcag",
    titulo: "Definir el Nivel WCAG",
    descripcion: "Establecer formalmente el nivel de conformidad (ej. AA) como un criterio de aceptación del proyecto.",
    icono: Scale
  },
  {
    id: "perfiles-usuario",
    titulo: "Identificar Perfiles de Usuario",
    descripcion: "Considerar explícitamente a usuarios con diferentes discapacidades al definir el público objetivo.",
    icono: Users
  },
  {
    id: "historias-usuario",
    titulo: "Integrar en Historias de Usuario",
    descripcion: "Asegurarse de que el backlog incluya historias de usuario que aborden barreras de accesibilidad específicas.",
    icono: CheckSquare2
  },
  {
    id: "asignar-recursos",
    titulo: "Asignar Recursos",
    descripcion: "Planificar el tiempo y el presupuesto necesarios para las tareas de diseño, desarrollo y pruebas de accesibilidad.",
    icono: Target
  },
  {
    id: "fomentar-conciencia",
    titulo: "Fomentar la Conciencia",
    descripcion: "Realizar una breve sesión de inicio (kick-off) sobre accesibilidad para alinear a todo el equipo con los objetivos de inclusión del proyecto.",
    icono: Users
  }
]

// Datos para plantillas descargables
const plantillasDescargables = [
  {
    id: "checklist-requisitos",
    titulo: "Checklist de Requisitos de Planeación",
    descripcion: "Una lista de verificación para que los gerentes de proyecto se aseguren de que todos los puntos de accesibilidad han sido cubiertos en la fase inicial.",
    archivo: "checklist-planeacion.pdf"
  },
  {
    id: "plantilla-historias",
    titulo: "Plantilla de Historias de Usuario Accesibles",
    descripcion: "Un documento con ejemplos de historias de usuario para diferentes perfiles que puede ser adaptado a cualquier proyecto.",
    archivo: "plantilla-historias-usuario.docx"
  }
]

// Datos para las pestañas de buenas prácticas detalladas
const buenasPracticasDetalladas = {
  objetivos: {
    titulo: "Definición de Objetivos",
    icono: Target,
    items: [
      "Objetivos SMART específicos para accesibilidad",
      "Métricas cuantificables de cumplimiento",
      "Timeline realista con buffer para testing",
      "Presupuesto dedicado para herramientas y capacitación"
    ]
  },
  equipo: {
    titulo: "Involucrar al Equipo",
    icono: Users,
    items: [
      "Capacitación básica en accesibilidad para todo el equipo",
      "Roles y responsabilidades claros por persona",
      "Champion de accesibilidad designado por proyecto",
      "Reviews regulares de progreso en accesibilidad"
    ]
  },
  investigacion: {
    titulo: "Investigación de Usuario",
    icono: Search,
    items: [
      "Incluir personas con discapacidades en research",
      "Testing de conceptos con tecnologías asistivas",
      "Feedback continuo durante todo el proceso",
      "Documentar insights específicos por perfil"
    ]
  },
  integracion: {
    titulo: "Integración con Metodologías",
    icono: Cycle,
    items: [
      "Definition of Done incluye criterios de accesibilidad",
      "Sprint planning considera esfuerzo de accesibilidad",
      "Reviews y retrospectivas evalúan progreso inclusivo",
      "Backlog grooming prioriza issues de accesibilidad"
    ]
  }
}

export function PlaneacionNewContent() {
  return (
    <div className="space-y-16">
      
      {/* 1. Principio Shift-Left */}
      <section>
        <h2 id="shift-left" className="text-3xl font-bold text-gray-800 mb-8">
          El Principio Shift-Left: La Estrategia Inteligente
        </h2>
        
        <Card variant="elevated" className="mb-8">
          <CardHeader
            title="¿Qué es Shift-Left?"
            icon={<Icon icon={TrendingUp} size="lg" className="text-primary-50" />}
          />
          <CardContent>
            <p className="text-gray-900 leading-relaxed mb-4">
              En el desarrollo de software, existe un principio clave para la eficiencia y la calidad: 
              <strong> Shift-Left</strong>. Este enfoque consiste en mover las actividades de calidad, 
              como las pruebas y la validación, lo más a la izquierda posible en el ciclo de vida del 
              desarrollo, es decir, a las fases más tempranas.
            </p>
            <p className="text-gray-900 leading-relaxed mb-4">
              La accesibilidad web es un área donde el principio Shift-Left tiene el máximo impacto. 
              Identificar y resolver un problema de accesibilidad en la fase de planeación es 
              drásticamente más rápido y económico que corregirlo después del despliegue.
            </p>
            <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
              <p className="text-gray-900 font-medium text-sm">
                💡 Como muestra el gráfico, el costo de la corrección aumenta exponencialmente con cada fase. 
                La estrategia más inteligente es, por tanto, establecer la accesibilidad como un requisito 
                no funcional (RNF) crítico desde el primer día.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. Requisitos de Accesibilidad */}
      <section>
        <h2 id="requisitos-accesibilidad" className="text-3xl font-bold text-gray-800 mb-8">
          Requisitos de Accesibilidad
        </h2>
        
        <Card variant="elevated" className="border-l-4 border-primary-50">
          <CardHeader
            title="Establecer un Objetivo Claro y Medible"
            icon={<Icon icon={Scale} size="lg" className="text-primary-50" />}
          />
          <CardContent>
            <p className="text-gray-900 leading-relaxed mb-6">
              Establecer la accesibilidad como un requisito formal significa definir un objetivo claro y medible. 
              La práctica estándar de la industria es adoptar un nivel de conformidad de las WCAG como meta. 
              Para la mayoría de los proyectos, el requisito debe ser:
            </p>
            
            <div className="bg-primary-10 border border-primary-30 rounded-lg p-6 mb-6">
              <blockquote className="text-primary-80 font-medium text-lg italic text-center">
                "El producto deberá cumplir con el Nivel AA de las Pautas de Accesibilidad 
                para el Contenido Web (WCAG) 2.1 (o la versión más reciente)."
              </blockquote>
            </div>
            
            <p className="text-gray-900 leading-relaxed">
              Este requisito debe quedar documentado en el alcance del proyecto y ser comunicado a todos 
              los stakeholders. Al hacerlo, la accesibilidad deja de ser una sugerencia para convertirse 
              en una condición contractual del desarrollo.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 3. Historias de Usuario Accesibles */}
      <section>
        <h2 id="historias-usuario" className="text-3xl font-bold text-gray-800 mb-8">
          Historias de Usuario Accesibles
        </h2>
        
        <p className="text-lg text-gray-900 leading-relaxed mb-8">
          Una historia de usuario captura un requisito desde la perspectiva del usuario final. 
          Para que sean efectivas para la accesibilidad, deben reflejar las necesidades de personas 
          con discapacidad. Esto se logra integrando sus contextos y herramientas en la narrativa.
        </p>
        
        <div className="bg-tertiary-10 border border-tertiary-20 rounded-lg p-4 mb-8">
          <p className="text-gray-900 font-medium text-sm">
            <strong>Formato:</strong> "Como &lt;tipo de usuario&gt;, quiero &lt;realizar una acción&gt; 
            para &lt;obtener un beneficio&gt;".
          </p>
        </div>

        <Accordion type="multiple">
          {historiasUsuario.map((historia) => (
            <AccordionItem key={historia.id} value={historia.id}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Icon icon={historia.icono} size="md" className={historia.color} />
                  <span className="font-semibold">{historia.titulo}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="bg-primary-10 border border-primary-20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary-90 mb-2">Historia de Usuario:</h4>
                    <p className="text-primary-80 italic">"{historia.historia}"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Contexto Técnico:</h4>
                    <p className="text-gray-900 text-sm leading-relaxed">{historia.contexto}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 4. Buenas Prácticas para Planificación Inclusiva */}
      <section>
        <h2 id="buenas-practicas" className="text-3xl font-bold text-gray-800 mb-8">
          Buenas Prácticas para una Planificación Inclusiva
        </h2>
        
        <p className="text-lg text-gray-900 leading-relaxed mb-8">
          Para asegurar que la accesibilidad se integre correctamente desde el inicio, 
          el líder del proyecto debe seguir estas prácticas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buenasPracticasGenerales.map((practica) => (
            <Card key={practica.id} variant="elevated" className="h-full">
              <CardHeader
                title={practica.titulo}
                icon={<Icon icon={practica.icono} size="lg" className="text-secondary-50" />}
              />
              <CardContent>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {practica.descripcion}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-gray-900 text-sm font-medium">
                  <Icon icon={CheckSquare2} size="sm" className="mr-2" />
                  Implementado
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Plantillas Descargables - FASE 2: Comentado temporalmente */}
      {/* 
      <section>
        <h2 id="plantillas" className="text-3xl font-bold text-gray-800 mb-8">
          Plantillas Descargables
        </h2>
        
        <p className="text-lg text-gray-900 leading-relaxed mb-8">
          Para facilitar la implementación de estas prácticas, aquí se proporcionan plantillas listas para usar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    // Simulación de descarga
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

      {/* 6. Buenas Prácticas Detalladas */}
      <section>
        <h2 id="buenas-practicas-detalladas" className="text-3xl font-bold text-gray-800 mb-8">
          Buenas Prácticas para Planificación Inclusiva
        </h2>

        <Tabs defaultValue="objetivos" orientation="horizontal">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="objetivos">
              <Icon icon={Target} size="sm" className="mr-2" />
              <span className="hidden sm:inline">Objetivos</span>
            </TabsTrigger>
            <TabsTrigger value="equipo">
              <Icon icon={Users} size="sm" className="mr-2" />
              <span className="hidden sm:inline">Equipo</span>
            </TabsTrigger>
            <TabsTrigger value="investigacion">
              <Icon icon={Search} size="sm" className="mr-2" />
              <span className="hidden sm:inline">Investigación</span>
            </TabsTrigger>
            <TabsTrigger value="integracion">
              <Icon icon={Cycle} size="sm" className="mr-2" />
              <span className="hidden sm:inline">Integración</span>
            </TabsTrigger>
          </TabsList>

          {Object.entries(buenasPracticasDetalladas).map(([key, seccion]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <Card>
                <CardHeader
                  title={seccion.titulo}
                  icon={<Icon icon={seccion.icono} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <ul className="space-y-3">
                    {seccion.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon icon={CheckSquare2} size="sm" className="text-secondary-50 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-900 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* 7. Navegación */}
      <section className="border-t border-primary-20 pt-12">
        <div className="flex justify-between items-center">
          <Link href="/generalidades">
            <Button variant="outline" size="lg">
              <Icon icon={ArrowLeft} size="sm" className="mr-2" />
              Generalidades
            </Button>
          </Link>
          
          <Link href="/fases/diseno">
            <Button variant="primary" size="lg">
              Fase 2: Diseño
              <Icon icon={ArrowRight} size="sm" className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
} 
