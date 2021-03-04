import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './userComp/add-user/add-user.component';
import { EditUserComponent } from './userComp/edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { IncomeComponent } from './income/income.component';
import { UserComponent } from './userComp/user/user.component';
import { AllUserComponent } from './userComp/all-user/all-user.component';
import { AddExpenseComponent } from './expenseComp/add-expense/add-expense.component';
import { ExpenseComponent } from './expenseComp/expense/expense.component';
import { AllExpenseComponent } from './expenseComp/all-expense/all-expense.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: "addUser", component: AddUserComponent },
  { path: "users", component: AllUserComponent }, 
  { path: "updateUser/:id", component: EditUserComponent },
  { path: "addExpense", component: AddExpenseComponent}, 
  { path: "expenses", component: AllExpenseComponent}, 
  { path: "income", component: IncomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
