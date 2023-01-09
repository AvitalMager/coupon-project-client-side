import axios from "axios";
import { Component } from "react";
import { UserInfo } from "../../models/UserInfo";
import "./AdminGetUsers.css";

interface GetUsersState {

    users: UserInfo[];
    filterSearchById: number;
    filterSearchByCategory:string


}
export default class Purchases extends Component<any, GetUsersState>{

    constructor(props: any) {
        super(props);


        // Initializing the state object
        this.state = {

            users: [],
            filterSearchById: 0,
            filterSearchByCategory: "All"
        };
    }

    // componentDidMount = ngOnInit in angular (a reserved word)
    public async componentDidMount() {
        const response = await axios.get<UserInfo[]>("http://localhost:8080/user");

        console.log(response.data);

        this.setState({ users: response.data });
    }

    public filterSearchByIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
        let number = +event.target.value;
        console.log(number);
        this.setState({ filterSearchById: number });
    }

    public filterSearchByCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let text = event.target.value;
        console.log(text);
        this.setState({ filterSearchByCategory: text });
    }

    public render() {
        return (
            <div className="usersTable">

                <div className="searchTable">

                <label htmlFor="type"> Search by User Type:</label>
                    <select id="type" onChange={this.filterSearchByCategory}>
                        <option value="All">All</option>
                        <option value="CUSTOMER">Customer</option>
                        <option value="ADMIN">Admin</option>
                        <option value="COMPANY">Company</option>
                    
                    </select>

                    <label htmlFor="id"> Search by ID:</label>
                    <input id="id" type="number" onChange={this.filterSearchByIdPipe} /><br /><br />

                </div>
                <table className = "usersTable1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Type</th>
                            <th>Company Name</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.users.filter(user => {
                            if (this.state.filterSearchById === 0) {
                                return true;
                            }
                            return user.id === (this.state.filterSearchById)
                        }

                        ).filter(user => {
                            if (this.state.filterSearchByCategory === "All") {
                                return true;
                            }
                            return user.userType.includes(this.state.filterSearchByCategory)
                        }
                        ).map(user =>


                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.userType}</td>
                                <td>{user.companyName}</td>

                            </tr>
                        )
                        }

                    </tbody>
                </table>
                <br/>
                <br/>
            </div>

        );
    }
}