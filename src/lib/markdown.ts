import { marked } from 'marked';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { ContentItem, ContentMetadata } from '@/types/content';

// Configuración de marked para seguridad y accesibilidad
marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * Obtiene el directorio de contenido base
 */
export function getContentDirectory(): string {
  return path.join(process.cwd(), 'content');
}

/**
 * Lee y procesa un archivo Markdown
 */
export async function getContentItem(filePath: string): Promise<ContentItem | null> {
  try {
    const fullPath = path.join(getContentDirectory(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validar metadatos requeridos
    if (!data.title || !data.description) {
      throw new Error(`Metadatos incompletos en: ${filePath}`);
    }

    const metadata: ContentMetadata = {
      title: data.title,
      description: data.description,
      slug: data.slug || path.basename(filePath, '.md'),
      category: data.category || 'general',
      icon: data.icon,
      tags: data.tags || [],
      author: data.author,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      isPublished: data.isPublished !== false,
      order: data.order || 0,
      readingTime: calculateReadingTime(content),
    };

    const processedContent = await marked(content);
    const excerpt = generateExcerpt(content);

    return {
      metadata,
      content: processedContent,
      excerpt,
    };
  } catch (error) {
    console.error(`Error procesando archivo: ${filePath}`, error);
    return null;
  }
}

/**
 * Obtiene todos los archivos de contenido de una categoría
 */
export async function getContentByCategory(category: string): Promise<ContentItem[]> {
  try {
    const categoryPath = path.join(getContentDirectory(), category);
    
    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(category, file));

    const contentPromises = files.map(file => getContentItem(file));
    const contentItems = await Promise.all(contentPromises);

    return contentItems
      .filter((item): item is ContentItem => item !== null)
      .filter(item => item.metadata.isPublished)
      .sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0));
  } catch (error) {
    console.error(`Error obteniendo contenido de categoría: ${category}`, error);
    return [];
  }
}

/**
 * Búsqueda de contenido
 */
export async function searchContent(query: string, category?: string): Promise<ContentItem[]> {
  const searchTerm = query.toLowerCase();
  const categories = category ? [category] : ['generalidades', 'fases', 'recursos'];
  
  const allContent: ContentItem[] = [];
  
  for (const cat of categories) {
    const categoryContent = await getContentByCategory(cat);
    allContent.push(...categoryContent);
  }

  return allContent.filter(item => 
    item.metadata.title.toLowerCase().includes(searchTerm) ||
    item.metadata.description.toLowerCase().includes(searchTerm) ||
    item.metadata.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    item.content.toLowerCase().includes(searchTerm)
  );
}

/**
 * Calcula el tiempo de lectura estimado
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Genera un extracto del contenido
 */
function generateExcerpt(content: string, maxLength: number = 160): string {
  const text = content.replace(/[#*`\[\]]/g, '').trim();
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Obtiene la estructura de navegación del sitio
 */
export async function getSiteNavigation() {
  const navigation = [
    {
      id: 'inicio',
      title: 'Inicio',
      href: '/',
      description: 'Página principal del sitio'
    },
    {
      id: 'generalidades',
      title: 'Generalidades',
      href: '/generalidades',
      description: 'Conceptos básicos de accesibilidad web'
    },
    {
      id: 'fases',
      title: 'Fases del Ciclo de Vida',
      href: '/fases',
      description: 'Accesibilidad en cada fase del desarrollo',
      children: [
        { title: 'Planeación', href: '/fases/planeacion', description: 'Requisitos y planificación accesible' },
        { title: 'Diseño', href: '/fases/diseño', description: 'Principios de diseño inclusivo' },
        { title: 'Desarrollo', href: '/fases/desarrollo', description: 'Implementación de código accesible' },
        { title: 'Pruebas', href: '/fases/pruebas', description: 'Testing y validación de accesibilidad' },
        { title: 'Despliegue', href: '/fases/despliegue', description: 'Mantenimiento y monitoreo' }
      ]
    },
    {
      id: 'documentacion',
      title: 'Documentación',
      href: '/documentacion',
      description: 'Herramientas de documentación y seguimiento'
    },
    {
      id: 'autoevaluacion',
      title: 'Autoevaluación',
      href: '/autoevaluacion',
      description: 'Tests y checklists de accesibilidad'
    },
    {
      id: 'recursos',
      title: 'Recursos',
      href: '/recursos',
      description: 'Guías, herramientas y referencias'
    },
    {
      id: 'contacto',
      title: 'Contacto',
      href: '/contacto',
      description: 'Soporte y sugerencias'
    }
  ];

  return navigation;
}
