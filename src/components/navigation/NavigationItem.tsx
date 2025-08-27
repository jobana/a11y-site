'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon, type LucideIcon } from '@/components/ui'

interface NavigationItemProps {
  item: {
    id: string
    title: string
    href: string
    icon: string | LucideIcon
  }
  collapsed?: boolean
  level?: number
}

export function NavigationItem({ 
  item, 
  collapsed = false, 
  level = 1 
}: NavigationItemProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href
  
  const baseClasses = `
    flex items-center space-x-3 p-2 rounded-md text-sm transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
    group relative no-underline
  `
  
  const activeClasses = isActive 
    ? 'bg-primary text-white shadow-sm hover:text-white' 
    : 'text-gray-80 hover:bg-primary-20 hover:text-gray-800'
  
  const indentClasses = level > 1 && !collapsed ? 'ml-4' : ''

  return (
    <Link
      href={item.href}
      className={`${baseClasses} ${activeClasses} ${indentClasses}`}
      aria-current={isActive ? 'page' : undefined}
      title={collapsed ? item.title : undefined}
    >
      <span 
        className="text-lg flex-shrink-0" 
        role="img" 
        aria-label={`Icono de ${item.title}`}
      >
        {typeof item.icon === 'string' ? (
          item.icon
        ) : (
          <Icon 
            icon={item.icon} 
            size="sm" 
            className={isActive ? 'text-white' : 'text-gray-80'}
            decorative 
          />
        )}
      </span>
      
      {!collapsed && (
        <span className="font-medium truncate">
          {item.title}
        </span>
      )}
      
      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="
          absolute left-full ml-2 px-2 py-1 
          bg-primary-90 text-white text-xs rounded
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 whitespace-nowrap z-50
        ">
          {item.title}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2">
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900" />
          </div>
        </div>
      )}
    </Link>
  )
}

export default NavigationItem
