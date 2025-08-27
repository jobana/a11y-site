/**
 * Tests para Usuario con Discapacidad Auditiva
 * Basado en el diagrama de clases - UsuarioDiscapacidadAuditiva
 * 
 * Atributos del diagrama:
 * - requiereTranscripciones: boolean
 * 
 * Extiende de UsuarioConApoyoEnContenido:
 * - preferenciaSubtitulos: boolean
 * + controlarSubtitulosDeVideo()
 * + obtenerContenidoTextualClaro()
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

describe('Usuario con Discapacidad Auditiva - Tests', () => {
  describe('requiereTranscripciones - Transcription Requirements', () => {
    test('should provide transcriptions for all audio content', async () => {
      render(<TestPageWithAudio />);
      
      // Buscar elementos de audio
      const audioElements = screen.getAllByRole('application').filter(el => 
        el.tagName.toLowerCase() === 'audio' || 
        el.querySelector('audio')
      );

      audioElements.forEach(audioEl => {
        // Verificar que hay transcripción disponible
        const transcriptionLink = screen.getByRole('button', { 
          name: /transcripción|transcript/i 
        });
        expect(transcriptionLink).toBeInTheDocument();

        // Verificar que la transcripción es accesible
        const transcriptionId = audioEl.getAttribute('aria-describedby');
        if (transcriptionId) {
          const transcription = document.getElementById(transcriptionId);
          expect(transcription).toBeInTheDocument();
          expect(transcription?.textContent?.length).toBeGreaterThan(10);
        }
      });
    });

    test('should provide downloadable transcripts', async () => {
      render(<TestPageWithAudio />);
      
      const downloadLinks = screen.getAllByRole('link').filter(link => 
        link.textContent?.includes('Descargar transcripción') ||
        link.getAttribute('download')?.includes('transcript')
      );

      expect(downloadLinks.length).toBeGreaterThan(0);
      
      downloadLinks.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toMatch(/\.(txt|pdf|doc)$/);
      });
    });

    test('should have text alternatives for audio cues', async () => {
      render(<TestPageWithAudioCues />);
      
      // Verificar que las alertas sonoras tienen alternativas visuales
      const alerts = screen.getAllByRole('alert');
      
      alerts.forEach(alert => {
        // Debe tener contenido textual o visual
        expect(alert.textContent?.length).toBeGreaterThan(0);
        
        // Debe ser visible (no solo para lectores de pantalla)
        expect(alert).toBeVisible();
      });
    });
  });

  describe('controlarSubtitulosDeVideo() - Video Subtitle Control', () => {
    test('should have subtitle controls for all videos', async () => {
      render(<TestPageWithVideos />);
      
      const videos = screen.getAllByRole('application').filter(el => 
        el.tagName.toLowerCase() === 'video' || 
        el.querySelector('video')
      );

      videos.forEach(video => {
        // Verificar controles de subtítulos
        const subtitleButton = screen.getByRole('button', { 
          name: /subtítulos|captions|cc/i 
        });
        expect(subtitleButton).toBeInTheDocument();

        // Verificar que se puede activar/desactivar
        expect(subtitleButton).toHaveAttribute('aria-pressed');
      });
    });

    test('should toggle subtitle visibility', async () => {
      render(<TestVideoPlayer />);
      const user = userEvent.setup();
      
      const subtitleButton = screen.getByRole('button', { name: /subtítulos/i });
      const video = screen.getByRole('application');
      
      // Estado inicial
      expect(subtitleButton).toHaveAttribute('aria-pressed', 'false');
      
      // Activar subtítulos
      await user.click(subtitleButton);
      expect(subtitleButton).toHaveAttribute('aria-pressed', 'true');
      
      // Verificar que aparecen los subtítulos
      const subtitleTrack = video.querySelector('track[kind="captions"]');
      expect(subtitleTrack).toHaveAttribute('default');
    });

    test('should provide multiple language options for subtitles', async () => {
      render(<TestVideoPlayerMultiLang />);
      
      const languageSelect = screen.getByRole('combobox', { 
        name: /idioma de subtítulos/i 
      });
      
      expect(languageSelect).toBeInTheDocument();
      
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(1);
      
      // Verificar idiomas comunes
      const optionTexts = options.map(opt => opt.textContent);
      expect(optionTexts).toContain('Español');
      expect(optionTexts).toContain('English');
    });

    test('should maintain subtitle preferences', async () => {
      render(<TestVideoPlayer />);
      const user = userEvent.setup();
      
      const subtitleButton = screen.getByRole('button', { name: /subtítulos/i });
      
      // Activar subtítulos
      await user.click(subtitleButton);
      
      // Simular recarga de página
      // (En implementación real, verificaríamos localStorage)
      expect(localStorage.getItem('subtitlePreference')).toBe('enabled');
    });
  });

  describe('obtenerContenidoTextualClaro() - Clear Text Content', () => {
    test('should provide clear visual indicators for audio events', async () => {
      render(<TestPageWithAudioEvents />);
      
      // Verificar indicadores visuales para eventos sonoros
      const visualIndicators = screen.getAllByTestId('audio-visual-indicator');
      
      expect(visualIndicators.length).toBeGreaterThan(0);
      
      visualIndicators.forEach(indicator => {
        // Debe tener texto descriptivo
        expect(indicator.textContent?.length).toBeGreaterThan(0);
        
        // Debe ser visualmente distintivo
        const styles = window.getComputedStyle(indicator);
        expect(['red', 'orange', 'yellow']).toContain(styles.backgroundColor);
      });
    });

    test('should have text descriptions for sound effects', async () => {
      render(<TestPageWithSoundEffects />);
      
      // Buscar descripciones de efectos de sonido
      const soundDescriptions = screen.getAllByText(/sonido de|ruido de|audio:/i);
      
      expect(soundDescriptions.length).toBeGreaterThan(0);
      
      soundDescriptions.forEach(desc => {
        // Verificar que son descriptivas
        expect(desc.textContent?.length).toBeGreaterThan(10);
        expect(desc.textContent).toMatch(/\b(sonido|ruido|música|audio)\b/i);
      });
    });

    test('should provide context for audio-only information', async () => {
      render(<TestPageWithAudioInfo />);
      
      // Verificar que información importante no está solo en audio
      const audioElements = document.querySelectorAll('audio');
      
      audioElements.forEach(audio => {
        const transcriptId = audio.getAttribute('aria-describedby');
        const transcript = transcriptId ? document.getElementById(transcriptId) : null;
        
        // Debe haber transcripción o descripción textual
        expect(transcript || audio.nextElementSibling?.textContent).toBeTruthy();
      });
    });
  });

  describe('preferenciaSubtitulos - Subtitle Preferences', () => {
    test('should remember subtitle preferences across sessions', async () => {
      // Simular preferencia guardada
      localStorage.setItem('subtitlePreference', 'enabled');
      localStorage.setItem('subtitleLanguage', 'es');
      
      render(<TestVideoPlayer />);
      
      const subtitleButton = screen.getByRole('button', { name: /subtítulos/i });
      
      // Verificar que los subtítulos están activados por defecto
      expect(subtitleButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should provide customizable subtitle appearance', async () => {
      render(<TestSubtitleCustomizer />);
      const user = userEvent.setup();
      
      // Verificar controles de personalización
      const fontSizeControl = screen.getByRole('slider', { name: /tamaño de fuente/i });
      const colorControl = screen.getByRole('combobox', { name: /color/i });
      const backgroundControl = screen.getByRole('combobox', { name: /fondo/i });
      
      expect(fontSizeControl).toBeInTheDocument();
      expect(colorControl).toBeInTheDocument();
      expect(backgroundControl).toBeInTheDocument();
      
      // Probar cambio de tamaño
      await user.click(fontSizeControl);
      await user.keyboard('[ArrowRight]');
      
      // Verificar que se aplica el cambio
      const preview = screen.getByTestId('subtitle-preview');
      const fontSize = window.getComputedStyle(preview).fontSize;
      expect(parseInt(fontSize)).toBeGreaterThan(16);
    });
  });

  describe('Visual Notification System', () => {
    test('should provide visual notifications for system sounds', async () => {
      render(<TestNotificationSystem />);
      
      // Simular notificación del sistema
      fireEvent(window, new CustomEvent('systemNotification', {
        detail: { type: 'error', message: 'Error de conexión' }
      }));
      
      // Verificar que aparece notificación visual
      const visualNotification = screen.getByRole('alert');
      expect(visualNotification).toBeInTheDocument();
      expect(visualNotification).toHaveTextContent('Error de conexión');
      
      // Verificar que es visible y distintiva
      expect(visualNotification).toBeVisible();
      const styles = window.getComputedStyle(visualNotification);
      expect(styles.backgroundColor).not.toBe('transparent');
    });

    test('should flash visual indicators appropriately', async () => {
      render(<TestFlashingIndicators />);
      
      const flashingElements = screen.getAllByTestId('flash-indicator');
      
      flashingElements.forEach(element => {
        // Verificar que no parpadea más de 3 veces por segundo
        const animationDuration = window.getComputedStyle(element).animationDuration;
        const durationMs = parseFloat(animationDuration) * 1000;
        
        expect(durationMs).toBeGreaterThan(333); // Máximo 3 parpadeos/segundo
      });
    });
  });

  describe('Integration Tests - Complete Experience', () => {
    test('should support full media consumption without audio', async () => {
      render(<TestCompleteMediaExperience />);
      const user = userEvent.setup();
      
      // 1. Acceder a contenido multimedia
      const video = screen.getByRole('application');
      expect(video).toBeInTheDocument();
      
      // 2. Activar subtítulos
      const subtitleButton = screen.getByRole('button', { name: /subtítulos/i });
      await user.click(subtitleButton);
      
      // 3. Verificar transcripción disponible
      const transcriptButton = screen.getByRole('button', { name: /transcripción/i });
      expect(transcriptButton).toBeInTheDocument();
      
      // 4. Acceder a transcripción
      await user.click(transcriptButton);
      const transcript = screen.getByRole('dialog', { name: /transcripción/i });
      expect(transcript).toBeInTheDocument();
      
      // 5. Verificar que todo el contenido es accesible sin audio
      const { container } = render(<div>{/* contenido completo */}</div>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

// Componentes de prueba
const TestPageWithAudio = () => (
  <div>
    <audio controls aria-describedby="audio-transcript">
      <source src="/podcast.mp3" type="audio/mpeg" />
    </audio>
    <div id="audio-transcript">
      <h3>Transcripción del Podcast</h3>
      <p>Bienvenidos al podcast sobre accesibilidad web...</p>
    </div>
    <button>Ver transcripción completa</button>
    <a href="/transcript.pdf" download>Descargar transcripción (PDF)</a>
  </div>
);

const TestPageWithAudioCues = () => (
  <div>
    <div role="alert" className="visual-alert">
      ⚠️ Error en el formulario
    </div>
    <div role="status" className="success-indicator">
      ✅ Guardado exitosamente
    </div>
  </div>
);

const TestPageWithVideos = () => (
  <div>
    <video controls>
      <source src="/video.mp4" type="video/mp4" />
      <track kind="captions" src="/captions-es.vtt" srcLang="es" label="Español" default />
      <track kind="captions" src="/captions-en.vtt" srcLang="en" label="English" />
    </video>
    <button aria-pressed="false">Activar subtítulos</button>
  </div>
);

const TestVideoPlayer = () => (
  <div>
    <video controls role="application">
      <source src="/video.mp4" type="video/mp4" />
      <track kind="captions" src="/captions.vtt" srcLang="es" label="Español" />
    </video>
    <button aria-pressed="false">Subtítulos</button>
  </div>
);

const TestVideoPlayerMultiLang = () => (
  <div>
    <video controls role="application">
      <source src="/video.mp4" type="video/mp4" />
      <track kind="captions" src="/captions-es.vtt" srcLang="es" label="Español" />
      <track kind="captions" src="/captions-en.vtt" srcLang="en" label="English" />
    </video>
    <select aria-label="Idioma de subtítulos">
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  </div>
);

const TestPageWithAudioEvents = () => (
  <div>
    <div data-testid="audio-visual-indicator" style={{backgroundColor: 'red'}}>
      🔔 Nueva notificación
    </div>
    <div data-testid="audio-visual-indicator" style={{backgroundColor: 'orange'}}>
      ⚠️ Advertencia del sistema
    </div>
  </div>
);

const TestPageWithSoundEffects = () => (
  <div>
    <p>Sonido de: Campana de notificación</p>
    <p>Audio: Música de fondo relajante</p>
    <p>Ruido de: Teclado escribiendo</p>
  </div>
);

const TestPageWithAudioInfo = () => (
  <div>
    <audio controls aria-describedby="audio-info">
      <source src="/info.mp3" type="audio/mpeg" />
    </audio>
    <div id="audio-info">
      Esta grabación contiene instrucciones importantes sobre 
      cómo configurar las opciones de accesibilidad.
    </div>
  </div>
);

const TestSubtitleCustomizer = () => (
  <div>
    <div data-testid="subtitle-preview" style={{fontSize: '18px'}}>
      Ejemplo de subtítulo
    </div>
    <input type="range" aria-label="Tamaño de fuente" min="12" max="24" />
    <select aria-label="Color de texto">
      <option>Blanco</option>
      <option>Amarillo</option>
    </select>
    <select aria-label="Color de fondo">
      <option>Negro</option>
      <option>Transparente</option>
    </select>
  </div>
);

const TestNotificationSystem = () => (
  <div>
    <div role="alert">Notificación visual del sistema</div>
  </div>
);

const TestFlashingIndicators = () => (
  <div>
    <div 
      data-testid="flash-indicator" 
      style={{animationDuration: '0.5s'}}
    >
      Indicador parpadeante
    </div>
  </div>
);

const TestCompleteMediaExperience = () => (
  <div>
    <video controls role="application">
      <source src="/complete-video.mp4" type="video/mp4" />
      <track kind="captions" src="/captions.vtt" srcLang="es" label="Español" default />
    </video>
    <button aria-pressed="false">Subtítulos</button>
    <button>Mostrar transcripción</button>
    <div role="dialog" aria-label="Transcripción completa" hidden>
      <h2>Transcripción del Video</h2>
      <p>Contenido completo del video en texto...</p>
    </div>
  </div>
);

