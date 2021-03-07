import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser : User; 
  constructor(private http: HttpClient) { }

  login(user : User) : void { 

    this.currentUser =  user; 


  }
  getUser() :  User {
     return this.currentUser; 

  }
}
