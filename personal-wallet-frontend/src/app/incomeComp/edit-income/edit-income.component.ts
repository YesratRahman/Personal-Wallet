import { Component } from '@angular/core';
import { EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from 'src/app/interfaces/Income';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css']
})
export class EditIncomeComponent implements OnInit {

  @Output() notifyDelete : EventEmitter<number> = new EventEmitter<number>(); 
  incomes :Income[];

  income: Income;
  original: Income;
  update = false;
  currentUser : User; 
  confirmDelete = false; 


  constructor( @Inject(MAT_DIALOG_DATA) public data: Income,

    private walletService: WalletService,
    private loginService: LoginService,
    private router : Router,
    private route : ActivatedRoute    ) 
    {

    this.income = {...this.data, ...{date: new Date(this.data.earnedDate)}};
    this.original = {...this.data, ...{date: new Date(this.data.earnedDate)}};
  }

  ngOnInit() {
    this.currentUser = this.loginService.getUser(); 
    this.walletService.getIncomeById(this.income.incomeId).subscribe(); 
  } 

  deleteIncome(){
    this.walletService.deleteIncome(this.income.incomeId).subscribe(() => {
      this.notifyDelete.emit(this.income.incomeId); 

    }); 
  }

  
  getAllData() {
    this.walletService.getAllIncomes().subscribe(data => {
      this.incomes = data; 
    })
  } 



  updateIncome(){
    
      this.walletService.updateIncome(this.income).subscribe(() => {
        this.notifyDelete.emit(this.income.incomeId); 
      }); 
    }

  formatAmount() {
    if (this.income.incomeAmount !== null) {
      if (typeof this.income.incomeAmount !== 'string') {
        const rounded = this.income.incomeAmount.toFixed(2);
        this.income.incomeAmount = parseFloat(rounded);
      }
    }
  }

  reset() {
    this.income = { ...this.original };
  }

  isIncomeUntouched(): boolean {
    return JSON.stringify(this.income) === JSON.stringify(this.original);
  }
  save(value: any, valid: any, form: any) {
    if (valid) {
      this.updateIncome();
    }
  }
  
} 




