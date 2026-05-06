import express from "express"
import rateLimit from "express-rate-limit"
import { router as users } from "./routers/users.js"
import { router as auth } from "./routers/auth.js"
import { exception_handler } from "./middlewares/error_handlers.js"


export const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.static('../public'))

// Rate limiting para protecao contra brute force
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 requisições por IP
    message: "Too many login attempts, please try again later"
})

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // lembrar das requisicoes
    max: 50, // 50 requisicoes por IP
    message: "Too many requests, please try again later"
})

// CORS (acesso publico)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next()
})

app.use(generalLimiter)


app.use("/users", users)
app.use("/auth", authLimiter, auth)

app.get("/health", (req, res) => {
    return res.json({message: "The server is up and running"})
})

app.use(exception_handler)



