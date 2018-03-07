import { Component } from '@angular/core';

import {EmployeeService} from './shared/employee.Service';

@Component({
  selector: 'ep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[EmployeeService]
})
export class AppComponent {
  title = 'Employee Premiums';
}
