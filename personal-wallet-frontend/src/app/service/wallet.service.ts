
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Expense } from '../interfaces/Expense';
import { Income } from '../interfaces/Income';
import { ExpenseCategory } from '../interfaces/ExpenseCategory';
import { IncomeCategory } from '../interfaces/IncomeCategory';
import { ExpenseIncomeDate } from '../interfaces/ExpenseIncomeDate';


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


  getExpenseByUserId(userId: number): Observable<Expense[]> { 
   return this.http.get<Expense[]>(this.baseURL + `/userExpense/${userId}`, this.httpOptions)

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

  getExpenseById(expenseId: number): Observable<Expense> {
    return this.http.get<Expense>(this.baseURL + "/expense/" + expenseId, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }
  
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.baseURL + "/updateExpense/" + expense.expenseId, expense, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  deleteExpense(expenseId: number){
    return this.http.delete<Expense>(this.baseURL + "/deleteExpense/" + expenseId, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          return of(null);
        })
      );
  }

 

  
  addIncome(toAdd: Income): Observable<Income> {
    return this.http.post<Income>(this.baseURL + "/addIncome", toAdd, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  getAllIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(this.baseURL + "/incomes", this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          let empty: Income[] = [];
          return of(empty);
        })
      );
  }

  getIncomeById(incomeId: number): Observable<Income> {
    return this.http.get<Income>(this.baseURL + "/income/" + incomeId, this.httpOptions)
      .pipe(
        tap(x => console.log(x)),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

  

  getIncomeByUserId(userId : number): Observable<Income[]> { 
    return this.http.get<Income[]>(this.baseURL + `/userIncome/${userId}`, this.httpOptions)
     .pipe(
       tap(x => console.log(x)),
       catchError(err => {
         console.log(err);
         return of(null);
       })
     );
 }




 updateIncome(income: Income): Observable<Income> {
  return this.http.put<Income>(this.baseURL + "/updateIncome/" + income.incomeId, income, this.httpOptions)
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
}



 deleteIncome(incomeId: number) {
  return this.http.delete<Income>(this.baseURL + "/deleteIncome/" + incomeId, this.httpOptions)
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
}


getExpenseReport(userId : number): Observable<Expense> { 
  return this.http.get<Expense>(this.baseURL + `/expenseReport/${userId}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}

getIncomeReport(userId : number): Observable<Income> { 
  return this.http.get<Income>(this.baseURL + `/incomeReport/${userId}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}

getExpenseReportByYear(userId : number, spentDate : number): Observable<Expense> { 
  return this.http.get<Expense>(this.baseURL + `/expenseTotalYear/${userId}/${spentDate}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}




getIncomeReportByYear(userId : number, earnedDate : number): Observable<Income> { 
  return this.http.get<Income>(this.baseURL + `/incomeTotalYear/${userId}/${earnedDate}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}


getUserExpenseAndIncome(): Observable<User[]> {
  return this.http.get<User[]>(this.baseURL + "/expenseAndIncome", this.httpOptions)
    .pipe(
      tap(x => console.log(x)),
      catchError(err => {
        console.log(err);
        let empty: User[] = [];
        return of(empty);
      })
    );
}

// getAllExpenseAndIncomeByUserId(userId : number): Observable<User[]> { 
//   return this.http.get<User[]>(this.baseURL + `/expenseAndIncomeByUserId/${userId}`, this.httpOptions)
//    .pipe(
//      tap(x => console.log(x)),
//      catchError(err => {
//        console.log(err);
//        return of(null);
//      })
//    );
// }

getTotalExpenseAndIncomeByUserId(userId : number): Observable<ExpenseIncomeDate[]> { 
  return this.http.get<ExpenseIncomeDate[]>(this.baseURL + `/totalExpenseAndIncomeByUserId/${userId}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}


getReport(userId : number): Observable<User> { 
  return this.http.get<User>(this.baseURL + `/userTransactionReport/${userId}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}

getExpenseByCategory(userId : number): Observable<ExpenseCategory[]> { 
  return this.http.get<ExpenseCategory[]>(this.baseURL + `/totalExpenseByCategory/${userId}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}

getIncomeByCategory(userId : number): Observable<IncomeCategory[]> { 
  return this.http.get<IncomeCategory[]>(this.baseURL + `/totalIncomeByCategory/${userId}`, this.httpOptions)
   .pipe(
     tap(x => console.log(x)),
     catchError(err => {
       console.log(err);
       return of(null);
     })
   );
}
}