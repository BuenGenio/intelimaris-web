# InteliMaris Vue 3 Website - Deployment Guide

## Project Overview

This is the Vue 3 + TypeScript + Vite version of the InteliMaris marketing website.

## Features

- **Vue 3 Composition API** with TypeScript
- **Dual Theme Support** (Dark/Light modes)
- **Multi-language** (English, Spanish, Greek)
- **Animated Ocean Canvas** (particles, waves, vessels)
- **14 Section Components** (fully responsive)
- **Type-safe** translations and theme management
- **Production optimized** with Vite

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
website-vue/
├── src/
│   ├── components/          # 14 section components
│   │   ├── Navigation.vue
│   │   ├── HeroSection.vue
│   │   ├── ProblemSection.vue
│   │   ├── OpportunitySection.vue
│   │   ├── PlatformSection.vue
│   │   ├── CapabilitiesSection.vue
│   │   ├── SensorsSection.vue
│   │   ├── DashboardSection.vue
│   │   ├── AutomationSection.vue
│   │   ├── ArchitectureSection.vue
│   │   ├── VisionSection.vue
│   │   ├── UseCasesSection.vue
│   │   ├── BusinessSection.vue
│   │   ├── ClosingSection.vue
│   │   └── FooterSection.vue
│   ├── composables/         # Reusable logic
│   │   ├── useTheme.ts
│   │   ├── useI18n.ts
│   │   └── useOceanCanvas.ts
│   ├── i18n/                # Translations
│   │   └── translations.ts
│   ├── utils/               # Helper functions
│   │   └── scroll.ts
│   ├── assets/              # Styles
│   │   └── main.css
│   ├── App.vue              # Root component
│   └── main.ts              # Entry point
├── public/
│   └── assets/              # Static assets
│       ├── logo.png
│       ├── flag-us.svg
│       ├── flag-es.svg
│       └── flag-gr.svg
└── dist/                    # Production build (generated)
```

## Deployment to GitHub Pages

The production build is automatically deployed to the `gh-pages` branch.

### Manual Deployment

```bash
# Build the project
npm run build

# Switch to gh-pages branch
git checkout gh-pages

# Copy dist files
rm -rf *
cp -r dist/* .

# Commit and push
git add -A
git commit -m "Deploy Vue 3 website"
git push origin gh-pages

# Switch back to main
git checkout main
```

### Live Site

https://buengenio.github.io/InteliMaris-2.0/

## Key Technologies

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Composition API** - Modern Vue patterns
- **CSS Variables** - Theme switching
- **Canvas API** - Animated backgrounds
- **LocalStorage** - Persist user preferences

## Customization

### Adding a New Language

1. Add translations to `src/i18n/translations.ts`
2. Add language to `supportedLangs` array
3. Add flag SVG to `public/assets/`
4. Update `langData` in `Navigation.vue`

### Modifying Themes

Edit CSS variables in `src/assets/main.css`:
- `:root` - Dark theme
- `[data-theme="light"]` - Light theme

### Adding New Sections

1. Create component in `src/components/`
2. Import and add to `App.vue`
3. Add translations to `translations.ts`

## Performance

- **First Load**: ~200KB JS (gzipped: ~65KB)
- **CSS**: ~30KB (gzipped: ~5.5KB)
- **Images**: 4 SVG flags + 1 PNG logo
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox
- Canvas API
