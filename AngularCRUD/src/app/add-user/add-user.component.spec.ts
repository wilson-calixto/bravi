import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AddUserComponent, userForm } from './add-user.component';
import { HttpProviderService } from '../service/http-provider.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let mockRouter: any;
  let mockToastrService: any;
  let mockHttpProviderService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
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
      postUser: jasmine
        .createSpy('postUser')
        .and.returnValue(
          of({ status: true, message: 'user added successfully' })
        ),
    };

    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: HttpProviderService, useValue: mockHttpProviderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add an user and show success toastr message', () => {
    const mockValidForm = true;
    component.isSubmitted = false;
    component.addUserForm = new userForm();

    component.AddUser(mockValidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.postUser).toHaveBeenCalledWith(
      component.addUserForm
    );
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'user added successfully'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Home']);
  });

  it('should not add an user if the form is invalid', () => {
    const mockInvalidForm = false;
    component.isSubmitted = false;

    component.AddUser(mockInvalidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.postUser).not.toHaveBeenCalled();
    expect(mockToastrService.success).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle error when adding an user', () => {
    const mockValidForm = true;
    const errorMessage = 'Error occurred while adding user';
    component.isSubmitted = false;
    component.addUserForm = new userForm();

    mockHttpProviderService.postUser.and.returnValue(
      throwError({ message: errorMessage })
    );

    component.AddUser(mockValidForm);

    expect(component.isSubmitted).toBe(true);
    expect(mockHttpProviderService.postUser).toHaveBeenCalledWith(
      component.addUserForm
    );
    expect(mockToastrService.error).toHaveBeenCalledWith(errorMessage);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/Home']);
  });
});
