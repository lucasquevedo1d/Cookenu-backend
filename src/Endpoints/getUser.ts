import { Request, Response } from "express"
import UserDataBase from "../data/UserDataBase"
import { Authenticator, AuthenticatorData } from "../services/Authenticator"


export const getUser = async(req:Request, res:Response):Promise<void> =>{
    try {
        const token = new Authenticator().getTokenData(req.headers.authorization as string)
        if(!token){
            res.status(400).send("Passe os dados no header corretamente!")
        }
        const userDB = new UserDataBase()

        const user = await userDB.getUser(token.id)

        if(!user){
            throw new Error("Token invalido!")
        }

        res.status(200).send({id:user.id, name:user.name, email:user.email})
    } catch (error:any) {
        res.status(404).send(error.message || error.sqlMessage)
        
    }
}