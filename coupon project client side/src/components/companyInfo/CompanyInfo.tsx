import axios from "axios";
import { ChangeEvent } from "react";
import { Component } from "react";
import { CompanyInfoDto } from "../../models/CompanyInfoDto";
import { store } from "../../redux/store";
import "./CompanyInfo.css"

interface CompanyInfoState {

  companyName: string,
  address: string,
  phoneNumber: string,
  companyInfo : CompanyInfoDto

}

export default class CompanyInfo extends Component<any, CompanyInfoState>{

  constructor(props: any) {
    super(props);

    this.state = {

      companyName: "",
      address: "",
      phoneNumber: "",
      companyInfo:null
    };
  }

  public async componentDidMount() {
  
    const response = await axios.get<CompanyInfoDto>("http://localhost:8080/company/companyId");
    this.setState({ companyInfo: response.data });
  }

  private updateCompanyInfo = async () => {
    try {

      let companyInfoDto = new CompanyInfoDto(this.state.companyName, this.state.address, this.state.phoneNumber);
      await axios.put("http://localhost:8080/company", companyInfoDto);
      alert("Company information was apdated!");
      this.props.history.push("/ourCoupons");
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

  private setAddress = (args: ChangeEvent<HTMLInputElement>) => {
    const address = args.target.value;
    this.setState({ address });
  }

  private setPhoneNumber = (args: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = args.target.value;
    this.setState({ phoneNumber });
  }

  public render() {
    return (

      <div className="companyInfo">
        <h1>Update Company Information</h1>

        {
                    this.state.companyInfo === null ||
                    <p>Company Name:{this.state.companyInfo.companyName}<br /><br />
                       Address: {this.state.companyInfo.address}<br /><br />
                       Phone number: {this.state.companyInfo.phoneNumber}<br /><br />
                    </p>
                    
                }
        <input type="text" placeholder="Company Name" className="companyName" value={this.state.companyName} onChange={this.setCompanyName} />
        <br />
        <input type="text" placeholder="Address" className="address" value={this.state.address} onChange={this.setAddress} />
        <br />
        <input type="text" placeholder="Phone Number" className="phoneNumber" value={this.state.phoneNumber} onChange={this.setPhoneNumber} />
        <br />

        <div className="clearfix">
          <button type="submit" className="signupbtn" onClick={this.updateCompanyInfo} >Update Company Information</button>
        </div>
      </div>


    );
  }
}
