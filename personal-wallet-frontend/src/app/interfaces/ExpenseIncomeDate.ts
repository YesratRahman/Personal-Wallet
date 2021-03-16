import { Expense } from "./Expense";
import { Income } from "./Income";
import { User } from "./User";

export interface ExpenseIncomeDate {
    expenseSum : number;
    incomeSum : number ;
    spentDate : Date;
    earnedDate : Date; 
}

