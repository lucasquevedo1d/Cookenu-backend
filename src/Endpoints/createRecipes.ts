import { Request, Response } from "express";
import RecipesDataBase from "../data/RecipesDataBase";
import { CreateRecipes } from "../entities/CreateRecipes";
import { Authenticator} from "../services/Authenticator";
import { GeneratorId } from "../services/GeneratorId";


export const createRecipes = async (req:Request, res:Response) =>{
    try {
        const token = req.headers.authorization as string
        if(!token){
            res.status(422).send("Esse endpoint exige um autorização nos headers")
        }
        const {title, description} = req.body 
        if(!title || !description){
            res.status(400).send("Preencha os campos corretamente!")
        }
        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token)
        console.log(tokenData)
        
        if(!tokenData){
            res.status(404).send("Token invalido")
        }

        const IdGenerator = new GeneratorId()
        const id = IdGenerator.generator()

        const newRecipe = new CreateRecipes(id, title, description, tokenData.id)
        const recipeDB =  new RecipesDataBase() 
        await recipeDB.createRecipes(newRecipe)
        res.status(201).send("Receita criada com sucesso!")
    } catch (error:any) {
        res.status(400).send(error.message || error.sqlMessage)
    }
}