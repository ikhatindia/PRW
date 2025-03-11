/**
 * Prashanto Roy Portfolio - Carousel Implementation
 * Handles carousel functionality and circle indicators
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all interactive elements
    const circles = document.querySelectorAll('.circle');
    const sectionBoxes = document.querySelectorAll('.section-box');
    const navLinks = document.querySelectorAll('.nav-link');
    const profileImage = document.querySelector('.profile-image');
    const logoImage = document.querySelector('.logo-image');
    
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
                const slideIndex = parseInt(this.dataset.slide);
                const slideIndicator = this.closest('.section-box').querySelector('.slide-indicator');
                
                // Update active slide
                slides.forEach(slide => slide.classList.remove('active'));
                if (slides[slideIndex]) {
                    slides[slideIndex].classList.add('active');
                    // Update slide indicator text
                    if (slideIndicator) {
                        slideIndicator.textContent = `Slide ${slideIndex + 1}`;
                    }
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
                    console.log(`Navigating to section: ${sectionId}`);
                    
                    // Create page transition effect
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
                        
                        // After transition completes, navigate to section
                        setTimeout(() => {
                            // For demo, just remove the transition
                            transition.style.opacity = '0';
                            setTimeout(() => transition.remove(), 500);
                        }, 500);
                    });
                }
            });
            
            // Ensure keyboard navigation works
            box.setAttribute('tabindex', '0');
            box.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const sectionId = this.id;
                    console.log(`Keyboard navigation to: ${sectionId}`);
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
                console.log(`Navigation link clicked: ${targetId}`);
                
                // Add page transition effect
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
                    
                    // After transition completes, navigate
                    setTimeout(() => {
                        // For demo, just remove the transition
                        transition.style.opacity = '0';
                        setTimeout(() => transition.remove(), 500);
                    }, 500);
                });
            });
        });
    }
    
    /**
     * Set up profile and logo image interactions
     */
    function setupImageInteractions() {
        if (profileImage) {
            profileImage.addEventListener('click', function() {
                console.log('Profile image clicked: navigating to About');
            });
        }
        
        if (logoImage) {
            logoImage.addEventListener('click', function() {
                console.log('Logo image clicked: navigating to Home');
            });
        }
    }
    
    /**
     * Handle window resize to maintain proportions
     */
    function handleResize() {
        // Adjust the layout if needed based on window size
        const adjustLayout = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // If mobile view, make content scrollable
            if (windowWidth < 992) {
                document.body.style.overflow = 'auto';
            } else {
                document.body.style.overflow = 'hidden';
            }
        };
        
        // Call on load and on resize
        adjustLayout();
        window.addEventListener('resize', adjustLayout);
    }
    
    // Initialize all functionality
    setupCircleIndicators();
    setupSectionBoxInteractions();
    setupNavLinkInteractions();
    setupImageInteractions();
    handleResize();
});
