import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  @Input()userId : number;

  constructor(private walletSer : WalletService, private router : Router) { }

  ngOnInit(): void {
    
  }

  getUserById() {
    
    this.router.navigate(["user"], {queryParams: {id: this.userId}});
  }
}