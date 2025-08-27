import React from 'react'
import { TableOfContents } from '@/components/navigation/TableOfContents'
import { ContentContainer } from './ContentContainer'
import { Icon } from '@/components/ui'
import { LucideIcon } from 'lucide-react'

interface InternalPageLayoutProps {
  children: React.ReactNode
  content?: string
  showToc?: boolean
  className?: string
  // Hero props
  heroIcon?: LucideIcon
  heroTitle: string
  heroDescription: string
  heroBackground?: 'primary' | 'secondary' | 'tertiary'
}

export function InternalPageLayout({ 
  children, 
  content = '', 
  showToc = true, 
  className = '',
  heroIcon,
  heroTitle,
  heroDescription,
  heroBackground = 'primary'
}: InternalPageLayoutProps) {
  
  const getHeroBackgroundClasses = () => {
    switch (heroBackground) {
      case 'secondary':
        return 'bg-gradient-to-r from-secondary-50 to-secondary-70'
      case 'tertiary':
        return 'bg-gradient-to-r from-tertiary-50 to-tertiary-70'
      default:
        return 'bg-gradient-to-r from-primary-50 to-primary-70'
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className={`${getHeroBackgroundClasses()} text-white`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {heroIcon && (
                <Icon 
                  icon={heroIcon} 
                  size="xl" 
                  className="text-6xl block mb-4 mx-auto" 
                  aria-hidden="true" 
                />
              )}
              {heroTitle}
            </h1>
            <p className="text-xl text-primary-10 max-w-4xl mx-auto leading-relaxed">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 gap-8 ${
          showToc && content 
            ? 'xl:grid-cols-[1fr_320px]' 
            : 'xl:grid-cols-1'
        }`}>
          <ContentContainer className={`min-w-0 ${className}`}>
            <main 
              className={`mx-auto ${
                showToc && content 
                  ? 'max-w-4xl' 
                  : 'max-w-6xl'
              }`}
              id="main-content"
            >
              {children}
            </main>
          </ContentContainer>
          
          {/* Table of Contents */}
          {showToc && content && (
            <div className="hidden xl:block">
              <TableOfContents content={content} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default InternalPageLayout

