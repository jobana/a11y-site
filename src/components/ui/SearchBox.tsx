'use client'

import React, { useState } from 'react'

interface SearchBoxProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export function SearchBox({ 
  placeholder = "Buscar en la guía", 
  onSearch 
}: SearchBoxProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Buscar contenido">
      <div className="relative">
        <label htmlFor="search-input" className="sr-only">
          Buscar en la guía de accesibilidad
        </label>
        
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-4 py-2 
            border border-gray-300 rounded-md 
            bg-gray-50 text-gray-900 text-sm
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-colors duration-200
          "
          aria-describedby="search-help"
        />
        
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="
              absolute inset-y-0 right-0 pr-3 flex items-center
              text-gray-400 hover:text-gray-600
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              rounded-md
            "
            aria-label="Limpiar búsqueda"
          >
            <svg 
              className="h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
      
      <div id="search-help" className="sr-only">
        Presiona Enter para buscar o usa las flechas del teclado para navegar por los resultados
      </div>
    </form>
  )
}

export default SearchBox

