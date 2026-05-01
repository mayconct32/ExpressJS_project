import { ApiError } from "../../exceptions.js"
import { authService } from "../../services/auth_service.js"


export class AuthController {
    constructor(authService) {
        this.authService = authService
    }

    create_token = async (req, res) => {
        const { username, password } = req.body
        const token = await this.authService.create_token(
            username, password
        )
        return res.status(201).json({access_token: token})
    }
}