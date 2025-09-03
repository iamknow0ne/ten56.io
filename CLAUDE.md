# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TEN56.IO ONEPAGER is a static website for the band TEN56., built as a complete refactoring of a Canva-exported site. The project uses vanilla HTML/CSS/JavaScript with modern web standards and external integrations for music, merchandise, and social media.

## Architecture

### Core Structure
- **index.html**: Single-page application with semantic HTML sections
- **css/**: Modular CSS architecture with custom properties
  - `main.css`: Core styles, variables, and layout systems
  - `components.css`: Interactive elements and animations
  - `responsive.css`: Mobile-first responsive breakpoints
- **js/**: Vanilla JavaScript modules
  - `main.js`: Navigation, scroll animations, intersection observers
  - `embeds.js`: External API management (YouTube, Bandsintown, Instagram, Linktree)

### CSS Architecture
Uses CSS custom properties (CSS variables) extensively in `:root` for maintainability:
- Color system: `--color-dark-red`, `--color-cream`, `--color-gray`, etc.
- Typography: `--font-primary` (Inter), weight variables
- Spacing: `--spacing-xs` through `--spacing-3xl`
- Layout: `--container-max-width`, `--container-padding`

### JavaScript Architecture
- **IIFE pattern**: All modules wrapped in immediately invoked function expressions
- **Class-based managers**: `YouTubeEmbedManager`, `BandsintownManager`, `InstagramManager`
- **Configuration objects**: Centralized config for breakpoints, delays, API endpoints
- **Error handling**: Comprehensive fallback systems for external embeds

## Key External Integrations

### YouTube API Integration
- Uses YouTube IFrame Player API for video management
- Lazy loading and performance optimization
- Fallback to static embeds on API failures

### Bandsintown Widget
- Embedded tour dates and ticket links
- URL: https://bnds.us/xcotv3
- Fallback to direct social media links

### Linktree Integration  
- Music streaming and social links aggregation
- URL: https://ten56.lnk.to/I-O
- Embedded iframe with error handling

### Instagram Feed (Placeholder)
- Carousel implementation ready for Instagram Basic Display API
- Currently uses placeholder images
- Account: @ten56hq

## Development Workflow

### Local Development
```bash
# Serve locally (no build process required)
python -m http.server 8000
# or
npx live-server
```

### Testing External Embeds
External integrations may fail due to CORS policies in local development. Test on deployed version for full functionality.

### Image Assets
- Images organized in `images/` subdirectories by section
- Original Canva exports in `EXPORTS/` directory
- Optimize images for web before deployment (WebP recommended)

## Deployment

### GitHub Pages
- Automatic deployment from main branch
- Custom domain: op.ten56.io (requires DNS configuration)
- No build process - static files served directly

### Known Deployment Requirements
- Replace placeholder YouTube video IDs with actual content
- Verify all external embed URLs are functional
- Test responsive design across devices
- Validate HTML/CSS before deployment

## Code Patterns

### CSS Naming Convention
- BEM methodology: `.section__element--modifier`
- Component-based organization
- Responsive utilities with consistent breakpoints

### JavaScript Patterns
- Configuration objects at module top
- Debounced/throttled event handlers for performance
- Intersection Observer API for scroll animations
- Progressive enhancement approach

### Error Handling
- Graceful degradation for failed external embeds
- Fallback content for all third-party integrations
- Console logging for debugging embed issues

## Important URLs and Endpoints

### Store Links
- EU Store: https://www.outoflineshop.de/ten56/
- US Store: https://www.visionmerch.com/outoflinemusic/ten56/
- Apparel: https://ten56apparel.com/

### Social Media
- Instagram: @ten56hq
- All platforms: https://ten56.lnk.to/I-O

### API Endpoints (when implemented)
- Instagram: Instagram Basic Display API
- YouTube: YouTube Data API v3
- Bandsintown: Artist Events API

## Performance Considerations

- Preconnect to external domains in HTML head
- Lazy loading for images and embeds
- Intersection Observer for scroll-triggered animations
- Minimal JavaScript footprint
- CSS custom properties for efficient styling