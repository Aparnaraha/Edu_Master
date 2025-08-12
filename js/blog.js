// Blog Page JavaScript
class BlogManager {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.postsPerLoad = 6;
        this.loadedPosts = 6;
        
        this.init();
    }

    init() {
        this.loadBlogPosts();
        this.setupEventListeners();
        this.renderPosts();
    }

    loadBlogPosts() {
        // Sample blog posts - in a real app, this would come from an API
        this.posts = [
            {
                id: 1,
                title: "The Complete Guide to Modern Web Development in 2024",
                excerpt: "Discover the latest trends, tools, and frameworks that are shaping the future of web development. From React 18 to Web3 integration, learn what skills you need to stay competitive.",
                content: "Full article content would be here...",
                author: {
                    name: "John Smith",
                    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40",
                    title: "Senior Developer"
                },
                category: "web-dev",
                image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "January 15, 2024",
                readTime: "8 min read",
                tags: ["web development", "react", "javascript", "trends"],
                featured: true
            },
            {
                id: 2,
                title: "5 Essential Skills Every Developer Should Master in 2024",
                excerpt: "From cloud computing to AI integration, discover the key skills that will make you stand out in the competitive tech industry.",
                content: "Full article content would be here...",
                author: {
                    name: "Sarah Johnson",
                    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40",
                    title: "Tech Lead"
                },
                category: "career",
                image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "January 12, 2024",
                readTime: "6 min read",
                tags: ["career", "skills", "development", "tech"],
                featured: false
            },
            {
                id: 3,
                title: "Python Data Analysis: From Beginner to Pro",
                excerpt: "A comprehensive tutorial on using Python for data analysis, covering pandas, NumPy, and visualization libraries.",
                content: "Full article content would be here...",
                author: {
                    name: "Dr. Michael Chen",
                    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=40",
                    title: "Data Scientist"
                },
                category: "tutorials",
                image: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "January 10, 2024",
                readTime: "12 min read",
                tags: ["python", "data analysis", "pandas", "tutorial"],
                featured: false
            },
            {
                id: 4,
                title: "Understanding Neural Networks: A Visual Guide",
                excerpt: "Demystify neural networks with clear explanations and visual examples. Perfect for beginners entering the AI field.",
                content: "Full article content would be here...",
                author: {
                    name: "Emma Rodriguez",
                    avatar: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=40",
                    title: "AI Researcher"
                },
                category: "ai-ml",
                image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "January 8, 2024",
                readTime: "10 min read",
                tags: ["ai", "machine learning", "neural networks", "beginner"],
                featured: false
            },
            {
                id: 5,
                title: "React Hooks: Advanced Patterns and Best Practices",
                excerpt: "Master advanced React Hooks patterns and learn how to write cleaner, more efficient React components.",
                content: "Full article content would be here...",
                author: {
                    name: "David Park",
                    avatar: "https://images.pexels.com/photos/1181486/pexels-photo-1181486.jpeg?auto=compress&cs=tinysrgb&w=40",
                    title: "Frontend Developer"
                },
                category: "web-dev",
                image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "January 5, 2024",
                readTime: "8 min read",
                tags: ["react", "hooks", "javascript", "frontend"],
                featured: false
            },
            {
                id: 6,
                title: "The Future of Remote Work in Tech Industry",
                excerpt: "Explore how remote work is reshaping the tech industry and what it means for developers and companies.",
                content: "Full article content would be here...",
                author: {
                    name: "Lisa Wong",
                    avatar: "https://images.pexels.com/photos/1181567/pexels-photo-1181567.jpeg?auto=compress&cs=tinysrgb&w=40",
                    title: "Tech Analyst"
                },
                category: "industry",
                image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "January 3, 2024",
                readTime: "7 min read",
                tags: ["remote work", "tech industry", "future", "trends"],
                featured: false
            },
            {
                id: 7,
                title: "CSS Grid vs Flexbox: When to Use Each",
                excerpt: "A practical guide to choosing between CSS Grid and Flexbox for your layout needs, with real-world examples.",
                content: "Full article content would be here...",
                author: {
                    name: "John Smith",
                    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40",
                    title: "Senior Developer"
                },
                category: "tutorials",
                image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "December 28, 2023",
                readTime: "9 min read",
                tags: ["css", "grid", "flexbox", "layout"],
                featured: false
            }
        ];

        this.filteredPosts = [...this.posts];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterPosts();
            });
        }

        // Category filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.setActiveCategory(category);
                this.filterPosts();
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e);
            });
        }
    }

    setActiveCategory(category) {
        this.currentCategory = category;
        
        // Update button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    filterPosts() {
        let filtered = [...this.posts];

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(post => post.category === this.currentCategory);
        }

        // Filter by search term
        if (this.searchTerm) {
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(this.searchTerm) ||
                post.excerpt.toLowerCase().includes(this.searchTerm) ||
                post.author.name.toLowerCase().includes(this.searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
            );
        }

        this.filteredPosts = filtered;
        this.loadedPosts = this.postsPerLoad;
        this.renderPosts();
    }

    renderPosts() {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid) return;

        const postsToShow = this.filteredPosts.slice(0, this.loadedPosts);
        
        if (postsToShow.length === 0) {
            blogGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or category filters</p>
                </div>
            `;
            this.updateLoadMoreButton(false);
            return;
        }

        blogGrid.innerHTML = '';
        
        postsToShow.forEach((post, index) => {
            const postCard = this.createPostCard(post);
            postCard.style.animationDelay = `${(index % this.postsPerLoad) * 0.1}s`;
            blogGrid.appendChild(postCard);
        });

        // Update load more button
        const hasMorePosts = this.loadedPosts < this.filteredPosts.length;
        this.updateLoadMoreButton(hasMorePosts);
    }

    createPostCard(post) {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.setAttribute('data-category', post.category);

        card.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="blog-overlay">
                    <a href="blog-post.html?id=${post.id}" class="read-more-btn">
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="category">${this.formatCategoryName(post.category)}</span>
                    <span class="date">${post.date}</span>
                </div>
                <h3 class="blog-title">
                    <a href="blog-post.html?id=${post.id}">${post.title}</a>
                </h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-footer">
                    <div class="author">
                        <img src="${post.author.avatar}" alt="${post.author.name}">
                        <span>${post.author.name}</span>
                    </div>
                    <div class="read-time">
                        <i class="fas fa-clock"></i>
                        <span>${post.readTime}</span>
                    </div>
                </div>
                <div class="blog-tags">
                    ${post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        return card;
    }

    formatCategoryName(category) {
        const categoryNames = {
            'web-dev': 'Web Development',
            'ai-ml': 'AI & ML',
            'career': 'Career Tips',
            'tutorials': 'Tutorials',
            'industry': 'Industry News'
        };
        return categoryNames[category] || category;
    }

    loadMorePosts() {
        this.loadedPosts += this.postsPerLoad;
        this.renderPosts();
        
        // Smooth scroll to new content
        setTimeout(() => {
            const newPosts = document.querySelectorAll('.blog-card');
            if (newPosts.length > this.loadedPosts - this.postsPerLoad) {
                const targetPost = newPosts[this.loadedPosts - this.postsPerLoad];
                targetPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    updateLoadMoreButton(show) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = show ? 'inline-flex' : 'none';
        }
    }

    handleNewsletterSignup(e) {
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;

        // Show loading state
        button.textContent = 'Subscribing...';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Successfully subscribed to our newsletter!', 'success');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
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

    // Search functionality with debouncing
    debounceSearch(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Get related posts
    getRelatedPosts(currentPostId, limit = 3) {
        const currentPost = this.posts.find(post => post.id === currentPostId);
        if (!currentPost) return [];

        return this.posts
            .filter(post => post.id !== currentPostId)
            .filter(post => 
                post.category === currentPost.category ||
                post.tags.some(tag => currentPost.tags.includes(tag))
            )
            .slice(0, limit);
    }

    // Get popular posts
    getPopularPosts(limit = 5) {
        // In a real app, this would be based on view counts, likes, etc.
        return this.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // Get posts by author
    getPostsByAuthor(authorName) {
        return this.posts.filter(post => post.author.name === authorName);
    }

    // Get posts by tag
    getPostsByTag(tag) {
        return this.posts.filter(post => 
            post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
        );
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogManager;
}