import GetCompanyCoupons from "../components/getCompanyCoupons/GetCompanyCoupons";
import { Coupon } from "../models/Coupon";
import { GetCompanyCouponsModel } from "../models/GetCompanyCouponModel";
import { Purchase } from "../models/Purchase";
import { UserInfo } from "../models/UserInfo";


export class AppState {
    public coupons: Coupon[] = [];
    public isLoggedIn: boolean = false;
    public purchases: Purchase[] = [];
    public userInfo : UserInfo = null;
    public companyCoupons: GetCompanyCouponsModel[] =[];
    
}