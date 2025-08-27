# 🎨 Guía de Uso de Iconos Lucide React

## 📦 Instalación

La librería ya está instalada en el proyecto:

```bash
npm install lucide-react
```

## 🚀 Uso Básico

### Importación Centralizada

Todos los iconos se importan desde `@/components/ui`:

```tsx
import { Icon, BookOpen, Search, Scale } from '@/components/ui'
```

### Componente Icon Wrapper

Usa el componente `Icon` para consistencia y accesibilidad:

```tsx
// Básico
<Icon icon={BookOpen} />

// Con tamaño predefinido
<Icon icon={Search} size="lg" />

// Con estilos personalizados
<Icon icon={Scale} size="xl" className="text-primary-60" />

// Con accesibilidad
<Icon 
  icon={CheckSquare2} 
  size="md" 
  aria-label="Lista completada" 
/>

// Decorativo (oculto de screen readers)
<Icon 
  icon={Zap} 
  size="sm" 
  decorative 
  className="text-yellow-500" 
/>
```

## 📏 Tamaños Disponibles

| Tamaño | Píxeles | Uso Recomendado |
|--------|---------|-----------------|
| `xs`   | 12px    | Iconos pequeños en texto |
| `sm`   | 16px    | Botones pequeños |
| `md`   | 20px    | Uso general (default) |
| `lg`   | 24px    | Headers, elementos destacados |
| `xl`   | 32px    | Iconos principales, heroes |

## 🎨 Ejemplos por Contexto

### En Cards
```tsx
<CardHeader 
  title="Título"
  icon={<Icon icon={BookOpen} size="lg" className="text-primary-60" />}
/>
```

### En Botones
```tsx
<Button variant="primary">
  <Icon icon={Download} size="sm" className="mr-2" />
  Descargar
</Button>
```

### En Navegación
```tsx
<nav>
  <Link href="/home">
    <Icon icon={Home} size="md" aria-label="Inicio" />
  </Link>
</nav>
```

## ♿ Accesibilidad

### Iconos Informativos
```tsx
// Siempre incluye aria-label
<Icon 
  icon={AlertTriangle} 
  aria-label="Advertencia: Revisa los errores" 
/>
```

### Iconos Decorativos
```tsx
// Marca como decorativo para ocultar de screen readers
<Icon 
  icon={Star} 
  decorative 
  className="text-yellow-400" 
/>
```

## 🎯 Iconos Implementados

### Ya en Uso (Página de Inicio)
- `Scale` - Imperativos legales
- `Zap` - Eficiencia e innovación  
- `BookOpen` - Fundamentos esenciales
- `CheckSquare2` - Checklists
- `Search` - Accesibilidad del sitio

### Disponibles para Uso
- Navegación: `Home`, `Menu`, `ChevronDown`, `ArrowLeft`, `ArrowRight`
- Contenido: `FileText`, `Info`, `HelpCircle`
- Acciones: `Download`, `Upload`, `Copy`, `Check`
- Accesibilidad: `Accessibility`, `Volume2`, `Keyboard`, `Monitor`
- Desarrollo: `Code`, `Terminal`, `Settings`, `Bug`, `Rocket`
- Estados: `CheckCircle`, `AlertCircle`, `Star`, `Award`

## 🔄 Próximos Pasos

1. ✅ Reemplazar emojis en navegación principal
2. ⏳ Actualizar iconos en páginas de fases
3. ⏳ Implementar en formularios y controles
4. ⏳ Agregar iconos de estado para feedback

## 📚 Recursos

- **Galería Completa:** https://lucide.dev/icons/
- **Documentación:** https://lucide.dev/guide/
- **GitHub:** https://github.com/lucide-icons/lucide

