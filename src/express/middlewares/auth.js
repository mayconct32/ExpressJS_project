import { authService } from "../../services/auth_service.js"


export const verify_permission = (req, res, next) => {
    const token = req.headers.authorization
    const user_id = req.params.user_id
    authService.verify_permission(token, user_id)
    next()
}
