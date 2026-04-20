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
        const user = await users_model.findById(userId)
        if (!user) {
            throw new ApiError("This user does not exist", 404)
        }
        return user
    }

    async emailExists(email) {
        const user = await users_model.findOne({ email })
        return !!user
    }

    async usernameExists(username) {
        const user = await users_model.findOne({ username })
        return !!user
    }

    async create(userData) {
        return await users_model.create(userData)
    }

    async update(userId, updateData) {
        await users_model.updateOne({ _id: userId }, updateData)
    }

    async delete(userId) {
        const result = await users_model.deleteOne({ _id: userId })
        if (result.deletedCount === 0) {
            throw new ApiError("This user does not exist", 404)
        }
    }
}
