import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import { NavLink } from "react-router-dom";
import "./AdminUserCreateDelete.css";

interface CreateUserState {

    userId: number
}

export default class CompanyCoupon extends Component<any, CreateUserState>{
    constructor(props: any) {
        super(props);
        this.state = {

            userId: null

        };
    }

    private deleteUser = async () => {
        try {
            await axios.delete("http://localhost:8080/user/" + this.state.userId);
            alert("User was deleted successfully!");
            this.props.history.push("/getUsersAdmin")
        }

        catch (err) {
            console.log(err.response.data);
            alert(err.response.data.errorName);
        }
    }

    private setUserId = (args: ChangeEvent<HTMLInputElement>) => {
        const userId = +args.target.value;
        this.setState({ userId });
    }

    public render() {
        return (

            <div className="createDeleleteUser">
                <div className="others">
                    <h1>Create User</h1>
                    <br />
                    <NavLink to="/register" exact >Create User</NavLink>
                    <br />
                    <br />
                    <NavLink to="/getUsersAdmin" exact >List Of Users</NavLink>
                </div>
                <br />
                <h1>Delete User</h1>

                <input type="number" placeholder="User Id" className="user Id" onChange={this.setUserId} />
                <br />
                <button type="button" className="deleteuser" onClick={this.deleteUser} >Delete User</button>
                <br />



            </div>

        )
    }
}