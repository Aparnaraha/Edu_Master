// Chat Widget Controller
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.botResponses = [
            "Hi! How can I help you today?",
            "I'm here to assist you with any questions about our courses.",
            "Would you like to know more about our learning platform?",
            "Feel free to ask me anything about enrollment or course content.",
            "I can help you find the perfect course for your goals!",
            "Our support team is available 24/7 to assist you.",
            "Thanks for your message! Let me connect you with the right information.",
            "Is there a specific course or topic you're interested in?",
            "I'd be happy to help you get started with your learning journey!"
        ];
        
        this.init();
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
        this.loadChatHistory();
    }

    createChatWidget() {
        // Check if chat widget already exists
        if (document.getElementById('chat-widget')) return;

        const chatWidget = document.createElement('div');
        chatWidget.id = 'chat-widget';
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-header">
                <div class="chat-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="chat-info">
                    <h4>Support Chat</h4>
                    <span class="online-status">Online</span>
                </div>
                <button class="chat-minimize" id="chat-minimize">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Hi! How can I help you today?</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message..." id="chat-input">
                <button id="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        document.body.appendChild(chatWidget);

        // Get references to elements
        this.chatWidget = chatWidget;
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-message');
        this.minimizeButton = document.getElementById('chat-minimize');
    }

    bindEvents() {
        // Chat toggle buttons
        const chatButtons = document.querySelectorAll('#chat-btn, #chat-toggle, #contact-chat-btn, #help-chat-btn');
        chatButtons.forEach(button => {
            button?.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleChat();
            });
        });

        // Send message
        this.sendButton?.addEventListener('click', () => this.sendMessage());
        this.chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Minimize chat
        this.minimizeButton?.addEventListener('click', () => this.closeChat());

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatWidget.contains(e.target) && !e.target.closest('[id*="chat"]')) {
                // Don't close immediately, add a small delay to prevent accidental closes
                setTimeout(() => {
                    if (!this.chatWidget.matches(':hover')) {
                        this.closeChat();
                    }
                }, 100);
            }
        });

        // Auto-responses for common questions
        this.setupAutoResponses();
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.chatWidget.classList.add('active');
        this.isOpen = true;
        this.chatInput.focus();
        
        // Add welcome message if it's the first time
        if (this.messages.length === 0) {
            setTimeout(() => {
                this.addBotMessage("Welcome! I'm here to help you with any questions about our courses and platform. What would you like to know?");
            }, 500);
        }
    }

    closeChat() {
        this.chatWidget.classList.remove('active');
        this.isOpen = false;
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.addUserMessage(message);
        this.chatInput.value = '';

        // Simulate typing indicator
        this.showTypingIndicator();

        // Generate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateBotResponse(message);
            this.addBotMessage(response);
        }, 1000 + Math.random() * 2000);
    }

    addUserMessage(message) {
        const messageElement = this.createMessageElement(message, 'user');
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        this.messages.push({
            type: 'user',
            content: message,
            timestamp: new Date()
        });
        
        this.saveChatHistory();
    }

    addBotMessage(message) {
        const messageElement = this.createMessageElement(message, 'bot');
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        this.messages.push({
            type: 'bot',
            content: message,
            timestamp: new Date()
        });
        
        this.saveChatHistory();
    }

    createMessageElement(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${this.escapeHtml(message)}</p>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">${time}</span>
                </div>
            `;
        }
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease-out';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });
        
        return messageDiv;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        // Add typing animation styles
        const style = document.createElement('style');
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: var(--gray-100);
                border-radius: 18px;
                width: fit-content;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                background: var(--gray-400);
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-10px); opacity: 1; }
            }
        `;
        
        if (!document.querySelector('#typing-styles')) {
            style.id = 'typing-styles';
            document.head.appendChild(style);
        }
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for specific keywords and provide relevant responses
        if (message.includes('course') || message.includes('learn')) {
            return "We offer a wide variety of courses in web development, data science, AI, design, and more! You can browse all our courses on the courses page. Is there a specific topic you're interested in?";
        }
        
        if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
            return "Our courses are competitively priced and we often have special offers! Most courses range from $49 to $199, and we offer a 30-day money-back guarantee. Would you like me to help you find courses in your budget?";
        }
        
        if (message.includes('certificate')) {
            return "Yes! You'll receive a certificate of completion for every course you finish. These certificates can be shared on LinkedIn and added to your resume. They're a great way to showcase your new skills!";
        }
        
        if (message.includes('support') || message.includes('help')) {
            return "Our support team is here to help! You can reach us via email at support@edumaster.com, through WhatsApp, or right here in this chat. We typically respond within a few hours during business hours.";
        }
        
        if (message.includes('refund') || message.includes('money back')) {
            return "We offer a 30-day money-back guarantee on all our courses. If you're not satisfied for any reason, just contact our support team within 30 days of purchase for a full refund.";
        }
        
        if (message.includes('instructor') || message.includes('teacher')) {
            return "Our instructors are industry experts with years of real-world experience. You can learn more about them on our instructors page. Each course page also shows detailed information about the instructor.";
        }
        
        if (message.includes('time') || message.includes('long') || message.includes('duration')) {
            return "Course lengths vary depending on the topic and depth. Most courses are between 10-40 hours of content. You can learn at your own pace and have lifetime access to all course materials!";
        }
        
        if (message.includes('beginner') || message.includes('start')) {
            return "Absolutely! We have courses for all skill levels, including complete beginners. Look for courses marked as 'Beginner' level. Our JavaScript and Python courses are great starting points for programming!";
        }
        
        if (message.includes('mobile') || message.includes('app')) {
            return "Yes! Our platform works great on mobile devices, and we also have a mobile app for iOS and Android. You can download course videos for offline viewing too!";
        }
        
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're very welcome! I'm happy to help. Is there anything else you'd like to know about our courses or platform?";
        }
        
        if (message.includes('bye') || message.includes('goodbye')) {
            return "Thanks for chatting with me! Feel free to reach out anytime if you have more questions. Happy learning! 🎓";
        }
        
        // Default responses for general queries
        const responses = [
            "That's a great question! Let me help you with that. Could you provide a bit more detail about what you're looking for?",
            "I'd be happy to help! You can also browse our FAQ section for quick answers to common questions.",
            "Thanks for reaching out! For detailed information, I recommend checking our courses page or contacting our support team directly.",
            "I'm here to help! Is there a specific course or topic you're interested in learning more about?",
            "Great question! You might also find helpful information in our blog section where we share learning tips and industry insights."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    setupAutoResponses() {
        // Add quick response buttons for common questions
        const quickResponses = [
            { text: "Course Information", response: "I'd like to know more about your courses" },
            { text: "Pricing", response: "What are your course prices?" },
            { text: "Certificates", response: "Do you provide certificates?" },
            { text: "Support", response: "I need help with something" }
        ];

        // Add quick responses after initial bot message
        setTimeout(() => {
            if (this.messages.length <= 1) {
                this.addQuickResponses(quickResponses);
            }
        }, 2000);
    }

    addQuickResponses(responses) {
        const quickResponsesDiv = document.createElement('div');
        quickResponsesDiv.className = 'quick-responses';
        quickResponsesDiv.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Here are some common questions I can help with:</p>
                    <div class="quick-response-buttons">
                        ${responses.map(resp => 
                            `<button class="quick-response-btn" data-response="${resp.response}">${resp.text}</button>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add styles for quick responses
        const style = document.createElement('style');
        style.textContent = `
            .quick-response-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 12px;
            }
            
            .quick-response-btn {
                padding: 8px 12px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 16px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .quick-response-btn:hover {
                background: var(--primary-dark);
                transform: translateY(-1px);
            }
        `;
        
        if (!document.querySelector('#quick-response-styles')) {
            style.id = 'quick-response-styles';
            document.head.appendChild(style);
        }

        this.chatMessages.appendChild(quickResponsesDiv);

        // Bind click events to quick response buttons
        quickResponsesDiv.querySelectorAll('.quick-response-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const response = btn.dataset.response;
                this.chatInput.value = response;
                this.sendMessage();
                quickResponsesDiv.remove();
            });
        });

        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveChatHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(this.messages));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    loadChatHistory() {
        try {
            const history = localStorage.getItem('chatHistory');
            if (history) {
                this.messages = JSON.parse(history);
                // Optionally restore messages to UI
                // this.restoreMessages();
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    clearChatHistory() {
        this.messages = [];
        this.chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Hi! How can I help you today?</p>
                    <span class="message-time">Just now</span>
                </div>
            </div>
        `;
        localStorage.removeItem('chatHistory');
    }
}

// Initialize chat widget
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = new ChatWidget();
    
    // Make it globally accessible
    window.chatWidget = chatWidget;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatWidget;
}