// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';
// import { of, throwError } from 'rxjs';

// import { HomeComponent, NgModalConfirm } from './home.component';
// import { HttpProviderService } from '../service/http-provider.service';
// import { User } from '../models/User';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let mockRouter: any;
//   let mockModalService: any;
//   let mockToastrService: any;
//   let mockHttpProviderService: any;

//   const mockUser: User = {
//     id: 1,
//     firstName: 'fsdfdsferer23123',
//     lastName: '54435435',
//     email: '4rwetrwetretre@dsd.com',
//     address: '432432 rerwer3',
//     phone: '8989888898',
//     createdAt: '1684338987602',
//   };

//   beforeEach(async () => {
//     mockRouter = {
//       navigate: jasmine.createSpy('navigate'),
//     };

//     mockModalService = {
//       open: jasmine.createSpy('open').and.returnValue({
//         result: Promise.resolve('Ok click'),
//       }),
//     };

//     mockToastrService = {
//       success: jasmine.createSpy('success'),
//       error: jasmine.createSpy('error'),
//     };

//     mockHttpProviderService = {
//       getAllUser: jasmine
//         .createSpy('getAllUser')
//         .and.returnValue(of({ Users: [] })),
//       deleteUserById: jasmine
//         .createSpy('deleteUserById')
//         .and.returnValue(
//           of({ status: true, message: 'user deleted successfully' })
//         ),
//     };

//     await TestBed.configureTestingModule({
//       declarations: [HomeComponent, NgModalConfirm],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         { provide: NgbModal, useValue: mockModalService },
//         { provide: ToastrService, useValue: mockToastrService },
//         { provide: HttpProviderService, useValue: mockHttpProviderService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   xit('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   xit('should retrieve all users', () => {
//     const mockData = { Users: [] };
//     mockHttpProviderService.getAllUser.and.returnValue(of(mockData));

//     component.getAllUsers();

//     expect(mockHttpProviderService.getAllUser).toHaveBeenCalled();
//     expect(component.userList).toEqual(mockData.Users);
//   });

//   xit('should handle error when retrieving users', () => {
//     const mockError = {
//       status: 404,
//       error: { message: 'Users not found' },
//     };
//     mockHttpProviderService.getAllUser.and.returnValue(throwError(mockError));

//     component.getAllUsers();

//     expect(mockHttpProviderService.getAllUser).toHaveBeenCalled();
//     expect(component.userList).toEqual([]);
//   });

//   xit('should navigate to AddUser page', () => {
//     component.AddUser();

//     expect(mockRouter.navigate).toHaveBeenCalledWith(['AddUser']);
//   });

//   xit('should open delete confirmation modal and delete user on confirmation', async () => {
//     mockModalService.open.and.returnValue({
//       result: Promise.resolve('Ok click'),
//     });

//     await component.deleteUserConfirmation(mockUser);

//     expect(mockModalService.open).toHaveBeenCalledWith(NgModalConfirm, {
//       ariaLabelledBy: 'modal-basic-title',
//     });
//     expect(mockHttpProviderService.deleteUserById).toHaveBeenCalledWith(
//       mockUser.id
//     );
//     expect(mockToastrService.success).toHaveBeenCalledWith(
//       'user deleted successfully'
//     );
//     expect(component.getAllUser).toHaveBeenCalled();
//   });

//   xit('should open delete confirmation modal and not delete user on cancellation', async () => {
//     mockModalService.open.and.returnValue({
//       result: Promise.reject('cancel click'),
//     });

//     await component.deleteUserConfirmation(mockUser);

//     expect(mockModalService.open).toHaveBeenCalledWith(NgModalConfirm, {
//       ariaLabelledBy: 'modal-basic-title',
//     });
//     expect(mockHttpProviderService.deleteUserById).not.toHaveBeenCalled();
//     expect(mockToastrService.success).not.toHaveBeenCalled();
//     expect(component.getAllUser).not.toHaveBeenCalled();
//   });

//   xit('should handle error when deleting user', () => {
//     const mockError = {
//       message: 'An error occurred while deleting the user',
//     };
//     mockHttpProviderService.deleteUserById.and.returnValue(
//       throwError(mockError)
//     );

//     component.deleteUser(mockUser);

//     expect(mockHttpProviderService.deleteUserById).toHaveBeenCalledWith(
//       mockUser.id
//     );
//     expect(mockToastrService.error).toHaveBeenCalledWith(
//       'An error occurred while deleting the user'
//     );
//     expect(component.getAllUser).not.toHaveBeenCalled();
//   });
// });
