import { coding_token } from "../../services/auth_service.js"


export class AuthController{
    create_token = async (req, res) => {
        const payload = req.headers.user_token
        const token = coding_token(payload)
        return res.status(201).json({token: token})
    }
}