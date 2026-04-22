export class IUserRepository {
    
    async findByUsername(username) {
        throw new Error('findByUsername() should be implemented')
    }

    async findByEmail(email) {
        throw new Error('findByEmail() should be implemented')
    }

    async findById(userId) {
        throw new Error('findById() should be implemented')
    }

    async create(userData) {
        throw new Error('create() should be implemented')
    }

    async update(userId, updateData) {
        throw new Error('update() should be implemented')
    }

    async delete(userId) {
        throw new Error('delete() should be implemented')
    }
}
