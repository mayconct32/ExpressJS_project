import { users_model} from "../models/users_model.js"
import { validationResult } from "express-validator";


export class UsersController {
    async validator_middleware(req, res, next){
        const error = validationResult(req)
        if (!error.isEmpty()){
            return res.status(400).json({message: error})
        } 
        next()
    }

    async create_user(req, res){
        const user = await users_model.create(req.body)
        return res.status(201).json(user)
    }

    async get_user(req, res){
        const user = await users_model.findById(req.params.user_id)
        return res.status(200).json(user)
    }

    async update_user(req, res){
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