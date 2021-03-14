import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Expense } from '../interfaces/Expense';
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



