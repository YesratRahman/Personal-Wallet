import { User } from "./User";


export interface Expense{
    expenseId? : number;
    expenseAmount : number | string; 
    description : string; 
    spentDate : Date; 
    category : string; 
    userId? : number; 
    user? : User[]; 
}
