import { validationResult } from "express-validator";


export const validation_handler = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()){
        return res.status(400).json({message: error})
    }
    next()
}

export const exception_handler = (error, req, res, next) => {
    if (error instanceof SyntaxError){
        return res.status(400).json({message: "Badly formatted JSON"})
    }
    try{
        return res.status(error.status_code).json({message: error.message})
    } catch (err) {
        console.log(error)
        return res.status(500).json({message: "Sorry, internal server error"})
    }
}
