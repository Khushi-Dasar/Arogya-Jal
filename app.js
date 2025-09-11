// Arogya Jal - Interactive functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Arogya Jal app initializing...');
    
    // Initialize all functionality with delays to ensure DOM is ready
    setTimeout(() => {
        initNavigation();
        initSmoothScrolling();
        initBenefitCards();
        initWaterCalculator();
        initScrollHighlighting();
        enhanceFormValidation();
        initButtonFeedback();
        initKeyboardNavigation();
        
        // Debug: Check if elements exist
        console.log('Navigation menu:', document.getElementById('navMenu'));
        console.log('Calculator form:', document.getElementById('waterCalculator'));
        console.log('Nav links:', document.querySelectorAll('.nav-link').length);
    }, 100);
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    console.log('Initializing navigation...', { navToggle, navMenu });
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Nav toggle clicked');
            
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked, closing menu');
                navMenu.classList.remove('active');
                
                // Reset hamburger icon
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    
    // Handle ALL anchor links that start with #
    const allLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found anchor links:', allLinks.length);
    
    allLinks.forEach((link, index) => {
        console.log(`Link ${index}:`, link.href, link.textContent);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            console.log('Clicked link with target:', targetId);
            
            if (targetId === '#' || targetId === '') {
                console.log('Empty or invalid target, skipping');
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            console.log('Target section found:', targetSection);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
                const offsetTop = targetSection.offsetTop - navHeight - 20;
                
                console.log('Scrolling to:', offsetTop);
                
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            } else {
                console.log('Target section not found:', targetId);
            }
        });
    });
}

// Benefit cards flip functionality
function initBenefitCards() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    console.log('Initializing benefit cards:', benefitCards.length);
    
    benefitCards.forEach((card, index) => {
        console.log(`Setting up benefit card ${index}`);
        
        // Handle click events
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Benefit card ${index} clicked`);
            this.classList.toggle('flipped');
        });
        
        // Handle mouse events for desktop
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('flipped');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('flipped');
            }
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to flip card and see more details');
    });
}

// Water intake calculator functionality
function initWaterCalculator() {
    const calculatorForm = document.getElementById('waterCalculator');
    const calculatorResult = document.getElementById('calculatorResult');
    const resultLiters = document.getElementById('resultLiters');
    
    console.log('Initializing calculator...', { calculatorForm, calculatorResult, resultLiters });
    
    if (!calculatorForm || !calculatorResult || !resultLiters) {
        console.error('Calculator elements not found');
        return;
    }
    
    // Ensure all form elements are properly set up
    const ageInput = document.getElementById('age');
    const weightInput = document.getElementById('weight');
    const activitySelect = document.getElementById('activity');
    const climateSelect = document.getElementById('climate');
    
    console.log('Form elements:', { ageInput, weightInput, activitySelect, climateSelect });
    
    // Fix dropdown functionality
    const selects = calculatorForm.querySelectorAll('select');
    selects.forEach((select, index) => {
        console.log(`Setting up select ${index}:`, select.id);
        
        // Ensure proper styling and functionality
        select.style.pointerEvents = 'auto';
        select.style.userSelect = 'auto';
        select.style.cursor = 'pointer';
        
        // Add change event listener
        select.addEventListener('change', function() {
            console.log(`${this.id} changed to: ${this.value}`);
            this.classList.remove('error');
            this.classList.add('valid');
        });
        
        // Add click event listener for debugging
        select.addEventListener('click', function(e) {
            console.log(`${this.id} clicked`);
            e.stopPropagation();
        });
        
        // Add focus event
        select.addEventListener('focus', function() {
            console.log(`${this.id} focused`);
        });
    });
    
    // Handle form submission
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Calculator form submitted');
        
        // Get form values
        const age = parseInt(ageInput?.value || '0');
        const weight = parseFloat(weightInput?.value || '0');
        const activity = activitySelect?.value || '';
        const climate = climateSelect?.value || '';
        
        console.log('Form values:', { age, weight, activity, climate });
        
        // Validate inputs
        let isValid = true;
        let errorMessage = '';
        
        if (!age || age < 1 || age > 120) {
            isValid = false;
            errorMessage += 'Please enter a valid age (1-120). ';
            ageInput?.classList.add('error');
        }
        
        if (!weight || weight < 10 || weight > 300) {
            isValid = false;
            errorMessage += 'Please enter a valid weight (10-300 kg). ';
            weightInput?.classList.add('error');
        }
        
        if (!activity) {
            isValid = false;
            errorMessage += 'Please select an activity level. ';
            activitySelect?.classList.add('error');
        }
        
        if (!climate) {
            isValid = false;
            errorMessage += 'Please select a climate. ';
            climateSelect?.classList.add('error');
        }
        
        if (!isValid) {
            alert(errorMessage.trim());
            console.log('Validation failed:', errorMessage);
            return;
        }
        
        // Calculate water intake
        const waterIntake = calculateWaterIntake(age, weight, activity, climate);
        console.log('Calculated intake:', waterIntake);
        
        // Display result
        resultLiters.textContent = waterIntake.toFixed(1);
        calculatorResult.classList.remove('hidden');
        
        // Scroll to result with a delay
        setTimeout(() => {
            calculatorResult.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
        
        console.log('Calculator result displayed');
    });
    
    // Add a test button for debugging
    const testBtn = document.createElement('button');
    testBtn.textContent = 'Test Calculator';
    testBtn.type = 'button';
    testBtn.style.margin = '10px 0';
    testBtn.className = 'btn btn--outline btn--sm';
    testBtn.addEventListener('click', function() {
        console.log('Testing calculator...');
        ageInput.value = '25';
        weightInput.value = '70';
        activitySelect.value = 'moderate';
        climateSelect.value = 'hot';
        
        // Trigger form submission
        calculatorForm.dispatchEvent(new Event('submit'));
    });
    
    // Add test button after the form (for debugging)
    calculatorForm.parentNode.insertBefore(testBtn, calculatorForm.nextSibling);
}

// Water intake calculation logic
function calculateWaterIntake(age, weight, activity, climate) {
    console.log('Calculating water intake for:', { age, weight, activity, climate });
    
    // Base calculation: 35ml per kg of body weight
    let baseIntake = weight * 0.035;
    
    // Age adjustments
    if (age < 18) {
        baseIntake *= 1.1; // Growing bodies need more
    } else if (age > 65) {
        baseIntake *= 1.15; // Elderly need more due to reduced thirst sensation
    }
    
    // Activity level adjustments
    const activityMultipliers = {
        'low': 1.0,
        'moderate': 1.15,
        'high': 1.3,
        'very-high': 1.5
    };
    
    baseIntake *= activityMultipliers[activity] || 1.0;
    
    // Climate adjustments
    const climateMultipliers = {
        'cool': 1.0,
        'moderate': 1.1,
        'hot': 1.25,
        'very-hot': 1.4
    };
    
    baseIntake *= climateMultipliers[climate] || 1.0;
    
    // Ensure minimum and maximum limits
    const result = Math.max(1.5, Math.min(5.0, baseIntake));
    console.log('Final calculated intake:', result);
    return result;
}

// Add scroll-based navigation highlighting
function initScrollHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Initializing scroll highlighting...', { sections: sections.length, navLinks: navLinks.length });
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Form validation enhancements
function enhanceFormValidation() {
    const form = document.getElementById('waterCalculator');
    if (!form) return;
    
    console.log('Enhancing form validation...');
    
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        // Add real-time validation
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error styling on input
            this.classList.remove('error');
        });
        
        input.addEventListener('change', function() {
            validateInput(this);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Basic validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Specific validations
    if (input.id === 'age') {
        const age = parseInt(value);
        if (isNaN(age) || age < 1 || age > 120) {
            isValid = false;
        }
    }
    
    if (input.id === 'weight') {
        const weight = parseFloat(value);
        if (isNaN(weight) || weight < 10 || weight > 300) {
            isValid = false;
        }
    }
    
    // Apply styling
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
    }
    
    return isValid;
}

// Add some interactive feedback to buttons
function initButtonFeedback() {
    const buttons = document.querySelectorAll('.btn');
    console.log('Initializing button feedback for:', buttons.length, 'buttons');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Button clicked:', this.textContent);
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Add ripple animation CSS if not exists
            if (!document.getElementById('ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset hamburger icon
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initScrollAnimations, 200);
    });
}

function initScrollAnimations() {
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
    
    // Observe elements that should animate in
    const animatedElements = document.querySelectorAll('.benefit-card, .method-card, .program-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Global debug functions
window.debugApp = {
    testCalculator: function() {
        const ageInput = document.getElementById('age');
        const weightInput = document.getElementById('weight');
        const activitySelect = document.getElementById('activity');
        const climateSelect = document.getElementById('climate');
        
        if (ageInput) ageInput.value = '25';
        if (weightInput) weightInput.value = '70';
        if (activitySelect) activitySelect.value = 'moderate';
        if (climateSelect) climateSelect.value = 'hot';
        
        const form = document.getElementById('waterCalculator');
        if (form) {
            console.log('Submitting test form...');
            form.dispatchEvent(new Event('submit'));
        }
    },
    
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const offsetTop = section.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    }
};

console.log('Arogya Jal app loaded. Debug functions available at window.debugApp');