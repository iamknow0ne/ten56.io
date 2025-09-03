# TEN56.IO ONEPAGER

Official website for TEN56. - A complete refactored version with enhanced features.

## 🎵 About

This is a fully refactored static website for TEN56., recreating the original Canva design with modern web technologies and adding new interactive features including:

- **Bandsintown Tour Widget** - Live tour dates and ticket links
- **Linktree Integration** - All music streaming and social links
- **Instagram Feed Carousel** - Latest posts from @ten56hq
- **Responsive Design** - Optimized for all devices
- **Performance Optimized** - Fast loading times and smooth animations

## 🚀 Features

### Core Sections
- **Hero Section** - "TEN56. // IO OUT NOW" with embedded music video
- **Music Video** - Full-width YouTube embed
- **Merchandise** - EU and US store integration
- **Apparel Grid** - Product showcase with direct store links
- **Tours** - Bandsintown widget with social media links
- **Socials** - Instagram feed carousel
- **Collaboration** - Beer collaboration showcase

### Technical Features
- Modern CSS Grid and Flexbox layouts
- Smooth scroll animations
- Mobile-first responsive design
- Progressive enhancement with JavaScript
- Accessibility optimizations
- SEO optimization
- Error handling for external embeds

## 🛠 Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript (ES6+)** - Modern vanilla JS
- **YouTube API** - Video management
- **Bandsintown API** - Tour dates
- **Instagram Basic Display API** - Social feed

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Core styles and layout
│   ├── components.css     # Components and animations
│   └── responsive.css     # Responsive breakpoints
├── js/
│   ├── main.js           # Core JavaScript functionality
│   └── embeds.js         # External embed management
├── images/               # Organized image assets
│   ├── hero/
│   ├── merchandise/
│   ├── apparel/
│   └── social/
├── EXPORTS/              # Original Canva export files
└── PROJECT-DOCUMENTATION.md
```

## 🌐 External Integrations

### Bandsintown Widget
- **URL**: https://bnds.us/xcotv3
- **Purpose**: Display live tour dates with ticket purchase links
- **Fallback**: Direct links to Bandsintown and Instagram

### Linktree Integration
- **URL**: https://ten56.lnk.to/I-O
- **Purpose**: Centralized music streaming and social links
- **Fallback**: Direct links to major platforms

### Instagram Feed
- **Account**: @ten56hq
- **Purpose**: Latest posts in carousel format
- **Implementation**: Uses placeholder images (API integration needed)

## 📱 Responsive Breakpoints

- **Mobile**: 0-575px
- **Mobile Landscape**: 576-767px
- **Tablet**: 768-991px
- **Desktop**: 992-1199px
- **Large Desktop**: 1200px+

## ⚡ Performance Optimizations

- Lazy loading for images
- Optimized font loading
- Minimal JavaScript footprint
- Efficient CSS with custom properties
- Intersection Observer for animations
- Error handling for failed embeds

## 🎨 Design System

### Colors
- **Dark Red**: #2c0c0a (Primary background)
- **Cream**: #f2f0ed (Section backgrounds)
- **Gray**: #b2afac (Text and accents)
- **White**: #ffffff (Primary text)
- **Black**: #000000 (Contrast elements)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Weights**: 400, 600, 700, 800, 900
- **Style**: Modern, bold, uppercase for headings

## 🔧 Development

### Local Development
1. Clone the repository
2. Open `index.html` in a browser
3. For live reload, use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx live-server
   ```

### Making Changes
1. Edit HTML structure in `index.html`
2. Modify styles in the `css/` directory
3. Add functionality in the `js/` directory
4. Test across different devices and browsers

## 🚀 Deployment

### GitHub Pages
1. Push changes to main branch
2. Enable GitHub Pages in repository settings
3. Site will be available at: `https://username.github.io/repository-name`

### Vercel (Recommended)
1. Connect repository to Vercel
2. Automatic deployments on push
3. Custom domain support
4. Edge optimization

## 📋 Deployment Checklist

- [ ] Replace placeholder YouTube video IDs with actual videos
- [ ] Test all external links and embeds
- [ ] Verify responsive design on all devices
- [ ] Check loading performance
- [ ] Validate HTML and CSS
- [ ] Test accessibility features
- [ ] Verify SEO meta tags

## 🔗 Important Links

### Stores
- **EU Store**: https://www.outoflineshop.de/ten56/
- **US Store**: https://www.visionmerch.com/outoflinemusic/ten56/
- **Apparel**: https://ten56apparel.com/

### Social Media
- **Instagram**: https://instagram.com/ten56hq
- **Facebook**: https://facebook.com/ten56hq
- **Twitter/X**: https://x.com/ten56hq
- **TikTok**: https://www.tiktok.com/@ten56hq

### Music & Links
- **Streaming**: https://ten56.lnk.to/I-O
- **Bandsintown**: https://bnds.us/xcotv3

## 🐛 Known Issues & TODO

### Current Limitations
- Instagram feed uses placeholder images (requires API setup)
- YouTube video IDs are placeholders
- Some embeds may need CORS configuration

### Future Enhancements
- [ ] Set up Instagram Basic Display API
- [ ] Add actual YouTube video IDs
- [ ] Implement contact form
- [ ] Add loading states for embeds
- [ ] Optimize image formats (WebP)
- [ ] Add service worker for offline functionality

## 📄 Browser Support

- **Modern Browsers**: Full support (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- **Legacy Support**: Graceful degradation for older browsers
- **Mobile**: iOS 12+, Android 7+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following the existing code style
4. Test thoroughly across devices
5. Submit a pull request with detailed description

## 📞 Support

For technical issues or questions:
- Check the PROJECT-DOCUMENTATION.md file
- Review browser console for error messages
- Test embeds individually if issues occur

## 📜 License

This project is for TEN56. official use. All brand assets and content are proprietary.

---

**Built with ❤️ for TEN56.**