import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

  @Input() newEmployee: Employee = new Employee();
  @Output() employeesUpdated = new EventEmitter<Employee[]>();

  public departments: Department[] = [];
  constructor(private _employeeServie: EmployeeService, private _router: Router) { }

  ngOnInit(): void {
    this._employeeServie.getDepartments()
      .subscribe((result: Department[]) => (this.departments = result));
  }

  public addEmployee() {
    console.log('testing');
    
    this._employeeServie.addEmployee(this.newEmployee)
      .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
      
    this._router.navigateByUrl('').then(() => { window.location.reload() });
  }

}
