// FAQ Page JavaScript
class FAQManager {
    constructor() {
        this.faqs = [];
        this.filteredFaqs = [];
        this.currentCategory = 'all';
        this.searchTerm = '';
        
        this.init();
    }

    init() {
        this.loadFAQData();
        this.setupEventListeners();
        this.setupSearch();
        this.setupCategoryFilters();
        this.setupFAQToggles();
    }

    loadFAQData() {
        // In a real app, this would come from an API
        this.faqs = [
            // Course Related
            {
                id: 1,
                category: 'courses',
                question: 'How do I enroll in a course?',
                answer: 'Enrolling in a course is simple! Just browse our course catalog, click on the course you\'re interested in, and hit the "Enroll Now" button. You\'ll have instant access to all course materials, including videos, articles, and downloadable resources.',
                tags: ['enrollment', 'getting started', 'courses']
            },
            {
                id: 2,
                category: 'courses',
                question: 'Can I preview course content before enrolling?',
                answer: 'Yes! Most of our courses offer preview videos and free sample lessons. You can also read the detailed course curriculum and reviews from other students to help you make an informed decision.',
                tags: ['preview', 'trial', 'courses']
            },
            {
                id: 3,
                category: 'courses',
                question: 'What\'s the difference between course levels?',
                answer: '<strong>Beginner:</strong> No prior experience required. Starts with basics and fundamentals.<br><strong>Intermediate:</strong> Requires some knowledge of the subject. Builds on existing skills.<br><strong>Advanced:</strong> For experienced learners looking to master complex concepts and techniques.',
                tags: ['levels', 'difficulty', 'beginner', 'intermediate', 'advanced']
            },
            {
                id: 4,
                category: 'courses',
                question: 'How long do I have access to course content?',
                answer: 'Once you enroll in a course, you have lifetime access to all course materials. This includes any future updates, additional content, and new resources that the instructor may add.',
                tags: ['access', 'lifetime', 'duration']
            },
            {
                id: 5,
                category: 'courses',
                question: 'Can I download course videos for offline viewing?',
                answer: 'Yes! Our mobile app allows you to download course videos for offline viewing. This is perfect for learning on the go or when you have limited internet connectivity.',
                tags: ['download', 'offline', 'mobile', 'videos']
            },

            // Payments
            {
                id: 6,
                category: 'payments',
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption.',
                tags: ['payment', 'credit card', 'paypal', 'security']
            },
            {
                id: 7,
                category: 'payments',
                question: 'Do you offer a money-back guarantee?',
                answer: 'Yes! We offer a 30-day money-back guarantee for all our courses. If you\'re not satisfied with your purchase for any reason, contact our support team within 30 days for a full refund.',
                tags: ['refund', 'guarantee', 'money back', '30 days']
            },
            {
                id: 8,
                category: 'payments',
                question: 'Are there any subscription fees?',
                answer: 'No, there are no monthly or yearly subscription fees. You pay once for each course and have lifetime access. We also offer course bundles and occasional promotions for additional savings.',
                tags: ['subscription', 'fees', 'pricing', 'bundles']
            },
            {
                id: 9,
                category: 'payments',
                question: 'Can I get a receipt for my purchase?',
                answer: 'Absolutely! You\'ll receive an email receipt immediately after your purchase. You can also download receipts anytime from your account dashboard for expense reporting or tax purposes.',
                tags: ['receipt', 'invoice', 'tax', 'expense']
            },

            // Technical
            {
                id: 10,
                category: 'technical',
                question: 'What are the system requirements?',
                answer: 'Our platform works on any device with a modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, we recommend a stable internet connection and updated browser. Our mobile app is available for iOS and Android devices.',
                tags: ['system requirements', 'browser', 'mobile app', 'compatibility']
            },
            {
                id: 11,
                category: 'technical',
                question: 'I\'m having trouble playing videos. What should I do?',
                answer: 'First, try refreshing your browser or switching to a different browser. Check your internet connection and disable any ad blockers that might interfere with video playback. If issues persist, contact our technical support team for assistance.',
                tags: ['video', 'playback', 'troubleshooting', 'browser']
            },
            {
                id: 12,
                category: 'technical',
                question: 'Can I speed up or slow down video playback?',
                answer: 'Yes! Our video player supports multiple playback speeds from 0.5x to 2x speed. You can also enable captions and adjust video quality based on your internet connection.',
                tags: ['video speed', 'playback', 'captions', 'quality']
            },
            {
                id: 13,
                category: 'technical',
                question: 'Is there a mobile app available?',
                answer: 'Yes! Our mobile app is available for both iOS and Android devices. The app includes all the features of our web platform plus offline viewing capabilities for downloaded content.',
                tags: ['mobile app', 'ios', 'android', 'offline']
            },

            // Certificates
            {
                id: 14,
                category: 'certificates',
                question: 'Do I get a certificate when I complete a course?',
                answer: 'Yes! Upon completing all course requirements, you\'ll receive a certificate of completion. The certificate includes your name, the course title, completion date, and instructor signature.',
                tags: ['certificate', 'completion', 'requirements']
            },
            {
                id: 15,
                category: 'certificates',
                question: 'Are certificates accredited or recognized by employers?',
                answer: 'Our certificates demonstrate your commitment to learning and skill development. While not formally accredited, many employers recognize and value online learning certificates, especially when combined with practical project work.',
                tags: ['accreditation', 'employers', 'recognition', 'value']
            },
            {
                id: 16,
                category: 'certificates',
                question: 'Can I add my certificate to LinkedIn?',
                answer: 'Absolutely! Our certificates are designed to be easily shared on professional networks like LinkedIn. You can download a high-quality PDF or share directly from your dashboard.',
                tags: ['linkedin', 'sharing', 'professional', 'pdf']
            },
            {
                id: 17,
                category: 'certificates',
                question: 'What if I lose my certificate?',
                answer: 'No worries! All your certificates are permanently stored in your account dashboard. You can download or re-share them anytime, even years after completion.',
                tags: ['lost certificate', 'dashboard', 'download', 'storage']
            },

            // Account
            {
                id: 18,
                category: 'account',
                question: 'How do I reset my password?',
                answer: 'Click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a secure link to reset your password. Make sure to check your spam folder if you don\'t see the email.',
                tags: ['password', 'reset', 'login', 'email']
            },
            {
                id: 19,
                category: 'account',
                question: 'Can I change my email address?',
                answer: 'Yes! Go to your account settings and update your email address. You\'ll need to verify the new email address before the change takes effect. All your course progress and certificates will remain linked to your account.',
                tags: ['email', 'change', 'settings', 'verification']
            },
            {
                id: 20,
                category: 'account',
                question: 'How do I delete my account?',
                answer: 'If you wish to delete your account, please contact our support team. Note that deleting your account will permanently remove access to all purchased courses and certificates, and this action cannot be undone.',
                tags: ['delete account', 'permanent', 'support', 'courses']
            },
            {
                id: 21,
                category: 'account',
                question: 'Can I share my account with family members?',
                answer: 'Each account is intended for individual use to ensure proper progress tracking and certificate validity. However, we offer family plans and group discounts for multiple learners. Contact us for more information.',
                tags: ['sharing', 'family', 'group', 'individual']
            }
        ];

        this.filteredFaqs = [...this.faqs];
    }

    setupEventListeners() {
        // Help chat button
        const helpChatBtn = document.getElementById('help-chat-btn');
        if (helpChatBtn) {
            helpChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openChat();
            });
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('faq-search');
        if (!searchInput) return;

        // Debounce search to avoid too many calls
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterFAQs();
            }, 300);
        });
    }

    setupCategoryFilters() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.setActiveCategory(category);
                this.filterFAQs();
            });
        });
    }

    setActiveCategory(category) {
        this.currentCategory = category;
        
        // Update active states
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
    }

    filterFAQs() {
        let filtered = [...this.faqs];

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(faq => faq.category === this.currentCategory);
        }

        // Filter by search term
        if (this.searchTerm) {
            filtered = filtered.filter(faq => 
                faq.question.toLowerCase().includes(this.searchTerm) ||
                faq.answer.toLowerCase().includes(this.searchTerm) ||
                faq.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
            );
        }

        this.filteredFaqs = filtered;
        this.renderFAQs();
    }

    renderFAQs() {
        const faqCategories = document.querySelectorAll('.faq-category');
        
        // Hide all categories first
        faqCategories.forEach(category => {
            category.style.display = 'none';
        });

        if (this.filteredFaqs.length === 0) {
            this.showNoResults();
            return;
        }

        // Group FAQs by category
        const groupedFAQs = this.groupFAQsByCategory(this.filteredFaqs);

        // Show relevant categories and populate them
        Object.keys(groupedFAQs).forEach(categoryKey => {
            const categoryElement = document.querySelector(`[data-category="${categoryKey}"]`);
            if (categoryElement) {
                categoryElement.style.display = 'block';
                this.populateCategoryFAQs(categoryElement, groupedFAQs[categoryKey]);
            }
        });

        // Setup FAQ toggles for newly rendered content
        this.setupFAQToggles();
    }

    groupFAQsByCategory(faqs) {
        return faqs.reduce((groups, faq) => {
            const category = faq.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(faq);
            return groups;
        }, {});
    }

    populateCategoryFAQs(categoryElement, faqs) {
        const faqList = categoryElement.querySelector('.faq-list');
        if (!faqList) return;

        faqList.innerHTML = '';

        faqs.forEach(faq => {
            const faqItem = this.createFAQItem(faq);
            faqList.appendChild(faqItem);
        });
    }

    createFAQItem(faq) {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <button class="faq-question">
                <span>${this.highlightSearchTerm(faq.question)}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-answer">
                <p>${this.highlightSearchTerm(faq.answer)}</p>
            </div>
        `;

        return faqItem;
    }

    highlightSearchTerm(text) {
        if (!this.searchTerm) return text;

        const regex = new RegExp(`(${this.escapeRegExp(this.searchTerm)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    setupFAQToggles() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            // Remove existing event listeners
            const newQuestion = question.cloneNode(true);
            question.parentNode.replaceChild(newQuestion, question);

            newQuestion.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.style.display = 'none';
                });
                document.querySelectorAll('.faq-question i').forEach(ic => {
                    ic.style.transform = 'rotate(0deg)';
                });

                // Toggle current item
                if (!isOpen) {
                    answer.style.display = 'block';
                    newQuestion.querySelector('i').style.transform = 'rotate(180deg)';
                    
                    // Smooth scroll to question
                    setTimeout(() => {
                        newQuestion.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'nearest'
                        });
                    }, 100);
                }
            });
        });
    }

    showNoResults() {
        const container = document.querySelector('.faq-container');
        if (!container) return;

        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #9ca3af; margin-bottom: 1rem;"></i>
                <h3>No FAQs found</h3>
                <p>Try adjusting your search terms or browse different categories</p>
                <button class="btn btn-primary" onclick="this.clearSearch()">Clear Search</button>
            </div>
        `;

        // Remove existing no-results
        const existingNoResults = container.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        container.appendChild(noResults);
    }

    clearSearch() {
        const searchInput = document.getElementById('faq-search');
        if (searchInput) {
            searchInput.value = '';
            this.searchTerm = '';
            this.filterFAQs();
        }
    }

    openChat() {
        // Trigger chat widget
        if (window.chatWidget) {
            window.chatWidget.openChat();
        } else {
            this.showNotification('Chat is currently unavailable. Please try our contact page.', 'info');
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
    getCategoryName(category) {
        const categoryNames = {
            'courses': 'Course Related Questions',
            'payments': 'Payment & Refund Questions',
            'technical': 'Technical Support',
            'certificates': 'Certificates & Completion',
            'account': 'Account Management'
        };
        return categoryNames[category] || category;
    }

    getPopularFAQs(limit = 5) {
        // In a real app, this would be based on view counts or user interactions
        return this.faqs.slice(0, limit);
    }

    searchFAQs(query) {
        this.searchTerm = query.toLowerCase();
        this.filterFAQs();
    }

    getFAQById(id) {
        return this.faqs.find(faq => faq.id === id);
    }

    addFAQ(faq) {
        faq.id = this.faqs.length + 1;
        this.faqs.push(faq);
        this.filterFAQs();
    }
}

// Initialize FAQ manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQManager;
}