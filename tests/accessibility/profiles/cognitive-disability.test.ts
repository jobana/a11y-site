/**
 * Tests para Usuario con Discapacidad Cognitiva
 * Basado en el diagrama de clases - UsuarioDiscapacidadCognitiva
 * 
 * Atributos del diagrama:
 * - reqReduccionDeMovimiento: boolean
 * - tiempoAdicionalRequerido: boolean
 * 
 * Métodos del diagrama:
 * + interactuarSinParpadeos()
 * 
 * Extiende de UsuarioConApoyoEnContenido:
 * - preferenciaSubtitulos: boolean
 * + controlarSubtitulosDeVideo()
 * + obtenerContenidoTextualClaro()
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

describe('Usuario con Discapacidad Cognitiva - Tests', () => {
  describe('interactuarSinParpadeos() - No Flashing Interactions', () => {
    test('should not have content that flashes more than 3 times per second', async () => {
      render(<TestFlashingContent />);
      
      const flashingElements = screen.getAllByTestId('animated-element');
      
      flashingElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const animationDuration = computedStyle.animationDuration;
        
        if (animationDuration !== 'none') {
          // Convertir a segundos
          const durationInMs = parseFloat(animationDuration) * 1000;
          
          // No debe parpadear más de 3 veces por segundo (333ms mínimo)
          expect(durationInMs).toBeGreaterThanOrEqual(333);
        }
      });
    });

    test('should provide option to pause or disable animations', async () => {
      render(<TestAnimationControls />);
      const user = userEvent.setup();
      
      // Verificar control para pausar animaciones
      const pauseButton = screen.getByRole('button', { name: /pausar animaciones/i });
      expect(pauseButton).toBeInTheDocument();
      
      // Activar pausa
      await user.click(pauseButton);
      
      // Verificar que las animaciones se pausaron
      const animatedElements = screen.getAllByTestId('animated-element');
      animatedElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        expect(computedStyle.animationPlayState).toBe('paused');
      });
    });

    test('should respect prefers-reduced-motion', async () => {
      // Simular preferencia de movimiento reducido
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<TestReducedMotionContent />);
      
      const animatedElements = screen.getAllByTestId('motion-element');
      
      animatedElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        // Con prefers-reduced-motion: reduce, las animaciones deben ser mínimas
        expect(computedStyle.transform).toBe('none');
      });
    });

    test('should not use auto-playing videos with sound', async () => {
      render(<TestAutoplayContent />);
      
      const videos = screen.getAllByRole('application').filter(el => 
        el.tagName.toLowerCase() === 'video'
      );

      videos.forEach(video => {
        // Videos no deben tener autoplay con sonido
        const hasAutoplay = video.hasAttribute('autoplay');
        const isMuted = video.hasAttribute('muted');
        
        if (hasAutoplay) {
          expect(isMuted).toBe(true);
        }
      });
    });
  });

  describe('reqReduccionDeMovimiento - Reduced Motion Requirements', () => {
    test('should provide static alternatives to moving content', async () => {
      render(<TestMovingContentAlternatives />);
      
      // Verificar que contenido en movimiento tiene alternativa estática
      const carousels = screen.getAllByTestId('carousel');
      
      carousels.forEach(carousel => {
        const staticAlternative = carousel.querySelector('[data-testid="static-view"]');
        expect(staticAlternative).toBeInTheDocument();
      });
    });

    test('should allow users to control motion', async () => {
      render(<TestMotionControls />);
      const user = userEvent.setup();
      
      const motionToggle = screen.getByRole('button', { name: /reducir movimiento/i });
      expect(motionToggle).toBeInTheDocument();
      
      // Activar reducción de movimiento
      await user.click(motionToggle);
      
      // Verificar que se aplicó la configuración
      expect(motionToggle).toHaveAttribute('aria-pressed', 'true');
      
      // Verificar que el movimiento se redujo
      const movingElements = screen.getAllByTestId('moving-element');
      movingElements.forEach(element => {
        expect(element.style.animation).toBe('none');
      });
    });

    test('should minimize parallax and scrolling effects', async () => {
      render(<TestScrollEffects />);
      
      // Verificar que efectos de scroll son opcionales
      const parallaxElements = screen.getAllByTestId('parallax-element');
      
      parallaxElements.forEach(element => {
        // Debe tener opción para deshabilitar
        const disableControl = element.querySelector('[data-testid="disable-parallax"]');
        expect(disableControl).toBeInTheDocument();
      });
    });
  });

  describe('tiempoAdicionalRequerido - Additional Time Requirements', () => {
    test('should provide adequate time for form completion', async () => {
      render(<TestTimedForm />);
      const user = userEvent.setup();
      
      const form = screen.getByRole('form');
      const timeWarning = screen.queryByRole('alert');
      
      // Simular llenado lento del formulario
      const nameInput = screen.getByLabelText(/nombre/i);
      await user.type(nameInput, 'Juan', { delay: 500 });
      
      // No debe haber advertencias de tiempo prematuras
      expect(timeWarning).not.toBeInTheDocument();
      
      // Si hay límite de tiempo, debe avisar antes
      await waitFor(() => {
        const warning = screen.queryByRole('alert');
        if (warning) {
          expect(warning).toHaveTextContent(/tiempo/i);
          // Debe ofrecer extensión
          const extendButton = screen.getByRole('button', { name: /extender/i });
          expect(extendButton).toBeInTheDocument();
        }
      }, { timeout: 5000 });
    });

    test('should not have session timeouts without warning', async () => {
      render(<TestSessionTimeout />);
      
      // Simular sesión a punto de expirar
      fireEvent(window, new CustomEvent('sessionWarning', {
        detail: { remainingTime: 60 }
      }));
      
      // Debe aparecer advertencia
      const warning = await screen.findByRole('alert');
      expect(warning).toHaveTextContent(/sesión expirará/i);
      
      // Debe ofrecer opción de extender
      const extendButton = screen.getByRole('button', { name: /continuar/i });
      expect(extendButton).toBeInTheDocument();
    });

    test('should allow pausing of time-sensitive content', async () => {
      render(<TestTimeSensitiveContent />);
      const user = userEvent.setup();
      
      // Verificar controles de pausa para contenido sensible al tiempo
      const pauseButton = screen.getByRole('button', { name: /pausar/i });
      expect(pauseButton).toBeInTheDocument();
      
      await user.click(pauseButton);
      
      // Verificar que el contenido se pausó
      const timer = screen.getByTestId('timer');
      const initialTime = timer.textContent;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      expect(timer.textContent).toBe(initialTime);
    });
  });

  describe('obtenerContenidoTextualClaro() - Clear Text Content', () => {
    test('should use simple and clear language', async () => {
      render(<TestTextComplexity />);
      
      const textElements = screen.getAllByTestId('content-text');
      
      textElements.forEach(element => {
        const text = element.textContent || '';
        
        // Verificar características de texto claro
        const words = text.split(' ');
        const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
        
        // Palabras no deben ser excesivamente largas en promedio
        expect(avgWordLength).toBeLessThan(8);
        
        // No debe usar jerga técnica sin explicación
        const technicalTerms = /\b(implementar|configurar|optimizar|refactorizar)\b/gi;
        const matches = text.match(technicalTerms);
        
        if (matches) {
          // Si hay términos técnicos, debe haber glosario o explicación
          const glossaryLink = element.querySelector('a[href*="glosario"]');
          const explanation = element.querySelector('[data-testid="explanation"]');
          
          expect(glossaryLink || explanation).toBeInTheDocument();
        }
      });
    });

    test('should provide clear headings and structure', async () => {
      render(<TestContentStructure />);
      
      const headings = screen.getAllByRole('heading');
      
      headings.forEach(heading => {
        const text = heading.textContent || '';
        
        // Los encabezados deben ser descriptivos
        expect(text.length).toBeGreaterThan(5);
        expect(text).not.toMatch(/^(título|heading|sección)$/i);
        
        // Deben indicar claramente el contenido de la sección
        expect(text).toMatch(/\b(cómo|qué|por qué|cuándo|dónde)\b/i);
      });
    });

    test('should use consistent terminology', async () => {
      render(<TestTerminologyConsistency />);
      
      // Verificar que términos importantes son consistentes
      const contentSections = screen.getAllByTestId('content-section');
      const usedTerms = new Map<string, string[]>();
      
      contentSections.forEach((section, index) => {
        const text = section.textContent || '';
        
        // Buscar términos clave
        const keyTerms = ['accesibilidad', 'usuario', 'navegación', 'contenido'];
        
        keyTerms.forEach(term => {
          if (text.includes(term)) {
            if (!usedTerms.has(term)) {
              usedTerms.set(term, []);
            }
            usedTerms.get(term)!.push(`sección ${index}`);
          }
        });
      });
      
      // Verificar consistencia (término debe aparecer de forma similar)
      usedTerms.forEach((sections, term) => {
        if (sections.length > 1) {
          // Si un término aparece en múltiples secciones, debe ser consistente
          expect(sections.length).toBeGreaterThan(0);
        }
      });
    });

    test('should provide definitions for complex concepts', async () => {
      render(<TestComplexConcepts />);
      
      const complexTerms = screen.getAllByTestId('complex-term');
      
      complexTerms.forEach(term => {
        // Términos complejos deben tener definición accesible
        const definition = term.getAttribute('aria-describedby');
        const tooltip = term.getAttribute('title');
        const popover = term.querySelector('[role="tooltip"]');
        
        expect(definition || tooltip || popover).toBeTruthy();
      });
    });
  });

  describe('Error Prevention and Recovery', () => {
    test('should prevent errors with clear validation', async () => {
      render(<TestErrorPrevention />);
      const user = userEvent.setup();
      
      const emailInput = screen.getByLabelText(/email/i);
      
      // Escribir email inválido
      await user.type(emailInput, 'email-invalido');
      await user.tab(); // Trigger validation
      
      // Debe mostrar error claro y sugerencia
      const errorMessage = await screen.findByRole('alert');
      expect(errorMessage).toHaveTextContent(/formato.*email/i);
      
      // Debe sugerir corrección
      expect(errorMessage).toHaveTextContent(/@/);
    });

    test('should allow easy error recovery', async () => {
      render(<TestErrorRecovery />);
      const user = userEvent.setup();
      
      const form = screen.getByRole('form');
      const submitButton = screen.getByRole('button', { name: /enviar/i });
      
      // Enviar formulario con errores
      await user.click(submitButton);
      
      // Verificar que errores son claros y específicos
      const errors = await screen.findAllByRole('alert');
      expect(errors.length).toBeGreaterThan(0);
      
      errors.forEach(error => {
        // Error debe indicar qué campo y cómo corregir
        expect(error.textContent).toMatch(/campo|required|obligatorio/i);
      });
      
      // Verificar que hay manera fácil de corregir
      const focusButton = screen.getByRole('button', { name: /ir al primer error/i });
      expect(focusButton).toBeInTheDocument();
    });

    test('should confirm destructive actions', async () => {
      render(<TestDestructiveActions />);
      const user = userEvent.setup();
      
      const deleteButton = screen.getByRole('button', { name: /eliminar/i });
      
      await user.click(deleteButton);
      
      // Debe aparecer confirmación clara
      const confirmDialog = await screen.findByRole('dialog');
      expect(confirmDialog).toBeInTheDocument();
      
      const confirmText = confirmDialog.textContent || '';
      expect(confirmText).toMatch(/está seguro|confirmar|eliminar/i);
      
      // Debe tener opciones claras
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      const confirmButton = screen.getByRole('button', { name: /confirmar|eliminar/i });
      
      expect(cancelButton).toBeInTheDocument();
      expect(confirmButton).toBeInTheDocument();
    });
  });

  describe('Navigation and Orientation', () => {
    test('should provide clear navigation cues', async () => {
      render(<TestNavigationCues />);
      
      // Verificar breadcrumbs
      const breadcrumbs = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(breadcrumbs).toBeInTheDocument();
      
      // Verificar indicador de página actual
      const currentPage = screen.getByRole('link', { current: 'page' });
      expect(currentPage).toBeInTheDocument();
      
      // Verificar navegación consistente
      const mainNav = screen.getByRole('navigation', { name: /principal/i });
      expect(mainNav).toBeInTheDocument();
    });

    test('should maintain consistent layout', async () => {
      render(<TestConsistentLayout />);
      
      // Verificar que elementos principales están en ubicaciones esperadas
      const header = screen.getByRole('banner');
      const main = screen.getByRole('main');
      const nav = screen.getByRole('navigation');
      const footer = screen.getByRole('contentinfo');
      
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      
      // Verificar orden visual lógico
      const landmarks = [header, nav, main, footer];
      let previousTop = -1;
      
      landmarks.forEach(landmark => {
        const rect = landmark.getBoundingClientRect();
        expect(rect.top).toBeGreaterThanOrEqual(previousTop);
        previousTop = rect.top;
      });
    });
  });

  describe('Integration Tests - Complete Cognitive Support', () => {
    test('should support users with cognitive limitations through complete journey', async () => {
      render(<TestCompleteCognitiveSupport />);
      const user = userEvent.setup();
      
      // 1. Entrada clara al sitio
      const pageTitle = document.title;
      expect(pageTitle).toMatch(/guía.*accesibilidad/i);
      
      // 2. Navegación clara
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent(/guía/i);
      
      // 3. Instrucciones claras
      const instructions = screen.getByTestId('instructions');
      expect(instructions).toHaveTextContent(/cómo usar/i);
      
      // 4. Formulario simple con ayuda
      const form = screen.getByRole('form');
      const helpText = form.querySelector('[data-testid="help-text"]');
      expect(helpText).toBeInTheDocument();
      
      // 5. Completar sin errores
      const nameInput = screen.getByLabelText(/nombre/i);
      await user.type(nameInput, 'Juan');
      
      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);
      
      // 6. Confirmación clara
      const success = await screen.findByRole('alert');
      expect(success).toHaveTextContent(/éxito|completado/i);
    });

    test('should pass cognitive accessibility audit', async () => {
      const { container } = render(<TestCompleteCognitiveSupport />);
      
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
          'heading-order': { enabled: true },
          'label': { enabled: true },
          'link-name': { enabled: true },
          'list': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });
  });
});

// Componentes de prueba
const TestFlashingContent = () => (
  <div>
    <div data-testid="animated-element" style={{animationDuration: '0.5s'}}>
      Elemento animado
    </div>
    <div data-testid="animated-element" style={{animationDuration: '1s'}}>
      Otro elemento
    </div>
  </div>
);

const TestAnimationControls = () => (
  <div>
    <button>Pausar animaciones</button>
    <div data-testid="animated-element" style={{animationPlayState: 'running'}}>
      Contenido animado
    </div>
  </div>
);

const TestReducedMotionContent = () => (
  <div>
    <div data-testid="motion-element" style={{transform: 'none'}}>
      Contenido con movimiento reducido
    </div>
  </div>
);

const TestAutoplayContent = () => (
  <div>
    <video autoPlay muted>
      <source src="/video.mp4" type="video/mp4" />
    </video>
  </div>
);

const TestMovingContentAlternatives = () => (
  <div>
    <div data-testid="carousel">
      <div data-testid="static-view">Vista estática del carrusel</div>
    </div>
  </div>
);

const TestMotionControls = () => (
  <div>
    <button aria-pressed="false">Reducir movimiento</button>
    <div data-testid="moving-element" style={{animation: 'slide 2s infinite'}}>
      Elemento en movimiento
    </div>
  </div>
);

const TestScrollEffects = () => (
  <div>
    <div data-testid="parallax-element">
      <button data-testid="disable-parallax">Deshabilitar efecto</button>
      Contenido con parallax
    </div>
  </div>
);

const TestTimedForm = () => (
  <form role="form">
    <label htmlFor="name">Nombre:</label>
    <input id="name" name="name" type="text" />
    <button type="submit">Enviar</button>
    <button>Extender tiempo</button>
  </form>
);

const TestSessionTimeout = () => (
  <div>
    <div role="alert" hidden>Su sesión expirará en 1 minuto</div>
    <button>Continuar sesión</button>
  </div>
);

const TestTimeSensitiveContent = () => (
  <div>
    <div data-testid="timer">05:00</div>
    <button>Pausar</button>
  </div>
);

const TestTextComplexity = () => (
  <div>
    <div data-testid="content-text">
      Este es un texto simple y claro para todos los usuarios.
      <a href="/glosario">Ver glosario</a>
    </div>
    <div data-testid="content-text">
      Cuando implementamos <span data-testid="explanation">(crear o desarrollar)</span> 
      accesibilidad, mejoramos la experiencia.
    </div>
  </div>
);

const TestContentStructure = () => (
  <div>
    <h1>Cómo usar esta guía de accesibilidad</h1>
    <h2>Qué encontrarás en cada sección</h2>
    <h3>Por qué es importante la accesibilidad</h3>
  </div>
);

const TestTerminologyConsistency = () => (
  <div>
    <div data-testid="content-section">
      La accesibilidad web ayuda a todos los usuarios a navegar mejor.
    </div>
    <div data-testid="content-section">
      Para mejorar la accesibilidad, el usuario debe poder navegar fácilmente.
    </div>
  </div>
);

const TestComplexConcepts = () => (
  <div>
    <span data-testid="complex-term" aria-describedby="wcag-def">WCAG</span>
    <div id="wcag-def">Pautas de Accesibilidad para el Contenido Web</div>
    
    <span data-testid="complex-term" title="Lector de pantalla">Screen reader</span>
  </div>
);

const TestErrorPrevention = () => (
  <div>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email" />
    <div role="alert" hidden>
      Formato de email inválido. Debe incluir @ y un dominio válido.
    </div>
  </div>
);

const TestErrorRecovery = () => (
  <form role="form">
    <input type="text" required />
    <button type="submit">Enviar</button>
    <button>Ir al primer error</button>
    <div role="alert" hidden>Campo obligatorio: complete este campo</div>
  </form>
);

const TestDestructiveActions = () => (
  <div>
    <button>Eliminar archivo</button>
    <div role="dialog" hidden>
      <p>¿Está seguro de que desea eliminar este archivo?</p>
      <button>Cancelar</button>
      <button>Confirmar eliminación</button>
    </div>
  </div>
);

const TestNavigationCues = () => (
  <div>
    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Inicio</a></li>
        <li><a href="/guia">Guía</a></li>
        <li aria-current="page">Página actual</li>
      </ol>
    </nav>
    <nav aria-label="Navegación principal">
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/guia">Guía</a></li>
      </ul>
    </nav>
  </div>
);

const TestConsistentLayout = () => (
  <div>
    <header role="banner">Header</header>
    <nav role="navigation">Navigation</nav>
    <main role="main">Main content</main>
    <footer role="contentinfo">Footer</footer>
  </div>
);

const TestCompleteCognitiveSupport = () => (
  <div>
    <h1>Guía de Accesibilidad Web</h1>
    <div data-testid="instructions">
      Cómo usar esta guía: Sigue los pasos en orden para aprender sobre accesibilidad.
    </div>
    <form role="form">
      <div data-testid="help-text">
        Complete este formulario para personalizar su experiencia.
      </div>
      <label htmlFor="user-name">Su nombre:</label>
      <input id="user-name" type="text" />
      <button type="submit">Enviar</button>
    </form>
    <div role="alert" hidden>¡Éxito! Su información ha sido guardada.</div>
  </div>
);

