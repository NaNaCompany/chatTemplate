document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatViewport = document.getElementById('chatViewport');

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
});
