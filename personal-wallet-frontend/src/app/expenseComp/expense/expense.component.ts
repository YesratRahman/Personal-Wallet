import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/Expense';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  @Input() expenseAdd: Expense;
  displayedColumns: string[] = ['category', 'expenseAmount', 'description', 'spentDate'];
  dataSource: MatTableDataSource<Expense>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sorter', { static: true }) sort: MatSort;

  constructor(private walletSer: WalletService, private userLogin: LoginService,
    private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {

    walletSer.getExpenseByUserId(this.userLogin.currentUser.userId).subscribe(
      expenses => {
        this.dataSource = new MatTableDataSource(expenses);
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;


      });

  }

  // ngOnChanges(): void {
  //   if (this.expenseAdd) {
  //     this.dataSource.data.push(this.expenseAdd);
  //     this.dataSource._updateChangeSubscription();
  //   }

  //   if (this.expenses) {
  //     this.dataSource.data = this.expenses;
  //     this.dataSource._updateChangeSubscription();
  //   }

  // }

  ngOnInit(): void {


  }

  applyFilter(event: Event) {
    const fiter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = fiter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // getTotalCost() {

  //   return this.expenses.map(t => t.expenseAmount).reduce((acc, value) => acc + value, 0);

  // }

  editData(expense: Expense) {
    const dialogRef = this.dialog.open(EditExpenseComponent, {
      data: expense as any,
      hasBackdrop: true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(()=>
    {
      this.walletSer.getExpenseByUserId(this.userLogin.currentUser.userId).subscribe(
        expenses => {
          this.dataSource = new MatTableDataSource(expenses);
          this.dataSource.paginator = this.paginator;
  
          this.dataSource.sort = this.sort;
  
  
        });
  
}); 
 

}



  onDeleteNotification(event: Event) {
    // const i = this.expenses.findIndex(e => e.expenseId === event);
    // if (i != -1) {
    //   this.expenses.splice(i, 1);
    // }
  }
  onSumNotification(event: Event) {
    // const i = this.expenses.findIndex(e => e.expenseId === event);
    // if (i != -1) {
    //   this.expenses.splice(i, 1);
    // }
  }
  // isDataEmpty(): boolean {
  //   return this.expenses.length === 0;
  // }

  
  
}


