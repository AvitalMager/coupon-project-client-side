import React, { ChangeEvent, Component } from 'react'
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../../models/UserLoginDetails';
import "./Login.css";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { UserInfo } from '../../models/UserInfo';

interface LoginState {
  userName: string,
  password: string
}
export default class Login extends Component<any, LoginState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
    // args = אובייקט המכיל מידע בנוגע לארוע שהתרחש
    // args.target = אובייקט המתאר את הרכיב שהעלה את הארוע
    // args.target.value = של הרכיב שהעלה את הארוע value-זהו מאפיין ה
    const userName = args.target.value;
    this.setState({ userName });
  }

  private setPassword = (args: ChangeEvent<HTMLInputElement>) => { //button function
    const password = args.target.value;
    this.setState({ password });
  }

  private login = async () => {
    console.log("Entered login");

    try {
      let userLoginDetails = new UserLoginDetails(this.state.userName, this.state.password); //object
      const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:8080/user/login", userLoginDetails);
      const serverResponse = response.data;
      axios.defaults.headers.common['Authorization'] = serverResponse.token;

      let userInfo = new UserInfo(serverResponse.id, this.state.userName, serverResponse.userType, serverResponse.firstName, serverResponse.lastName, serverResponse.companyName );
      store.dispatch({ type : ActionType.Login, payload : userInfo});
      console.log(userInfo);
    

      if (serverResponse.userType === "ADMIN") {
        this.props.history.push('/personal')
        sessionStorage.setItem("userType", "ADMIN");
      }
      else if (serverResponse.userType === "CUSTOMER") {
        this.props.history.push('/customer')
        sessionStorage.setItem("userType", "CUSTOMER");
      }
      else {
        this.props.history.push('/ourCoupons')
        sessionStorage.setItem("userType", "COMPANY");
      }

    }
    

    catch (err) {
      console.log(err.response.data);
      alert( err.response.data.errorName);
    }
  }

  public render() {
    return (

      <div className="login">
        
        <h1>Already have an account? Log In !</h1>
        <input type="text" placeholder="User name" name="username" value={this.state.userName} onChange={this.setUserName} /><br />

        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.setPassword} /><br />

        <input type="button" value="login" onClick={this.login} />

        <div className="others">
        <h1>Or join us !</h1>
          <NavLink to="/register" exact >sign up</NavLink>

        </div>

      </div>
    );
  }

}
