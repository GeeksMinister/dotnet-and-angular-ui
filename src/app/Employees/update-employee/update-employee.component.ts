import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',

})
export class UpdateEmployeeComponent implements OnInit {

  @Input() updatedEmployee: Employee = new Employee();
  @Output() employeesUpdated = new EventEmitter<Employee[]>();

  employeeId: string | null = '';
  reactiveForm: any;

  public departments: Department[] = [];
  constructor(private _employeeServie: EmployeeService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.employeeId = this._activatedRoute.snapshot.paramMap.get('guid');
    this._employeeServie.getEmployeeById(this.employeeId)
    .subscribe((result: Employee) => (this.updatedEmployee = result))
    this._employeeServie.getDepartments()
      .subscribe((result: Department[]) => (this.departments = result));
    
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

  }

  public updateEmployee() {
    if (this.reactiveForm.valid) {
      
      this._employeeServie.updateEmployee(this.updatedEmployee)
      .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
      
      this._router.navigateByUrl('').then(() => { window.location.reload() });
    }
  }


}
