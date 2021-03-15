import { Expense } from "./Expense";
import { Income } from "./Income";

export interface User {
    userId? : number;
    userName : string; 
    associatedExpense : Expense ;
    associatedIncome : Income;
}

