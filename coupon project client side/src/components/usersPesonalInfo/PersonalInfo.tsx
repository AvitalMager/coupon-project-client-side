import axios from 'axios';
import React, { Component } from 'react'
import { ChangeEvent } from 'react';
import { Unsubscribe } from 'redux';
import { UserDto } from '../../models/UserDto';
import { UserInfo } from '../../models/UserInfo';
import { UserUpdateDto } from '../../models/UserUpdateDto';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import "./PersonalInfo.css"

interface PersonalInfoState {
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  user: UserInfo;

}


export default class PersonalInfo extends Component<any, PersonalInfoState>{

  constructor(props: any) {
    super(props);

    // Initializing the state object
    this.state = {

      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      user: null

    };
  }

  public async componentDidMount() {

    const response = await axios.get<UserInfo>("http://localhost:8080/user/getUserById");
    this.setState({ user: response.data });
  }

  private updateUser = async () => {
    try {

      let userDto = new UserUpdateDto(this.state.userName, this.state.password, this.state.firstName, this.state.lastName); //object
      await axios.put("http://localhost:8080/user", userDto);
      alert("personal information was updated successfully");
      this.props.history.push('/home');

      if (sessionStorage.getItem("userType") === "ADMIN") {
        this.props.history.push('/getUsersAdmin')
      }
      else if (sessionStorage.getItem("userType") === "CUSTOMER") {
        this.props.history.push('/customer')
      }
      else {
        this.props.history.push('/ourCoupons')
      }
    }

    catch (err) {
       console.log(err.response.data);
      alert( err.response.data.errorName);
    }
  }

  private deleteUser = async () => {
    try {

      const response = await axios.delete("http://localhost:8080/user/" + store.getState().userInfo.id);
      console.log(response);
      store.dispatch({ type: ActionType.Logout });
      sessionStorage.clear();
      alert("We will wait until you come back");
      this.props.history.push('/home');
    }

    catch (err) {
      console.log(err.response.data);
      alert( err.response.data.errorName);
    }
  }

  private setFirstName = (args: ChangeEvent<HTMLInputElement>) => {
    // args = אובייקט המכיל מידע בנוגע לארוע שהתרחש
    // args.target = אובייקט המתאר את הרכיב שהעלה את הארוע
    // args.target.value = של הרכיב שהעלה את הארוע value-זהו מאפיין ה
    const firstName = args.target.value;
    this.setState({ firstName });
  }

  private setLastName = (args: ChangeEvent<HTMLInputElement>) => { //button function
    const lastName = args.target.value;
    this.setState({ lastName });
  }

  private setUserName = (args: ChangeEvent<HTMLInputElement>) => { //button function
    const userName = args.target.value;
    this.setState({ userName });
  }

  private setPassword = (args: ChangeEvent<HTMLInputElement>) => { //button function
    const password = args.target.value;
    this.setState({ password });
  }

  public render() {
    return (
      <div className="personalInfo">

        <h1>Update Personal Information</h1>

        {
          this.state.user === null ||
          <p>First Name:{this.state.user.firstName}<br />
            <br />
                       Last Name: {this.state.user.lastName}<br />
            <br />
                       User Name: {this.state.user.userName}<br />
            <br />
            {this.state.user.companyName}<br />
          </p>
        }

        <input type="text" placeholder="First Name" className="firstName" value={this.state.firstName} onChange={this.setFirstName} />
        <br />
        <input type="text" placeholder="Last Name" className="lastName" value={this.state.lastName} onChange={this.setLastName} />
        <br />
        <input type="text" placeholder="User Name" className="userName" value={this.state.userName} onChange={this.setUserName} />
        <br />
        <input type="password" placeholder="Password" className="password" value={this.state.password} onChange={this.setPassword} />
        <br />
        <br />
        <div className="clearfix">
          <button type="submit" className="signupbtn" onClick={this.updateUser} >Update Personal Information</button>
          <button type="button" className="deleteAccount" onClick={this.deleteUser} >Delete Account</button>
          <br />
          <br />
        </div>

      </div>
    );
  }
}

