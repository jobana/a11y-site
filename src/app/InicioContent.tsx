'use client'

import React from 'react'
import {
  Button, 
  Card, CardHeader, CardContent, CardFooter,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Icon,
  Scale,
  Zap,
  BookOpen,
  CheckSquare2,
  Search,
  Cycle,
  ClipboardList,
  Palette,
  Laptop,
  FlaskConical,
  Rocket
} from '@/components/ui'

export function InicioContent() {
  return (
    <>
      {/* Hero Section - Solo título con fondo de color */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-secondary-70 text-white -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-4xl font-bold leading-tight ">
              Guía de Accesibilidad Web para el Ciclo de Vida del Software
            </h1>
          </div>
        </div>
      </section>

      {/* Descripción fuera del contenedor de color */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-xl sm:text-2xl text-primary-90 max-w-4xl mx-auto leading-relaxed">
              Una guía estratégica para integrar la accesibilidad en cualquier ciclo de vida del software. 
              Este sitio presenta un marco de trabajo para transformar la accesibilidad de una consideración 
              tardía a un componente intrínseco de los procesos de desarrollo, reduciendo reprocesos y 
              construyendo productos digitales de alta calidad.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Cards Section - Las 5 Fases */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
              <Icon icon={Cycle} size="lg" className="text-primary-60" aria-hidden="true" />
              Las 5 Fases del Desarrollo Accesible
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fase 1: Planeación */}
              <Card variant="elevated" className="h-full">
                <CardHeader 
                  title="1. Planeación"
                  icon={<Icon icon={ClipboardList} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    Define requisitos no funcionales de accesibilidad e intégralos en los criterios 
                    de aceptación desde el inicio del proyecto.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button href="/fases/planeacion" variant="primary" size="sm" className="w-full">
                    Explorar Planeación
                  </Button>
                </CardFooter>
              </Card>

              {/* Fase 2: Diseño */}
              <Card variant="elevated" className="h-full">
                <CardHeader 
                  title="2. Diseño (UX/UI)"
                  icon={<Icon icon={Palette} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    Aprende a crear prototipos accesibles, validar contrastes de color y documentar 
                    interacciones para todos los perfiles de usuario.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button href="/fases/diseno" variant="primary" size="sm" className="w-full">
                    Explorar Diseño
                  </Button>
                </CardFooter>
              </Card>

              {/* Fase 3: Desarrollo */}
              <Card variant="elevated" className="h-full">
                <CardHeader 
                  title="3. Desarrollo"
                  icon={<Icon icon={Laptop} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    Implementa código utilizando HTML semántico y los atributos ARIA correctos para 
                    garantizar la compatibilidad con tecnologías de asistencia.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button href="/fases/desarrollo" variant="primary" size="sm" className="w-full">
                    Explorar Desarrollo
                  </Button>
                </CardFooter>
              </Card>

              {/* Fase 4: Pruebas */}
              <Card variant="elevated" className="h-full">
                <CardHeader 
                  title="4. Pruebas (QA)"
                  icon={<Icon icon={FlaskConical} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    Combina herramientas automáticas con pruebas manuales esenciales, incluyendo 
                    navegación completa por teclado y validación con lectores de pantalla.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button href="/fases/pruebas" variant="primary" size="sm" className="w-full">
                    Explorar Pruebas
                  </Button>
                </CardFooter>
              </Card>

              {/* Fase 5: Despliegue */}
              <Card variant="elevated" className="h-full">
                <CardHeader 
                  title="5. Despliegue y Mantenimiento"
                  icon={<Icon icon={Rocket} size="lg" className="text-primary-50" />}
                />
                <CardContent>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    Asegura la sostenibilidad de la accesibilidad en producción a través de un 
                    monitoreo constante y un mantenimiento evolutivo.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button href="/fases/despliegue" variant="primary" size="sm" className="w-full">
                    Explorar Despliegue
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Clave */}
      <section className="py-16 bg-tertiary-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Recursos Clave
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fundamentos Esenciales */}
            <Card variant="interactive" className="text-center">
              <CardHeader 
                title="Fundamentos Esenciales"
                icon={<Icon icon={BookOpen} size="xl" className="text-tertiary-50" />}
              />
              <CardContent>
                <p className="text-gray-900 text-sm leading-relaxed mb-4">
                  Consulta los principios POUR (Perceptible, Operable, Comprensible y Robusto) 
                  y el glosario de términos clave para un entendimiento común.
                </p>
              </CardContent>
              <CardFooter>
                <Button href="/generalidades" variant="secondary" size="md" className="w-full bg-tertiary-50 hover:bg-tertiary-60">
                  Ver Generalidades
                </Button>
              </CardFooter>
            </Card>

            {/* Checklists por Perfil */}
            <Card variant="interactive" className="text-center">
              <CardHeader 
                title="Recursos"
                icon={<Icon icon={CheckSquare2} size="xl" className="text-tertiary-50" />}
              />
              <CardContent>
                <p className="text-gray-900 text-sm leading-relaxed mb-4">
                 Recursos adicionales para profundizar en prácticas de accesibilidad web.
                </p>
              </CardContent>
              <CardFooter>
                <Button href="/autoevaluacion" variant="secondary" size="md" className="w-full bg-tertiary-50 hover:bg-tertiary-60">
                  Ir a Recursos
                </Button>
              </CardFooter>
            </Card>

            {/* Accesibilidad de este Sitio */}
            <Card variant="interactive" className="text-center">
              <CardHeader 
                title="Accesibilidad de este Sitio"
                icon={<Icon icon={Search} size="xl" className="text-tertiary-50" />}
              />
              <CardContent>
                <p className="text-gray-900 text-sm leading-relaxed mb-4">
                  Conoce cómo esta misma plataforma aplica las buenas prácticas que promueve, 
                  sirviendo como un ejemplo de referencia.
                </p>
              </CardContent>
              <CardFooter>
                <Button href="/accesibilidad-sitio" variant="secondary" size="md" className="w-full bg-tertiary-50 hover:bg-tertiary-60">
                  Ver Declaración
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl text-primary-10 mb-8 leading-relaxed">
           Guía de Accesibilidad Web para el Ciclo de Vida del Software
          </p>
          <p>Jobana Garavito - 2026</p>
        </div>
      </section>
    </>
  )
}
