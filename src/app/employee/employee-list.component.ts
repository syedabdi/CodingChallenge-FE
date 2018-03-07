import { Component, OnInit } from '@angular/core';
import { Iemployee } from './iemployee';
import {DTO} from '../shared/DTO';
import {EmployeeService} from '../shared/employee.Service'

@Component({
  selector: 'ep-employee',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements Iemployee, OnInit {
  FilterEmployee :DTO.Result.employeeDetails[];
  errorMessage: string;
  EmployeeDetails:DTO.Result.employeeDetails[];
  constructor(private _employeeService: EmployeeService) {
    this.FilterEmployee = this.EmployeeDetails;
    this.listFilter = null;
   }

  _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.FilterEmployee = this.listFilter ? this.applyFilter(this.listFilter) : this.EmployeeDetails;
    }


  applyFilter(filterBy: string): DTO.Result.employeeDetails[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.EmployeeDetails.filter((employee: DTO.Result.employeeDetails) =>
          employee.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

ngOnInit(): void {
  this._employeeService.getProducts().subscribe(
      (employee: DTO.Result.employeeDetails[]) => {
          this.EmployeeDetails = employee;
          this.FilterEmployee = this.EmployeeDetails; 
      },
      (error: any) => this.errorMessage = <any>error
  );
}


}
