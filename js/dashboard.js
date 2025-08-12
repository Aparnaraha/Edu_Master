// Dashboard JavaScript
class DashboardManager {
    constructor() {
        this.currentSection = 'overview';
        this.userData = null;
        this.courses = [];
        this.progress = {};
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.setupSectionNavigation();
        this.renderDashboard();
        this.setupProgressChart();
    }

    loadUserData() {
        // In a real app, this would come from an API
        this.userData = {
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80",
            joinDate: "2023-06-15",
            totalCourses: 5,
            completedCourses: 12,
            certificates: 15,
            averageProgress: 72,
            weeklyHours: 12.5,
            achievements: ["🎯 Goal Crusher", "📚 Bookworm", "⚡ Speed Learner"]
        };

        this.courses = [
            {
                id: 1,
                title: "Complete JavaScript Mastery",
                instructor: "John Smith",
                image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300",
                progress: 65,
                totalLessons: 23,
                completedLessons: 15,
                remainingTime: "8.5h",
                status: "in-progress",
                lastAccessed: "2 hours ago"
            },
            {
                id: 2,
                title: "React Complete Guide",
                instructor: "Sarah Johnson",
                image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300",
                progress: 30,
                totalLessons: 20,
                completedLessons: 6,
                remainingTime: "24.5h",
                status: "in-progress",
                lastAccessed: "1 day ago"
            },
            {
                id: 3,
                title: "CSS Mastery",
                instructor: "Emma Rodriguez",
                image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=300",
                progress: 100,
                totalLessons: 18,
                completedLessons: 18,
                remainingTime: "0h",
                status: "completed",
                completedDate: "December 28, 2023",
                certificate: true
            }
        ];

        this.bookmarks = [
            {
                id: 1,
                title: "Understanding Closures in JavaScript",
                type: "lesson",
                course: "JavaScript Mastery Course - Lesson 12",
                date: "2 days ago"
            },
            {
                id: 2,
                title: "React Hooks Best Practices",
                type: "article",
                course: "Blog Article by John Smith",
                date: "1 week ago"
            }
        ];

        this.certificates = [
            {
                id: 1,
                title: "JavaScript Fundamentals",
                issueDate: "January 10, 2024",
                instructor: "John Smith"
            },
            {
                id: 2,
                title: "CSS Mastery",
                issueDate: "December 28, 2023",
                instructor: "Sarah Johnson"
            }
        ];
    }

    setupEventListeners() {
        // Settings form
        const settingsForm = document.querySelector('.settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => this.handleSettingsUpdate(e));
        }

        // Toggle switches
        const toggleSwitches = document.querySelectorAll('.toggle-switch input');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', (e) => this.handleToggleChange(e));
        });

        // Course actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn')) {
                const btn = e.target.closest('.btn');
                if (btn.textContent.includes('Continue Learning')) {
                    this.continueLearning(btn);
                } else if (btn.textContent.includes('Download')) {
                    this.downloadCertificate(btn);
                } else if (btn.textContent.includes('Share')) {
                    this.shareCertificate(btn);
                }
            }

            if (e.target.closest('.bookmark-remove')) {
                this.removeBookmark(e.target.closest('.bookmark-remove'));
            }
        });
    }

    setupSectionNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        const sections = document.querySelectorAll('.dashboard-section');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const sectionId = item.dataset.section;
                
                // Update active states
                menuItems.forEach(mi => mi.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                item.classList.add('active');
                document.getElementById(sectionId).classList.add('active');
                
                this.currentSection = sectionId;
                this.renderSection(sectionId);
            });
        });
    }

    renderDashboard() {
        this.renderOverview();
        this.renderCourses();
        this.renderBookmarks();
        this.renderCertificates();
        this.renderProgress();
    }

    renderOverview() {
        // Update user stats
        const statsElements = document.querySelectorAll('.header-stats .stat-number');
        if (statsElements.length >= 3) {
            statsElements[0].textContent = this.userData.totalCourses;
            statsElements[1].textContent = `${this.userData.averageProgress}%`;
            statsElements[2].textContent = this.userData.certificates;
        }

        // Update weekly hours
        const weeklyHours = document.querySelector('.time-number');
        if (weeklyHours) {
            weeklyHours.textContent = this.userData.weeklyHours;
        }

        // Update achievements
        const achievementList = document.querySelector('.achievement-list');
        if (achievementList) {
            achievementList.innerHTML = this.userData.achievements
                .map(achievement => `<span class="achievement">${achievement}</span>`)
                .join('');
        }
    }

    renderCourses() {
        const coursesGrid = document.querySelector('#courses .courses-grid');
        if (!coursesGrid) return;

        coursesGrid.innerHTML = '';

        this.courses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            coursesGrid.appendChild(courseCard);
        });
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card dashboard-course';

        const progressPercentage = course.progress;
        const circumference = 2 * Math.PI * 26;
        const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

        card.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-progress-overlay">
                    <div class="circular-progress">
                        <svg class="progress-ring" width="60" height="60">
                            <circle class="progress-ring-circle" 
                                stroke="#6366f1" 
                                stroke-width="4" 
                                fill="transparent" 
                                r="26" 
                                cx="30" 
                                cy="30" 
                                style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"
                            />
                        </svg>
                        <span class="progress-percentage">${progressPercentage}%</span>
                    </div>
                </div>
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p class="course-instructor">by ${course.instructor}</p>
                <div class="course-progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="course-stats">
                    <span>${course.completedLessons}/${course.totalLessons} lessons</span>
                    <span>${course.remainingTime} remaining</span>
                </div>
                <button class="btn btn-primary" data-course-id="${course.id}">
                    ${course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                </button>
            </div>
        `;

        return card;
    }

    renderBookmarks() {
        const bookmarksList = document.querySelector('#bookmarks .bookmarks-list');
        if (!bookmarksList) return;

        bookmarksList.innerHTML = '';

        this.bookmarks.forEach(bookmark => {
            const bookmarkItem = document.createElement('div');
            bookmarkItem.className = 'bookmark-item';

            const icon = bookmark.type === 'lesson' ? 'play-circle' : 'file-alt';

            bookmarkItem.innerHTML = `
                <div class="bookmark-icon">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="bookmark-content">
                    <h4>${bookmark.title}</h4>
                    <p>${bookmark.course}</p>
                    <span class="bookmark-date">Bookmarked ${bookmark.date}</span>
                </div>
                <div class="bookmark-actions">
                    <button class="btn btn-outline btn-small">
                        ${bookmark.type === 'lesson' ? 'Watch' : 'Read'}
                    </button>
                    <button class="bookmark-remove" data-bookmark-id="${bookmark.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            bookmarksList.appendChild(bookmarkItem);
        });
    }

    renderCertificates() {
        const certificatesGrid = document.querySelector('#certificates .certificates-grid');
        if (!certificatesGrid) return;

        certificatesGrid.innerHTML = '';

        this.certificates.forEach(certificate => {
            const certificateCard = document.createElement('div');
            certificateCard.className = 'certificate-card';

            certificateCard.innerHTML = `
                <div class="certificate-image">
                    <div class="certificate-badge">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <h3>${certificate.title}</h3>
                    <p>Completed with Excellence</p>
                </div>
                <div class="certificate-info">
                    <p><strong>Issued:</strong> ${certificate.issueDate}</p>
                    <p><strong>Instructor:</strong> ${certificate.instructor}</p>
                    <div class="certificate-actions">
                        <button class="btn btn-primary btn-small" data-certificate-id="${certificate.id}">Download</button>
                        <button class="btn btn-outline btn-small" data-certificate-id="${certificate.id}">Share</button>
                    </div>
                </div>
            `;

            certificatesGrid.appendChild(certificateCard);
        });
    }

    renderProgress() {
        // Render learning timeline
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            const timelineItems = [
                {
                    title: "JavaScript Fundamentals",
                    description: "Completed 5 lessons",
                    date: "January 15, 2024",
                    status: "completed"
                },
                {
                    title: "Advanced JavaScript",
                    description: "In progress - 3/8 lessons",
                    date: "January 18, 2024",
                    status: "current"
                },
                {
                    title: "React Components",
                    description: "Starting soon",
                    date: "January 25, 2024",
                    status: "pending"
                }
            ];

            timeline.innerHTML = timelineItems.map(item => `
                <div class="timeline-item ${item.status}">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <span class="timeline-date">${item.date}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    setupProgressChart() {
        const canvas = document.getElementById('progress-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = [20, 35, 45, 30, 55, 40, 65]; // Weekly progress data
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        this.drawChart(ctx, data, labels);
    }

    drawChart(ctx, data, labels) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        const maxValue = Math.max(...data);
        const barWidth = width / data.length;
        const barMaxHeight = height - 40;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw bars
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * barMaxHeight;
            const x = index * barWidth + barWidth * 0.2;
            const y = height - barHeight - 20;

            // Create gradient
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, '#6366f1');
            gradient.addColorStop(1, '#3b82f6');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth * 0.6, barHeight);

            // Draw labels
            ctx.fillStyle = '#6b7280';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x + barWidth * 0.3, height - 5);

            // Draw values
            ctx.fillStyle = '#374151';
            ctx.fillText(value + 'h', x + barWidth * 0.3, y - 5);
        });
    }

    renderSection(sectionId) {
        switch (sectionId) {
            case 'overview':
                this.renderOverview();
                break;
            case 'courses':
                this.renderCourses();
                break;
            case 'progress':
                this.setupProgressChart();
                break;
            case 'bookmarks':
                this.renderBookmarks();
                break;
            case 'certificates':
                this.renderCertificates();
                break;
        }
    }

    continueLearning(button) {
        const courseId = button.dataset.courseId;
        const course = this.courses.find(c => c.id == courseId);
        
        if (course) {
            this.showNotification(`Continuing "${course.title}"...`, 'info');
            
            // Simulate navigation to course
            setTimeout(() => {
                this.showNotification(`Opening "${course.title}"`, 'success');
            }, 1000);
        }
    }

    downloadCertificate(button) {
        const certificateId = button.dataset.certificateId;
        const certificate = this.certificates.find(c => c.id == certificateId);
        
        if (certificate) {
            this.showNotification(`Downloading certificate for "${certificate.title}"...`, 'info');
            
            // Simulate download
            setTimeout(() => {
                this.showNotification('Certificate downloaded successfully!', 'success');
            }, 1500);
        }
    }

    shareCertificate(button) {
        const certificateId = button.dataset.certificateId;
        const certificate = this.certificates.find(c => c.id == certificateId);
        
        if (certificate) {
            // Simulate sharing to LinkedIn
            this.showNotification(`Sharing "${certificate.title}" certificate...`, 'info');
            
            setTimeout(() => {
                this.showNotification('Certificate shared to LinkedIn!', 'success');
            }, 1000);
        }
    }

    removeBookmark(button) {
        const bookmarkId = button.dataset.bookmarkId;
        this.bookmarks = this.bookmarks.filter(b => b.id != bookmarkId);
        this.renderBookmarks();
        this.showNotification('Bookmark removed', 'info');
    }

    handleSettingsUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const settings = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Updating...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Profile updated successfully!', 'success');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    handleToggleChange(e) {
        const setting = e.target.name;
        const enabled = e.target.checked;
        
        this.showNotification(
            `${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${enabled ? 'enabled' : 'disabled'}`,
            'info'
        );
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

// Initialize dashboard manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardManager;
}