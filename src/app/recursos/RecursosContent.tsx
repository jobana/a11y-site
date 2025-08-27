'use client'

import React from 'react'
import Link from 'next/link'
import {
  Card, CardHeader, CardContent,
  Icon,
  Globe,
  FileText,
  Shield,
  Users,
  Code,
  BookOpen,
  CheckCircle
} from '@/components/ui'
import { ExternalLink } from 'lucide-react'

// Datos de los recursos externos
const recursosExternos = [
  {
    categoria: "Estándares Internacionales",
    recursos: [
      {
        nombre: "WCAG 2.1 (Web Content Accessibility Guidelines)",
        descripcion: "Estándares internacionales para la accesibilidad del contenido web. Niveles A, AA y AAA.",
        url: "https://www.w3.org/WAI/WCAG21/quickref/",
        tipo: "Estándar",
        organizacion: "W3C Web Accessibility Initiative",
        icono: Shield,
        nivel: "Fundamental"
      },
      {
        nombre: "Section 508",
        descripcion: "Estándar federal de EE.UU. para la accesibilidad de tecnologías de la información.",
        url: "https://www.section508.gov/",
        tipo: "Estándar",
        organizacion: "U.S. General Services Administration",
        icono: FileText,
        nivel: "Federal"
      },
      {
        nombre: "ACTA Europea de Accesibilidad",
        descripcion: "Directiva europea que establece requisitos de accesibilidad para productos y servicios digitales.",
        url: "https://ec.europa.eu/social/main.jsp?catId=1202&langId=es",
        tipo: "Directiva",
        organizacion: "Unión Europea",
        icono: Globe,
        nivel: "Europeo"
      },
      {
        nombre: "Directrices de Accesibilidad Web - MinTIC Colombia",
        descripcion: "Resolución MinTIC 1519 del 2020. Estándares de accesibilidad AA de WCAG 2.1 para sitios web del gobierno colombiano.",
        url: "https://gobiernodigital.mintic.gov.co/692/articles-160770_Directrices_Accesibilidad_web.pdf",
        tipo: "Resolución",
        organizacion: "Ministerio TIC Colombia",
        icono: FileText,
        nivel: "Nacional"
      }
    ]
  },
  {
    categoria: "Herramientas y Proyectos",
    recursos: [
      {
        nombre: "Ally Project",
        descripcion: "Proyecto de investigación y desarrollo de herramientas de accesibilidad web.",
        url: "https://allyjs.io/",
        tipo: "Herramienta",
        organizacion: "Ally.js",
        icono: Code,
        nivel: "Desarrollo"
      },
      {
        nombre: "Open UI Project",
        descripcion: "Proyecto para estandarizar componentes de interfaz de usuario accesibles.",
        url: "https://open-ui.org/",
        tipo: "Proyecto",
        organizacion: "Open UI Community",
        icono: Users,
        nivel: "Comunitario"
      }
    ]
  },
  {
    categoria: "Recursos de Implementación",
    recursos: [
      {
        nombre: "WAI-ARIA Authoring Practices",
        descripcion: "Guías de implementación para ARIA (Accessible Rich Internet Applications).",
        url: "https://www.w3.org/WAI/ARIA/apg/",
        tipo: "Guía",
        organizacion: "W3C",
        icono: BookOpen,
        nivel: "Técnico"
      },
      {
        nombre: "Web Accessibility Evaluation Tools List",
        descripcion: "Lista completa de herramientas para evaluar la accesibilidad web.",
        url: "https://www.w3.org/WAI/ER/tools/",
        tipo: "Herramientas",
        organizacion: "W3C",
        icono: CheckCircle,
        nivel: "Evaluación"
      }
    ]
  }
]

export function RecursosContent() {
  return (
    <div className="space-y-16">
      
      {/* Introducción */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Recursos de Accesibilidad Web
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Esta colección de recursos externos te ayudará a comprender e implementar 
            estándares de accesibilidad web. Todos los enlaces abren en nuevas pestañas 
            para mantener tu navegación actual.
          </p>
        </div>
      </section>

      {/* Recursos por categoría */}
      {recursosExternos.map((categoria, catIndex) => (
        <section key={catIndex}>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">
            {categoria.categoria}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categoria.recursos.map((recurso, recIndex) => (
              <Card key={recIndex} variant="elevated" className="h-full">
                <CardHeader
                  title={recurso.nombre}
                  description={recurso.descripcion}
                  icon={<Icon icon={recurso.icono} size="lg" className="text-tertiary-50" />}
                />
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-tertiary-10 text-tertiary-80 px-3 py-1 rounded-full text-sm font-medium">
                        {recurso.tipo}
                      </span>
                      <span className="bg-secondary-10 text-secondary-80 px-3 py-1 rounded-full text-sm font-medium">
                        {recurso.nivel}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p><strong>Organización:</strong> {recurso.organizacion}</p>
                    </div>
                    
                    <div className="pt-2">
                      <Link 
                        href={recurso.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary-90 text-primary-10 hover:bg-primary-80 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                      >
                        <Icon icon={ExternalLink} size="sm" />
                        Visitar Recurso
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
