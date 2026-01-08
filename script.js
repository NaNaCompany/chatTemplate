document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatViewport = document.getElementById('chatViewport');
    const titleElement = document.querySelector('.header-content h1');
    const timestampElement = document.querySelector('.system-message .timestamp');
    const subtitleElement = document.querySelector('.header-content .subtitle');

    // Toggle Theme
    titleElement.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // Change Model Name
    if (timestampElement) {
        // timestampElement.style.cursor = 'pointer'; // Handled in CSS now

        timestampElement.addEventListener('click', function () {
            // Prevent multiple inputs
            if (this.querySelector('input')) return;

            const currentName = this.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentName;
            input.className = 'timestamp-input';

            // Measure text width approximated
            input.style.width = (currentName.length + 2) + 'ch';

            this.textContent = '';
            this.appendChild(input);
            input.focus();

            function save() {
                const newName = input.value.trim() || currentName;
                timestampElement.textContent = newName;
                if (subtitleElement) {
                    subtitleElement.textContent = newName;
                }
            }

            input.addEventListener('blur', save);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    save();
                }
            });

            // Stop propagation to prevent immediate closing issues if any
            input.addEventListener('click', (e) => e.stopPropagation());
        });
    }

    // State tracking
    let messageCount = 1;

    function appendMessage(text, type) {
        const row = document.createElement('div');
        row.classList.add('message-row', type);

        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        bubble.textContent = text;

        row.appendChild(bubble);
        chatMessages.appendChild(row);

        // Scroll to bottom
        chatViewport.scrollTop = chatViewport.scrollHeight;
    }

    function handleSubmit(e) {
        if (e) e.preventDefault();

        const text = messageInput.value.trim();
        if (!text) return;

        // Determine message type
        const isUser = messageCount % 2 !== 0;
        const type = isUser ? 'user' : 'ai';

        appendMessage(text, type);

        // Update state
        messageCount++;
        messageInput.value = '';
        messageInput.style.height = 'auto'; // Reset height
        messageInput.focus();
    }

    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });

    // Handle Enter key
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    });

    chatForm.addEventListener('submit', handleSubmit);

    // Focus input on load
    messageInput.focus();
    // Onboarding Dismissal
    const overlay = document.getElementById('onboarding-overlay');

    function dismissOverlay() {
        if (overlay && !overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);

            // Remove listeners
            document.removeEventListener('click', dismissOverlay);
            document.removeEventListener('touchstart', dismissOverlay);
            document.removeEventListener('keydown', dismissOverlay);
        }
    }

    if (overlay) {
        // Use document level listener with capture to ensure we catch it
        setTimeout(() => {
            document.addEventListener('click', dismissOverlay);
            document.addEventListener('touchstart', dismissOverlay);
            document.addEventListener('keydown', dismissOverlay);
        }, 100);
    }
});
