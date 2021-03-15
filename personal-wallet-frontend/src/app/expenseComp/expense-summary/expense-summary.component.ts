import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Expense } from '../../interfaces/Expense';
import { User } from '../../interfaces/User';
import { LoginService } from '../../service/login.service';
import { WalletService } from '../../service/wallet.service';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit {

  currentUser : User; 
  @Input() expense : Expense; 
  @Input() total : Expense; 
  @Input() totalByYear : Expense; 
  @Output() notifySum : EventEmitter<number> = new EventEmitter<number>(); 



  constructor(private walletService: WalletService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser(); 
    this.walletService.getExpenseReport(this.currentUser.userId).subscribe(
      newTotal => {
        this.total = newTotal ; 

      }

    ); 
      //this.notifySum.emit(this.expense.expenseAmount); 

  }



  getExpenseReportByYear(expense : Expense){
    this.walletService.getExpenseReportByYear(this.currentUser.userId, expense.spentDate.getFullYear() ).subscribe(
      newTotalByYear => {
        this.totalByYear = newTotalByYear ; 

      }
    ); 
  } 

 
}
