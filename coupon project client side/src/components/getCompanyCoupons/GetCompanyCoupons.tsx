import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Coupon } from "../../models/Coupon";
import { GetCompanyCouponsModel } from "../../models/GetCompanyCouponModel";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import "./GetCompanyCoupons.css";


interface GetCompanyCouponsState {

    companyCoupons: GetCompanyCouponsModel[];
    filterSearchByName: string;


}
export default class GetCompanyCoupons extends Component<any, GetCompanyCouponsState>{

    constructor(props: any) {
        super(props);


        // Initializing the state object
        this.state = {

            companyCoupons: [],
            filterSearchByName: ""

        };
        store.subscribe(() => this.setState(
            {
                companyCoupons: store.getState().companyCoupons
            })
        )
    }

    // componentDidMount = ngOnInit in angular (a reserved word)
    public async componentDidMount() {
        const response = await axios.get<GetCompanyCouponsModel[]>("http://localhost:8080/coupon/getAllCouponsByCompanyId");
        store.dispatch({ type: ActionType.GetAllCompanyCoupons, payload: response.data })
        console.log(response.data);

        // response.data = all the coupons that were returned from the server
        this.setState({ companyCoupons: response.data });
    }

    private async deleteCoupon(id: number) {
        try {
            await axios.delete("http://localhost:8080/coupon/" + id);
            store.dispatch({ type: ActionType.DeleteCoupon, payload: id });
            alert("The coupon has benn deleted ");
        }

        catch (err) {
            console.log(err.response.data);
            alert(err.response.data.errorName);
        }
    }

    public filterSearchByNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        console.log(text);
        this.setState({ filterSearchByName: text });
    }

    public render() {
        return (
            <div className="companyCoupons">

                    <label htmlFor="name">Search By Name:</label>
                    <input id="name" type="text" onChange={this.filterSearchByNamePipe} /><br /><br />

                <table className="companyCouponsTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Coupon Category</th>
                            <th>Amount</th>
                            <th>Delete Coupon</th>
                            <th>Update Coupon</th>


                        </tr>
                    </thead>
                    <tbody>
                        
                           {this.state.companyCoupons.filter(companyCoupons => {
                            if (this.state.filterSearchByName === "") {
                                return true;
                            }

                            return companyCoupons.name.toLowerCase().includes(this.state.filterSearchByName.toLowerCase())
                        }

                        ).map(coupon =>

                                <tr key={coupon.id}>
                                    <td>{coupon.id}</td>
                                    <td>{coupon.name}</td>
                                    <td>{coupon.price}</td>
                                    <td>{coupon.description}</td>
                                    <td>{coupon.startDate}</td>
                                    <td>{coupon.endDate}</td>
                                    <td>{coupon.couponCategory}</td>
                                    <td>{coupon.amount}</td>

                                    <td>{<button type="button" className="deleteCoupon" onClick={() => this.deleteCoupon(coupon.id)} >Delete Coupon</button>}</td>

                                    <td>{<NavLink className="button2" to={"/updateCoupon/" + coupon.id} exact  >Update Coupon</NavLink>}</td>

                                </tr>
                            )
                        }

                    </tbody>
                </table>
                <br/>
                <br/>
                <br/>
            </div>

        );
    }
}