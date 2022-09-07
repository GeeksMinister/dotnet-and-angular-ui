import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    constructor(private http: HttpClient){ }

    private url: string = '/Employee'
    
    public getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(environment.apiUrl + this.url);
    }
    
    public addEmployee(employee: Employee) :Observable<Employee> {
        return this.http.post<Employee>(environment.apiUrl + this.url, employee);
    }


    
}