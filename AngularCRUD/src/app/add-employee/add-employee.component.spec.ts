import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddEmployeeComponent, employeeForm } from './add-employee.component';
import { HttpProviderService } from '../service/http-provider.service';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let mockRouter: any;
  let mockToastrService: any;
  let mockHttpProviderService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeComponent],
      imports: [FormsModule],
    }).compileComponents();
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockToastrService = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    mockHttpProviderService = {
      postEmployee: jasmine
        .createSpy('postEmployee')
        .and.returnValue(
          of({ status: true, message: 'Employee added successfully' })
        ),
    };

    await TestBed.configureTestingModule({
      declarations: [AddEmployeeComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: HttpProviderService, useValue: mockHttpProviderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add an employee and show success toastr message', () => {
    const mockValidForm = true;
    component.isSubmitted = false;
    component.addEmployeeForm = new employeeForm();

    component.AddEmployee(mockValidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.postEmployee).toHaveBeenCalledWith(
      component.addEmployeeForm
    );
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Employee added successfully'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Home']);
  });

  it('should not add an employee if the form is invalid', () => {
    const mockInvalidForm = false;
    component.isSubmitted = false;

    component.AddEmployee(mockInvalidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.postEmployee).not.toHaveBeenCalled();
    expect(mockToastrService.success).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle error when adding an employee', () => {
    const mockValidForm = true;
    const errorMessage = 'Error occurred while adding employee';
    component.isSubmitted = false;
    component.addEmployeeForm = new employeeForm();

    mockHttpProviderService.postEmployee.and.returnValue(
      throwError({ message: errorMessage })
    );

    component.AddEmployee(mockValidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.postEmployee).toHaveBeenCalledWith(
      component.addEmployeeForm
    );
    expect(mockToastrService.error).toHaveBeenCalledWith(errorMessage);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Home']);
  });
});
