import express from "express"
import { auth_body_validator } from "../middlewares/express_validator.js"
import { validation_handler } from "../middlewares/error_handlers.js" 
import { AuthController } from "../controllers/auth_controller.js"
import { authService } from "../../services/auth_service.js"


export const router = express.Router()
const auth_controller = new AuthController(authService)

router.post(
    "/", 
    auth_body_validator,
    validation_handler,
    auth_controller.create_token
)
