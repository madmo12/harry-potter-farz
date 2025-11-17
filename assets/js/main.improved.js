/**
 * Main initialization file for Magical Academy - The Goblet of Fire
 * Handles page initialization and event listeners
 */

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initializes all page functionality
 */
function initializePage() {
    const preloader = getElementById('preloader');
    const backgroundMusic = getElementById('background-music');

    // Try to play music immediately on page load (some browsers allow this)
    if (backgroundMusic) {
        backgroundMusic.volume = CONFIG.MUSIC_VOLUME;
        // Try autoplay immediately - this will fail silently if blocked
        backgroundMusic.play().catch(() => {
            // Autoplay blocked - show button if configured to do so
            if (CONFIG.SHOW_MUSIC_BUTTON_ON_AUTOPLAY_BLOCK) {
                showMusicEnableButton(backgroundMusic);
            }
        });
    }

    // Set up global interaction handler to enable music on ANY user interaction
    if (backgroundMusic) {
        let musicEnabled = false;
        
        // This handler will catch ANY user interaction and try to play music
        const enableMusicOnInteraction = () => {
            if (musicEnabled || !backgroundMusic.paused) return;
            
            // Must call play() directly in the event handler (same call stack)
            backgroundMusic.volume = CONFIG.MUSIC_VOLUME;
            backgroundMusic.play()
                .then(() => {
                    musicEnabled = true;
                    // Remove the overlay if it exists
                    const overlay = getElementById('music-enable-overlay');
                    if (overlay) {
                        overlay.style.opacity = '0';
                        overlay.style.transition = 'opacity 0.5s ease-out';
                        setTimeout(() => overlay.remove(), 500);
                    }
                    // Remove listeners once music starts
                    document.removeEventListener('click', enableMusicOnInteraction);
                    document.removeEventListener('keydown', enableMusicOnInteraction);
                    document.removeEventListener('touchstart', enableMusicOnInteraction);
                })
                .catch(() => {
                    // Still blocked - keep listeners active
                });
        };

        // Add listeners for ANY interaction (these will work because play() is in the handler)
        document.addEventListener('click', enableMusicOnInteraction, { passive: true });
        document.addEventListener('keydown', enableMusicOnInteraction, { passive: true });
        document.addEventListener('touchstart', enableMusicOnInteraction, { passive: true });
    }

    // Handle preloader
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                hidePreloader(preloader);
            }, CONFIG.PRELOADER_DELAY);
        });
    }

    // Initialize animations
    createSparkles();
    createFloatingParticles();
    createLightStreaks();
    addScrollEffects();
    addSchoolIconHoverEffects();
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);
