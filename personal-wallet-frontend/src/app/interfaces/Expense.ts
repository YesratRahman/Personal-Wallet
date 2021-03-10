import { User } from "./User";


export interface Expense{
    expenseId? : number;
    expenseAmount : number | string; 
    description : string; 
    spentDate : Date | string; 
    category : string; 
    userId? : number; 
    user? : User[]; 
}
