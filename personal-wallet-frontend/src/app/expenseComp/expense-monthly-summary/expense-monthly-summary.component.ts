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
                  barPercentage: 0.7
                   
                          }, 
                {
                  data: income_sum, 
                  borderColor: '#ffcc00',
                  backgroundColor:'rgb(235, 104, 104)',

                  fill: false ,
                  label: 'Income',
                  barPercentage: 0.7
      

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

  
  // ngOnInit(){ 
  //   this.walletService.getUserExpenseAndIncome().subscribe(res=> 
  //     console.log(res)); 
  // }
}









// export class ExpenseMonthlySummaryComponent implements OnInit {


  

//       constructor() { }
//       public barChartOptions = {
//         scaleShowVerticalLines: false, //scalse showing the vertical lines 
//         responsive: true  //so the chart is displayed in a responsive way 
//       };
//       public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//       public barChartType : ChartType = 'bar';
//       public barChartLegend = true;
//       public barChartData = [
//         {data: [500, 2000, 2000, 1300, 0, 5000, 12, 600], label: 'Expense'},
//         {data: [1100], label: 'Income'}
//       ];
//       ngOnInit() {
//       }
//     }
    
    
//   currentUser : User; 
//   expenseData: Expense[];  
//   date = [];  
//   expenseAmount = [];  
//   barchart :any = [];  

//   constructor(private walletService : WalletService, private router : Router, private loginService : LoginService) { }
//   ngOnInit() {
//     this.currentUser = this.loginService.getUser(); 
//      this.walletService.getAllExpenses().subscribe((result: Expense[]) => {  
//       result.forEach(x => {  
//         this.date.push(x.spentDate);  
//         this.expenseAmount.push(x.expenseAmount);  
//       });  
//       this  
//       this.barchart = new Chart('canvas', {  
//         type: 'bar',  
//         data: {  
//           labels: this.date,  
//           datasets: [  
//             {  
//               data: this.expenseAmount,  
//               borderColor: '#3cba9f',  
//               backgroundColor: [  
//                 "#3cb371",  
//                 "#0000FF",  
//                 "#9966FF",  
//                 "#4C4CFF",  
//                 "#00FFFF",  
//                 "#f990a7",  
//                 "#aad2ed",  
//                 "#FF00FF",  
//                 "Blue",  
//                 "Red",  
//                 "Blue"  
//               ],  
//               fill: true  
//             }  
//           ]  
//         },  
//         options: {  
//           legend: {  
//             display: false  
//           },  
//           scales: {  
//             xAxes: [{  
//               display: true  
//             }],  
//             yAxes: [{  
//               display: true  
//             }],  
//           }  
//         }  
//       });  
//     });  
//   }  
// }  




// @Input() data: Expense[];
// @Input() date: Date;
// @Input() categories: string[];
// currentData: Expense[];
// originalData: Expense[];


// chart: any;
// @Input() options = {
//   chart: {
//     type: 'column'
//   },
//   title: {
//     text: ''
//   },
//   subtitle: {
//     text: 'Click the columns to view month details'
//   },
//   xAxis: {
//     type: 'category'
//   },
//   yAxis: {
//     title: {
//       text: 'Total monthly expense amount'
//     }

//   },
//   legend: {
//     enabled: false
//   },
//   plotOptions: {
//     series: {
//       borderWidth: 0,
//       dataLabels: {
//         enabled: true,
//         format: '${point.y:.2f}'
//       }
//     }
//   },

//   tooltip: {
//     headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//     pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:.2f}</b> <br/>'
//   },

//   series: [{
//     name: 'Months',
//     colorByPoint: true,
//     data: []
//   }],
//   drilldown: {
//     series: []
//   }
// };


// ngOnInit() {
//   this.originalData = [...this.data];
//   this.currentData = this.data;
// }

// ngOnChanges(changes: SimpleChanges) {
//   if (changes.data && !changes.data.firstChange) {
//     if (this.chart) {
//       this.originalData = [...this.data];
//       this.currentData = this.data;
//       this.setDataForMonthRange();
//     }
//   }

//   if (changes.date && !changes.date.firstChange) {
//     if (this.date) {
//       this.setDataForMonthRange();
//     }
//   }
// }

// saveInstance(chartInstance: any) {
//   this.chart = chartInstance;
//   this.setDataForMonthRange();
// }

// setDataForMonthRange() {
//   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const monthRange = this.getDateRange();

//   const monthSummary = [];
//   const drillDown = [];
//   for (const month of monthRange) {
//     let monthSum = 0;
//     const drillDownData = [];

//     for (const expense of this.currentData) {

//       const currentDate = new Date(expense.spentDate);
//       if (month.getMonth() === currentDate.getMonth() && month.getFullYear() === currentDate.getFullYear()) {
//         monthSum += expense.expenseAmount as number;
//         drillDownData.push(expense);
//       }
//     }
//     let parsedSum;
//     if (monthSum !== 0) {
//       parsedSum = monthSum.toFixed(2);
//     }
//     monthSummary.push({
//       name: monthNames[month.getMonth()] + month.getFullYear(),
//       y: parseFloat(parsedSum),
//       drilldown: monthNames[month.getMonth()]
//     });
//     drillDown.push({
//       name: monthNames[month.getMonth()],
//       id: monthNames[month.getMonth()],
//       data: this.getDrillDownData(drillDownData)
//     });
//   }
//   this.chart.series[0].setData(monthSummary);
//   this.chart.options.drilldown.series = drillDown;
// }

// getDrillDownData(data: any) {

//   const summaryData = [];

//   for (const category of this.categories) {
//     let categorySum = 0;
//     for (const expense of data) {
//       if (category === expense.category) {
//         categorySum += expense.amount;
//       }
//     }
//     summaryData.push([category, categorySum]);
//   }
//   return summaryData;
// }

// getDateRange() {
//   const monthRange = [this.date];
//   for (let i = 1; i < 6; i++) {
//     const month = new Date(this.date.getTime());
//     month.setMonth(this.date.getMonth() + i);
//     monthRange.push(month);
//   }
//   return monthRange;
// }




// export class ExpenseMonthlySummaryComponent implements OnInit {

  

//   constructor() { }
//   public barChartOptions = {
//     scaleShowVerticalLines: false, //scalse showing the vertical lines 
//     responsive: true  //so the chart is displayed in a responsive way 
//   };
//   public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//   public barChartType : ChartType = 'bar';
//   public barChartLegend = true;
//   public barChartData = [
//     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Income'},
//     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Expense'}
//   ];
//   ngOnInit() {
//   }
// }

