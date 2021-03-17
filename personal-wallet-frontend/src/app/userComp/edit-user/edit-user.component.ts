import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
import { Income } from 'src/app/interfaces/Income';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId : number; 
  userName : string; 

associatedExpense : Expense; 
associatedIncome : Income; 
currentUser : User; 
@Output() notifyEditUser : EventEmitter<string> = new EventEmitter<string>(); 

constructor(private walletSer : WalletService, private router : Router, private route : ActivatedRoute, private loginService : LoginService){
  this.currentUser = this.loginService.getUser(); 

  }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')); 
    console.log(this.loginService.currentUser.userId);
  }

  
  updateUser(){
    let toUpdate : User = {userId : this.loginService.currentUser.userId, userName : this.userName, associatedExpense: this.associatedExpense, associatedIncome: this.associatedIncome};
    this.walletSer.updateUser(toUpdate).subscribe(_ => {
      this.router.navigate(['users'])
    }); 
  }


}

