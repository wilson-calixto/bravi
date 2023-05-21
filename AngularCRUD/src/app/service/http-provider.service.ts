import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponse } from '../models/Api';
import { User, UserResponse, UsersResponse, BaseUser } from '../models/User';

const apiUrl = '';

const httpLink = {
  getAllEmployee: apiUrl + '/api/users',
  deleteUserById: apiUrl + '/api/users',
  getUserDetailById: apiUrl + '/api/users',
  saveEmployee: apiUrl + '/api/users',
};

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private httpClient: HttpClient) {}

  public getAllUsers() {
    return this.httpClient.get<UsersResponse>(httpLink.getAllEmployee);
  }

  public getUserDetailById(userId: number): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(
      httpLink.getUserDetailById + '/' + userId
    );
  }
  public editUser(user: User): Observable<BaseResponse> {
    if (user.id === null || user.id === undefined) {
      throw new Error(
        'Required parameter ids was null or undefined when calling editUser.'
      );
    }
    return this.httpClient.patch<BaseResponse>(
      httpLink.saveEmployee + '/' + user.id,
      user
    );
  }

  public postUser(user: BaseUser): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(httpLink.saveEmployee, user);
  }

  public deleteUserById(userId: number): Observable<BaseResponse> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter ids was null or undefined when calling deleteUserById.'
      );
    }

    return this.httpClient.request<BaseResponse>(
      'delete',
      httpLink.deleteUserById + '/' + userId,
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
