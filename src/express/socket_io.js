import http from "http"
import { Server } from "socket.io"
import { app } from "./app.js"
import { authService } from "../services/auth_service.js"


export const server_http = http.createServer(app)
const io = new Server(server_http, {
  cors: {
    origin: "*"
  }
});

/* a opcao "connection" cria uma conexao do cliente com o servidor */
/* quando o cliente se conectar sera criado um socket(tomada) */
io.on("connection", socket => {
    const token_handshake = socket.handshake.auth.token;
    let token_headers;
    try{
        token_headers = socket.handshake.headers.authorization
    } catch(err){}
    if (!token_handshake && !token_headers){
        socket.emit("message", "Please log in")
        socket.disconnect()
    }
    const current_user = authService.decode_token(token_handshake || token_headers)
    if (!current_user){
        socket.emit("message", "Authentication error")
        socket.disconnect()
    } else {
        socket.broadcast.emit(
            "message", `${current_user.username} entrou na sala`
        )
    }
    socket.on("disconnect", () => {
        socket.broadcast.emit(
            "message", `usuario ${current_user.username} foi desconectado`
        )
        
    })
    socket.on("message", message => {
        const now = new Date()
        io.emit("message",{
            username: current_user.username,
            message: message,
            date:  now.toTimeString().slice(0, 5)
        })
    })
})


