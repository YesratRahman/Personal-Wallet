import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { ChartType } from 'chart.js';
import { Expense } from 'src/app/interfaces/Expense';
import { User } from '../../interfaces/User';
import { LoginService } from '../../service/login.service';
import { WalletService } from '../../service/wallet.service';
import { WalletComponent } from '../../wallet/wallet.component';

@Component({
  selector: 'app-expense-monthly-summary',
  templateUrl: './expense-monthly-summary.component.html',
  styleUrls: ['./expense-monthly-summary.component.css']
})

export class ExpenseMonthlySummaryComponent implements OnInit {


  currentUser : User; 

  chart = []; 
  constructor(private walletService : WalletService, private router : Router, private loginService : LoginService ) { 

  }

  ngOnInit() : void{
    
    this.walletService.getTotalExpenseAndIncomeByUserId(this.loginService.currentUser.userId).subscribe(
      res=> {
        
         let expense_sum = res.map(res => res.expenseSum)
         let income_sum = res.map(res => res.incomeSum)

         let alldates = res.map(res => res.spentDate)

         let dates = [] 
         alldates.forEach((res)=> {
            let justDate = new Date(res)
            dates.push(justDate.toLocaleDateString('en', {year: 'numeric', month : 'short'}))
         }) 
         this.chart.push(new Chart('canvas',
         {
            type: 'bar', 
            data: {
              labels: dates,
              datasets: [
                
                {
                  data: expense_sum, 
                  borderColor: '#3cba9f',
                  backgroundColor: "rgba(10,150,132,1)",
                  fill: false,
                  label: 'Expense', 
                  barPercentage: 0.6
                   
                          }, 
                {
                  data: income_sum, 
                  borderColor: '#ffcc00',
                  backgroundColor:'rgb(235, 104, 104)',

                  fill: false ,
                  label: 'Income',
                  barPercentage: 0.6
      

                }, 
                

              ]

            },
            
            
            options: {
              legend: {
                display: true, 
                labels: {
                  boxWidth: 50, 
                  fontSize: 20

            }
              },
              title: {
                display: true,
                text: 'Expense, Income VS Date',
                position: 'bottom',
                fontSize: 22,
                fontColor: 'black'
            },
              scales: {
                xAxes : [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                    fontSize: 20,
                    fontColor: 'rgb(17, 72, 192)'

                  }
                }
              
              ], 
                yAxes : [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Amount',
                    fontSize: 20,
                    fontColor: 'rgb(17, 72, 192)'

                  }
                }]
              }
            }
            
         })) 

      });

      


  }
}







