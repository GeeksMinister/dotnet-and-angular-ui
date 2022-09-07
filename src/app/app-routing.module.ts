import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './Employees/employees.component'
import { AddEmployeeComponent } from './Employees/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Employees/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './Employees/employee-details/employee-details.component';

const routes: Routes = [
  {path: 'addEmployee', component: AddEmployeeComponent},
  {path: 'updateEmployee', component: UpdateEmployeeComponent},
  {path: 'employeeDetails', component: EmployeeDetailsComponent},
  {path: '', pathMatch: 'full', component: EmployeesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
