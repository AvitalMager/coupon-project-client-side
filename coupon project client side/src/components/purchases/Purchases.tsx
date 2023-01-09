import axios from "axios";
import { Component } from "react";
import { Unsubscribe } from "redux";
import { Purchase } from "../../models/Purchase";
import { ActionType } from "../../redux/action-type";
import "./Purchases.css";
import { store } from "../../redux/store";


interface PurchasesState {

    purchases: Purchase[];
    filterSearchByName: string;

}
export default class Purchases extends Component<any, PurchasesState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);


        // Initializing the state object
        this.state = {

            filterSearchByName: "",
            purchases: [],
        };

        // subscribe() calls setState() <-- no parameter
        // the store coupons' data acts as a parameter
        // Bottom line - the callback is being called AFTER the store's state
        // changes (after the reduce function returns its value)
        this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
                {
                    purchases: store.getState().purchases
                    // purchases: store.getState().purchases
                })
        );
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    // componentDidMount = ngOnInit in angular (a reserved word)
    public async componentDidMount() {
        const response = await axios.get<Purchase[]>("http://localhost:8080/purchase/getAllPurchasesByUserId");

        console.log(response.data);

        store.dispatch({ type: ActionType.GetAllPurchases, payload: response.data });

        // response.data = all the coupons that were returned from the server
        this.setState({ purchases: response.data });
    }

    public filterSearchByNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        console.log(text);
        this.setState({ filterSearchByName: text });
    }

    public render() {
        return (
            <div className="purchases">

                <label htmlFor="name">Search by name:</label>
                <input id="name" type="text" onChange={this.filterSearchByNamePipe} /><br /><br />

                <table className="purchases-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date of Purchase</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.purchases.filter(purchases => {
                            if (this.state.filterSearchByName === "") {
                                return true;
                            }

                            return purchases.couponName.toLowerCase().includes(this.state.filterSearchByName.toLowerCase())
                        }

                        ).map(purchases =>

                            <tr key={purchases.id}>
                                <td>{purchases.couponName}</td>
                                <td>{purchases.amount}</td>
                                <td>{purchases.timeOfPurchase}</td>

                            </tr>
                        )
                        }

                    </tbody>
                </table>
            </div>

        );
    }
}
