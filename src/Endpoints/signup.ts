import { Request, Response } from "express"
import  UserDataBase  from "../data/UserDataBase"
import { User } from "../entities/User"
import { Authenticator } from "../services/Authenticator"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"

export const signup = async (req:Request, res:Response) =>{
    try {
        const {email, name, password, role} = req.body

        if(!email || !name || !password){
            res.status(400).send("Preencha todos os campos corretatmente!")   
        }

        if(password.length < 6){
            res.send("senha invalida!")
        }
        const userData = new UserDataBase()
        const user = await userData.findUserByEmail(email)
        if(email === user){
            res.status(409).send("Email já cadastrado")
        }
        const IdGenerator = new GeneratorId()
        const id = IdGenerator.generator()

        const hash = new HashManager()
        const pass = hash.createHash(password)

        const newUser = new User(id, email, name, pass, role)
        const userDB = new UserDataBase()
        await userDB.createUser(newUser)
        
        
        const authenticator = new Authenticator()
        const token = authenticator.generate({id, role})

        res.status(200).send({message:"Usuário criado com sucesso!", token})

        } catch (error:any) {
        res.status(400).send(error.message || error.sqlMessage)
        
    }
}