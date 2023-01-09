import axios from "axios";
import { Component } from "react";
import { CompanyInfoDto } from "../../models/CompanyInfoDto";
import "./AdminGetCompanies.css";


interface GetCompaniesState {

    companies: CompanyInfoDto[];
    filterSearchByName: string;
    filterSearchById: number;

}
export default class AdminGetCompanies extends Component<any, GetCompaniesState>{

    constructor(props: any) {
        super(props);


        // Initializing the state object
        this.state = {

            filterSearchByName: "",
            filterSearchById: 0,
            companies: []
        };
    }

    // componentDidMount = ngOnInit in angular (a reserved word)
    public async componentDidMount() {
        const response = await axios.get<CompanyInfoDto[]>("http://localhost:8080/company");

        console.log(response.data);

        this.setState({ companies: response.data });
    }

    public filterSearchByNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        console.log(text);
        this.setState({ filterSearchByName: text });
    }

    public filterSearchByIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
        let number = +event.target.value;
        console.log(number);
        this.setState({ filterSearchById: number });
    }

    public render() {
        return (
            <div className="companies">
                <div className = "searchCompanies">
                <label htmlFor="name">Search by name:</label>
                <input id="name" type="text" onChange={this.filterSearchByNamePipe} />

                <label htmlFor="id"> Search by ID:</label>
                <input id="id" type="number" onChange={this.filterSearchByIdPipe} /><br /><br />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.companies.filter(companies => {
                            if (this.state.filterSearchById === 0) {
                                return true;
                            }
                            return companies.id === (this.state.filterSearchById)
                        }

                        ).filter(companies => {
                            if (this.state.filterSearchByName === "") {
                                return true;
                            }
    
                            return companies.companyName.toLowerCase().includes(this.state.filterSearchByName.toLowerCase())
                        }
    
                        ).map(companies =>

                            <tr key={companies.id}>
                                <td>{companies.id}</td>
                                <td>{companies.companyName}</td>
                                <td>{companies.address}</td>
                                <td>{companies.phoneNumber}</td>
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