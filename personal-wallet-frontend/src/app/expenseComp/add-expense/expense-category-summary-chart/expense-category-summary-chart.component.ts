import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartEvent } from 'angular2-highcharts/dist/ChartEvent';
import { Expense } from 'src/app/interfaces/Expense';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-expense-category-summary-chart',
  templateUrl: './expense-category-summary-chart.component.html',
  styleUrls: ['./expense-category-summary-chart.component.css']
})
export class ExpenseCategorySummaryChartComponent implements OnInit {

  @Input() expenseData: Expense[];
  @Input() date: Date;
  @Input() categories: string[];
  currentUser : User; 
  
  init= false;
  chart: any;
  options = {
    title: {
      text: null
    },
    xAxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:,.2f}</b><br/>',
      shared: true
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
    },
    series: []
  };


  constructor( private loginService : LoginService) {
  }

  ngOnInit() {
    this.currentUser = this.loginService.getUser(); 
    this.setCategoriesData();
    this.init = true;
  }

  saveInstance(chartInstance: ChartEvent) {
    this.chart = chartInstance;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenseData && !changes.expenseData.firstChange) {
      if (this.chart) {
        this.setCategoriesData(true);
      }
    }

    if (changes.date && !changes.date.firstChange) {
      if (this.date) {
        this.setCategoriesData(true);
      }
    }
  }

  setCategoriesData(update:boolean = false) {
    const totals = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    for (const category of this.categories) {
      let categorySumByMonth = monthNames.map(e => 0);
      const matchingExpenses = this.expenseData.filter(c => c.category === category);
      matchingExpenses.forEach(e => {
        const expenseDate = new Date(e.spentDate);
        if (expenseDate.getFullYear() === this.date.getFullYear()) {
          categorySumByMonth[expenseDate.getMonth()] = categorySumByMonth[expenseDate.getMonth()] + <number>e.expenseAmount;
        }
      });
      const dataObj = {name: category, expenseData: categorySumByMonth, type:'line'};
      totals.push(dataObj);
    }
    this.options.series = totals;
    this.options.xAxis.categories = monthNames.map(m => `${m} ${this.date.getFullYear()}`);
    if(update){
      this.chart.update(this.options);
    }
  }

}
