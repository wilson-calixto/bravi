import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { HomeComponent, NgModalConfirm } from './home.component';
import { HttpProviderService } from '../service/http-provider.service';
import { User } from '../models/User';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: any;
  let mockModalService: any;
  let mockToastrService: any;
  let mockHttpProviderService: any;

  const mockEmployee: User = {
    id: 1,
    firstName: 'fsdfdsferer23123',
    lastName: '54435435',
    email: '4rwetrwetretre@dsd.com',
    address: '432432 rerwer3',
    phone: '8989888898',
    createdAt: '1684338987602',
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockModalService = {
      open: jasmine.createSpy('open').and.returnValue({
        result: Promise.resolve('Ok click'),
      }),
    };

    mockToastrService = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    mockHttpProviderService = {
      getAllEmployee: jasmine
        .createSpy('getAllEmployee')
        .and.returnValue(of({ Users: [] })),
      deleteEmployeeById: jasmine
        .createSpy('deleteEmployeeById')
        .and.returnValue(
          of({ status: true, message: 'Employee deleted successfully' })
        ),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, NgModalConfirm],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: NgbModal, useValue: mockModalService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: HttpProviderService, useValue: mockHttpProviderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all employees', () => {
    const mockData = { Users: [] };
    mockHttpProviderService.getAllEmployee.and.returnValue(of(mockData));

    component.getAllEmployee();

    expect(mockHttpProviderService.getAllEmployee).toHaveBeenCalled();
    expect(component.employeeList).toEqual(mockData.Users);
  });

  it('should handle error when retrieving employees', () => {
    const mockError = {
      status: 404,
      error: { message: 'Employees not found' },
    };
    mockHttpProviderService.getAllEmployee.and.returnValue(
      throwError(mockError)
    );

    component.getAllEmployee();

    expect(mockHttpProviderService.getAllEmployee).toHaveBeenCalled();
    expect(component.employeeList).toEqual([]);
  });

  it('should navigate to AddEmployee page', () => {
    component.AddEmployee();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['AddEmployee']);
  });

  it('should open delete confirmation modal and delete employee on confirmation', async () => {
    mockModalService.open.and.returnValue({
      result: Promise.resolve('Ok click'),
    });

    await component.deleteEmployeeConfirmation(mockEmployee);

    expect(mockModalService.open).toHaveBeenCalledWith(NgModalConfirm, {
      ariaLabelledBy: 'modal-basic-title',
    });
    expect(mockHttpProviderService.deleteEmployeeById).toHaveBeenCalledWith(
      mockEmployee.id
    );
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Employee deleted successfully'
    );
    expect(component.getAllEmployee).toHaveBeenCalled();
  });

  it('should open delete confirmation modal and not delete employee on cancellation', async () => {
    mockModalService.open.and.returnValue({
      result: Promise.reject('cancel click'),
    });

    await component.deleteEmployeeConfirmation(mockEmployee);

    expect(mockModalService.open).toHaveBeenCalledWith(NgModalConfirm, {
      ariaLabelledBy: 'modal-basic-title',
    });
    expect(mockHttpProviderService.deleteEmployeeById).not.toHaveBeenCalled();
    expect(mockToastrService.success).not.toHaveBeenCalled();
    expect(component.getAllEmployee).not.toHaveBeenCalled();
  });

  it('should handle error when deleting employee', () => {
    const mockError = {
      message: 'An error occurred while deleting the employee',
    };
    mockHttpProviderService.deleteEmployeeById.and.returnValue(
      throwError(mockError)
    );

    component.deleteEmployee(mockEmployee);

    expect(mockHttpProviderService.deleteEmployeeById).toHaveBeenCalledWith(
      mockEmployee.id
    );
    expect(mockToastrService.error).toHaveBeenCalledWith(
      'An error occurred while deleting the employee'
    );
    expect(component.getAllEmployee).not.toHaveBeenCalled();
  });
});
