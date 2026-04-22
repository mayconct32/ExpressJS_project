import { UserRepository } from "../repositories/users_repository.js"
import { encrypt_password, verify_password } from "./encryption.js"
import { ApiError } from "../exceptions.js"


export class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    verify_credentials = async (username, email) => {
        if (username){
            const existing_by_username = await this.userRepository.findByUsername(username)
            if (existing_by_username) {
                throw new ApiError("This username is already in use", 409)
            }
        }
        
        if (email){
            const existing_by_email = await this.userRepository.findByEmail(email)
            if (existing_by_email) {
                throw new ApiError("This email is already in use", 409)
            }
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

        return {
            user_id: String(user._id),
            username: user.username,
            email: user.email
        }
    }

    get_user_by_id = async (user_id) => {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new ApiError("This user does not exist", 404)
        }

        return {
            user_id: String(user._id),
            username: user.username,
            email: user.email
        }
    }

    update_user = async (user_id, payload) => {
        const current_user = await this.userRepository.findById(user_id)
        
        if (!current_user) {
            throw new ApiError("This user does not exist", 404)
        }

        const update_payload = {}

        if (current_user.username !== payload.username) {
            update_payload.username = payload.username
        }

        if (current_user.email !== payload.email) {
            update_payload.email = payload.email
        }

        if (update_payload.username || update_payload.email) {
            await this.verify_credentials(
                update_payload.username,
                update_payload.email
            )
        }

        const is_same_password = await verify_password(payload.password, current_user.password)
        if (!is_same_password) {
            update_payload.password = await encrypt_password(payload.password)
        }

        if (Object.keys(update_payload).length > 0) {
            const updated_user = await this.userRepository.update(user_id, update_payload)
        }

        return {
            message: "The user has been successfully updated."
        }
    }

    delete_user = async (user_id) => {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new ApiError("This user does not exist", 404)
        }

        const result = await this.userRepository.delete(user_id)

        return {
            message: "The user has been successfully deleted"
        }
    }
}

export const usersService = new UsersService(new UserRepository())
