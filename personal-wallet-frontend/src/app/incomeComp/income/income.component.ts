import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from 'src/app/interfaces/Income';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  
  @Input() income: Income[] = [];

  displayedColumns: string[] = ['category', 'incomeAmount', 'description', 'earnedDate'];
  dataSource: MatTableDataSource<Income>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('sorter', {static: true}) sort: MatSort;




  constructor(private walletSer: WalletService, private userLogin : LoginService, 
    private router : Router, private route : ActivatedRoute)
     {

      walletSer.getIncomeByUserId(this.userLogin.currentUser.userId).subscribe(
        incomes => {
          this.dataSource = new MatTableDataSource(incomes);
          this.dataSource.sort = this.sort;
  
        
      });
    
}
ngAfterViewInit() {
  this.dataSource.sort = this.sort;

}

ngOnChanges(changes: any) {
  if (!changes.data.firstChange) {
    this.dataSource = new MatTableDataSource<Income>(this.income);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

ngOnInit(): void {
  this.dataSource = new MatTableDataSource<Income>(this.income);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

}

  applyFilter(event: Event) {
    const fiter = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = fiter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteIncome(income : Income){
    const index = this.dataSource.data.indexOf(income); 
    this.walletSer.deleteIncome(income.incomeId).subscribe(
      () => { 
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); 
      }
    ); 
    }
    getTotalCost() {
      

      return this.income.map(t => t.incomeAmount).reduce((acc, value) => acc + value, 0);

    }
}


