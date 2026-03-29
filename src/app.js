import express from "express"
import { router as users } from "./routers/users.js"


export const app = express()

app.get("/health", (req, res) => {
    res.json(
        {message: "The server is up and running"}
    )
});

/* definindo o uso de json nas rotas */
app.use(express.json())

/* incluindo rota */
app.use("/users", users) 

/* middleware para tratamento de erros */
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError){
        return res.status(400).json({message: "Badly formatted JSON"})
    }
    try{
        return res.status(error.status_code).json({message: error.message})
    } catch(err) {
        return res.status(500).json({message: err})
    }
})



