// Courses Page JavaScript
class CoursesManager {
    constructor() {
        this.courses = [];
        this.filteredCourses = [];
        this.currentPage = 1;
        this.coursesPerPage = 12;
        this.currentView = 'grid';
        this.filters = {
            search: '',
            category: '',
            level: '',
            duration: '',
            price: '',
            sort: 'popularity'
        };
        
        this.init();
    }

    init() {
        this.loadCourses();
        this.setupEventListeners();
        this.setupFilters();
        this.renderCourses();
    }

    loadCourses() {
        // Sample course data - in a real app, this would come from an API
        this.courses = [
            {
                id: 1,
                title: "Complete JavaScript Mastery",
                instructor: "John Smith",
                instructorImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50",
                image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400",
                category: "web-dev",
                level: "beginner",
                duration: 40,
                price: 99,
                originalPrice: 199,
                rating: 4.9,
                students: 15234,
                description: "Master JavaScript from basics to advanced concepts with real-world projects",
                tags: ["javascript", "programming", "web development"],
                badge: "Bestseller",
                lastUpdated: "2024-01-15"
            },
            {
                id: 2,
                title: "React Complete Guide 2024",
                instructor: "Sarah Johnson",
                instructorImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50",
                image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
                category: "web-dev",
                level: "intermediate",
                duration: 35,
                price: 89,
                originalPrice: 179,
                rating: 4.8,
                students: 8945,
                description: "Build modern web applications with React, Redux, and TypeScript",
                tags: ["react", "frontend", "typescript"],
                badge: "New",
                lastUpdated: "2024-01-10"
            },
            {
                id: 3,
                title: "Python for Data Science",
                instructor: "Dr. Michael Chen",
                instructorImage: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50",
                image: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400",
                category: "data-science",
                level: "beginner",
                duration: 50,
                price: 119,
                originalPrice: 229,
                rating: 4.9,
                students: 12678,
                description: "Learn Python programming and data analysis with pandas, NumPy, and more",
                tags: ["python", "data science", "machine learning"],
                badge: "Popular",
                lastUpdated: "2024-01-08"
            },
            {
                id: 4,
                title: "UI/UX Design Fundamentals",
                instructor: "Emma Rodriguez",
                instructorImage: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=50",
                image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
                category: "design",
                level: "beginner",
                duration: 25,
                price: 79,
                originalPrice: 149,
                rating: 4.7,
                students: 6789,
                description: "Master the principles of user interface and user experience design",
                tags: ["ui", "ux", "design", "figma"],
                badge: "",
                lastUpdated: "2024-01-05"
            },
            {
                id: 5,
                title: "Machine Learning with Python",
                instructor: "Dr. Michael Chen",
                instructorImage: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50",
                image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
                category: "ai-ml",
                level: "advanced",
                duration: 60,
                price: 149,
                originalPrice: 299,
                rating: 4.8,
                students: 4567,
                description: "Deep dive into machine learning algorithms and implementations",
                tags: ["machine learning", "python", "ai"],
                badge: "",
                lastUpdated: "2024-01-03"
            },
            {
                id: 6,
                title: "Mobile App Development with React Native",
                instructor: "David Park",
                instructorImage: "https://images.pexels.com/photos/1181486/pexels-photo-1181486.jpeg?auto=compress&cs=tinysrgb&w=50",
                image: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400",
                category: "mobile",
                level: "intermediate",
                duration: 45,
                price: 109,
                originalPrice: 199,
                rating: 4.6,
                students: 3456,
                description: "Build cross-platform mobile apps with React Native",
                tags: ["react native", "mobile", "ios", "android"],
                badge: "",
                lastUpdated: "2024-01-01"
            }
        ];

        this.filteredCourses = [...this.courses];
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('course-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.applyFilters();
            });
        }

        // Filter dropdowns
        const filterElements = [
            'category-filter',
            'level-filter', 
            'duration-filter',
            'price-filter',
            'sort-filter'
        ];

        filterElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    const filterType = id.replace('-filter', '');
                    this.filters[filterType] = e.target.value;
                    this.applyFilters();
                });
            }
        });

        // View toggle
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });

        // Pagination
        this.setupPagination();
    }

    setupFilters() {
        // Category filter based on available courses
        const categories = [...new Set(this.courses.map(course => course.category))];
        const categoryFilter = document.getElementById('category-filter');
        
        if (categoryFilter) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = this.formatCategoryName(category);
                categoryFilter.appendChild(option);
            });
        }
    }

    formatCategoryName(category) {
        const categoryNames = {
            'web-dev': 'Web Development',
            'mobile': 'Mobile Development',
            'ai-ml': 'AI & Machine Learning',
            'data-science': 'Data Science',
            'design': 'Design',
            'business': 'Business'
        };
        return categoryNames[category] || category;
    }

    applyFilters() {
        let filtered = [...this.courses];

        // Search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(course => 
                course.title.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // Category filter
        if (this.filters.category) {
            filtered = filtered.filter(course => course.category === this.filters.category);
        }

        // Level filter
        if (this.filters.level) {
            filtered = filtered.filter(course => course.level === this.filters.level);
        }

        // Duration filter
        if (this.filters.duration) {
            filtered = filtered.filter(course => {
                switch (this.filters.duration) {
                    case 'short': return course.duration < 10;
                    case 'medium': return course.duration >= 10 && course.duration <= 30;
                    case 'long': return course.duration > 30;
                    default: return true;
                }
            });
        }

        // Price filter
        if (this.filters.price) {
            filtered = filtered.filter(course => {
                switch (this.filters.price) {
                    case 'free': return course.price === 0;
                    case 'paid': return course.price > 0;
                    default: return true;
                }
            });
        }

        // Sort
        filtered = this.sortCourses(filtered, this.filters.sort);

        this.filteredCourses = filtered;
        this.currentPage = 1;
        this.renderCourses();
        this.updateResultsCount();
    }

    sortCourses(courses, sortBy) {
        switch (sortBy) {
            case 'popularity':
                return courses.sort((a, b) => b.students - a.students);
            case 'rating':
                return courses.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return courses.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            case 'price-low':
                return courses.sort((a, b) => a.price - b.price);
            case 'price-high':
                return courses.sort((a, b) => b.price - a.price);
            default:
                return courses;
        }
    }

    renderCourses() {
        const coursesGrid = document.getElementById('courses-grid');
        if (!coursesGrid) return;

        const startIndex = (this.currentPage - 1) * this.coursesPerPage;
        const endIndex = startIndex + this.coursesPerPage;
        const coursesToShow = this.filteredCourses.slice(startIndex, endIndex);

        coursesGrid.className = `courses-grid ${this.currentView}-view`;
        coursesGrid.innerHTML = '';

        if (coursesToShow.length === 0) {
            coursesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No courses found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `;
            return;
        }

        coursesToShow.forEach((course, index) => {
            const courseCard = this.createCourseCard(course);
            courseCard.style.animationDelay = `${index * 0.1}s`;
            coursesGrid.appendChild(courseCard);
        });

        this.updatePagination();
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = `course-card ${this.currentView === 'list' ? 'list-view' : ''}`;
        
        const badgeHtml = course.badge ? `<div class="course-badge">${course.badge}</div>` : '';
        const discountPercent = Math.round((1 - course.price / course.originalPrice) * 100);
        
        card.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}" loading="lazy">
                <div class="course-overlay">
                    <button class="preview-btn" data-video="${course.id}">
                        <i class="fas fa-play"></i>
                        Preview
                    </button>
                </div>
                ${badgeHtml}
            </div>
            <div class="course-content">
                <div class="course-meta">
                    <span class="course-category">${this.formatCategoryName(course.category)}</span>
                    <div class="course-rating">
                        <div class="stars">
                            ${this.generateStars(course.rating)}
                        </div>
                        <span>${course.rating} (${course.students.toLocaleString()})</span>
                    </div>
                </div>
                <h3 class="course-title">
                    <a href="course-detail.html?id=${course.id}">${course.title}</a>
                </h3>
                <p class="course-description">${course.description}</p>
                <div class="course-instructor">
                    <img src="${course.instructorImage}" alt="${course.instructor}">
                    <span>by ${course.instructor}</span>
                </div>
                <div class="course-footer">
                    <div class="course-stats">
                        <span><i class="fas fa-clock"></i> ${course.duration}h</span>
                        <span><i class="fas fa-signal"></i> ${course.level}</span>
                    </div>
                    <div class="course-price">
                        <span class="original-price">$${course.originalPrice}</span>
                        <span class="current-price">$${course.price}</span>
                        <span class="discount">${discountPercent}% off</span>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary btn-enroll" data-course-id="${course.id}">
                        <i class="fas fa-shopping-cart"></i>
                        Enroll Now
                    </button>
                    <button class="btn btn-outline btn-wishlist" data-course-id="${course.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        const enrollBtn = card.querySelector('.btn-enroll');
        const wishlistBtn = card.querySelector('.btn-wishlist');
        const previewBtn = card.querySelector('.preview-btn');

        enrollBtn.addEventListener('click', () => this.enrollInCourse(course.id));
        wishlistBtn.addEventListener('click', () => this.toggleWishlist(course.id));
        previewBtn?.addEventListener('click', () => this.previewCourse(course.id));

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHtml = '';

        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }

        return starsHtml;
    }

    switchView(view) {
        this.currentView = view;
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        this.renderCourses();
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const start = (this.currentPage - 1) * this.coursesPerPage + 1;
            const end = Math.min(start + this.coursesPerPage - 1, this.filteredCourses.length);
            const total = this.filteredCourses.length;
            
            resultsCount.textContent = `Showing ${start}-${end} of ${total} courses`;
        }
    }

    setupPagination() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        pagination.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn')) {
                const page = parseInt(e.target.textContent);
                if (!isNaN(page)) {
                    this.currentPage = page;
                    this.renderCourses();
                }
            }

            if (e.target.closest('.prev')) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderCourses();
                }
            }

            if (e.target.closest('.next')) {
                const totalPages = Math.ceil(this.filteredCourses.length / this.coursesPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderCourses();
                }
            }
        });
    }

    updatePagination() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredCourses.length / this.coursesPerPage);
        const prevBtn = pagination.querySelector('.prev');
        const nextBtn = pagination.querySelector('.next');
        const pageNumbers = pagination.querySelector('.page-numbers');

        // Update prev/next buttons
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages;

        // Update page numbers
        let pagesHtml = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pagesHtml += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}">${i}</button>`;
        }

        if (endPage < totalPages) {
            pagesHtml += '<span class="page-dots">...</span>';
            pagesHtml += `<button class="page-btn">${totalPages}</button>`;
        }

        pageNumbers.innerHTML = pagesHtml;
    }

    enrollInCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            // In a real app, this would redirect to checkout or enrollment page
            this.showNotification(`Enrolling in "${course.title}"...`, 'success');
            
            // Simulate enrollment process
            setTimeout(() => {
                this.showNotification(`Successfully enrolled in "${course.title}"!`, 'success');
            }, 1500);
        }
    }

    toggleWishlist(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        const wishlistBtn = document.querySelector(`[data-course-id="${courseId}"].btn-wishlist`);
        
        if (course && wishlistBtn) {
            const isWishlisted = wishlistBtn.classList.contains('wishlisted');
            
            if (isWishlisted) {
                wishlistBtn.classList.remove('wishlisted');
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
                this.showNotification(`Removed "${course.title}" from wishlist`, 'info');
            } else {
                wishlistBtn.classList.add('wishlisted');
                wishlistBtn.innerHTML = '<i class="fas fa-heart" style="color: #ef4444;"></i>';
                this.showNotification(`Added "${course.title}" to wishlist`, 'success');
            }
        }
    }

    previewCourse(courseId) {
        // In a real app, this would open a video modal with course preview
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            this.showNotification(`Opening preview for "${course.title}"...`, 'info');
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
}

// Initialize courses manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CoursesManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoursesManager;
}