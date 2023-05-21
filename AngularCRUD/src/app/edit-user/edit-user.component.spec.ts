import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { EditEmployeeComponent, userForm } from './edit-user.component';
import { HttpProviderService } from '../service/http-provider.service';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockToastrService: any;
  let mockHttpProviderService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmployeeComponent],
      imports: [FormsModule],
    }).compileComponents();

    mockActivatedRoute = {
      snapshot: {
        params: { userId: 1 },
      },
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockToastrService = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    mockHttpProviderService = {
      getUserDetailById: jasmine
        .createSpy('getUserDetailById')
        .and.returnValue(of({ User: {} })),
      editUser: jasmine
        .createSpy('editUser')
        .and.returnValue(
          of({ status: true, message: 'Employee updated successfully' })
        ),
    };

    await TestBed.configureTestingModule({
      declarations: [EditEmployeeComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: HttpProviderService, useValue: mockHttpProviderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and load user details', () => {
    const mockEmployee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      phone: '555-1234',
    };

    mockHttpProviderService.getUserDetailById.and.returnValue(
      of({ User: mockEmployee })
    );

    component.ngOnInit();

    expect(component.userId).toBe(1);
    expect(mockHttpProviderService.getUserDetailById).toHaveBeenCalledWith(1);
    expect(component.editUserForm).toEqual(mockEmployee);
  });

  it('should edit an user and show success toastr message', () => {
    const mockValidForm = true;
    component.isSubmitted = false;
    component.editUserForm = new userForm();
    component.editUserForm.id = 1;

    component.EditUser(mockValidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.editUser).toHaveBeenCalledWith(
      component.editUserForm
    );
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Employee updated successfully'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Home']);
  });

  it('should not edit an user if the form is invalid', () => {
    const mockInvalidForm = false;
    component.isSubmitted = false;

    component.EditUser({});

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.editUser).not.toHaveBeenCalled();
    expect(mockToastrService.success).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle error when editing an user', () => {
    const mockValidForm = true;
    const errorMessage = 'Error occurred while editing user';
    component.isSubmitted = false;
    component.editUserForm = new userForm();
    component.editUserForm.id = 1;

    mockHttpProviderService.editUser.and.returnValue(
      throwError({ message: errorMessage })
    );

    component.EditUser(mockValidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.editUser).toHaveBeenCalledWith(
      component.editUserForm
    );
    expect(mockToastrService.error).toHaveBeenCalledWith(errorMessage);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Home']);
  });
});