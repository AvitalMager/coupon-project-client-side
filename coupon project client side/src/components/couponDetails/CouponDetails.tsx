import React, { Component } from 'react'
import "./CouponDetails.css";
import axios from "axios";
import { CouponInfo } from '../../models/CouponInfo';
import { ChangeEvent } from 'react';
import { PurchaseDto } from '../../models/PurchaseDto';
import { store } from '../../redux/store';
import { Purchase } from '../../models/Purchase';



interface CouponState {
  coupon: CouponInfo;
  amount: number;
  purchases: Purchase[];
  showPopup: boolean;
}

export default class CouponDetails extends Component<any, CouponState> {

  constructor(props: any) {
    super(props);
    this.state = { coupon: null, amount: 1, purchases: [], showPopup: false };
  }

  public async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await axios.get<CouponInfo>("http://localhost:8080/coupon/" + id);
    this.setState({ coupon: response.data });
  }

  private setAmount = (args: ChangeEvent<HTMLInputElement>) => {
    // args = אובייקט המכיל מידע בנוגע לארוע שהתרחש
    // args.target = אובייקט המתאר את הרכיב שהעלה את הארוע
    // args.target.value = של הרכיב שהעלה את הארוע value-זהו מאפיין ה
    const amount = +args.target.value;
    this.setState({ amount });
  }

  private backToCoupons = () => {

    this.props.history.push("/customer")
  }

  private createPurchase = async () => {
    console.log("create purchase");

    try {
      const id = this.props.match.params.id;
      let purchaseDto = new PurchaseDto(this.state.amount, id); //object
      const response = await axios.post<Purchase[]>("http://localhost:8080/purchase", purchaseDto);
      this.setState({ showPopup: true })
      this.setState({ purchases: response.data })
      alert("Thanks");

    }
    catch (err) {
      console.log(err.response.data);
      alert(err.response.data.errorName);
    }
  }



  public render() {
    return (
      <div className="couponDetails">
        {
          this.state.coupon === null ||
          <p>Coupon Name: {this.state.coupon.name}<br />
            <br />
                        Price: {this.state.coupon.price}<br />
            <br />
                        Description: {this.state.coupon.description}<br />
            <br />
                        End Date: {this.state.coupon.endDate}<br />
            <br />
                        Start Date: {this.state.coupon.couponCategory}<br />
            <br />
                        Company Name: {this.state.coupon.companyName}<br />
          </p>

        }
        {sessionStorage.getItem("userType") == "CUSTOMER" &&
          <div className="purchaseInput">
            <input type="number" placeholder="amount" name="amount" onChange={this.setAmount} /><br />

            <input type="button" value="purchase" onClick={this.createPurchase} />

            {store.getState().isLoggedIn && store.getState().userInfo.userType === "COMPANY" && <input type="button" value="delete coupon" onClick={this.createPurchase} />}
          </div>}

        <div className="purchaseDetails">
        </div>

        {this.state.showPopup === true && <div className="popup">

          <p> Purchase confirmed </p>

          <input type="button" value="Close" onClick={this.backToCoupons} />
        </div>}

      </div>
    );
  }
}