
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import {tap, catchError} from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  baseURL : string = "http://localhost:8080/api";
  httpOptions = {headers: new HttpHeaders(
               {"Content-Type": "application/json"}
               )}

  constructor(private http: HttpClient) { }


  addUser(toAdd : User) : Observable<User> {
    console.log(toAdd);
    return this.http.post<User>(this.baseURL + "/addUser", toAdd, this.httpOptions)
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + "/users", this.httpOptions)
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        let empty : User[] = [];
        return of(empty);
      })
      );
  }

    getUserById(userId : number) : Observable<User> {
    return this.http.get<User>(this.baseURL + "/user/" + "userId")
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        let empty = null;
        return of(empty);
      })
      );
  }



editUser(userId:number):Observable<User>{
  return this.http.put<User>(this.baseURL+`/editUser/${userId}`,this.httpOptions);
}

deleteUser(userId:number){
  console.log(userId);
  return this.http.delete(this.baseURL+ `/deleteUser/${userId}`);
}
}