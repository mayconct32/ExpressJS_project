import mongoose from "mongoose"


const schema = mongoose.Schema

const users_schema = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const users_model = mongoose.model("users", users_schema)