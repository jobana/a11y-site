'use client'

import React from 'react'
import { NavigationMenu } from '../navigation/NavigationMenu'
import { SearchBox } from '../ui/SearchBox'

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  return (
    <aside 
      className={`
        fixed left-0 top-0 h-full bg-white border-r border-primary-20 
        transition-all duration-300 ease-in-out z-40
        ${collapsed ? 'w-16' : 'w-72'}
      `}
      role="complementary"
      aria-label="Navegación principal"
    >
      {/* Header del Sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-primary-20">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary-80 rounded-full"></div>
              <div className="w-3 h-3 bg-primary-60 rounded-full"></div>
              <div className="w-3 h-3 bg-primary-40 rounded-full"></div>
            </div>
            <span className="font-semibold text-primary-90 text-sm">
              Guía de Accesibilidad
            </span>
          </div>
        )}
        
        <button
          onClick={onToggle}
          className={`
            p-2 rounded-md hover:bg-primary-10 transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            ${collapsed ? 'mx-auto' : ''}
          `}
          aria-label={collapsed ? 'Expandir navegación' : 'Contraer navegación'}
          aria-expanded={!collapsed}
        >
          <svg 
            className="w-5 h-5 text-gray-80" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>

      {/* Contenido del Sidebar */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Buscador */}
        {!collapsed && (
          <div className="p-4 border-b border-primary-20">
            <SearchBox />
          </div>
        )}

        {/* Navegación Principal */}
        <nav 
          id="navigation"
          className="flex-1 overflow-y-auto py-4 bg-primary-10"
          role="navigation"
          aria-label="Navegación principal del sitio"
        >
          <NavigationMenu collapsed={collapsed} />
        </nav>

        {/* Footer del Sidebar */}
        {!collapsed && (
          <div className="p-4 border-t border-primary-20">
            <div className="text-xs text-gray-900">
              <p>© 2024 Guía de Accesibilidad</p>
              <p>Versión 1.0.0</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
