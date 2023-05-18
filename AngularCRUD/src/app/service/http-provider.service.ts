import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

// var apiUrl = 'localhost:3000';
var apiUrl = '';
// var apiUrl = "http://192.168.10.10:105";
//TODO ajustar a questão do cors
var httpLink = {
  getAllEmployee: apiUrl + '/api/users',
  deleteEmployeeById: apiUrl + '/api/users',
  getEmployeeDetailById: apiUrl + '/api/users',
  saveEmployee: apiUrl + '/api/users',
};

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) {}

  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(httpLink.getAllEmployee);
  }

  public deleteEmployeeById(model: any): Observable<any> {
    return this.webApiService.post(
      httpLink.deleteEmployeeById + '/' + model,
      ''
    );
  }

  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getEmployeeDetailById + '/' + model);
  }

  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  }
}
