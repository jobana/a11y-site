PASO 1: Crear componentes de navegación accesible
Desarrollar MainNavigation.tsx con navegación por teclado completa
Implementar Breadcrumbs.tsx para orientación
Crear SkipLinks.tsx para navegación rápida
PASO 2: Desarrollar componentes UI base
Button.tsx - Botones accesibles con estados focus
Card.tsx - Tarjetas para contenido con landmarks
Heading.tsx - Sistema de encabezados semánticos
Link.tsx - Enlaces accesibles con indicadores externos
PASO 3: Crear layout principal
Actualizar layout.tsx con estructura semántica completa
Integrar navegación principal y skip links
Configurar metadatos SEO y accesibilidad
PASO 4: Desarrollar página de inicio
Reemplazar page.tsx por página de inicio real
Implementar estructura según sitemap del init.md
Usar contenido de inicio.md
PASO 5: Crear páginas dinámicas por categorías
[category]/page.tsx - Para generalidades, recursos, etc.
fases/[fase]/page.tsx - Para las 5 fases del ciclo
documentacion/page.tsx y autoevaluacion/page.tsx
PASO 6: Poblar contenido markdown
Crear archivos .md en cada carpeta de content/
Seguir estructura de metadatos ya definida
Asegurar contenido alineado con sitemap
PASO 7: Implementar herramientas de accesibilidad
Configurar @axe-core/react para testing en desarrollo
Crear componente AccessibilityChecker.tsx
Implementar FocusManager.tsx para gestión de foco
PASO 8: Añadir estilos SASS
Convertir globals.css a SASS
Crear sistema de diseño con variables
Implementar componentes responsive
PASO 9: Testing y validación
Configurar testing con @testing-library/react
Crear tests de accesibilidad
Validar navegación por teclado
PASO 10: Optimizaciones finales
Implementar declaración de accesibilidad
Configurar análisis de performance
Preparar para futura migración a API