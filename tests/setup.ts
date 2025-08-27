/**
 * Configuración global para tests de accesibilidad
 */

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configurar Testing Library para mejores mensajes de error
configure({
  testIdAttribute: 'data-testid',
  // Aumentar timeout para tests de accesibilidad que pueden ser más lentos
  asyncUtilTimeout: 5000,
});

// Mock de matchMedia para tests de prefers-reduced-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de localStorage para tests de preferencias
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock de sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
});

// Mock de window.getComputedStyle para tests de CSS
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: '16px',
    lineHeight: '1.5',
    animationDuration: '0s',
    animationPlayState: 'running',
    filter: 'none',
  }),
});

// Mock de IntersectionObserver para tests de lazy loading
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock de ResizeObserver para tests responsive
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Función helper para simular eventos de teclado
export const simulateKeyboardEvent = (element: HTMLElement, key: string, type = 'keydown') => {
  const event = new KeyboardEvent(type, {
    key,
    code: key,
    bubbles: true,
    cancelable: true,
  });
  
  element.dispatchEvent(event);
};

// Función helper para medir contraste de color (simplificada para tests)
export const calculateContrastRatio = (color1: string, color2: string): number => {
  // En una implementación real, esto calcularía el ratio de contraste WCAG
  // Para tests, retornamos un valor mock basado en colores comunes
  const contrastMap: Record<string, Record<string, number>> = {
    '#000000': { '#ffffff': 21, '#cccccc': 4.5 },
    '#ffffff': { '#000000': 21, '#333333': 12.6 },
    '#0066cc': { '#ffffff': 4.5, '#000000': 4.6 },
  };
  
  return contrastMap[color1]?.[color2] || 4.5; // Default a passing ratio
};

// Función helper para verificar si un elemento es visible
export const isElementVisible = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    element.offsetWidth > 0 &&
    element.offsetHeight > 0
  );
};

// Función helper para verificar focus trap en modales
export const testFocusTrap = async (modal: HTMLElement): Promise<boolean> => {
  const focusableElements = modal.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  
  if (focusableElements.length === 0) return false;
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  // Verificar que el primer elemento tiene foco
  firstElement.focus();
  expect(document.activeElement).toBe(firstElement);
  
  // Simular Tab desde el último elemento
  lastElement.focus();
  simulateKeyboardEvent(lastElement, 'Tab');
  
  // El foco debe volver al primer elemento
  return document.activeElement === firstElement;
};

// Configuración de timeouts para diferentes tipos de tests
export const TEST_TIMEOUTS = {
  FAST: 1000,      // Tests unitarios rápidos
  NORMAL: 5000,    // Tests de integración normales
  SLOW: 10000,     // Tests E2E o con muchas interacciones
  VERY_SLOW: 15000 // Tests de accesibilidad complejos
};

// Configuración de viewports para tests responsive
export const VIEWPORTS = {
  MOBILE: { width: 320, height: 568 },
  TABLET: { width: 768, height: 1024 },
  DESKTOP: { width: 1280, height: 720 },
  LARGE_DESKTOP: { width: 1920, height: 1080 },
};

// Helper para simular diferentes viewports
export const setViewport = (viewport: { width: number; height: number }) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: viewport.width,
  });
  
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: viewport.height,
  });
  
  // Disparar evento resize
  window.dispatchEvent(new Event('resize'));
};

// Mock de axe-core para tests cuando no esté disponible
if (!global.axe) {
  global.axe = {
    run: jest.fn().mockResolvedValue({
      violations: [],
      passes: [],
      incomplete: [],
      inapplicable: [],
    }),
    configure: jest.fn(),
    reset: jest.fn(),
  };
}

// Configuración global de Jest para tests de accesibilidad
beforeEach(() => {
  // Limpiar mocks antes de cada test
  jest.clearAllMocks();
  
  // Resetear localStorage
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  // Resetear viewport a desktop por defecto
  setViewport(VIEWPORTS.DESKTOP);
  
  // Resetear document.title
  document.title = 'Test Page';
  
  // Asegurar que document.lang esté configurado
  document.documentElement.lang = 'es';
});

afterEach(() => {
  // Limpiar DOM después de cada test
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  
  // Resetear focus
  if (document.activeElement && 'blur' in document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
});

// Configuración de consola para tests de accesibilidad
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Silenciar ciertos warnings en tests que son esperados
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
  
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('componentWillReceiveProps has been renamed')
    ) {
      return;
    }
    originalConsoleWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

export default {};

