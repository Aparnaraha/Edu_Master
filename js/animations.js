// Advanced Animation Controller
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupProgressBars();
        this.setupTextAnimations();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);

        // Observe all elements with animation classes
        document.querySelectorAll('[class*="animate-"], [data-animate]').forEach(el => {
            observer.observe(el);
        });

        this.observers.set('main', observer);
    }

    triggerAnimation(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fade-in':
                this.fadeIn(element);
                break;
            case 'slide-up':
                this.slideUp(element);
                break;
            case 'slide-left':
                this.slideLeft(element);
                break;
            case 'slide-right':
                this.slideRight(element);
                break;
            case 'zoom-in':
                this.zoomIn(element);
                break;
            case 'bounce-in':
                this.bounceIn(element);
                break;
            case 'flip-in':
                this.flipIn(element);
                break;
            case 'stagger':
                this.staggerAnimation(element);
                break;
            case 'counter':
                this.animateCounter(element);
                break;
            case 'progress':
                this.animateProgress(element);
                break;
            default:
                element.classList.add('animate');
        }
    }

    getAnimationType(element) {
        // Check for data attribute first
        if (element.dataset.animate) {
            return element.dataset.animate;
        }

        // Check class names
        const classList = Array.from(element.classList);
        for (const className of classList) {
            if (className.startsWith('animate-')) {
                return className.replace('animate-', '');
            }
        }

        return 'default';
    }

    fadeIn(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    slideUp(element, duration = 600) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    slideLeft(element, duration = 600) {
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    slideRight(element, duration = 600) {
        element.style.transform = 'translateX(50px)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    zoomIn(element, duration = 600) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    bounceIn(element) {
        element.style.animation = 'bounceIn 0.8s ease-out forwards';
    }

    flipIn(element) {
        element.style.animation = 'flipIn 0.8s ease-out forwards';
    }

    staggerAnimation(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                this.slideUp(child, 400);
            }, index * 100);
        });
    }

    setupScrollAnimations() {
        let ticking = false;

        const updateAnimations = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Parallax elements
            document.querySelectorAll('[data-parallax]').forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Fade elements based on scroll
            document.querySelectorAll('[data-fade-scroll]').forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                if (elementTop < windowHeight && elementTop + elementHeight > 0) {
                    const opacity = Math.max(0, Math.min(1, 1 - (Math.abs(elementTop - windowHeight / 2) / (windowHeight / 2))));
                    element.style.opacity = opacity;
                }
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    setupHoverAnimations() {
        // Magnetic effect
        document.querySelectorAll('[data-magnetic]').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = parseFloat(element.dataset.magnetic) || 0.3;
                
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });

        // Tilt effect
        document.querySelectorAll('[data-tilt]').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });

        // Ripple effect
        document.querySelectorAll('[data-ripple]').forEach(element => {
            element.addEventListener('click', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    setupParallaxEffects() {
        // Advanced parallax with multiple layers
        const parallaxElements = document.querySelectorAll('[data-parallax-layer]');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallaxLayer) || 0.5;
                const yPos = scrollTop * speed;
                
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.counter) || parseInt(element.textContent);
        const duration = parseInt(element.dataset.duration) || 2000;
        const increment = target / (duration / 16);
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('[data-progress]');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateProgress(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(bar);
        });
    }

    animateProgress(element) {
        const progress = parseInt(element.dataset.progress) || 0;
        const duration = parseInt(element.dataset.duration) || 1000;
        
        const progressFill = element.querySelector('.progress-fill') || element;
        
        progressFill.style.width = '0%';
        progressFill.style.transition = `width ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            progressFill.style.width = `${progress}%`;
        });
    }

    setupTextAnimations() {
        // Typewriter effect
        document.querySelectorAll('[data-typewriter]').forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 50;
            
            element.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });

        // Text reveal animation
        document.querySelectorAll('[data-text-reveal]').forEach(element => {
            const words = element.textContent.split(' ');
            element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
            
            const wordElements = element.querySelectorAll('.word');
            wordElements.forEach(word => {
                word.style.opacity = '0';
                word.style.transform = 'translateY(20px)';
                word.style.transition = 'all 0.6s ease-out';
            });
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        wordElements.forEach((word, index) => {
                            setTimeout(() => {
                                word.style.opacity = '1';
                                word.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Utility methods
    createKeyframes(name, keyframes) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${name} {
                ${Object.entries(keyframes).map(([key, value]) => 
                    `${key} { ${Object.entries(value).map(([prop, val]) => `${prop}: ${val}`).join('; ')} }`
                ).join('\n')}
            }
        `;
        document.head.appendChild(style);
    }

    animate(element, properties, options = {}) {
        const {
            duration = 300,
            easing = 'ease-out',
            delay = 0,
            fill = 'forwards'
        } = options;

        const keyframes = [
            element.style,
            properties
        ];

        return element.animate(keyframes, {
            duration,
            easing,
            delay,
            fill
        });
    }

    // Chain animations
    sequence(animations) {
        return animations.reduce((promise, animation) => {
            return promise.then(() => {
                return new Promise(resolve => {
                    const { element, properties, options = {} } = animation;
                    const anim = this.animate(element, properties, options);
                    anim.addEventListener('finish', resolve);
                });
            });
        }, Promise.resolve());
    }

    // Parallel animations
    parallel(animations) {
        const promises = animations.map(animation => {
            const { element, properties, options = {} } = animation;
            return new Promise(resolve => {
                const anim = this.animate(element, properties, options);
                anim.addEventListener('finish', resolve);
            });
        });

        return Promise.all(promises);
    }

    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animations.clear();
    }
}

// Initialize animation controller
const animationController = new AnimationController();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}