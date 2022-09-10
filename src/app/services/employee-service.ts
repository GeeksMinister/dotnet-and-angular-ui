import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Department } from "../models/department";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private http: HttpClient) { }

    private url: string = '/Employee'

    public getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(environment.apiLocation + this.url);
    }

    public getEmployeeById(guid: string | null): Observable<Employee> {
        return this.http.get<Employee>(environment.apiLocation + this.url + '/' + guid);
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post(environment.apiLocation + this.url, employee);
    }

    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put(environment.apiLocation + this.url + '/' + employee.guid, employee);
    }

    public deleteEmployee(employee: Employee): Observable<Employee> {
        return this.http.delete(environment.apiLocation + this.url + '/' + employee.guid);
      }
    
    public getDepartments(): Observable<Department[]> {
        return this.http.get<Department[]>(environment.apiLocation + '/Department');
    }
}