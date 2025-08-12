// Blog Post Page JavaScript
class BlogPostManager {
    constructor() {
        this.postId = this.getPostIdFromUrl();
        this.post = null;
        this.comments = [];
        
        this.init();
    }

    init() {
        this.loadPostData();
        this.setupEventListeners();
        this.setupComments();
        this.setupSocialSharing();
        this.setupTableOfContents();
    }

    getPostIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1';
    }

    loadPostData() {
        // In a real app, this would fetch from an API
        this.post = {
            id: 1,
            title: "The Complete Guide to Modern Web Development in 2024",
            subtitle: "Discover the latest trends, tools, and frameworks that are shaping the future of web development. From React 18 to Web3 integration, learn what skills you need to stay competitive.",
            author: {
                name: "John Smith",
                title: "Senior Full Stack Developer",
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60",
                bio: "John is a passionate educator and experienced developer with over 10 years in the industry."
            },
            category: "Web Development",
            date: "January 15, 2024",
            readTime: "8 min read",
            image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
            tags: ["web development", "react", "javascript", "trends"],
            likes: 142,
            shares: 28,
            bookmarks: 67,
            content: `
                <p class="lead">The web development landscape is constantly evolving, and 2024 promises to be a year of significant innovation and change. As we navigate through new technologies and methodologies, it's crucial for developers to stay updated with the latest trends and best practices.</p>

                <h2 id="current-state">The Current State of Web Development</h2>
                <p>Web development in 2024 is characterized by a focus on performance, user experience, and accessibility. The industry has matured significantly, with established patterns and practices that prioritize maintainable, scalable code.</p>

                <p>Modern web applications are expected to be fast, responsive, and accessible across all devices and platforms. This has led to the adoption of new architectural patterns and development methodologies that emphasize efficiency and user satisfaction.</p>

                <h3 id="key-technologies">Key Technologies Shaping 2024</h3>
                <p>Several technologies are particularly influential in shaping the web development landscape this year:</p>

                <ul>
                    <li><strong>React 18 and Concurrent Features:</strong> The latest version of React introduces powerful concurrent features that improve performance and user experience.</li>
                    <li><strong>Next.js 14:</strong> Enhanced with improved performance optimizations and developer experience features.</li>
                    <li><strong>Astro:</strong> A modern static site generator that's gaining popularity for its performance benefits.</li>
                    <li><strong>Web3 Integration:</strong> Blockchain and decentralized technologies are becoming more mainstream in web applications.</li>
                </ul>

                <h2 id="essential-skills">Essential Skills for Modern Developers</h2>
                <p>To remain competitive in 2024, developers should focus on mastering these essential skills:</p>

                <div class="highlight-box">
                    <h4>Frontend Development</h4>
                    <p>Proficiency in modern JavaScript frameworks, CSS-in-JS solutions, and performance optimization techniques is crucial for frontend developers.</p>
                </div>

                <h3>Performance Optimization</h3>
                <p>Performance remains a critical factor in web development. Techniques such as code splitting, lazy loading, and efficient bundling are essential for creating fast, responsive applications.</p>

                <blockquote>
                    "Performance is not just about making things fast; it's about creating experiences that users love and want to return to." - Web Performance Expert
                </blockquote>

                <h2 id="future-trends">Future Trends to Watch</h2>
                <p>Looking ahead, several trends are emerging that will likely define the next phase of web development:</p>

                <ol>
                    <li><strong>AI-Powered Development Tools:</strong> Tools that use artificial intelligence to assist with code generation and optimization.</li>
                    <li><strong>Edge Computing:</strong> Moving computation closer to users for improved performance.</li>
                    <li><strong>Progressive Web Apps (PWAs):</strong> Continued growth in PWA adoption for mobile-first experiences.</li>
                    <li><strong>Serverless Architecture:</strong> Increased adoption of serverless computing for scalable applications.</li>
                </ol>

                <h2 id="getting-started">Getting Started with Modern Web Development</h2>
                <p>For developers looking to modernize their skills, here's a practical roadmap:</p>

                <p>Start by mastering the fundamentals of HTML, CSS, and JavaScript. Then, gradually introduce modern frameworks and tools into your workflow. Focus on understanding the principles behind these technologies rather than just memorizing syntax.</p>

                <div class="code-block">
                    <pre><code>// Example: Modern JavaScript with ES6+ features
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};</code></pre>
                </div>

                <h2>Conclusion</h2>
                <p>Web development in 2024 is an exciting field full of opportunities for growth and innovation. By staying updated with the latest trends, focusing on performance and user experience, and continuously learning new skills, developers can build amazing web experiences that make a real impact.</p>

                <p>The key is to remain curious, experiment with new technologies, and always keep the end user in mind when making development decisions.</p>
            `
        };

        this.comments = [
            {
                id: 1,
                author: "Alex Rodriguez",
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50",
                time: "2 hours ago",
                text: "Great article! I especially found the section on performance optimization really helpful. Can't wait to implement these techniques in my next project.",
                likes: 5,
                replies: []
            },
            {
                id: 2,
                author: "Sarah Johnson",
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50",
                time: "4 hours ago",
                text: "Thanks for the comprehensive overview! The section on future trends was particularly insightful. Do you have any recommendations for learning resources?",
                likes: 3,
                replies: [
                    {
                        id: 3,
                        author: "John Smith",
                        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40",
                        time: "3 hours ago",
                        text: "@Sarah Johnson Absolutely! I'd recommend checking out our React and JavaScript courses on EduMaster. They cover all the modern concepts discussed in this article.",
                        likes: 2,
                        isAuthor: true
                    }
                ]
            }
        ];
    }

    setupEventListeners() {
        // Like button
        const likeBtn = document.querySelector('.action-btn[title="Like"]');
        if (likeBtn) {
            likeBtn.addEventListener('click', () => this.toggleLike());
        }

        // Share button
        const shareBtn = document.querySelector('.action-btn[title="Share"]');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.showShareModal());
        }

        // Bookmark button
        const bookmarkBtn = document.querySelector('.action-btn[title="Bookmark"]');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        }

        // Comment form
        const commentForm = document.querySelector('.comment-input-form');
        if (commentForm) {
            commentForm.addEventListener('submit', (e) => this.handleCommentSubmit(e));
        }

        // Load more comments
        const loadMoreBtn = document.querySelector('.load-more-comments');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreComments());
        }
    }

    setupComments() {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        commentsList.innerHTML = '';
        
        this.comments.forEach(comment => {
            const commentElement = this.createCommentElement(comment);
            commentsList.appendChild(commentElement);
        });

        // Update comment count
        const commentCount = document.querySelector('.comment-count');
        if (commentCount) {
            commentCount.textContent = `(${this.comments.length})`;
        }
    }

    createCommentElement(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        
        const authorBadge = comment.isAuthor ? '<span class="author-badge">Author</span>' : '';
        
        commentDiv.innerHTML = `
            <div class="comment-avatar">
                <img src="${comment.avatar}" alt="${comment.author}">
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <h4 class="comment-author">${comment.author} ${authorBadge}</h4>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-actions">
                    <button class="comment-action-btn like-btn" data-comment-id="${comment.id}">
                        <i class="fas fa-thumbs-up"></i>
                        Like (${comment.likes})
                    </button>
                    <button class="comment-action-btn reply-btn" data-comment-id="${comment.id}">
                        <i class="fas fa-reply"></i>
                        Reply
                    </button>
                </div>
                ${comment.replies ? this.createRepliesHtml(comment.replies) : ''}
            </div>
        `;

        // Add event listeners
        const likeBtn = commentDiv.querySelector('.like-btn');
        const replyBtn = commentDiv.querySelector('.reply-btn');

        likeBtn.addEventListener('click', () => this.likeComment(comment.id));
        replyBtn.addEventListener('click', () => this.showReplyForm(comment.id));

        return commentDiv;
    }

    createRepliesHtml(replies) {
        if (!replies || replies.length === 0) return '';

        return replies.map(reply => {
            const authorBadge = reply.isAuthor ? '<span class="author-badge">Author</span>' : '';
            return `
                <div class="comment-reply">
                    <div class="comment-avatar">
                        <img src="${reply.avatar}" alt="${reply.author}">
                    </div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <h4 class="comment-author">${reply.author} ${authorBadge}</h4>
                            <span class="comment-time">${reply.time}</span>
                        </div>
                        <p class="comment-text">${reply.text}</p>
                        <div class="comment-actions">
                            <button class="comment-action-btn">
                                <i class="fas fa-thumbs-up"></i>
                                Like (${reply.likes})
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupSocialSharing() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = btn.classList[1]; // twitter, facebook, etc.
                this.shareOnPlatform(platform);
            });
        });
    }

    setupTableOfContents() {
        const tocContainer = document.querySelector('.table-of-contents ul');
        if (!tocContainer) return;

        // Find all headings in the article
        const headings = document.querySelectorAll('.article-text h2, .article-text h3');
        tocContainer.innerHTML = '';

        headings.forEach(heading => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            });
            li.appendChild(a);
            tocContainer.appendChild(li);
        });
    }

    toggleLike() {
        const likeBtn = document.querySelector('.action-btn[title="Like"]');
        const likeCount = likeBtn.querySelector('span');
        const icon = likeBtn.querySelector('i');
        
        const isLiked = likeBtn.classList.contains('liked');
        
        if (isLiked) {
            likeBtn.classList.remove('liked');
            icon.style.color = '';
            this.post.likes--;
        } else {
            likeBtn.classList.add('liked');
            icon.style.color = '#ef4444';
            this.post.likes++;
        }
        
        likeCount.textContent = this.post.likes;
        this.showNotification(isLiked ? 'Like removed' : 'Post liked!', 'info');
    }

    toggleBookmark() {
        const bookmarkBtn = document.querySelector('.action-btn[title="Bookmark"]');
        const icon = bookmarkBtn.querySelector('i');
        
        const isBookmarked = bookmarkBtn.classList.contains('bookmarked');
        
        if (isBookmarked) {
            bookmarkBtn.classList.remove('bookmarked');
            icon.style.color = '';
            this.showNotification('Bookmark removed', 'info');
        } else {
            bookmarkBtn.classList.add('bookmarked');
            icon.style.color = '#f59e0b';
            this.showNotification('Post bookmarked!', 'success');
        }
    }

    showShareModal() {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Share this article</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="share-options">
                    <button class="share-option" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                        Twitter
                    </button>
                    <button class="share-option" data-platform="facebook">
                        <i class="fab fa-facebook"></i>
                        Facebook
                    </button>
                    <button class="share-option" data-platform="linkedin">
                        <i class="fab fa-linkedin"></i>
                        LinkedIn
                    </button>
                    <button class="share-option" data-platform="copy">
                        <i class="fas fa-link"></i>
                        Copy Link
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');

        // Event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const shareOptions = modal.querySelectorAll('.share-option');

        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        shareOptions.forEach(option => {
            option.addEventListener('click', () => {
                const platform = option.dataset.platform;
                this.shareOnPlatform(platform);
                closeModal();
            });
        });
    }

    shareOnPlatform(platform) {
        const url = window.location.href;
        const title = this.post.title;
        const text = this.post.subtitle;

        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    this.showNotification('Link copied to clipboard!', 'success');
                });
                break;
        }
    }

    handleCommentSubmit(e) {
        e.preventDefault();
        
        const textarea = e.target.querySelector('textarea');
        const text = textarea.value.trim();
        
        if (!text) return;

        const newComment = {
            id: this.comments.length + 1,
            author: "You",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50",
            time: "Just now",
            text: text,
            likes: 0,
            replies: []
        };

        this.comments.unshift(newComment);
        textarea.value = '';
        this.setupComments();
        this.showNotification('Comment posted successfully!', 'success');
    }

    likeComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.likes++;
            this.setupComments();
        }
    }

    showReplyForm(commentId) {
        // Implementation for reply form
        this.showNotification('Reply feature coming soon!', 'info');
    }

    loadMoreComments() {
        // Simulate loading more comments
        this.showNotification('Loading more comments...', 'info');
        
        setTimeout(() => {
            this.showNotification('No more comments to load', 'info');
        }, 1000);
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

// Initialize blog post manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogPostManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogPostManager;
}