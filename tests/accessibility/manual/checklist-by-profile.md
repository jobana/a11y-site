# Manual de Pruebas de Accesibilidad por Perfil de Usuario

Este documento proporciona checklists específicos para validar que el sitio funciona correctamente para cada perfil de usuario definido en el diagrama de clases.

## 🎯 Instrucciones Generales

### Antes de Comenzar
- [ ] Tener disponibles las herramientas de testing
- [ ] Configurar diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Preparar dispositivos de prueba si están disponibles
- [ ] Documentar todos los hallazgos

### Herramientas Requeridas
- **Screen Readers**: NVDA (Windows), VoiceOver (Mac), ORCA (Linux)
- **Simuladores**: Wave, aXe DevTools, Lighthouse
- **Teclado**: Para pruebas de navegación
- **Zoom**: Navegador configurado hasta 200%

---

## 👁️ Usuario con Discapacidad Visual

### Perfil del Usuario
- **Descripción**: Usuario ciego o con visión muy limitada
- **Tecnología Asistiva**: Lector de pantalla (NVDA, JAWS, VoiceOver)
- **Necesidades**: Navegación semántica, contenido descriptivo

### ✅ Checklist de Pruebas Manuales

#### Navegación con Lector de Pantalla
- [ ] **Skip Links**: ¿Se puede saltar al contenido principal?
  - Hacer Tab y verificar que aparece "Saltar al contenido"
  - Presionar Enter y verificar que el foco va al contenido principal
  
- [ ] **Landmarks**: ¿Se pueden navegar los landmarks?
  - Usar comando de landmark del lector de pantalla
  - Verificar: banner, main, navigation, contentinfo

- [ ] **Headings**: ¿La jerarquía de encabezados es lógica?
  - Navegar por encabezados (H en NVDA/JAWS)
  - Verificar: H1 único, no saltos de nivel (H1→H3), contenido descriptivo

- [ ] **Links**: ¿Los enlaces tienen nombres descriptivos?
  - Navegar por enlaces (K en NVDA/JAWS)
  - Verificar: no "click aquí", contexto claro, enlaces externos marcados

#### Contenido Descriptivo
- [ ] **Imágenes**: ¿Todas tienen texto alternativo apropiado?
  - Navegar por gráficos (G en NVDA/JAWS)
  - Verificar: alt text descriptivo, imágenes decorativas con alt=""

- [ ] **Formularios**: ¿Están correctamente etiquetados?
  - Navegar por campos de formulario (F en NVDA/JAWS)
  - Verificar: labels asociados, instrucciones claras, errores descriptivos

- [ ] **Tablas**: ¿Tienen estructura semántica?
  - Navegar por tablas (T en NVDA/JAWS)
  - Verificar: headers apropiados, caption descriptivo

#### Interactividad
- [ ] **Focus Management**: ¿El foco es predecible?
  - Verificar que el foco no se pierde
  - Modal dialogs manejan foco correctamente
  - Contenido dinámico anuncia cambios

- [ ] **Live Regions**: ¿Se anuncian cambios importantes?
  - Verificar alertas se anuncian automáticamente
  - Status updates son percibibles

### 🔧 Comandos de Prueba (NVDA)
```
H - Siguiente encabezado
K - Siguiente enlace  
F - Siguiente campo de formulario
G - Siguiente gráfico
T - Siguiente tabla
; - Siguiente landmark
Insert+F7 - Lista de elementos
```

---

## 🔇 Usuario con Discapacidad Auditiva

### Perfil del Usuario
- **Descripción**: Usuario sordo o con problemas auditivos
- **Tecnología Asistiva**: Subtítulos, transcripciones
- **Necesidades**: Alternativas visuales a contenido sonoro

### ✅ Checklist de Pruebas Manuales

#### Contenido Multimedia
- [ ] **Videos**: ¿Tienen subtítulos sincronizados?
  - Reproducir videos con subtítulos activados
  - Verificar: sincronización, precisión, legibilidad

- [ ] **Audio**: ¿Tienen transcripciones disponibles?
  - Buscar transcripciones para podcasts/audio
  - Verificar: acceso fácil, contenido completo

- [ ] **Controles**: ¿Se pueden controlar subtítulos?
  - Probar activar/desactivar subtítulos
  - Verificar: múltiples idiomas si disponible

#### Alertas Visuales
- [ ] **Notificaciones**: ¿Tienen alternativas visuales?
  - Provocar notificaciones del sistema
  - Verificar: indicadores visuales claros, no solo sonoros

- [ ] **Feedback**: ¿Es visible y no solo auditivo?
  - Probar acciones que generen feedback
  - Verificar: mensajes visuales, estados claros

#### Comunicación
- [ ] **Formularios de Contacto**: ¿Hay alternativas a teléfono?
  - Verificar opciones de contacto por email/chat
  - Formularios claramente etiquetados

### 📝 Aspectos a Documentar
- Calidad de sincronización de subtítulos
- Disponibilidad de transcripciones
- Claridad de indicadores visuales

---

## 🖱️ Usuario con Discapacidad Física

### Perfil del Usuario
- **Descripción**: Usuario con limitaciones motoras
- **Tecnología Asistiva**: Solo teclado, switch devices, head tracking
- **Necesidades**: Navegación por teclado, targets grandes

### ✅ Checklist de Pruebas Manuales

#### Navegación por Teclado
- [ ] **Tab Order**: ¿Es lógico y predecible?
  - Navegar toda la página solo con Tab
  - Verificar: orden visual coincide con tab order

- [ ] **Skip Links**: ¿Permiten navegación eficiente?
  - Usar skip links para saltar secciones
  - Verificar: suficientes opciones de salto

- [ ] **Trap Focus**: ¿Los modals atrapan foco correctamente?
  - Abrir diálogos modales
  - Verificar: foco no escapa del modal

#### Elementos Interactivos
- [ ] **Botones**: ¿Responden a teclado?
  - Probar Enter y Space en todos los botones
  - Verificar: activación correcta

- [ ] **Menús**: ¿Navegables con flechas?
  - Usar menús desplegables con teclado
  - Verificar: flechas funcionan, Escape cierra

- [ ] **Formularios**: ¿Completables solo con teclado?
  - Llenar formularios completos sin mouse
  - Verificar: dropdowns, checkboxes, radio buttons

#### Targets y Timing
- [ ] **Target Size**: ¿Son suficientemente grandes?
  - Medir botones y enlaces (mínimo 44x44px)
  - Verificar: espaciado adecuado entre elementos

- [ ] **Timing**: ¿Hay tiempo suficiente?
  - Probar interacciones que requieren rapidez
  - Verificar: timeouts razonables, extensiones disponibles

### ⌨️ Teclas de Prueba
```
Tab - Siguiente elemento
Shift+Tab - Elemento anterior
Enter - Activar botón/enlace
Space - Activar botón/checkbox
Arrow Keys - Navegación en menús/radio groups
Escape - Cerrar diálogos
```

---

## 🧠 Usuario con Discapacidad Cognitiva

### Perfil del Usuario
- **Descripción**: Usuario con dificultades cognitivas, atención, memoria
- **Necesidades**: Contenido simple, navegación consistente, tiempo adicional

### ✅ Checklist de Pruebas Manuales

#### Claridad de Contenido
- [ ] **Lenguaje**: ¿Es simple y directo?
  - Revisar texto por jerga técnica excesiva
  - Verificar: definiciones para términos complejos

- [ ] **Instrucciones**: ¿Son claras y completas?
  - Seguir instrucciones de formularios/procesos
  - Verificar: pasos numerados, ejemplos claros

- [ ] **Estructura**: ¿Es consistente y predecible?
  - Navegar por diferentes páginas
  - Verificar: navegación en misma ubicación, patrones consistentes

#### Prevención de Errores
- [ ] **Validación**: ¿Previene errores comunes?
  - Intentar enviar formularios con errores
  - Verificar: validación en tiempo real, sugerencias claras

- [ ] **Confirmación**: ¿Se confirman acciones importantes?
  - Probar acciones destructivas (eliminar, etc.)
  - Verificar: diálogos de confirmación claros

#### Tiempo y Movimiento
- [ ] **Timeouts**: ¿Son razonables o extensibles?
  - Dejar formularios abiertos por tiempo prolongado
  - Verificar: advertencias antes de timeout

- [ ] **Animaciones**: ¿Se pueden pausar o deshabilitar?
  - Buscar controles para pausar movimiento
  - Verificar: respeta prefers-reduced-motion

- [ ] **Parpadeos**: ¿Nada parpadea más de 3 veces/segundo?
  - Observar elementos animados
  - Verificar: no efectos de parpadeo rápido

### 📊 Métricas a Evaluar
- Longitud promedio de oraciones
- Uso de palabras complejas
- Consistencia de patrones de navegación
- Tiempo requerido para completar tareas

---

## 👓 Usuario con Baja Visión

### Perfil del Usuario
- **Descripción**: Usuario con visión parcial
- **Tecnología Asistiva**: Magnificación, alto contraste, ajustes de color
- **Necesidades**: Escalabilidad, contraste alto, personalización visual

### ✅ Checklist de Pruebas Manuales

#### Escalabilidad
- [ ] **Zoom 200%**: ¿Funciona sin scroll horizontal?
  - Hacer zoom al 200% en navegador
  - Verificar: no scroll horizontal, contenido legible

- [ ] **Text Size**: ¿Escala apropiadamente?
  - Aumentar tamaño de texto del navegador
  - Verificar: layouts no se rompen, botones siguen siendo clickables

#### Contraste y Color
- [ ] **Contrast Ratio**: ¿Cumple WCAG AA (4.5:1)?
  - Usar herramientas de medición de contraste
  - Verificar: texto normal, texto grande, elementos UI

- [ ] **Color Independence**: ¿Información no depende solo del color?
  - Revisar elementos que usan color para comunicar
  - Verificar: íconos, texto, o patrones adicionales

- [ ] **High Contrast Mode**: ¿Funciona con modo alto contraste del OS?
  - Activar modo alto contraste del sistema
  - Verificar: elementos siguen siendo visibles y funcionales

#### Personalización
- [ ] **Color Customization**: ¿Se pueden ajustar colores?
  - Probar controles de personalización si existen
  - Verificar: cambios se aplican correctamente

- [ ] **Grayscale Mode**: ¿Mantiene funcionalidad en escala de grises?
  - Simular visión en escala de grises
  - Verificar: elementos distinguibles sin color

### 🔍 Herramientas de Prueba
- **Colour Contrast Analyser**
- **Chrome DevTools - Simulate vision deficiencies**
- **Zoom del navegador (hasta 500%)**

---

## 📋 Reporte de Resultados

### Formato de Documentación
Para cada perfil de usuario, documentar:

#### ✅ Elementos que Funcionan Bien
- Descripción específica
- Por qué beneficia al perfil de usuario
- Evidencia (screenshots si aplica)

#### ❌ Problemas Encontrados
- Descripción del problema
- Perfil(es) de usuario afectado(s)
- Severidad (Crítico/Alto/Medio/Bajo)
- Pasos para reproducir
- Sugerencia de solución

#### 🔄 Recomendaciones de Mejora
- Cambios sugeridos
- Prioridad de implementación
- Beneficio esperado

### Template de Reporte
```markdown
## Reporte de Pruebas - [Perfil de Usuario]

**Fecha**: [fecha]
**Probador**: [nombre]
**Herramientas utilizadas**: [lista]

### Resumen Ejecutivo
- Total de elementos probados: X
- Elementos que pasan: X
- Problemas encontrados: X
- Problemas críticos: X

### Detalle de Hallazgos
[Lista detallada de problemas y éxitos]

### Recomendaciones Prioritarias
1. [Recomendación más importante]
2. [Segunda prioridad]
3. [Tercera prioridad]
```

---

## 🎯 Criterios de Éxito

### Niveles de Cumplimiento

#### ✅ Completo (Pasa)
- Todas las funcionalidades accesibles para el perfil
- Experiencia fluida y sin barreras
- Cumple estándares WCAG 2.1 AA

#### ⚠️ Parcial (Necesita Mejoras)
- Funcionalidades principales accesibles
- Algunas barreras menores
- Cumple mayoría de estándares

#### ❌ Insuficiente (No Pasa)
- Barreras significativas para el perfil
- Funcionalidades críticas inaccesibles
- No cumple estándares básicos

### Meta de Calidad
**Objetivo**: 100% de perfiles deben alcanzar nivel "Completo" antes del lanzamiento.

---

*Este checklist debe usarse en conjunto con los tests automatizados para garantizar cobertura completa de accesibilidad.*

