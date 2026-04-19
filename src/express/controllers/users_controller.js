import {
    create_user as create_user_service,
    delete_user as delete_user_service,
    get_user_by_id,
    update_user as update_user_service
} from "../../services/users_service.js"


export class UsersController {
    create_user = async (req, res) => {
        const user = await create_user_service(req.body)
        return res.status(201).json(
            {
                user_id: String(user._id),
                username: user.username,
                email: user.email
            }
        )
    }

    get_user = async (req, res) => {
        const user = await get_user_by_id(req.params.user_id)
        return res.status(200).json(
            {
                user_id: String(user._id),
                username: user.username,
                email: user.email
            }
        )
    }

    update_user = async (req, res) => {
        await update_user_service(req.params.user_id, req.body)
        return res.status(200).json(
            {message: "User has successfully updated"}
        )
    }

    delete_user = async (req, res) => {
        await delete_user_service(req.params.user_id)
        return res.status(200).json(
            {message: "The user has been successfully deleted"}
        )
    }
}