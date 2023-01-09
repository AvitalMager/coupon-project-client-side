import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.Login:
            newAppState.isLoggedIn = true;
            newAppState.userInfo = action.payload;
            break;
        case ActionType.GetAllCompanyCoupons:
            newAppState.companyCoupons = action.payload;
            break;    
        case ActionType.GetAllCoupons:
            newAppState.coupons = action.payload;
            break;
        case ActionType.GetAllPurchases:
            newAppState.purchases = action.payload;
            break;
        case ActionType.Logout:
            newAppState.isLoggedIn = false;
            newAppState.userInfo = null;
            newAppState.coupons = null;
            newAppState.purchases = null;
            break;
        case ActionType.DeleteCoupon:
            const id = action.payload;
            for(let i = 0; i <= newAppState.companyCoupons.length; i++){
                if(newAppState.companyCoupons[i].id == id){
                    newAppState.companyCoupons.splice(i, 1);
                    break;
                }
            }   
            break; 
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}