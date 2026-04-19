import { users_model } from "../models/users_model.js"
import { encrypt_password } from "./encryption.js"
import { ApiError } from "../exceptions.js"


export async function create_user({ username, email, password }){
    const [username_conflict, email_conflict] = await Promise.all([
        users_model.findOne({ username }),
        users_model.findOne({ email })
    ])

    if (username_conflict){
        throw new ApiError("this username is already in use", 409)
    }
    if (email_conflict){
        throw new ApiError("this email is already in use", 409)
    }

    const hashed_password = await encrypt_password(password)
    const user = await users_model.create({
        username,
        email,
        password: hashed_password
    })

    return user
}

export async function get_user_by_id(user_id){
    const user = await users_model.findById(user_id)
    if (!user){
        throw new ApiError("This user does not exist", 404)
    }
    return user
}

export async function update_user(user_id, payload){
    const user = await users_model.findById(user_id)
    if (!user){
        throw new ApiError("This user does not exist", 404)
    }

    const update_payload = { ...payload }

    if (update_payload.password){
        update_payload.password = await encrypt_password(update_payload.password)
    }

    await users_model.updateOne({ _id: user_id }, update_payload)
}

export async function delete_user(user_id){
    const result = await users_model.deleteOne({ _id: user_id })
    if (result.deletedCount === 0){
        throw new ApiError("This user does not exist", 404)
    }
}
