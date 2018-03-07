import { TestBed, inject } from '@angular/core/testing';

import { EmployeeDetailsGuardService } from './employee-details-guard.service';

describe('EmployeeDetailsGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeDetailsGuardService]
    });
  });

  it('should be created', inject([EmployeeDetailsGuardService], (service: EmployeeDetailsGuardService) => {
    expect(service).toBeTruthy();
  }));
});
