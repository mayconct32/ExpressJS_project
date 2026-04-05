import { compare, genSalt, hash as hash_password} from "bcryptjs"


export async function encrypt_password(password){
    const salt = await genSalt(10)
    const hash = await hash_password(password, salt)
    return hash
}

export async function verify_password(password, password_hash){
    return await compare(
        password, 
        password_hash
    )
}