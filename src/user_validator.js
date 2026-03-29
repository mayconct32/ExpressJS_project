import { body, param } from "express-validator"
import { users_model } from "./models/users_model.js"
import { isValidObjectId } from "mongoose"
import exceptions from "./exceptions.js"


export const body_validator = [
    body("username").notEmpty().trim().withMessage(
        "Requires password"
    ).isLength({min: 5}).withMessage(
        "The username must be at least 5 characters long"
    ).custom(
        async username => {
            const conflict_user = await users_model.findOne(
                {username: username}
            )
            if (conflict_user){
                throw new exceptions.ConflictingUserError(
                    "this username is already in use"
                )
            }
        }
    ),
    body("email").notEmpty().trim().withMessage(
        "Requires email"
    ).isEmail().withMessage(
        "This is not a valid email"
    ).custom(
        async (email) => {
            const conflict_user = await users_model.findOne(
                {email: email}
            )
            if (conflict_user){
                throw new exceptions.ConflictingUserError(
                    "this email is already in use"
                )
            }
        }
    ),
    body("password").notEmpty().trim().withMessage(
        "Requires password"
    ).isLength({min: 8}).withMessage(
        "The password must be at least 8 characters long"
    )
]

export const param_validator = [
    param("user_id").custom(async user_id => {
        if(!isValidObjectId(user_id)){
            throw new exceptions.UserNotFoundError("this ID is invalid")
        }
        const user = await users_model.findOne({_id: user_id})
        if (!user){
            throw new exceptions.UserNotFoundError("This user does not exist")
        }
    }
)
]

export const param_and_body_validator = param_validator.concat(
    body_validator
)
