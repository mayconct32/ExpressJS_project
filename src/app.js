import express from "express";
import users from "./routers/users.js"


const app = express();
const port = 8081;

app.get("/", (req, res) => {
    res.send("seja Bem-vindo")
});

// definindo o uso de json nas rotas
app.use(express.json());

// incluindo rota
app.use("/users", users);

app.listen(
    port,
    () => {
        console.log(`o servidor esta rodando na porta ${port}...`)
    }
)

