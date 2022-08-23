export class CreateRecipes{
    constructor(
    protected id:string,
    protected title:string,
    protected descrption:string,
    protected user_Id:string
    )
    {}
    getId = () =>{
        return this.id
    }
    getTitle = () =>{
        return this.title
    }
    getDescrption = () =>{
        return this.descrption
    }
    getUserId = () =>{
        return this.user_Id
    }

    }