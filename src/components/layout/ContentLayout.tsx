import React from 'react'
import { TableOfContents } from '@/components/navigation/TableOfContents'
import { ContentContainer } from './ContentContainer'

interface ContentLayoutProps {
  children: React.ReactNode
  content?: string
  showToc?: boolean
  className?: string
}

export function ContentLayout({ 
  children, 
  content = '', 
  showToc = true, 
  className = '' 
}: ContentLayoutProps) {
  return (
    <div className="relative">
      <ContentContainer className={className}>
        <div className="flex gap-8">
          {/* Contenido principal */}
          <main 
            className="flex-1 min-w-0"
            id="main-content"
          >
            {children}
          </main>

          {/* Espaciador para el TOC */}
          {showToc && content && (
            <div className="w-64 flex-shrink-0 hidden lg:block"></div>
          )}
        </div>
      </ContentContainer>
      
      {/* Table of Contents - Posicionado de forma absoluta */}
      {showToc && content && (
        <div className="fixed right-4 top-24 w-64 z-10 hidden lg:block">
          <TableOfContents content={content} />
        </div>
      )}
    </div>
  )
}

export default ContentLayout
