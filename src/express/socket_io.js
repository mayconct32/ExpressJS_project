import http from "http"
import { Server } from "socket.io"
import { app } from "./app.js"
import { authService } from "../services/auth_service.js"
import sanitizeHtml from "sanitize-html"


export const server_http = http.createServer(app)

const io = new Server(server_http)

io.on("connection", socket => {
  const token_handshake = socket.handshake.auth?.token
  let token_headers = socket.handshake.headers?.authorization

  if (!token_handshake && !token_headers) {
    socket.emit("message", "Please log in")
    socket.disconnect(true)
    return
  }

  const current_user = authService.decode_token(token_handshake || token_headers)
  if (!current_user) {
    socket.emit("message", "Authentication error")
    socket.disconnect(true)
    return
  }

  socket.broadcast.emit("message", `${current_user.username} entrou na sala`)

  socket.on("disconnect", () => {
    socket.broadcast.emit("message", `usuário ${current_user.username} saiu da sala`)
  })

  socket.on("message", message => {
    if (!message || typeof message !== "string") {
      return
    }

    // protecao contra Cross-Site Scripting
    const sanitizedMessage = sanitizeHtml(message.trim(), {
      allowedTags: [],
      allowedAttributes: {}
    })

    if (sanitizedMessage.length === 0 || sanitizedMessage.length > 250) {
      return
    }

    const now = new Date()
    io.emit("message", {
      username: current_user.username,
      message: sanitizedMessage,
      date: now.toTimeString().slice(0, 5)
    })
  })
})


