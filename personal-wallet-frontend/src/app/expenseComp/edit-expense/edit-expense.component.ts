import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from 'src/app/interfaces/Expense';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';

// import 'rxjs/add/operator/toPromise';
// import {Observable} from 'rxjs';    

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  @Output() squareClickedEvent : EventEmitter<Expense> = new EventEmitter<Expense>(); 

  expense: Expense;
  original: Expense;
  update = false;
  currentUser : User; 


  constructor( @Inject(MAT_DIALOG_DATA) public data: Expense,
    private database: WalletService,
    private loginService: LoginService,
    private router : Router,
    private route : ActivatedRoute
    ) 
    {

    this.expense = {...this.data, ...{date: new Date(this.data.spentDate)}};
    this.original = {...this.data, ...{date: new Date(this.data.spentDate)}};
  }

  ngOnInit() {
    console.log(this.data.expenseId); 
    this.database.getExpenseById(this.expense.expenseId).subscribe(); 
  }


  deleteExpense(expenseId : number){
    this.database.deleteUser(this.expense.expenseId).subscribe();
    //   _ => {
    //   this.router.navigate(['expenseDashboard'])
    // }); 
    alert("expense deleted" + expenseId);
    }

  
  
  updateExpense(){
    
    this.database.updateExpense(this.expense).subscribe(); 
    //   _ => {
    //   this.router.navigate(['expenseDashboard'])
    // }); 
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

  
} 





//   expenseId : number;
//   expenseAmount : number; 
//   description : string; 
//   spentDate : Date; 
//   category : string; 
//   userId : number; 
//   user? : User[]; 
//   currentUser : User; 
//   update = false;
//    @Input() expense: Expense;
//   original: Expense;

//   constructor(private service : WalletService, private router : Router, private route : ActivatedRoute, private loginService : LoginService) { }

//   ngOnInit(): void {
//     // this.currentUser = this.loginService.getUser(); 
//     this.expenseId = parseInt(this.route.snapshot.paramMap.get('id')); 
//     this.service.getExpenseById(this.expenseId).subscribe(); 
//   }

//   updateExpense(){
//     let toUpdate : Expense = {userId : this.userId, expenseId : this.expenseId, expenseAmount: this.expenseAmount,
//     description: this.description, spentDate: this.spentDate, category: this.category};
//     this.service.updateExpense(toUpdate).subscribe(_ => {
//       this.router.navigate(['expenseDashboard'])
//     }); 
//   }
//   formatAmount() {
//     if (this.expense.expenseAmount !== null) {
//       if (typeof this.expense.expenseAmount !== 'string') {
//         const rounded = this.expenseAmount.toFixed(2);
//         this.expense.expenseAmount = parseFloat(rounded);
//       }
//     }
//   }

//   reset() {
//     this.expense = { ...this.original };
//   }

//   isExpenseUntouched(): boolean {
//     return JSON.stringify(this.expense) === JSON.stringify(this.original);
//   }
//   deleteExpense(expenseId: number ){
//     this.service.deleteExpense(expenseId).subscribe(_ => {
//       this.router.navigate(['expenseDashboard'])
//     }); 
//     // alert("user deleted" + userId);
//     }

// } 


// successfulDelete() {
//   this.dialogRef.close('Successful');
// }


// pushUpdate() {
//   const userId = this.loginService.currentUser.userId;
//   const key = this.expense.expenseId;
//   const expenseObj = { ...this.expense };
//   delete expenseObj.expenseId;
//   this.database.updateExpense(expenseObj)
//     .subscribe(_ => this.successfulUpdate()); 

// }

// successfulUpdate() {
//   this.dialogRef.close('Successful');
// }


// updateExpense(value: any, valid: any, form: any) {
//   if (valid) {
//     this.pushUpdate();
//   }
// }