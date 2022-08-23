export enum USER_ROLES {
    NORMAL_USER="NORMAL",
    ADMIN_USER="ADMIN"
}

export class User {
    constructor(
        private id: string,
        private email: string,
        private name: string,
        private password: string,
        private role:USER_ROLES

    ) { }
    static toUserModel = (data: any): User => {
        return new User(data.id, data.email, data.name, data.password, data.role.USER_ROLES)
    }

    getId = () => {
        return this.id
    }
    
    getEmail = () => {
        return this.email
    }
    
    getName= () => {
        return this.name
    }
    
    getPassword= () => {
        return this.password
    }
    getRole = () =>{
        return this.role
    }
}

