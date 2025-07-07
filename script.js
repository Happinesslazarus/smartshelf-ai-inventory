// SmartShelf JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = mobileMenuButton.querySelector('.hamburger-icon');
    
    if (mobileMenuButton && mobileMenu && hamburgerIcon) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            hamburgerIcon.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                hamburgerIcon.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                hamburgerIcon.classList.remove('active');
            }
        });
        
        // Handle window resize for mobile menu
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                hamburgerIcon.classList.remove('active');
            }
        });
    }

    // Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
  
    // Get DOM elements for form validation
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const demoButton = document.getElementById('demo-button');
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal');
  
    // Check if elements exist before adding event listeners
    if (emailInput && emailError && demoButton && successModal && closeModalButton) {
        
        // Validate email on blur (when user finishes typing and clicks away)
        emailInput.addEventListener('blur', function() {
            validateEmail();
        });
        
        // Also validate on input but with a delay to avoid distracting the user
        let typingTimer;
        emailInput.addEventListener('input', function() {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(validateEmail, 1000); // 1 second delay
        });
        
        function validateEmail() {
            const email = emailInput.value.trim();
            
            if (email === '') {
                // Make error invisible but keep space
                emailError.classList.add('opacity-0');
                emailError.classList.remove('opacity-100');
                demoButton.disabled = true;
                return;
            }
            
            if (!isValidEmail(email)) {
                // Make error visible
                emailError.classList.remove('opacity-0');
                emailError.classList.add('opacity-100');
                demoButton.disabled = true;
            } else {
                // Make error invisible but keep space
                emailError.classList.add('opacity-0');
                emailError.classList.remove('opacity-100');
                demoButton.disabled = false;
            }
        }
        
        // Handle demo button click
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show success modal
            successModal.classList.remove('hidden');
            
            // Reset form
            emailInput.value = '';
            demoButton.disabled = true;
            emailError.classList.add('opacity-0');
            emailError.classList.remove('opacity-100');
        });
        
        // Close modal
        closeModalButton.addEventListener('click', function() {
            successModal.classList.add('hidden');
        });
        
        // Also close modal when clicking outside
        successModal.addEventListener('click', function(event) {
            if (event.target === successModal) {
                successModal.classList.add('hidden');
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !successModal.classList.contains('hidden')) {
                successModal.classList.add('hidden');
            }
        });
    }

    // Scroll indicator animation
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const problemSection = document.getElementById('problem');
            if (problemSection) {
                problemSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add scroll effects for navbar
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('bg-white', 'shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to elements
    const animateElements = document.querySelectorAll('.feature-card, .stat-item, .problem-box');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Handle form submission for better UX
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            if (isValidEmail(email)) {
                // Simulate form submission
                demoButton.innerHTML = 'Submitting...';
                demoButton.disabled = true;
                
                setTimeout(function() {
                    successModal.classList.remove('hidden');
                    emailInput.value = '';
                    demoButton.innerHTML = 'Schedule a Demo';
                    demoButton.disabled = true;
                    emailError.classList.add('opacity-0');
                    emailError.classList.remove('opacity-100');
                }, 1500);
            }
        });
    }

    // Improved image loading with error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Handle successful load
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle error
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Add touch support for mobile hover effects
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.feature-card, .stat-item');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touched');
            });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touched');
                }, 300);
            });
        });
    }

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Enter key on buttons
        if (e.key === 'Enter' && e.target.classList.contains('btn')) {
            e.target.click();
        }
        
        // Space key on buttons
        if (e.key === ' ' && e.target.classList.contains('btn')) {
            e.preventDefault();
            e.target.click();
        }
    });

    // Console log for debugging
    console.log('SmartShelf website loaded successfully!');
});

// Error handling for any JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Scroll to top button functionality
const scrollToTopButton = document.getElementById('scroll-to-top');
if (scrollToTopButton) {
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}