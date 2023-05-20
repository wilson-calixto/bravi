import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.httpClient.get<any>(httpLink.getAllEmployee);
  }

  public getEmployeeDetailById(userId: any): Observable<any> {
    return this.httpClient.get(httpLink.getEmployeeDetailById + '/' + userId);
  }
  public editEmployee(user: any): Observable<any> {
    if (user.id === null || user.id === undefined) {
      throw new Error(
        'Required parameter ids was null or undefined when calling editEmployee.'
      );
    }
    return this.httpClient.patch(httpLink.saveEmployee + '/' + user.id, user);
  }

  public postEmployee(user: any): Observable<any> {
    return this.httpClient.post(httpLink.saveEmployee, user);
  }

  public deleteEmployeeById(userId: any): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter ids was null or undefined when calling deleteEmployeeById.'
      );
    }

    return this.httpClient.request<boolean>(
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
