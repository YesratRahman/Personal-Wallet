

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
import { AllExpenseComponent } from './expenseComp/all-expense/all-expense.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';

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
    AllExpenseComponent
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
    MatStepperModule,
    MatTableModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
