export class UsersController {
    Post(req, res){
        const pessoa = req.body
        res.status(201).json(pessoa)
    }
}