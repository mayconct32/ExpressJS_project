import { users_model} from "../models/users_model.js"
import exceptions from "../exceptions.js"


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
}