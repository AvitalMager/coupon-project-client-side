import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import { NavLink } from "react-router-dom";
import { CompanyInfoDto } from "../../models/CompanyInfoDto";
import "./AdminCompanyCreate.css";

interface CreateCompanyState {

    companyName: string,
    address: string,
    phoneNumber: string,
    companyId: number

}

export default class CompanyCoupon extends Component<any, CreateCompanyState>{
    constructor(props: any) {
        super(props);
        this.state = {

            companyName: "",
            address: "",
            phoneNumber: "",
            companyId: null

        };
    }


    private createCompany = async () => {

        try {
            let createCompany = new CompanyInfoDto(this.state.companyName, this.state.address, this.state.phoneNumber);
            await axios.post("http://localhost:8080/company", createCompany);

            alert("New Company was created successfully! ");
            this.props.history.push('/getCompaniesAdmin');
        }
        catch (err) {
            console.log(err.response.data);
            alert( err.response.data.errorName);
        }
    }

    private deleteCompany = async () => {
        try {

            const response = await axios.delete("http://localhost:8080/company/" + this.state.companyId);
            console.log(response);
            alert("company was deleted successfully!");
            this.props.history.push('/getCompaniesAdmin');
        }

        catch (err) {
            console.log(err.response.data);
            alert( err.response.data.errorName);
        }
    }

    private setCompanyName = (args: ChangeEvent<HTMLInputElement>) => {
        const companyName = args.target.value;
        this.setState({ companyName });
    }

    private setCompanyAddress = (args: ChangeEvent<HTMLInputElement>) => {
        const address = args.target.value;
        this.setState({ address });
    }

    private setPhoneNumber = (args: ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = args.target.value;
        this.setState({ phoneNumber });
    }

    private setCompanyId = (args: ChangeEvent<HTMLInputElement>) => {
        const companyId = +args.target.value;
        this.setState({ companyId });
    }

    public render() {
        return (

            <div className="company-container">
                
                
                <h1>Create Company</h1>

                <input type="text" placeholder="Company Name" className="name" required onChange={this.setCompanyName} />
                <br />
                <input type="text" placeholder="Company Adress" className="sddress" required onChange={this.setCompanyAddress} />
                <br />
                <input type="text" placeholder="Phone number" className="phone number" required onChange={this.setPhoneNumber} />
                <br />
                <br />
                <button type="submit" className="createCompany" onClick={this.createCompany} >Create Company</button>
                <br />
                
                <h1>Delete Company</h1>
                
                <input type="number" placeholder="Company Id" className="company Id" onChange={this.setCompanyId} />
                <br />
                <br />
                <button type="button" className="deleteCompany" onClick={this.deleteCompany} >Delete Company</button>
                <br />   
                <br />
                
                <div className="others">
                <NavLink to="/getCompaniesAdmin" exact >List Of Companies</NavLink>
                
                </div> 
            </div>

        )
    }
}