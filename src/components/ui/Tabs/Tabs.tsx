'use client'

import React, { createContext, useContext, useState, useRef, forwardRef } from 'react'
import { cn, generateId, keyboardUtils } from '@/lib/utils'

// Context for Tabs
interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  orientation: 'horizontal' | 'vertical'
  activationMode: 'automatic' | 'manual'
}

const TabsContext = createContext<TabsContextValue | null>(null)

const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

// Main Tabs Component
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  activationMode?: 'automatic' | 'manual'
  children: React.ReactNode
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    className,
    value: controlledValue,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    activationMode = 'automatic',
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string>(
      controlledValue || defaultValue || ''
    )

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const contextValue: TabsContextValue = {
      value,
      onValueChange: handleValueChange,
      orientation,
      activationMode,
    }

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'tabs-root',
            orientation === 'vertical' ? 'flex gap-4' : 'space-y-4',
            className
          )}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = 'Tabs'

// Tabs List Component
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabs()
    const listRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const triggers = Array.from(
        listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || []
      ) as HTMLElement[]

      if (triggers.length === 0) return

      const currentIndex = triggers.findIndex(trigger => 
        trigger === document.activeElement
      )

      if (currentIndex === -1) return

      const { ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, HOME, END } = keyboardUtils.KEYS

      let targetIndex = currentIndex

      if (orientation === 'horizontal') {
        if (event.key === ARROW_LEFT) {
          targetIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1
        } else if (event.key === ARROW_RIGHT) {
          targetIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0
        }
      } else {
        if (event.key === ARROW_UP) {
          targetIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1
        } else if (event.key === ARROW_DOWN) {
          targetIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0
        }
      }

      if (event.key === HOME) {
        targetIndex = 0
      } else if (event.key === END) {
        targetIndex = triggers.length - 1
      }

      if (targetIndex !== currentIndex) {
        event.preventDefault()
        triggers[targetIndex].focus()
        
        // Auto-activate if activation mode is automatic
        if (activationMode === 'automatic') {
          triggers[targetIndex].click()
        }
      }
    }

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={cn(
          'tabs-list inline-flex items-center',
          orientation === 'horizontal' 
            ? 'flex-row border-b border-primary-20' 
            : 'flex-col border-r border-primary-20 pr-4',
          className
        )}
        {...props}
      >
        <div ref={listRef} className="contents">
          {children}
        </div>
      </div>
    )
  }
)

TabsList.displayName = 'TabsList'

// Tabs Trigger Component
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, orientation } = useTabs()
    const isSelected = selectedValue === value
    const triggerId = useRef(generateId('tab-trigger'))
    const panelId = useRef(generateId('tab-panel'))

    const handleClick = () => {
      if (!disabled) {
        onValueChange(value)
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
        role="tab"
        type="button"
        disabled={disabled}
        aria-selected={isSelected}
        aria-controls={panelId.current}
        tabIndex={isSelected ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'tabs-trigger relative px-4 py-2 text-sm font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          orientation === 'horizontal' 
            ? 'border-b-2 border-transparent' 
            : 'border-r-2 border-transparent w-full text-left',
          isSelected
            ? cn(
                'text-gray-80',
                orientation === 'horizontal' 
                  ? 'border-primary-50' 
                  : 'border-primary-50 bg-primary-10'
              )
            : 'text-gray-80 hover:text-primary-90 hover:bg-primary-10',
          className
        )}
        data-state={isSelected ? 'active' : 'inactive'}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'

// Tabs Content Component
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue } = useTabs()
    const isSelected = selectedValue === value
    const triggerId = useRef(generateId('tab-trigger'))
    const panelId = useRef(generateId('tab-panel'))

    if (!isSelected) return null

    return (
      <div
        ref={ref}
        id={panelId.current}
        role="tabpanel"
        aria-labelledby={triggerId.current}
        tabIndex={0}
        className={cn(
          'tabs-content focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2',
          'animate-in fade-in-50 duration-200',
          className
        )}
        data-state={isSelected ? 'active' : 'inactive'}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
