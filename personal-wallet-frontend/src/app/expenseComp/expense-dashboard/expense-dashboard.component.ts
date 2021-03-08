import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/service/login.service';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {

  currentUser: User;

  constructor(private walletSer: WalletService, private router: Router, private route: ActivatedRoute,
    private loginService: LoginService) {

  }
  ngOnInit(): void {


    this.currentUser = this.loginService.getUser();
    console.log(this.currentUser);
  }

}
