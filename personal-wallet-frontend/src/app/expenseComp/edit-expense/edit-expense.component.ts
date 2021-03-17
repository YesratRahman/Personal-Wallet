import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from 'src/app/interfaces/Expense';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  @Output() notifyDelete : EventEmitter<number> = new EventEmitter<number>(); 
  expenses :Expense[];

  expense: Expense;
  original: Expense;
  update = false;
  currentUser : User; 
  confirmDelete = false; 

  

  constructor( @Inject(MAT_DIALOG_DATA) public data: Expense,

    private walletService: WalletService,
    private loginService: LoginService,
    private router : Router,
    private route : ActivatedRoute    ) 
    {

    this.expense = {...this.data, ...{date: new Date(this.data.spentDate)}};
    this.original = {...this.data, ...{date: new Date(this.data.spentDate)}};
  }

  ngOnInit() {
    this.currentUser = this.loginService.getUser(); 
    this.walletService.getExpenseById(this.expense.expenseId).subscribe(); 
  } 

  deleteExpense(){
    //this.walletService.deleteExpense(this.expense.expenseId).subscribe(() => this.getAllData());
    this.walletService.deleteExpense(this.expense.expenseId).subscribe(() => {
      this.notifyDelete.emit(this.expense.expenseId); 

    }); 
  }

  
  getAllData() {
    this.walletService.getAllExpenses().subscribe(data => {
      this.expenses = data; 
    })
  } 


  updateExpense(){
    
      this.walletService.updateExpense(this.expense).subscribe(() => {
        this.notifyDelete.emit(this.expense.expenseId); 
      }); 
    }

  formatAmount() {
    if (this.expense.expenseAmount !== null) {
      if (typeof this.expense.expenseAmount !== 'string') {
        const rounded = this.expense.expenseAmount.toFixed(2);
        this.expense.expenseAmount = parseFloat(rounded);
      }
    }
  }

  reset() {
    this.expense = { ...this.original };
  }

  isExpenseUntouched(): boolean {
    return JSON.stringify(this.expense) === JSON.stringify(this.original);
  }
  save(value: any, valid: any, form: any) {
    if (valid) {
      this.updateExpense();
    }
  }
  
} 




