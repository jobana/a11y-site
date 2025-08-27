/**
 * Tests de Integración - Flujo Completo de Usuario
 * Basado en todos los perfiles del diagrama de clases
 * 
 * Este archivo testea que un usuario con cualquier tipo de discapacidad
 * puede completar exitosamente todas las funcionalidades principales del sitio.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

describe('Full User Journey - Integration Tests', () => {
  describe('Complete Site Navigation - All Disability Profiles', () => {
    test('should support full navigation for all disability types', async () => {
      render(<CompleteAccessibilityGuide />);
      const user = userEvent.setup();
      
      // 1. ENTRADA AL SITIO
      // Verificar que la página tiene título descriptivo
      expect(document.title).toMatch(/guía.*accesibilidad/i);
      
      // Verificar declaración de idioma
      expect(document.documentElement.lang).toBe('es');
      
      // 2. NAVEGACIÓN INICIAL
      // Skip links deben estar disponibles (discapacidad física/visual)
      await user.tab();
      const skipLink = document.activeElement as HTMLElement;
      expect(skipLink.textContent).toMatch(/saltar/i);
      
      await user.keyboard('[Enter]');
      const mainContent = screen.getByRole('main');
      expect(mainContent).toHaveFocus();
      
      // 3. NAVEGACIÓN POR CONTENIDO
      // Estructura semántica para lectores de pantalla
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      
      // 4. ACCESO A SECCIONES PRINCIPALES
      const navLinks = screen.getAllByRole('link').filter(link => 
        link.closest('[role="navigation"]')
      );
      
      expect(navLinks.length).toBeGreaterThan(3);
      
      // Verificar que enlaces tienen nombres accesibles
      navLinks.forEach(link => {
        const accessibleName = link.textContent || link.getAttribute('aria-label');
        expect(accessibleName).toBeTruthy();
        expect(accessibleName!.length).toBeGreaterThan(2);
      });
    });

    test('should maintain accessibility across different sections', async () => {
      render(<CompleteAccessibilityGuide />);
      const user = userEvent.setup();
      
      // Navegar por diferentes secciones
      const sections = [
        'Generalidades',
        'Fases del Desarrollo', 
        'Recursos',
        'Autoevaluación'
      ];
      
      for (const sectionName of sections) {
        const sectionLink = screen.getByRole('link', { name: new RegExp(sectionName, 'i') });
        await user.click(sectionLink);
        
        // Verificar que cada sección mantiene estructura accesible
        await waitFor(() => {
          const sectionHeading = screen.getByRole('heading', { level: 1 });
          expect(sectionHeading).toBeInTheDocument();
          
          // Verificar breadcrumbs para orientación (discapacidad cognitiva)
          const breadcrumbs = screen.queryByRole('navigation', { name: /breadcrumb/i });
          if (breadcrumbs) {
            expect(breadcrumbs).toBeInTheDocument();
          }
        });
      }
    });
  });

  describe('Content Consumption - Multiple Disability Support', () => {
    test('should support multimedia content for all users', async () => {
      render(<MultimediaContentPage />);
      const user = userEvent.setup();
      
      // USUARIOS CON DISCAPACIDAD AUDITIVA
      const videos = screen.getAllByRole('application').filter(el => 
        el.tagName.toLowerCase() === 'video'
      );
      
      if (videos.length > 0) {
        videos.forEach(video => {
          // Subtítulos disponibles
          const tracks = video.querySelectorAll('track[kind="captions"]');
          expect(tracks.length).toBeGreaterThan(0);
          
          // Control de subtítulos accesible
          const subtitleButton = screen.getByRole('button', { name: /subtítulos/i });
          expect(subtitleButton).toBeInTheDocument();
        });
        
        // Transcripciones disponibles
        const transcriptButton = screen.queryByRole('button', { name: /transcripción/i });
        if (transcriptButton) {
          await user.click(transcriptButton);
          const transcript = screen.getByRole('dialog', { name: /transcripción/i });
          expect(transcript).toBeInTheDocument();
        }
      }
      
      // USUARIOS CON DISCAPACIDAD VISUAL
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        const altText = img.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText).not.toBe('');
      });
      
      // USUARIOS CON DISCAPACIDAD COGNITIVA
      // Contenido sin parpadeos excesivos
      const animatedElements = screen.getAllByTestId('animated-content');
      animatedElements.forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.animationDuration !== 'none') {
          const duration = parseFloat(style.animationDuration) * 1000;
          expect(duration).toBeGreaterThanOrEqual(333); // Max 3 flashes/second
        }
      });
    });

    test('should provide clear content structure', async () => {
      render(<StructuredContentPage />);
      
      // Verificar jerarquía de encabezados
      const headings = screen.getAllByRole('heading');
      const headingLevels = headings.map(h => parseInt(h.tagName[1]));
      
      // Debe empezar con H1
      expect(headingLevels[0]).toBe(1);
      
      // No debe haber saltos de nivel
      for (let i = 1; i < headingLevels.length; i++) {
        const diff = headingLevels[i] - headingLevels[i-1];
        expect(diff).toBeLessThanOrEqual(1);
      }
      
      // Verificar landmarks
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // Verificar listas estructuradas
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
    });
  });

  describe('Interactive Elements - Universal Access', () => {
    test('should support form interaction for all disability types', async () => {
      render(<AccessibleFormPage />);
      const user = userEvent.setup();
      
      // NAVEGACIÓN POR TECLADO (discapacidad física)
      const formElements = [
        ...screen.getAllByRole('textbox'),
        ...screen.getAllByRole('combobox'),
        ...screen.getAllByRole('checkbox'),
        ...screen.getAllByRole('button')
      ];
      
      // Verificar orden de tabulación lógico
      for (const element of formElements) {
        await user.tab();
        expect(document.activeElement).toBe(element);
      }
      
      // ETIQUETAS CLARAS (discapacidad visual/cognitiva)
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        const label = screen.getByLabelText(input.getAttribute('aria-label') || '');
        expect(label).toBeInTheDocument();
      });
      
      // VALIDACIÓN CLARA (discapacidad cognitiva)
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'email-invalido');
      await user.tab();
      
      const errorMessage = await screen.findByRole('alert');
      expect(errorMessage).toHaveTextContent(/formato.*email/i);
      
      // CONFIRMACIÓN DE ACCIONES (discapacidad cognitiva)
      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);
      
      const confirmation = await screen.findByRole('alert');
      expect(confirmation).toHaveTextContent(/enviado|éxito/i);
    });

    test('should provide adequate timing for all interactions', async () => {
      render(<TimedInteractionPage />);
      const user = userEvent.setup();
      
      // TIEMPO ADECUADO (discapacidad física/cognitiva)
      const timedButton = screen.getByRole('button', { name: /acción con tiempo/i });
      
      // Simular interacción lenta
      await user.hover(timedButton);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await user.click(timedButton);
      
      // La acción debe seguir siendo válida
      expect(screen.getByText(/acción completada/i)).toBeInTheDocument();
      
      // ADVERTENCIAS DE TIEMPO
      if (screen.queryByTestId('session-timer')) {
        const timeWarning = await screen.findByRole('alert');
        expect(timeWarning).toHaveTextContent(/tiempo|sesión/i);
        
        const extendButton = screen.getByRole('button', { name: /extender|continuar/i });
        expect(extendButton).toBeInTheDocument();
      }
    });
  });

  describe('Visual Adaptations - Low Vision Support', () => {
    test('should support visual customizations', async () => {
      render(<VisualCustomizationPage />);
      const user = userEvent.setup();
      
      // CONTRASTE
      const contrastButton = screen.getByRole('button', { name: /alto contraste/i });
      await user.click(contrastButton);
      expect(contrastButton).toHaveAttribute('aria-pressed', 'true');
      
      // TAMAÑO DE TEXTO
      const textSizeButton = screen.getByRole('button', { name: /texto grande/i });
      await user.click(textSizeButton);
      expect(textSizeButton).toHaveAttribute('aria-pressed', 'true');
      
      // ESCALA DE GRISES
      const grayscaleButton = screen.getByRole('button', { name: /escala de grises/i });
      await user.click(grayscaleButton);
      expect(grayscaleButton).toHaveAttribute('aria-pressed', 'true');
      
      // Verificar que el contenido sigue siendo funcional
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeVisible();
      
      const interactiveElements = screen.getAllByRole('button');
      interactiveElements.forEach(element => {
        expect(element).toBeVisible();
      });
    });

    test('should maintain functionality at high zoom levels', async () => {
      render(<ZoomCompatiblePage />);
      
      // Simular zoom del 200%
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 640, // 1280 / 2
      });
      
      document.documentElement.style.fontSize = '32px'; // 200%
      
      // Verificar que no hay scroll horizontal problemático
      expect(document.body.scrollWidth).toBeLessThanOrEqual(window.innerWidth + 100);
      
      // Verificar que elementos interactivos siguen siendo accesibles
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Comprehensive Accessibility Audit', () => {
    test('should pass full accessibility audit', async () => {
      const { container } = render(<CompleteAccessibilityGuide />);
      
      const results = await axe(container, {
        rules: {
          // Todas las reglas importantes
          'keyboard': { enabled: true },
          'color-contrast': { enabled: true },
          'heading-order': { enabled: true },
          'image-alt': { enabled: true },
          'label': { enabled: true },
          'link-name': { enabled: true },
          'aria-allowed-attr': { enabled: true },
          'aria-required-attr': { enabled: true },
          'aria-valid-attr-value': { enabled: true },
          'button-name': { enabled: true },
          'bypass': { enabled: true },
          'document-title': { enabled: true },
          'duplicate-id': { enabled: true },
          'form-field-multiple-labels': { enabled: true },
          'frame-title': { enabled: true },
          'html-has-lang': { enabled: true },
          'html-lang-valid': { enabled: true },
          'input-image-alt': { enabled: true },
          'label-title-only': { enabled: true },
          'landmark-banner-is-top-level': { enabled: true },
          'landmark-main-is-top-level': { enabled: true },
          'landmark-no-duplicate-banner': { enabled: true },
          'landmark-no-duplicate-contentinfo': { enabled: true },
          'landmark-one-main': { enabled: true },
          'list': { enabled: true },
          'listitem': { enabled: true },
          'meta-refresh': { enabled: true },
          'meta-viewport': { enabled: true },
          'page-has-heading-one': { enabled: true },
          'region': { enabled: true },
          'skip-link': { enabled: true },
          'tabindex': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    test('should support screen reader navigation flow', async () => {
      render(<CompleteAccessibilityGuide />);
      
      // Simular navegación por landmarks
      const landmarks = [
        screen.getByRole('banner'),
        screen.getByRole('navigation'),
        screen.getByRole('main'),
        screen.getByRole('contentinfo')
      ];

      landmarks.forEach(landmark => {
        expect(landmark).toBeInTheDocument();
        
        // Landmarks deben tener nombres accesibles cuando es necesario
        if (landmark.tagName.toLowerCase() === 'nav') {
          const ariaLabel = landmark.getAttribute('aria-label') || 
                           landmark.getAttribute('aria-labelledby');
          expect(ariaLabel).toBeTruthy();
        }
      });
      
      // Verificar estructura de encabezados para navegación
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(2);
      
      // H1 debe existir y ser único
      const h1Elements = headings.filter(h => h.tagName === 'H1');
      expect(h1Elements.length).toBe(1);
    });
  });

  describe('Error Handling and Recovery', () => {
    test('should provide accessible error handling', async () => {
      render(<ErrorHandlingPage />);
      const user = userEvent.setup();
      
      // Simular error de formulario
      const form = screen.getByRole('form');
      const submitButton = screen.getByRole('button', { name: /enviar/i });
      
      await user.click(submitButton);
      
      // Errores deben ser anunciados
      const errors = await screen.findAllByRole('alert');
      expect(errors.length).toBeGreaterThan(0);
      
      errors.forEach(error => {
        expect(error).toBeVisible();
        expect(error.textContent!.length).toBeGreaterThan(5);
      });
      
      // Debe haber manera de navegar a errores
      const errorSummary = screen.queryByRole('region', { name: /errores/i });
      if (errorSummary) {
        const errorLinks = errorSummary.querySelectorAll('a');
        errorLinks.forEach(link => {
          expect(link.getAttribute('href')).toMatch(/#.+/);
        });
      }
    });

    test('should support error recovery', async () => {
      render(<ErrorRecoveryPage />);
      const user = userEvent.setup();
      
      // Simular error de red
      const retryButton = screen.getByRole('button', { name: /reintentar/i });
      expect(retryButton).toBeInTheDocument();
      
      await user.click(retryButton);
      
      // Debe mostrar feedback
      const feedback = await screen.findByRole('status');
      expect(feedback).toHaveTextContent(/intentando|cargando/i);
    });
  });
});

// Componentes de prueba para integración
const CompleteAccessibilityGuide = () => (
  <html lang="es">
    <head>
      <title>Guía Completa de Accesibilidad Web</title>
    </head>
    <body>
      <a href="#main" className="skip-link">Saltar al contenido principal</a>
      
      <header role="banner">
        <h1>Guía de Accesibilidad Web</h1>
        <nav role="navigation" aria-label="Navegación principal">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/generalidades">Generalidades</a></li>
            <li><a href="/fases">Fases del Desarrollo</a></li>
            <li><a href="/recursos">Recursos</a></li>
            <li><a href="/autoevaluacion">Autoevaluación</a></li>
          </ul>
        </nav>
      </header>
      
      <main id="main" role="main">
        <h2>Bienvenido a la Guía</h2>
        <p>Esta guía te ayudará a crear sitios web accesibles.</p>
        
        <section>
          <h3>Secciones Principales</h3>
          <ul>
            <li>Conceptos básicos</li>
            <li>Implementación práctica</li>
            <li>Herramientas de validación</li>
          </ul>
        </section>
      </main>
      
      <footer role="contentinfo">
        <p>&copy; 2024 Guía de Accesibilidad</p>
      </footer>
    </body>
  </html>
);

const MultimediaContentPage = () => (
  <div>
    <main role="main">
      <h1>Contenido Multimedia</h1>
      
      <video controls role="application">
        <source src="/video.mp4" type="video/mp4" />
        <track kind="captions" src="/captions-es.vtt" srcLang="es" label="Español" default />
        <track kind="captions" src="/captions-en.vtt" srcLang="en" label="English" />
      </video>
      
      <button>Activar subtítulos</button>
      <button>Mostrar transcripción</button>
      
      <div role="dialog" aria-label="Transcripción del video" hidden>
        <h2>Transcripción</h2>
        <p>Contenido completo del video...</p>
      </div>
      
      <img src="/diagram.jpg" alt="Diagrama mostrando flujo de accesibilidad" />
      
      <div data-testid="animated-content" style={{animationDuration: '1s'}}>
        Contenido con animación controlada
      </div>
    </main>
  </div>
);

const StructuredContentPage = () => (
  <div>
    <nav role="navigation" aria-label="Navegación principal">
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/guia">Guía</a></li>
      </ul>
    </nav>
    
    <main role="main">
      <h1>Estructura de Contenido</h1>
      
      <h2>Sección Principal</h2>
      <p>Contenido de la sección principal.</p>
      
      <h3>Subsección</h3>
      <ul>
        <li>Elemento de lista 1</li>
        <li>Elemento de lista 2</li>
      </ul>
      
      <h2>Otra Sección</h2>
      <p>Más contenido estructurado.</p>
    </main>
  </div>
);

const AccessibleFormPage = () => (
  <div>
    <main role="main">
      <h1>Formulario Accesible</h1>
      
      <form role="form">
        <div>
          <label htmlFor="name">Nombre completo:</label>
          <input id="name" type="text" required />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" required />
        </div>
        
        <div>
          <label htmlFor="country">País:</label>
          <select id="country">
            <option value="">Seleccione...</option>
            <option value="co">Colombia</option>
            <option value="es">España</option>
          </select>
        </div>
        
        <div>
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter">Suscribirse al boletín</label>
        </div>
        
        <button type="submit">Enviar formulario</button>
      </form>
      
      <div role="alert" hidden>
        Formulario enviado exitosamente
      </div>
    </main>
  </div>
);

const TimedInteractionPage = () => (
  <div>
    <main role="main">
      <h1>Interacciones con Tiempo</h1>
      
      <button>Acción con tiempo limitado</button>
      <div hidden>Acción completada</div>
      
      <div data-testid="session-timer">
        <div role="alert" hidden>Su sesión expirará en 2 minutos</div>
        <button>Extender sesión</button>
      </div>
    </main>
  </div>
);

const VisualCustomizationPage = () => (
  <div>
    <header>
      <div role="toolbar" aria-label="Opciones de accesibilidad">
        <button aria-pressed="false">Alto contraste</button>
        <button aria-pressed="false">Texto grande</button>
        <button aria-pressed="false">Escala de grises</button>
      </div>
    </header>
    
    <main role="main">
      <h1>Personalización Visual</h1>
      <p>Este contenido se adapta a sus preferencias visuales.</p>
      <button>Botón de ejemplo</button>
    </main>
  </div>
);

const ZoomCompatiblePage = () => (
  <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
    <main role="main">
      <h1>Página Compatible con Zoom</h1>
      <p style={{ wordWrap: 'break-word' }}>
        Este contenido se adapta a diferentes niveles de zoom sin crear
        scroll horizontal problemático.
      </p>
      <button style={{ minWidth: '44px', minHeight: '44px' }}>
        Botón accesible
      </button>
    </main>
  </div>
);

const ErrorHandlingPage = () => (
  <div>
    <main role="main">
      <h1>Manejo de Errores</h1>
      
      <form role="form">
        <input type="text" required />
        <button type="submit">Enviar</button>
      </form>
      
      <div role="alert" hidden>
        Campo obligatorio: complete este campo
      </div>
      
      <div role="region" aria-label="Resumen de errores" hidden>
        <h2>Errores encontrados:</h2>
        <ul>
          <li><a href="#field1">Campo nombre es obligatorio</a></li>
        </ul>
      </div>
    </main>
  </div>
);

const ErrorRecoveryPage = () => (
  <div>
    <main role="main">
      <h1>Recuperación de Errores</h1>
      
      <div role="alert">
        Error de conexión. No se pudo cargar el contenido.
      </div>
      
      <button>Reintentar</button>
      
      <div role="status" hidden>
        Intentando reconectar...
      </div>
    </main>
  </div>
);

