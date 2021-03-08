import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces/User';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../service/wallet.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  

  @Input() currentUser: User;

  constructor(private walletSer: WalletService, private router: Router, private route: ActivatedRoute,
    private loginService: LoginService) {

  }
  ngOnInit(): void {

    this.currentUser = this.loginService.getUser();
    console.log(this.currentUser);
  }

  
}
