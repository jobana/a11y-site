'use client'

import React from 'react'

export function SkipLinks() {
  return (
    <nav 
      className="skip-links" 
      aria-label="Enlaces de navegación rápida"
    >
      <div className="skip-links-container">
        <a 
          href="#main-content" 
          className="skip-link bg-white text-secondary-100 border-secondary-100 hover:bg-secondary-10 hover:text-secondary-90 hover:border-secondary-80"
        >
          Saltar al contenido principal
        </a>
        <a 
          href="#navigation" 
          className="skip-link bg-white text-secondary-100 border-secondary-100 hover:bg-secondary-10 hover:text-secondary-90 hover:border-secondary-80"
        >
          Ir a la navegación
        </a>
        {/* Buscador - TEMPORALMENTE OCULTO */}
        {/*
        <a 
          href="#search" 
          className="skip-link bg-white text-secondary-100 border-secondary-100 hover:bg-secondary-10 hover:text-secondary-90 hover:border-secondary-80"
        >
          Ir al buscador
        </a>
        */}
      </div>
    </nav>
  )
}

export default SkipLinks

