import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/User';
import { WalletService } from '../service/wallet.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCRUDComponent implements OnInit {

  users : User[];

  constructor(private walletSer : WalletService) { 
  }

  ngOnInit(): void {
    this.walletSer.getAllUsers().subscribe(list => {
      this.users = list
    });
  }

}
