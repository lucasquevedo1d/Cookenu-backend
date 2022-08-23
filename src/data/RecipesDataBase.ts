import { CreateRecipes } from "../entities/CreateRecipes";
import connection from "../services/connection";

export default class RecipesDataBase{
    createRecipes = async (recipe:CreateRecipes)=>{
        try {
            const createRecipeDB = await connection("cookenu_recipe").insert({
                id:recipe.getId(),
                title:recipe.getTitle(),
                description:recipe.getDescrption(),
                user_Id:recipe.getUserId()
             })
            
            return createRecipeDB
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
            
        }
    }
    getRecipes = async (id:string):Promise<any>=>{
        try {
            const result = await connection("cookenu_recipe")
            .select("*")
            .where({id})
            return result[0]
            
        } catch (error:any) {
           throw new Error(error.message || error.sqlMessage);
           
            
        }
    }
}