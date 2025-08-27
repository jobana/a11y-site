import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge and deduplicate Tailwind CSS classes
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique ID for accessibility purposes
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

/**
 * Check if an element is visible in the viewport
 */
export function isElementInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Focus management utilities for accessibility
 */
export const focusUtils = {
  /**
   * Focus the first focusable element within a container
   */
  focusFirst: (container: HTMLElement): boolean => {
    const focusableElement = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement
    
    if (focusableElement) {
      focusableElement.focus()
      return true
    }
    return false
  },

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    return Array.from(
      container.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[]
  },

  /**
   * Trap focus within a container (useful for modals)
   */
  trapFocus: (container: HTMLElement, event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return

    const focusableElements = focusUtils.getFocusableElements(container)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }
  }
}

/**
 * Keyboard navigation utilities
 */
export const keyboardUtils = {
  KEYS: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    TAB: 'Tab'
  } as const,

  /**
   * Check if a key press should activate an element
   */
  isActivationKey: (key: string): boolean => {
    return key === keyboardUtils.KEYS.ENTER || key === keyboardUtils.KEYS.SPACE
  },

  /**
   * Navigate through a list of elements with arrow keys
   */
  handleArrowNavigation: (
    event: KeyboardEvent,
    elements: HTMLElement[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' = 'horizontal'
  ): number => {
    const { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, HOME, END } = keyboardUtils.KEYS
    let newIndex = currentIndex

    if (orientation === 'horizontal') {
      if (event.key === ARROW_LEFT) {
        newIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1
      } else if (event.key === ARROW_RIGHT) {
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0
      }
    } else {
      if (event.key === ARROW_UP) {
        newIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1
      } else if (event.key === ARROW_DOWN) {
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0
      }
    }

    if (event.key === HOME) {
      newIndex = 0
    } else if (event.key === END) {
      newIndex = elements.length - 1
    }

    if (newIndex !== currentIndex) {
      event.preventDefault()
      elements[newIndex]?.focus()
    }

    return newIndex
  }
}

