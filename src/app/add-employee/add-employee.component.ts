import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {DTO} from '../shared/DTO';
import {EmployeeService} from '../shared/employee.Service'


@Component({
  selector: 'ep-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm : FormGroup;
  pageTitle: string = 'New Employee Detail';
  emp : DTO.Commands.addEmployee;
  items:FormArray;
  errorMessage: string;
  depend: boolean = false;
  constructor(private fb: FormBuilder,
              private _employeeService: EmployeeService,
              private router: Router,
              private route: ActivatedRoute){}

   createItem(): FormGroup {

return this.fb.group({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
    });
  }

  addItem(): void {
    var t = this.employeeForm.get('dependents') as FormArray;
    this.items = t;
    this.items.push(this.createItem());
  }

   ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employee: this.fb.group({
        firstName:new FormControl('', Validators.required),
        lastName:new FormControl('', Validators.required),
      }),
      dependents: this.fb.array([ this.createItem() ])
    });
  }

onSaveComplete(): void {
  // Reset back to pristine
  this.employeeForm.reset(this.employeeForm.value);
  // Navigate back to the product list
  this.router.navigate(['/employee']);
}

  saveEmployee(): void {
    if (this.employeeForm.dirty && this.employeeForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.emp, this.employeeForm.value);
      p.dependents = p.dependents.filter(x=>x.firstName!="" || x.lastName!="");
      console.log(p);
      this._employeeService.saveEmployee(p)
      .subscribe(
        (result: number) => { 
        console.log(result);
          //we can return boolean or id of the employee for any further processing.
         result>0? this.onSaveComplete() : false;
        },
        (error: any) => this.errorMessage = <any>error
    );    
  } else if (!this.employeeForm.dirty) {
      this.onSaveComplete();
  }
 }
}
