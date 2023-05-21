// // import { TestBed, ComponentFixture } from '@angular/core/testing';
// // import { ActivatedRoute } from '@angular/router';
// // import { of, throwError } from 'rxjs';

// // import { ViewUserComponent } from './view-user.component';
// // import { HttpProviderService } from '../service/http-provider.service';

// // describe('ViewUserComponent', () => {
// //   let component: ViewUserComponent;
// //   let fixture: ComponentFixture<ViewUserComponent>;
// //   let mockActivatedRoute: any;
// //   let mockHttpProviderService: any;

// //   beforeEach(async () => {
// //     mockActivatedRoute = {
// //       snapshot: {
// //         params: {
// //           userId: 1,
// //         },
// //       },
// //     };

// //     mockHttpProviderService = {
// //       getUserDetailById: jasmine
// //         .createSpy('getUserDetailById')
// //         .and.returnValue(of({ User: {} })),
// //     };

// //     await TestBed.configureTestingModule({
// //       declarations: [ViewUserComponent],
// //       providers: [
// //         { provide: ActivatedRoute, useValue: mockActivatedRoute },
// //         { provide: HttpProviderService, useValue: mockHttpProviderService },
// //       ],
// //     }).compileComponents();
// //   });

// //   beforeEach(() => {
// //     fixture = TestBed.createComponent(ViewUserComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   xit('should create the component', () => {
// //     expect(component).toBeTruthy();
// //   });

// //   xit('should retrieve user detail by id', () => {
// //     const mockData = { User: {} };
// //     mockHttpProviderService.getUserDetailById.and.returnValue(of(mockData));

// //     component.getUserDetailById();

// //     expect(mockHttpProviderService.getUserDetailById).toHaveBeenCalledWith(
// //       component.userId
// //     );
// //     expect(component.userDetail).toEqual(mockData.User);
// //   });

// //   xit('should handle error when retrieving user detail', () => {
// //     const mockError = {
// //       message: 'An error occurred while retrieving user detail',
// //     };
// //     mockHttpProviderService.getUserDetailById.and.returnValue(
// //       throwError(mockError)
// //     );

// //     component.getUserDetailById();

// //     expect(mockHttpProviderService.getUserDetailById).toHaveBeenCalledWith(
// //       component.userId
// //     );
// //     expect(component.userDetail).toBeTruthy();
// //   });
// // });

// import { TestBed } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { ViewUserComponent } from './view-user.component';
// import { HttpProviderService } from '../service/http-provider.service';
// import { User, UserResponse } from '../models/User';
// import { mockUser } from '../mocks/user';

// describe('ViewUserComponent', () => {
//   let component: ViewUserComponent;
//   let route: ActivatedRoute;
//   let httpProvider: HttpProviderService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: { snapshot: { params: { userId: 1 } } },
//         },
//         { provide: HttpProviderService, useValue: {} },
//       ],
//     });
//     component = TestBed.createComponent(ViewUserComponent).componentInstance;
//     route = TestBed.inject(ActivatedRoute);
//     httpProvider = TestBed.inject(HttpProviderService);
//   });

//   xit('should set userId and call getUserDetailById on ngOnInit', () => {
//     spyOn(component, 'getUserDetailById');

//     component.ngOnInit();

//     expect(component.userId).toBe(1);
//     expect(component.getUserDetailById).toHaveBeenCalled();
//   });

//   xit('should set userDetail with data from httpProvider on getUserDetailById', () => {
//     const userResponse: UserResponse = {
//       User: mockUser,
//     };
//     spyOn(httpProvider, 'getUserDetailById').and.returnValue(of(userResponse));

//     component.userId = 1;
//     component.getUserDetailById();

//     expect(component.userDetail).toEqual(userResponse.User);
//   });
// });
