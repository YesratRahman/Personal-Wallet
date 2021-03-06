import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-income-category-chart',
  templateUrl: './income-category-chart.component.html',
  styleUrls: ['./income-category-chart.component.css']
})
export class IncomeCategoryChartComponent implements OnInit {

  constructor(private walletService: WalletService, private loginService : LoginService) { }
  currentUser : User; 
  chart = []; 


  ngOnInit(): void {
    this.walletService.getIncomeByCategory(this.loginService.currentUser.userId).subscribe( 
    res=> {
      let temp_category = res.map(res => res.category); 
      let temp_totalExpenseAmount = res.map(res => res.totalIncomeByCategory); 


    
     
      this.chart.push(new Chart('canvas',
      {
         type: 'pie', 
         data: {
           labels: temp_category,
           
           

           datasets: [
             
             {
               data: temp_totalExpenseAmount, 
               backgroundColor: ['rgb(222, 184, 135)','rgb(197, 226, 151)', 'rgb(136, 203, 230)', 'rgb(197, 98, 58)',
              'rgb(235, 88, 137)','rgb(151, 238, 177)','rgb(196, 183, 241)'],
               
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
             text: 'Income vs Category Bar Graph',
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








