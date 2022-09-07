import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';

declare var window: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  constructor(private employeeService: EmployeeService) { }

  formModal: any;

  title = 'Employees';
  employees: Employee[] = [];
  getFullName = (emp: Employee) => emp.firstName + ' ' + emp.lastName;

  ngOnInit() {
    this.employeeService.getAllEmployees()
    .subscribe((result: Employee[]) => (this.employees = result));

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  openModal() { this.formModal.show(); }
  doSomething() { this.formModal.hide(); }


}
