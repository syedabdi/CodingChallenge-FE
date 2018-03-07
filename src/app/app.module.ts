import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDetailsGuardService } from './employee-details/employee-details-guard.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'employee', component: EmployeeListComponent },
      { path: 'employee/:id',
      canActivate :[EmployeeDetailsGuardService],
      component: EmployeeDetailsComponent },
      { path: 'add', component: AddEmployeeComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
  ]),
  ],
  providers: [EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
