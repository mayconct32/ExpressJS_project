import express from "express"
import { UsersController } from "../controllers/users_controller.js"
import { usersService } from "../../services/users_service.js"
import { 
    body_validator,
    user_id_param_validator
} from "../middlewares/express_validator.js"
import { validation_handler } from "../middlewares/error_handlers.js"
import { verify_permission } from "../middlewares/auth.js"


export const router = express.Router()
const users_controller = new UsersController(usersService)

router.post(
    "/", 
    body_validator, 
    validation_handler,
    users_controller.create_user
)

router.get(
    "/:user_id", 
    user_id_param_validator, 
    validation_handler,
    verify_permission,
    users_controller.get_user
)

router.put(
    "/:user_id",
    user_id_param_validator,
    body_validator,
    validation_handler,
    verify_permission,
    users_controller.update_user
)

router.delete(
    "/:user_id", 
    user_id_param_validator, 
    validation_handler,
    verify_permission,
    users_controller.delete_user
)