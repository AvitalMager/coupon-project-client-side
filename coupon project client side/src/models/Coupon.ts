export class Coupon{
    public constructor(
        public id?:number,
        public couponName?:string,
        public description?:string,
        public price?:number,   
        public couponCategory? : string,
        public companyName? : string, //have changed 10.3  
        public endDate? : Date  
    ){}

}