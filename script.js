/**
 * IKHAT Website JavaScript
 * This file contains all interactive functionality for the IKHAT website
 */
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements for better performance
    const elements = {
        mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
        navLinks: document.querySelectorAll('.nav-links a'),
        navMenu: document.querySelector('.nav-links'),
        sections: document.querySelectorAll('section'),
        scrollableAreas: document.querySelectorAll('.section-content, .library-content'),
        ctaButton: document.querySelector('.cta-button'),
        contactBoxes: document.querySelectorAll('.contact-box'),
        eventItems: document.querySelectorAll('.event-item'),
        images: document.querySelectorAll('img')
    };

    /**
     * Initialize mobile menu functionality
     * Toggles the mobile menu when the hamburger button is clicked
     */
    function initMobileMenu() {
        if (!elements.mobileMenuToggle) return;

        elements.mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = expanded ? 'hidden' : '';
        });

        // Close mobile menu when a navigation link is clicked
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function() {
                elements.mobileMenuToggle.classList.remove('active');
                elements.navMenu.classList.remove('active');
                elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /**
     * Initialize smooth scrolling for navigation links
     * When a navigation link is clicked, smooth scroll to the corresponding section
     */
    function initSmoothScrolling() {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate position with offset for header
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // Smooth scroll to element
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Add active class to navigation links based on scroll position
     * Highlights the current section in the navigation menu
     */
    function initScrollSpy() {
        // Throttle function to improve scroll performance
        function throttle(callback, delay) {
            let lastCall = 0;
            return function() {
                const now = new Date().getTime();
                if (now - lastCall >= delay) {
                    lastCall = now;
                    callback.apply(this, arguments);
                }
            };
        }
        
        const handleScroll = throttle(function() {
            const scrollPosition = window.scrollY + 200; // Add offset for better detection
            
            // Find the current section
            elements.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    elements.navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current section's link
                    const currentLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                    if (currentLink) {
                        currentLink.classList.add('active');
                    }
                }
            });
        }, 100); // 100ms throttle
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on init
    }

    /**
     * Add scroll indicators for scrollable content areas
     * Shows a visual indicator when content can be scrolled
     */
    function initScrollableAreas() {
        elements.scrollableAreas.forEach(area => {
            // Check if content overflows and needs scrolling
            const checkOverflow = function() {
                if (area.scrollHeight > area.clientHeight) {
                    area.classList.add('scrollable');
                    
                    // Add scroll indicator if it doesn't exist yet
                    if (!area.querySelector('.scroll-indicator')) {
                        const scrollIndicator = document.createElement('div');
                        scrollIndicator.className = 'scroll-indicator';
                        scrollIndicator.innerHTML = '⌄';
                        area.appendChild(scrollIndicator);
                    }
                    
                    // Show/hide indicator based on scroll position
                    area.addEventListener('scroll', function() {
                        const scrollIndicator = this.querySelector('.scroll-indicator');
                        if (scrollIndicator) {
                            const nearBottom = this.scrollHeight - this.scrollTop - this.clientHeight < 20;
                            scrollIndicator.style.opacity = nearBottom ? '0' : '1';
                        }
                    });
                } else {
                    area.classList.remove('scrollable');
                    // Remove indicator if content no longer overflows
                    const indicator = area.querySelector('.scroll-indicator');
                    if (indicator) {
                        indicator.remove();
                    }
                }
            };
            
            // Check on load
            checkOverflow();
            
            // Check again when window resizes
            window.addEventListener('resize', throttle(checkOverflow, 250));
            
            // Simple throttle function for resize events
            function throttle(callback, delay) {
                let timeoutId;
                return function() {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    timeoutId = setTimeout(callback, delay);
                };
            }
        });
    }

    /**
     * Add ripple effect to the CTA button
     * Creates a visual ripple effect when the button is clicked
     */
    function initCtaButton() {
        if (!elements.ctaButton) return;
        
        elements.ctaButton.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple element after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    /**
     * Add interactivity to contact boxes
     * Makes contact boxes interactive with hover effects and click handling
     */
    function initContactBoxes() {
        elements.contactBoxes.forEach(box => {
            // Handle click events
            box.addEventListener('click', function() {
                const boxTitle = this.querySelector('h3').textContent;
                
                // In a real implementation, you would show a form here
                // For now, we'll just show an alert
                alert(`You clicked "${boxTitle}". Contact form functionality will be implemented soon.`);
            });
            
            // Handle keyboard events for accessibility
            box.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    /**
     * Add animations to elements when they come into view
     * Elements fade in and slide up when they scroll into the viewport
     */
    function initScrollAnimations() {
        // Only initialize if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const animateObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, { threshold: 0.1 });
            
            // Elements to animate
            const animateElements = document.querySelectorAll('.philosophy-item, .contact-box, .event-item');
            
            animateElements.forEach(el => {
                el.classList.add('animation-ready');
                animateObserver.observe(el);
            });
            
            // Add CSS for animations if it doesn't exist
            if (!document.querySelector('style#animation-style')) {
                const style = document.createElement('style');
                style.id = 'animation-style';
                style.textContent = `
                    .animation-ready {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.6s ease, transform 0.6s ease;
                    }
                    
                    .animated {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    /**
     * Handle image fallbacks in case images fail to load
     * Shows a placeholder image when the actual image fails to load
     */
    function handleImageFallbacks() {
    // Keep track of whether we've logged about the logo already
    let logoErrorLogged = false;
    
    elements.images.forEach(img => {
        img.addEventListener('error', function() {
            // Special handling for logo
            if (this.alt === "IKHAT Logo") {
                // Only log the error once to avoid duplicate messages
                if (!logoErrorLogged) {
                    console.warn("Logo failed to load: assets/Logo.png");
                    logoErrorLogged = true;
                }
                
                // Create a text-based logo as fallback
                this.outerHTML = `<div style="display:flex; justify-content:center; align-items:center; width:100%; height:100%;">
                                    <span style="color:var(--primary-blue); font-weight:bold; font-size:18px;">IKHAT</span>
                                  </div>`;
                return;
            }
            
            // For other images
            const width = this.width || this.parentElement.offsetWidth || 300;
            const height = this.height || this.parentElement.offsetHeight || 200;
            this.src = `https://via.placeholder.com/${width}x${height}?text=${this.alt || 'Image'}`;
        });
    });
}

    /**
     * Add skip link for keyboard accessibility
     * Allows keyboard users to skip the navigation and go directly to the main content
     */
    function addSkipLink() {
        // Create skip link element
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        
        // Insert at the beginning of the body
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add id to main element
        const main = document.querySelector('main');
        if (main) {
            main.id = 'main';
        }
    }

    /**
     * Initialize all features
     */
    function init() {
        initMobileMenu();
        initSmoothScrolling();
        initScrollSpy();
        initScrollableAreas();
        initCtaButton();
        initContactBoxes();
        initScrollAnimations();
        handleImageFallbacks();
        addSkipLink();
        
        console.log('IKHAT website initialization complete');
    }
    
    // Start initialization
    init();
});
