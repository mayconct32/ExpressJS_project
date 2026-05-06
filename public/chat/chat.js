import { API_BASE_URL } from "../config.js"

const socket = io(API_BASE_URL, {
  auth: {
    token: sessionStorage.getItem("token")
  }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('message', input.value);
    input.value = '';
  }
});

socket.on('message', message => {
  const item = document.createElement('li');

  if (typeof message === 'object') {
    item.innerHTML = `
      <strong style="color: #58d68d;">${message.username}:</strong>
      ${message.message}
      <time>${message.date}</time>
    `;
  } else {
    item.textContent = message;
    item.classList.add("system");
  }

  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});