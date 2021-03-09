import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './userComp/add-user/add-user.component';
import { EditUserComponent } from './userComp/edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { IncomeComponent } from './incomeComp/income/income.component';
import { UserComponent } from './userComp/user/user.component';
import { AllUserComponent } from './userComp/all-user/all-user.component';
import { AddExpenseComponent } from './expenseComp/add-expense/add-expense.component';
import { ExpenseComponent } from './expenseComp/expense/expense.component';
import { DeleteUserComponent } from './userComp/delete-user/delete-user.component';
import { ContactComponent } from './contact/contact.component';
import { WalletComponent } from './wallet/wallet.component';
import { ExpenseDashboardComponent } from './expenseComp/expense-dashboard/expense-dashboard.component';
import { IncomeDashboardComponent } from './incomeComp/income-dashboard/income-dashboard.component';
import { AddIncomeComponent } from './incomeComp/add-income/add-income.component';
import { EditExpenseComponent } from './expenseComp/edit-expense/edit-expense.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: "addUser", component: AddUserComponent },
  { path: "users", component: AllUserComponent }, 
  { path: "updateUser/:id", component: EditUserComponent },
  { path: "deleteUser/:id", component: DeleteUserComponent }, 
  { path : "contact", component : ContactComponent}, 
  { path : "wallet" , component: WalletComponent}, 

  { path: "addExpense", component: AddExpenseComponent}, 
  { path: "userExpense/:userId", component: ExpenseComponent}, 
  { path : "expenseDashboard", component: ExpenseDashboardComponent},
  
  { path : "addIncome", component: AddIncomeComponent}, 
  { path: "userIncome/:userId", component: IncomeComponent}, 

  { path : "incomeDashboard", component: IncomeDashboardComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
