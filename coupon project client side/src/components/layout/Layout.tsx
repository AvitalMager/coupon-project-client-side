import React, { Component } from 'react'
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Login from '../login/Login';
import Menu from '../menu/Menu';
import "./Layout.css";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import About from '../usersPesonalInfo/PersonalInfo';
import Customer from '../customer/Customer';
import SignUp from '../signIn/SignUp';
import CouponDetails from '../couponDetails/CouponDetails';
import Purchases from '../purchases/Purchases';
import CompanyInfo from '../companyInfo/CompanyInfo';
import CompanyCoupon from '../companyCreateCoupon/CompanyCreateCoupon';
import GetCompanyCoupons from '../getCompanyCoupons/GetCompanyCoupons';
import CompanyUpdateCoupon from '../companyUpdateCoupon/CompanyUpdateCoupon';
import AdminCompanyCreate from '../adminCompanyCreate/AdminCompanyCreate';
import AdminUserCreateDelete from '../adminUserCreateDelete/AdminUserCreateDelete';
import AdminGetUsers from '../adminGetUsers/AdminGetUsers';
import AdminGetCompanies from '../adminGetCompanies/AdminGetCompanies';

export default class Layout extends Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="layout">
          <header>
            <Header />
          </header>
          <aside>
            <Menu />
          </aside>

          <main>
            <Switch>
              <Route path="/personal" component={About} exact />
              <Route path="/home" component={Login} exact />
              <Route path="/customer" component={Customer} exact /> 
              <Route path="/purchase" component={Purchases} exact />
              <Route path="/register" component={SignUp} exact /> 
              <Route path="/coupon/:id" component={CouponDetails} exact /> 
              <Route path="/companyInfo" component={CompanyInfo} exact />
              <Route path="/companyCoupon" component={CompanyCoupon} exact />
              <Route path="/ourCoupons" component={GetCompanyCoupons} exact />
              <Route path="/updateCoupon/:id" component={CompanyUpdateCoupon} exact />
              <Route path="/companyAdmin" component={AdminCompanyCreate} exact />
              <Route path="/userAdmin" component={AdminUserCreateDelete} exact />
              <Route path="/getUsersAdmin" component={AdminGetUsers} exact />
              <Route path="/getCompaniesAdmin" component={AdminGetCompanies} exact />
              <Redirect from="/" to="/home" exact />  
            
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}
