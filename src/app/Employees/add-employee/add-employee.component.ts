import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @Input() newEmployee: Employee = new Employee(); 
  constructor(private employeeServie: EmployeeService) { }

  ngOnInit(): void {
  }

  public addEmployee(){
    this.employeeServie.addEmployee(this.newEmployee);
  }

}
