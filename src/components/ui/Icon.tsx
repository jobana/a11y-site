import React from 'react'
import { LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconProps extends LucideProps {
  /**
   * The Lucide icon component to render
   */
  icon: React.ComponentType<LucideProps>
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Icon size preset
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string
  /**
   * Whether the icon is decorative (hides from screen readers)
   */
  decorative?: boolean
}

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

/**
 * Icon component wrapper for Lucide React icons
 * Provides consistent sizing, accessibility, and styling
 */
export function Icon({ 
  icon: IconComponent, 
  className,
  size = 'md',
  decorative = false,
  'aria-label': ariaLabel,
  ...props 
}: IconProps) {
  const iconSize = typeof size === 'string' ? sizeMap[size] : size

  return (
    <IconComponent
      size={iconSize}
      className={cn('flex-shrink-0', className)}
      aria-hidden={decorative}
      aria-label={!decorative ? ariaLabel : undefined}
      role={!decorative ? 'img' : undefined}
      {...props}
    />
  )
}

export default Icon

