export class IUserRepository {
    async findByUsername(username) {
        throw new Error('findByUsername() deve ser implementado')
    }

    async findByEmail(email) {
        throw new Error('findByEmail() deve ser implementado')
    }

    async findById(userId) {
        throw new Error('findById() deve ser implementado')
    }

    async emailExists(email) {
        throw new Error('emailExists() deve ser implementado')
    }

    async usernameExists(username) {
        throw new Error('usernameExists() deve ser implementado')
    }

    async create(userData) {
        throw new Error('create() deve ser implementado')
    }

    async update(userId, updateData) {
        throw new Error('update() deve ser implementado')
    }

    async delete(userId) {
        throw new Error('delete() deve ser implementado')
    }
}
