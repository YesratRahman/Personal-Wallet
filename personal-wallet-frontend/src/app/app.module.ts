

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './userComp/user/user.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './userComp/add-user/add-user.component';
import { EditUserComponent } from './userComp/edit-user/edit-user.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AllUserComponent } from './userComp/all-user/all-user.component';
import { AddExpenseComponent } from './expenseComp/add-expense/add-expense.component';
import { MatCardModule } from '@angular/material/card';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ExpenseComponent } from './expenseComp/expense/expense.component';
import {MatTableModule} from '@angular/material/table';
import { ContactComponent } from './contact/contact.component';
import { DeleteUserComponent } from './userComp/delete-user/delete-user.component';
import { WalletComponent } from './wallet/wallet.component';
import { ExpenseDashboardComponent } from './expenseComp/expense-dashboard/expense-dashboard.component';

import {MatPaginatorModule } from '@angular/material/paginator';
import { AddIncomeComponent } from './incomeComp/add-income/add-income.component';
import { IncomeDashboardComponent } from './incomeComp/income-dashboard/income-dashboard.component'
import { IncomeComponent } from './incomeComp/income/income.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule} from '@angular/material/sort';
import { EditExpenseComponent } from './expenseComp/edit-expense/edit-expense.component';

import {MatDialogModule } from '@angular/material/dialog';
import { EditIncomeComponent } from './incomeComp/edit-income/edit-income.component';
 import { ChartsModule } from 'ng2-charts';
//  import { ChartModule } from 'angular2-highcharts';
import { ExpenseMonthlySummaryComponent } from './expense-monthly-summary/expense-monthly-summary.component';
import { NumberCardsComponent } from './number-cards/number-cards.component';
import { ExpenseCategorySummaryChartComponent } from './expenseComp/add-expense/expense-category-summary-chart/expense-category-summary-chart.component';

import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AddUserComponent,
    EditUserComponent,
    AllUserComponent,
    AddExpenseComponent,
    ExpenseComponent,
    ContactComponent,
    DeleteUserComponent,
    WalletComponent,
    ExpenseDashboardComponent,
    AddIncomeComponent,
    IncomeDashboardComponent,
    IncomeComponent,
    EditExpenseComponent,
    EditIncomeComponent,
    ExpenseMonthlySummaryComponent,
    NumberCardsComponent,
    ExpenseCategorySummaryChartComponent
          ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    NgbModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule, 
    MatSidenavModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSortModule,
    MatDialogModule,
     ChartsModule,
     ChartModule.forRoot(highcharts)
        




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
