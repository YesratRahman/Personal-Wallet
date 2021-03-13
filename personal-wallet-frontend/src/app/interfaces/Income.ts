import { User } from "./User";

export interface Income{
    incomeId? : number;
    incomeAmount : number; 
    description : string; 
    earnedDate : Date; 
    category : string;
    user? : User[];  
    userId? : number; 

}