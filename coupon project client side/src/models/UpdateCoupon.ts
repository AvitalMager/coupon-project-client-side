export class UpdateCoupon{
    public constructor(
      
        public name? : string,
        public price? : number,
        public description? : string,
        public startDate? : Date,
        public endDate? : Date,
        public couponCategory? : string,
        public amount?: number,
        public id?: number,
        public companyId?: number
        
    ){}

}