import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { User } from '../../interfaces/User';
import { WalletService } from '../../service/wallet.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  users :User[];
  // currentUser : User = {userId : 1, userName : "Raha"}; 

  constructor(private service : WalletService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(list => {
      this.users = list
    });
  }

  // getUser() : void{
  //   this.currentUser = this.loginService.getUser(); 
  // }
}
