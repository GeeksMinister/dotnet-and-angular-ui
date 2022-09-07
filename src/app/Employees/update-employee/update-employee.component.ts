import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() updatedEmployee: Employee = new Employee();
  @Output() employeesUpdated = new EventEmitter<Employee[]>();

  employeeId: string | null = '';
  
  public departments: Department[] = [];
  constructor(private _employeeServie: EmployeeService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.employeeId = this._activatedRoute.snapshot.paramMap.get('guid');

    this._employeeServie.getEmployeesById(this.employeeId)
    .subscribe((result: Employee) => (this.updatedEmployee = result))

    this._employeeServie.getDepartments()
      .subscribe((result: Department[]) => (this.departments = result));
  }

  public updateEmployee() {
    this._employeeServie.updateEmployee(this.updatedEmployee)
      .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
      
    this._router.navigateByUrl('').then(() => { window.location.reload() });
  }

}
