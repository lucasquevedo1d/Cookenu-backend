import { Request, Response } from "express"
import UserDataBase from "../data/UserDataBase"
import { Authenticator} from "../services/Authenticator"


export const getUserId = async(req:Request, res:Response):Promise<void> =>{
    try {
        const token = new Authenticator().getTokenData(req.headers.authorization as string)
        if(!token){
            res.status(400).send("Passe os dados no header corretamente!")
        }
        const id = req.params.id



        const userDB = new UserDataBase()
        const user = await userDB.getUserID(token.id)

        if(!user){
            throw new Error("Token invalido!")
        }

        res.status(200).send({id:user.id, name:user.name, email:user.email})
    } catch (error:any) {
        res.status(404).send(error.message || error.sqlMessage)
        
    }
}