import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';
import { Router } from '@angular/router';
declare var window: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  constructor(private _employeeServie: EmployeeService, private _router: Router) { }

  @Output() employeesUpdated = new EventEmitter<Employee[]>();
  formModal: any;

  title = 'Employees';
  employees?: Employee[];
  employeeToEdit: Employee = new Employee();
  getFullName = (emp: Employee) => emp.firstName + ' ' + emp.lastName;

  ngOnInit() {
    this._employeeServie.getAllEmployees()
      .subscribe((result: Employee[]) => (this.employees = result));
    this.employeeToEdit.firstName = '';
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  initNewEmployee() {
    this.employeeToEdit = new Employee();
  }

  updateEmployeeList(employees: Employee[]) {
    this.employees = employees;
  }

  editEmployee(employee: Employee) {
    this.employeeToEdit = employee;
  }

  deleteEmployee(employee: Employee) {
    this._employeeServie.deleteEmployee(employee)
      .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));

    this._router.navigateByUrl('').then(() => { window.location.reload() });
  }

  openModal(emp: Employee) {
    this.employeeToEdit = emp;
    this.formModal.show();
  }

}
