export class UserUpdateDto{
    public constructor(

      
        public userName?:string,
        public password?:string,
        public firstName?:string,   
        public lastName? : string,    
        public companyId? : number,
        public userType? : string,  
        public id?:number
        
    ){}

}