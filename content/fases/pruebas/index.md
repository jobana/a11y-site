---
title: "Fase 4: Pruebas - Validación de Accesibilidad"
description: "Pruebas manuales con teclado y lector de pantalla, evaluaciones automáticas, reportes de errores y integración CI/CD."
slug: "pruebas"
date: "2024-01-15"
category: "fases"
phase: 4
icon: "🧪"
author: "Equipo de Accesibilidad"
tags: ["testing", "manual", "automatizado", "lectores-pantalla", "ci-cd"]
toc: true
prev: "/fases/desarrollo"
next: "/fases/despliegue"
---

# 🧪 Fase 4: Pruebas

Valida la accesibilidad con testing manual y automatizado para garantizar una experiencia inclusiva

## Estrategia Integral de Testing

> **Enfoque híbrido:** Las herramientas automatizadas detectan ~30% de los problemas de accesibilidad. El testing manual y con usuarios reales cubre el 70% restante.

### Pirámide de Testing de Accesibilidad
1. **Base: Testing automatizado** - Verificación continua de criterios objetivos
2. **Medio: Testing manual** - Navegación por teclado y verificación manual
3. **Cima: Testing con usuarios** - Validación con personas que usan tecnologías asistivas

### Beneficios de Testing Temprano
- **Reducción de costos** hasta 90% vs correcciones post-lanzamiento
- **Mejor experiencia de usuario** para todos
- **Cumplimiento normativo** garantizado
- **Detección temprana** de patrones problemáticos

## Pruebas Manuales

### Navegación por Teclado

#### Checklist Básico de Teclado
- [ ] **Tab** navega a todos los elementos interactivos
- [ ] **Shift + Tab** navega hacia atrás correctamente
- [ ] **Enter** activa botones y enlaces
- [ ] **Espacio** activa botones y checkboxes
- [ ] **Arrow keys** funcionan en componentes complejos (menús, tabs)
- [ ] **Escape** cierra modales y dropdowns
- [ ] **Home/End** van al inicio/final en listas

#### Testing de Focus
```
Verificaciones paso a paso:

1. Remueve el mouse/trackpad
2. Usa solo Tab para navegar
3. Verifica que el orden es lógico
4. Confirma que el focus es siempre visible
5. Prueba todos los componentes interactivos
6. Verifica que no hay "trampas de teclado"
7. Confirma que se puede salir de cada componente
```

#### Estados de Focus Requeridos
- **Visible:** Contraste 3:1 mínimo con el fondo
- **Consistente:** Mismo estilo en toda la aplicación
- **Claro:** Fácil de identificar el elemento activo
- **Lógico:** Sigue el flujo visual de la página

### Verificación Manual de WCAG

#### Nivel A (Básico)
- [ ] **1.1.1** Imágenes tienen texto alternativo apropiado
- [ ] **1.3.1** Información transmitida por estructura semántica
- [ ] **2.1.1** Toda funcionalidad disponible por teclado
- [ ] **2.4.1** Mecanismo para saltar bloques de contenido
- [ ] **3.1.1** Idioma de la página especificado

#### Nivel AA (Estándar)
- [ ] **1.4.3** Contraste mínimo 4.5:1 (3:1 para texto grande)
- [ ] **1.4.11** Contraste 3:1 para elementos no textuales
- [ ] **2.4.6** Encabezados y etiquetas descriptivos
- [ ] **3.2.3** Navegación consistente
- [ ] **4.1.3** Mensajes de estado comunicados

### Testing de Contenido

#### Formularios
```
Checklist de formularios:

□ Todos los campos tienen etiquetas asociadas
□ Campos requeridos están claramente marcados
□ Instrucciones aparecen antes de los campos
□ Errores son específicos y útiles
□ Grupos relacionados usan fieldset/legend
□ Validación en tiempo real funciona correctamente
□ Formulario se puede completar solo con teclado
```

#### Tablas
```
Verificación de tablas:

□ Caption describe el propósito de la tabla
□ Headers (th) tienen scope apropiado
□ Asociaciones complejas usan headers/id
□ Tablas de layout evitadas (usar CSS Grid/Flexbox)
□ Navegación por celda funciona con lectores de pantalla
```

## Pruebas con Lectores de Pantalla

### Lectores de Pantalla Principales

#### NVDA (Windows) - Gratuito
```
Comandos básicos NVDA:
- Ctrl + Alt + N: Iniciar/detener NVDA
- Insert + Space: Modo de navegación/formulario
- H: Navegar por encabezados
- K: Navegar por enlaces
- B: Navegar por botones
- F: Navegar por campos de formulario
- Insert + F7: Lista de elementos
```

#### JAWS (Windows) - Comercial
```
Comandos básicos JAWS:
- Insert + F6: Lista de encabezados
- Insert + F7: Lista de enlaces
- Insert + F5: Lista de campos de formulario
- Insert + F3: Virtual viewer
- Insert + Z: Quick settings
```

#### VoiceOver (macOS) - Incluido
```
Comandos básicos VoiceOver:
- Cmd + F5: Encender/apagar VoiceOver
- VO + A: Leer todo
- VO + Command + H: Navegar encabezados
- VO + Command + L: Navegar enlaces
- VO + U: Rotor web
```

### Metodología de Testing con SR

#### Preparación
1. **Familiarízate** con el lector de pantalla
2. **Cierra los ojos** o usa una venda
3. **Desactiva el monitor** si es posible
4. **Usa auriculares** para mejor experiencia

#### Escenarios de Prueba
```
Testing básico con lector de pantalla:

1. Navegación general:
   - ¿Se anuncia correctamente el contenido?
   - ¿La navegación es lógica?
   - ¿Se pueden identificar landmarks?

2. Formularios:
   - ¿Se anuncian las etiquetas?
   - ¿Se comunican los errores?
   - ¿Se indica cuando un campo es requerido?

3. Interacciones:
   - ¿Se anuncian los cambios de estado?
   - ¿Los modales se manejan correctamente?
   - ¿Se comunica el progreso de cargas?
```

## Evaluaciones Automáticas

### Herramientas de Testing

#### axe DevTools
```javascript
// Integración en tests automatizados
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function runAxeTest(page) {
  const results = await new AxePuppeteer(page).analyze();
  
  if (results.violations.length > 0) {
    console.log('Violations found:', results.violations);
    return false;
  }
  
  return true;
}

// Ejemplo con Jest
describe('Accessibility Tests', () => {
  test('Homepage should be accessible', async () => {
    await page.goto('http://localhost:3000');
    const isAccessible = await runAxeTest(page);
    expect(isAccessible).toBe(true);
  });
});
```

#### Lighthouse CI
```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      settings: {
        preset: 'desktop'
      }
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'accessibility/color-contrast': 'error',
        'accessibility/keyboard': 'error'
      }
    }
  }
};
```

#### Pa11y
```bash
# Testing básico
pa11y http://localhost:3000

# Con configuración personalizada
pa11y http://localhost:3000 \
  --standard WCAG2AA \
  --reporter json \
  --ignore "warning;notice"

# Testing de múltiples páginas
pa11y-ci --sitemap http://localhost:3000/sitemap.xml
```

### Automatización en CI/CD

#### GitHub Actions
```yaml
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application
      run: npm run build
      
    - name: Start server
      run: npm start &
      
    - name: Wait for server
      run: npx wait-on http://localhost:3000
      
    - name: Run Lighthouse CI
      run: npx @lhci/cli@0.8.x autorun
      
    - name: Run Pa11y tests
      run: npx pa11y-ci --sitemap http://localhost:3000/sitemap.xml
```

#### Jest + axe-core
```javascript
// setupTests.js
import { configureAxe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const axe = configureAxe({
  rules: {
    // Personalizar reglas según necesidades
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true }
  }
});

// Component.test.js
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Component from './Component';

test('Component should be accessible', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Plantillas de Reporte de Errores

### Template de Issue de Accesibilidad

```markdown
## 🔍 Descripción del Problema de Accesibilidad

**Criterio WCAG afectado:** [Ej: 1.4.3 Contraste (Mínimo)]
**Nivel de severidad:** [Crítico/Alto/Medio/Bajo]
**Tecnología asistiva afectada:** [Lector de pantalla/Navegación por teclado/Zoom/etc.]

### Ubicación
- **URL:** 
- **Página/Sección:** 
- **Elemento específico:** 

### Problema Observado
[Descripción clara del problema encontrado]

### Pasos para Reproducir
1. 
2. 
3. 

### Comportamiento Esperado
[Cómo debería funcionar correctamente]

### Impacto en el Usuario
[Cómo afecta este problema a usuarios con discapacidades]

### Evidencia
- [ ] Screenshots adjuntos
- [ ] Video de demostración
- [ ] Reporte de herramienta automatizada

### Información Técnica
- **Navegador:** 
- **Sistema operativo:** 
- **Lector de pantalla:** [Si aplica]
- **Resolución de pantalla:** 

### Solución Sugerida
[Propuesta de cómo corregir el problema]

### Criterios de Aceptación
- [ ] [Criterio específico 1]
- [ ] [Criterio específico 2]
- [ ] Verificado con herramientas automatizadas
- [ ] Probado manualmente con teclado
- [ ] Validado con lector de pantalla
```

### Clasificación de Severidad

#### 🔴 Crítico
- Bloquea completamente el acceso al contenido
- Viola múltiples criterios WCAG AA
- Afecta funcionalidad principal de la aplicación

#### 🟠 Alto
- Dificulta significativamente el uso
- Viola criterios WCAG AA importantes
- Afecta flujos de usuario principales

#### 🟡 Medio
- Causa fricción en la experiencia
- Viola criterios WCAG A o AA menores
- Tiene workarounds disponibles

#### 🟢 Bajo
- Mejora menores de usabilidad
- Viola criterios WCAG AAA
- No bloquea funcionalidad

## Integración en Flujos CI/CD

### Pipeline de Accesibilidad

```yaml
# Ejemplo de pipeline completo
stages:
  - lint
  - test
  - accessibility
  - deploy

accessibility:
  stage: accessibility
  script:
    - npm run build
    - npm run start:ci &
    - wait-on http://localhost:3000
    - npm run test:a11y
    - npm run lighthouse:ci
    - npm run pa11y:ci
  artifacts:
    reports:
      junit: reports/accessibility-junit.xml
    paths:
      - reports/
  only:
    - merge_requests
    - main
```

### Métricas y Monitoreo

#### KPIs de Accesibilidad
- **Puntuación Lighthouse** mínima 90
- **Violaciones axe** máximo 0 críticas
- **Tiempo de resolución** de issues < 48h
- **Cobertura de testing** > 80% de páginas principales

#### Reportes Automáticos
```javascript
// Generador de reporte semanal
const generateA11yReport = async () => {
  const results = {
    lighthouse: await runLighthouseAudit(),
    axe: await runAxeAudit(),
    pa11y: await runPa11yAudit(),
    manual: await getManualTestResults()
  };
  
  const report = {
    date: new Date().toISOString(),
    overall_score: calculateOverallScore(results),
    violations: aggregateViolations(results),
    improvements: trackImprovements(results),
    recommendations: generateRecommendations(results)
  };
  
  await saveReport(report);
  await sendNotification(report);
};
```

---

**Anterior:** [Fase 3: Desarrollo](/fases/desarrollo) | **Siguiente:** [Fase 5: Despliegue](/fases/despliegue)

