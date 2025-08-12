// Main JavaScript functionality
class EduMaster {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupScrollAnimations();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupTypingAnimation();
        this.setupCounterAnimation();
        this.setupTestimonialSlider();
        this.setupVideoModal();
        this.setupNewsletterForm();
        this.setupScrollToTop();
        this.setupNavbarScroll();
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));

        // Document events
        document.addEventListener('DOMContentLoaded', this.handleDOMContentLoaded.bind(this));
    }

    initializeComponents() {
        // Initialize all components
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.themeToggle = document.getElementById('theme-toggle');
        this.typingText = document.getElementById('typing-text');
        this.videoModal = document.getElementById('video-modal');
        this.newsletterForm = document.getElementById('newsletter-form');
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll, .fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    setupThemeToggle() {
        if (!this.themeToggle) return;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.updateThemeIcon(savedTheme);
        }

        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    setupMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    setupTypingAnimation() {
        if (!this.typingText) return;

        const texts = [
            'Web Development',
            'Data Science',
            'Machine Learning',
            'UI/UX Design',
            'Mobile Development',
            'Digital Marketing'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                this.typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                this.typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        };

        typeText();
    }

    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    counterObserver.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    setupTestimonialSlider() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        if (testimonialCards.length === 0) return;

        const showSlide = (index) => {
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        // Auto-advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }

    setupVideoModal() {
        if (!this.videoModal) return;

        const playButtons = document.querySelectorAll('.play-button, .preview-btn, #hero-play-btn');
        const closeButton = this.videoModal.querySelector('.modal-close');
        const overlay = this.videoModal.querySelector('.modal-overlay');
        const iframe = this.videoModal.querySelector('#video-iframe');

        const openModal = (videoId = 'dQw4w9WgXcQ') => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            this.videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            iframe.src = '';
            this.videoModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const videoId = button.getAttribute('data-video') || 'dQw4w9WgXcQ';
                openModal(videoId);
            });
        });

        closeButton?.addEventListener('click', closeModal);
        overlay?.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.videoModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    setupNewsletterForm() {
        if (!this.newsletterForm) return;

        this.newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = this.newsletterForm.querySelector('input[type="email"]').value;
            const button = this.newsletterForm.querySelector('button');
            const originalText = button.textContent;

            // Show loading state
            button.textContent = 'Subscribing...';
            button.disabled = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                this.newsletterForm.reset();
            } catch (error) {
                this.showNotification('Failed to subscribe. Please try again.', 'error');
            } finally {
                button.textContent = originalText;
                button.disabled = false;
            }
        });
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });

        // Scroll to top functionality
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupNavbarScroll() {
        if (!this.navbar) return;

        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow when scrolled
            if (scrollTop > 10) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    handleScroll() {
        // Handle scroll events
        this.updateActiveNavLink();
    }

    handleResize() {
        // Handle resize events
        if (window.innerWidth > 768) {
            this.hamburger?.classList.remove('active');
            this.navMenu?.classList.remove('active');
        }
    }

    handleLoad() {
        // Handle load events
        document.body.classList.add('loaded');
    }

    handleDOMContentLoaded() {
        // Handle DOM content loaded
        this.addFadeInAnimations();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    addFadeInAnimations() {
        const elements = document.querySelectorAll('.category-card, .course-card, .testimonial-card');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('fade-in-up');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--info-color)'};
            color: white;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Get random element from array
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Local storage helpers
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    getStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    removeStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
}

// Initialize the application
const app = new EduMaster();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EduMaster;
}