import { Request, Response } from "express"
import RecipesDataBase from "../data/RecipesDataBase"
import { Authenticator} from "../services/Authenticator"


export const getRecipesId = async(req:Request, res:Response) =>{
    try {
        const id = req.params.id
        
        const userDB = new RecipesDataBase()
        const token = new Authenticator().getTokenData(req.headers.authorization as string)
        
        if(!token){
            res.status(400).send("Passe os dados no header corretamente!")
        }
        if(!id){
            res.status(400).send("Id não encontrado")
        }
    
        
        const user = await userDB.getRecipes(id)
        
            
        
        res.status(200).send({id:user.id, title:user.title, description:user.description, user_id:user.user_id})
       
    } catch (error:any) {
        res.status(404).send(error.message || error.sqlMessage)
        
    }
}