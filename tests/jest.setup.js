import { MongoMemoryServer } from "mongodb-memory-server"
import { mongodb_connection } from "../src/db_connection"
import { users_model } from "../src/models/users_model"
import mongoose from "mongoose"
import { authService } from "../src/services/auth_service"
import { response } from "express"
import request from "supertest"
import { app } from "../src/express/app"
import { encrypt_password } from "../src/services/encryption"


let mongod

beforeAll(async () => 
    {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await mongodb_connection(uri)
    }
)

beforeEach(async () => 
    {
        user1 = {
            username: "userexamplee",
            email: "userr@example.com",
            password: await encrypt_password("test123123123")
        }
        user2 = {
            username: "userexample2",
            email: "user2@example.com",
            password: "test123123123"
        }
        const response = await users_model.create([user1, user2])
        user = response[0]
        fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjlmNjZkN2EwYWNhMzI1YzAyMzBkMDdiIiwidXNlcm5hbWUiOiJtYXljb25sb2JvIiwiZW1haWwiOiJtYXljb25AZ21haWwuY29tIn0._3GV1cJQXyYub0DIdNcbYP3Z2rntwKqA2X0R5ArmYbk"
        token = await authService.create_token(user.username, "test123123123")
    }
)

afterEach(async () => 
    {
        const collections = await mongoose.connection.db.collections()
        for (const collection of collections) {
            await collection.deleteMany({})
        }
    }
)

afterAll(async () => 
    {
        await mongoose.connection.close()
        await mongod.stop();
    }
)