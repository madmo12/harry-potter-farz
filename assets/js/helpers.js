/**
 * Helper functions for Magical Academy - The Goblet of Fire
 * Contains DOM utilities, music handlers, and animation functions
 */

// ============================================================================
// DOM UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely gets an element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} Element or null if not found
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Safely queries a selector
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} Element or null if not found
 */
function querySelector(selector) {
    return document.querySelector(selector);
}

/**
 * Safely queries all matching selectors
 * @param {string} selector - CSS selector
 * @returns {NodeList} NodeList of elements
 */
function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}

// ============================================================================
// MUSIC FUNCTIONS
// ============================================================================

/**
 * Creates and shows a music enable button overlay
 * @param {HTMLAudioElement} audioElement - Audio element to play
 */
function showMusicEnableButton(audioElement) {
    if (!audioElement) return;

    // Check if button already exists
    if (getElementById('music-enable-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'music-enable-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;

    const button = document.createElement('button');
    button.textContent = '🎵 Enable Background Music';
    button.style.cssText = `
        padding: 20px 40px;
        font-size: 18px;
        font-family: 'Cinzel', serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: 2px solid #fff;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, box-shadow 0.2s;
    `;

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('click', async () => {
        try {
            audioElement.volume = CONFIG.MUSIC_VOLUME;
            await audioElement.play();
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                overlay.remove();
            }, 500);
        } catch (error) {
            console.warn('Failed to play music:', error);
        }
    });

    overlay.appendChild(button);
    document.body.appendChild(overlay);
}

/**
 * Attempts to play background music with fallback to user interaction button
 * @param {HTMLAudioElement} audioElement - Audio element to play
 */
async function playBackgroundMusic(audioElement) {
    if (!audioElement) return;

    // Check if music is already playing
    if (!audioElement.paused) {
        return; // Music is already playing
    }

    try {
        audioElement.volume = CONFIG.MUSIC_VOLUME;
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
            await playPromise;
            // Music started successfully, no need for user interaction
        }
    } catch (error) {
        console.log('Autoplay prevented:', error);
        // Show button overlay to allow user to enable music with one click
        showMusicEnableButton(audioElement);
    }
}

// ============================================================================
// PRELOADER FUNCTIONS
// ============================================================================

/**
 * Animates hero section elements
 */
function animateHeroElements() {
    const glassesContainer = querySelector('.glasses-container');
    const heroTitle = querySelector('.hero-content h2');

    if (glassesContainer) {
        glassesContainer.style.opacity = '1';
        glassesContainer.style.animation = 'fadeInHero 1.5s ease-out forwards';
    }

    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.animation = 'fadeInHero 1.5s ease-out forwards';
    }
}

/**
 * Hides preloader with fade-out animation
 * @param {HTMLElement} preloader - Preloader element
 */
function hidePreloader(preloader) {
    if (!preloader) return;

    preloader.classList.add('fade-out');
    
    setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
        
        animateHeroElements();
    }, CONFIG.FADE_OUT_DELAY);
}

// ============================================================================
// ANIMATION FUNCTIONS
// ============================================================================

/**
 * Creates sparkles in the hero section
 */
function createSparkles() {
    const sparklesContainer = querySelector('.sparkles');
    if (!sparklesContainer) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < CONFIG.SPARKLE_COUNT; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 4 + 1;
        const delay = Math.random() * 7;
        const duration = Math.random() * 5 + 3;
        const color = COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];

        sparkle.style.left = `${posX}%`;
        sparkle.style.top = `${posY}%`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animationDelay = `${delay}s`;
        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.backgroundColor = color;

        fragment.appendChild(sparkle);
    }

    sparklesContainer.appendChild(fragment);
}

/**
 * Creates floating particles for content sections
 */
function createFloatingParticles() {
    const sections = querySelectorAll('.content-section');
    if (!sections.length) return;

    sections.forEach((section, sectionIndex) => {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const posX = Math.random() * 100;
            const size = Math.random() * 6 + 2;
            const duration = Math.random() * 25 + 15;
            const delay = Math.random() * 10;
            const colorIndex = (sectionIndex + i) % PARTICLE_COLORS.length;
            const color = PARTICLE_COLORS[colorIndex];

            particle.style.left = `${posX}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

            fragment.appendChild(particle);
        }

        section.appendChild(fragment);
    });
}

/**
 * Creates light streaks for content sections
 */
function createLightStreaks() {
    const sections = querySelectorAll('.content-section');
    if (!sections.length) return;

    sections.forEach((section, sectionIndex) => {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < CONFIG.STREAK_COUNT; i++) {
            const streak = document.createElement('div');
            streak.classList.add('light-streak');

            const posY = Math.random() * 100;
            const width = Math.random() * 300 + 150;
            const height = Math.random() * 4 + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 15;
            const gradientIndex = sectionIndex % GRADIENTS.length;

            streak.style.top = `${posY}%`;
            streak.style.width = `${width}px`;
            streak.style.height = `${height}px`;
            streak.style.animationDuration = `${duration}s`;
            streak.style.animationDelay = `${delay}s`;
            streak.style.background = GRADIENTS[gradientIndex];

            fragment.appendChild(streak);
        }

        section.appendChild(fragment);
    });
}

/**
 * Adds scroll effects for content sections using Intersection Observer
 */
function addScrollEffects() {
    const sections = querySelectorAll('.content-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const heading = entry.target.querySelector('h2');
                if (heading) {
                    heading.style.animation = 'fadeIn 1s ease-out 0.3s forwards';
                }
            }
        });
    }, { threshold: CONFIG.ANIMATION_THRESHOLD });

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Adds hover effects to school icons
 */
function addSchoolIconHoverEffects() {
    const schoolIcons = querySelectorAll('.school-icon');
    if (!schoolIcons.length) return;

    schoolIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const shape = this.querySelector('.icon-shape');
            if (shape) {
                shape.style.transform = 'scale(1.25) rotate(-10deg)';
            }
            this.style.filter = 'drop-shadow(0 0 20px currentColor)';
        });

        icon.addEventListener('mouseleave', function() {
            const shape = this.querySelector('.icon-shape');
            if (shape) {
                shape.style.transform = 'scale(1) rotate(0deg)';
            }
            this.style.filter = 'none';
        });
    });
}

