import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
import { Income } from 'src/app/interfaces/Income';
import { User } from '../../interfaces/User';
import { WalletService } from '../../service/wallet.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userName : string;
  isSubmitted=false;
  firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  isEditable = false;
  associatedExpense : Expense; 
  associatedIncome : Income; 

  constructor( private service : WalletService, private router : Router, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  // userForm = this.form.group({
  //   userName:['',Validators.required]
  // });

  // addUser() {
  //   let toAdd : User = {userName: this.userName, }
  //   this.service.addUser(toAdd).subscribe((_) => {this.router.navigate(['users'])});
  // }

  onSubmit(){
    // this.isSubmitted=true;
    // alert("User is Added");
      let toAdd : User =  {userName : this.userName,associatedExpense : this.associatedExpense, associatedIncome: this.associatedIncome };
      // console.log(toAdd); 
      this.service.addUser(toAdd).subscribe(_ => {
        this.router.navigate(['users'])
      }); 
    }
  
  }
  