# Morecare Mobility — Vite Multi-Page E-Commerce

A vanilla JavaScript e-commerce website for Morecare Mobility & Rehabilitation Solutions, built with Vite.

## Features

- **Multi-page architecture**: Home, Product Detail, Kids, Adults, About, Contact
- **Shopping Cart**: Persistent cart drawer with localStorage, quantity controls, free shipping progress
- **Product Catalog**: 25 SKUs (12 CP Kids + 13 Adults) with SVG graphics, ratings, sizes
- **Quick View Modal**: Product preview with size selection & add-to-cart
- **Mobile Navigation**: Sidebar menu, bottom nav with draggable indicator, mega-dropdowns
- **Video Testimonials**: YouTube carousel with lightbox
- **Instagram Reels**: Embedded reels with modal viewer
- **FAQ Accordion**: Accessible with keyboard support
- **Scroll Reveal**: IntersectionObserver-based animations
- **Responsive Design**: Fluid typography/spacing (clamp), desktop zoom reduction

## Tech Stack

- **Vite 5.4** (ESM modules, multi-page build)
- **Vanilla JavaScript** (no frameworks)
- **CSS Variables** (design tokens with brand palette)
- **Google Fonts**: Montserrat, Poppins, Open Sans, Lato

## Getting Started

```bash
# Install dependencies
npm install

# Development server (opens in Microsoft Edge on port 5174)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── index.html          # Homepage
├── product.html        # Product detail page
├── kids.html           # CP Kids product listing
├── adults.html         # Adults product listing
├── about.html          # About page
├── contact.html        # Contact page
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.js         # Homepage entry point
│   ├── product.js      # Product page entry point
│   ├── utils/
│   │   ├── products.js # Product catalog (25 SKUs)
│   │   └── reels.js    # Instagram reels data
│   ├── components/
│   │   ├── layout/     # Cart, Sidebar
│   │   ├── sections/   # Slider, FAQ, Reels
│   │   ├── product/    # QuickView
│   │   └── ui/         # ScrollReveal
│   └── styles/
│       ├── variables.css   # Design tokens
│       ├── reset.css       # CSS reset
│       ├── layout.css      # Layout utilities
│       ├── components.css  # Component styles
│       ├── sections.css    # Section styles
│       └── animations.css  # Animations
└── public/             # Static assets (images, icons)
```

## Deployment

The `npm run build` command outputs to `dist/` with all HTML pages and bundled assets. Deploy the `dist/` folder to any static hosting (Netlify, Vercel, GitHub Pages, etc.).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 5174 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |