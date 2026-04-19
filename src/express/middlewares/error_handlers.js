import { validationResult } from "express-validator";
import { ApiError } from "../../exceptions.js"


export const validation_handler = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    next()
}

export const exception_handler = (error, req, res, next) => {
    if (error instanceof SyntaxError){
        return res.status(400).json({message: "Badly formatted JSON"})
    }
    if (error instanceof ApiError){
        return res.status(error.status_code).json({message: error.message})
    }
    if (typeof error?.status_code === "number"){
        return res.status(error.status_code).json({message: error.message})
    }
    console.log(error)
    return res.status(500).json({message: "Sorry, internal server error"})
}
