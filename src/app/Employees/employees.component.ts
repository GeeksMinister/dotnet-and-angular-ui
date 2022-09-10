import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';
declare var window: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  constructor(private _employeeServie: EmployeeService, private _router: Router) { }

  formModal: any;
  status: null | string  = 'Requesting data ......';
  title = 'Employees';
  employees?: Employee[];
  employeeToDelete: Employee = new Employee();
  getFullName = (emp: Employee) => emp.firstName + ' ' + emp.lastName;

  ngOnInit() {
    this._employeeServie.getAllEmployees()
      .subscribe((result: Employee[]) => { 
        (this.employees = result);
        this.status = null;
       },
      (err) => this.status = err.message);
    
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );
  }

  deleteEmployee(employee: Employee) {
    this._employeeServie.deleteEmployee(employee).subscribe();
    
    this._router.navigateByUrl('').then(() => { window.location.reload() });
  }

  openModal(emp: Employee) {
    this.employeeToDelete = emp;
    this.formModal.show();
  }

}
