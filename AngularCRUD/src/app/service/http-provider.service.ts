import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponse } from '../models/Api';
import { User, UserResponse, UsersResponse, baseUser } from '../models/User';

const apiUrl = '';

const httpLink = {
  getAllEmployee: apiUrl + '/api/users',
  deleteEmployeeById: apiUrl + '/api/users',
  getEmployeeDetailById: apiUrl + '/api/users',
  saveEmployee: apiUrl + '/api/users',
};

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private httpClient: HttpClient) {}

  public getAllEmployee() {
    return this.httpClient.get<UsersResponse>(httpLink.getAllEmployee);
  }

  public getEmployeeDetailById(userId: number): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(
      httpLink.getEmployeeDetailById + '/' + userId
    );
  }
  public editEmployee(user: User): Observable<BaseResponse> {
    if (user.id === null || user.id === undefined) {
      throw new Error(
        'Required parameter ids was null or undefined when calling editEmployee.'
      );
    }
    return this.httpClient.patch<BaseResponse>(
      httpLink.saveEmployee + '/' + user.id,
      user
    );
  }

  public postEmployee(user: baseUser): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(httpLink.saveEmployee, user);
  }

  public deleteEmployeeById(userId: number): Observable<BaseResponse> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter ids was null or undefined when calling deleteEmployeeById.'
      );
    }

    return this.httpClient.request<BaseResponse>(
      'delete',
      httpLink.deleteEmployeeById + '/' + userId,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          userId,
        },
      }
    );
  }
}
