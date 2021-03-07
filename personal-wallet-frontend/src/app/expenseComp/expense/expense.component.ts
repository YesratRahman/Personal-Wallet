import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {



  @Input() expense: Expense;
  expenses: Expense[] = [];

  displayedColumns: string[] = ['expenseId', 'expenseAmount', 'category', 'description', 'spentDate'];
  dataSource: MatTableDataSource<Expense>;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private walletSer: WalletService, private userLogin : LoginService, 
    private router : Router, private route : ActivatedRoute)
     {

      walletSer.getExpenseByUserId(this.userLogin.currentUser.userId).subscribe(
        expenses => {
          this.dataSource = new MatTableDataSource(expenses);
          this.dataSource.sort = this.sort;
  
        
      });
    
}

ngOnInit(): void {
}

  applyFilter(event: Event) {
    const fiter = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = fiter.trim().toLowerCase();
  }


  deleteExpense(expense : Expense){
    const index = this.dataSource.data.indexOf(expense); 
    this.walletSer.deleteExpense(expense.expenseId).subscribe(
      () => { 
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); 
      }
    ); 
    }
}


