import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Department } from 'src/app/models/department';
import { EmployeeService } from 'src/app/services/employee-service';

declare var window: any;

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html'
})

export class EmployeeDetailsComponent implements OnInit {
  constructor(private _employeeServie: EmployeeService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) { }
              
  formModal: any;
  employeeId: string | null = '';
  employee: Employee = new Employee();
  public departments: Department[] = [];

  ngOnInit(): void {
    this.employeeId = this._activatedRoute.snapshot.paramMap.get('guid');

    this._employeeServie.getEmployeeById(this.employeeId)
    .subscribe((result: Employee) => (this.employee = result))

    this._employeeServie.getDepartments()
      .subscribe((result: Department[]) => (this.departments = result));
      
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("deleteModal")
      );
  }

  deleteEmployee() {
    this._employeeServie.deleteEmployee(this.employee).subscribe();

    this._router.navigateByUrl('').then(() => { window.location.reload() });
  }

  deleteModal() { this.formModal.show(); }

}
