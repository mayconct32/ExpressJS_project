import express from "express"
import { router as users } from "./routers/users.js"
import { router as auth } from "./routers/auth.js"
import { exception_handler } from "./middlewares/error_handlers.js";


export const app = express()

/* definindo o uso de json nas rotas */
app.use(express.json())

app.use(express.static('public'))
app.use(express.static('../public'))

/* config CORS */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
})

/* incluindo rotas */
app.use("/users", users)
app.use("/auth", auth)

app.get("/health", (req, res) => {
    return res.json(
        {message: "The server is up and running"}
    )
});

/* middleware para tratamento de erros */
app.use(exception_handler)



