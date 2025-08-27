'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
  asChild?: boolean
}

const buttonVariants = {
  variant: {
    primary: 'bg-primary-60 text-white hover:bg-primary-70 active:bg-primary-80 focus:ring-primary-50',
    secondary: 'bg-secondary-50 text-white hover:bg-secondary-60 active:bg-secondary-70 focus:ring-secondary-50',
    outline: 'border-2 border-primary-50 text-gray-80 bg-transparent hover:bg-primary-10 active:bg-primary-20 focus:ring-primary-50',
    ghost: 'text-gray-80 bg-transparent hover:bg-primary-10 active:bg-primary-20 focus:ring-primary-50',
  },
  size: {
    sm: 'h-8 px-3 text-sm font-medium',
    md: 'h-10 px-4 text-base font-medium',
    lg: 'h-12 px-6 text-lg font-semibold',
  },
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center rounded-lg',
          'font-medium transition-all duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'active:scale-95 transform',
          
          // Variant styles
          buttonVariants.variant[variant],
          
          // Size styles
          buttonVariants.size[size],
          
          // Disabled styles
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          
          // Loading styles
          loading && 'cursor-wait',
          
          className
        )}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              className="w-4 h-4 animate-spin text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        
        {/* Content */}
        <span
          className={cn(
            'flex items-center justify-center gap-2',
            loading && 'opacity-0'
          )}
        >
          {children}
        </span>
        
        {/* Screen reader loading text */}
        {loading && (
          <span className="sr-only">Cargando...</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
