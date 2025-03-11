/**
 * Prashanto Roy Portfolio - Exact Figma Implementation
 * Handles interactive elements and responsive scaling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all interactive elements
    const circles = document.querySelectorAll('.circle');
    const sectionBoxes = document.querySelectorAll('.section-box');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const viewport = document.getElementById('viewport');
    
    /**
     * Set up circle hover interactions
     * When hovering over a circle, it expands while others in the same container return to normal size
     */
    function setupCircleInteractions() {
        circles.forEach(circle => {
            // Add mouseenter event
            circle.addEventListener('mouseenter', function() {
                // Reset all circles in this container
                const container = this.parentElement;
                const siblingCircles = container.querySelectorAll('.circle');
                
                siblingCircles.forEach(sibling => {
                    sibling.style.transform = 'scale(1)';
                    sibling.style.zIndex = '1';
                    sibling.style.boxShadow = 'none';
                });
                
                // Expand this circle
                this.style.transform = 'scale(1.2)';
                this.style.zIndex = '10';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
            });
            
            // Add click event for navigation
            circle.addEventListener('click', function() {
                const sectionId = this.closest('.section-box').id;
                const index = Array.from(this.parentElement.children).indexOf(this);
                handleNavigation(sectionId, index);
            });
        });
        
        // Reset circles when mouse leaves container
        document.querySelectorAll('.circle-container').forEach(container => {
            container.addEventListener('mouseleave', function() {
                const circles = this.querySelectorAll('.circle');
                circles.forEach(circle => {
                    circle.style.transform = 'scale(1)';
                    circle.style.zIndex = '1';
                    circle.style.boxShadow = 'none';
                });
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
                    handleNavigation(sectionId);
                }
            });
            
            // Ensure boxes are keyboard navigable
            box.setAttribute('tabindex', '0');
            box.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const sectionId = this.id;
                    handleNavigation(sectionId);
                }
            });
        });
    }
    
    /**
     * Set up navigation link interactions
     * When clicking a nav link, navigate to the corresponding section
     */
    function setupNavLinkInteractions() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                handleNavigation(targetId);
            });
        });
    }
    
    /**
     * Handle scroll indicator interaction
     */
    function setupScrollIndicator() {
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                // Smooth scroll logic would go here
                console.log('Scroll indicator clicked');
            });
        }
    }
    
    /**
     * Handle navigation to different sections
     * @param {string} sectionId - ID of the section to navigate to
     * @param {number} [itemIndex] - Optional index of a specific item within the section
     */
    function handleNavigation(sectionId, itemIndex) {
        console.log(`Navigating to ${sectionId}${itemIndex !== undefined ? ', item ' + itemIndex : ''}`);
        
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
            
            // After transition completes, you would:
            // 1. Change the URL (using history API)
            // 2. Load the new page content
            
            setTimeout(() => {
                // For demo purposes, just remove the transition
                transition.style.opacity = '0';
                setTimeout(() => {
                    transition.remove();
                }, 500);
            }, 500);
        });
    }
    
    /**
     * Handle responsive scaling
     * Ensures the layout maintains proportions on different screen sizes
     */
    function setupResponsiveScaling() {
        function updateScale() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const scaleX = windowWidth / 1728;
            const scaleY = windowHeight / 1117;
            const scale = Math.min(scaleX, scaleY);
            
            viewport.style.transform = `scale(${scale})`;
            viewport.style.transformOrigin = 'top left';
            
            // Adjust body dimensions to prevent scrolling
            document.body.style.width = `${1728 * scale}px`;
            document.body.style.height = `${1117 * scale}px`;
        }
        
        // Initial scaling
        updateScale();
        
        // Update on resize
        window.addEventListener('resize', updateScale);
    }
    
    // Initialize all interactions
    setupCircleInteractions();
    setupSectionBoxInteractions();
    setupNavLinkInteractions();
    setupScrollIndicator();
    setupResponsiveScaling();
});
