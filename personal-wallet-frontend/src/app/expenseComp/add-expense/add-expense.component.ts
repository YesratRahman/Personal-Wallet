import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
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


  constructor(private service : WalletService, private router : Router) { }

  ngOnInit(): void {
  }


  onSubmit(){
   
      let toAdd : Expense =  {expenseAmount : this.expenseAmount, description : this.description, spentDate : this.spentDate, category : this.category};
      console.log(toAdd); 
      this.service.addExpense(toAdd).subscribe(); 
    

    //console.log(this.userForm.value.userName); 
    
  }
}
