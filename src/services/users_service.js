import { UserRepository } from "../repositories/users_repository.js"
import { encrypt_password } from "./encryption.js"
import { ApiError } from "../exceptions.js"


export class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    create_user = async ({ username, email, password }) => {
        const [username_conflict, email_conflict] = await Promise.all([
            this.userRepository.usernameExists(username),
            this.userRepository.emailExists(email)
        ])

        if (username_conflict) {
            throw new ApiError("this username is already in use", 409)
        }
        if (email_conflict) {
            throw new ApiError("this email is already in use", 409)
        }

        const hashed_password = await encrypt_password(password)
        const user = await this.userRepository.create({
            username,
            email,
            password: hashed_password
        })

        return user
    }

    get_user_by_id = async (user_id) => {
        return await this.userRepository.findById(user_id)
    }

    update_user = async (user_id, payload) => {
        await this.userRepository.findById(user_id)

        const update_payload = { ...payload }

        if (update_payload.password) {
            update_payload.password = await encrypt_password(update_payload.password)
        }

        await this.userRepository.update(user_id, update_payload)
    }

    delete_user = async (user_id) => {
        await this.userRepository.delete(user_id)
    }
}

export const usersService = new UsersService(new UserRepository())
