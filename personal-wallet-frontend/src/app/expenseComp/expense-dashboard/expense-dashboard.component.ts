import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/interfaces/Expense';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {
  metrics: {
    color?: string, value: string | number, metricTitle: string, icon?: string
  }[] = [];

  isLoadingExpenses = true;

  expenseDataChart: { expenseAmount: number, description: string, category: string, spentDate: Date }[] = [];

  currentUser: User;

  constructor(private walletSer: WalletService, private router: Router, private route: ActivatedRoute,
    private loginService: LoginService) {

  }
  ngOnInit(): void {


    this.currentUser = this.loginService.getUser();
    console.log(this.currentUser);
    // this.walletSer.getExpenseByUserId(this.currentUser.userId);
  }
  


  getTotal(expenses: any): string {
    let categorySum = 0;
    for (const expense of expenses) {
      categorySum += expense.expenseAmount;
    }
    return categorySum.toFixed(2);
  }

  // parsedata(snapShots: any){
  //   const data = []; 
  //   snapShots.forEach(element => {
  //     const expense = element.
  //   });
  // }
  filterData(snapshots){
    this.isLoadingExpenses = false; 
    const parsedData = this.walletSer.getExpenseByUserId(this.currentUser.userId); 
    // const firstDate = new Date(Math.min.apply(null, parsedData.subscribe((e) => new Date(e.expenseDate))));
    // const lastDate = new Date(Math.max.apply(null, parsedData.subscribe((e) => new Date(e.expenseDate))));
    const firstDate = null; 
    const lastDate = null; 
     const numOfEntries = null;
    const totalAmount = this.getTotal(parsedData);
    this.metrics = [
      {color: null, value: firstDate.toDateString().slice(3, 15), metricTitle: 'First Expense Date', icon: 'today'},
      {color: null, value: lastDate.toDateString().slice(3, 15), metricTitle: 'Latest Expense Date', icon: 'today'},
      {color: null, value: numOfEntries, metricTitle: 'Number of Expenses', icon: 'receipt'},
      {color: 'money-icon', value: totalAmount, metricTitle: 'Total Amount', icon: 'attach_money'},
    ];


  }

}











// currentUser: User;

  // constructor(private walletSer: WalletService, private router: Router, private route: ActivatedRoute,
  //   private loginService: LoginService) {

  // }
  // ngOnInit(): void {


  //   this.currentUser = this.loginService.getUser();
  //   console.log(this.currentUser);
  // }




//   expenseDataChart: { name: string, y: number, value: number }[] = [];
//   expenseDataTable: Expense[] = [];
//   metrics: {
//     color?: string, value: string | number, metricTitle: string, icon?: string
//   }[] = [];
//   isLoadingExpenses = true;
//   isDataReady = false;
//   date = new Date(
//     new Date().getFullYear(),
//     new Date().getMonth() - 2,
//     new Date().getDate()
//   );
//   categoryDate = new Date();
//   categories:string[];

//   private expenses: Subscription;

//   constructor(private database: WalletService,
//               private loginService: LoginService) {
//     // this.loginService.currentUser.userId.s   subscribe(
//     //   category => {
//     //     this.getUserExpenses();
//     //   });
//   }

//   ngOnInit() {
//     this.getUserExpenses();
//     setTimeout(() => this.scrollTop());
//   }

//   scrollTop() {
//     const contentElement = document.getElementById('content');
//     contentElement.scrollIntoView();
//   }

//   getUserExpenses() {
//     this.currentUser = this.loginService.getUser();
//   if (this.currentUser) {
//       this.database.getAllUsers()
//         .subscribe(jsonData => {
//           // const key = Object.keys(obj)[0];
//           this.subToExpensesChange();
//         });
//     }
//   }

//   checkDate(e: Date, prop:string) {
//     this[prop] = e;
//   }

//   // getUserCategories() {
//   //   this.database.getCurrentCategories(this.loginService.getUserId())
//   //     .then(jsonData => {
//   //       const obj = jsonData.toJSON();
//   //       const categoriesArr = Object.keys(obj).map((key) => obj[key]);
//   //       this.loginService.setCategories(categoriesArr);
//   //     }).catch(e => {
//   //   })
//   // }

//   private subToExpensesChange() {
//     const userId = this.loginService.getUserId();
//     this.isLoadingExpenses = true;
//     if (userId) {
//       this.expenses = this.database.getAllExpenses()
//         .subscribe(snapshots => this.filterData(snapshots));
//     } else {
//       this.isLoadingExpenses = false;
//     }
//   }

//   parseData(snapsShots: any) {
//     const data = [];
//     snapsShots.forEach(snapshot => {
//       const expense = snapshot.payload.exportVal();
//       expense.id = snapshot.key;
//       data.push(expense);
//     });
//     return data;
//   }

//   filterData(snapshots) {
//     this.isLoadingExpenses = false;
//     const parsedData = this.parseData(snapshots);


//     const firstDate = new Date(Math.min.apply(null, parsedData.map((e) => new Date(e.date))));
//     const lastDate = new Date(Math.max.apply(null, parsedData.map((e) => new Date(e.date))));
//     const numOfEntries = parsedData.length;
//     const totalAmount = this.getTotal(parsedData);


//     this.metrics = [
//       {color: null, value: firstDate.toDateString().slice(3, 15), metricTitle: 'First Expense Date', icon: 'today'},
//       {color: null, value: lastDate.toDateString().slice(3, 15), metricTitle: 'Latest Expense Date', icon: 'today'},
//       {color: null, value: numOfEntries, metricTitle: 'Number of Expenses', icon: 'receipt'},
//       {color: 'money-icon', value: totalAmount, metricTitle: 'Total Amount', icon: 'attach_money'},
//     ];

//     this.categories = parsedData
//       .map(item => item.category)
//       .filter((value, index, self) => self.indexOf(value) === index);

//     const pieData = [];

//     for (const category of this.categories) {
//       let categorySum = 0;
//       for (const value of parsedData) {
//         if (value.category === category) {
//           categorySum += value.amount;
//         }
//       }
//       const dataObj = {name: category, y: categorySum, value: categorySum.toFixed(2)};
//       pieData.push(dataObj);
//     }
//     this.expenseDataChart = pieData;
//     this.expenseDataTable = parsedData;

//     this.isDataReady = true;
//     this.isLoadingExpenses = false;
//   }

//   getTotal(expenses: any): string {
//     let categorySum = 0;
//     for (const expense of expenses) {
//       categorySum += expense.amount;
//     }
//     return categorySum.toFixed(2);
//   }

//   getCategoryTotals(expenses: Expense[]) {
//     const categories = expenses
//       .map(item => item.category)
//       .filter((value, index, self) => self.indexOf(value) === index);
//     const totals = [];

//     for (const category of categories) {
//       let categorySum = 0;
//       for (const value of expenses) {
//         if (value.category === category) {
//           categorySum += value.expenseAmount as number;
//         }
//       }
//       const dataObj = {name: category, amount: categorySum.toFixed(2)};
//       totals.push(dataObj);
//     }
//     return totals.toString();
//   }

//   ngOnDestroy() {
//     if (this.expenses) {
//       this.expenses.unsubscribe();
//     }
//   }

// }
