/**
 * TEN56.IO - Embeds JavaScript
 * Handles external embeds: YouTube, Bandsintown, Linktree, Instagram
 */

(function() {
    'use strict';

    // ==========================================================================
    // YouTube Embed Manager
    // ==========================================================================
    
    class YouTubeEmbedManager {
        constructor() {
            this.players = new Map();
            this.apiReady = false;
            this.init();
        }

        init() {
            // Load YouTube IFrame Player API
            if (!window.YT) {
                this.loadYouTubeAPI();
            } else {
                this.apiReady = true;
                this.initializePlayers();
            }
        }

        loadYouTubeAPI() {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // Set global callback
            window.onYouTubeIframeAPIReady = () => {
                this.apiReady = true;
                this.initializePlayers();
            };
        }

        initializePlayers() {
            const videoEmbeds = document.querySelectorAll('.video-embed iframe[src*="youtube.com"]');
            
            videoEmbeds.forEach((iframe, index) => {
                const playerId = `youtube-player-${index}`;
                iframe.id = playerId;

                // Extract video ID from URL
                const videoId = this.extractVideoId(iframe.src);
                if (!videoId) return;

                // Initialize YouTube player
                try {
                    const player = new YT.Player(playerId, {
                        events: {
                            'onReady': (event) => this.onPlayerReady(event, playerId),
                            'onStateChange': (event) => this.onPlayerStateChange(event, playerId),
                            'onError': (event) => this.onPlayerError(event, playerId)
                        }
                    });

                    this.players.set(playerId, player);
                } catch (error) {
                    console.warn('YouTube API not ready yet:', error);
                }
            });
        }

        extractVideoId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }

        onPlayerReady(event, playerId) {
            console.log(`YouTube player ${playerId} ready`);
            
            // Auto-play hero video if it's muted
            const player = event.target;
            const iframe = document.getElementById(playerId);
            const container = iframe.closest('.hero__video');
            
            if (container && iframe.src.includes('autoplay=1')) {
                try {
                    player.mute();
                    player.playVideo();
                } catch (error) {
                    console.warn('Could not autoplay video:', error);
                }
            }
        }

        onPlayerStateChange(event, playerId) {
            const player = event.target;
            const state = event.data;
            
            // Handle different player states
            if (typeof YT !== 'undefined') {
                switch (state) {
                    case YT.PlayerState.PLAYING:
                        this.pauseOtherVideos(playerId);
                        break;
                    case YT.PlayerState.ENDED:
                        // Loop hero video
                        const iframe = document.getElementById(playerId);
                        const container = iframe.closest('.hero__video');
                        if (container && iframe.src.includes('loop=1')) {
                            try {
                                player.seekTo(0);
                                player.playVideo();
                            } catch (error) {
                                console.warn('Could not loop video:', error);
                            }
                        }
                        break;
                }
            }
        }

        onPlayerError(event, playerId) {
            console.error(`YouTube player ${playerId} error:`, event.data);
            
            // Show fallback content
            const iframe = document.getElementById(playerId);
            const container = iframe.closest('.video-embed');
            if (container) {
                container.innerHTML = `
                    <div class="video-error">
                        <p>Video currently unavailable</p>
                        <a href="https://youtube.com/@ten56hq" target="_blank" rel="noopener" class="cta-button cta-button--outline">
                            Visit our YouTube Channel
                        </a>
                    </div>
                `;
            }
        }

        pauseOtherVideos(currentPlayerId) {
            this.players.forEach((player, playerId) => {
                if (playerId !== currentPlayerId) {
                    try {
                        player.pauseVideo();
                    } catch (error) {
                        console.warn(`Could not pause player ${playerId}:`, error);
                    }
                }
            });
        }
    }

    // ==========================================================================
    // Bandsintown Widget Manager
    // ==========================================================================
    
    class BandsinTownManager {
        constructor() {
            this.widget = null;
            this.artistName = 'TEN56';
            this.init();
        }

        init() {
            const widgetContainer = document.querySelector('.bandsintown-widget');
            if (!widgetContainer) return;

            this.setupWidget(widgetContainer);
            this.addErrorHandling(widgetContainer);
        }

        setupWidget(container) {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;

            // Add loading state
            container.classList.add('loading');

            // Handle iframe load
            iframe.addEventListener('load', () => {
                container.classList.remove('loading');
            });

            // Handle iframe error
            iframe.addEventListener('error', () => {
                this.showFallbackContent(container);
            });
        }

        addErrorHandling(container) {
            // Set a timeout to show fallback if widget doesn't load
            setTimeout(() => {
                if (container.classList.contains('loading')) {
                    this.showFallbackContent(container);
                }
            }, 10000); // 10 second timeout
        }

        showFallbackContent(container) {
            container.innerHTML = `
                <div class="bandsintown-fallback">
                    <h3>Upcoming Shows</h3>
                    <p>Check our latest tour dates and get tickets:</p>
                    <div class="fallback-links">
                        <a href="https://www.bandsintown.com/a/15896439-ten56" target="_blank" rel="noopener" class="cta-button cta-button--outline">
                            View on Bandsintown
                        </a>
                        <a href="https://instagram.com/ten56hq" target="_blank" rel="noopener" class="cta-button cta-button--outline">
                            Follow for Updates
                        </a>
                    </div>
                </div>
            `;
        }
    }

    // ==========================================================================
    // Linktree Embed Manager
    // ==========================================================================
    
    class LinktreeManager {
        constructor() {
            this.init();
        }

        init() {
            const linktreeContainer = document.querySelector('.linktree-widget');
            if (!linktreeContainer) return;

            this.setupWidget(linktreeContainer);
        }

        setupWidget(container) {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;

            // Add loading state
            container.classList.add('loading');

            // Handle iframe load
            iframe.addEventListener('load', () => {
                container.classList.remove('loading');
            });

            // Handle iframe error
            iframe.addEventListener('error', () => {
                this.showFallbackContent(container);
            });

            // Set timeout for fallback
            setTimeout(() => {
                if (container.classList.contains('loading')) {
                    this.showFallbackContent(container);
                }
            }, 10000);
        }

        showFallbackContent(container) {
            container.innerHTML = `
                <div class="linktree-fallback">
                    <h3>All Links</h3>
                    <div class="fallback-links">
                        <a href="https://ten56.lnk.to/I-O" target="_blank" rel="noopener" class="cta-button cta-button--dark">
                            Stream "I/O"
                        </a>
                        <a href="https://ten56apparel.com/" target="_blank" rel="noopener" class="cta-button cta-button--outline">
                            Shop Merchandise
                        </a>
                        <a href="https://instagram.com/ten56hq" target="_blank" rel="noopener" class="cta-button cta-button--outline">
                            Follow on Instagram
                        </a>
                    </div>
                </div>
            `;
        }
    }

    // ==========================================================================
    // Instagram Feed Manager
    // ==========================================================================
    
    class InstagramFeedManager {
        constructor() {
            this.accessToken = null; // Would be set from Instagram Basic Display API
            this.posts = [];
            this.init();
        }

        init() {
            const feedContainer = document.querySelector('.instagram-feed');
            if (!feedContainer) return;

            // For now, use mock data since Instagram API requires backend setup
            this.loadMockPosts();
        }

        loadMockPosts() {
            // Mock Instagram posts data
            const mockPosts = [
                {
                    id: '1',
                    media_url: 'https://picsum.photos/300/300?random=1',
                    caption: 'Studio session vibes 🎵 #TEN56 #studio #recording',
                    permalink: 'https://instagram.com/p/example1',
                    media_type: 'IMAGE'
                },
                {
                    id: '2',
                    media_url: 'https://picsum.photos/300/300?random=2',
                    caption: 'New merch drop coming soon! 👕 #merchandise #TEN56',
                    permalink: 'https://instagram.com/p/example2',
                    media_type: 'IMAGE'
                },
                {
                    id: '3',
                    media_url: 'https://picsum.photos/300/300?random=3',
                    caption: 'Live show energy is unmatched 🔥 #live #performance',
                    permalink: 'https://instagram.com/p/example3',
                    media_type: 'IMAGE'
                },
                {
                    id: '4',
                    media_url: 'https://picsum.photos/300/300?random=4',
                    caption: 'Behind the scenes content 📸 #BTS #TEN56',
                    permalink: 'https://instagram.com/p/example4',
                    media_type: 'IMAGE'
                },
                {
                    id: '5',
                    media_url: 'https://picsum.photos/300/300?random=5',
                    caption: 'Tour announcement coming... 🚌 #tour #announcement',
                    permalink: 'https://instagram.com/p/example5',
                    media_type: 'IMAGE'
                }
            ];

            this.renderPosts(mockPosts);
        }

        renderPosts(posts) {
            const carousel = document.getElementById('instagram-carousel');
            if (!carousel) return;

            carousel.innerHTML = posts.map(post => `
                <div class="instagram-post" data-post-id="${post.id}">
                    <img src="${post.media_url}" alt="${this.truncateCaption(post.caption)}" class="instagram-post__image" loading="lazy">
                    <div class="instagram-post__overlay">
                        <a href="${post.permalink}" target="_blank" rel="noopener" class="instagram-post__link" aria-label="View on Instagram">
                            <span class="instagram-post__icon">📷</span>
                        </a>
                    </div>
                </div>
            `).join('');

            // Add intersection observer for lazy loading
            this.setupLazyLoading();
        }

        truncateCaption(caption, maxLength = 50) {
            if (!caption) return 'Instagram post';
            return caption.length > maxLength ? caption.substring(0, maxLength) + '...' : caption;
        }

        setupLazyLoading() {
            const images = document.querySelectorAll('.instagram-post__image[loading="lazy"]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.classList.add('fade-in');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            }
        }

        // Method to refresh feed (would connect to actual API)
        async refreshFeed() {
            try {
                // This would make an actual API call
                console.log('Refreshing Instagram feed...');
                // const response = await fetch('/api/instagram/posts');
                // const posts = await response.json();
                // this.renderPosts(posts);
            } catch (error) {
                console.error('Error refreshing Instagram feed:', error);
            }
        }
    }

    // ==========================================================================
    // Main Embed Manager
    // ==========================================================================
    
    class EmbedManager {
        constructor() {
            this.managers = {};
            this.init();
        }

        init() {
            // Initialize all embed managers
            this.managers.youTube = new YouTubeEmbedManager();
            this.managers.bandsinTown = new BandsinTownManager();
            this.managers.linktree = new LinktreeManager();
            this.managers.instagram = new InstagramFeedManager();

            // Setup global error handling
            this.setupGlobalErrorHandling();
            
            console.log('Embed managers initialized');
        }

        setupGlobalErrorHandling() {
            // Handle uncaught errors in embeds
            window.addEventListener('error', (event) => {
                if (event.target && event.target.tagName === 'IFRAME') {
                    console.error('Iframe error:', event.target.src, event.error);
                }
            });

            // Handle unhandled promise rejections from embed APIs
            window.addEventListener('unhandledrejection', (event) => {
                if (event.reason && event.reason.message && event.reason.message.includes('embed')) {
                    console.error('Embed promise rejection:', event.reason);
                    event.preventDefault(); // Prevent console spam
                }
            });
        }

        // Public methods to control embeds
        pauseAllVideos() {
            if (this.managers.youTube && this.managers.youTube.players) {
                this.managers.youTube.players.forEach((player, playerId) => {
                    try {
                        player.pauseVideo();
                    } catch (error) {
                        console.warn(`Could not pause video ${playerId}:`, error);
                    }
                });
            }
        }

        refreshAllEmbeds() {
            // Refresh Instagram feed
            if (this.managers.instagram) {
                this.managers.instagram.refreshFeed();
            }
        }
    }

    // ==========================================================================
    // Export to global scope
    // ==========================================================================
    
    window.TEN56 = window.TEN56 || {};
    window.TEN56.EmbedManager = EmbedManager;
    window.TEN56.embeds = {
        YouTubeEmbedManager,
        BandsinTownManager,
        LinktreeManager,
        InstagramFeedManager
    };

    // Auto-initialize embed manager
    document.addEventListener('DOMContentLoaded', () => {
        window.TEN56.embedManager = new EmbedManager();
    });

    // Pause videos when page becomes hidden (tab switching, etc.)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && window.TEN56.embedManager) {
            window.TEN56.embedManager.pauseAllVideos();
        }
    });

})();