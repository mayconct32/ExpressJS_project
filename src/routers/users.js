import express from "express"
import { UsersController } from "../controllers/users_controller.js"
import { 
    body_validator, 
    param_and_body_validator, 
    param_validator 
} from "../user_validator.js"


export const router = express.Router()
const users_controller = new UsersController()

router.post(
    "/", 
    body_validator, 
    users_controller.validator_middleware,
    users_controller.create_user
)

router.get(
    "/:user_id", 
    param_validator, 
    users_controller.validator_middleware,
    users_controller.get_user
)

router.put(
    "/:user_id", 
    param_and_body_validator, 
    users_controller.validator_middleware,
    users_controller.update_user
)

router.delete(
    "/:user_id", 
    param_validator, 
    users_controller.validator_middleware,
    users_controller.delete_user
)