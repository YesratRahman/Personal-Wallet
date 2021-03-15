import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../interfaces/Expense';
import { User } from '../interfaces/User';
import { LoginService } from '../service/login.service';
import { WalletService } from '../service/wallet.service';

@Component({
  selector: 'app-overall-saving',
  templateUrl: './overall-saving.component.html',
  styleUrls: ['./overall-saving.component.css']
})
export class OverallSavingComponent implements OnInit {

  currentUser : User; 
  @Input() total : User; 

  



  constructor(private walletService: WalletService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.walletService.getReport(this.loginService.currentUser.userId).subscribe(
      newTotal => {
        this.total = newTotal ; 

      }

    ); 

  }
} 