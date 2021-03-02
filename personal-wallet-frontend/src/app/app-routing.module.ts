import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './userComp/add-user/add-user.component';
import { EditUserComponent } from './userComp/all-user/edit-user/edit-user.component';
import { ExpenseComponent } from './expenseComp/expense/expense.component';
import { HomeComponent } from './home/home.component';
import { IncomeComponent } from './income/income.component';
import { UserComponent } from './userComp/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: "addUser", component: AddUserComponent },
  { path: "editUser/:id", component: EditUserComponent },
  { path: "users", component: UserComponent }, 
  { path: "expense", component: ExpenseComponent}, 
  { path: "income", component: IncomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
