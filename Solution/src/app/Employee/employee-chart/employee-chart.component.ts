import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Employee } from '../Model/employee';
import { EmployeeService } from '../Services/employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, ChartConfiguration } from 'chart.js';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-employee-chart',
  standalone: true,
  imports: [HttpClientModule, NgApexchartsModule],
  templateUrl: './employee-chart.component.html',
  styleUrl: './employee-chart.component.css'
})
export class EmployeeChartComponent implements OnInit {
  employees: Employee[] = [];
  groupedEmployees: any[] = [];
  ApexCharts: any;

  @ViewChild('chart')
  chart!: ChartComponent;
  public chartOptions: Partial<ChartConfiguration> | any;

  constructor(private employeeService: EmployeeService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.employeeService.fetchEmployees(this.httpClient).subscribe(employees => {
      this.employees = employees;
      employees.forEach((employee: Employee) => {
        employee.calculateTotalHours(employee);
      });

      this.groupedEmployees = this.employeeService.getTotalTimeByName(employees);

      this.createPieChart(this.groupedEmployees);
    });
  }


  createPieChart(groupedEmployees: any): void {
    const chartData = groupedEmployees.map((employee: any) => employee.TotalHours);
    const chartLabels = groupedEmployees.map((employee: any) => employee.EmployeeName);

    console.log(chartData)

    this.chartOptions = {
      series: chartData,
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: chartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }
}
