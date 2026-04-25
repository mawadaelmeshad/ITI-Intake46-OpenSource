const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = role === 'user' ? 'Me' : 'AI';
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    chatContainer.appendChild(msgDiv);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message assistant typing';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
        <div class="avatar">AI</div>
        <div class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    chatContainer.appendChild(indicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;
    
    appendMessage('user', text);
    userInput.value = '';
    
    showTypingIndicator();
    
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: text })
        });
        
        const data = await response.json();
        removeTypingIndicator();
        
        if (data.answer) {
            appendMessage('assistant', data.answer);
        } else {
            appendMessage('assistant', 'Sorry, I encountered an error.');
        }
    } catch (err) {
        removeTypingIndicator();
        appendMessage('assistant', 'Could not connect to the server.');
        console.error(err);
    }
});
