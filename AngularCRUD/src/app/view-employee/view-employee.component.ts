import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit {
  employeeId: any;
  employeeDetail: any = [];

  constructor(
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {
    this.httpProvider
      .getEmployeeDetailById(this.employeeId)
      .subscribe((data: any) => {
        if (data != null && data.User != null) {
          const resultData = data.User;
          if (resultData) {
            this.employeeDetail = resultData;
          }
        }
      });
  }
}
