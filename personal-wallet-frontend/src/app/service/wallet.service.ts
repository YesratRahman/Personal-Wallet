
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  baseURL : string = "http://localhost:8080/api";
  httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}

  constructor(private http : HttpClient) { 

  }

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + "/user")
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        let empty : User[] = [];
        return of(empty);
      })
      );
  }

  addUser(toAdd : User) : Observable<User> {
    return this.http.post<User>(this.baseURL + "/add", toAdd, this.httpOptions)
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
}
