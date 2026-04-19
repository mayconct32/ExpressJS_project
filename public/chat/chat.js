const socket = io(
    "http://127.0.0.1:3000",
    {
        auth: {
            token: sessionStorage.getItem("token")
        }
    }
);

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages')

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("message", input.value);
        input.value = '';
    }
});

socket.on('message', message => {
    const item = document.createElement('li');
    if (message instanceof Object){
        item.textContent = `
            ${message.username}: ${message.message} - ${message.date}
        `;
    } else {
        item.textContent = message;
    }
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});