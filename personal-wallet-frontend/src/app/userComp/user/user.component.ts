import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { User } from '../../interfaces/User';
import { WalletService } from '../../service/wallet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()user : User;

  constructor(private walletSer : WalletService, private loginService : LoginService) { 
  }

  ngOnInit(): void {
      }
  
  login() : void{
    this.loginService.login(this.user); 
    alert("Logged In As: " + this.user.userName);
  }
}
