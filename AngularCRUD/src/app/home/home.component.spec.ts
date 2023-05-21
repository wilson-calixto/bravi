import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { HomeComponent, NgModalConfirm } from './home.component';
import { HttpProviderService } from '../service/http-provider.service';
import { mockUser } from '../mocks/user';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: any;
  let mockModalService: any;
  let mockToastrService: any;
  let mockHttpProviderService: any;

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
      getAllUsers: jasmine
        .createSpy('getAllUsers')
        .and.returnValue(of({ Users: [] })),
      deleteUserById: jasmine
        .createSpy('deleteUserById')
        .and.returnValue(
          of({ status: true, message: 'user deleted successfully' })
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

  it('should retrieve all users', () => {
    const mockData = { Users: [] };
    mockHttpProviderService.getAllUsers.and.returnValue(of(mockData));

    component.getAllUsers();

    expect(mockHttpProviderService.getAllUsers).toHaveBeenCalled();
    expect(component.userList).toEqual(mockData.Users);
  });

  it('should handle error when retrieving users', () => {
    const mockError = {
      status: 404,
      error: { message: 'Users not found' },
    };
    mockHttpProviderService.getAllUsers.and.returnValue(throwError(mockError));

    component.getAllUsers();

    expect(mockHttpProviderService.getAllUsers).toHaveBeenCalled();
    expect(component.userList).toEqual([]);
  });

  it('should navigate to AddUser page', () => {
    component.AddUser();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['AddUser']);
  });

  it('should open NgModalConfirm and delete user on deleteUserConfirmation', fakeAsync(() => {
    mockModalService.open.and.returnValue({
      result: Promise.resolve('Ok click'),
    });
    spyOn(component, 'deleteUser');

    component.deleteUserConfirmation(mockUser);
    tick();

    expect(mockModalService.open).toHaveBeenCalledWith(NgModalConfirm, {
      ariaLabelledBy: 'modal-basic-title',
    });
    expect(component.deleteUser).toHaveBeenCalledWith(mockUser);
  }));

  xit('should open delete confirmation modal and not delete user on cancellation', fakeAsync(() => {
    mockModalService.open.and.returnValue({
      result: Promise.reject('cancel click'),
    });
    spyOn(component, 'deleteUser');

    component.deleteUserConfirmation(mockUser);
    tick();

    expect(mockModalService.open).toHaveBeenCalledWith(NgModalConfirm, {
      ariaLabelledBy: 'modal-basic-title',
    });

    expect(mockHttpProviderService.deleteUserById).not.toHaveBeenCalled();
    expect(mockToastrService.success).not.toHaveBeenCalled();
    expect(component.getAllUsers).not.toHaveBeenCalled();
  }));

  it('should handle error when deleting user', () => {
    const mockError = {
      message: 'Operation error',
    };
    mockHttpProviderService.deleteUserById.and.returnValue(
      throwError(mockError)
    );

    component.deleteUser(mockUser);

    expect(mockHttpProviderService.deleteUserById).toHaveBeenCalledWith(
      mockUser.id
    );
    expect(mockToastrService.error).toHaveBeenCalledWith('Operation error');
  });
});
