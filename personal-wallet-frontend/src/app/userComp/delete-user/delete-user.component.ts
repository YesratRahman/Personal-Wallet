import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../interfaces/User';
import { WalletService } from '../../service/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
currentUser : User; 
  constructor(private walletSer : WalletService, private router : Router, private route : ActivatedRoute, private loginService : LoginService,
    @Inject(MAT_DIALOG_DATA)public data: User) { 
      this.currentUser = this.loginService.getUser(); 
    }
  users : User[]; 
  userId : number; 

  
  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')); 
    console.log(this.loginService.currentUser.userId);
  }

  deleteUser(userId: number ){
    this.walletSer.deleteUser(userId).subscribe(_ => {
      this.router.navigate(['users'])
    }); 
    }
}
