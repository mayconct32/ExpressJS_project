import { UsersService } from "../../services/users_service.js"


export class UsersController {
    constructor(usersService) {
        this.usersService = usersService
    }

    create_user = async (req, res) => {
        const user = await this.usersService.create_user(req.body)
        return res.status(201).json(user)
    }

    get_user = async (req, res) => {
        const user = await this.usersService.get_user_by_id(req.params.user_id)
        return res.status(200).json(user)
    }

    update_user = async (req, res) => {
        const response = await this.usersService.update_user(req.params.user_id, req.body)
        return res.status(200).json(response)
    }

    delete_user = async (req, res) => {
        const response = await this.usersService.delete_user(req.params.user_id)
        return res.status(200).json(response)
    }
}