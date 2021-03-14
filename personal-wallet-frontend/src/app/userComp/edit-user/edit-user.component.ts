import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
import { Income } from 'src/app/interfaces/Income';
import { User } from 'src/app/interfaces/User';
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

  
  constructor(private service : WalletService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')); 
    this.service.getUserById(this.userId).subscribe(); 
  }

  
  updateUser(){
    let toUpdate : User = {userId : this.userId, userName : this.userName, associatedExpense: this.associatedExpense, associatedIncome: this.associatedIncome};
    this.service.updateUser(toUpdate).subscribe(_ => {
      this.router.navigate(['users'])
    }); 
  }

}


// ngOnInit(): void {
//   this.userId = parseInt(this.route.snapshot.paramMap.get('id')); 
//   this.service.getUserById(this.userId).subscribe(newD => {
//     this.userName = newD.userName; 
//   });
// }
