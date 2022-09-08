import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Department } from 'src/app/models/department';
import { EmployeeService } from 'src/app/services/employee-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})

export class EmployeeDetailsComponent implements OnInit {
  
  @Input() employee: Employee = new Employee();
  @Output() employeesUpdated = new EventEmitter<Employee[]>();

  employeeId: string | null = '';
  formModal: any;

  public departments: Department[] = [];
  constructor(private _employeeServie: EmployeeService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    this.employeeId = this._activatedRoute.snapshot.paramMap.get('guid');

    this._employeeServie.getEmployeeById(this.employeeId)
    .subscribe((result: Employee) => (this.employee = result))

    this._employeeServie.getDepartments()
      .subscribe((result: Department[]) => (this.departments = result));
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
      );
  }

  deleteEmployee() {
    this._employeeServie.deleteEmployee(this.employee)
    .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));

    this._router.navigateByUrl('').then(() => { window.location.reload() });
  }
  deleteModal() { this.formModal.show(); }

}
