import express from "express"
import { router as users } from "./routers/users.js"


export const app = express()

app.get("/health", (req, res) => {
    res.json(
        {message: "The server is up and running"}
    )
});

// definindo o uso de json nas rotas
app.use(express.json())

// incluindo rota
app.use("/users", users)


