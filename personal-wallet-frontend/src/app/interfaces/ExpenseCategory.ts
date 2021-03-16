import { Expense } from "./Expense";
import { Income } from "./Income";
import { User } from "./User";

export interface ExpenseCategory {
    category : string; 
    totalExpenseByCategory : number;
    associatedExpense? : Expense ;
    associatedIncome? : Income;
    associatedUser? : User; 
}

