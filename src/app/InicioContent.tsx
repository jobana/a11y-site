'use client'

import React from 'react'
import Link from 'next/link'
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
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

      {/* De la Intención a la Práctica */}
      <section className="py-16 bg-primary-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              De la Intención a la Práctica: Un Pilar de Calidad y Eficiencia
            </h2>
            <p className="text-xl text-gray-80 max-w-4xl mx-auto leading-relaxed">
              En el desarrollo de software actual, la accesibilidad es un factor clave para la excelencia. 
              Sin embargo, a menudo existe una brecha entre la intención de ser inclusivos y la implementación práctica. 
              Esta guía nace para estandarizar el conocimiento y los procesos, asegurando que cualquier equipo pueda 
              construir soluciones digitales accesibles de manera efectiva.
            </p>
          </div>

          {/* Tabs Section - Más Allá del Cumplimiento */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Más Allá del Cumplimiento
            </h3>
            
            <Tabs defaultValue="imperativo" orientation="horizontal">
              <TabsList className="grid w-full grid-cols-2 max-w-2xl mx-auto">
                <TabsTrigger value="imperativo">Un Imperativo Ético y Legal</TabsTrigger>
                <TabsTrigger value="ventaja">Ventaja Competitiva y Operativa</TabsTrigger>
              </TabsList>
              
              <TabsContent value="imperativo" className="mt-8">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader 
                    title="Un Imperativo Ético y Legal"
                    icon={<Icon icon={Scale} size="lg" className="text-primary-60" />}
                  />
                  <CardContent>
                    <p className="text-gray-900 leading-relaxed mb-4">
                      La accesibilidad es un principio fundamental para la inclusión social y un requisito legal 
                      en un número creciente de países. En Colombia, normativas como la <strong>Ley 1618 de 2013</strong> y 
                      la <strong>Resolución 1519 de 2020</strong> establecen un marco claro.
                    </p>
                    <p className="text-gray-900 leading-relaxed">
                      Adoptar esta estrategia asegura que los desarrollos no solo se adhieran a la legislación, 
                      sino que garanticen una experiencia de usuario equitativa para todas las personas, incluidas 
                      aquellas con discapacidad visual, auditiva, motora o cognitiva.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/generalidades">
                      <Button variant="primary" size="sm">
                        Conocer Marco Legal
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="ventaja" className="mt-8">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader 
                    title="Calidad, Eficiencia e Innovación"
                    description="Una Ventaja Competitiva y Operativa"
                    icon={<Icon icon={Zap} size="lg" className="text-secondary-60" />}
                  />
                  <CardContent>
                    <p className="text-gray-900 leading-relaxed mb-4">
                      La consideración tardía de la accesibilidad genera sobrecostos y refactorizaciones innecesarias. 
                      Al integrar la accesibilidad desde las fases tempranas del ciclo de vida (<strong>Shift-Left</strong>), 
                      se optimizan los procesos de desarrollo, se mejora la calidad y usabilidad del producto para todos 
                      los usuarios y se fortalece la competitividad en un mercado global que exige tecnología responsable e inclusiva.
                    </p>
                    <div className="bg-secondary-10 border border-secondary-20 rounded-lg p-4">
                      <p className="text-gray-900 font-medium text-sm">
                        💡 <strong>Shift-Left:</strong> Integrar la accesibilidad desde el inicio reduce hasta un 70% 
                        los costos de corrección comparado con implementarla al final del desarrollo.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/fases">
                      <Button variant="secondary" size="sm">
                        Ver Metodología Shift-Left
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Accesibilidad Integrada */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Accesibilidad Integrada en el Flujo de Trabajo
            </h2>
            <p className="text-xl text-gray-80 max-w-4xl mx-auto leading-relaxed">
              La accesibilidad no es una tarea exclusiva de la fase de pruebas; es una responsabilidad compartida. 
              Esta guía ofrece recursos, checklists y buenas prácticas específicas para cada rol a lo largo de todo 
              el ciclo de desarrollo.
            </p>
          </div>

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
                  <Link href="/fases/planeacion" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Explorar Planeación
                    </Button>
                  </Link>
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
                  <Link href="/fases/diseño" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Explorar Diseño
                    </Button>
                  </Link>
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
                  <Link href="/fases/desarrollo" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Explorar Desarrollo
                    </Button>
                  </Link>
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
                  <Link href="/fases/pruebas" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Explorar Pruebas
                    </Button>
                  </Link>
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
                  <Link href="/fases/despliegue" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Explorar Despliegue
                    </Button>
                  </Link>
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
                <Link href="/generalidades" className="w-full">
                  <Button variant="secondary" size="md" className="w-full bg-tertiary-50 hover:bg-tertiary-60">
                    Ver Generalidades
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Checklists por Perfil */}
            <Card variant="interactive" className="text-center">
              <CardHeader 
                title="Checklists por Perfil"
                icon={<Icon icon={CheckSquare2} size="xl" className="text-tertiary-50" />}
              />
              <CardContent>
                <p className="text-gray-900 text-sm leading-relaxed mb-4">
                  Accede a las listas de verificación rápidas para Diseñadores, Desarrolladores 
                  y Analistas de Calidad.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/autoevaluacion" className="w-full">
                  <Button variant="secondary" size="md" className="w-full bg-tertiary-50 hover:bg-tertiary-60">
                    Ir a Autoevaluación
                  </Button>
                </Link>
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
                <Link href="/accesibilidad-sitio" className="w-full">
                  <Button variant="secondary" size="md" className="w-full bg-tertiary-50 hover:bg-tertiary-60">
                    Ver Declaración
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-primary-10 mb-8 leading-relaxed">
            Empieza con <strong>Generalidades</strong> para entender los conceptos fundamentales, 
            o salta directo a <strong>Planeación</strong> si ya tienes experiencia básica en accesibilidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generalidades">
              <Button variant="primary" size="lg" className="bg-white text-gray-80 hover:bg-primary-10">
                Empezar con Generalidades
              </Button>
            </Link>
            <Link href="/fases/planeacion">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-80">
                Saltar a Planeación
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
