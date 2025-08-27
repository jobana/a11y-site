/**
 * Environment setup for Jest tests
 * Configura variables de entorno y polyfills necesarios para los tests
 */

// Configurar variables de entorno para testing
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

// Mock de TextEncoder/TextDecoder para Node.js
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock de fetch para tests
global.fetch = jest.fn();

// Mock de URL constructor
global.URL = URL;

// Mock de performance.mark para tests de performance
global.performance = {
  ...global.performance,
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn().mockReturnValue([]),
  getEntriesByType: jest.fn().mockReturnValue([]),
  now: jest.fn().mockReturnValue(Date.now()),
};

// Mock de requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Mock de MutationObserver
global.MutationObserver = class MutationObserver {
  constructor(callback) {
    this.callback = callback;
  }
  
  observe() {
    // Mock implementation
  }
  
  disconnect() {
    // Mock implementation
  }
  
  takeRecords() {
    return [];
  }
};

// Mock de document.createRange para tests que involucran selección de texto
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
  createContextualFragment: (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div;
  },
});

// Mock de HTMLElement.prototype.scrollIntoView
HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock de HTMLElement.prototype.focus
const originalFocus = HTMLElement.prototype.focus;
HTMLElement.prototype.focus = function(options) {
  // Simular el comportamiento de focus para tests
  if (document.activeElement !== this) {
    document.activeElement?.blur?.();
    Object.defineProperty(document, 'activeElement', {
      value: this,
      configurable: true,
    });
  }
  
  // Llamar al focus original si existe
  if (originalFocus) {
    return originalFocus.call(this, options);
  }
};

// Mock de HTMLElement.prototype.blur
const originalBlur = HTMLElement.prototype.blur;
HTMLElement.prototype.blur = function() {
  if (document.activeElement === this) {
    Object.defineProperty(document, 'activeElement', {
      value: document.body,
      configurable: true,
    });
  }
  
  if (originalBlur) {
    return originalBlur.call(this);
  }
};

// Configurar console para capturar warnings de accesibilidad
const originalError = console.error;
const originalWarn = console.warn;

// Almacenar warnings para análisis en tests
global.testWarnings = [];
global.testErrors = [];

console.error = (...args) => {
  global.testErrors.push(args.join(' '));
  
  // Solo mostrar errores que no sean warnings esperados de React/Next.js
  const message = args[0];
  const suppressedMessages = [
    'Warning: ReactDOM.render is deprecated',
    'Warning: componentWillReceiveProps has been renamed',
    'Warning: componentWillMount has been renamed',
  ];
  
  if (!suppressedMessages.some(msg => message?.includes?.(msg))) {
    originalError.apply(console, args);
  }
};

console.warn = (...args) => {
  global.testWarnings.push(args.join(' '));
  
  // Filtrar warnings específicos para tests
  const message = args[0];
  const suppressedMessages = [
    'Warning: Function components cannot be given refs',
    'Warning: Failed prop type',
  ];
  
  if (!suppressedMessages.some(msg => message?.includes?.(msg))) {
    originalWarn.apply(console, args);
  }
};

// Limpiar warnings/errors antes de cada test
beforeEach(() => {
  global.testWarnings = [];
  global.testErrors = [];
});

// Restaurar console después de todos los tests
afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Mock de crypto para tests que requieren generación de IDs
global.crypto = {
  getRandomValues: (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  },
  randomUUID: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
};

// Configurar timezone para tests consistentes
process.env.TZ = 'UTC';

