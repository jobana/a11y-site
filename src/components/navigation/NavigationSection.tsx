'use client'

import React, { useState } from 'react'
import { NavigationItem } from './NavigationItem'
import { Icon, type LucideIcon } from '@/components/ui'

interface NavigationSectionProps {
  section: {
    id: string
    title: string
    icon: string | LucideIcon
    items: Array<{
      id: string
      title: string
      href: string
      icon: string | LucideIcon
    }>
  }
  collapsed?: boolean
}

export function NavigationSection({ section, collapsed = false }: NavigationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpanded = () => {
    if (!collapsed) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className="mb-4">
      {/* Section Header */}
      <button
        onClick={toggleExpanded}
        className={`
          w-full flex items-center justify-between p-2 rounded-md
          text-left text-sm font-medium text-gray-800
          hover:bg-primary-20 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          ${collapsed ? 'justify-center' : ''}
        `}
        aria-expanded={isExpanded}
        aria-controls={`section-${section.id}`}
        aria-label={`${section.title} - ${isExpanded ? 'Contraer' : 'Expandir'} sección`}
      >
        <div className="flex items-center space-x-2">
          <span 
            className="text-lg" 
            role="img" 
            aria-label={`Icono de ${section.title}`}
          >
            {typeof section.icon === 'string' ? (
              section.icon
            ) : (
              <Icon 
                icon={section.icon} 
                size="sm" 
                className="text-gray-80"
                decorative 
              />
            )}
          </span>
          {!collapsed && (
            <span className="font-semibold">{section.title}</span>
          )}
        </div>
        
        {!collapsed && (
          <svg 
            className={`
              w-4 h-4 text-primary-50 transition-transform duration-200
              ${isExpanded ? 'rotate-90' : ''}
            `}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        )}
      </button>

      {/* Section Items */}
      <div 
        id={`section-${section.id}`}
        className={`
          mt-1 space-y-1 transition-all duration-300 ease-in-out
          ${collapsed ? 'block' : (isExpanded ? 'block' : 'hidden')}
        `}
        role="group"
        aria-labelledby={`section-${section.id}-header`}
      >
        {section.items.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            level={2}
          />
        ))}
      </div>
    </div>
  )
}

export default NavigationSection
