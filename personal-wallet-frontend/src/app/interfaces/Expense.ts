import { User } from "./User";


export interface Expense{
    expenseId? : number;
    expenseAmount : number; 
    description : string; 
    spentDate : Date; 
    category : string; 
    user? : User[]; 
}