# Plan de Componentes UI - Sistema de Diseño Accesible

## 🎯 Objetivo
Crear una librería de componentes reutilizables que sigan el sistema de colores Carbon implementado, con un enfoque prioritario en accesibilidad WCAG 2.1 AA.

## 🎨 Sistema de Diseño Base
- **Colores:** Sistema Carbon con 3 gamas (primary, secondary, tertiary) en escalas 10-100
- **Tipografía:** Inter con pesos 300-700
- **Espaciado:** Basado en Tailwind con variables CSS personalizadas
- **Accesibilidad:** WCAG 2.1 AA como estándar mínimo

## 📦 Componentes a Implementar

### 1. 🔘 Button Component
**Ubicación:** `src/components/ui/Button.tsx`

#### Variantes:
- **Primary:** Fondo primary-50, hover primary-60, active primary-70
- **Secondary:** Borde secondary-50, texto secondary-70, hover secondary-10
- **Disabled:** Colores gray-300/gray-500, cursor not-allowed

#### Tamaños:
- **Small:** px-3 py-1.5, text-sm
- **Medium:** px-4 py-2, text-base (default)
- **Large:** px-6 py-3, text-lg

#### Estados de Accesibilidad:
- ✅ Focus ring visible (ring-2 ring-offset-2)
- ✅ Estados hover/active/disabled
- ✅ Soporte para screen readers
- ✅ Loading state con spinner
- ✅ Navegación por teclado completa

#### Props Interface:
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}
```

---

### 2. 🃏 Card Component
**Ubicación:** `src/components/ui/Card.tsx`

#### Variantes:
- **Default:** Fondo white, borde gray-200, shadow-sm
- **Elevated:** shadow-md, hover shadow-lg
- **Interactive:** Hover states, cursor pointer
- **With Icon:** Espacio para icono en header

#### Elementos:
- **CardHeader:** Título, descripción, icono opcional
- **CardContent:** Contenido principal
- **CardFooter:** Acciones, metadatos
- **CardImage:** Imagen opcional en top

#### Accesibilidad:
- ✅ Estructura semántica correcta
- ✅ Focus management para cards interactivas
- ✅ Alt text para imágenes
- ✅ Roles ARIA apropiados
- ✅ Navegación por teclado

#### Props Interface:
```tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'interactive'
  className?: string
  children: React.ReactNode
  onClick?: () => void
  href?: string
}

interface CardHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
}
```

---

### 3. 🪗 Accordion Component
**Ubicación:** `src/components/ui/Accordion.tsx`

#### Características:
- **Multiple:** Múltiples paneles abiertos simultáneamente
- **Single:** Solo un panel abierto a la vez
- **Controlled/Uncontrolled:** Estados manejados externa o internamente
- **Animaciones:** Transiciones suaves de expansión/colapso

#### Accesibilidad (Patrón WAI-ARIA):
- ✅ `role="button"` en triggers
- ✅ `aria-expanded="true/false"`
- ✅ `aria-controls` apuntando al panel
- ✅ `aria-labelledby` en paneles
- ✅ Navegación con flechas arriba/abajo
- ✅ Home/End para primer/último item
- ✅ Focus visible en triggers

#### Props Interface:
```tsx
interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  className?: string
  children: React.ReactNode
}

interface AccordionItemProps {
  value: string
  title: string
  children: React.ReactNode
  disabled?: boolean
}
```

---

### 4. 📑 Tabs Component
**Ubicación:** `src/components/ui/Tabs.tsx`

#### Elementos:
- **TabsList:** Contenedor de pestañas
- **TabsTrigger:** Botón de pestaña individual
- **TabsContent:** Panel de contenido

#### Accesibilidad (Patrón WAI-ARIA):
- ✅ `role="tablist"` en contenedor
- ✅ `role="tab"` en triggers
- ✅ `role="tabpanel"` en contenido
- ✅ `aria-selected="true/false"`
- ✅ `aria-controls` y `aria-labelledby`
- ✅ Navegación con flechas izquierda/derecha
- ✅ Home/End para primera/última pestaña
- ✅ Activación automática o manual

#### Props Interface:
```tsx
interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children: React.ReactNode
}

interface TabsListProps {
  className?: string
  children: React.ReactNode
}

interface TabsTriggerProps {
  value: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}
```

---

## 🚀 Plan de Implementación

### Fase 1: Fundamentos (Semana 1)
1. **✅ Configurar estructura de componentes**
   - Crear directorio `src/components/ui/`
   - Definir tipos TypeScript base
   - Configurar barrel exports

2. **🔘 Implementar Button Component**
   - Crear todas las variantes y tamaños
   - Implementar estados de accesibilidad
   - Testing con React Testing Library + Jest-axe

3. **🃏 Implementar Card Component**
   - Componente base y subcomponentes
   - Variantes visual y funcional
   - Testing de accesibilidad

### Fase 2: Componentes Interactivos (Semana 2)
4. **🪗 Implementar Accordion**
   - Lógica de expansión/colapso
   - Navegación por teclado completa
   - Animaciones CSS suaves

5. **📑 Implementar Tabs**
   - Sistema de pestañas funcional
   - Patrones WAI-ARIA completos
   - Soporte para orientación vertical

### Fase 3: Documentación y Testing (Semana 3)
6. **📚 Crear Documentación**
   - Guías de uso para cada componente
   - Ejemplos de código
   - Patrones de accesibilidad

7. **🎭 Crear Showcase/Storybook**
   - Página de demostración
   - Todos los estados y variantes
   - Playground interactivo

## ♿ Estándares de Accesibilidad

### Contraste de Colores
- **Texto normal:** Mínimo 4.5:1 (WCAG AA)
- **Texto grande:** Mínimo 3:1 (WCAG AA)
- **Elementos interactivos:** Estados focus claramente diferenciados

### Navegación por Teclado
- **Tab:** Navegación secuencial
- **Enter/Space:** Activación de botones
- **Flechas:** Navegación en tabs/accordion
- **Escape:** Cerrar modales/dropdowns
- **Home/End:** Primer/último elemento

### Screen Readers
- **Roles ARIA:** Correctos para cada tipo de componente
- **Labels:** Descriptivos y contextuales
- **States:** aria-expanded, aria-selected, aria-disabled
- **Live Regions:** Para cambios dinámicos

### Focus Management
- **Visible:** Ring de focus con suficiente contraste
- **Lógico:** Orden de navegación intuitivo
- **Trapped:** En modales y menús
- **Restored:** Volver al elemento que abrió un modal

## 🧪 Estrategia de Testing

### Unit Tests (Jest + React Testing Library)
```tsx
describe('Button Component', () => {
  it('should be accessible with keyboard', () => {
    render(<Button>Test</Button>)
    const button = screen.getByRole('button')
    
    // Test keyboard interaction
    fireEvent.keyDown(button, { key: 'Enter' })
    expect(mockClick).toHaveBeenCalled()
  })
})
```

### Accessibility Tests (Jest-axe)
```tsx
it('should not have accessibility violations', async () => {
  const { container } = render(<Button>Test</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Visual Regression Tests
- Estados hover/focus/active
- Diferentes tamaños de viewport
- Dark/light mode si aplica

## 📁 Estructura de Archivos

```
src/components/ui/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   ├── CardHeader.tsx
│   ├── CardContent.tsx
│   ├── CardFooter.tsx
│   ├── Card.test.tsx
│   └── index.ts
├── Accordion/
│   ├── Accordion.tsx
│   ├── AccordionItem.tsx
│   ├── Accordion.test.tsx
│   └── index.ts
├── Tabs/
│   ├── Tabs.tsx
│   ├── TabsList.tsx
│   ├── TabsTrigger.tsx
│   ├── TabsContent.tsx
│   ├── Tabs.test.tsx
│   └── index.ts
└── index.ts (barrel export)
```

## 🎯 Criterios de Aceptación

### Para cada componente:
- ✅ **Funcionalidad:** Cumple todos los requisitos funcionales
- ✅ **Accesibilidad:** Pasa todas las pruebas automáticas de axe
- ✅ **Teclado:** Navegación completa sin mouse
- ✅ **Screen Reader:** Experiencia coherente con NVDA/JAWS
- ✅ **Responsive:** Funciona en todos los tamaños de pantalla
- ✅ **Performance:** No impact negativo en rendering
- ✅ **Testing:** 90%+ cobertura de código
- ✅ **Documentación:** Ejemplos claros de uso

---

*Este plan asegura que tengamos una librería de componentes robusta, accesible y reutilizable que se integre perfectamente con nuestro sistema de diseño Carbon.*

