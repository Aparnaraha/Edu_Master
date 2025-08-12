// Contact Page JavaScript
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupMap();
    }

    setupEventListeners() {
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Chat button
        const contactChatBtn = document.getElementById('contact-chat-btn');
        if (contactChatBtn) {
            contactChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openChat();
            });
        }

        // Map placeholder
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.addEventListener('click', () => this.openMap());
        }

        // Modal close
        const modal = document.getElementById('success-modal');
        const closeModalBtn = document.getElementById('close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal());
        }

        // Close modal on overlay click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.submitForm(data)
                .then(() => {
                    this.showSuccessModal();
                    form.reset();
                })
                .catch((error) => {
                    this.showNotification('Failed to send message. Please try again.', 'error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        }, 2000);
    }

    async submitForm(data) {
        // In a real application, this would send data to a server
        return new Promise((resolve, reject) => {
            // Simulate API call
            const success = Math.random() > 0.1; // 90% success rate
            
            if (success) {
                console.log('Form submitted:', data);
                resolve();
            } else {
                reject(new Error('Submission failed'));
            }
        });
    }

    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    openChat() {
        // Trigger chat widget
        if (window.chatWidget) {
            window.chatWidget.openChat();
        } else {
            this.showNotification('Chat is currently unavailable. Please try email or phone.', 'info');
        }
    }

    openMap() {
        // Open Google Maps in new tab
        const address = "123 Education Street, Learning District, New York, NY 10001";
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
    }

    setupMap() {
        // In a real application, you would integrate with Google Maps API
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.style.cursor = 'pointer';
            mapPlaceholder.style.transition = 'transform 0.3s ease';
            
            mapPlaceholder.addEventListener('mouseenter', () => {
                mapPlaceholder.style.transform = 'scale(1.02)';
            });
            
            mapPlaceholder.addEventListener('mouseleave', () => {
                mapPlaceholder.style.transform = 'scale(1)';
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Utility methods
    formatPhoneNumber(phone) {
        // Format phone number for display
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    }

    validateEmailDomain(email) {
        // Check for common email domains
        const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
        const domain = email.split('@')[1];
        return commonDomains.includes(domain.toLowerCase());
    }

    getInquiryTypeDescription(type) {
        const descriptions = {
            'general': 'General questions about our platform',
            'courses': 'Questions about specific courses or curriculum',
            'technical': 'Technical support and troubleshooting',
            'instructor': 'Information about becoming an instructor',
            'partnership': 'Business partnerships and collaborations',
            'other': 'Other inquiries not covered above'
        };
        return descriptions[type] || 'General inquiry';
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactManager;
}