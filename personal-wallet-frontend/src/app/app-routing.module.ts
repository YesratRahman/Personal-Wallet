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
import { DeleteUserComponent } from './userComp/delete-user/delete-user.component';
import { UserExpenseComponent } from './expenseComp/user-expense/user-expense.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: "addUser", component: AddUserComponent },
  { path: "users", component: AllUserComponent }, 
  { path: "updateUser/:id", component: EditUserComponent },
  { path: "addExpense", component: AddExpenseComponent}, 
  { path: "userExpense/:userId", component: ExpenseComponent}, 
  { path: "income", component: IncomeComponent},
  { path: "deleteUser/:id", component: DeleteUserComponent }, 
  { path: "expense", component: UserExpenseComponent},
  { path : "contact", component : ContactComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
