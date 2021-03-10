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
  // baseURL: string = "http://localhost:8080/api";
  // httpOptions = {
  //   headers: new HttpHeaders(
  //     { "Content-Type": "application/json" }
  //   )
  // }

  constructor(private http: HttpClient) { }
  login(user : User) : void { 

    this.currentUser =  user; 


  }


  // addUser(toAdd: User): Observable<User> {
  //   console.log(toAdd);
  //   return this.http.post<User>(this.baseURL + "/addUser", toAdd, this.httpOptions)
  //     .pipe(
  //       tap(x => console.log(x)),
  //       catchError(err => {
  //         console.log(err);
  //         return of(null);
  //       })
  //     );
  // }

  // login(user : User) : Observable<Expense> { 
  //   this.currentUser =  user; 
  //   return this.http.post<Expense>(this.baseURL + "/addExense ", toAdd, this.httpOptions)
  //       .pipe(
  //         tap(x => console.log(x)),
  //         catchError(err => {
  //           console.log(err);
  //           return of(null);
  //         })
  //       );
  //   }



  getUser() :  User {
     return this.currentUser; 

  }
}



// currentUser : User; 
//   private categories: string[];
//   private userIdSet = new Subject<string>();
//   private userId: number;
//   userIdSetAnnounced$: any;


//   constructor(private http: HttpClient) { }
//   login(user : User) : void { 

//     this.currentUser =  user; 


//   }
//   getUser() :  User {
//      return this.currentUser; 

//   }

//   setCategories(originalCategories: string[]) {
//     this.categories = originalCategories;
//   }

//   getCurrentCategories(): string[] {
//     return this.categories;
//   }

//   announceUserIdCreated(message: string) {
//     this.userIdSet.next(message);
//   }

//   setUserId(key: number) {
//     this.userId = key;
//   }

//   getUserId(): number {
//     return this.userId;
//   }
// }
