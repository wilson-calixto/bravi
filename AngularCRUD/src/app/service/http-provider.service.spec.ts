import { HttpProviderService } from './http-provider.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockUser, mockUserResponse, mockUsersResponse } from '../mocks/user';

describe('HttpProviderService', () => {
  let httpMock: HttpTestingController;
  let service: HttpProviderService;

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

  it('should retrieve all users', () => {
    service.getAllUsers().subscribe((users) => {
      expect(users).toEqual(mockUsersResponse);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  it('should retrieve user detail by ID', () => {
    service.getUserDetailById(mockUser.id).subscribe((user) => {
      expect(user).toEqual(mockUserResponse);
    });

    const req = httpMock.expectOne(`/api/users/${mockUser.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should edit an user', () => {
    service.editUser(mockUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`/api/users/${mockUser.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should create a new user', () => {
    service.postUser(mockUser).subscribe((response) => {
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
