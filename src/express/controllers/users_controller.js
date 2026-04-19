import { users_model } from "../../models/users_model.js"
import { encrypt_password } from "../../services/encryption.js"


export class UsersController {
    async create_user(req, res){
        req.body.password = await encrypt_password(req.body.password)
        const user = await users_model.create(req.body)
        return res.status(201).json(
            {
                user_id: String(user._id),
                username: user.username,
                email: user.email
            }
        )
    }

    async get_user(req, res){
        const user = await users_model.findById(req.params.user_id)
        return res.status(200).json(
            {
                user_id: String(user._id),
                username: user.username,
                email: user.email
            }
        )
    }

    async update_user(req, res){
        if (req.body.password){
            req.body.password = await encrypt_password(req.body.password)
        }
        await users_model.updateOne({_id: req.params.user_id}, req.body)
        return res.status(200).json(
            {message: "User has successfully updated"}
        )
    }

    async delete_user(req, res){
        await users_model.deleteOne({_id: req.params.user_id})
        return res.status(200).json(
            {message: "The user has been successfully deleted"}
        )
    }
}