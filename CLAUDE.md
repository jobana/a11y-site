# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint (includes jsx-a11y rules)
npm run test         # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage            # Coverage report (80% threshold enforced)
npm run test:accessibility       # Run only tests/accessibility/
npm run test:ci                  # CI mode with coverage
```

## Architecture

**Next.js 15.5 App Router** with React 19. Path alias `@/*` maps to `./src/*`.

### Content System

All page content lives in `/content/` as Markdown files with YAML front matter. Required front matter fields: `title`, `description`. Optional: `slug`, `category`, `tags`, `order`, `isPublished`.

Content is loaded server-side via `src/lib/markdown.ts` using `gray-matter` (front matter) + `marked` (HTML). `getContentItem(filePath)` loads a single file; `getContentByCategory(category)` loads all published items sorted by `order`.

Site navigation structure is defined in `getSiteNavigation()` in `src/lib/markdown.ts`.

### Layout Hierarchy

Pages are wrapped in a layout chain:
- `MainLayout` — root wrapper with skip links + collapsible sidebar
- `ContentLayout` — two-column layout (content + auto-generated Table of Contents)
- `HomePageLayout` / `InternalPageLayout` — page-specific variants

The Table of Contents is auto-generated from heading elements in rendered content.

### Component Organization

```
src/components/
├── layout/        # MainLayout, ContentLayout, HomePageLayout
├── navigation/    # Sidebar, TOC, nav items
├── accessibility/ # SkipLinks
└── ui/            # Button, Card, Accordion, Tabs, Icon
```

UI components follow WAI-ARIA patterns. `Icon` accepts `aria-label` or renders as decorative. `Accordion` and `Tabs` support keyboard navigation.

### Styling

Tailwind CSS with a Carbon Design System-inspired color palette. Colors are defined as CSS variables and exposed via Tailwind tokens:

- `primary-{10..100}` — pink scale
- `secondary-{10..100}` — blue-violet scale
- `tertiary-{10..100}` — teal scale

Use light tones (10–30) for backgrounds, medium tones (40–60) for interactive elements, dark tones (70–100) for text. All tones are validated for WCAG AA contrast.

Always use Tailwind color tokens (`text-primary-80`, `bg-secondary-10`) or CSS variables (`var(--primary-80)`) — never hardcode color values.

### Utilities (`src/lib/utils.ts`)

- `cn()` — merge Tailwind classes (clsx + tailwind-merge)
- `generateId()` — unique IDs for accessibility attributes
- `focusUtils` — focus trap and focusable element queries
- `keyboardUtils` — arrow key and activation key helpers

### Testing

Tests live in `/tests/`. Accessibility tests in `tests/accessibility/` use `jest-axe`. Coverage thresholds are 80% for all metrics. Test timeout is 10s (for axe checks).

## CSS Rules

- Never use `!important`
- No inline styles
- Use project CSS variables or Tailwind tokens before hardcoding values
