// Course Detail Page JavaScript
class CourseDetailManager {
    constructor() {
        this.courseId = this.getCourseIdFromUrl();
        this.course = null;
        this.currentTab = 'curriculum';
        
        this.init();
    }

    init() {
        this.loadCourseData();
        this.setupEventListeners();
        this.setupTabs();
        this.setupCurriculum();
        this.setupFAQ();
    }

    getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1';
    }

    loadCourseData() {
        // In a real app, this would fetch from an API
        // For now, using sample data
        this.course = {
            id: 1,
            title: "Complete JavaScript Mastery",
            subtitle: "Master JavaScript from basics to advanced concepts with real-world projects and industry best practices",
            instructor: {
                name: "John Smith",
                title: "Senior Full Stack Developer",
                image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=120",
                rating: 4.9,
                students: 125000,
                courses: 15,
                bio: "John is a passionate educator and experienced developer with over 10 years in the industry. He has worked at top tech companies including Google and Microsoft, and has taught over 125,000 students worldwide."
            },
            image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
            rating: 4.9,
            totalRatings: 15234,
            students: 45678,
            price: 99,
            originalPrice: 199,
            discount: 50,
            stats: {
                duration: "40 hours on-demand video",
                articles: "50 articles",
                resources: "30 downloadable resources",
                certificate: "Certificate of completion"
            },
            badges: ["Bestseller", "Recently Updated"],
            curriculum: [
                {
                    title: "JavaScript Fundamentals",
                    lectures: 8,
                    duration: "2h 30m",
                    lessons: [
                        { title: "Introduction to JavaScript", duration: "15:30", type: "video" },
                        { title: "Variables and Data Types", duration: "22:45", type: "video" },
                        { title: "Operators and Expressions", duration: "18:20", type: "video" },
                        { title: "Practice Exercise: Basic Operations", duration: "Quiz", type: "quiz" }
                    ]
                },
                {
                    title: "Control Structures",
                    lectures: 10,
                    duration: "3h 15m",
                    lessons: [
                        { title: "If Statements and Conditionals", duration: "20:30", type: "video" },
                        { title: "Loops and Iterations", duration: "25:15", type: "video" }
                    ]
                }
            ],
            reviews: [
                {
                    id: 1,
                    author: "Alex Rodriguez",
                    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50",
                    rating: 5,
                    date: "2 weeks ago",
                    text: "This course is absolutely fantastic! John explains everything clearly and the projects are really practical. I've learned so much and feel confident using JavaScript now.",
                    helpful: 42
                }
            ],
            faq: [
                {
                    question: "What are the prerequisites for this course?",
                    answer: "No prior programming experience is required. Basic computer literacy and willingness to learn are all you need to get started."
                },
                {
                    question: "How long do I have access to the course?",
                    answer: "You get lifetime access to the course content, including all future updates and additions."
                },
                {
                    question: "Is there a certificate upon completion?",
                    answer: "Yes, you'll receive a certificate of completion that you can add to your LinkedIn profile or resume."
                }
            ]
        };
    }

    setupEventListeners() {
        // Enroll button
        const enrollBtn = document.querySelector('.enroll-btn');
        if (enrollBtn) {
            enrollBtn.addEventListener('click', () => this.handleEnrollment());
        }

        // Wishlist button
        const wishlistBtn = document.querySelector('.wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => this.toggleWishlist());
        }

        // Preview button
        const previewBtn = document.getElementById('play-preview');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => this.playPreview());
        }
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                
                // Update active states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
                
                this.currentTab = tabId;
            });
        });
    }

    setupCurriculum() {
        const curriculumSections = document.getElementById('curriculum-sections');
        if (!curriculumSections || !this.course.curriculum) return;

        curriculumSections.innerHTML = '';

        this.course.curriculum.forEach((section, sectionIndex) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'section';
            
            const lessonsHtml = section.lessons.map(lesson => `
                <div class="lecture">
                    <i class="fas fa-${lesson.type === 'video' ? 'play-circle' : 'file-alt'}"></i>
                    <span class="lecture-title">${lesson.title}</span>
                    <span class="lecture-duration">${lesson.duration}</span>
                </div>
            `).join('');

            sectionElement.innerHTML = `
                <div class="section-header">
                    <button class="section-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <h4>${section.title}</h4>
                    <span class="section-info">${section.lectures} lectures • ${section.duration}</span>
                </div>
                <div class="section-content">
                    ${lessonsHtml}
                </div>
            `;

            // Add toggle functionality
            const toggleBtn = sectionElement.querySelector('.section-toggle');
            const content = sectionElement.querySelector('.section-content');
            
            toggleBtn.addEventListener('click', () => {
                const isExpanded = content.style.display === 'block';
                content.style.display = isExpanded ? 'none' : 'block';
                toggleBtn.querySelector('i').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            });

            curriculumSections.appendChild(sectionElement);
        });
    }

    setupFAQ() {
        const faqContainer = document.querySelector('.faq-list');
        if (!faqContainer || !this.course.faq) return;

        faqContainer.innerHTML = '';

        this.course.faq.forEach(item => {
            const faqElement = document.createElement('div');
            faqElement.className = 'faq-item';
            
            faqElement.innerHTML = `
                <button class="faq-question">
                    <span>${item.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            `;

            // Add toggle functionality
            const questionBtn = faqElement.querySelector('.faq-question');
            const answer = faqElement.querySelector('.faq-answer');
            
            questionBtn.addEventListener('click', () => {
                const isExpanded = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqContainer.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.style.display = 'none';
                });
                faqContainer.querySelectorAll('.faq-question i').forEach(icon => {
                    icon.style.transform = 'rotate(0deg)';
                });

                // Toggle current item
                if (!isExpanded) {
                    answer.style.display = 'block';
                    questionBtn.querySelector('i').style.transform = 'rotate(180deg)';
                }
            });

            faqContainer.appendChild(faqElement);
        });
    }

    handleEnrollment() {
        // Show loading state
        const enrollBtn = document.querySelector('.enroll-btn');
        const originalText = enrollBtn.innerHTML;
        enrollBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        enrollBtn.disabled = true;

        // Simulate enrollment process
        setTimeout(() => {
            this.showNotification('Successfully enrolled in course!', 'success');
            enrollBtn.innerHTML = '<i class="fas fa-check"></i> Enrolled';
            enrollBtn.classList.add('enrolled');
            
            // Redirect to dashboard after a delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 2000);
    }

    toggleWishlist() {
        const wishlistBtn = document.querySelector('.wishlist-btn');
        const icon = wishlistBtn.querySelector('i');
        const isWishlisted = wishlistBtn.classList.contains('wishlisted');

        if (isWishlisted) {
            wishlistBtn.classList.remove('wishlisted');
            icon.style.color = '';
            this.showNotification('Removed from wishlist', 'info');
        } else {
            wishlistBtn.classList.add('wishlisted');
            icon.style.color = '#ef4444';
            this.showNotification('Added to wishlist', 'success');
        }
    }

    playPreview() {
        // In a real app, this would open a video modal
        this.showNotification('Opening course preview...', 'info');
        
        // Simulate video modal
        setTimeout(() => {
            const modal = document.createElement('div');
            modal.className = 'video-modal active';
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="video-container">
                        <div style="padding: 100px; text-align: center; background: #000; color: white;">
                            <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                            <h3>Course Preview Video</h3>
                            <p>This would be the actual course preview video</p>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Close modal functionality
            const closeBtn = modal.querySelector('.modal-close');
            const overlay = modal.querySelector('.modal-overlay');
            
            const closeModal = () => {
                modal.remove();
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);
            
            document.body.style.overflow = 'hidden';
        }, 500);
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
}

// Initialize course detail manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CourseDetailManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourseDetailManager;
}