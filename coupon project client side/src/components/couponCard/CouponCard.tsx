import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Coupon } from '../../models/Coupon';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import "./CouponCard.css"

interface iCouponProps {
    //shows what I want to see in this component
    coupon: Coupon,
    history: any

}

export default class CouponCard extends Component<iCouponProps> {
    //regular c-tor
    constructor(props: iCouponProps) {
        super(props);

    }

    private openCoupon = () => {

        this.props.history.push("/coupon/" + this.props.coupon.id)
    }

    public render() {

        return (

            <div className="details" onClick={this.openCoupon}>
                <img src="1597490497blobid0.png" alt="Avatar" width="100%" />
                <br />
                <br />
                <h1>SALE!!!</h1>

                <h3 className="couponTitle">
                    {this.props.coupon.couponName}
                </h3>
                <br />

                Price:  {this.props.coupon.price}₪

                <br />
                Category: {this.props.coupon.couponCategory}

                <br />
                End Date:{this.props.coupon.endDate}

            </div>
        );

    }
}


