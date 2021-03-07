import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/User';
import { WalletService } from '../service/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private walletSer : WalletService, private router : Router, private route : ActivatedRoute) { }
  users : User[]; 
  userId : number; 
  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')); 
    console.log(this.userId);
    this.walletSer.getUserById(this.userId).subscribe(); 
  }

  deleteUser(userId: number ){
    this.walletSer.deleteUser(userId).subscribe(_ => {
      this.router.navigate(['users'])
    }); 
    alert("user deleted" + userId);
    }
}
