import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/User';
import { WalletService } from '../../service/wallet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()user : User;

  //users : User[]; 
  constructor(private walletSer : WalletService) { 
  }

  ngOnInit(): void {
    // this.walletSer.getAllUsers().subscribe(list => {
    //   this.users = list
    // });
  }
  
  // deleteuser(userId){
  //   this.walletSer.deleteUser(userId).subscribe(res=>{this.users.splice(1,userId)});
  //   }
}
