import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from 'src/app/interfaces/Income';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';
import { EditIncomeComponent } from '../edit-income/edit-income.component';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  @Input() incomeAdd: Income;
  displayedColumns: string[] = ['category', 'incomeAmount', 'description', 'earnedDate'];
  dataSource: MatTableDataSource<Income>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sorter', { static: true }) sort: MatSort;

  constructor(private walletSer: WalletService, private userLogin: LoginService,
    private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {

    walletSer.getIncomeByUserId(this.userLogin.currentUser.userId).subscribe(
      incomes => {
        this.dataSource = new MatTableDataSource(incomes);
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;


      });

  }


  ngOnInit(): void {


  }

  applyFilter(event: Event) {
    const fiter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = fiter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  

  editData(income: Income) {
    const dialogRef = this.dialog.open(EditIncomeComponent, {
      data: income as any,
      hasBackdrop: true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(()=>
    {
      this.walletSer.getIncomeByUserId(this.userLogin.currentUser.userId).subscribe(
        incomes => {
          this.dataSource = new MatTableDataSource(incomes);
          this.dataSource.paginator = this.paginator;
  
          this.dataSource.sort = this.sort;
  
  
        });
  
}); 
 

}



  onDeleteNotification(event: Event) {
   
  }

  

  
  
}



  