import express from "express"
import { auth_body_validator } from "../middlewares/express_validator.js"
import { validation_handler } from "../middlewares/error_handlers.js" 
import { AuthController } from "../controllers/auth_controller.js"
import { verify_credentials } from "../middlewares/auth.js"


export const router = express.Router()
const auth_controller = new AuthController()

router.post(
    "/", 
    auth_body_validator,
    validation_handler,
    verify_credentials,
    auth_controller.create_token
)
