---
title: "Fase 3: Desarrollo - Código Semántico y Accesible"
description: "HTML semántico, uso correcto de ARIA, patrones de diseño accesibles y componentes reutilizables para frameworks."
slug: "desarrollo"
date: "2024-01-15"
category: "fases"
phase: 3
icon: "💻"
author: "Equipo de Accesibilidad"
tags: ["desarrollo", "html", "aria", "react", "javascript"]
toc: true
prev: "/fases/diseño"
next: "/fases/pruebas"
---

# 💻 Fase 3: Desarrollo

Implementa código semántico y patrones accesibles que funcionen para todos

## Fundamentos del Desarrollo Accesible

> **Principio base:** La accesibilidad se construye con HTML semántico primero, se mejora con CSS y se enriquece con JavaScript.

### La Jerarquía de la Accesibilidad
1. **HTML semántico** - Base sólida y funcional
2. **CSS responsivo** - Presentación adaptable
3. **JavaScript progresivo** - Funcionalidad mejorada
4. **ARIA como puente** - Donde el HTML no es suficiente

### Beneficios del Código Accesible
- **Mejor SEO** - Estructura semántica mejora indexación
- **Mantenibilidad** - Código más claro y documentado
- **Performance** - HTML semántico es más liviano
- **Compatibilidad** - Funciona en más dispositivos y navegadores

## HTML Semántico

### Elementos Estructurales

#### Landmarks Principales
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Título Descriptivo de la Página</title>
</head>
<body>
  <header>
    <nav aria-label="Navegación principal">
      <!-- Menú principal -->
    </nav>
  </header>
  
  <main>
    <h1>Título Principal de la Página</h1>
    <!-- Contenido principal -->
  </main>
  
  <aside aria-label="Contenido relacionado">
    <!-- Sidebar, widgets -->
  </aside>
  
  <footer>
    <!-- Información de cierre -->
  </footer>
</body>
</html>
```

#### Jerarquía de Encabezados
```html
<!-- ✅ Correcto: Jerarquía lógica -->
<h1>Título Principal</h1>
  <h2>Sección Principal</h2>
    <h3>Subsección</h3>
    <h3>Otra Subsección</h3>
  <h2>Otra Sección Principal</h2>

<!-- ❌ Incorrecto: Saltar niveles -->
<h1>Título Principal</h1>
  <h3>Sección</h3> <!-- Falta H2 -->
```

### Formularios Accesibles

#### Labels y Asociaciones
```html
<!-- ✅ Label explícito -->
<label for="email">Correo electrónico (requerido)</label>
<input type="email" id="email" name="email" required 
       aria-describedby="email-help">
<div id="email-help">
  Usaremos tu email solo para contactarte sobre tu pedido
</div>

<!-- ✅ Label implícito -->
<label>
  Contraseña (mínimo 8 caracteres)
  <input type="password" name="password" minlength="8" required>
</label>

<!-- ✅ Fieldset para grupos -->
<fieldset>
  <legend>Método de pago preferido</legend>
  <label>
    <input type="radio" name="payment" value="card">
    Tarjeta de crédito
  </label>
  <label>
    <input type="radio" name="payment" value="paypal">
    PayPal
  </label>
</fieldset>
```

#### Validación y Errores
```html
<!-- Validación en tiempo real -->
<label for="username">Nombre de usuario</label>
<input type="text" id="username" name="username" 
       aria-describedby="username-error username-help"
       aria-invalid="true">

<div id="username-help">
  Entre 3 y 20 caracteres, solo letras y números
</div>

<div id="username-error" role="alert" aria-live="polite">
  El nombre de usuario debe tener al menos 3 caracteres
</div>
```

### Tablas Accesibles

#### Estructura Semántica
```html
<table>
  <caption>Ventas por trimestre 2024</caption>
  <thead>
    <tr>
      <th scope="col">Producto</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Laptops</th>
      <td>150</td>
      <td>200</td>
      <td>180</td>
      <td>530</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>300</td>
      <td>450</td>
      <td>380</td>
      <td>1,130</td>
    </tr>
  </tfoot>
</table>
```

## Uso Correcto de ARIA

### Cuándo Usar ARIA

#### ✅ ARIA es apropiado para:
- **Widgets complejos** no nativos (tabs, carousels, modals)
- **Estados dinámicos** que el HTML no puede expresar
- **Relaciones** entre elementos no obvias
- **Regiones live** que cambian dinámicamente
- **Describir elementos** con información adicional

#### ❌ ARIA NO debe usarse para:
- **Elementos semánticos existentes** (usar `<button>` no `<div role="button">`)
- **Información ya expresada** en HTML nativo
- **Cambiar semántica** de elementos apropiados
- **Reemplazar** estructura HTML correcta

### Patrones ARIA Esenciales

#### Modal Dialog
```html
<!-- Trigger button -->
<button aria-haspopup="dialog" aria-expanded="false" 
        data-target="modal-1">
  Abrir Modal
</button>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" 
     aria-describedby="modal-description" hidden>
  <h2 id="modal-title">Título del Modal</h2>
  <p id="modal-description">Descripción del contenido</p>
  
  <button aria-label="Cerrar modal">×</button>
  
  <!-- Contenido del modal -->
</div>
```

#### Tabs
```html
<div role="tablist" aria-label="Información del producto">
  <button role="tab" aria-selected="true" aria-controls="panel1" 
          id="tab1" tabindex="0">
    Descripción
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" 
          id="tab2" tabindex="-1">
    Especificaciones
  </button>
</div>

<div role="tabpanel" id="panel1" aria-labelledby="tab1" tabindex="0">
  <!-- Contenido de descripción -->
</div>
<div role="tabpanel" id="panel2" aria-labelledby="tab2" 
     tabindex="0" hidden>
  <!-- Contenido de especificaciones -->
</div>
```

#### Live Regions
```html
<!-- Para anuncios importantes -->
<div aria-live="assertive" aria-atomic="true" id="status">
  <!-- Se anuncia inmediatamente -->
</div>

<!-- Para actualizaciones menores -->
<div aria-live="polite" id="updates">
  <!-- Se anuncia cuando el usuario termine su actividad actual -->
</div>

<!-- Para logs o feeds -->
<div aria-live="off" aria-relevant="additions" id="chat-log">
  <!-- Solo se anuncia cuando se agregan nuevos elementos -->
</div>
```

## JavaScript Accesible

### Gestión de Focus

#### Focus Management
```javascript
// Focus trap para modales
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

// Restaurar focus al cerrar modal
let previousFocus;

function openModal(modal) {
  previousFocus = document.activeElement;
  modal.removeAttribute('hidden');
  modal.focus();
  trapFocus(modal);
}

function closeModal(modal) {
  modal.setAttribute('hidden', '');
  if (previousFocus) {
    previousFocus.focus();
  }
}
```

#### Keyboard Navigation
```javascript
// Navegación con arrow keys en menús
function handleMenuNavigation(event) {
  const items = [...event.currentTarget.querySelectorAll('[role="menuitem"]')];
  const currentIndex = items.indexOf(document.activeElement);
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      items[prevIndex].focus();
      break;
      
    case 'Home':
      event.preventDefault();
      items[0].focus();
      break;
      
    case 'End':
      event.preventDefault();
      items[items.length - 1].focus();
      break;
      
    case 'Escape':
      closeMenu();
      break;
  }
}
```

### Actualizaciones Dinámicas

#### Anunciar Cambios
```javascript
// Función para anunciar mensajes
function announceMessage(message, priority = 'polite') {
  const announcer = document.getElementById('aria-announcer');
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;
  
  // Limpiar después de anunciar
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
}

// Ejemplo: Anunciar resultados de búsqueda
function updateSearchResults(results) {
  const container = document.getElementById('search-results');
  container.innerHTML = renderResults(results);
  
  announceMessage(`${results.length} resultados encontrados`);
}

// Ejemplo: Progreso de carga
function updateProgress(percentage) {
  const progressBar = document.getElementById('progress');
  progressBar.setAttribute('aria-valuenow', percentage);
  progressBar.style.width = `${percentage}%`;
  
  if (percentage % 25 === 0) {
    announceMessage(`Progreso: ${percentage}%`);
  }
}
```

## Accesibilidad en Frameworks

### React

#### Componente Button Accesible
```jsx
const Button = ({ 
  children, 
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  ariaLabel,
  ...props 
}) => {
  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {loading && <span aria-hidden="true">⏳</span>}
      {children}
    </button>
  );
};
```

#### Hook para Anuncios
```jsx
const useAnnouncer = () => {
  const [message, setMessage] = useState('');
  
  const announce = useCallback((text, priority = 'polite') => {
    setMessage(''); // Limpiar primero
    setTimeout(() => setMessage(text), 100);
  }, []);
  
  return {
    announce,
    announcer: (
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>
    )
  };
};
```

### Vue.js

#### Directiva para Focus Management
```javascript
// Directiva v-focus-trap
Vue.directive('focus-trap', {
  inserted(el) {
    const focusableElements = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    firstElement.focus();
    
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
});
```

## Snippets Reutilizables

### CSS para Accesibilidad

#### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: inherit;
}
```

#### Focus Styles
```css
:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### JavaScript Utilities

#### Debounced Announcer
```javascript
const createAnnouncer = () => {
  let timeoutId;
  const element = document.createElement('div');
  element.setAttribute('aria-live', 'polite');
  element.setAttribute('aria-atomic', 'true');
  element.className = 'sr-only';
  document.body.appendChild(element);
  
  return {
    announce: (message, delay = 100) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        element.textContent = message;
        setTimeout(() => element.textContent = '', 1000);
      }, delay);
    }
  };
};

const announcer = createAnnouncer();
```

#### Keyboard Navigation Handler
```javascript
const createKeyboardHandler = (element, options = {}) => {
  const {
    selector = '[tabindex], button, input, select, textarea, a[href]',
    circular = true,
    onEscape = null
  } = options;
  
  return (event) => {
    const items = [...element.querySelectorAll(selector)];
    const currentIndex = items.indexOf(document.activeElement);
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = circular 
          ? (currentIndex + 1) % items.length
          : Math.min(currentIndex + 1, items.length - 1);
        items[nextIndex]?.focus();
        break;
        
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = circular
          ? currentIndex === 0 ? items.length - 1 : currentIndex - 1
          : Math.max(currentIndex - 1, 0);
        items[prevIndex]?.focus();
        break;
        
      case 'Home':
        event.preventDefault();
        items[0]?.focus();
        break;
        
      case 'End':
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
        
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
    }
  };
};
```

---

**Anterior:** [Fase 2: Diseño](/fases/diseño) | **Siguiente:** [Fase 4: Pruebas](/fases/pruebas)

