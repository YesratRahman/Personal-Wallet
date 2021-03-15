import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Expense } from '../../interfaces/Expense';
import { User } from '../../interfaces/User';
import { LoginService } from '../../service/login.service';
import { WalletService } from '../../service/wallet.service';
@Component({
  selector: 'app-expense-category-chart',
  templateUrl: './expense-category-chart.component.html',
  styleUrls: ['./expense-category-chart.component.css']
})
export class ExpenseCategoryChartComponent implements OnInit {

  constructor(private walletService: WalletService, private loginService : LoginService) { }
  currentUser : User; 
  chart = []; 


  ngOnInit(): void {
    // this.currentUser = this.loginService.getUser(); 
    this.walletService.getExpenseByCategory(this.loginService.currentUser.userId).subscribe( 
    res=> {
      let temp_category = res.map(res => res.category); 
      let temp_totalExpenseAmount = res.map(res => res.totalExpenseByCategory); 


    
     
      this.chart.push(new Chart('canvas',
      {
         type: 'pie', 
         data: {
           labels: temp_category,
           
           

           datasets: [
             
             {
               data: temp_totalExpenseAmount, 
               backgroundColor: ['rgb(222, 184, 135)','rgb(197, 226, 151)', 'rgb(136, 203, 230)', 'rgb(197, 98, 58)'],
               
               fill: false,
              //  label: 'Expense', 
               barPercentage: 0.7
                
                       }
   

             
             

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
             text: 'Expense Category Summary',
             position: 'bottom',
             fontSize: 22,
             fontColor: 'black'
         },
          //  scales: {
          //    xAxes : [{
          //      scaleLabel: {
          //        display: true,
          //        labelString: 'Date',
          //        fontSize: 20,
          //        fontColor: 'rgb(17, 72, 192)'

          //      }
          //    }
           
          //  ], 
          //    yAxes : [{
          //      scaleLabel: {
          //        display: true,
          //        labelString: 'Amount',
          //        fontSize: 20,
          //        fontColor: 'rgb(17, 72, 192)'

          //      }
          //    }]
          //  }
         }
         
      })) 

   });

   


}



}








