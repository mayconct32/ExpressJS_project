import { UserRepository } from "../../repositories/users_repository.js"
import { AuthService } from "../../services/auth_service.js"


export const verify_permission = (req, res, next) => {
    const authService = new AuthService(new UserRepository())
    const token = req.headers.authorization
    const user_id = req.params.user_id
    authService.verify_permission(token, user_id)
    next()
}
