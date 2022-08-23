import { BaseDataBase } from "./BaseDataBase";
import { User } from "../entities/User";
import connection from "../services/connection";

export default class UserDataBase{
    createUser = async (user:User)=>{
        try {
          const create = await connection("cookenu_users").insert({
                id:user.getId(),
                name:user.getName(),
                email:user.getEmail(),
                password:user.getPassword(),
                role:user.getRole()

            })
            return create
        
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }

    findUserByEmail = async (email:string):Promise<User> =>{
        try {
            const user1 = await connection("cookenu_users")
            .select("*")
            .where({email})
            return user1[0] && User.toUserModel(user1[0])
        } catch (error:any) {
            throw new Error(error.message || error. sqlMessage)
            
        }

    }

     getUser = async (id:string) => {
        try {
            const users = await connection("cookenu_users")
                .select("id", "name", "email", "role")
                .where({id})

            return users[0]
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    getUserID = async (id:string) =>{
        try{
            const result = await connection("cookenu_users")
            .select("*")
            .where({id})
            return result[0]
        }catch(error:any){
            throw new Error(error.message || error.sqlMessage)
        }
       
        
    }

}