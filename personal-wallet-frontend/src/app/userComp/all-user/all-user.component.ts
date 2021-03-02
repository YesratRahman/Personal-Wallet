import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { WalletService } from '../../service/wallet.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  users :User[];

  constructor(private service : WalletService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(list => {
      this.users = list
    });
  }

}
