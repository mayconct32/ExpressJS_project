import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { UserRepository } from "../repositories/users_repository.js"
import { verify_password } from "./encryption.js"


dotenv.config({path: [".env", "../.env"]})

export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    coding_token = (payload) => {
        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {algorithm: process.env.ALGORITHM},
            {expiresIn: process.env.TOKEN_EXPIRATION_TIME}
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

    authenticate_credentials = async (username, password) => {
        const user = await this.userRepository.findByUsername(username)
        if (!user) {
            return
        }

        const is_valid_password = await verify_password(password, user.password)
        if (!is_valid_password) {
            return
        }

        return user
    }

    build_user_token_payload = (user) => {
        return {
            user_id: String(user._id),
            username: user.username,
            email: user.email
        }
    }

    get_token_from_authorization_header = (authorization_header) => {
        if (!authorization_header) {
            return
        }

        if (authorization_header.startsWith("Bearer ")) {
            return authorization_header.slice(7).trim()
        }

        return authorization_header
    }
}

export const authService = new AuthService(new UserRepository())

