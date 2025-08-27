'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon, FileText, ChevronUp } from '@/components/ui'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extraer títulos del contenido HTML
  useEffect(() => {
    if (!content) return

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent || ''
      let id = heading.id

      // Si no tiene ID, generar uno
      if (!id) {
        id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
        heading.id = id
      }

      items.push({ id, text, level })
    })

    setTocItems(items)
  }, [content])

  // Detectar qué sección está activa al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [tocItems])

  if (tocItems.length === 0) {
    return null
  }

  return (
    <aside 
      className={`table-of-contents ${className}`}
      aria-label="Tabla de contenidos"
    >
      <div className="bg-white border border-primary-20 rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <Icon icon={FileText} size="sm" className="mr-2 text-primary-50" aria-hidden="true" />
          En esta página
        </h3>
        
        <nav aria-label="Navegación de contenido">
          <ul className="space-y-1 text-sm">
            {tocItems.map((item) => {
              const isActive = activeId === item.id
              const paddingLeft = `${(item.level - 1) * 12}px`
              
              return (
                <li key={item.id} style={{ paddingLeft }}>
                  <Link
                    href={`#${item.id}`}
                    className={`
                      block py-1.5 px-2 rounded transition-colors duration-200 no-underline
                      hover:bg-primary-10 hover:text-gray-80
                      focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-1
                      ${isActive 
                        ? 'text-gray-80 bg-primary-10 border-l-2 border-primary-50 font-medium' 
                        : 'text-gray-80 hover:text-gray-800'
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById(item.id)
                      if (element) {
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        })
                        // Actualizar URL sin hacer scroll adicional
                        window.history.pushState(null, '', `#${item.id}`)
                      }
                    }}
                  >
                    <span className="line-clamp-2">
                      {item.text}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        {/* Enlace para volver arriba */}
        <div className="mt-4 pt-3 border-t border-primary-20">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.pushState(null, '', window.location.pathname)
            }}
            className="
              flex items-center text-xs text-gray-900 hover:text-primary-60
              transition-colors duration-200 focus:outline-none 
              focus:ring-2 focus:ring-primary-50 focus:ring-offset-1 rounded px-2 py-1
            "
          >
            <Icon icon={ChevronUp} size="xs" className="mr-1" aria-hidden="true" />
            Volver arriba
          </button>
        </div>
      </div>
    </aside>
  )
}

export default TableOfContents
