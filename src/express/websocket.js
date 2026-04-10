import http from "http"
import { Server } from "socket.io"


export const server_http = http.createServer()
const io = new Server(server_http)

/* a opcao "connection" cria uma conexao do cliente com o servidor */
/* quando o cliente se conectar sera criado um socket(tomada) */
io.on("connection", socket => {
    let username_client;
    /* quando o usuario for conectado */
    socket.on("server:enter_the_room", username => {
        username_client = username;
        socket.broadcast.emit("broadcast", `${username} entrou na sala`)
    })

    /* quando o usuario for desconectado */
    socket.on("disconnect", () => {
        socket.broadcast.emit("broadcast", `usuario ${username_client} foi desconectado`)
    })

    socket.on("SendMessage", (username, message) => {
        const now = new Date()
        io.emit("SendMessage",{
            username: username,
            message: message,
            date: `${now.getHours()}:${now.getMinutes()}`
        })
    })
})


