import { Injectable, inject } from '@angular/core';
import { Employee } from '../Model/employee';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor() { }

  fetchEmployees(httpClient: HttpClient): Observable<Employee[]> {
    return httpClient.get<Employee[]>('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==')
    .pipe(map(data => data.map(item => new Employee(item))));
  }

  getTotalTimeByName(employees: Employee[]) {
    let groupedEmployees = employees.reduce((acc: any, employee) => {
      if (!acc[employee.EmployeeName]) {
        acc[employee.EmployeeName] = 0;
      }
      acc[employee.EmployeeName] += employee.TotalHours;
      return acc;
    }, {});

    groupedEmployees = Object.keys(groupedEmployees).map(key => {
      return {
        EmployeeName: key,
        TotalHours: groupedEmployees[key]
      }
    }).filter((item: any) => item.EmployeeName !== 'null');

    return groupedEmployees;
  }
}
