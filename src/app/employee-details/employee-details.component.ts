import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EmployeeService} from '../shared/employee.Service';
import { Subscription }       from 'rxjs/Subscription';
import {DTO} from '../shared/DTO';

@Component({
  selector: 'ep-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Employee Detail';
  EmployeeDetails:DTO.Result.employeeDetails;
  errorMessage: string;
  private sub: Subscription;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _employeeService: EmployeeService) { }

              getEmployeebyId(id) {
                this._employeeService.getProductsbyId(id).subscribe(
                  (employee: DTO.Result.employeeDetails) => {
                      this.EmployeeDetails = employee;
                  },
                  (error: any) => {
                    this.errorMessage = <any>error;
                    this.onBack();
                  }
              );
              }       

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(
      params => {
          let id = +params['id'];
          this.getEmployeebyId(id);
  });
   }

  
  ngOnDestroy() {
    this.sub.unsubscribe();
}

  onBack():void {
    this._router.navigate(['/employee']);
  }

}
