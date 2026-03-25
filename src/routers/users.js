import express from "express"
import { UsersController } from "../controllers/users_controller.js"


export const router = express.Router()
const users_controller = new UsersController()

router.post("/", users_controller.Post)
