import { Component, Inject, OnInit, inject } from '@angular/core';
import { Employee } from '../Model/employee';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  groupedEmployees: any[] = [];
  httpClient = Inject(HttpClient);

  constructor(private employeeService: EmployeeService, httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    this.employeeService.fetchEmployees(this.httpClient).subscribe(employees => {
      this.employees = employees;
      employees.forEach((employee: Employee) => {
        employee.calculateTotalHours(employee);
      });

      this.groupedEmployees = this.employeeService.getTotalTimeByName(employees);  
      this.orderByTotalHours('desc');
    });
  } 

  orderByTotalHours(direction: string) {
    console.log(direction);
    if (direction === 'asc') {
      this.groupedEmployees.sort((a, b) => a.TotalHours - b.TotalHours);
    } else {
      this.groupedEmployees.sort((a, b) => b.TotalHours - a.TotalHours);
    }
  }
}
