/**
 * TEN56.IO - Main JavaScript
 * Handles navigation, scroll animations, and interactive elements
 */

(function() {
    'use strict';

    // ==========================================================================
    // Configuration
    // ==========================================================================
    
    const CONFIG = {
        SCROLL_OFFSET: 100,
        ANIMATION_DELAY: 100,
        MOBILE_BREAKPOINT: 991,
        DEBOUNCE_DELAY: 16
    };

    // ==========================================================================
    // Utilities
    // ==========================================================================
    
    /**
     * Debounce function to limit function execution frequency
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function to limit function execution frequency
     */
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Check if element is in viewport
     */
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    }

    /**
     * Smooth scroll to element
     */
    function scrollToElement(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // ==========================================================================
    // Navigation
    // ==========================================================================
    
    class Navigation {
        constructor() {
            this.nav = document.getElementById('nav');
            this.navToggle = document.getElementById('nav-toggle');
            this.navMenu = document.getElementById('nav-menu');
            this.navLinks = document.querySelectorAll('.nav__link');
            this.isMenuOpen = false;
            
            this.init();
        }

        init() {
            if (!this.nav) return;
            
            this.bindEvents();
            this.handleScroll();
        }

        bindEvents() {
            // Toggle mobile menu
            if (this.navToggle) {
                this.navToggle.addEventListener('click', () => this.toggleMenu());
            }

            // Close menu when clicking on nav links
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        this.closeMenu();
                        scrollToElement(targetElement, CONFIG.SCROLL_OFFSET);
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && !this.nav.contains(e.target)) {
                    this.closeMenu();
                }
            });

            // Handle scroll events
            window.addEventListener('scroll', throttle(() => this.handleScroll(), CONFIG.DEBOUNCE_DELAY));

            // Handle resize events
            window.addEventListener('resize', debounce(() => this.handleResize(), 250));
        }

        toggleMenu() {
            if (this.isMenuOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        }

        openMenu() {
            this.navMenu.classList.add('active');
            this.navToggle.classList.add('active');
            this.isMenuOpen = true;
            document.body.style.overflow = 'hidden';
        }

        closeMenu() {
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
            this.isMenuOpen = false;
            document.body.style.overflow = '';
        }

        handleScroll() {
            const scrollTop = window.pageYOffset;
            
            // Hide/show navigation on scroll
            if (scrollTop > CONFIG.SCROLL_OFFSET) {
                this.nav.style.transform = 'translateY(0)';
            } else {
                this.nav.style.transform = 'translateY(0)';
            }

            // Update active nav link based on scroll position
            this.updateActiveNavLink();
        }

        updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.pageYOffset + CONFIG.SCROLL_OFFSET;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        }

        handleResize() {
            if (window.innerWidth > CONFIG.MOBILE_BREAKPOINT && this.isMenuOpen) {
                this.closeMenu();
            }
        }
    }

    // ==========================================================================
    // Scroll Animations
    // ==========================================================================
    
    class ScrollAnimations {
        constructor() {
            this.animatedElements = document.querySelectorAll(
                '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
            );
            this.init();
        }

        init() {
            if (!this.animatedElements.length) return;
            
            this.bindEvents();
            this.checkAnimations(); // Check initial state
        }

        bindEvents() {
            window.addEventListener('scroll', throttle(() => this.checkAnimations(), CONFIG.DEBOUNCE_DELAY));
            window.addEventListener('resize', debounce(() => this.checkAnimations(), 250));
        }

        checkAnimations() {
            this.animatedElements.forEach(element => {
                if (isInViewport(element, 100) && !element.classList.contains('in-view')) {
                    element.classList.add('in-view');
                }
            });
        }
    }

    // ==========================================================================
    // Instagram Carousel
    // ==========================================================================
    
    class InstagramCarousel {
        constructor() {
            this.carousel = document.getElementById('instagram-carousel');
            this.prevBtn = document.getElementById('carousel-prev');
            this.nextBtn = document.getElementById('carousel-next');
            this.currentIndex = 0;
            this.itemWidth = 320; // 300px + 20px gap
            
            this.init();
        }

        init() {
            if (!this.carousel) return;
            
            this.bindEvents();
            this.loadInstagramPosts();
        }

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Touch events for mobile swiping
            let startX = 0;
            let startY = 0;
            let isDragging = false;

            this.carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isDragging = true;
            });

            this.carousel.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });

            this.carousel.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = startX - endX;
                const diffY = startY - endY;

                // Only trigger if horizontal swipe is dominant
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
                
                isDragging = false;
            });
        }

        async loadInstagramPosts() {
            // This would typically connect to Instagram Basic Display API
            // For now, we'll use placeholder functionality
            const placeholderPosts = [
                { id: 1, image: 'https://picsum.photos/300/300?random=1', caption: 'TEN56. Studio Session' },
                { id: 2, image: 'https://picsum.photos/300/300?random=2', caption: 'New Merchandise Drop' },
                { id: 3, image: 'https://picsum.photos/300/300?random=3', caption: 'Live Performance' },
                { id: 4, image: 'https://picsum.photos/300/300?random=4', caption: 'Behind the Scenes' },
                { id: 5, image: 'https://picsum.photos/300/300?random=5', caption: 'Tour Announcement' }
            ];

            this.renderPosts(placeholderPosts);
        }

        renderPosts(posts) {
            if (!posts.length) return;

            this.carousel.innerHTML = posts.map(post => `
                <div class="instagram-post">
                    <img src="${post.image}" alt="${post.caption}" class="instagram-post__image" loading="lazy">
                    <div class="instagram-post__overlay">
                        <a href="https://instagram.com/ten56hq" target="_blank" rel="noopener" class="instagram-post__link">
                            <span class="instagram-post__icon">📷</span>
                        </a>
                    </div>
                </div>
            `).join('');
        }

        nextSlide() {
            const maxIndex = this.carousel.children.length - this.getVisibleItems();
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.updateCarousel();
            }
        }

        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateCarousel();
            }
        }

        updateCarousel() {
            const translateX = -this.currentIndex * this.itemWidth;
            this.carousel.style.transform = `translateX(${translateX}px)`;
        }

        getVisibleItems() {
            const containerWidth = this.carousel.parentElement.offsetWidth;
            return Math.floor(containerWidth / this.itemWidth);
        }
    }

    // ==========================================================================
    // App Initialization
    // ==========================================================================
    
    class App {
        constructor() {
            this.components = {};
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        }

        initializeComponents() {
            try {
                this.components.navigation = new Navigation();
                this.components.scrollAnimations = new ScrollAnimations();
                this.components.instagramCarousel = new InstagramCarousel();
                
                console.log('TEN56.IO website initialized successfully');
            } catch (error) {
                console.error('Error initializing website components:', error);
            }
        }
    }

    // ==========================================================================
    // Export for global access
    // ==========================================================================
    
    window.TEN56 = {
        App,
        Navigation,
        ScrollAnimations,
        InstagramCarousel,
        utils: {
            debounce,
            throttle,
            isInViewport,
            scrollToElement
        }
    };

    // Auto-initialize
    const app = new App();
    app.init();

})();