/**
 * Prashanto Roy Portfolio - Exact Layout Implementation
 * Handles circle hover effects and navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all circles
    const circles = document.querySelectorAll('.circle');
    
    // Add hover effects to circles
    circles.forEach(circle => {
        // Store original dimensions
        const originalWidth = circle.offsetWidth;
        const originalHeight = circle.offsetHeight;
        
        // Add hover event
        circle.addEventListener('mouseenter', function() {
            // Scale up the circle
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
            this.style.zIndex = '10';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            
            // Reset other circles in the same container
            const parent = this.parentElement;
            const siblings = parent.querySelectorAll('.circle');
            siblings.forEach(sibling => {
                if (sibling !== this) {
                    sibling.style.transform = 'scale(1)';
                    sibling.style.zIndex = '1';
                    sibling.style.boxShadow = 'none';
                }
            });
        });
        
        // Reset on mouse leave from container
        circle.parentElement.addEventListener('mouseleave', function() {
            const circles = this.querySelectorAll('.circle');
            circles.forEach(circle => {
                circle.style.transform = 'scale(1)';
                circle.style.zIndex = '1';
                circle.style.boxShadow = 'none';
            });
        });
        
        // Make circles clickable
        circle.addEventListener('click', function() {
            // Get container class to determine section
            const containerClass = this.parentElement.classList[1];
            const section = containerClass.split('-')[0]; // 'academic', 'professional', or 'projects'
            
            // Get index of this circle among siblings
            const siblings = [...this.parentElement.children];
            const index = siblings.indexOf(this);
            
            console.log(`Navigating to ${section} section, item ${index}`);
            // Here you would add navigation logic
        });
    });
    
    // Make box sections clickable
    const boxes = document.querySelectorAll('.intro-box, .academic-box, .professional-box, .projects-box');
    boxes.forEach(box => {
        box.addEventListener('click', function(e) {
            // Only trigger if click wasn't on a circle
            if (!e.target.classList.contains('circle')) {
                const section = this.classList[0].split('-')[0];
                console.log(`Navigating to ${section} section`);
                // Here you would add navigation logic
            }
        });
        
        // Add hover effect
        box.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.classList[1];
            console.log(`Navigating to ${section} section`);
            // Here you would add navigation logic
        });
    });
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            console.log('Scroll indicator clicked');
            // Here you would add scrolling logic
        });
        
        // Add hover effect
        scrollIndicator.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        scrollIndicator.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Simulate browser actions (for demo purposes)
    const browserButtons = document.querySelectorAll('.nav-button, .close-tab, .new-tab, .action-button');
    browserButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Browser action clicked');
            // Here you would add browser action logic
        });
    });
});
