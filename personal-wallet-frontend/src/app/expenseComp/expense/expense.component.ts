import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit,OnChanges {



  @Input() expenseAdd: Expense;
  @Input() expense: Expense[] = [];

  displayedColumns: string[] = ['category', 'expenseAmount', 'description', 'spentDate'];
  dataSource: MatTableDataSource<Expense>;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild('sorter', {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sorter', {static: true}) sort: MatSort;



  constructor(private walletSer: WalletService, private userLogin : LoginService, 
    private router : Router, private route : ActivatedRoute, public dialog: MatDialog)
     {

      walletSer.getExpenseByUserId(this.userLogin.currentUser.userId).subscribe(
        expenses => {
          this.dataSource = new MatTableDataSource(expenses);
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
  
        
      });
    
}
// ngAfterViewInit() {
//   this.dataSource.sort = this.sort;

// }

// ngOnChanges(changes: any) {
//   if (!changes.data.firstChange) {
//     this.dataSource = new MatTableDataSource<Expense>(this.expense);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
// }

ngOnChanges(): void {
  if (this.expenseAdd) {
    this.dataSource.data.push(this.expenseAdd);
    this.dataSource._updateChangeSubscription();
  }

  if(this.expense) {
    this.dataSource.data = this.expense;
    this.dataSource._updateChangeSubscription();
  }
  
}

ngOnInit(): void {
  // this.dataSource = new MatTableDataSource<Expense>(this.expense);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;

}

  applyFilter(event: Event) {
    const fiter = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = fiter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    getTotalCost() {
      

      return this.expense.map(t => t.expenseAmount).reduce((acc, value) => acc + value, 0);

    }
}


