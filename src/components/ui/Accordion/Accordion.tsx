'use client'

import React, { createContext, useContext, useState, useRef, useEffect, forwardRef } from 'react'
import { cn, generateId, keyboardUtils } from '@/lib/utils'

// Context for Accordion
interface AccordionContextValue {
  type: 'single' | 'multiple'
  value: string | string[]
  onValueChange: (value: string) => void
  collapsible: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion')
  }
  return context
}

// Main Accordion Component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  collapsible?: boolean
  children: React.ReactNode
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({
    className,
    type = 'single',
    value: controlledValue,
    defaultValue,
    onValueChange,
    collapsible = false,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(() => {
      if (controlledValue !== undefined) return controlledValue
      if (defaultValue !== undefined) return defaultValue
      return type === 'multiple' ? [] : ''
    })

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleValueChange = (itemValue: string) => {
      let newValue: string | string[]

      if (type === 'multiple') {
        const currentArray = Array.isArray(value) ? value : []
        newValue = currentArray.includes(itemValue)
          ? currentArray.filter(v => v !== itemValue)
          : [...currentArray, itemValue]
      } else {
        newValue = value === itemValue && collapsible ? '' : itemValue
      }

      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const contextValue: AccordionContextValue = {
      type,
      value,
      onValueChange: handleValueChange,
      collapsible,
    }

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('space-y-1', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = 'Accordion'

// Accordion Item Component
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const accordion = useAccordion()
    const isOpen = Array.isArray(accordion.value) 
      ? accordion.value.includes(value)
      : accordion.value === value

    return (
      <div
        ref={ref}
        className={cn(
          'border border-primary-20 rounded-lg overflow-hidden',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
              value, 
              disabled, 
              isOpen,
              ...child.props 
            } as any)
          }
          return child
        })}
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

// Accordion Trigger Component
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string
  disabled?: boolean
  isOpen?: boolean
  children: React.ReactNode
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, value = '', disabled = false, isOpen = false, children, ...props }, ref) => {
    const accordion = useAccordion()
    const triggerId = useRef(generateId('accordion-trigger'))
    const contentId = useRef(generateId('accordion-content'))

    const handleClick = () => {
      if (!disabled) {
        accordion.onValueChange(value)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const { ENTER, SPACE } = keyboardUtils.KEYS
      
      if (event.key === ENTER || event.key === SPACE) {
        event.preventDefault()
        handleClick()
      }
    }

    return (
      <button
        ref={ref}
        id={triggerId.current}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId.current}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full flex items-center justify-between p-4 text-left',
          'font-medium text-gray-800 hover:bg-primary-10',
          'focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-inset',
          'transition-colors duration-200',
          disabled && 'cursor-not-allowed',
          className
        )}
        {...props}
      >
        <span className="flex-1 pr-4">{children}</span>
        <svg
          className={cn(
            'w-5 h-5 text-primary-50 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )
  }
)

AccordionTrigger.displayName = 'AccordionTrigger'

// Accordion Content Component
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  isOpen?: boolean
  children: React.ReactNode
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, value = '', isOpen = false, children, ...props }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0)
    const triggerId = useRef(generateId('accordion-trigger'))
    const contentId = useRef(generateId('accordion-content'))

    useEffect(() => {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight
        setHeight(isOpen ? scrollHeight : 0)
      }
    }, [isOpen, children])

    return (
      <div
        ref={ref}
        id={contentId.current}
        role="region"
        aria-labelledby={triggerId.current}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          className
        )}
        style={{
          height: height !== undefined ? `${height}px` : 'auto',
        }}
        {...props}
      >
        <div
          ref={contentRef}
          className="p-4 pt-0 text-gray-900 leading-relaxed"
        >
          {children}
        </div>
      </div>
    )
  }
)

AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
