import axios from "axios";
import { ChangeEvent, Component } from "react";
import { GetCompanyCouponsModel } from "../../models/GetCompanyCouponModel";
import { UpdateCoupon } from "../../models/UpdateCoupon";
import { store } from "../../redux/store";
import "./CompanyUpdateCoupon.css";

interface UpdateCouponState {

    name: string,
    price: number,
    description: string,
    startDate: Date,
    endDate: Date,
    couponCategory: string,
    amount: number,
    companyId: number,
    companyCoupon: GetCompanyCouponsModel;
  
  }
  
  export default class CompanyCoupon extends Component <any, UpdateCouponState>{
    constructor(props: any) {
      super(props);
      this.state = {
        name: "",
        price: 0,
        description: "",
        startDate: new Date('1995-06-17T03:24:00'),
        endDate: new Date('1995-06-17T03:24:00'),
        couponCategory: "FoodAndDrink",
        amount: 1,
        companyId: undefined,
        companyCoupon : null
  
      };
    }
  
    public async componentDidMount() {
      const id = this.props.match.params.id;
      const response = await axios.get<GetCompanyCouponsModel>("http://localhost:8080/coupon/" + id);

      // response.data = all the coupons that were returned from the server
      this.setState({ companyCoupon: response.data });
  }
  
    private updateCoupon = async () => {
  
      try {
         const id = this.props.match.params.id;
        let updateCoupon = new UpdateCoupon(this.state.name, this.state.price, this.state.description, this.state.startDate, this.state.endDate, this.state.couponCategory, this.state.amount, id);
        await axios.put("http://localhost:8080/coupon", updateCoupon);
  
        alert("Coupon was updated successfully! ");
      }
      catch (err) {
        console.log(err.response.data);
        alert( err.response.data.errorName);
      }
    }
  
    private setName = (args: ChangeEvent<HTMLInputElement>) => {
      const name = args.target.value;
      this.setState({ name });
    }
  
    private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
      const price = +args.target.value;
      this.setState({ price });
    }
  
    private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
      const description = args.target.value;
      this.setState({ description });
    }
  
    private setStartDate = (event: ChangeEvent<HTMLInputElement>) => {
      const startDate = new Date(event.target.value)
      this.setState({ startDate });
    }
  
    private setEndtDate = (event: ChangeEvent<HTMLInputElement>) => {
      const endDate = new Date(event.target.value)
      this.setState({ endDate });
    }
  
    private setCouponCategoty = (args: ChangeEvent<HTMLSelectElement>) => {
      const couponCategory = args.target.value;
      this.setState({ couponCategory });
    }
  
    private setAmount = (args: ChangeEvent<HTMLInputElement>) => {
      const amount = +args.target.value;
      this.setState({ amount });
    }
  
    public render() {
      return (
  
        <div className="updateCoupon">
          {this.state.companyCoupon !== null && <div> <h1>Update Coupon</h1>
  
  <div>Name Before Update : {this.state.companyCoupon.name}</div>
  <input type="text" className="name" onChange={this.setName} />
  <br />
  <br />
  <div>Price Before Update : {this.state.companyCoupon.price}</div>
  <input type="number" placeholder="Price" className="price" onChange={this.setPrice} />
  <br />
  <br />
  <div>Description Before Update : {this.state.companyCoupon.description}</div>
  <input type="text" className="description" onChange={this.setDescription} />
  <br />
  <br />Start Date Before Update : {this.state.companyCoupon.startDate}<br />
  <input type="Date" placeholder="Start Date" onChange={this.setStartDate}/>
  <br />
  <br />End Date Before Update : {this.state.companyCoupon.endDate}<br />
  <input type="Date" placeholder="End Date" onChange={this.setEndtDate}/>
  <br />
  <br />
  <div>Amount Before Update : {this.state.companyCoupon.amount}</div>
  <input type="number" placeholder="Amount" className="Amount" onChange={this.setAmount} />
  <br />
  <br />
  <div>Category Before Update : {this.state.companyCoupon.couponCategory}</div>
  <select onChange = {this.setCouponCategoty}>
                  <option value="FoodAndDrink">FoodAndDrink</option>
                  <option value="Beauty">Beauty</option>
                  <option value="HealthAndFitness">HealthAndFitness</option>
                  <option value="Travel">Travel</option>
                  <option value="Goods">Goods</option>
              </select>
  <br />
  <br />
  <button type="submit" className="createCoupon" onClick={this.updateCoupon} >Update</button>
  <br />
  <br />
</div>}
         
        </div>
  
      )
    }
  }