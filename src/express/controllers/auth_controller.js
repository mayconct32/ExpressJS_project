import { authService } from "../../services/auth_service.js"


export class AuthController {
    create_token = async (req, res) => {
        const payload = req.user_token_payload
        const token = authService.coding_token(payload)
        return res.status(201).json({token: token})
    }
}