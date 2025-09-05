/**
 * TEN56.IO Advanced Analytics - Comprehensive User Behavior Tracking
 * Automatically tracks all user interactions with granular detail
 */

(function() {
    'use strict';

    // Wait for TEN56Analytics to be available
    function initAdvancedTracking() {
        if (typeof window.TEN56Analytics === 'undefined') {
            setTimeout(initAdvancedTracking, 100);
            return;
        }

        const analytics = window.TEN56Analytics;

        // ===== AUTO-TRACKING SETUP =====
        
        // Track all clicks automatically
        document.addEventListener('click', function(e) {
            const element = e.target;
            const link = element.closest('a');
            
            if (link) {
                const href = link.getAttribute('href');
                const text = link.textContent.trim() || link.getAttribute('alt') || 'Link';
                const className = link.className || '';
                
                // Navigation links
                if (className.includes('nav__link')) {
                    analytics.trackNavigation(text, href, 'main_navigation');
                }
                // Product links
                else if (className.includes('product-card__link')) {
                    const productCard = link.closest('.product-card');
                    const productName = productCard?.querySelector('.product-card__name')?.textContent || 'Unknown Product';
                    analytics.trackProductView(productName, 'apparel', 'product_grid');
                    analytics.trackMerchandise(productName, 'apparel', 0, 'product_grid', 'view_product');
                }
                // Store links  
                else if (className.includes('store-card__link')) {
                    const storeCard = link.closest('.store-card');
                    const storeTitle = storeCard?.querySelector('.store-card__title')?.textContent || 'Store';
                    analytics.trackStoreRedirect(storeTitle, 'merchandise_store', 'store_grid');
                }
                // CTA buttons
                else if (className.includes('cta-button')) {
                    analytics.trackMerchandise(text, 'cta_interaction', 0, getElementLocation(link), 'cta_click');
                }
                // Footer links
                else if (className.includes('footer__link')) {
                    analytics.trackFooterInteraction('footer_link', href);
                }
                // Legal links
                else if (className.includes('footer__legal-link')) {
                    analytics.trackLegalPageView(text.toLowerCase().replace(/\s+/g, '_'));
                }
                // Social media (not already tracked)
                else if (href && (href.includes('instagram.com') || href.includes('spotify.com') || 
                                href.includes('youtube.com') || href.includes('twitter.com') || 
                                href.includes('facebook.com') || href.includes('tiktok.com'))) {
                    const platform = getPlatformFromUrl(href);
                    const location = getElementLocation(link);
                    analytics.trackSocialClick(platform, location, 'external_link');
                }
                // External links
                else if (href && href.startsWith('http')) {
                    analytics.trackContentEngagement('external_link', getDomainFromUrl(href), 'click');
                }
            }
        });

        // ===== SCROLL DEPTH TRACKING =====
        let scrollDepthTracked = new Set();
        const scrollDepthThresholds = [25, 50, 75, 90, 100];

        function trackScrollDepth() {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            const currentSection = getCurrentSection();
            
            scrollDepthThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !scrollDepthTracked.has(threshold)) {
                    analytics.trackScrollDepth(threshold, currentSection);
                    scrollDepthTracked.add(threshold);
                }
            });
        }

        // ===== SECTION TIME TRACKING =====
        let sectionStartTimes = {};
        let currentSection = '';

        function trackSectionTime() {
            const newSection = getCurrentSection();
            const currentTime = Date.now();
            
            if (currentSection !== newSection) {
                // Track time spent in previous section
                if (currentSection && sectionStartTimes[currentSection]) {
                    const timeSpent = Math.round((currentTime - sectionStartTimes[currentSection]) / 1000);
                    if (timeSpent > 2) { // Only track if user spent more than 2 seconds
                        analytics.trackTimeOnSection(currentSection, timeSpent);
                    }
                }
                
                // Start tracking new section
                currentSection = newSection;
                sectionStartTimes[currentSection] = currentTime;
            }
        }

        // ===== VIDEO INTERACTION TRACKING =====
        function setupVideoTracking() {
            const videoEmbeds = document.querySelectorAll('iframe[src*="youtube.com"]');
            videoEmbeds.forEach(iframe => {
                const title = iframe.getAttribute('title') || 'YouTube Video';
                
                // Track video container interactions
                const container = iframe.closest('.video-embed');
                if (container) {
                    container.addEventListener('click', () => {
                        analytics.trackVideoInteraction(title, 'click_to_play', 0);
                    });
                }
            });
        }

        // ===== WIDGET INTERACTION TRACKING =====
        function setupWidgetTracking() {
            // Linktree widget
            const linktreeIframes = document.querySelectorAll('iframe[src*="lnk.to"]');
            linktreeIframes.forEach(iframe => {
                iframe.addEventListener('load', () => {
                    analytics.trackWidgetInteraction('linktree', 'load', 'hero_section');
                });
            });

            // Bandsintown widget
            const bandsinIframes = document.querySelectorAll('iframe[src*="bnds.us"]');
            bandsinIframes.forEach(iframe => {
                iframe.addEventListener('load', () => {
                    analytics.trackWidgetInteraction('bandsintown', 'load', 'tours_section');
                });
            });
        }

        // ===== MOBILE INTERACTION TRACKING =====
        function setupMobileTracking() {
            if ('ontouchstart' in window) {
                document.addEventListener('touchstart', function(e) {
                    const element = e.target;
                    const elementType = element.tagName.toLowerCase();
                    const elementClass = element.className || '';
                    
                    if (elementType === 'a' || elementClass.includes('social-icon')) {
                        analytics.trackMobileInteraction('touch_start', elementType, 'tap');
                    }
                });
            }
        }

        // ===== ERROR TRACKING =====
        window.addEventListener('error', function(e) {
            analytics.trackError('javascript_error', e.message, window.location.pathname);
        });

        // Track 404 or missing resources
        document.addEventListener('error', function(e) {
            if (e.target !== window && e.target.src) {
                analytics.trackError('resource_error', `Failed to load: ${e.target.src}`, window.location.pathname);
            }
        }, true);

        // ===== PERFORMANCE TRACKING =====
        window.addEventListener('load', function() {
            setTimeout(() => {
                if (window.performance && window.performance.timing) {
                    const timing = window.performance.timing;
                    const loadTime = timing.loadEventEnd - timing.navigationStart;
                    analytics.trackPerformance('page_load_time', loadTime, window.location.pathname);
                }
            }, 0);
        });

        // ===== UTILITY FUNCTIONS =====
        function getCurrentSection() {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = 'unknown';
            let minDistance = Infinity;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top);
                
                if (distance < minDistance && rect.top <= window.innerHeight / 2) {
                    minDistance = distance;
                    currentSection = section.id || section.className;
                }
            });
            
            return currentSection;
        }

        function getElementLocation(element) {
            const section = element.closest('section');
            if (section && section.id) return section.id;
            
            const nav = element.closest('nav');
            if (nav) return 'navigation';
            
            const footer = element.closest('footer');
            if (footer) return 'footer';
            
            return 'unknown_location';
        }

        function getPlatformFromUrl(url) {
            if (url.includes('instagram.com')) return 'instagram';
            if (url.includes('spotify.com')) return 'spotify';
            if (url.includes('youtube.com')) return 'youtube';
            if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
            if (url.includes('facebook.com')) return 'facebook';
            if (url.includes('tiktok.com')) return 'tiktok';
            return 'unknown_platform';
        }

        function getDomainFromUrl(url) {
            try {
                return new URL(url).hostname;
            } catch {
                return 'invalid_url';
            }
        }

        // ===== EVENT LISTENERS =====
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                trackScrollDepth();
                trackSectionTime();
            }, 100);
        });

        // ===== INITIALIZE ALL TRACKING =====
        setupVideoTracking();
        setupWidgetTracking();
        setupMobileTracking();
        trackSectionTime(); // Start section timing
        
        // Track initial page view with detailed context
        analytics.trackContentEngagement('page', 'ten56_homepage', 'initial_load', 0);
        
        console.log('🎸 TEN56 Advanced Analytics initialized - All interactions will be tracked');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdvancedTracking);
    } else {
        initAdvancedTracking();
    }
})();