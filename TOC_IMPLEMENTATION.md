# Implementación del Table of Contents (TOC)

## 📋 Menú de Navegación Interna

El Table of Contents es un componente que aparece en la parte derecha de las páginas de contenido (solo en desktop) y permite navegar rápidamente entre las secciones del contenido.

## 🏗️ Componentes Creados

### 1. `TableOfContents.tsx`
- **Ubicación:** `src/components/navigation/TableOfContents.tsx`
- **Función:** Extrae automáticamente los títulos del contenido HTML y genera enlaces de navegación
- **Características:**
  - ✅ Detección automática de títulos (h1-h6)
  - ✅ Navegación suave con scroll
  - ✅ Indicador de sección activa
  - ✅ Solo visible en desktop (lg+)
  - ✅ Completamente accesible

### 2. `ContentLayout.tsx`
- **Ubicación:** `src/components/layout/ContentLayout.tsx`
- **Función:** Layout wrapper que incluye el TOC automáticamente
- **Características:**
  - ✅ Diseño de dos columnas (contenido + TOC)
  - ✅ Responsive (colapsa TOC en móvil)
  - ✅ Configuración opcional del TOC

## 🚀 Cómo Usar

### Implementación Básica

```tsx
import { ContentLayout } from '@/components/layout/ContentLayout'

export default function MiPagina() {
  const content = await getContentItem('mi-archivo.md')
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-primary-70 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1>{content.metadata.title}</h1>
          <p>{content.metadata.description}</p>
        </div>
      </section>

      {/* Contenido con TOC */}
      <ContentLayout content={content.content} className="py-16">
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
          
          {/* Contenido adicional con títulos */}
          <h2 id="seccion-ejemplo">Sección de Ejemplo</h2>
          <p>Contenido que aparecerá en el TOC...</p>
          
          <h3 id="subseccion">Subsección</h3>
          <p>Más contenido...</p>
        </article>
      </ContentLayout>
    </>
  )
}
```

### Configuración Avanzada

```tsx
// Deshabilitar TOC
<ContentLayout content={content.content} showToc={false}>
  {/* contenido */}
</ContentLayout>

// TOC sin contenido automático (solo títulos manuales)
<ContentLayout content="" showToc={true}>
  <article>
    <h2 id="titulo-1">Título Manual 1</h2>
    <h3 id="titulo-2">Título Manual 2</h3>
  </article>
</ContentLayout>
```

## 🎯 Características de Accesibilidad

### Navegación por Teclado
- **Tab:** Navegar entre enlaces del TOC
- **Enter/Space:** Activar enlace y navegar a sección
- **Focus visible:** Estados de focus claros con ring

### Roles ARIA
```tsx
<aside aria-label="Tabla de contenidos">
  <nav aria-label="Navegación de contenido">
    <ul>
      <li>
        <a href="#seccion" aria-current="location">Sección actual</a>
      </li>
    </ul>
  </nav>
</aside>
```

### Estados Visuales
- **Sección activa:** Color primary-70, fondo primary-10, borde izquierdo
- **Hover:** Fondo primary-10, texto primary-70
- **Focus:** Ring de focus con primary-50

## 📱 Comportamiento Responsive

### Desktop (lg+)
- TOC visible en sidebar derecho
- Ancho fijo de 256px (w-64)
- Sticky positioning

### Tablet y Mobile (< lg)
- TOC completamente oculto
- Contenido ocupa ancho completo
- Sin impacto en rendimiento

## 🔧 Configuración Técnica

### Detección de Títulos
```tsx
// Extrae automáticamente h1-h6 del contenido HTML
const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')

// Genera IDs automáticamente si no existen
if (!id) {
  id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
}
```

### Scroll Spy
```tsx
// Intersection Observer para detectar sección activa
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id)
      }
    })
  },
  {
    rootMargin: '-20% 0% -35% 0%',
    threshold: 0
  }
)
```

### Navegación Suave
```tsx
// Scroll suave sin usar anchor links nativos
onClick={(e) => {
  e.preventDefault()
  const element = document.getElementById(item.id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    // Actualizar URL
    window.history.pushState(null, '', `#${item.id}`)
  }
}}
```

## 🎨 Estilos y Diseño

### Jerarquía Visual
- **H1:** Sin indentación, texto base
- **H2:** Sin indentación, texto base
- **H3:** 12px de indentación
- **H4:** 24px de indentación
- **H5-H6:** 36px+ de indentación

### Colores (Sistema Carbon)
```css
/* Estados normales */
.text-gray-600 .hover:text-gray-900

/* Sección activa */
.text-primary-70 .bg-primary-10 .border-l-2 .border-primary-50

/* Estados hover/focus */
.hover:bg-primary-10 .hover:text-primary-70
.focus:ring-2 .focus:ring-primary-50
```

## 📝 Ejemplos de Implementación

### Página con Contenido Largo
Ver: `src/app/generalidades/page.tsx`

### Página sin TOC
```tsx
<ContentLayout showToc={false}>
  {/* Página simple sin navegación interna */}
</ContentLayout>
```

### TOC Personalizado
```tsx
// Para casos especiales, usar el componente directamente
import { TableOfContents } from '@/components/navigation/TableOfContents'

<div className="flex gap-8">
  <main className="flex-1">
    {/* contenido */}
  </main>
  <aside className="w-64">
    <TableOfContents content={customContent} />
  </aside>
</div>
```

---

*El TOC mejora significativamente la experiencia de usuario en páginas de contenido largo, proporcionando navegación rápida y orientación contextual mientras mantiene los más altos estándares de accesibilidad.*

