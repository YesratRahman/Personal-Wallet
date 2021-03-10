import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income-dashboard',
  templateUrl: './income-dashboard.component.html',
  styleUrls: ['./income-dashboard.component.css']
})
export class IncomeDashboardComponent implements OnInit {

  metrics: {
    color?: string, value: string | number, metricTitle: string, icon?: string
  }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
