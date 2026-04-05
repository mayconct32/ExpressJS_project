import { users_model } from "../../models/users_model.js";
import { decode_token } from "../../services/auth_service.js";
import { verify_password } from "../../services/encryption.js";


export const verify_permission = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({message: "Please log in"})
    }
    const current_user = decode_token(token)
    if (!current_user || req.params.user_id != current_user.user_id){
        return res.status(401).json({message: "unauthorized"})
    }
    next()
}

export const verify_credentials = async (req, res, next) => {
    var { username, password } = req.body
    const user = await users_model.findOne({username: username})
    if (!user || !(await verify_password(password, user.password))){
        return res.status(403).json(
            {message: "Invalid username or password"}
        )
    }
    var { username, email, _id } = user
    const user_token = {
        user_id: String(_id),
        username: username,
        email: email
    }
    req.headers.user_token = user_token
    next()
}

