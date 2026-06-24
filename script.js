// ============================================
// TUFFANGANJ MISSION PHARMACY - MAIN SCRIPT
// Complete JavaScript for Website Functionality
// ============================================

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Tufanganj Mission Pharmacy website loaded successfully!');
    
    // Initialize all functions
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initScrollToTop();
    initActiveNavLink();
    initContactForm();
    initAuthButtons();
    initAppointmentButton();
    initAnimations();
});

// ============================================
// 1. MOBILE HAMBURGER MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking a link (mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
}

// ============================================
// 2. SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 72;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 3. SCROLL EFFECTS (Navbar & Animations)
// ============================================
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        // Navbar shadow effect
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// ============================================
// 4. SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (scrollBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// 5. ACTIVE NAV LINK ON SCROLL
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
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
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ============================================
// 6. CONTACT FORM VALIDATION
// ============================================
function initContactForm() {
    // Check if contact form exists on page
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const phone = document.getElementById('contactPhone')?.value.trim();
            const message = document.getElementById('contactMessage')?.value.trim();
            
            // Validation
            let errors = [];
            
            if (!name || name.length < 2) {
                errors.push('Please enter your full name');
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Please enter a valid email address');
            }
            
            if (!phone || phone.length < 10) {
                errors.push('Please enter a valid phone number');
            }
            
            if (!message || message.length < 10) {
                errors.push('Please enter a message (at least 10 characters)');
            }
            
            // Show errors or success
            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                if (errors.length > 0) {
                    formMessage.innerHTML = errors.join('<br>');
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                } else {
                    // Success - show message
                    formMessage.innerHTML = '✅ Thank you! We will get back to you soon.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    contactForm.reset();
                    
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
}

// ============================================
// 7. EMAIL VALIDATION HELPER
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// 8. AUTH BUTTONS (Login/Register)
// ============================================
function initAuthButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    // Login button
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Check if user is already logged in (Firebase will handle this)
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
    
    // Register button (if exists)
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            window.location.href = 'register.html';
        });
    }
}

// ============================================
// 9. APPOINTMENT BUTTON
// ============================================
function initAppointmentButton() {
    const appointmentBtns = document.querySelectorAll('.btn-appointment, .btn-book, .btn-primary[onclick*="appointment"]');
    
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // If button has onclick attribute, let it handle
            if (this.hasAttribute('onclick')) {
                return;
            }
            e.preventDefault();
            window.location.href = 'appointment.html';
        });
    });
}

// ============================================
// 10. SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.doctor-card, .service-card, .testimonial-card, .feature, .stat-item');
    
    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(el => {
            // Add initial hidden state
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }
}

// ============================================
// 11. ADD ANIMATION CSS (Dynamic)
// ============================================
// Add animation styles dynamically
(function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .form-message {
            padding: 12px 16px;
            border-radius: 8px;
            margin-top: 16px;
            display: none;
            font-weight: 500;
        }
        
        .form-message.error {
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fecaca;
            display: block;
        }
        
        .form-message.success {
            background: #dcfce7;
            color: #16a34a;
            border: 1px solid #bbf7d0;
            display: block;
        }
        
        /* Mobile menu active state */
        .nav-menu.active {
            display: flex !important;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none !important;
                position: absolute;
                top: 72px;
                left: 0;
                width: 100%;
                background: white;
                padding: 20px 24px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                flex-direction: column;
                gap: 16px;
            }
            
            .nav-menu.active {
                display: flex !important;
            }
            
            .hamburger {
                display: block !important;
            }
        }
        
        @media (min-width: 769px) {
            .hamburger {
                display: none !important;
            }
            .nav-menu {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);
})();

// ============================================
// 12. UTILITY: SCROLL TO SECTION (Public)
// ============================================
window.scrollToSection = function(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 72;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// ============================================
// 13. UTILITY: OPEN APPOINTMENT (Public)
// ============================================
window.openAppointment = function() {
    window.location.href = 'appointment.html';
};

// ============================================
// 14. UTILITY: OPEN LOGIN (Public)
// ============================================
window.openLogin = function() {
    window.location.href = 'login.html';
};

// ============================================
// 15. UTILITY: OPEN REGISTER (Public)
// ============================================
window.openRegister = function() {
    window.location.href = 'register.html';
};

// ============================================
// 16. CONSOLE STATUS MESSAGE
// ============================================
console.log('✅ Tufanganj Mission Pharmacy - All scripts initialized');
console.log('📱 Mobile menu: Active');
console.log('🔄 Smooth scroll: Active');
console.log('📝 Form validation: Active');
console.log('✨ Scroll animations: Active');
console.log('🔝 Scroll to top: Active');
