import { 
    decode_token,
    authenticate_credentials,
    build_user_token_payload,
    get_token_from_authorization_header
} from "../../services/auth_service.js"


export const verify_permission = (req, res, next) => {
    const token = get_token_from_authorization_header(req.headers.authorization)
    if (!token) {
        return res.status(401).json({message: "Please log in"})
    }
    const current_user = decode_token(token)
    if (!current_user || req.params.user_id != current_user.user_id){
        return res.status(401).json({message: "unauthorized"})
    }
    next()
}

export const verify_credentials = async (req, res, next) => {
    const { username, password } = req.body
    const user = await authenticate_credentials(username, password)
    if (!user){
        return res.status(403).json(
            {message: "Invalid username or password"}
        )
    }

    req.user_token_payload = build_user_token_payload(user)
    next()
}

