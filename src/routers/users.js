import express from "express"


export const router = express.Router()

router.post("/", (req, res) => {
    const pessoa = req.body
    res.status(201).json(pessoa)
})
