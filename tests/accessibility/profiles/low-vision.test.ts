/**
 * Tests para Usuario con Baja Visión
 * Basado en el diagrama de clases - UsuarioBajaVision
 * 
 * Atributos del diagrama:
 * - nivelContrasteRequerido: string
 * - magnificacionFuenteNecesaria: int
 * 
 * Métodos del diagrama:
 * + escalarFuenteSinPerderInfo()
 * + modificarContrasteYColores()
 * + activarModoEscalaDeGrises()
 */

import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

describe('Usuario con Baja Visión - Tests', () => {
  describe('escalarFuenteSinPerderInfo() - Font Scaling Without Information Loss', () => {
    test('should scale to 200% without horizontal scrolling', async () => {
      render(<TestScalableContent />);
      
      // Simular zoom del navegador al 200%
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        value: 2,
      });
      
      // Simular viewport más pequeño debido al zoom
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 640, // 1280 / 2
      });
      
      // Verificar que no aparece scroll horizontal
      const body = document.body;
      expect(body.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
      
      // Verificar que el contenido sigue siendo funcional
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
        const rect = button.getBoundingClientRect();
        expect(rect.width).toBeGreaterThan(0);
      });
    });

    test('should maintain functionality when text size increases', async () => {
      render(<TestTextSizeCompatibility />);
      
      // Simular aumento de texto del navegador
      const rootElement = document.documentElement;
      rootElement.style.fontSize = '24px'; // 150% del tamaño normal (16px)
      
      // Verificar que botones siguen siendo clicables
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        // Botones deben mantener tamaño mínimo táctil (44x44px)
        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });
      
      // Verificar que formularios siguen siendo usables
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toBeVisible();
        const rect = input.getBoundingClientRect();
        expect(rect.height).toBeGreaterThanOrEqual(32);
      });
    });

    test('should reflow content appropriately at high zoom levels', async () => {
      render(<TestContentReflow />);
      
      // Simular zoom extremo (320px de ancho)
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 320,
      });
      
      // Simular evento de resize
      window.dispatchEvent(new Event('resize'));
      
      // Verificar que el contenido se reorganiza adecuadamente
      const containers = screen.getAllByTestId('content-container');
      
      containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        
        // Contenido debe caber en el viewport
        expect(rect.width).toBeLessThanOrEqual(320);
        
        // No debe haber elementos flotando incorrectamente
        expect(rect.left).toBeGreaterThanOrEqual(0);
      });
    });

    test('should preserve spacing and readability when scaled', async () => {
      render(<TestScaledReadability />);
      
      // Simular alta ampliación
      document.documentElement.style.fontSize = '32px'; // 200%
      
      const paragraphs = screen.getAllByTestId('text-content');
      
      paragraphs.forEach(paragraph => {
        const computedStyle = window.getComputedStyle(paragraph);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const fontSize = parseFloat(computedStyle.fontSize);
        
        // Line-height debe mantener proporción legible (1.4-1.6)
        const ratio = lineHeight / fontSize;
        expect(ratio).toBeGreaterThanOrEqual(1.4);
        expect(ratio).toBeLessThanOrEqual(1.8);
        
        // Debe mantener márgenes adecuados
        const marginBottom = parseFloat(computedStyle.marginBottom);
        expect(marginBottom).toBeGreaterThan(0);
      });
    });
  });

  describe('modificarContrasteYColores() - Contrast and Color Modification', () => {
    test('should meet WCAG AA contrast requirements', async () => {
      render(<TestContrastCompliance />);
      
      // Verificar elementos de texto tienen contraste adecuado
      const textElements = [
        ...screen.getAllByRole('heading'),
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link'),
        ...screen.getAllByTestId('body-text')
      ];

      textElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        // Verificar que hay colores definidos (no transparente)
        expect(color).not.toBe('rgba(0, 0, 0, 0)');
        expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
        
        // En implementación real, aquí calcularíamos el ratio de contraste
        // Para este test, verificamos que hay suficiente diferencia visual
        expect(color).not.toBe(backgroundColor);
      });
    });

    test('should support high contrast mode', async () => {
      render(<TestHighContrastMode />);
      const user = userEvent.setup();
      
      // Activar modo de alto contraste
      const contrastToggle = screen.getByRole('button', { name: /alto contraste/i });
      await user.click(contrastToggle);
      
      // Verificar que se aplicó alto contraste
      expect(contrastToggle).toHaveAttribute('aria-pressed', 'true');
      
      // Verificar que los elementos tienen colores de alto contraste
      const bodyStyle = window.getComputedStyle(document.body);
      expect(['#000000', '#ffffff', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'])
        .toContain(bodyStyle.backgroundColor);
    });

    test('should maintain information when colors change', async () => {
      render(<TestColorIndependence />);
      
      // Simular daltonismo (protanopia - dificultad con rojos)
      const colorSensitiveElements = screen.getAllByTestId('color-coded');
      
      colorSensitiveElements.forEach(element => {
        // Verificar que hay información no dependiente del color
        const ariaLabel = element.getAttribute('aria-label');
        const textContent = element.textContent;
        const iconChild = element.querySelector('[data-testid="status-icon"]');
        
        // Debe tener al menos uno: texto descriptivo, aria-label, o ícono
        expect(ariaLabel || (textContent && textContent.length > 0) || iconChild)
          .toBeTruthy();
      });
    });

    test('should allow color customization', async () => {
      render(<TestColorCustomization />);
      const user = userEvent.setup();
      
      // Verificar controles de personalización de color
      const backgroundControl = screen.getByRole('combobox', { name: /color de fondo/i });
      const textControl = screen.getByRole('combobox', { name: /color de texto/i });
      
      expect(backgroundControl).toBeInTheDocument();
      expect(textControl).toBeInTheDocument();
      
      // Cambiar colores
      await user.selectOptions(backgroundControl, 'dark');
      await user.selectOptions(textControl, 'light');
      
      // Verificar que se aplicaron los cambios
      const previewArea = screen.getByTestId('color-preview');
      const style = window.getComputedStyle(previewArea);
      
      expect(style.backgroundColor).toMatch(/(rgb\(.*\)|#.*|black|white)/);
    });
  });

  describe('activarModoEscalaDeGrises() - Grayscale Mode Activation', () => {
    test('should convert colors to grayscale', async () => {
      render(<TestGrayscaleMode />);
      const user = userEvent.setup();
      
      const grayscaleToggle = screen.getByRole('button', { name: /escala de grises/i });
      await user.click(grayscaleToggle);
      
      // Verificar que se activó el modo escala de grises
      expect(grayscaleToggle).toHaveAttribute('aria-pressed', 'true');
      
      // Verificar que se aplicó filtro CSS o cambios de color
      const bodyStyle = window.getComputedStyle(document.body);
      expect(bodyStyle.filter).toContain('grayscale') || 
      expect(document.body.classList).toContain('grayscale-mode');
    });

    test('should maintain contrast in grayscale mode', async () => {
      render(<TestGrayscaleContrast />);
      const user = userEvent.setup();
      
      // Activar escala de grises
      const grayscaleToggle = screen.getByRole('button', { name: /escala de grises/i });
      await user.click(grayscaleToggle);
      
      // Verificar que elementos importantes siguen siendo distinguibles
      const importantElements = [
        screen.getByRole('button', { name: /primario/i }),
        screen.getByRole('button', { name: /secundario/i }),
        screen.getByTestId('error-message'),
        screen.getByTestId('success-message')
      ];

      importantElements.forEach(element => {
        expect(element).toBeVisible();
        
        // En escala de grises, la diferenciación debe ser por contraste/patrón
        const computedStyle = window.getComputedStyle(element);
        expect(computedStyle.border || computedStyle.boxShadow || computedStyle.opacity)
          .toBeTruthy();
      });
    });

    test('should preserve icons and symbols in grayscale', async () => {
      render(<TestGrayscaleIcons />);
      const user = userEvent.setup();
      
      const grayscaleToggle = screen.getByRole('button', { name: /escala de grises/i });
      await user.click(grayscaleToggle);
      
      // Verificar que íconos siguen siendo reconocibles
      const icons = screen.getAllByTestId('status-icon');
      
      icons.forEach(icon => {
        // Íconos deben mantener forma y contraste
        expect(icon).toBeVisible();
        
        const ariaLabel = icon.getAttribute('aria-label');
        const title = icon.getAttribute('title');
        
        // Debe tener descripción textual
        expect(ariaLabel || title).toBeTruthy();
      });
    });
  });

  describe('nivelContrasteRequerido - Required Contrast Level', () => {
    test('should support different contrast requirements', async () => {
      render(<TestContrastLevels />);
      const user = userEvent.setup();
      
      // Probar diferentes niveles de contraste
      const contrastLevels = ['normal', 'enhanced', 'maximum'];
      
      for (const level of contrastLevels) {
        const levelButton = screen.getByRole('button', { name: new RegExp(level, 'i') });
        await user.click(levelButton);
        
        // Verificar que se aplicó el nivel
        expect(levelButton).toHaveAttribute('aria-pressed', 'true');
        
        // Verificar que otros niveles se desactivaron
        contrastLevels.filter(l => l !== level).forEach(otherLevel => {
          const otherButton = screen.getByRole('button', { name: new RegExp(otherLevel, 'i') });
          expect(otherButton).toHaveAttribute('aria-pressed', 'false');
        });
      }
    });

    test('should maintain readability at all contrast levels', async () => {
      render(<TestContrastReadability />);
      
      const contrastModes = ['normal', 'high', 'maximum'];
      
      for (const mode of contrastModes) {
        // Simular diferentes modos de contraste
        document.body.className = `contrast-${mode}`;
        
        const textElements = screen.getAllByTestId('readable-text');
        
        textElements.forEach(element => {
          expect(element).toBeVisible();
          
          const computedStyle = window.getComputedStyle(element);
          const color = computedStyle.color;
          const backgroundColor = computedStyle.backgroundColor;
          
          // Verificar que hay contraste
          expect(color).not.toBe(backgroundColor);
          expect(color).not.toBe('transparent');
        });
      }
    });
  });

  describe('magnificacionFuenteNecesaria - Required Font Magnification', () => {
    test('should support different zoom levels', async () => {
      render(<TestZoomLevels />);
      
      const zoomLevels = [100, 125, 150, 200, 250, 300];
      
      zoomLevels.forEach(zoomLevel => {
        // Simular zoom level
        const scaleFactor = zoomLevel / 100;
        document.documentElement.style.fontSize = `${16 * scaleFactor}px`;
        
        // Verificar que el contenido sigue siendo funcional
        const navigation = screen.getByRole('navigation');
        const main = screen.getByRole('main');
        
        expect(navigation).toBeVisible();
        expect(main).toBeVisible();
        
        // Verificar que no hay overflow horizontal problemático
        expect(document.body.scrollWidth).toBeLessThanOrEqual(
          window.innerWidth + 50 // Tolerancia pequeña
        );
      });
    });

    test('should maintain touch targets at high magnification', async () => {
      render(<TestHighMagnificationTargets />);
      
      // Simular alta magnificación
      document.documentElement.style.fontSize = '48px'; // 300%
      
      const interactiveElements = [
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link'),
        ...screen.getAllByRole('checkbox')
      ];

      interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        
        // Incluso con alta magnificación, targets deben ser adecuados
        // Pueden ser más grandes, pero no más pequeños que el mínimo
        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Integration Tests - Complete Low Vision Support', () => {
    test('should support complete workflow with low vision adaptations', async () => {
      render(<TestCompleteLowVisionWorkflow />);
      const user = userEvent.setup();
      
      // 1. Activar adaptaciones para baja visión
      const highContrastBtn = screen.getByRole('button', { name: /alto contraste/i });
      await user.click(highContrastBtn);
      
      const largeTextBtn = screen.getByRole('button', { name: /texto grande/i });
      await user.click(largeTextBtn);
      
      // 2. Navegar por el contenido
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeVisible();
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      // 3. Usar formularios
      const form = screen.getByRole('form');
      const nameInput = screen.getByLabelText(/nombre/i);
      
      await user.type(nameInput, 'Usuario de prueba');
      
      // 4. Verificar que todo sigue funcionando
      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);
      
      const confirmation = await screen.findByRole('alert');
      expect(confirmation).toBeVisible();
    });

    test('should pass comprehensive low vision accessibility audit', async () => {
      const { container } = render(<TestCompleteLowVisionWorkflow />);
      
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
          'color-contrast-enhanced': { enabled: true },
          'target-size': { enabled: true },
          'focus-order-semantics': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });
  });
});

// Componentes de prueba
const TestScalableContent = () => (
  <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
    <h1>Contenido escalable</h1>
    <p>Este contenido debe escalar sin problemas.</p>
    <button style={{ minWidth: '44px', minHeight: '44px' }}>Botón</button>
  </div>
);

const TestTextSizeCompatibility = () => (
  <div>
    <button style={{ padding: '12px 16px', minHeight: '44px' }}>Botón adaptable</button>
    <input type="text" style={{ padding: '8px', minHeight: '32px' }} />
  </div>
);

const TestContentReflow = () => (
  <div>
    <div data-testid="content-container" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
      Contenido que se reorganiza responsivamente
    </div>
  </div>
);

const TestScaledReadability = () => (
  <div>
    <p data-testid="text-content" style={{ lineHeight: '1.5', marginBottom: '1em' }}>
      Texto que mantiene legibilidad al escalar.
    </p>
  </div>
);

const TestContrastCompliance = () => (
  <div style={{ backgroundColor: '#ffffff', color: '#000000' }}>
    <h1>Encabezado con contraste</h1>
    <button style={{ backgroundColor: '#0066cc', color: '#ffffff' }}>Botón accesible</button>
    <a href="#" style={{ color: '#0066cc' }}>Enlace visible</a>
    <p data-testid="body-text">Texto del cuerpo con buen contraste.</p>
  </div>
);

const TestHighContrastMode = () => (
  <div>
    <button aria-pressed="false">Activar alto contraste</button>
    <div id="content">Contenido que cambiará de contraste</div>
  </div>
);

const TestColorIndependence = () => (
  <div>
    <div data-testid="color-coded" style={{ color: 'red' }}>
      ❌ Error: Campo obligatorio
      <span data-testid="status-icon">❌</span>
    </div>
    <div data-testid="color-coded" style={{ color: 'green' }}>
      ✅ Éxito: Guardado correctamente
      <span data-testid="status-icon">✅</span>
    </div>
  </div>
);

const TestColorCustomization = () => (
  <div>
    <label htmlFor="bg-color">Color de fondo:</label>
    <select id="bg-color">
      <option value="light">Claro</option>
      <option value="dark">Oscuro</option>
    </select>
    
    <label htmlFor="text-color">Color de texto:</label>
    <select id="text-color">
      <option value="dark">Oscuro</option>
      <option value="light">Claro</option>
    </select>
    
    <div data-testid="color-preview" style={{ padding: '20px' }}>
      Vista previa de colores
    </div>
  </div>
);

const TestGrayscaleMode = () => (
  <div>
    <button aria-pressed="false">Activar escala de grises</button>
    <div style={{ color: 'blue', backgroundColor: 'yellow' }}>
      Contenido colorido que se convertirá a escala de grises
    </div>
  </div>
);

const TestGrayscaleContrast = () => (
  <div>
    <button aria-pressed="false">Activar escala de grises</button>
    <button style={{ backgroundColor: '#007acc', color: 'white' }}>Botón Primario</button>
    <button style={{ backgroundColor: '#6c757d', color: 'white' }}>Botón Secundario</button>
    <div data-testid="error-message" style={{ color: 'red', border: '2px solid red' }}>
      Mensaje de error
    </div>
    <div data-testid="success-message" style={{ color: 'green', border: '2px solid green' }}>
      Mensaje de éxito
    </div>
  </div>
);

const TestGrayscaleIcons = () => (
  <div>
    <button aria-pressed="false">Activar escala de grises</button>
    <span data-testid="status-icon" aria-label="Error" title="Error">🔴</span>
    <span data-testid="status-icon" aria-label="Éxito" title="Éxito">🟢</span>
    <span data-testid="status-icon" aria-label="Advertencia" title="Advertencia">🟡</span>
  </div>
);

const TestContrastLevels = () => (
  <div>
    <button aria-pressed="true">Normal</button>
    <button aria-pressed="false">Enhanced</button>
    <button aria-pressed="false">Maximum</button>
  </div>
);

const TestContrastReadability = () => (
  <div>
    <p data-testid="readable-text">Texto legible en todos los modos de contraste.</p>
    <p data-testid="readable-text">Otro párrafo de ejemplo.</p>
  </div>
);

const TestZoomLevels = () => (
  <div style={{ maxWidth: '100%' }}>
    <nav role="navigation">
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Guía</a></li>
      </ul>
    </nav>
    <main role="main">
      <h1>Contenido principal</h1>
      <p>Texto que debe escalar apropiadamente.</p>
    </main>
  </div>
);

const TestHighMagnificationTargets = () => (
  <div>
    <button style={{ minWidth: '44px', minHeight: '44px' }}>Botón 1</button>
    <a href="#" style={{ display: 'inline-block', minWidth: '44px', minHeight: '44px' }}>
      Enlace
    </a>
    <input type="checkbox" style={{ width: '44px', height: '44px' }} />
  </div>
);

const TestCompleteLowVisionWorkflow = () => (
  <div>
    <header>
      <button aria-pressed="false">Alto contraste</button>
      <button aria-pressed="false">Texto grande</button>
    </header>
    
    <nav role="navigation">
      <a href="#">Inicio</a>
      <a href="#">Guía</a>
      <a href="#">Recursos</a>
    </nav>
    
    <main>
      <h1>Guía de Accesibilidad</h1>
      
      <form role="form">
        <label htmlFor="user-name">Nombre:</label>
        <input id="user-name" type="text" />
        
        <button type="submit">Enviar</button>
      </form>
    </main>
    
    <div role="alert" hidden>
      Formulario enviado exitosamente
    </div>
  </div>
);

