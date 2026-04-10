const socket = io("http://127.0.0.1:3000");

const username_client = "maycon"

socket.emit("server:enter_the_room", username_client)

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("SendMessage", "maycon", input.value);
        input.value = '';
    }
});

socket.on('SendMessage', message => {
    const item = document.createElement('li');
    item.textContent = `${message.username}: ${message.message} - ${message.date}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('broadcast', message => {
    const item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});