import React from 'react'
import { ContentContainer } from './ContentContainer'

interface HomePageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function HomePageLayout({ 
  children, 
  className = '' 
}: HomePageLayoutProps) {
  return (
    <ContentContainer className={className}>
      <main 
        className="flex-1 min-w-0"
        id="main-content"
      >
        {children}
      </main>
    </ContentContainer>
  )
}

export default HomePageLayout

