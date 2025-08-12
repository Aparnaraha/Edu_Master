// Advanced Slider Component
class AdvancedSlider {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) return;

        this.options = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            dots: true,
            arrows: true,
            fade: false,
            speed: 500,
            pauseOnHover: true,
            responsive: [],
            ...options
        };

        this.currentSlide = 0;
        this.slides = [];
        this.isAnimating = false;
        this.autoplayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.setupSlider();
        this.createControls();
        this.bindEvents();
        this.updateSlider();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    setupSlider() {
        this.slides = Array.from(this.container.children);
        this.totalSlides = this.slides.length;

        if (this.totalSlides === 0) return;

        // Create slider wrapper
        this.sliderWrapper = document.createElement('div');
        this.sliderWrapper.className = 'slider-wrapper';
        
        this.sliderTrack = document.createElement('div');
        this.sliderTrack.className = 'slider-track';

        // Move slides to track
        this.slides.forEach(slide => {
            slide.className += ' slider-slide';
            this.sliderTrack.appendChild(slide);
        });

        this.sliderWrapper.appendChild(this.sliderTrack);
        this.container.appendChild(this.sliderWrapper);

        // Add CSS
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .slider-wrapper {
                position: relative;
                overflow: hidden;
                width: 100%;
            }
            
            .slider-track {
                display: flex;
                transition: transform ${this.options.speed}ms ease-in-out;
                width: ${this.options.infinite ? (this.totalSlides + 2) * 100 : this.totalSlides * 100}%;
            }
            
            .slider-slide {
                flex: 0 0 ${100 / this.options.slidesToShow}%;
                opacity: ${this.options.fade ? 0 : 1};
                transition: opacity ${this.options.speed}ms ease-in-out;
            }
            
            .slider-slide.active {
                opacity: 1;
            }
            
            .slider-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .slider-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.9);
                border: none;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: #333;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .slider-arrow:hover {
                background: white;
                transform: translateY(-50%) scale(1.1);
            }
            
            .slider-arrow.prev {
                left: 1rem;
            }
            
            .slider-arrow.next {
                right: 1rem;
            }
            
            .slider-dots {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 1rem;
            }
            
            .slider-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .slider-dot.active {
                background: var(--primary-color, #6366f1);
                transform: scale(1.2);
            }
            
            @media (max-width: 768px) {
                .slider-arrow {
                    width: 40px;
                    height: 40px;
                    font-size: 1rem;
                }
                
                .slider-arrow.prev {
                    left: 0.5rem;
                }
                
                .slider-arrow.next {
                    right: 0.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createControls() {
        // Create arrows
        if (this.options.arrows) {
            this.prevArrow = document.createElement('button');
            this.prevArrow.className = 'slider-arrow prev';
            this.prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
            this.prevArrow.setAttribute('aria-label', 'Previous slide');

            this.nextArrow = document.createElement('button');
            this.nextArrow.className = 'slider-arrow next';
            this.nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
            this.nextArrow.setAttribute('aria-label', 'Next slide');

            this.sliderWrapper.appendChild(this.prevArrow);
            this.sliderWrapper.appendChild(this.nextArrow);
        }

        // Create dots
        if (this.options.dots) {
            this.dotsContainer = document.createElement('div');
            this.dotsContainer.className = 'slider-dots';

            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot';
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.dataset.slide = i;
                this.dotsContainer.appendChild(dot);
            }

            this.container.appendChild(this.dotsContainer);
            this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
        }
    }

    bindEvents() {
        // Arrow clicks
        if (this.prevArrow) {
            this.prevArrow.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextArrow) {
            this.nextArrow.addEventListener('click', () => this.nextSlide());
        }

        // Dot clicks
        if (this.dots) {
            this.dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const slideIndex = parseInt(e.target.dataset.slide);
                    this.goToSlide(slideIndex);
                });
            });
        }

        // Touch events
        this.sliderWrapper.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        this.sliderWrapper.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Mouse events for desktop
        this.sliderWrapper.addEventListener('mousedown', (e) => {
            this.touchStartX = e.clientX;
            this.isDragging = true;
        });

        this.sliderWrapper.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
        });

        this.sliderWrapper.addEventListener('mouseup', (e) => {
            if (!this.isDragging) return;
            this.touchEndX = e.clientX;
            this.isDragging = false;
            this.handleSwipe();
        });

        // Pause on hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        }

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    handleResize() {
        // Handle responsive breakpoints
        const currentWidth = window.innerWidth;
        let newSlidesToShow = this.options.slidesToShow;

        this.options.responsive.forEach(breakpoint => {
            if (currentWidth <= breakpoint.breakpoint) {
                newSlidesToShow = breakpoint.settings.slidesToShow || newSlidesToShow;
            }
        });

        if (newSlidesToShow !== this.currentSlidesToShow) {
            this.currentSlidesToShow = newSlidesToShow;
            this.updateSlider();
        }
    }

    nextSlide() {
        if (this.isAnimating) return;

        if (this.options.infinite || this.currentSlide < this.totalSlides - 1) {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateSlider();
        }
    }

    prevSlide() {
        if (this.isAnimating) return;

        if (this.options.infinite || this.currentSlide > 0) {
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
            this.updateSlider();
        }
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;

        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        if (this.totalSlides === 0) return;

        this.isAnimating = true;

        if (this.options.fade) {
            // Fade transition
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentSlide);
            });
        } else {
            // Slide transition
            const translateX = -this.currentSlide * (100 / this.options.slidesToShow);
            this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        }

        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        }

        // Update arrows
        if (this.prevArrow && this.nextArrow && !this.options.infinite) {
            this.prevArrow.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
            this.nextArrow.style.opacity = this.currentSlide === this.totalSlides - 1 ? '0.5' : '1';
        }

        setTimeout(() => {
            this.isAnimating = false;
        }, this.options.speed);

        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: this.currentSlide }
        }));
    }

    startAutoplay() {
        if (!this.options.autoplay) return;

        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoplaySpeed);
    }

    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    resumeAutoplay() {
        if (this.options.autoplay && !this.autoplayTimer) {
            this.startAutoplay();
        }
    }

    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        
        // Remove created elements
        if (this.prevArrow) this.prevArrow.remove();
        if (this.nextArrow) this.nextArrow.remove();
        if (this.dotsContainer) this.dotsContainer.remove();
        
        // Restore original structure
        this.slides.forEach(slide => {
            slide.className = slide.className.replace(' slider-slide', '');
            this.container.appendChild(slide);
        });
        
        if (this.sliderWrapper) this.sliderWrapper.remove();
    }
}

// Initialize sliders on page load
document.addEventListener('DOMContentLoaded', () => {
    // Course slider
    const coursesSlider = document.getElementById('courses-slider');
    if (coursesSlider) {
        new AdvancedSlider(coursesSlider, {
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    // Testimonials slider
    const testimonialsSlider = document.getElementById('testimonials-slider');
    if (testimonialsSlider) {
        new AdvancedSlider(testimonialsSlider, {
            slidesToShow: 1,
            fade: true,
            autoplay: true,
            autoplaySpeed: 6000,
            arrows: false
        });
    }

    // Blog slider (if exists)
    const blogSlider = document.querySelector('.blog-slider');
    if (blogSlider) {
        new AdvancedSlider(blogSlider, {
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedSlider;
}