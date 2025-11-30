/**
 * Device Detection Utility
 * Detects if user is on mobile device and handles redirects
 */

function isMobileDevice() {
    // Check user agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    
    // Check screen width (mobile typically < 768px)
    const isSmallScreen = window.innerWidth <= 768;
    
    // Check touch capability
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check if user manually forced desktop mode
    const forceDesktop = localStorage.getItem('forceDesktop') === 'true';
    
    // Check if user manually forced mobile mode
    const forceMobile = localStorage.getItem('forceMobile') === 'true';
    
    if (forceDesktop) return false;
    if (forceMobile) return true;
    
    // Primary detection: user agent
    if (mobileRegex.test(userAgent)) {
        return true;
    }
    
    // Secondary detection: small screen + touch capability
    if (isSmallScreen && hasTouchScreen) {
        return true;
    }
    
    return false;
}

function redirectToMobile() {
    // Don't redirect if already on mobile page
    if (window.location.pathname.includes('phone-clone')) {
        return;
    }
    
    // Don't redirect if on clone/terminal pages
    if (window.location.pathname.includes('clone') || window.location.pathname.includes('phone-terminal')) {
        return;
    }
    
    // Redirect to mobile version
    const mobilePath = 'phone-clone/index.html';
    window.location.href = mobilePath;
}

function redirectToDesktop() {
    // Redirect to desktop version
    window.location.href = '../index.html';
}

// Auto-redirect on page load (only for main index.html)
(function() {
    function initRedirect() {
        const path = window.location.pathname;
        const href = window.location.href;
        
        // Check if we're already in a subdirectory
        const isInPhoneClone = path.includes('phone-clone') || href.includes('phone-clone');
        const isInClone = path.includes('clone/') || href.includes('clone/');
        const isInPhoneTerminal = path.includes('phone-terminal') || href.includes('phone-terminal');
        
        // If already in a subdirectory, don't redirect
        if (isInPhoneClone || isInClone || isInPhoneTerminal) {
            return;
        }
        
        // Check if we're on the root index.html
        const isRootIndex = path === '/index.html' || 
                           path === '/' || 
                           path.endsWith('/index.html') ||
                           href.endsWith('index.html') ||
                           href.endsWith('/');
        
        // Only redirect if on root index and mobile device
        if (isRootIndex && isMobileDevice()) {
            redirectToMobile();
        }
    }
    
    // Run immediately (don't wait for DOM)
    initRedirect();
})();

