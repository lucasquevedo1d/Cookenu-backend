import { Request, Response } from "express"
import  UserDataBase  from "../data/UserDataBase"
import { User } from "../entities/User"
import { Authenticator } from "../services/Authenticator"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"

export const login = async (req:Request, res:Response) =>{
    try {
        const {email, password} = req.body

        if(!email || !password){
            res.status(400).send("Preencha todos os campos corretatmente!")   
        }

        if(password.length < 6){
            res.send("senha invalida!")
        }
        const userData = new UserDataBase()
        const user = await userData.findUserByEmail(email)
       
        const IdGenerator = new GeneratorId()
        const id = IdGenerator.generator()
        if(!user){
            res.status(409).send("Email não casdastrado")
        }
        const hash = new HashManager()
        const correctPassword = hash.compareHash(password, user.getPassword())
        if(!correctPassword){
            res.status(401).send("Email ou senha incorretos!")
        }
        const authenticator = new Authenticator()
        const token = authenticator.generate({id:user.getId(), role:user.getRole()})

        res.status(200).send({message:"Usuário logado com sucesso!", token})

        } catch (error:any) {
        res.status(400).send(error.message || error.sqlMessage)
        
    }
}