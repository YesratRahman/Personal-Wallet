import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenseAmount : number; 
  description : string; 
  spentDate : Date; 
  category : string; 
  currentUser : User; 


  constructor(private service : WalletService, private router : Router, private loginService : LoginService ) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser(); 
  }


  onSubmit(){
   
      let toAdd : Expense =  {expenseAmount : this.expenseAmount, description : this.description, spentDate : this.spentDate, category : this.category, userId: this.currentUser.userId};
      console.log(toAdd); 
      this.service.addExpense(toAdd).subscribe(_ => {
        this.router.navigate(['expenses'])
      }); 
    }
  
  }
  