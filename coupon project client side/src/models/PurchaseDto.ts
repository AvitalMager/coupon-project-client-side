export class PurchaseDto{
    public constructor(
        
        public amount:number,
        public couponId : number,
        public userId? : number,
        public timeOfPurchase? : Date,
        public id?:number
    ){}

}




