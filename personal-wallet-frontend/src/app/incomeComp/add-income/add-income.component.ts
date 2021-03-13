import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Income } from 'src/app/interfaces/Income';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  incomeAmount : number; 
  description : string; 
  earnedDate : Date; 
  category : string; 
  currentUser : User; 
  dateError = false;
  isLoading = false;


  constructor(private service : WalletService, private router : Router, private loginService : LoginService ) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getUser(); 
  }


  onSubmit(){
   
      let toAdd : Income =  {incomeAmount : this.incomeAmount, description : this.description, earnedDate : this.earnedDate, category : this.category, userId: this.currentUser.userId};
      this.service.addIncome(toAdd).subscribe(_ => {
        this.router.navigate(['incomeDashboard'])
      }); 
    }
    formatAmount() {
      if (this.incomeAmount !== null) {
        if (typeof this.incomeAmount !== 'string') {
          const rounded = this.incomeAmount.toFixed(2);
          this.incomeAmount = parseFloat(rounded);
        }
      }
    }

    


    resetIncomeObj() {
      
        this.earnedDate= null;
       
        this.incomeAmount = null;
        this.description = null; 
        this.category = null; 
      
    }

    clearForm(incomeForm: any) {
      this.dateError = false;
      this.resetIncomeObj();
    }

    save(value: any, valid: any, form: any) {
      if (valid) {
        this.onSubmit();
      }
    }
  }
  