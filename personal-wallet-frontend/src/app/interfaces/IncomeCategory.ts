import { Expense } from "./Expense";
import { Income } from "./Income";
import { User } from "./User";

export interface IncomeCategory {
    category : string; 
    totalIncomeByCategory : number;
    associatedExpense? : Expense ;
    associatedIncome? : Income;
    associatedUser? : User; 
}

