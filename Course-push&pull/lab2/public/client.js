const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value.trim() !== '') {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    const isMyMessage = msg.id === socket.id;
    messageElement.classList.add('message');
    
    if (isMyMessage) {
        messageElement.classList.add('sent');
    } else {
        messageElement.classList.add('incoming');
    }

    const timeString = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageElement.innerHTML = `
        <span class="sender-id">${isMyMessage ? 'You' : msg.id.substring(0, 5)}</span>
        <p>${msg.text}</p>
        <span class="time">${timeString}</span>
    `;

    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
