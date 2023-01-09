import axios from "axios";
import { ChangeEvent } from "react";
import { Component } from "react";
import { UserDto } from "../../models/UserDto";
import { store } from "../../redux/store";
import './SignUp.css';

interface SignUpState {
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  userType: string,
  companyId: number,
  

}

export default class SignUp extends Component<any, SignUpState>{
  constructor(props: any) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      userType: "CUSTOMER",
      companyId: undefined

    };
  }


  private signUp = async () => {
    console.log("Entered user");

    try {
      let userDto = new UserDto(this.state.userName, this.state.password, this.state.firstName, this.state.lastName, this.state.userType, this.state.companyId); //object
      await axios.post("http://localhost:8080/user", userDto);

      alert("Welcome <3 ");
      if (sessionStorage.getItem("userType") === "ADMIN") {
        this.props.history.push('/getUsersAdmin')
      }else {
        this.props.history.push('/home');
      }
      
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

  private setLastName = (args: ChangeEvent<HTMLInputElement>) => {
    const lastName = args.target.value;
    this.setState({ lastName });
  }

  private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
    const userName = args.target.value;
    this.setState({ userName });
  }

  private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
    const password = args.target.value;
    this.setState({ password });
  }

  private setCompanyId = (args: ChangeEvent<HTMLInputElement>) => {
    const companyId = +args.target.value;
    this.setState({ companyId });
  }

  private setUserType = (args: ChangeEvent<HTMLSelectElement>) => {
    const userType = args.target.value;
    this.setState({ userType });
  }


  public render() {
    return (
      <div className="signUp">
          <h1>Sign Up</h1>

          <input type="text" placeholder="First Name" className="firstName" required value={this.state.firstName} onChange={this.setFirstName} />
          <br />
          <input type="text" placeholder="Last Name" className="lastName" required value={this.state.lastName} onChange={this.setLastName} />
          <br />
          <input type="text" placeholder="User Name" className="userName" required value={this.state.userName} onChange={this.setUserName} />
          <br />
          <input type="password" placeholder="Enter Password" className="password" required value={this.state.password} onChange={this.setPassword} />
          <br />
          {store.getState().isLoggedIn && store.getState().userInfo.userType === "ADMIN" && <input type="text" placeholder="Company workers only" className="companyId" value={this.state.companyId} onChange={this.setCompanyId} />}
          <br />
          {store.getState().isLoggedIn && store.getState().userInfo.userType === "ADMIN" && <select  onChange={this.setUserType}>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="COMPANY">COMPANY</option>

          </select>}

          <div className="clearfix">
            <button type="submit" className="signupbtn" onClick={this.signUp} >Sign Up</button>
          </div>
      </div>

    )
  }
}