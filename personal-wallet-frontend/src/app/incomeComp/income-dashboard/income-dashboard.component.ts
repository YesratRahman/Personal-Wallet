import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Income } from 'src/app/interfaces/Income';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-income-dashboard',
  templateUrl: './income-dashboard.component.html',
  styleUrls: ['./income-dashboard.component.css']
})
export class IncomeDashboardComponent implements OnInit {

  metrics: {
    color?: string, value: string | number, metricTitle: string, icon?: string
  }[] = [];
  incomeDataTable: Income[] = [];

  isLoadingIncomes = true;

  incomeDataChart: { incomeAmount: number, description: string, category: string, earnedDate: Date }[] = [];

  currentUser: User;

  constructor(private walletSer: WalletService, private router: Router, private route: ActivatedRoute,
    private loginService: LoginService) {

  }
  ngOnInit(): void {


    this.currentUser = this.loginService.getUser();
    console.log(this.currentUser);
  }

  isDataReady = false;
  date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 2,
    new Date().getDate()
  );
  categoryDate = new Date();
  categories:string[];

  private incomes: Subscription;

  

  scrollTop() {
    const contentElement = document.getElementById('content');
    contentElement.scrollIntoView();
  }

  getUserExpenses() {
    this.currentUser = this.loginService.getUser();
  if (this.currentUser) {
      this.walletSer.getAllUsers()
        .subscribe(jsonData => {
          this.subToIncomesChange();
        });
    }
  }

  checkDate(e: Date, prop:string) {
    this[prop] = e;
  }



  private subToIncomesChange() {
    const userId = this.loginService.currentUser.userId;
    this.isLoadingIncomes = true;
    if (userId) {
      this.incomes = this.walletSer.getAllIncomes()
        .subscribe(snapshots => this.filterData(snapshots));
    } else {
      this.isLoadingIncomes = false;
    }
  }

  parseData(snapsShots: any) {
    const data = [];
    snapsShots.forEach(snapshot => {
      const expense = snapshot.payload.exportVal();
      expense.id = snapshot.key;
      data.push(expense);
    });
    return data;
  }

  filterData(snapshots) {
    this.isLoadingIncomes = false;
    const parsedData = this.parseData(snapshots);


    const firstDate = new Date(Math.min.apply(null, parsedData.map((e) => new Date(e.date))));
    const lastDate = new Date(Math.max.apply(null, parsedData.map((e) => new Date(e.date))));
    const numOfEntries = parsedData.length;
    const totalAmount = this.getTotal(parsedData);


    this.metrics = [
      {color: null, value: firstDate.toDateString().slice(3, 15), metricTitle: 'First Income Date', icon: 'today'},
      {color: null, value: lastDate.toDateString().slice(3, 15), metricTitle: 'Latest Income Date', icon: 'today'},
      {color: null, value: numOfEntries, metricTitle: 'Number of Incomes', icon: 'receipt'},
      {color: 'money-icon', value: totalAmount, metricTitle: 'Total Amount', icon: 'attach_money'},
    ];

    this.categories = parsedData
      .map(item => item.category)
      .filter((value, index, self) => self.indexOf(value) === index);

    const pieData = [];

    for (const category of this.categories) {
      let categorySum = 0;
      for (const value of parsedData) {
        if (value.category === category) {
          categorySum += value.amount;
        }
      }
      const dataObj = {name: category, y: categorySum, value: categorySum.toFixed(2)};
      pieData.push(dataObj);
    }
    this.incomeDataChart = pieData;
    this.incomeDataTable = parsedData;

    this.isDataReady = true;
    this.isLoadingIncomes = false;
  }

  getTotal(expenses: any): string {
    let categorySum = 0;
    for (const expense of expenses) {
      categorySum += expense.amount;
    }
    return categorySum.toFixed(2);
  }

  getCategoryTotals(incomes: Income[]) {
    const categories = incomes
      .map(item => item.category)
      .filter((value, index, self) => self.indexOf(value) === index);
    const totals = [];

    for (const category of categories) {
      let categorySum = 0;
      for (const value of incomes) {
        if (value.category === category) {
          categorySum += value.incomeAmount as number;
        }
      }
      const dataObj = {name: category, amount: categorySum.toFixed(2)};
      totals.push(dataObj);
    }
    return totals.toString();
  }

  ngOnDestroy() {
    if (this.incomes) {
      this.incomes.unsubscribe();
    }
  }

}




