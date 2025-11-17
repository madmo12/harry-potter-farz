/**
 * Configuration constants for Magical Academy - The Goblet of Fire
 */

// ============================================================================
// APPLICATION CONFIG
// ============================================================================

const CONFIG = {
    PRELOADER_DELAY: 2000,
    FADE_OUT_DELAY: 500,
    MUSIC_VOLUME: 0.1,
    SPARKLE_COUNT: 70,
    PARTICLE_COUNT: 25,
    STREAK_COUNT: 8,
    ANIMATION_THRESHOLD: 0.1,
    // Set to true to show music enable button immediately when autoplay is blocked
    // Set to false to wait for user interaction instead
    SHOW_MUSIC_BUTTON_ON_AUTOPLAY_BLOCK: true
};

// ============================================================================
// COLOR CONSTANTS
// ============================================================================

const COLORS = {
    WHITE_BLUE: 'var(--white-blue)',
    GOLDEN: 'var(--golden)',
    GLOW_BLUE: 'var(--glow-blue)',
    CRIMSON_RED: 'var(--crimson-red)',
    SILVER: 'var(--silver)'
};

const COLOR_ARRAY = [
    COLORS.WHITE_BLUE,
    COLORS.GOLDEN,
    COLORS.GLOW_BLUE,
    COLORS.CRIMSON_RED
];

const PARTICLE_COLORS = [
    ...COLOR_ARRAY,
    COLORS.SILVER
];

// ============================================================================
// GRADIENT CONSTANTS
// ============================================================================

const GRADIENTS = [
    'linear-gradient(to right, transparent, var(--glow-blue), transparent)',
    'linear-gradient(to right, transparent, var(--golden), transparent)',
    'linear-gradient(to right, transparent, var(--crimson-red), transparent)',
    'linear-gradient(to right, transparent, var(--silver), transparent)'
];

