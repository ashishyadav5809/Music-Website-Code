// let bt = document.getElementById("Submit")
// bt.addEventListener("click", () => {
//     let news = document.body.querySelector("#news")
//     let value = news.value;
//     console.log(value)
//     news.value = "";
//     const blob = new Blob([value], { type: "text/plain" });
//     // Create a temporary anchor element
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob); // Create a URL for the Blob
//     a.download = "input.txt"; // Set the file name
//     document.body.appendChild(a); // Append the anchor to the body
//     a.click(); // Trigger the download
//     document.body.removeChild(a); // Remove the anchor after download
// })
// Elements
const chatbotIcon = document.getElementById('chatbot-icon');
const chatWindow = document.getElementById('chat-window');
const closeBtn = document.querySelector('.close-btn');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const messages = document.querySelector('.messages');

// Open/Close Chat Window
chatbotIcon.addEventListener('click', () => {
  chatWindow.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  chatWindow.style.display = 'none';
});

// Sending a Message
sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    appendMessage('user', userMessage);
    appendMessage('bot', "I'm here to help!"); // Placeholder bot response
    chatInput.value = '';
  }
}

function appendMessage(sender, text) {
  const message = document.createElement('div');
  message.classList.add(sender);
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
}