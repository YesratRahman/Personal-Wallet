import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces/User';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../service/wallet.service';
import { LoginService } from '../service/login.service';
import { DeleteUserComponent } from '../userComp/delete-user/delete-user.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import { EditUserComponent } from '../userComp/edit-user/edit-user.component';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  

  @Input() currentUser: User;

  constructor(private walletSer: WalletService, private router: Router, private route: ActivatedRoute,
    private loginService: LoginService, public dialog : MatDialog) {
      this.currentUser = this.loginService.getUser();

  }
  ngOnInit(): void {

    this.currentUser = this.loginService.getUser();
    // console.log(this.currentUser);
  }

  onDelete(){
    let dialogRef = this.dialog.open(DeleteUserComponent); 
    dialogRef.afterClosed().subscribe(()=> 
    this.currentUser = this.loginService.getUser()
    ); 
  }

  onEditUser(){
    let dialogRef = this.dialog.open(EditUserComponent); 
    dialogRef.afterClosed().subscribe(()=> 
    this.currentUser = this.loginService.getUser()
    ); 
  }

  onEditNotification(event : Event){
    // this.currentUser.userName = userName; 
  }
}
