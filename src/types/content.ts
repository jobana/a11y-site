export interface ContentMetadata {
  title: string;
  description: string;
  slug: string;
  category: string;
  icon?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
  order?: number;
  readingTime?: number;
}

export interface ContentItem {
  metadata: ContentMetadata;
  content: string;
  excerpt?: string;
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
  order?: number;
  isExternal?: boolean;
}

export interface SiteSection {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted?: boolean;
  role?: string[]; // Dev, UX, QA, etc.
}

export interface AccessibilityTest {
  id: string;
  title: string;
  description: string;
  type: 'manual' | 'automated' | 'combined';
  tools: string[];
  steps: string[];
  expectedOutcome: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'guide' | 'tool' | 'documentation' | 'course' | 'community';
  isOfficial?: boolean;
  isFree?: boolean;
}
