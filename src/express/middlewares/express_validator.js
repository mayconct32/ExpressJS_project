import { body, param } from "express-validator"
import { isValidObjectId } from "mongoose"


export const body_validator = [
    body("username").notEmpty().trim().withMessage(
        "Requires username"
    ).isLength({min: 5}).withMessage(
        "The username must be at least 5 characters long"
    ),
    body("email").notEmpty().trim().withMessage(
        "Requires email"
    ).isEmail().withMessage(
        "This is not a valid email"
    ),
    body("password").notEmpty().trim().withMessage(
        "Requires password"
    ).isLength({min: 8}).withMessage(
        "The password must be at least 8 characters long"
    )
]

export const user_id_param_validator = param("user_id")
    .isMongoId()
    .withMessage("This ID is invalid")

export const auth_body_validator = [
    body("username").notEmpty().trim().withMessage(
        "Requires username"
    ),
    body("password").notEmpty().trim().withMessage(
        "Requires password "
    )
]