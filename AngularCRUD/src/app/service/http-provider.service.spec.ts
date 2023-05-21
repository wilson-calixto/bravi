import { HttpProviderService } from './http-provider.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('HttpProviderService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpMock: HttpTestingController;
  let service: HttpProviderService;

  const person1 = {
    address: '432432 rerwer3',
    firstName: '4444',
    id: 17,
    email: 'a@a.com',
    createdAt: '2023-05-20T13:49:22',
    phone: '9298949399',
    lastName: 'calixto',
    activated: false,
    updatedAt: null,
  };

  const expectedResponse = [person1];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpProviderService],
    });

    service = TestBed.inject(HttpProviderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all employees', () => {
    const mockEmployees = [person1];

    service.getAllUsers().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should retrieve user detail by ID', () => {
    const userId = 1;
    const mockEmployee = { id: userId, name: 'John Doe' };

    service.getUserDetailById(userId).subscribe((user) => {
      expect(user).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(`/api/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should edit an user', () => {
    const user = { id: 1, name: 'John Doe' };

    service.editUser(user).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`/api/users/${user.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should create a new user', () => {
    const user = { name: 'John Doe' };

    service.postUser(user).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should delete an user by ID', () => {
    const userId = 1;

    service.deleteUserById(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`/api/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
