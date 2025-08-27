'use client'

import React, { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Card Base Component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive'
  children: React.ReactNode
  href?: string
  asChild?: boolean
}

const cardVariants = {
  variant: {
    default: 'bg-white border border-primary-20 shadow-sm',
    elevated: 'bg-white border border-primary-20 shadow-md hover:shadow-lg',
    interactive: 'bg-white border border-primary-20 shadow-sm hover:shadow-md hover:border-primary-30 cursor-pointer transition-all duration-200',
  },
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, href, onClick, ...props }, ref) => {
    const baseClasses = cn(
      'rounded-lg overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-50 focus-within:ring-offset-2',
      cardVariants.variant[variant],
      className
    )

    // Si tiene href, usar Link
    if (href) {
      return (
        <Link
          href={href}
          className={cn(baseClasses, 'block focus:outline-none')}
          {...(props as any)}
        >
          <div ref={ref}>
            {children}
          </div>
        </Link>
      )
    }

    // Si tiene onClick, usar button
    if (onClick) {
      return (
        <button
          ref={ref as any}
          onClick={onClick}
          className={cn(baseClasses, 'w-full text-left focus:outline-none flex flex-col justify-between')}
          {...props}
        >
          {children}
        </button>
      )
    }

    // Card normal
    return (
      <div
        ref={ref}
        className={cn(baseClasses, 'flex flex-col justify-between')}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: React.ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, icon, titleLevel = 'h3', children, ...props }, ref) => {
    const TitleTag = titleLevel

    return (
      <div
        ref={ref}
        className={cn('p-6 pb-3', className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <div 
              className="flex-shrink-0 mt-1 text-primary-60"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <TitleTag className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
              {title}
            </TitleTag>
            {description && (
              <p className="text-sm text-gray-900 line-clamp-3">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 pb-3', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 py-4 bg-primary-10 border-t border-primary-10', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

// Card Image Component
export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: 'square' | 'video' | 'wide'
}

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'video', ...props }, ref) => {
    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[16/9]',
    }

    return (
      <div className={cn('relative overflow-hidden', aspectClasses[aspectRatio])}>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn('w-full h-full object-cover', className)}
          loading="lazy"
          {...props}
        />
      </div>
    )
  }
)

CardImage.displayName = 'CardImage'

export { Card, CardHeader, CardContent, CardFooter, CardImage }
