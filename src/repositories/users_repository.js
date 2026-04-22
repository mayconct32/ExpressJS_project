import { users_model } from "../models/users_model.js"
import { ApiError } from "../exceptions.js"
import { IUserRepository } from "../interfaces/IUserRepository.js"


export class UserRepository extends IUserRepository {
    async findByUsername(username) {
        return await users_model.findOne({ username })
    }

    async findByEmail(email) {
        return await users_model.findOne({ email })
    }

    async findById(userId) {
        return await users_model.findById(userId)
    }

    async create(userData) {
        return await users_model.create(userData)
    }

    async update(userId, updateData) {
        return await users_model.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        )
    }

    async delete(userId) {
        return await users_model.deleteOne({ _id: userId })
    }
}
