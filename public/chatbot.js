async function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user-message");
  input.value = "";

  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  addMessage(data.reply, "bot-message");
}

function addMessage(text, className) {
  const chatMessages = document.getElementById("chat-messages");
  const div = document.createElement("div");

  div.className = className;
  div.textContent = text;

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}