import { ActionType } from "./action-type";

export interface Action {
    type: ActionType; //function
    payload?: any; //parameter that the function recives
}