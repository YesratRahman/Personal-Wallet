import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Income } from 'src/app/interfaces/Income';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-income-summary',
  templateUrl: './income-summary.component.html',
  styleUrls: ['./income-summary.component.css']
})
export class IncomeSummaryComponent implements OnInit {

  currentUser : User; 
  @Input() income : Income; 
  @Input() total : Income; 
  @Input() totalByYear : Income; 
  @Output() notifySum : EventEmitter<number> = new EventEmitter<number>(); 



  constructor(private walletService: WalletService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser(); 
    this.walletService.getIncomeReport(this.currentUser.userId).subscribe(
      newTotal => {
        this.total = newTotal ; 

      }

    ); 
      //this.notifySum.emit(this.expense.expenseAmount); 

  }



  getIncomeReportByYear(income : Income){
    this.walletService.getIncomeReportByYear(this.currentUser.userId, income.earnedDate.getFullYear() ).subscribe(
      newTotalByYear => {
        this.totalByYear = newTotalByYear ; 

      }
    ); 
  } 

 
}
