import { UserRepository } from "../repositories/users_repository.js"
import { encrypt_password } from "./encryption.js"
import { ApiError } from "../exceptions.js"


export class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    verify_credentials = async(username, email) => {
        const [userWithUsername, userWithEmail] = await Promise.all([
            this.userRepository.findByUsername(username),
            this.userRepository.findByEmail(email)
        ])
        if (userWithUsername) {
            throw new ApiError("this username is already in use", 409)
        }
        if (userWithEmail) {
            throw new ApiError("this email is already in use", 409)
        }

    }

    create_user = async ({ username, email, password }) => {
        await this.verify_credentials(username, email)

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
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new ApiError("This user does not exist", 404)
        }

        const update_payload = { ...payload }

        this.verify_credentials(update_payload.username, update_payload.email)

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
