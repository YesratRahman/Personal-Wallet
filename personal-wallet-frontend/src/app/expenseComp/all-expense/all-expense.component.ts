import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/interfaces/Expense';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.css']
})
export class AllExpenseComponent implements OnInit {
  expenses : Expense[];

  constructor(private service : WalletService) { }

  ngOnInit(): void {
    this.service.getAllExpenses().subscribe(list => {
      this.expenses = list
    });
  }

}
