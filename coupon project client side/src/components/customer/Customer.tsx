import axios from "axios";
import React from "react";
import { Component } from "react";
import { Unsubscribe } from "redux";
import { Coupon } from "../../models/Coupon";
import CouponCard from "../couponCard/CouponCard";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import "./Customer.css";

interface CouponsState {
    coupons: Coupon[];
    filterSearchByName: string;
    filterSearchByCompanyName: string;
    filterSearchByCategory: string;
    filterSearchByMaxPrice: number;


}
export default class Coupons extends Component<any, CouponsState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);

        // Initializing the coupons variables (soon to be shoved into the state object)
        // let coupons = new Array<Coupon>();

        // Initializing the state object
        this.state = {
            coupons: [],
            filterSearchByName: "",
            filterSearchByCompanyName: "",
            filterSearchByCategory: "All",
            filterSearchByMaxPrice: 0
        };

        // subscribe() calls setState() <-- no parameter
        // the store coupons' data acts as a parameter
        // Bottom line - the callback is being called AFTER the store's state
        // changes (after the reduce function returns its value)
        this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
                {
                    coupons: store.getState().coupons
                })
        );
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    // componentDidMount = ngOnInit in angular (a reserved word)
    public async componentDidMount() {
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupon");

        console.log(response.data);

        store.dispatch({ type: ActionType.GetAllCoupons, payload: response.data });

        // response.data = all the coupons that were returned from the server
        this.setState({ coupons: response.data });
    }

    public filterSearchByNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        console.log(text);
        this.setState({ filterSearchByName: text });
    }

    public filterSearchByCompanyNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        console.log(text);
        this.setState({ filterSearchByCompanyName: text });
    }

    public filterSearchByMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        let number = +event.target.value;
        console.log(number);
        this.setState({ filterSearchByMaxPrice: number });
    }

    public filterSearchByCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let text = event.target.value;
        console.log(text);
        this.setState({ filterSearchByCategory: text });
    }

    public render() {
        return (
            <div className="customer">
                {store.getState().isLoggedIn && <div>
                    <div className="search">

                        <label htmlFor="name">Search By Name:</label>
                        <input id="name" type="text" onChange={this.filterSearchByNamePipe} /><br /><br />

                        <label htmlFor="companyName">Company Name:</label>
                        <input id="companyName" type="text" onChange={this.filterSearchByCompanyNamePipe} /><br /><br />

                        <label htmlFor="price"> Search by MAX Price:</label>
                        <input id="price" type="number" onChange={this.filterSearchByMaxPrice} /><br /><br />


                        <label htmlFor="category"> Category:</label>
                        <select id="category" onChange={this.filterSearchByCategory}>
                            <option value="All">All</option>
                            <option value="FoodAndDrink">FoodAndDrink</option>
                            <option value="Beauty">Beauty</option>
                            <option value="HealthAndFitness">HealthAndFitness</option>
                            <option value="Travel">Travel</option>
                            <option value="Goods">Goods</option>
                        </select>
                    </div>


                    <div className="coupons">{<ol>

                        {this.state.coupons.filter(coupon => {
                            if (this.state.filterSearchByName === "") {
                                return true;
                            }

                            return coupon.couponName.toLowerCase().includes(this.state.filterSearchByName.toLowerCase())
                        }

                        ).filter(coupon => {
                            if (this.state.filterSearchByCompanyName === "") {
                                return true;
                            }
                            return coupon.companyName.toLowerCase().includes(this.state.filterSearchByCompanyName.toLowerCase())
                        }

                        ).filter(coupon => {
                            if (this.state.filterSearchByCategory === "All") {
                                return true;
                            }
                            return coupon.couponCategory.includes(this.state.filterSearchByCategory)
                        }
                        ).filter(coupon => {
                            if (this.state.filterSearchByMaxPrice === 0) {
                                return true;
                            }
                            return coupon.price <= (this.state.filterSearchByMaxPrice)
                        }
                        )
                            .map(coupon =>
                                <CouponCard key={coupon.id} history={this.props.history} coupon={coupon} />

                            )}
                    </ol>}
                    </div>

                </div>}


            </div>

        );
    }
}
