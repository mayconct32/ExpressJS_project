import { users_model} from "../models/users_model.js"
import exceptions from "../exceptions.js"
import { isValidObjectId } from "mongoose"


export class UsersController {
    async create_user(req, res){
        const {username, email, password} = req.body

        /* validacao de body */
        if (!username){
            throw new exceptions.BadRequestError(
                "Requires username"
            )
        } else if (!email){
            throw new exceptions.BadRequestError(
                "Requires email"
            )
        } else if (!password){
            throw new exceptions.BadRequestError(
                "Requires password"
            )
        }

        /* validacao de email */
        if (!email.includes("@")){
            throw new exceptions.BadRequestError(
                "This email is not valid"
            )
        }

        const conflict_user = await users_model.findOne(
            {email: req.body.email}
        )

        /* validacao de email unico */
        if (conflict_user){
            throw new exceptions.ConflictingUserError(
                "this email is already in use"
            )
        }

        const user = await users_model.create(req.body)
        res.status(201).json(user)
    }

    async get_user(req, res){
        const { user_id } = req.params

        /* validacao de user_id */
        if(!isValidObjectId(user_id)){
            throw new exceptions.UserNotFoundError("this ID is invalid")
        }

        const user = await users_model.findById(user_id)

        /* verificando se ha usuario com esse ID */
        if (!user){
            throw new exceptions.UserNotFoundError("This user does not exist")
        }

        res.status(200).json(user)
    }

    async update_user(req, res){
        const { user_id } = req.params

        /* validacao de user_id */
        if(!isValidObjectId(user_id)){
            throw new UserNotFoundError("this ID is invalid")
        }

        const {username, email, password} = req.body

        /* validacao de body */
        if (!username){
            throw new exceptions.BadRequestError(
                "Requires username"
            )
        } else if (!email){
            throw new exceptions.BadRequestError(
                "Requires email"
            )
        } else if (!password){
            throw new exceptions.BadRequestError(
                "Requires password"
            )
        }

        /* validacao de email */
        if (!email.includes("@")){
            throw new exceptions.BadRequestError(
                "This email is not valid"
            )
        }
        
        const conflict_user = await users_model.findOne(
            {email: req.body.email}
        )

        /* validacao de email unico */
        if (conflict_user){
            throw new exceptions.ConflictingUserError(
                "this email is already in use"
            )
        }

        const user = await users_model.findByIdAndUpdate(
            user_id, req.body
        )

        /* verificando se ha usuario com esse ID*/
        if (!user){
            throw new exceptions.UserNotFoundError("This user does not exist")
        }

        res.status(200).json(
            {message: "User has successfully updated"}
        )
    }

    async delete_user(req, res){
        const { user_id } = req.params

        /* validacao de user_id */
        if(!isValidObjectId(user_id)){
            throw new exceptions.UserNotFoundError("this ID is invalid")
        }

        const user = await users_model.findByIdAndDelete(user_id)

        /* verificando se ha usuario com esse ID*/
        if (!user){
            throw new exceptions.UserNotFoundError("This user does not exist")
        }

        res.status(200).json(
            {message: "The user has been successfully deleted"}
        )
    }
}