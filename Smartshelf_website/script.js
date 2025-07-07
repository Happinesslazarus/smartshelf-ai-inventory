// SmartShelf JavaScript functionality

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
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
        
        // Email validation function
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
        demoButton.addEventListener('click', function() {
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
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('#problem');
            if (firstSection) {
                firstSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Mobile menu toggle (if you want to add mobile menu functionality)
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Add mobile menu toggle functionality here
            console.log('Mobile menu clicked');
        });
    }
});