import {DTO} from '../shared/DTO';

export interface Iemployee {
    EmployeeDetails: DTO.Result.employeeDetails[];
    applyFilter(filterBy: string): DTO.Result.employeeDetails[]
}