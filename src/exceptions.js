export class ApiError extends Error{
    constructor(message, status_code){
        super(message)
        this.status_code = status_code
    }
}

export class AuthenticationError extends ApiError{
    constructor(message){
        super(message, 401)
    }
}
