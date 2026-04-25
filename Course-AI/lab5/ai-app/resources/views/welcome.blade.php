<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Antigravity AI | Chat</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: radial-gradient(circle at top right, #1a1a2e, #16213e, #0f3460);
            min-height: 100vh;
        }
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .message-bubble {
            max-width: 80%;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ai-message {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-bottom-left-radius: 4px;
        }
        .user-message {
            background: rgba(139, 92, 246, 0.1);
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-bottom-right-radius: 4px;
        }
        .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        .chat-container::-webkit-scrollbar {
            width: 6px;
        }
        .chat-container::-webkit-scrollbar-track {
            background: transparent;
        }
        .chat-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        .typing-indicator span {
            width: 4px;
            height: 4px;
            background-color: #3b82f6;
            border-radius: 50%;
            display: inline-block;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    </style>
</head>
<body class="flex flex-col h-screen text-slate-200">
    <!-- Header -->
    <header class="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div class="flex items-center gap-2">
            <div class="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                <i data-lucide="zap" class="w-5 h-5 text-white"></i>
            </div>
            <h1 class="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Antigravity AI
            </h1>
        </div>
        <div class="flex items-center gap-4">
            <span class="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                System Online
            </span>
            <button class="p-2 hover:bg-white/5 rounded-full transition-colors">
                <i data-lucide="settings" class="w-5 h-5 text-slate-400"></i>
            </button>
        </div>
    </header>

    <div class="flex flex-1 overflow-hidden relative">
        <!-- Sidebar (Desktop) -->
        <aside class="hidden lg:flex flex-col w-72 glass border-r border-white/5 p-4 gap-6">
            <div>
                <button class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all transform active:scale-95 shadow-lg shadow-blue-500/20">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                    New Conversation
                </button>
            </div>
            <div class="flex-1 overflow-y-auto pr-2 chat-container">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Recent Chats</h3>
                <div class="space-y-1">
                    <button class="w-full text-left px-3 py-2 rounded-lg bg-white/5 text-blue-400 flex items-center gap-3">
                        <i data-lucide="message-square" class="w-4 h-4"></i>
                        <span class="truncate text-sm">Course AI Lab Discussion</span>
                    </button>
                    <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 flex items-center gap-3 transition-colors">
                        <i data-lucide="message-square" class="w-4 h-4"></i>
                        <span class="truncate text-sm">Machine Learning Basics</span>
                    </button>
                </div>
            </div>
            <div class="pt-4 border-t border-white/5">
                <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                    <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" class="w-10 h-10 rounded-lg" alt="User">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-sm font-medium truncate">Lab Student</p>
                        <p class="text-xs text-slate-500 truncate">student@iti.gov.eg</p>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="flex-1 flex flex-col relative overflow-hidden bg-[#0a0a0f]/50">
            <!-- Messages container -->
            <div id="chat-messages" class="flex-1 overflow-y-auto px-4 py-8 space-y-6 chat-container scroll-smooth">
                <!-- Welcome Message -->
                <div class="flex justify-center mb-8">
                    <div class="glass p-6 rounded-2xl max-w-md text-center">
                        <div class="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="sparkles" class="w-6 h-6 text-blue-500"></i>
                        </div>
                        <h2 class="text-lg font-semibold mb-2">Welcome to AI Assistant</h2>
                        <p class="text-sm text-slate-400">Your intelligent partner for ITI course labs. I can help with coding, architecture, and debugging.</p>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 lg:p-8">
                <div class="max-w-4xl mx-auto relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl transition-opacity opacity-0 group-focus-within:opacity-100"></div>
                    <div class="glass rounded-2xl relative border-white/10 group-focus-within:border-blue-500/50 transition-all overflow-hidden p-2 flex items-end gap-2 shadow-2xl">
                        <button class="p-2 text-slate-500 hover:text-slate-300 transition-colors mb-1">
                            <i data-lucide="paperclip" class="w-5 h-5"></i>
                        </button>
                        <textarea 
                            id="message-input"
                            rows="1" 
                            placeholder="Ask anything..." 
                            class="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:ring-0 max-h-48 resize-none py-3 px-2 text-sm lg:text-base"
                        ></textarea>
                        <button 
                            id="send-btn"
                            class="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/40 transition-all transform active:scale-90 flex items-center justify-center disabled:opacity-50 disabled:active:scale-100"
                        >
                            <i data-lucide="send-horizontal" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <p class="text-[10px] text-center text-slate-500 mt-3 uppercase tracking-widest">Powered by Antigravity Engine V2</p>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Init Lucide Icons
        lucide.createIcons();

        const messageInput = document.getElementById('message-input');
        const sendBtn = document.getElementById('send-btn');
        const chatMessages = document.getElementById('chat-messages');

        // Auto-resize textarea
        messageInput.addEventListener('input', () => {
            messageInput.style.height = 'auto';
            messageInput.style.height = (messageInput.scrollHeight) + 'px';
        });

        async function appendMessage(text, isAi = false) {
            const div = document.createElement('div');
            div.className = `flex ${isAi ? 'justify-start' : 'justify-end'} opacity-0 translate-y-4 transition-all duration-500 ease-out`;
            
            div.innerHTML = `
                <div class="message-bubble ${isAi ? 'ai-message' : 'user-message'} p-4 rounded-2xl shadow-sm">
                    ${isAi ? '<div class="flex items-center gap-2 mb-2 text-blue-400"><i data-lucide="bot" class="w-4 h-4"></i> <span class="text-[10px] font-bold uppercase tracking-wider">AI Assistant</span></div>' : ''}
                    <p class="text-sm leading-relaxed">${text}</p>
                </div>
            `;
            
            chatMessages.appendChild(div);
            lucide.createIcons();
            
            // Trigger animation
            setTimeout(() => {
                div.classList.remove('opacity-0', 'translate-y-4');
            }, 50);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        async function showTyping() {
            const div = document.createElement('div');
            div.id = 'typing-indicator';
            div.className = 'flex justify-start opacity-0 transition-opacity duration-300';
            div.innerHTML = `
                <div class="message-bubble ai-message p-3 rounded-2xl px-6">
                    <div class="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(() => div.classList.remove('opacity-0'), 10);
            return div;
        }

        async function handleSend() {
            const message = messageInput.value.trim();
            if (!message) return;

            messageInput.value = '';
            messageInput.style.height = 'auto';
            appendMessage(message, false);

            const typing = await showTyping();

            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                typing.remove();

                if (data.reply) {
                    appendMessage(data.reply, true);
                } else if (data.error) {
                    appendMessage('Error: ' + data.error, true);
                }
            } catch (err) {
                typing.remove();
                appendMessage('Failed to connect to the server. Please try again.', true);
            }
        }

        sendBtn.addEventListener('click', handleSend);
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });
    </script>
</body>
</html>