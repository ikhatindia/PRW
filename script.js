/**
 * Portfolio Website JavaScript
 * Minimalist monochrome theme
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize reveal animations
    initRevealAnimations();
    
    // Initialize active navigation
    initActiveNavigation();
    
    // Form handling (optional)
    initContactForm();
});

/**
 * Reveal elements when they come into view using Intersection Observer
 */
function initRevealAnimations() {
    // Create the observer with options
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to show the element
                entry.target.classList.add('visible');
                
                // Unobserve the element after it's been revealed
                // This improves performance for elements that remain in view
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,  // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -100px 0px'  // Adjust the trigger area (negative values delay trigger)
    });
    
    // Target all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Update active navigation link based on scroll position
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Throttle function to limit how often scroll event fires
    function throttle(callback, delay) {
        let lastCall = 0;
        return function() {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                callback.apply(this, arguments);
            }
        };
    }
    
    const handleScroll = throttle(() => {
        // Get current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        // Check each section to see if it's in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, 100);
    
    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);
    
    // Call once on page load
    handleScroll();
}

/**
 * Handle contact form submission
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Basic validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For this example, we'll just display a success message
        
        // Get the submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show sending state
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission with a timeout
        setTimeout(() => {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.style.padding = '1rem';
            successMessage.style.marginTop = '1rem';
            successMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            successMessage.style.borderRadius = '4px';
            successMessage.style.color = 'var(--gray-900)';
            successMessage.innerHTML = '<strong>Message sent!</strong><br>Thank you for reaching out, I\'ll get back to you soon.';
            
            // Clear the form fields
            contactForm.reset();
            
            // Reset the button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Add success message to the form
            contactForm.appendChild(successMessage);
            
            // Remove the success message after a delay
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    contactForm.removeChild(successMessage);
                }, 300);
            }, 5000);
        }, 1500);
    });
}

/**
 * Add mobile menu functionality
 * (Uncomment and modify this if you decide to add a mobile menu toggle)
 */
/*
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}
*/
