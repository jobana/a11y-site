---
title: "Fase 2: Diseño - Interfaces Inclusivas"
description: "Principios de diseño inclusivo, contraste, tipografía, prototipos accesibles y wireframes con pautas WCAG."
slug: "diseño"
date: "2024-01-15"
category: "fases"
phase: 2
icon: "🎨"
author: "Equipo de Accesibilidad"
tags: ["diseño", "inclusivo", "contraste", "wireframes", "prototipos"]
toc: true
prev: "/fases/planeacion"
next: "/fases/desarrollo"
---

# 🎨 Fase 2: Diseño

Crea interfaces inclusivas desde la conceptualización visual

## Diseño Inclusivo desde el Inicio

> **Principio clave:** El diseño inclusivo beneficia a todos, no solo a personas con discapapacidades.

Un buen diseño accesible mejora la experiencia de usuario para toda la audiencia, desde personas con discapacidades hasta usuarios en situaciones temporales como luz solar intensa o entornos ruidosos.

### Impacto del Diseño Inclusivo
- **15% de la población mundial** tiene algún tipo de discapacidad
- **Situaciones temporales** afectan a todos (lesiones, fatiga, distracción)
- **Envejecimiento** genera nuevas necesidades de accesibilidad
- **Tecnología diversa** requiere interfaces adaptables

## Principios de Diseño Inclusivo

### 1. 👥 Diversidad de Usuarios

#### Considera diferentes capacidades
- **Visuales:** Ceguera, baja visión, daltonismo, sensibilidad a la luz
- **Auditivas:** Sordera, pérdida auditiva, procesamiento auditivo
- **Motoras:** Movilidad limitada, temblores, falta de miembros
- **Cognitivas:** Dislexia, TDAH, memoria, procesamiento

#### Diseña para diferentes contextos
- **Ambientales:** Luz brillante, ruido, movimiento
- **Tecnológicos:** Pantallas pequeñas, conexión lenta, dispositivos antiguos
- **Situacionales:** Multitarea, estrés, prisa, cansancio

### 2. 🔧 Flexibilidad en el Diseño

#### Múltiples formas de interacción
- **Teclado y mouse** como alternativas equivalentes
- **Gestos y voz** para interfaces móviles
- **Toque y hover** con comportamientos consistentes
- **Alternativas textuales** para contenido visual

#### Personalización y adaptabilidad
- **Zoom y ampliación** hasta 200% sin pérdida de funcionalidad
- **Preferencias de usuario** para movimiento, sonido, contraste
- **Temas claros y oscuros** con transiciones suaves
- **Tamaños de fuente** escalables

### 3. 🎯 Simplicidad y Claridad

#### Jerarquía visual clara
- **Encabezados bien estructurados** (H1, H2, H3...)
- **Espaciado consistente** entre elementos
- **Agrupación lógica** de contenido relacionado
- **Flujo visual intuitivo** de izquierda a derecha, arriba a abajo

#### Contenido comprensible
- **Lenguaje claro y simple** apropiado para la audiencia
- **Iconos universales** con etiquetas textuales
- **Instrucciones paso a paso** para procesos complejos
- **Feedback inmediato** para acciones del usuario

## Contraste, Colores y Tipografía

### Requisitos de Contraste WCAG

#### Niveles de cumplimiento
- **4.5:1** - Texto normal Nivel AA (requerido)
- **3:1** - Texto grande (18pt+ o 14pt+ bold) Nivel AA
- **7:1** - Texto normal Nivel AAA (recomendado)
- **3:1** - Elementos no textuales (iconos, bordes)

#### Herramientas de verificación
- **WebAIM Contrast Checker** - Verificación rápida
- **Colour Contrast Analyser** - Aplicación desktop
- **Stark (Figma/Sketch)** - Plugin para herramientas de diseño
- **Chrome DevTools** - Auditoría integrada

### Errores Comunes de Contraste

#### ❌ Evitar
- Texto gris claro (#999) sobre fondo blanco
- Links que solo se diferencian por color
- Placeholders con contraste insuficiente
- Botones sin estado de foco visible
- Iconos sin contraste adecuado

#### ✅ Implementar
- Texto oscuro (#333) sobre fondos claros
- Múltiples indicadores para estados (color + forma + texto)
- Placeholders con contraste 4.5:1 mínimo
- Focus rings con contraste 3:1 vs fondo
- Iconos con stroke o fill suficientemente contrastante

### Tipografía Accesible

#### Mejores prácticas
- **Tamaño base:** 16px mínimo (1rem)
- **Interlineado:** 1.5 (150%) para texto corrido
- **Espaciado:** Párrafos con margen 0.75em mínimo
- **Longitud de línea:** 45-75 caracteres máximo
- **Alineación:** Izquierda preferida, evitar justificación completa

#### Selección de fuentes
- **Sans-serif** para pantallas (Arial, Helvetica, system fonts)
- **Serif** para texto impreso o largo
- **Evitar fuentes decorativas** para texto de interfaz
- **Web fonts optimizadas** con fallbacks del sistema
- **Variable fonts** para mejor control de peso y espaciado

## Prototipos y Wireframes Accesibles

### Elementos Esenciales en Wireframes

#### 🔗 Skip Links
- Enlace "Saltar al contenido principal"
- Enlaces a secciones principales de la página
- Visible al recibir foco, oculto visualmente por defecto
- Posicionados al inicio del orden de tabulación

#### 📱 Jerarquía de Encabezados
- H1 único por página (título principal)
- H2 para secciones principales
- H3, H4, H5, H6 para subsecciones
- No saltar niveles (H1 → H3 sin H2)
- Estructura lógica independiente del estilo visual

#### 🎯 Estados de Focus
- Indicador visible para todos los elementos interactivos
- Contraste mínimo 3:1 con el fondo
- Consistente en toda la aplicación
- Visible tanto en navegación por teclado como por mouse
- No removido con `outline: none` sin alternativa

#### ⚠️ Mensajes de Error y Feedback
- Posición consistente cerca del campo relacionado
- Contraste suficiente (colores + iconos + texto)
- Descripción específica del problema
- Sugerencias de corrección cuando sea posible
- Anunciado por lectores de pantalla

### Herramientas para Diseño Accesible

#### Figma
- **Plugin A11y - Annotations:** Documentar requisitos de accesibilidad
- **Stark:** Verificación de contraste en tiempo real
- **Color Oracle:** Simulación de daltonismo
- **Focus Orderer:** Definir orden de tabulación

#### Adobe XD
- **Accessibility checker integrado** en versiones recientes
- **Voice prototyping** para interfaces de voz
- **Responsive resize** para testing en diferentes tamaños

#### Sketch
- **Stark plugin:** Análisis de contraste y simulación
- **Figma mirror:** Testing en dispositivos reales
- **Symbol libraries:** Componentes accesibles reutilizables

## Checklist de Diseño Accesible

### 🎨 Visual y Layout

#### Contraste y Color
- [ ] Contraste 4.5:1 mínimo para texto normal
- [ ] Contraste 3:1 mínimo para texto grande
- [ ] Información no dependiente únicamente del color
- [ ] Estados hover/focus claramente diferenciados
- [ ] Paleta funciona para usuarios daltónicos

#### Espaciado y Tamaños
- [ ] Targets táctiles mínimo 44px × 44px
- [ ] Espaciado suficiente entre elementos clicables
- [ ] Márgenes consistentes en toda la aplicación
- [ ] Diseño funciona con zoom 200%
- [ ] Texto base mínimo 16px

#### Jerarquía y Estructura
- [ ] Estructura de encabezados lógica (H1-H6)
- [ ] Flujo visual claro y predecible
- [ ] Agrupación visual de elementos relacionados
- [ ] Landmarks semánticos claramente definidos
- [ ] Breadcrumbs para navegación compleja

### 🔧 Interacción y Navegación

#### Navegación por Teclado
- [ ] Orden de tabulación lógico e intuitivo
- [ ] Skip links para navegación rápida
- [ ] Estados de focus visiblemente claros
- [ ] Todas las funciones accesibles por teclado
- [ ] Traps de foco para modales/dropdowns

#### Feedback y Estados
- [ ] Estados loading/disabled claramente indicados
- [ ] Mensajes de error específicos y útiles
- [ ] Confirmaciones para acciones destructivas
- [ ] Progress indicators para procesos largos
- [ ] Breadcrumbs actualizados dinámicamente

#### Formularios
- [ ] Labels asociados a todos los campos
- [ ] Campos requeridos claramente marcados
- [ ] Agrupación lógica con fieldsets/legends
- [ ] Instrucciones claras antes de los campos
- [ ] Validación inline con mensajes descriptivos

### 🌐 Contenido y Media

#### Imágenes y Media
- [ ] Texto alternativo para todas las imágenes
- [ ] Imágenes decorativas marcadas como tal
- [ ] Controles de video/audio accesibles
- [ ] Transcripciones para contenido de audio
- [ ] Subtítulos para contenido de video

#### Texto y Lenguaje
- [ ] Lenguaje claro y apropiado para la audiencia
- [ ] Definiciones para jerga técnica
- [ ] Estructura de párrafos clara
- [ ] Enlaces descriptivos (no "clic aquí")
- [ ] Idioma de la página declarado

## Plantillas y Recursos

### 📄 Kit de Wireframes Accesibles
**Herramienta:** Figma/Sketch
**Incluye:**
- Componentes base con anotaciones de accesibilidad
- Plantillas de páginas comunes
- Biblioteca de iconos accesibles
- Guías de espaciado y contraste

### 📊 Guía de Contraste y Color
**Formato:** PDF + Herramienta online
**Contenido:**
- Paletas pre-verificadas WCAG
- Calculadora de contraste interactiva
- Ejemplos de combinaciones exitosas
- Simuladores de daltonismo

### ✅ Checklist Interactivo de Diseño
**Formato:** Web app
**Características:**
- Lista verificable por proyecto
- Progreso guardado automáticamente
- Exportación de reportes
- Integración con herramientas de diseño

---

**Anterior:** [Fase 1: Planeación](/fases/planeacion) | **Siguiente:** [Fase 3: Desarrollo](/fases/desarrollo)

