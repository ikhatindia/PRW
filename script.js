/**
 * Prashanto Roy Portfolio JavaScript
 * Controls interactive elements, animations, and navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('.button-section');
    const circles = document.querySelectorAll('.circle');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    /**
     * Initialize all page animations and interactions
     */
    function init() {
        // Apply entrance animations with staggered delay
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate-in');
            }, 100 * index);
        });
        
        // Set up interactive behaviors
        setupCircleInteractions();
        setupSectionInteractions();
        setupNavigationInteractions();
        setupScrollIndicator();
        
        // Set first circle in each section as active initially
        document.querySelectorAll('.circle-nav').forEach(nav => {
            if (nav.children.length > 0) {
                nav.children[0].classList.add('active');
            }
        });
    }
    
    /**
     * Sets up circle button interactions
     */
    function setupCircleInteractions() {
        circles.forEach(circle => {
            // Mouse hover effects
            circle.addEventListener('mouseenter', () => {
                // Deactivate other circles in same navigation
                const siblings = circle.parentElement.querySelectorAll('.circle');
                siblings.forEach(sibling => {
                    sibling.classList.remove('active');
                });
                
                // Activate this circle
                circle.classList.add('active');
                
                // Trigger content change based on circle index
                const index = Array.from(circle.parentElement.children).indexOf(circle);
                const sectionId = circle.closest('.button-section').id;
                changeContent(sectionId, index);
            });
            
            // Click behavior (for loading related page or content)
            circle.addEventListener('click', () => {
                // Get section ID and circle index
                const sectionId = circle.closest('.button-section').id;
                const index = Array.from(circle.parentElement.children).indexOf(circle);
                
                // Navigate to the specific content
                navigateToContent(sectionId, index);
            });
        });
    }
    
    /**
     * Sets up interactions for main section boxes
     */
    function setupSectionInteractions() {
        sections.forEach(section => {
            // Click behavior (navigate to section page)
            section.addEventListener('click', (event) => {
                // Only trigger if the click wasn't on a circle
                if (!event.target.classList.contains('circle')) {
                    navigateToSection(section.id);
                }
            });
            
            // Add focus states for keyboard navigation
            section.setAttribute('tabindex', '0');
            section.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    navigateToSection(section.id);
                }
            });
        });
    }
    
    /**
     * Sets up navigation link interactions
     */
    function setupNavigationInteractions() {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Get the target section from the href
                const targetId = link.getAttribute('href').substring(1);
                navigateToSection(targetId);
            });
        });
    }
    
    /**
     * Sets up scroll indicator behavior
     */
    function setupScrollIndicator() {
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
            
            // Hide/show based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            });
        }
    }
    
    /**
     * Handles content changes when hovering over circles
     * @param {string} sectionId - ID of the section
     * @param {number} index - Index of the content to show
     */
    function changeContent(sectionId, index) {
        // This would update content within the section based on the selected circle
        console.log(`Changing ${sectionId} content to item ${index}`);
        
        // Here you would add logic to:
        // 1. Load or display the specific content associated with this index
        // 2. Update any visual indicators
        
        // For example, if you had content divs:
        // const contentItems = document.querySelectorAll(`#${sectionId}-content .content-item`);
        // contentItems.forEach(item => item.classList.remove('active'));
        // contentItems[index]?.classList.add('active');
    }
    
    /**
     * Navigate to a specific piece of content within a section
     * @param {string} sectionId - ID of the section
     * @param {number} index - Index of the content to navigate to
     */
    function navigateToContent(sectionId, index) {
        console.log(`Navigating to ${sectionId} content item ${index}`);
        
        // Create page transition effect
        const transition = createTransitionElement();
        
        // After transition completes, you would:
        // 1. Change the URL (using history API)
        // 2. Load the new page content
        
        setTimeout(() => {
            // Simulate page change (replace with actual navigation)
            // window.location.href = `/${sectionId}/${index}`;
            
            // For demo purposes, just remove the transition
            transition.classList.add('exit');
            setTimeout(() => {
                transition.remove();
            }, 500);
        }, 500);
    }
    
    /**
     * Navigate to a section page
     * @param {string} sectionId - ID of the section to navigate to
     */
    function navigateToSection(sectionId) {
        console.log(`Navigating to section: ${sectionId}`);
        
        // Create page transition effect
        const transition = createTransitionElement();
        
        // After transition completes, navigate to the section page
        setTimeout(() => {
            // Simulate page change (replace with actual navigation)
            // window.location.href = `/${sectionId}`;
            
            // For demo purposes, just remove the transition
            transition.classList.add('exit');
            setTimeout(() => {
                transition.remove();
            }, 500);
        }, 500);
    }
    
    /**
     * Creates a transition element for page changes
     * @returns {Element} The transition element
     */
    function createTransitionElement() {
        const transition = document.createElement('div');
        transition.classList.add('page-transition');
        document.body.appendChild(transition);
        
        // Trigger animation
        setTimeout(() => {
            transition.classList.add('active');
        }, 10);
        
        return transition;
    }
    
    /**
     * Load content for sections (simulated)
     * In a real implementation, this might fetch content from an API or load HTML partials
     */
    function loadContentForSections() {
        // This is a placeholder for actual content loading
        console.log('Loading section content');
        
        // Example of how you might populate images for circles:
        // circles.forEach((circle, index) => {
        //     circle.style.backgroundImage = `url('/images/thumbnail-${index}.jpg')`;
        // });
    }
    
    // Add responsive behavior for window resizing
    function handleResize() {
        // This function could handle special cases for different screen sizes
        // For now, our CSS handles most of the responsive behavior
    }
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Initialize keyboard navigation for accessibility
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            // Tab key is handled natively for focusing elements
            
            // Arrow keys for navigating between sections when focused
            if (document.activeElement.classList.contains('button-section')) {
                const section = document.activeElement;
                const circleNav = section.querySelector('.circle-nav');
                
                if (circleNav) {
                    const circles = circleNav.querySelectorAll('.circle');
                    const activeIndex = Array.from(circles).findIndex(circle => 
                        circle.classList.contains('active'));
                    
                    if (event.key === 'ArrowLeft' && activeIndex > 0) {
                        circles[activeIndex - 1].dispatchEvent(new Event('mouseenter'));
                    } else if (event.key === 'ArrowRight' && activeIndex < circles.length - 1) {
                        circles[activeIndex + 1].dispatchEvent(new Event('mouseenter'));
                    }
                }
            }
        });
    }
    
    // Call initialization functions
    init();
    loadContentForSections();
    setupKeyboardNavigation();
    handleResize();
});
