export class SuccessfulLoginServerResponse{
    public constructor(
        public id: number,
        public token?:number,       
        public userType?:string,
        public firstName? : string,
        public lastName? : string,
        public companyName? : string

    ){}

}