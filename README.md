# InteliMaris Marketing Website (Vue 3)

> Next-generation maritime IoT platform website built with Vue 3, TypeScript, and Vite

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:5173/

## Features

🎨 **Dual Theme** - Dark and light modes with smooth transitions  
🌍 **Multi-language** - English, Spanish, and Greek  
🎬 **Animated Canvas** - Ocean background with particles and vessels  
📱 **Fully Responsive** - Mobile-first design  
⚡ **Fast** - Vite-powered development and builds  
🔒 **Type-safe** - Full TypeScript coverage  

## Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety
- **Vite** - Lightning-fast builds
- **CSS Variables** - Dynamic theming
- **Canvas API** - Animated backgrounds

## Project Structure

```
src/
├── components/          # 14 section components
├── composables/         # Reusable logic (theme, i18n, canvas)
├── i18n/                # Translations (EN/ES/EL)
├── utils/               # Helper functions
├── assets/              # Styles (36KB CSS)
├── App.vue              # Root component
└── main.ts              # Entry point
```

## Build & Deploy

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run build
git checkout gh-pages
rm -rf * && cp -r dist/* .
git add -A && git commit -m "Deploy" && git push
git checkout main
```

## Live Site

**https://buengenio.github.io/InteliMaris-2.0/**

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [VUE_MIGRATION_COMPLETE.md](./VUE_MIGRATION_COMPLETE.md) - Migration details
- [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) - Build information

## Development

The site uses composables for shared logic:

- `useTheme()` - Theme switching with persistence
- `useI18n()` - Multi-language support
- `useOceanCanvas()` - Animated background

All components use the Composition API with TypeScript for type safety and better developer experience.

## License

© 2026 InteliMaris. All rights reserved.
