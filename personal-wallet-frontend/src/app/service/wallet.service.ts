
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Expense } from '../interfaces/Expense';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  baseURL: string = "http://localhost:8080/api";
  httpOptions = {
    headers: new HttpHeaders(
      { "Content-Type": "application/json" }
    )
  }

  constructor(private http: HttpClient) { }


  addUser(toAdd: User): Observable<User> {
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

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.baseURL + "/user/" + userId, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseURL + "/updateUser/" + user.userId, user, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }


  getExpenseByUserId(userId : number): Observable<Expense[]> { 
   // return this.http.get<Expense[]>(this.baseURL + `/userExpense/${userId}`, this.httpOptions)
   return this.http.get<Expense[]>(this.baseURL + "/userExpense/" + userId , this.httpOptions)
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
}
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + "/users", this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          let empty: User[] = [];
          return of(empty);
        })
      );
  }

  deleteUser(userId: number) : Observable<User>{
    return this.http.delete<User>(this.baseURL + "/deleteUser/" + userId, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(this.baseURL + "/user/" + "userName", this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  
  addExpense(toAdd: Expense): Observable<Expense> {
    console.log(toAdd);
    return this.http.post<Expense>(this.baseURL + "/addExpense", toAdd, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseURL + "/expenses", this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          let empty: Expense[] = [];
          return of(empty);
        })
      );
  }

  

  deleteExpense(userId: number) {
    return this.http.delete(this.baseURL + "/deleteExpense/" + "expenseId", this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  


}