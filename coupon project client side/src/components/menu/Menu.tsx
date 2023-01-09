import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import "./Menu.css";



export default class Menu extends Component {

    constructor (prop : any){
        super(prop);
        this.state = {
            // isLoggedIn : store.getState().isLoggedIn,
            // userType: store.getState().userInfo.userType
        }
        // Every change in the store's state, will cause a call to the callback
        // method, supplied in the subscribe method
        // No need to relate to the unsubsribe method, returned by subscribe()
        // because menu isn't dynamic, and will always be displayed

        store.subscribe(() => this.setState(

        
            {coupons: store.getState().coupons},
            

        )
        );
    }

    public logout = async () => {

        store.dispatch({type : ActionType.Logout});
        await axios.post("http://localhost:8080/user/logout", axios.defaults.headers.common['Authorization'])
        sessionStorage.clear();
        
    }


    public render() {
        return (
            
            <div className="menu">
            <NavLink to="/home" exact>Home</NavLink>
            <span>  </span>
            {store.getState().isLoggedIn && store.getState().userInfo.userType === "CUSTOMER" &&<NavLink to="/customer" exact>Coupons </NavLink>}
            <span>  </span>
            {store.getState().isLoggedIn && store.getState().userInfo.userType === "CUSTOMER" &&<NavLink to="/purchase" exact>Purchases </NavLink>}
            <span>  </span>
            {store.getState().isLoggedIn && <NavLink to="/personal" exact>Account</NavLink>}
            <span>  </span>
            {store.getState().isLoggedIn && store.getState().userInfo.userType === "COMPANY" && <NavLink to="/companyInfo" exact>Company Account</NavLink>}
            {store.getState().isLoggedIn && store.getState().userInfo.userType === "COMPANY" && <NavLink to="/companyCoupon" exact>Create Coupon</NavLink>}
            {store.getState().isLoggedIn && store.getState().userInfo.userType === "COMPANY" && <NavLink to="/ourCoupons" exact>Coupons</NavLink>}
            {store.getState().isLoggedIn && store.getState().userInfo.userType === "ADMIN" && <NavLink to="/companyAdmin" exact>Company</NavLink>}
            {store.getState().isLoggedIn && store.getState().userInfo.userType === "ADMIN" && <NavLink to="/userAdmin" exact>User</NavLink>}
            {store.getState().isLoggedIn && <NavLink className="menuLink" to="/home" onClick={this.logout} exact> Log out</NavLink>}
        </div>
        
        
        
        );
    }
  }
