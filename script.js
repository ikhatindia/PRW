/**
 * Prashanto Roy Portfolio - Carousel Implementation
 * Handles carousel functionality, circle indicators, and responsive scaling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all interactive elements
    const circles = document.querySelectorAll('.circle');
    const sectionBoxes = document.querySelectorAll('.section-box');
    const navLinks = document.querySelectorAll('.nav-link');
    const profileImage = document.querySelector('.profile-image');
    const logoImage = document.querySelector('.logo-image');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    /**
     * Set up circle indicator interactions
     * When clicking a circle, it changes the active slide and expands the circle
     */
    function setupCircleIndicators() {
        circles.forEach(circle => {
            // Add hover effect
            circle.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
            });
            
            circle.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = 'none';
                }
            });
            
            // Add click event to change slides
            circle.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent box click event
                
                const container = this.closest('.carousel-container');
                const slides = container.querySelectorAll('.carousel-slide');
                const circles = container.querySelectorAll('.circle');
                const slideIndex = this.dataset.slide;
                
                // Update active slide
                slides.forEach(slide => slide.classList.remove('active'));
                if (slides[slideIndex]) {
                    slides[slideIndex].classList.add('active');
                }
                
                // Update active circle
                circles.forEach(c => {
                    c.classList.remove('active');
                    c.style.transform = 'scale(1)';
                    c.style.boxShadow = 'none';
                });
                this.classList.add('active');
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
            });
        });
    }
    
    /**
     * Set up section box interactions
     * When clicking on a box, navigate to the corresponding section
     */
    function setupSectionBoxInteractions() {
        sectionBoxes.forEach(box => {
            box.addEventListener('click', function(e) {
                // Only trigger if the click wasn't directly on a circle
                if (!e.target.classList.contains('circle')) {
                    const sectionId = this.id;
                    navigateToSection(sectionId);
                }
            });
            
            // Ensure boxes are keyboard navigable
            box.setAttribute('tabindex', '0');
            box.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const sectionId = this.id;
                    navigateToSection(sectionId);
                }
            });
        });
    }
    
    /**
     * Set up navigation link interactions
     */
    function setupNavLinkInteractions() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                navigateToSection(targetId);
            });
        });
    }
    
    /**
     * Set up profile and logo image interactions
     */
    function setupImageInteractions() {
        if (profileImage) {
            profileImage.addEventListener('click', function() {
                navigateToSection('about');
            });
        }
        
        if (logoImage) {
            logoImage.addEventListener('click', function() {
                navigateToSection('home');
            });
        }
    }
    
    /**
     * Set up carousel functionality
     * Initialize carousels with the middle slide active
     */
    function setupCarousels() {
        const carousels = document.querySelectorAll('.carousel-container');
        
        carousels.forEach(carousel => {
            const slides = carousel.querySelectorAll('.carousel-slide');
            const circles = carousel.querySelectorAll('.circle');
            
            // Find the middle circle/slide
            const middleIndex = Math.floor(circles.length / 2);
            
            // Set initial active slide and circle
            slides.forEach(slide => slide.classList.remove('active'));
            if (slides[middleIndex]) {
                slides[middleIndex].classList.add('active');
            }
            
            circles.forEach(circle => {
                circle.classList.remove('active');
                circle.style.transform = 'scale(1)';
                circle.style.boxShadow = 'none';
            });
            
            if (circles[middleIndex]) {
                circles[middleIndex].classList.add('active');
                circles[middleIndex].style.transform = 'scale(1.2)';
                circles[middleIndex].style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
            }
        });
    }
    
    /**
     * Handle scroll indicator interaction
     */
    function setupScrollIndicator() {
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                // Smooth scroll to footer
                const footer = document.querySelector('.footer-nav');
                if (footer) {
                    footer.scrollIntoView({behavior: 'smooth'});
                }
            });
        }
    }
    
    /**
     * Handle navigation to different sections
     * @param {string} sectionId - ID of the section to navigate to
     */
    function navigateToSection(sectionId) {
        console.log(`Navigating to: ${sectionId}`);
        
        // Create transition effect
        const transition = document.createElement('div');
        transition.style.position = 'fixed';
        transition.style.top = '0';
        transition.style.left = '0';
        transition.style.width = '100%';
        transition.style.height = '100%';
        transition.style.backgroundColor = 'white';
        transition.style.zIndex = '1000';
        transition.style.opacity = '0';
        transition.style.transition = 'opacity 0.5s ease';
        
        document.body.appendChild(transition);
        
        // Trigger animation
        requestAnimationFrame(() => {
            transition.style.opacity = '1';
            
            // In a real implementation, you would navigate to the target page
            // For demo purposes, we'll just fade in and out
            setTimeout(() => {
                transition.style.opacity = '0';
                setTimeout(() => {
                    transition.remove();
                }, 500);
            }, 500);
        });
    }
    
    /**
     * Handle responsive behavior on mobile devices
     */
    function setupMobileResponsiveness() {
        function checkMobile() {
            if (window.innerWidth <= 768) {
                // On mobile, make the layout scrollable
                document.body.style.overflow = 'auto';
                
                // Adjust carousel containers for touch
                document.querySelectorAll('.carousel-container').forEach(container => {
                    container.style.minHeight = '250px';
                });
            } else {
                // On desktop, use the original layout
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Check on load
        checkMobile();
        
        // Check on resize
        window.addEventListener('resize', checkMobile);
    }
    
    // Initialize all functionality
    setupCircleIndicators();
    setupSectionBoxInteractions();
    setupNavLinkInteractions();
    setupImageInteractions();
    setupCarousels();
    setupScrollIndicator();
    setupMobileResponsiveness();
});
