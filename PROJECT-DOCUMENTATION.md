# TEN56.IO ONEPAGER - Project Documentation

## Project Overview
- **Project Name**: TEN56.IO ONEPAGER
- **Repository**: https://github.com/iamknow0ne/ten56.io-onepager
- **Local Path**: `/Users/hostin/vibecoding/ten56.io/ONEPAGER`
- **Deployment**: GitHub Pages via Vercel
- **Original Source**: Canva website export (https://ten56io.my.canva.site/)

## Project Goals
1. **100% Recreation**: Reproduce the Canva website exactly while refactoring the code for better maintainability
2. **Enhanced Features**: Add new interactive sections and embeds
3. **Static Hosting**: Optimize for GitHub Pages deployment
4. **Modern Architecture**: Clean, semantic HTML/CSS/JS structure

## Current Status: INITIALIZATION PHASE

### Phase 1: Analysis & Setup ✅
- [x] Analyzed exported Canva HTML structure
- [x] Identified key sections and layout patterns
- [x] Created project documentation
- [x] Planned new features and integrations

### Phase 2: Core Recreation 🚧
- [ ] Set up clean project structure
- [ ] Create semantic HTML layout
- [ ] Implement responsive CSS Grid/Flexbox system
- [ ] Recreate hero section with "TEN56. // IO OUT NOW"
- [ ] Build video embed sections
- [ ] Implement merchandise/apparel showcase
- [ ] Create tours section foundation

### Phase 3: Enhanced Features 🔄
- [ ] Integrate Bandsintown widget (https://bnds.us/xcotv3)
- [ ] Embed Linktree (https://ten56.lnk.to/I-O)
- [ ] Add Instagram feed carousel in socials section
- [ ] Implement smooth animations and transitions

### Phase 4: Optimization & Deployment 🔄
- [ ] Optimize images and assets
- [ ] Ensure mobile responsiveness
- [ ] Test cross-browser compatibility
- [ ] Deploy to GitHub Pages via Vercel

## Website Structure Analysis

### Identified Sections:
1. **Hero Section** - Dark background with large "TEN56. // IO OUT NOW" title and embedded video
2. **Video Section** - Full-width video embed 
3. **Merchandise Section** - Light background showcasing apparel with EU/US store links
4. **Apparel Grid** - Product showcase with prices and "shop all" CTA
5. **Tours Section** - Dark background with social media links
6. **Final Section** - Beer collaboration showcase

### Key Visual Elements:
- **Typography**: Bold, uppercase sans-serif fonts
- **Color Scheme**: Dark red/black (#2c0c0a), cream/beige (#f2f0ed), white, gray (#b2afac)
- **Layout**: Full-width sections with centered content
- **Images**: High-quality product and lifestyle photography
- **Interactive Elements**: Hover effects, embedded videos, social links

## Technical Requirements

### Technologies:
- **HTML5**: Semantic structure
- **CSS3**: Grid, Flexbox, custom properties, animations
- **JavaScript**: Minimal, progressive enhancement
- **Embeds**: YouTube, Bandsintown, Linktree, Instagram

### Performance Goals:
- Fast loading times
- Mobile-first responsive design
- Optimized images (WebP where possible)
- Minimal JavaScript footprint

## New Features to Implement

### 1. Bandsintown Integration
- **URL**: https://bnds.us/xcotv3
- **Location**: Tours section
- **Implementation**: Scrollable iframe with tour dates and ticket links

### 2. Linktree Embed
- **URL**: https://ten56.lnk.to/I-O
- **Location**: Dedicated links section or footer
- **Implementation**: Embedded widget or iframe

### 3. Instagram Feed Carousel
- **Target**: @ten56hq Instagram account
- **Location**: New "Socials" section
- **Implementation**: Instagram Basic Display API or third-party widget

## File Structure Plan
```
/
├── index.html
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── embeds.js
├── images/
│   ├── hero/
│   ├── merchandise/
│   ├── apparel/
│   └── social/
├── assets/
│   └── fonts/
└── README.md
```

## Deployment Instructions
```bash
cd /Users/hostin/Downloads/ten56.io/ONEPAGER
# Add all changes
git add .
# Commit with detailed message
git commit -m "Initial refactored website with enhanced features"
# Push and deploy
git push origin main
```

## Current Challenges & Solutions

### Challenge 1: Font Recreation
- **Issue**: Original uses custom web fonts
- **Solution**: Use Google Fonts or system font fallbacks with similar characteristics

### Challenge 2: Video Embeds
- **Issue**: Original has complex YouTube embeds
- **Solution**: Use standard YouTube iframe API with custom styling

### Challenge 3: Image Optimization
- **Issue**: Large image files from Canva export
- **Solution**: Compress and convert to WebP, maintain aspect ratios

## Next Steps
1. Create clean HTML structure
2. Build CSS component system
3. Implement responsive design
4. Add JavaScript functionality
5. Integrate third-party embeds
6. Test and optimize
7. Deploy to production

## Changelog
- **2025-01-03**: Project initialization and documentation
- **TBD**: Core website recreation
- **TBD**: Enhanced features implementation
- **TBD**: Production deployment

---
*Last Updated: 2025-01-03*
*Status: INITIALIZATION PHASE*