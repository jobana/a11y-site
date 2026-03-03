'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { SkipLinks } from '@/components/accessibility/SkipLinks'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-white">
      <SkipLinks />
      
      {/* Layout Container */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
        />
        
        {/* Main Content Area */}
        <main 
          id="main-content"
          className={`
            flex-1 min-h-screen overflow-x-clip
            ${sidebarCollapsed ? 'ml-16' : 'ml-72'}
          `}
          aria-label="Contenido principal"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
