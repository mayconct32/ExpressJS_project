import { MongoMemoryServer } from "mongodb-memory-server";
import { mongodb_connection } from "../src/db_connection";
import { users_model } from "../src/models/users_model";
import mongoose from "mongoose";
import { authService } from "../src/services/auth_service";


let mongod

beforeAll(async () => 
    {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await mongodb_connection(uri)
    }
)

beforeEach(async () => {
    user1 = {
        username: "userexamplee",
        email: "userr@example.com",
        password: "test123123123"
    }
    user2 = {
        username: "userexample2",
        email: "user2@example.com",
        password: "test123123123"
    }
    response = await users_model.create([user1, user2])
    user = response[0]
    const user_token = authService.build_user_token_payload(user)
    token = authService.coding_token(user_token)
})

afterEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => 
    {
        await mongoose.connection.close()
        await mongod.stop();
    }
)