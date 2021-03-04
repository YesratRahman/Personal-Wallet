import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/interfaces/Expense';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.css']
})
export class AllExpenseComponent implements OnInit {
  expenses : Expense[];

  constructor(private service : WalletService, private loginService: LoginService) { }

  ngOnInit(): void {
    // if(this.loginService.currentUser.userId == this.service.getAllExpenses().user) {

    
    if(this.loginService.getUser() == this.loginService.currentUser) {

   console.log(this.loginService.currentUser);
    this.service.getAllExpenses().subscribe(list => {
      this.expenses = list
    });
  }
} 

}
