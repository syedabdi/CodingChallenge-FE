import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';

import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import {DTO} from '../shared/DTO';



@Injectable()
export class EmployeeService {
    //in future we can utilize for PROD seperately
    private API_ENDPOINT = environment.apiEndPoint;
    private employee: DTO.Result.employeeDetails[];
    private search: DTO.Commands.addEmployee;
    constructor(private _http: HttpClient) { }


    getProducts(): Observable<DTO.Result.employeeDetails[]> {
       if (this.employee){
           return of(this.employee);
       }
        return this._http.get<DTO.Result.employeeDetails[]>(this.API_ENDPOINT + 'EmployeeDetails/')
              .pipe(
                tap(data => console.log(JSON.stringify(data))),                     
                   tap(data => this.employee=data),
                   catchError(this.handleError)
        );
    }

   //By saving a state as above we dont need to utilize this. As this
   //Will save our calls to Backend.
    getProductsbyId(id): Observable<DTO.Result.employeeDetails> {
        if (this.employee){
            return of(this.employee.filter(x=>x.id===id)[0]);
        }
        
       //we really dont need this here and try to not used this call;
       return this._http.get<DTO.Result.employeeDetails>(this.API_ENDPOINT + 'EmployeeDetails/GetEmployeebyId/'+ id)
       .pipe(
        tap(data => console.log(JSON.stringify(data))),
           catchError(this.handleError)
);
    }


     saveEmployee(employee: DTO.Commands.addEmployee):Observable<number>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //we can customised this method for call edit service as well
        return this.addEmployee(employee, headers);
    }

    private addEmployee(employee: DTO.Commands.addEmployee, headers: HttpHeaders):Observable<number> {
      const post_url = this.API_ENDPOINT + 'EmployeeDetails/AddNewEmployee/';
        return this._http.post<DTO.Commands.addEmployee>(post_url, employee,  { headers: headers} )
                        .pipe(
                            tap(data => JSON.stringify(data)),
                            tap(this.employee=null),
                            catchError(this.handleError)
                        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}