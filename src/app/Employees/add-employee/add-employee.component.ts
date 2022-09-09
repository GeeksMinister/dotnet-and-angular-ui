import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})

export class AddEmployeeComponent implements OnInit {

  @Input() newEmployee: Employee = new Employee();
  @Output() employeesUpdated = new EventEmitter<Employee[]>();

  reactiveForm: any;
  public departments: Department[] = [];
  constructor(private _employeeServie: EmployeeService, private _router: Router) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3),
                                        Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl(null, [Validators.required,  Validators.minLength(3),
                                       Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required,Validators.minLength(6),
                                    Validators.maxLength(15), Validators.pattern('[- +()0-9]+')]),
      address: new FormControl(null, [Validators.required, Validators.minLength(8),
                                      Validators.maxLength(60)]),
      salary: new FormControl(null, [Validators.required, Validators.min(1000)]),
      departmentId: new FormControl(null, Validators.required),
    });

    this._employeeServie.getDepartments()
      .subscribe((result: Department[]) => (this.departments = result));
  }

  public addEmployee() {
    if (this.reactiveForm.valid) {

      this._employeeServie.addEmployee(this.newEmployee)
        .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));

      this._router.navigateByUrl('').then(() => { window.location.reload() });
    }
  }

}
