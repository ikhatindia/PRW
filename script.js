/**
 * Prashanto Roy Portfolio
 * Main JavaScript for interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all interactive elements
    const circles = document.querySelectorAll('.circle');
    const sectionBoxes = document.querySelectorAll('.section-box');
    const navLinks = document.querySelectorAll('.nav-link');
    
    /**
     * Set up circle indicator functionality
     * Each circle expands on hover and indicates active slide
     */
    function setupCircleIndicators() {
        // Make first circle in each container active by default
        document.querySelectorAll('.circle-container').forEach(container => {
            if (container.querySelector('.circle')) {
                container.querySelector('.circle').classList.add('active');
            }
        });
        
        // Add hover and click events to all circles
        circles.forEach(circle => {
            // Add hover effect
            circle.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });
            
            circle.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(1)';
                }
            });
            
            // Add click event to change active circle
            circle.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent section box click
                
                // Get all circles in this container
                const container = this.closest('.circle-container');
                const siblings = container.querySelectorAll('.circle');
                
                // Reset all circles
                siblings.forEach(sibling => {
                    sibling.classList.remove('active');
                    sibling.style.transform = 'scale(1)';
                });
                
                // Activate this circle
                this.classList.add('active');
                this.style.transform = 'scale(1.2)';
                
                // In a real implementation, this would change the slide content
                console.log(`Switched to slide ${Array.from(siblings).indexOf(this) + 1}`);
            });
        });
    }
    
    /**
     * Set up section box interactions
     * Each box navigates to its corresponding page when clicked
     */
    function setupSectionBoxes() {
        sectionBoxes.forEach(box => {
            box.addEventListener('click', function() {
                const sectionId = this.id;
                
                // Create a fade transition effect
                const transition = document.createElement('div');
                transition.style.position = 'fixed';
                transition.style.top = '0';
                transition.style.left = '0';
                transition.style.width = '100%';
                transition.style.height = '100%';
                transition.style.backgroundColor = 'white';
                transition.style.opacity = '0';
                transition.style.transition = 'opacity 0.5s ease';
                transition.style.zIndex = '1000';
                
                document.body.appendChild(transition);
                
                // Trigger animation
                requestAnimationFrame(() => {
                    transition.style.opacity = '1';
                    
                    // After transition completes, navigate
                    setTimeout(() => {
                        console.log(`Navigating to ${sectionId} page`);
                        
                        // For demo purposes, just fade out
                        transition.style.opacity = '0';
                        setTimeout(() => {
                            transition.remove();
                        }, 500);
                    }, 500);
                });
            });
        });
    }
    
    /**
     * Set up navigation link interactions
     */
    function setupNavLinks() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // Create transition effect
                const transition = document.createElement('div');
                transition.style.position = 'fixed';
                transition.style.top = '0';
                transition.style.left = '0';
                transition.style.width = '100%';
                transition.style.height = '100%';
                transition.style.backgroundColor = 'white';
                transition.style.opacity = '0';
                transition.style.transition = 'opacity 0.5s ease';
                transition.style.zIndex = '1000';
                
                document.body.appendChild(transition);
                
                // Trigger animation
                requestAnimationFrame(() => {
                    transition.style.opacity = '1';
                    
                    // Navigate
                    setTimeout(() => {
                        console.log(`Navigation link clicked: ${targetId}`);
                        
                        // For demo, just fade out
                        transition.style.opacity = '0';
                        setTimeout(() => {
                            transition.remove();
                        }, 500);
                    }, 500);
                });
            });
        });
    }
    
    /**
     * Handle window resize to adjust layout if needed
     */
    function handleResize() {
        const contentWrapper = document.querySelector('.content-wrapper');
        const layoutWrapper = document.querySelector('.layout-wrapper');
        
        window.addEventListener('resize', function() {
            // Check if we need to adjust for small screens
            if (window.innerWidth < 768) {
                document.body.style.overflowY = 'auto';
                layoutWrapper.style.height = 'auto';
            } else {
                document.body.style.overflowY = 'hidden';
                layoutWrapper.style.height = '100%';
            }
        });
        
        // Initial check
        if (window.innerWidth < 768) {
            document.body.style.overflowY = 'auto';
            layoutWrapper.style.height = 'auto';
        }
    }
    
    // Initialize all functionality
    setupCircleIndicators();
    setupSectionBoxes();
    setupNavLinks();
    handleResize();
});
