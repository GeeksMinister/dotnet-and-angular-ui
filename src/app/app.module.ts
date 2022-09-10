import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EmployeesComponent } from './Employees/employees.component';
import { AddEmployeeComponent } from './Employees/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Employees/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './Employees/employee-details/employee-details.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
