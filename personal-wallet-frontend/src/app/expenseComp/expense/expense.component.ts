import { Component, Input, OnInit } from '@angular/core';
import { Expense } from 'src/app/interfaces/Expense';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {



@Input()expense : Expense;

  //users : User[]; 
  constructor(private walletSer : WalletService) { 
  }

  ngOnInit(): void {
    // this.walletSer.getAllUsers().subscribe(list => {
    //   this.users = list
    // });
  }
  
  // deleteuser(userId){
  //   this.walletSer.deleteUser(userId).subscribe(res=>{this.users.splice(1,userId)});
  //   }
}