import express from "express"
import { router as users } from "./routers/users.js"
import { router as auth } from "./routers/auth.js"
import { exception_handler } from "./middlewares/error_handlers.js";


export const app = express()

app.get("/health", (req, res) => {
    res.json(
        {message: "The server is up and running"}
    )
});

/* definindo o uso de json nas rotas */
app.use(express.json())

/* incluindo rotas */
app.use("/users", users)
app.use("/auth", auth)

/* middleware para tratamento de erros */
app.use(exception_handler)



