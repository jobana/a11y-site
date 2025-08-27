# 🧪 Plan de Pruebas de Accesibilidad

## Descripción General

Este documento describe el sistema completo de pruebas de accesibilidad basado en el diagrama de clases de usuarios. Las pruebas están diseñadas para validar que el sitio funciona correctamente para cada perfil de discapacidad identificado.

## 📋 Estructura del Plan de Pruebas

### Basado en Diagrama de Clases

Nuestro plan de pruebas mapea directamente cada clase del diagrama a conjuntos específicos de tests:

```
UsuarioConDiscapacidad (Abstract)
├── UsuarioNavegacionAsistida (Abstract)
│   ├── UsuarioDiscapacidadFisica
│   └── UsuarioDiscapacidadVisual
├── UsuarioConApoyoEnContenido (Abstract)
│   ├── UsuarioDiscapacidadCognitiva
│   └── UsuarioDiscapacidadAuditiva
└── UsuarioBajaVision
```

### 📁 Estructura de Archivos

```
tests/
├── accessibility/
│   ├── profiles/                    # Tests por perfil de usuario
│   │   ├── visual-disability.test.ts
│   │   ├── hearing-disability.test.ts
│   │   ├── physical-disability.test.ts
│   │   ├── cognitive-disability.test.ts
│   │   └── low-vision.test.ts
│   ├── integration/                 # Tests de integración
│   │   └── full-user-journey.test.ts
│   └── manual/                      # Checklists manuales
│       └── checklist-by-profile.md
├── setup.ts                         # Configuración global
└── env.setup.js                     # Variables de entorno
```

## 🎯 Tipos de Pruebas

### 1. Tests Automatizados por Perfil

Cada perfil de usuario tiene su propio archivo de tests que valida:

#### **Visual Disability Tests** (`visual-disability.test.ts`)
- ✅ Navegación con lector de pantalla
- ✅ Estructura semántica de contenido
- ✅ Texto alternativo en imágenes
- ✅ Gestión de foco
- ✅ Compatibilidad con diferentes lectores de pantalla

#### **Hearing Disability Tests** (`hearing-disability.test.ts`)
- ✅ Subtítulos en videos
- ✅ Transcripciones de audio
- ✅ Alternativas visuales a sonidos
- ✅ Controles de multimedia accesibles

#### **Physical Disability Tests** (`physical-disability.test.ts`)
- ✅ Navegación completa por teclado
- ✅ Orden lógico de tabulación
- ✅ Skip links funcionales
- ✅ Compatibilidad con dispositivos de asistencia
- ✅ Targets de tamaño adecuado

#### **Cognitive Disability Tests** (`cognitive-disability.test.ts`)
- ✅ Contenido sin parpadeos excesivos
- ✅ Tiempo adecuado para interacciones
- ✅ Lenguaje claro y simple
- ✅ Prevención y recuperación de errores
- ✅ Navegación consistente

#### **Low Vision Tests** (`low-vision.test.ts`)
- ✅ Escalabilidad hasta 200% sin scroll horizontal
- ✅ Contraste de colores WCAG AA
- ✅ Independencia del color para información
- ✅ Modo alto contraste
- ✅ Personalización visual

### 2. Tests de Integración

#### **Full User Journey** (`full-user-journey.test.ts`)
- ✅ Flujo completo de navegación para todos los perfiles
- ✅ Interacción con contenido multimedia
- ✅ Uso de formularios accesibles
- ✅ Adaptaciones visuales
- ✅ Auditoría completa de accesibilidad

### 3. Tests Manuales

#### **Checklist por Perfil** (`checklist-by-profile.md`)
- 📋 Guías detalladas para testing manual
- 📋 Comandos específicos para herramientas de asistencia
- 📋 Criterios de éxito claramente definidos
- 📋 Templates para reportes de hallazgos

## 🛠️ Herramientas y Configuración

### Herramientas Automatizadas
- **@axe-core/react**: Auditoría automática de accesibilidad
- **@testing-library/react**: Testing de componentes React
- **jest-axe**: Integración de axe con Jest
- **@testing-library/jest-dom**: Matchers adicionales para DOM

### Herramientas Manuales
- **NVDA/VoiceOver**: Lectores de pantalla
- **Keyboard only**: Navegación sin mouse
- **Browser zoom**: Testing hasta 200%
- **Color contrast analyzers**: Verificación de contraste

### Configuración de Testing

#### Jest Configuration (`jest.config.js`)
```javascript
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironment: 'jsdom',
  testTimeout: 10000, // Tests de accesibilidad pueden ser más lentos
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/lib/**/*.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## 🚀 Ejecutar las Pruebas

### Comandos Disponibles

```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar solo pruebas de accesibilidad
npm run test:accessibility

# Ejecutar con cobertura
npm run test:coverage

# Modo watch para desarrollo
npm run test:watch

# Para CI/CD
npm run test:ci
```

### Ejemplo de Ejecución

```bash
# Ejecutar tests específicos de discapacidad visual
npm test -- tests/accessibility/profiles/visual-disability.test.ts

# Ejecutar tests de integración
npm test -- tests/accessibility/integration/

# Ver cobertura específica de accesibilidad
npm run test:accessibility -- --coverage
```

## 📊 Criterios de Éxito

### Niveles de Cumplimiento

#### ✅ **Nivel COMPLETO**
- 100% de tests pasan
- Cobertura de código > 80%
- Cero violaciones críticas de axe-core
- Experiencia fluida en testing manual

#### ⚠️ **Nivel PARCIAL**
- > 90% de tests pasan
- Violaciones menores únicamente
- Funcionalidades principales accesibles

#### ❌ **Nivel INSUFICIENTE**
- < 90% de tests pasan
- Violaciones críticas presentes
- Barreras significativas identificadas

### Métricas de Calidad

- **Cobertura de Código**: Mínimo 80%
- **Tests por Perfil**: Mínimo 15 tests por perfil
- **Tiempo de Ejecución**: < 2 minutos para suite completa
- **Compatibilidad**: Chrome, Firefox, Safari

## 🔄 Flujo de Desarrollo

### 1. Desarrollo de Componente
```bash
# Durante desarrollo
npm run test:watch
```

### 2. Antes de Commit
```bash
# Verificación completa
npm run test:accessibility
npm run lint
```

### 3. En Pull Request
```bash
# CI ejecuta automáticamente
npm run test:ci
```

### 4. Pre-Deploy
```bash
# Auditoría completa
npm run test:coverage
# Verificar que cobertura > 80%
```

## 📝 Reportes y Documentación

### Reportes Automáticos
- **HTML Report**: `./test-reports/accessibility-test-report.html`
- **Coverage Report**: `./coverage/index.html`
- **JSON Results**: Para integración con CI/CD

### Documentación Manual
- **Checklist Results**: Documentar hallazgos por perfil
- **User Testing**: Si se realizan pruebas con usuarios reales
- **Regression Testing**: Para validar fixes

## 🎯 Integración con Desarrollo

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:accessibility && npm run lint"
    }
  }
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/accessibility.yml
- name: Run Accessibility Tests
  run: npm run test:ci
- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## 📚 Recursos Adicionales

### Referencias WCAG
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Herramientas Recomendadas
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

### Comunidad
- [WebAIM Community](https://webaim.org/community/)
- [a11y Slack](https://web-a11y.slack.com/)

---

## 🎖️ Objetivo Final

**Meta**: Que cualquier usuario, independientemente de sus capacidades, pueda acceder y utilizar completamente el sitio web de la guía de accesibilidad.

**Validación**: Todos los perfiles del diagrama de clases deben poder completar exitosamente todas las funcionalidades principales del sitio.

---

*Este plan de pruebas es parte integral del desarrollo del sitio y debe mantenerse actualizado conforme evoluciona el proyecto.*

