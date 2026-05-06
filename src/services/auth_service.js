import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { UserRepository } from "../repositories/users_repository.js"
import { verify_password } from "./encryption.js"
import { ApiError } from "../exceptions.js"


dotenv.config({path: [".env", "../.env"]})

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    coding_token = (payload) => {
        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                algorithm: process.env.ALGORITHM,
                expiresIn: process.env.TOKEN_EXPIRATION_TIME
            }
        )
        return token
    }

    decode_token = (token) => {
        try {
            const user = jwt.verify(token, process.env.SECRET_KEY)
            return user
        } catch(err) {
            return
        }
    }

    create_token = async (username, password) => {
        const user = await this.userRepository.findByUsername(username)
        if (!user) {
            throw new ApiError("Invalid username or password", 403)
        }

        const is_valid_password = await verify_password(password, user.password)
        if (!is_valid_password) {
            throw new ApiError("Invalid username or passwordd", 403)
        }

        const payload = {
            user_id: user.id,
            username: user.username,
            email: user.email
        }

        const token = this.coding_token(payload)
        return token 
    }

    verify_permission = (token, user_id) => {
        if (!token) {
            throw new ApiError("Please log in", 401)
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim()
        }
        const current_user = this.decode_token(token)
        if (!current_user || user_id != current_user.user_id) {
            throw new ApiError("Unauthorized", 401)
        }
    }
}

export const authService = new AuthService(new UserRepository())