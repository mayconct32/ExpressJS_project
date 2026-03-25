import mongoose from "mongoose"


const schema = mongoose.Schema

const object_id = schema.ObjectId

const users_schema = new schema({
    id: object_id,
    username: String,
    email: String,
    password: String
});

export const users_model = mongoose.model("users",users_schema)