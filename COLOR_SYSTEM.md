# Sistema de Colores - Carbon Design System

## 🎨 Paleta de Colores

### 🌈 Teoría del Color Aplicada

Esta paleta está diseñada usando principios de teoría del color para crear armonía visual:

- **Primario (Rosa #C279A2)**: Color principal que establece la identidad del sitio
- **Secundario (Teal #2dd4bf)**: Complementario analógico que proporciona contraste equilibrado
- **Terciario (Dorado #f59e0b)**: Complementario cálido que añade energía y calidez

La combinación rosa-teal-dorado crea una paleta **triádica moderna** que es:
- ✅ **Armoniosa** - Los colores se complementan naturalmente
- ✅ **Accesible** - Contrastes suficientes para WCAG AA
- ✅ **Versátil** - Funciona en contextos diversos
- ✅ **Memorable** - Identidad visual distintiva

### Gama Primaria - Rosa (basada en #C279A2)
```css
--primary-10: #f7f1f5   /* Tono más claro - Fondos, superficies */
--primary-20: #ead3df   /* Tono claro - Fondos hover */
--primary-30: #ddb5c9   /* Tono claro medio - Bordes, divisores */
--primary-40: #d097b3   /* Tono medio claro - Elementos secundarios */
--primary-50: #c279a2   /* COLOR BASE - Elementos principales */
--primary-60: #a8648a   /* Tono medio oscuro - Hover states */
--primary-70: #8e4f71   /* Tono oscuro - Active states, text */
--primary-80: #743a59   /* Tono muy oscuro - Texto sobre fondos claros */
--primary-90: #5a2540   /* Tono extremo - Texto de alto contraste */
--primary-100: #401028  /* Tono máximo - Texto crítico */
```

### Gama Secundaria - Morado Suave (análogo al rosa)
```css
--secondary-10: #f6f3f7
--secondary-20: #e8dfe9
--secondary-30: #d2c2d5
--secondary-40: #bca5c1
--secondary-50: #8b5a8c  /* COLOR BASE */
--secondary-60: #7a4f7b
--secondary-70: #69446a
--secondary-80: #583959
--secondary-90: #472e48
--secondary-100: #362337
```

### Gama Terciaria - Coral Cálido (complementario cálido)
```css
--tertiary-10: #fff5f2
--tertiary-20: #ffe4dc
--tertiary-30: #ffcab7
--tertiary-40: #ffb092
--tertiary-50: #ff8a65   /* COLOR BASE */
--tertiary-60: #e6705a
--tertiary-70: #cc564f
--tertiary-80: #b33c44
--tertiary-90: #992239
--tertiary-100: #80082e
```

## 🔧 Uso en Tailwind CSS

### Clases Disponibles

#### Gama Primaria
```html
<!-- Backgrounds -->
<div class="bg-primary-10">Fondo muy claro</div>
<div class="bg-primary-50">Fondo principal</div>
<div class="bg-primary-90">Fondo muy oscuro</div>

<!-- Texto -->
<p class="text-primary-70">Texto principal</p>
<p class="text-primary-90">Texto de alto contraste</p>

<!-- Bordes -->
<div class="border-primary-30">Borde claro</div>
<div class="border-primary-60">Borde medio</div>
```

#### Gama Secundaria
```html
<div class="bg-secondary-20">Fondo secundario claro</div>
<p class="text-secondary-70">Texto secundario</p>
<button class="bg-secondary-50 hover:bg-secondary-60">Botón secundario</button>
```

#### Gama Terciaria
```html
<div class="bg-tertiary-10">Fondo de apoyo</div>
<p class="text-tertiary-80">Texto de apoyo</p>
<span class="text-tertiary-50">Acento</span>
```

## 📏 Guía de Uso por Intensidad

### Tonos 10-30 (Muy Claros)
- **Uso:** Fondos de página, superficies, estados hover sutiles
- **Accesibilidad:** Ideales para fondos con texto oscuro

### Tonos 40-60 (Medios)
- **Uso:** Elementos interactivos, iconos, bordes
- **Accesibilidad:** Buenos para elementos decorativos y separadores

### Tonos 70-100 (Oscuros)
- **Uso:** Texto principal, elementos de alta importancia
- **Accesibilidad:** Excelente contraste sobre fondos claros

## ♿ Consideraciones de Accesibilidad

### Combinaciones Recomendadas (Contraste 4.5:1+)
```css
/* Texto sobre fondo */
.text-primary-90 + .bg-primary-10   ✅ Excelente contraste
.text-primary-80 + .bg-primary-20   ✅ Buen contraste
.text-primary-70 + .bg-primary-20   ✅ Contraste mínimo WCAG AA

/* Estados interactivos */
.bg-primary-50 + .hover:bg-primary-60   ✅ Clara diferenciación
.bg-secondary-50 + .focus:ring-secondary-70   ✅ Focus visible
```

### Evitar
```css
.text-primary-40 + .bg-primary-10   ❌ Contraste insuficiente
.text-secondary-30 + .bg-secondary-20   ❌ Muy poco contraste
```

## 🚀 Ejemplos de Implementación

### Botón Primario
```html
<button class="bg-primary-50 hover:bg-primary-60 active:bg-primary-70 text-white px-4 py-2 rounded">
  Acción Principal
</button>
```

### Card con Sistema de Colores
```html
<div class="bg-primary-10 border border-primary-30 rounded-lg p-6">
  <h3 class="text-primary-90 font-semibold mb-2">Título</h3>
  <p class="text-primary-70 mb-4">Descripción del contenido</p>
  <button class="bg-secondary-50 hover:bg-secondary-60 text-white px-3 py-1 rounded">
    Acción Secundaria
  </button>
</div>
```

### Estados de Navegación
```html
<nav class="bg-primary-10">
  <a href="#" class="text-primary-70 hover:text-primary-90 hover:bg-primary-20 px-3 py-2">
    Enlace Normal
  </a>
  <a href="#" class="text-primary-90 bg-primary-30 px-3 py-2" aria-current="page">
    Página Actual
  </a>
</nav>
```

---

*Este sistema de colores está diseñado para cumplir con las pautas WCAG 2.1 AA y proporcionar una experiencia visual consistente y accesible.*
