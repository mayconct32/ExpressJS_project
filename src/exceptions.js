class ApiError extends Error{
    constructor(message, status_code){
        super(message)
        this.status_code = status_code
    }
}

class UserNotFoundError extends ApiError{
    constructor(message){
        super(message, 404)
    }
}

class ConflictingUserError extends ApiError{
    constructor(message){
        super(message, 409)
    }
}

class BadRequestError extends ApiError{
    constructor(message){
        super(message, 400)
    }
}


export default{
    ApiError,
    UserNotFoundError,
    ConflictingUserError,
    BadRequestError
}
