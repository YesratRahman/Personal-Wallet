import { Expense } from "./Expense";
import { Income } from "./Income";

export interface User {
    userId? : number;
    userName : string; 
    associatedExpense : Expense ;
    associatedIncome : Income;
}

export interface ExpensesInfo {
    numOfEntries: string | number;
    totalAmount: string;
    categoryTotals: string;
    selectedCategory: string;
    umOfEntries?: any;
    firstExpenseDate?: string;
    lastExpenseDate?: string;
  }

  export interface IncomeInfo {
    numOfEntries: string | number;
    totalAmount: string;
    categoryTotals: string;
    selectedCategory: string;
    umOfEntries?: any;
    firstIncomeDate?: string;
    lastIncomeDate?: string;
  }
export const expense_categories: string[] = ['Groceries', 'Transportation', 'Entertainment', 'Dining out', 'Education', 'Insurance', 'Rent','Travel','Utilities', 'Office','Miscellaneous'];
export const income_categories: string[] = ['Gift', 'Salary', 'Entertainment', 'Business', 'Stock', 'Rental Income', 'Miscellaneous'];
