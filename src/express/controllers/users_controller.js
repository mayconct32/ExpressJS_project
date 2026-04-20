import { UsersService } from "../../services/users_service.js"


export class UsersController {
    constructor(usersService) {
        this.usersService = usersService
    }

    create_user = async (req, res) => {
        const user = await this.usersService.create_user(req.body)
        return res.status(201).json(
            {
                user_id: String(user._id),
                username: user.username,
                email: user.email
            }
        )
    }

    get_user = async (req, res) => {
        const user = await this.usersService.get_user_by_id(req.params.user_id)
        return res.status(200).json(
            {
                user_id: String(user._id),
                username: user.username,
                email: user.email
            }
        )
    }

    update_user = async (req, res) => {
        await this.usersService.update_user(req.params.user_id, req.body)
        return res.status(200).json(
            {message: "User has successfully updated"}
        )
    }

    delete_user = async (req, res) => {
        await this.usersService.delete_user(req.params.user_id)
        return res.status(200).json(
            {message: "The user has been successfully deleted"}
        )
    }
}