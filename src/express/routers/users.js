import express from "express"
import { UsersController } from "../controllers/users_controller.js"
import { 
    body_validator,
    param_validator
} from "../middlewares/express_validator.js"
import { validation_handler } from "../middlewares/error_handlers.js"
import { verify_permission } from "../middlewares/auth.js"


export const router = express.Router()
const users_controller = new UsersController()

router.post(
    "/", 
    body_validator, 
    validation_handler,
    users_controller.create_user
)

router.get(
    "/:user_id", 
    param_validator, 
    validation_handler,
    users_controller.get_user
)

router.put(
    "/:user_id",
    param_validator,
    body_validator,
    validation_handler,
    verify_permission,
    users_controller.update_user
)

router.delete(
    "/:user_id", 
    param_validator, 
    validation_handler,
    verify_permission,
    users_controller.delete_user
)