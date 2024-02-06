export class Employee {
    Id: number = 0;
    EmployeeName: string = '';
    StarTimeUtc: string = '';
    EndTimeUtc: string = '';
    EntryNotes: string = '';
    DeletedOn: string = '';
    TotalHours: number = 0;

    constructor(init? : Partial<Employee>) {
        Object.assign(this, init);
    }

    calculateTotalHours(employee: Employee) {
        let startTime = new Date(employee.StarTimeUtc);
        let endTime = new Date(employee.EndTimeUtc);
        let timeDiff = endTime.getTime() - startTime.getTime();
        let hours = timeDiff / (1000 * 3600);
        this.TotalHours = hours;
      }
}

