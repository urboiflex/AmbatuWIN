$(document).ready(function() {
    // Elements
    const chatMessages = $('#chatMessages');
    const userInput = $('#userInput');
    const sendButton = $('#sendButton');

    // Webhook URL - from index2.html
    const webhookUrl = 'https://vouch1.app.n8n.cloud/webhook/cdc03fce-33b6-4eed-86b5-f628994e5e31/chat';
    
    // Session ID - using the same one from index2.html for now
    const sessionId = "bb1f1ff2-d320-4ec7-97a4-156afdff8b4d";

    // Handle send button click
    sendButton.on('click', function() {
        sendMessage();
    });
    
    // Handle enter key press in textarea
    userInput.on('keydown', function(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Function to send message (based directly on index2.html)
    async function sendMessage() {
        const userText = userInput.val().trim();
        if (!userText) return;

        // Add user message to chat
        addUserMessage(userText);
    
        appendMessage(userText, 'user');
      messageInput.value = '';
        // Clear input
        userInput.val('');
    
        try {
            const res = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "sendMessage",
                    sessionId: sessionId,
                    chatInput: userText
                })
            });
            
            const data = await res.json();
            const botReply = data.output || "No reply received.";
            
            // Add bot message to chat
            addBotMessage(botReply);
        } catch (err) {
            console.error('Error:', err);
            addBotMessage('Error: Could not connect to the server.');
        }
    }

    // Function to add a user message to the chat
    function addUserMessage(text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="message user">
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;
        
        chatMessages.append(messageHTML);
        scrollToBottom();
    }

    function appendMessage(text, sender) {
        const msg = document.createElement('div');
        msg.classList.add('message', sender);
  
        if (sender === 'bot') {
          // Convert *bold* to <strong>bold</strong>
          const formatted = text.replace(/\\(.?)\\*/g, "<strong>$1</strong>");
          msg.innerHTML = formatted;
        } else {
          msg.textContent = text;
        }
  
        chatBox.appendChild(msg);
        chatBox.scrollTop = chatBox.scrollHeight;
      }


    // Function to add a bot message to the chat
    function addBotMessage(text) {
        appendMessage(botReply, 'bot');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Format text to bold any content between ** markers
        const formattedText = text.replace(/\\(.?)\\*/g, "<strong>$1</strong>");
    

        const messageHTML = `
            <div class="message assistant">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${formattedText}</p>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;
        
        chatMessages.append(messageHTML);
        scrollToBottom();
    }

    // Function to scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
    }

    // Initialize sidebar toggle for mobile - keeping basic UI functionality
    $('.menu-toggle').on('click', function() {
        $('.sidebar').toggleClass('active');
    });
});