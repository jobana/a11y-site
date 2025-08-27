'use client'

import React from 'react'
import { NavigationSection } from './NavigationSection'
import { NavigationItem } from './NavigationItem'
import { 
  Home, 
  BookOpen, 
  Cycle, 
  ClipboardList, 
  Palette, 
  Laptop, 
  FlaskConical, 
  Rocket,
  Tools,
  FileText,
  Library,
  LifeBuoy,
  Search,
  Mail,
  type LucideIcon 
} from '@/components/ui'

interface NavigationMenuProps {
  collapsed?: boolean
}

// Estructura de navegación basada en el sitemap
const navigationData = [
  {
    id: 'ciclo-desarrollo',
    title: 'Ciclo de desarrollo',
    icon: Cycle,
    items: [
      { id: 'planeacion', title: '1. Planeación', href: '/fases/planeacion', icon: ClipboardList },
      { id: 'diseno', title: '2. Diseño', href: '/fases/diseno', icon: Palette },
      { id: 'desarrollo', title: '3. Desarrollo', href: '/fases/desarrollo', icon: Laptop },
      { id: 'pruebas', title: '4. Pruebas', href: '/fases/pruebas', icon: FlaskConical },
      { id: 'despliegue', title: '5. Despliegue', href: '/fases/despliegue', icon: Rocket }
    ]
  },
  {
    id: 'herramientas',
    title: 'Herramientas',
    icon: Tools,
    items: [
      { id: 'documentacion', title: 'Documentación', href: '/documentacion', icon: FileText },
      { id: 'recursos', title: 'Recursos', href: '/recursos', icon: Library }
    ]
  },
  {
    id: 'soporte',
    title: 'Soporte',
    icon: LifeBuoy,
    items: [
      { id: 'accesibilidad-sitio', title: 'Accesibilidad del sitio', href: '/accesibilidad-sitio', icon: Search },
      { id: 'contacto', title: 'Contacto', href: '/contacto', icon: Mail }
    ]
  }
]

export function NavigationMenu({ collapsed = false }: NavigationMenuProps) {
  return (
    <div className="space-y-2 px-2">
      {/* Elementos individuales */}
      <div className="space-y-1">
        <NavigationItem
          item={{ id: 'inicio', title: 'Inicio', href: '/', icon: Home }}
          collapsed={collapsed}
          level={1}
        />
        <NavigationItem
          item={{ id: 'generalidades', title: 'Generalidades', href: '/generalidades', icon: BookOpen }}
          collapsed={collapsed}
          level={1}
        />
      </div>
      
      {/* Separador visual */}
      {!collapsed && <hr className="border-primary-20 my-3" />}
      
      {/* Secciones agrupadas */}
      {navigationData.map((section) => (
        <NavigationSection
          key={section.id}
          section={section}
          collapsed={collapsed}
        />
      ))}
    </div>
  )
}

export default NavigationMenu
