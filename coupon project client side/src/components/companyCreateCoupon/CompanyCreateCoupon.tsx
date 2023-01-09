import axios from "axios";
import { ChangeEvent, Component } from "react";
import { CreateCoupon } from "../../models/CreateCoupon";
import 'react-calendar/dist/Calendar.css';
import "./CompanyCreateCoupon.css"



interface CreateCouponState {

  name: string,
  price: number,
  description: string,
  startDate: Date,
  endDate: Date,
  couponCategory: string,
  amount: number,
  companyId: number

}

export default class CompanyCoupon extends Component<any, CreateCouponState>{
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
      companyId: undefined

    };
  }


  private createCoupon = async () => {

    try {
      let createCoupon = new CreateCoupon(this.state.name, this.state.price, this.state.description, this.state.startDate, this.state.endDate, this.state.couponCategory, this.state.amount);
      await axios.post("http://localhost:8080/coupon", createCoupon);
      alert("New Coupon! ");
      
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

      <div className="createCoupon">
        <h1>Create Coupon</h1>

        <input type="text" placeholder="Coupon Name" className="name" required onChange={this.setName} />
        <br />
        <input type="number" placeholder="Price" className="price" required onChange={this.setPrice} />
        <br />
        <input type="text" placeholder="Description" className="description" required onChange={this.setDescription} />
        <br />Start Date<br />
        <input type="Date" placeholder="Start Date" onChange={this.setStartDate} />
        <br />End Date<br />
        <input type="Date" placeholder="End Date" onChange={this.setEndtDate} />
        <br />
        <input type="number" placeholder="Amount" className="Amount" onChange={this.setAmount} />
        <br />
        <select placeholder="Coupon Category" onChange={this.setCouponCategoty}>
          <option value="FoodAndDrink">FoodAndDrink</option>
          <option value="Beauty">Beauty</option>
          <option value="HealthAndFitness">HealthAndFitness</option>
          <option value="Travel">Travel</option>
          <option value="Goods">Goods</option>
        </select>

        <br />
        <button type="submit" className="createCoupon" onClick={this.createCoupon} >Create</button>



      </div>

    )
  }
}