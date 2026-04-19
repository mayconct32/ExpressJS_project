import dotenv from "dotenv"
import jwt from "jsonwebtoken"


dotenv.config({path: [".env", "../.env"]})

export function coding_token(payload){
    const token = jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {algorithm: process.env.ALGORITHM},
        {expiresIn: process.env.TOKEN_EXPIRATION_TIME}
    )
    return token
}

export function decode_token(token){
    try{
        const user = jwt.verify(token, process.env.SECRET_KEY)
        return user
    } catch(err){
        return
    }
}

