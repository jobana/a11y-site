/**
 * Tests para Usuario con Discapacidad Física
 * Basado en el diagrama de clases - UsuarioDiscapacidadFisica
 * 
 * Métodos del diagrama:
 * + interactuarConDispositivosDeAyuda()
 * 
 * Extiende de UsuarioNavegacionAsistida:
 * - dispositivoEsTeclado: boolean
 * + navegarPorTeclado()
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

describe('Usuario con Discapacidad Física - Tests', () => {
  describe('navegarPorTeclado() - Keyboard Navigation', () => {
    test('should support complete keyboard navigation', async () => {
      render(<TestCompleteApp />);
      const user = userEvent.setup();
      
      // Verificar que todos los elementos interactivos son accesibles por teclado
      const interactiveElements = [
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link'),
        ...screen.getAllByRole('textbox'),
        ...screen.getAllByRole('combobox'),
        ...screen.getAllByRole('checkbox')
      ];

      // Navegar por todos los elementos
      for (let i = 0; i < interactiveElements.length; i++) {
        await user.tab();
        const focusedElement = document.activeElement;
        expect(interactiveElements).toContain(focusedElement);
      }
    });

    test('should have logical tab order', async () => {
      render(<TestFormPage />);
      const user = userEvent.setup();
      
      // Definir orden esperado
      const expectedOrder = [
        'input[name="firstName"]',
        'input[name="lastName"]',
        'input[name="email"]',
        'select[name="country"]',
        'textarea[name="message"]',
        'button[type="submit"]'
      ];

      // Verificar orden de tabulación
      for (const selector of expectedOrder) {
        await user.tab();
        const focusedElement = document.activeElement;
        expect(focusedElement).toEqual(document.querySelector(selector));
      }
    });

    test('should support skip links for efficient navigation', async () => {
      render(<TestPageWithSkipLinks />);
      const user = userEvent.setup();
      
      // Primer tab debe enfocar skip link
      await user.tab();
      const skipLink = document.activeElement as HTMLElement;
      expect(skipLink).toHaveTextContent(/saltar/i);
      
      // Activar skip link
      await user.keyboard('[Enter]');
      
      // Verificar que saltó al contenido principal
      const mainContent = screen.getByRole('main');
      expect(mainContent).toHaveFocus();
    });

    test('should handle custom interactive components', async () => {
      render(<TestCustomComponents />);
      const user = userEvent.setup();
      
      // Verificar que componentes personalizados son navegables
      const customButton = screen.getByRole('button', { name: /custom/i });
      const customSlider = screen.getByRole('slider');
      const customCombobox = screen.getByRole('combobox');

      // Navegar a componente personalizado
      await user.tab();
      expect(document.activeElement).toBe(customButton);
      
      // Verificar que responde a Enter/Space
      await user.keyboard('[Enter]');
      expect(customButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should support arrow key navigation in menus', async () => {
      render(<TestMenuNavigation />);
      const user = userEvent.setup();
      
      const menuButton = screen.getByRole('button', { name: /menú/i });
      
      // Abrir menú
      await user.click(menuButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeVisible();
      
      const menuItems = screen.getAllByRole('menuitem');
      
      // Navegar con flechas
      await user.keyboard('[ArrowDown]');
      expect(menuItems[0]).toHaveFocus();
      
      await user.keyboard('[ArrowDown]');
      expect(menuItems[1]).toHaveFocus();
      
      await user.keyboard('[ArrowUp]');
      expect(menuItems[0]).toHaveFocus();
    });
  });

  describe('interactuarConDispositivosDeAyuda() - Assistive Device Interaction', () => {
    test('should work with switch devices', async () => {
      render(<TestSwitchCompatibility />);
      
      // Simular activación por switch (normalmente Space o Enter)
      const targetButton = screen.getByRole('button', { name: /activar/i });
      
      // Enfocar elemento
      targetButton.focus();
      expect(targetButton).toHaveFocus();
      
      // Activar con Space (común en switches)
      fireEvent.keyDown(targetButton, { key: ' ', code: 'Space' });
      fireEvent.keyUp(targetButton, { key: ' ', code: 'Space' });
      
      expect(targetButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should support eye-tracking devices', async () => {
      render(<TestEyeTrackingCompatibility />);
      
      // Verificar que elementos tienen áreas de activación suficientes
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const area = rect.width * rect.height;
        
        // Mínimo 44x44px según WCAG (1936 px²)
        expect(area).toBeGreaterThanOrEqual(1936);
      });
    });

    test('should work with head-controlled devices', async () => {
      render(<TestHeadControlCompatibility />);
      
      // Verificar que no se requieren gestos complejos
      const dragAndDropElements = screen.queryAllByTestId('drag-drop');
      expect(dragAndDropElements).toHaveLength(0);
      
      // Verificar alternativas para interacciones complejas
      const complexInteractions = screen.getAllByTestId('complex-interaction');
      
      complexInteractions.forEach(element => {
        // Debe tener alternativa simple
        const simpleAlternative = element.querySelector('[data-testid="simple-alternative"]');
        expect(simpleAlternative).toBeInTheDocument();
      });
    });

    test('should support voice control commands', async () => {
      render(<TestVoiceControlCompatibility />);
      
      // Verificar que elementos tienen etiquetas claras para comando de voz
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        const accessibleName = button.getAttribute('aria-label') || 
                              button.textContent || 
                              button.getAttribute('title');
        
        expect(accessibleName).toBeTruthy();
        expect(accessibleName!.length).toBeGreaterThan(2);
        
        // No debe tener texto ambiguo
        expect(accessibleName).not.toMatch(/^(click|here|more|button)$/i);
      });
    });
  });

  describe('dispositivoEsTeclado - Keyboard Device Support', () => {
    test('should work without mouse interactions', async () => {
      render(<TestNoMouseInterface />);
      const user = userEvent.setup();
      
      // Completar toda la interfaz solo con teclado
      
      // 1. Navegar al formulario
      await user.tab();
      const firstInput = document.activeElement as HTMLInputElement;
      expect(firstInput.tagName).toBe('INPUT');
      
      // 2. Llenar formulario
      await user.type(firstInput, 'Juan');
      
      await user.tab();
      await user.type(document.activeElement as HTMLElement, 'juan@email.com');
      
      // 3. Seleccionar opción en dropdown
      await user.tab();
      const select = document.activeElement as HTMLSelectElement;
      await user.selectOptions(select, 'opcion1');
      
      // 4. Enviar formulario
      await user.tab();
      const submitButton = document.activeElement as HTMLElement;
      await user.keyboard('[Enter]');
      
      // Verificar que se completó la acción
      expect(screen.getByText(/enviado/i)).toBeInTheDocument();
    });

    test('should support all keyboard shortcuts', async () => {
      render(<TestKeyboardShortcuts />);
      const user = userEvent.setup();
      
      // Verificar shortcuts comunes
      const shortcuts = [
        { keys: '{Meta>}s', action: 'save' },
        { keys: '{Control>}z', action: 'undo' },
        { keys: '{Escape}', action: 'close' }
      ];

      for (const shortcut of shortcuts) {
        await user.keyboard(shortcut.keys);
        
        const feedback = screen.getByTestId(`${shortcut.action}-feedback`);
        expect(feedback).toBeVisible();
      }
    });

    test('should handle sticky keys compatibility', async () => {
      render(<TestStickyKeysCompatibility />);
      
      // Verificar que no se requieren combinaciones simultáneas complejas
      const shortcuts = screen.getAllByTestId('keyboard-shortcut');
      
      shortcuts.forEach(shortcut => {
        const shortcutText = shortcut.textContent || '';
        
        // No más de 2 teclas simultáneas
        const simultaneousKeys = (shortcutText.match(/\+/g) || []).length + 1;
        expect(simultaneousKeys).toBeLessThanOrEqual(2);
      });
    });
  });

  describe('Motor Limitations Support', () => {
    test('should provide adequate timing for interactions', async () => {
      render(<TestTimingRequirements />);
      const user = userEvent.setup();
      
      // Verificar que hay tiempo suficiente para interacciones
      const timedButton = screen.getByRole('button', { name: /tiempo limitado/i });
      
      // Simular usuario lento
      await user.hover(timedButton);
      
      // Esperar más tiempo del normal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await user.click(timedButton);
      
      // La acción debe seguir siendo válida
      expect(screen.getByText(/acción completada/i)).toBeInTheDocument();
    });

    test('should support click and hold alternatives', async () => {
      render(<TestClickHoldAlternatives />);
      
      // Verificar que acciones de mantener presionado tienen alternativas
      const pressAndHoldElements = screen.getAllByTestId('press-hold');
      
      pressAndHoldElements.forEach(element => {
        // Debe tener alternativa de click simple
        const alternative = element.querySelector('[data-testid="click-alternative"]');
        expect(alternative).toBeInTheDocument();
      });
    });

    test('should minimize required precision', async () => {
      render(<TestPrecisionRequirements />);
      
      // Verificar que objetivos son suficientemente grandes
      const clickTargets = screen.getAllByRole('button');
      
      clickTargets.forEach(target => {
        const rect = target.getBoundingClientRect();
        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Integration Tests - Complete Physical Access', () => {
    test('should support complete site navigation with physical limitations', async () => {
      render(<TestCompletePhysicalAccess />);
      const user = userEvent.setup();
      
      // Simular usuario con limitaciones físicas severas
      
      // 1. Entrar al sitio (solo teclado)
      await user.tab(); // Skip link
      await user.keyboard('[Enter]');
      
      // 2. Navegar por secciones principales
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      
      // 3. Acceder a formulario
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      // 4. Completar tarea compleja solo con teclado
      const inputs = screen.getAllByRole('textbox');
      for (const input of inputs) {
        input.focus();
        await user.type(input, 'test data');
      }
      
      // 5. Enviar y confirmar
      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);
      
      expect(screen.getByRole('alert')).toHaveTextContent(/éxito/i);
    });

    test('should pass comprehensive accessibility audit', async () => {
      const { container } = render(<TestCompletePhysicalAccess />);
      
      const results = await axe(container, {
        rules: {
          'keyboard': { enabled: true },
          'focus-order-semantics': { enabled: true },
          'tabindex': { enabled: true },
          'focusable-content': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });
  });
});

// Componentes de prueba
const TestCompleteApp = () => (
  <div>
    <button>Botón 1</button>
    <a href="#">Enlace 1</a>
    <input type="text" placeholder="Campo de texto" />
    <select><option>Opción 1</option></select>
    <input type="checkbox" />
  </div>
);

const TestFormPage = () => (
  <form>
    <input name="firstName" placeholder="Nombre" />
    <input name="lastName" placeholder="Apellido" />
    <input name="email" type="email" placeholder="Email" />
    <select name="country">
      <option>Colombia</option>
      <option>España</option>
    </select>
    <textarea name="message" placeholder="Mensaje"></textarea>
    <button type="submit">Enviar</button>
  </form>
);

const TestPageWithSkipLinks = () => (
  <div>
    <a href="#main" className="skip-link">Saltar al contenido principal</a>
    <nav>
      <a href="#">Navegación</a>
    </nav>
    <main id="main" tabIndex={-1}>
      <h1>Contenido Principal</h1>
    </main>
  </div>
);

const TestCustomComponents = () => (
  <div>
    <button role="button" aria-pressed="false">Custom Button</button>
    <div role="slider" tabIndex={0} aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}></div>
    <div role="combobox" tabIndex={0} aria-expanded="false"></div>
  </div>
);

const TestMenuNavigation = () => (
  <div>
    <button aria-expanded="false" aria-haspopup="menu">Menú</button>
    <ul role="menu" hidden>
      <li role="menuitem" tabIndex={-1}>Opción 1</li>
      <li role="menuitem" tabIndex={-1}>Opción 2</li>
      <li role="menuitem" tabIndex={-1}>Opción 3</li>
    </ul>
  </div>
);

const TestSwitchCompatibility = () => (
  <div>
    <button aria-pressed="false">Activar</button>
  </div>
);

const TestEyeTrackingCompatibility = () => (
  <div>
    <button style={{width: '44px', height: '44px'}}>Botón Grande</button>
    <button style={{width: '50px', height: '50px'}}>Otro Botón</button>
  </div>
);

const TestHeadControlCompatibility = () => (
  <div>
    <div data-testid="complex-interaction">
      <div data-testid="simple-alternative">
        <button>Alternativa Simple</button>
      </div>
    </div>
  </div>
);

const TestVoiceControlCompatibility = () => (
  <div>
    <button aria-label="Guardar documento">Guardar</button>
    <button aria-label="Abrir archivo">Abrir</button>
    <button aria-label="Cerrar aplicación">Cerrar</button>
  </div>
);

const TestNoMouseInterface = () => (
  <form onSubmit={(e) => { e.preventDefault(); alert('Enviado'); }}>
    <input type="text" placeholder="Nombre" />
    <input type="email" placeholder="Email" />
    <select>
      <option value="opcion1">Opción 1</option>
      <option value="opcion2">Opción 2</option>
    </select>
    <button type="submit">Enviar</button>
  </form>
);

const TestKeyboardShortcuts = () => (
  <div>
    <div data-testid="save-feedback" style={{display: 'none'}}>Guardado</div>
    <div data-testid="undo-feedback" style={{display: 'none'}}>Deshacer</div>
    <div data-testid="close-feedback" style={{display: 'none'}}>Cerrar</div>
  </div>
);

const TestStickyKeysCompatibility = () => (
  <div>
    <span data-testid="keyboard-shortcut">Ctrl+S</span>
    <span data-testid="keyboard-shortcut">Alt+F</span>
    <span data-testid="keyboard-shortcut">F1</span>
  </div>
);

const TestTimingRequirements = () => (
  <div>
    <button>Tiempo Limitado</button>
    <div style={{display: 'none'}}>Acción completada</div>
  </div>
);

const TestClickHoldAlternatives = () => (
  <div>
    <div data-testid="press-hold">
      <button>Mantener presionado</button>
      <button data-testid="click-alternative">Alternativa de click</button>
    </div>
  </div>
);

const TestPrecisionRequirements = () => (
  <div>
    <button style={{width: '44px', height: '44px'}}>44x44</button>
    <button style={{width: '48px', height: '48px'}}>48x48</button>
  </div>
);

const TestCompletePhysicalAccess = () => (
  <div>
    <a href="#main" className="skip-link">Saltar al contenido</a>
    <nav role="navigation">
      <a href="#">Inicio</a>
      <a href="#">Guía</a>
    </nav>
    <main id="main">
      <form role="form">
        <input type="text" aria-label="Nombre" />
        <input type="email" aria-label="Email" />
        <button type="submit">Enviar</button>
      </form>
    </main>
    <div role="alert" style={{display: 'none'}}>Éxito</div>
  </div>
);

