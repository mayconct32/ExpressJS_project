import express from "express";

const app = express();

const port = 8081;

app.get("/", (req, res) => {
    res.send("seja Bem-vindo")
});

app.get("/teste", (req, res) => {
    res.send("teste")
});

app.listen(
    port,
    () => {
        console.log(`o servidor esta rodando na porta ${port}...`)
    }
)
