import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId : number; 
  userName : string; 


  constructor(private service : WalletService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')); 
    console.log(this.userId); 
    this.service.getUserById(this.userId).subscribe(newD => {
      this.userName = newD.userName; 
    });
  }

  
  updateUser(){
    let toUpdate : User = {userId : this.userId, userName : this.userName};
    this.service.updateUser(toUpdate).subscribe(_ => {
      //console.log(toUpdate);
      this.router.navigate([''])
    }); 
  }

}
