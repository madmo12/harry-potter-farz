// Preloader functionality
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const backgroundMusic = document.getElementById('background-music');
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
                // Add class to body to indicate preloader is done
                document.body.classList.add('loaded');
                
                // Animate hero section elements
                const glassesContainer = document.querySelector('.glasses-container');
                const heroTitle = document.querySelector('.hero-content h2');
                
                if (glassesContainer) {
                    glassesContainer.style.opacity = '1';
                    glassesContainer.style.animation = 'fadeInHero 1.5s ease-out forwards';
                }
                
                if (heroTitle) {
                    heroTitle.style.opacity = '1';
                    heroTitle.style.animation = 'fadeInHero 1.5s ease-out forwards';
                }
                
                // Play background music after preloader is done
                if (backgroundMusic) {
                    // Set volume to a low level (0.1 as requested)
                    backgroundMusic.volume = 0.1;
                    // Attempt to play the music
                    try {
                        const playPromise = backgroundMusic.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.log('Autoplay prevented:', error);
                                // Try to play on first user interaction
                                document.body.addEventListener('click', function() {
                                    backgroundMusic.play();
                                }, { once: true });
                                document.body.addEventListener('keydown', function() {
                                    backgroundMusic.play();
                                }, { once: true });
                                document.body.addEventListener('touchstart', function() {
                                    backgroundMusic.play();
                                }, { once: true });
                                // Show a button to manually start music if autoplay is blocked
                                showMusicButton();
                            });
                        }
                    } catch (error) {
                        console.log('Autoplay error:', error);
                        // Try to play on first user interaction
                        document.body.addEventListener('click', function() {
                            backgroundMusic.play();
                        }, { once: true });
                        document.body.addEventListener('keydown', function() {
                            backgroundMusic.play();
                        }, { once: true });
                        document.body.addEventListener('touchstart', function() {
                            backgroundMusic.play();
                        }, { once: true });
                    }
                }
            }, 500);
        }, 2000); // Increased delay for better effect
    });
    
    // Create sparkles for hero section
    createSparkles();
    
    // Create floating particles
    createFloatingParticles();
    
    // Create light streaks
    createLightStreaks();
    
    // Add scroll effects
    addScrollEffects();
});

// Function to create sparkles in the hero section
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    const sparkleCount = 70; // Increased sparkle count
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        sparkle.style.left = `${posX}%`;
        sparkle.style.top = `${posY}%`;
        
        // Random size
        const size = Math.random() * 4 + 1; // Slightly larger sparkles
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random animation delay
        const delay = Math.random() * 7; // Longer delay range
        sparkle.style.animationDelay = `${delay}s`;
        
        // Random animation duration
        const duration = Math.random() * 5 + 3; // Variable duration
        sparkle.style.animationDuration = `${duration}s`;
        
        // Random color variation
        const colors = [
            'var(--white-blue)',
            'var(--golden)',
            'var(--glow-blue)',
            'var(--crimson-red)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.backgroundColor = color;
        
        sparklesContainer.appendChild(sparkle);
    }
}

// Function to create floating particles
function createFloatingParticles() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach((section, index) => {
        const particleCount = 25; // Increased particle count
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            particle.style.left = `${posX}%`;
            
            // Random size
            const size = Math.random() * 6 + 2; // Larger size range
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation duration
            const duration = Math.random() * 25 + 15; // Longer duration
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 10; // Longer delay range
            particle.style.animationDelay = `${delay}s`;
            
            // Different colors for different sections
            const colors = [
                'var(--white-blue)',
                'var(--golden)',
                'var(--glow-blue)',
                'var(--crimson-red)',
                'var(--silver)'
            ];
            const colorIndex = (index + i) % colors.length;
            particle.style.backgroundColor = colors[colorIndex];
            
            // Add glow effect
            particle.style.boxShadow = `0 0 ${size * 2}px ${colors[colorIndex]}`;
            
            section.appendChild(particle);
        }
    });
}

// Function to create light streaks
function createLightStreaks() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach((section, index) => {
        const streakCount = 8; // Increased streak count
        
        for (let i = 0; i < streakCount; i++) {
            const streak = document.createElement('div');
            streak.classList.add('light-streak');
            
            // Random vertical position
            const posY = Math.random() * 100;
            streak.style.top = `${posY}%`;
            
            // Random width
            const width = Math.random() * 300 + 150; // Longer streaks
            streak.style.width = `${width}px`;
            
            // Random height
            const height = Math.random() * 4 + 2; // Variable height
            streak.style.height = `${height}px`;
            
            // Random animation duration
            const duration = Math.random() * 15 + 10; // Longer duration
            streak.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 15; // Longer delay range
            streak.style.animationDelay = `${delay}s`;
            
            // Different gradient colors for different sections
            const gradients = [
                'linear-gradient(to right, transparent, var(--glow-blue), transparent)',
                'linear-gradient(to right, transparent, var(--golden), transparent)',
                'linear-gradient(to right, transparent, var(--crimson-red), transparent)',
                'linear-gradient(to right, transparent, var(--silver), transparent)'
            ];
            const gradientIndex = index % gradients.length;
            streak.style.background = gradients[gradientIndex];
            
            section.appendChild(streak);
        }
    });
}

// Add hover effects to school icons
document.addEventListener('DOMContentLoaded', function() {
    const schoolIcons = document.querySelectorAll('.school-icon');
    
    schoolIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const shape = this.querySelector('.icon-shape');
            shape.style.transform = 'scale(1.25) rotate(-10deg)';
            
            // Add glow effect on hover
            this.style.filter = 'drop-shadow(0 0 20px currentColor)';
        });
        
        icon.addEventListener('mouseleave', function() {
            const shape = this.querySelector('.icon-shape');
            shape.style.transform = 'scale(1) rotate(0deg)';
            
            // Remove glow effect
            this.style.filter = 'none';
        });
    });
});

// Add scroll effects for content sections
function addScrollEffects() {
    const sections = document.querySelectorAll('.content-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Also animate the heading
                const heading = entry.target.querySelector('h2');
                if (heading) {
                    heading.style.animation = 'fadeIn 1s ease-out 0.3s forwards';
                }
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

