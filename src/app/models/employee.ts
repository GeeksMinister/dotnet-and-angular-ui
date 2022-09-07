import {Department} from './department'

export class Employee {
    guid?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    address?: string;
    email?: string;
    phone?: string;
    salary?: number;
    departmentId?: string;
    department?: Department;
}